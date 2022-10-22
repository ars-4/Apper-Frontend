<template>
    <div class="row ims">

        <div class="col-md-4">
            <Bar v-if="loaded" :chart-data="chartData" />
        </div>
        <div class="col-md-1"></div>

        <div class="col-md-6 cards">

            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div>
                            <span>{{ total_products }}</span>
                            <span class="fa fa-shopping-cart"></span>
                            <br>
                            <router-link to="/ims">Total Products</router-link>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div>
                            <span>{{ total_orders }}</span>
                            <span class="fa fa-boxes"></span>
                            <br>
                            <router-link to="/ims">Total Orders</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div>
                            <span>{{ total_profit }}</span>
                            <span class="fa fa-money-bill"></span>
                            <br>
                            <router-link to="/ims">Total Profit</router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
  
<script>

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'ImsCompVue',
    components: { Bar },
    data() {
        return {
            dataOne: null,
            loaded: false,
            total_profit: 0,
            total_expense: '0',
            total_products: '0',
            total_orders: '0',
            chartData: {
                labels: [],
                datasets: []
            },

            monday_p: 0,
            monday_e: 0,
            tuesday_p: 0,
            tuesday_e: 0,
            wednesday_p: 0,
            wednesday_e: 0,
            thursday_p: 0,
            thursday_e: 0,
            friday_p: 0,
            friday_e: 0,
            saturday_p: 0,
            saturday_e: 0,
            sunday_p: 0,
            sunday_e: 0
        }
    },
    methods: {

        extract_data_profit_and_expense: function(_argument) {
            let temp_var = 0;
            for(let i = 0; i < _argument.length; i++) {
                temp_var = temp_var + Number(_argument[i]['bill'])
            }
            return temp_var
        },

        get_profit_and_expense: function () {
            fetch(this.main_url + "ims/balance/barchart/").then(
                res => { return res.json() }
            ).then(
                data => {

                    this.monday_p = this.extract_data_profit_and_expense(data['monday_profit'])
                    this.monday_e = this.extract_data_profit_and_expense(data['monday_expense'])
                    this.tuesday_p = this.extract_data_profit_and_expense(data['tuesday_profit'])
                    this.tuesday_e = this.extract_data_profit_and_expense(data['tuesday_expense'])
                    this.wednesday_p = this.extract_data_profit_and_expense(data['wednesday_profit'])
                    this.wednesday_e = this.extract_data_profit_and_expense(data['wednesday_expense'])
                    this.thursday_p = this.extract_data_profit_and_expense(data['thursday_profit'])
                    this.thursday_e = this.extract_data_profit_and_expense(data['thursday_expense'])
                    this.friday_p = this.extract_data_profit_and_expense(data['friday_profit'])
                    this.friday_e = this.extract_data_profit_and_expense(data['friday_expense'])
                    this.saturday_p = this.extract_data_profit_and_expense(data['saturday_profit'])
                    this.saturday_e = this.extract_data_profit_and_expense(data['saturday_expense'])
                    this.sunday_p = this.extract_data_profit_and_expense(data['sunday_profit'])
                    this.sunday_e = this.extract_data_profit_and_expense(data['sunday_expense'])

                    let days = [
                        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
                    ]

                    this.chartData.labels = [
                        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                    ]
                    this.chartData.datasets = [
                        {
                            label: 'Profit',
                            backgroundColor: '#198754',
                            data: [
                                this.monday_p, this.tuesday_p, this.wednesday_p, this.thursday_p, this.friday_p, this.saturday_p, this.sunday_p
                            ]
                        },
                        {
                            label: 'Expense',
                            backgroundColor: '#dc3545',
                            data: [this.monday_e, this.tuesday_e, this.wednesday_e, this.thursday_e, this.friday_e, this.saturday_e, this.sunday_e]
                        }
                    ]
                }
            ).then(
                () => { this.loaded = true }
            ).catch(e => { console.log(e) })
        },

        get_total_products: function () {

            fetch(this.main_url + "ims/ims_product/", {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                this.total_products = data.length
            })

            fetch(this.main_url + "ims/ims_order/", {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                this.total_orders = data.length
            })

            fetch(this.main_url + "ims/balances/", {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type == 'profit') {
                        this.total_profit = this.total_profit + Number(data[i].bill)
                    }
                }
            })

        },

    },

    async mounted() {
        this.loaded = false
        this.get_profit_and_expense()
        this.get_total_products()
    }
}

</script>