<template>
    <div class="cm row">
        <div class="col-md-8">
            <h1>Complaint</h1>
            <div class="card" style="">
                <table>
                    <tr>
                        <th>Serial</th>
                        <th>Title</th>
                        <th>Employee</th>
                        <th>Status</th>
                    </tr>
                    <tr v-for="el in complaints_list" :key="el.id">
                        <td>{{ el.id }}</td>
                        <td>{{ el.title }}</td>
                        <td>{{ el.employee }}</td>
                        <td v-if="el.status === 'complete'" class="text-success">{{ el.status }}
                            <button class="btn" @click="update_complaint(String(el.id), 'pending')"><span class="fa fa-pencil"></span></button>
                        </td>
                        <td v-else class="text-danger">{{ el.status }} <button class="btn" @click="update_complaint(String(el.id), 'complete')"><span class="fa fa-pencil"></span></button></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="col-md-4 sidebar">
            <br><br>
            <div class="card">
                <h4>Add Complaint</h4>
                <hr>
                <input type="text" class="form-control" placeholder="Title" v-model="cm_title">
                <br>
                <select class="form-control" v-model="cm_status">
                    <option value="pending" selected>Pending</option>
                    <option value="complete">Completed</option>
                </select>
                <br>
                <select class="form-control" v-model="cm_employee">
                    <option v-for="emp in employees" :key="emp.id" v-bind:value="emp.id">{{ emp.name }}</option>
                </select>
                <br>
                <button @click="add_complaint" class="btn btn-primary"><span class="fa fa-plus"></span> Complaint</button>
            </div>
            <br>
            <div class="card">
                <h4>Add Employee</h4>
                <hr>
                <input type="text" v-model="cm_name" class="form-control" placeholder="Employee Name">
                <br>
                <input type="text" v-model="cm_em_mobile" class="form-control" placeholder="Employee Whatsapp">
                <br>
                <button @click="add_employee" class="btn btn-primary"><span class="fa fa-plus"></span> Employee</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    data() {
        return {
            complaints_list: [],
            employees: [],

            cm_title: '',
            cm_status: '',
            cm_employee: '',

            cm_name: '',
            cm_em_mobile: '',
        }
    },
    methods: {
        get_complaints: async function () {
            this.complaints_list = []
            fetch(this.main_url + "cm/complaints/").then(res => { return res.json() }).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        let Obj = {
                            id: data[i].id,
                            title: data[i].title,
                            status: data[i].status,
                            employee: data[i].employee
                        }
                        this.complaints_list.push(Obj)
                    }
                }
            ).catch(err => {console.log(err)})
        }, // get_complaints

        update_complaint: function(_argument: string, _status: string) {
            fetch(this.main_url + 'cm/complaints/' + _argument + "/", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'status': _status
                })
            }).then(() => {
                this.initial()
            })
        },

        get_employees: function() {
            fetch(this.main_url + "cm/employees/").then(res => {
                return res.json();
            }).then(data => {
                for(let i = 0; i < data.length; i++) {
                    let Obj = {
                        id: data[i].id,
                        name: data[i].name
                    }
                    this.employees.push(Obj)
                }
            })
        }, // get_employees

        add_complaint: function() {
            fetch(this.main_url + "cm/complaints/", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'title': this.cm_title,
                    'employee': this.cm_employee,
                    'status': this.cm_status
                })
            }).then(() => {this.get_complaints()})
        }, //add_complaint

        add_employee: function() {
            fetch(this.main_url + "cm/employees/", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'name':this.cm_name,
                    'mobile':this.cm_em_mobile
                })
            }).then(() => {this.initial()})
        }, //add_complaint

        initial: async function() {
            this.employees = []
            this.complaints_list = []
            this.cm_title = ''
            this.cm_name = ''
            this.get_complaints()
            this.get_employees()
        }
    },

    beforeMount() {
        this.initial()
    }
})

export default class ComplaintView extends Vue { }

</script>