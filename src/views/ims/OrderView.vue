<template>
    <div class="order">
        <h1 class="text-center">Invoice</h1>
        <div class="row">
            <div class="col-md-8">
                <div class="card col-md-4">
                    <img :src="barcode" alt="" class="barcode">
                </div>
                <br>
                <table class="card">
                    <tr>
                        <td>Title</td>
                        <td>&nbsp;&nbsp;</td>
                        <td>{{ title }}</td>
                    </tr>
                    <tr>
                        <td>Bill</td>
                        <td>&nbsp;&nbsp;</td>
                        <td>{{ bill }} /- pkr</td>
                    </tr>
                    <tr>
                        <td>Customer</td>
                        <td>&nbsp;&nbsp;</td>
                        <td>{{ customer_name }}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>&nbsp;&nbsp;</td>
                        <td>{{ date_created }}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>&nbsp;&nbsp;</td>
                        <td>{{ description }}</td>
                    </tr>
                </table>
                <br>
                <div class="card">
                    <table>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        <tr v-for="product in products" :key="product">
                            <td>{{ product.title }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.bill }} /- pkr</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-md-4 notprint">
                <button class="btn btn-primary" @click="show_payment_modal"><span class="fa fa-plus"></span>
                    Payment</button>
                &nbsp;&nbsp;
                <button class="btn btn-primary" @click="print"><span class="fa fa-plus"></span> Print</button>
                <br>
                <br>
                <h3>Payments:</h3>
                <div class="card" v-for="payment in payments" :key="payment.id">
                    <table>
                        <tr>
                            <td>Title</td>
                            <td>&nbsp;&nbsp;</td>
                            <td>{{ payment.title }}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>&nbsp;&nbsp;</td>
                            <td>{{ payment.date_created }}</td>
                        </tr>
                        <tr>
                            <td>Payed</td>
                            <td>&nbsp;&nbsp;</td>
                            <td>{{ payment.bill }} /- pkr</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div
            :class="{'payment_modal':true, 'card':true, 'hidden_modal':payment_modal, 'visible_modal':payment_modal_reverse}">
            <h3>Add Payment</h3>
            <hr>
            <input placeholder="Payment Title" type="text" class="form-control" v-model="payment_title">
            <input placeholder="Bill" type="number" class="form-control" v-model="payment_bill">
            <button class="btn btn-primary" @click="add_payment">Add</button>
            <br>
            <button class="btn btn-danger" @click="show_payment_modal">Cancel</button>
        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            age: 36,

            order: Number(localStorage.getItem('order')),

            title: '',
            description: '',
            date_created: '',
            customer_name: '',
            bill: '',
            products: [],
            barcode: '',

            payments: [],

            payment_modal: true,
            payment_modal_reverse: false,

            payment_title: '',
            payment_bill: ''

        }
    },

    methods: {

        getOrderDetails: function () {
            this.products = []
            this.payments = []
            this.payment_title = ''
            this.payment_bill = ''
            fetch(this.main_url + "ims/ims_order/" + String(this.order) + "/").then(
                res => { return res.json() }
            ).then(
                data => {
                    this.title = data['title']
                    this.description = data['description']
                    this.date_created = data['date_created']
                    this.customer_name = data['customer_name']
                    this.bill = data['bill']
                    this.barcode = this.main_url + "media/receipts/" + data['title'] + ".png"
                }
            ).then(
                fetch(this.main_url + "ims/get_order_products/" + this.order + "/").then(
                    res => { return res.json() }
                ).then(
                    data => {
                        for (let i = 0; i < data.length; i++) {
                            let Obj = {
                                title: data[i]['title'],
                                bill: data[i]['bill'],
                                quantity: data[i]['quantity']
                            }
                            this.products.push(Obj)
                        }
                    }
                )
            ).then(
                fetch(this.main_url + "ims/get_payments/" + this.order + "/").then(
                    res => { return res.json() }
                ).then(
                    data => {
                        data = data["results"]
                        for (let i = 0; i < data.length; i++) {
                            let Obj = {
                                id: data[i]['id'],
                                title: data[i]['title'],
                                date_created: data[i]['date_created'],
                                bill: data[i]['bill']
                            }
                            this.payments.push(Obj)
                        }
                    }
                )
            )
        }, // get_order_details

        show_payment_modal: function () {
            if (this.payment_modal == true) {
                this.payment_modal = false
                this.payment_modal_reverse = true
            }
            else {
                this.payment_modal = true
                this.payment_modal_reverse = false
            }
        },

        add_payment: function () {
            fetch(this.main_url + 'ims/payments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': this.payment_title,
                    'order': this.order,
                    'bill': this.payment_bill
                })
            }).then(
                () => { this.getOrderDetails() }
            )
        },

        print: function () {
            print();
        }


    },

    beforeMount() {
        this.getOrderDetails()
    }

})

</script>