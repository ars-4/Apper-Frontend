<template>
    <div class="inventory">

        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h1>Inventory</h1>
                    </div>
                    <div class="col-md-4">
                        <input type="text" @change="search_order( $event )" class="form-control"
                            placeholder="Search Order">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary">Search</button>
                    </div>
                </div>
                <div class="card" style="">
                    <table>
                        <tr>
                            <th>Serial #</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>Add / Delete</th>
                        </tr>
                        <tr v-for="ele in products_list" v-bind:key="ele">
                            <td>{{ ele.id }}</td>
                            <td>{{ ele.title }}</td>
                            <td>{{ ele.price }}</td>
                            <td>{{ ele.stock }}</td>
                            <td>
                                <div class="row">
                                    <div class="col-2">

                                    </div>
                                    <div class="col-4">
                                        <input type="number" class="form-control" v-model="special">
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-primary fa fa-plus"
                                            @click="stock_in(String(ele.id), String(special))"></button>
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-danger fa fa-minus"
                                            @click="stock_out(String(ele.id), String(special))"></button>
                                    </div>
                                    <div class="col-2">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- Products -->
                <br>
                <div class="card">
                    <table>
                        <tr>
                            <th>Serial #</th>
                            <th>Title</th>
                            <th>Bill</th>
                            <th>Customer</th>
                            <th>Date</th>
                        </tr>
                        <tr v-for="ele in orders_list" v-bind:key="ele">
                            <td>{{ ele.id }}</td>
                            <td>
                                <router-link to="/ims/order/" @click="set_order(ele.id)">{{ ele.title }}</router-link>
                            </td>
                            <td>{{ ele.bill }}</td>
                            <td>{{ ele.customer_name }}</td>
                            <td><img :src="main_url+'media/receipts/'+ele.title+'.png'"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-md-4 latestOrder">
                <button @click="show_modal_product" class="btn btn-primary"><span class="fa fa-plus"></span>
                    Product</button>
                &nbsp;
                <button @click="show_modal_order" class="btn btn-primary"><span class="fa fa-plus"></span>
                    Order</button>
                &nbsp;
                <button @click="show_modal_balance" class="btn btn-primary"><span class="fa fa-plus"></span>
                    Balance</button>
                <br>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card bg-success text-light">
                            <h5>{{ profits }} /-pkr</h5>
                            <h5>Profit</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card bg-danger text-light">
                            <h5>{{ expenses }} /-pkr</h5>
                            <h5>Expense</h5>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card bg-secondary text-light">
                            <h5>{{ general }} /-pkr</h5>
                            <h5>General</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card bg-info text-light">
                            <h5>{{ cashinhand }} /-pkr</h5>
                            <h5>In-Hand</h5>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <h4>Add Product Type</h4>
                    <input type="text" v-model="ims_type_title" placeholder="Title" class="form-control">
                    <input type="text" v-model="ims_type_description" placeholder="Description" class="form-control">
                    <select v-model="ims_type_type" class="form-control">
                        <option value="mtr" selected>Meter(s)</option>
                        <option value="qty">Quantity</option>
                        <option value="ltr">Litre(s)</option>
                    </select>
                    <button class="btn btn-primary" @click="add_product_type">Add Product Type</button>
                </div>
                <br>
                <div class="card">
                    <h4>Last Order</h4>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <p>Title</p>
                            <p>Customer Name</p>
                            <p>Bill</p>
                            <p>Products</p>
                        </div>
                        <div class="col-6">
                            <p>{{ latest_order.title }}</p>
                            <p>{{ latest_order.customer_name }}</p>
                            <p>{{ latest_order.bill }} /-pkr</p>
                            <span v-for="ele in latest_order.products" :key="ele">
                                <span>{{ ele }}, </span>
                            </span>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Bill</th>
                            <th>Date</th>
                        </tr>
                        <tr v-for="ele in expense_list" :key="ele.id">
                            <td>{{ ele.title }}</td>
                            <td>{{ ele.bill }}</td>
                            <td>{{ ele.date }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div :class="{'product_modal':true, 'card':true, 'hidden_modal':product_mod, 'visible_modal':product_mod_inverse}"
            id="12">
            <h3>Add Product</h3>
            <hr>
            <input type="text" class="form-control" v-model="product_title" placeholder="Product Name">
            <input type="text" class="form-control" v-model="product_description" placeholder="Product Description">
            <input type="number" class="form-control" v-model="product_purchase_price"
                placeholder="Product Purchase Price">
            <input type="number" class="form-control" v-model="product_sale_price" placeholder="Product Sale Price">
            <select v-model="product_type" @change="test($event)" class="form-control">
                <option v-for="typ in product_type_list" :key="typ.id" v-bind:value="typ.id">{{ typ.title }}</option>
            </select>
            <button class="btn btn-primary" @click="add_product">Add</button>
            <br>
            <button class="btn btn-danger" @click="show_modal_product">Cancel</button>
        </div>

        <div :class="{'product_modal':true, 'card':true, 'hidden_modal':order_mod, 'visible_modal':order_mod_inverse}">
            <h3>Add Order</h3>
            <hr>
            <input type="text" class="form-control" v-model="order_title" placeholder="Order Title">
            <input type="text" class="form-control" v-model="order_description" placeholder="Description">
            <input type="text" class="form-control" v-model="order_customer_name" placeholder="Customer Name">
            <select class="form-control" v-model="order_status">
                <option value="paid" selected>Paid</option>
                <option value="unpaid">Unpaid</option>
            </select>
            <div class="row">
                <div class="col-md-8">
                    <input type="text" placeholder="Search For Product" class="form-control"
                        @change="search_prod( $event )" v-model="search_products_list">
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary"><span class="fa fa-plus"></span> Search</button>
                </div>
            </div>

            <br>

            <div v-for="prod in temp_products_list" :key="prod.id" class="row">
                <div class="col-md-6">
                    <input :value="prod.id" type="checkbox" v-model="order_products" class="form-check-input">
                    &nbsp;
                    <label for="" class="form-check-label">{{ prod.title }}</label>
                </div>
                <div class="col-md-4">
                    <input type="number" class="form-control" v-model="prod.special_id">
                </div>
                <div class="col-md-2">
                    <input class="form-check-input" type="checkbox" @click="add_in_quantity(prod.special_id)">
                </div>
            </div>
            <br>
            <button class="btn btn-primary" @click="add_order">Add</button>
            <br>
            <button class="btn btn-danger" @click="show_modal_order">Cancel</button>
        </div>

        <div
            :class="{'product_modal':true, 'card':true, 'hidden_modal':balance_mod, 'visible_modal':balance_mod_inverse}">
            <h3>Add Balance</h3>
            <hr>
            <input type="text" class="form-control" v-model="balance_title" placeholder="Title">
            <input type="text" class="form-control" v-model="balance_description" placeholder="Description">
            <select class="form-control" v-model="balance_type">
                <option value="expense" selected>Expense</option>
                <option value="profit">Profit</option>
                <option value="general">General</option>
                <option value="cashinhand">Cash-In-Hand</option>
            </select>
            <input type="number" class="form-control" v-model="balance_bill" placeholder="0">
            <button class="btn btn-primary" @click="add_balance">Add</button>
            <br>
            <button class="btn btn-danger" @click="show_modal_balance">Cancel</button>
        </div>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    data() {
        return {
            print_time: false,

            product_type_list: [],
            products_list: [],
            temp_products_list: [],
            search_products_list: '',
            orders_list: [],
            expense_list: [],
            latest_order: {},
            products_list_values: [],

            ims_type_title: '',
            ims_type_description: '',
            ims_type_type: '',

            special: '0',
            product_title: '',
            product_description: '',
            product_price: '0',
            product_purchase_price: '0',
            product_sale_price: '0',
            product_type: '1',

            order_title: '',
            order_description: '',
            order_bill: '',
            order_products: [],
            order_products_quantity: [],
            order_customer_name: '',
            order_barcode: '',
            order_status: 'paid',

            balance_title: '',
            balance_description: '',
            balance_bill: '0',
            balance_type: 'expense',

            profits: '3600',
            expenses: '3600',
            general: '0',
            cashinhand: '0',


            product_mod: true,
            product_mod_inverse: false,
            order_mod: true,
            order_mod_inverse: false,
            balance_mod: true,
            balance_mod_inverse: false,


            print_img: '',
            print_title: '',
            print_customer: '',
            print_date: ''

        }
    },
    methods: {

        get_product_types: async function () {
            this.product_type_list = []
            fetch(this.main_url + "ims/ims_type/").then(res => { return res.json() }).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        let Obj = {
                            id: i + 1,
                            title: data[i].title
                        }
                        this.product_type_list.push(Obj)
                    }
                }
            )
        },

        get_products: async function () {
            this.pth = "Inventory"
            this.ims_type_title = ""
            this.ims_type_description = ""
            this.products_list = [];
            this.orders_list = [];
            this.get_product_types()
            this.get_balance()
            this.special = '0'
            fetch(this.main_url + "ims/ims_product/", { headers: { 'Content-Type': 'application/json' } }).then(
                res => { return res.json() }
            ).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        let Obj = {
                            id: data[i].id,
                            title: data[i].title,
                            stock: data[i].in_stock,
                            price: data[i].sale_price,
                            special_id: String(i) + data[i].title
                        }
                        this.products_list.push(Obj)
                    }
                }
            ).catch(error => { console.log(error) })
            fetch(this.main_url + "ims/ims_order/", { headers: { 'Content-Type': 'application/json' } }).then(
                res => { return res.json() }
            ).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        let prods = []
                        for (let k = 0; k < data[i].products.length; k++) {
                            prods.push(data[i].products[k]['title'])
                        }
                        let Obj = {
                            id: data[i].id,
                            title: data[i].title,
                            customer_name: data[i].customer_name,
                            products: prods,
                            bill: data[i].bill,
                            date_created: data[i].date_created,
                            receipt: data[i].receipt
                        }
                        this.orders_list.push(Obj)
                        this.products_list_values.push("msg" + String(Obj.id))
                        this.latest_order = Obj
                    }
                }
            ).catch(error => { console.log(error) })
        }, //get_products

        search_prod: async function (e: any) {
            let this_string = e.target.value;
            this.temp_products_list = []
            for (let i = 0; i < this.products_list.length; i++) {
                if (this.products_list[i].title.includes(this_string)) {
                    this.temp_products_list.push(this.products_list[i])
                }
            }
        },

        search_order: function (_argument: any) {
            let this_string = _argument.target.value
            if (this_string.length > 0) {
                let temp_orders_list = []
                for (let i = 0; i < this.orders_list.length; i++) {
                    if (this.orders_list[i].title.includes(this_string)) {
                        temp_orders_list.push(this.orders_list[i])
                    }
                }
                this.orders_list = temp_orders_list
            }
            else {
                this.get_products();
            }
        },

        get_product: function (_argument: string) {
            let obj_id = Number(_argument) + 1;
            fetch(this.main_url + `ims/ims_product/${obj_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => { return res.json() }).then(data => { return data })
        },//get_product

        get_balance: function () {
            let expenses = 0;
            let profits = 0;
            let general = 0;
            let cashinhand = 0;
            this.expense_list = [];
            fetch(this.main_url + "ims/balances/").then(res => { return res.json() }).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].type == 'expense') {
                            expenses = expenses + Number(data[i].bill)
                            let Obj = {
                                id: data[i].id,
                                title: data[i].title,
                                bill: data[i].bill,
                                date: data[i].date_created
                            }
                            this.expense_list.push(Obj)
                        }
                        else if (data[i].type == 'profit') {
                            profits = profits + Number(data[i].bill)
                        }
                        else if (data[i].type === 'general') {
                            general = general + Number(data[i].bill)
                        }
                        else if (data[i].type === 'cashinhand') {
                            cashinhand = cashinhand + Number(data[i].bill)
                        }
                    }
                    this.expenses = String(expenses)
                    this.profits = String(profits)
                    this.general = String(general)
                    this.cashinhand = String(cashinhand)
                }
            )
        }, // get_balance

        stock_in: function (_argument: string, _qty: string) {
            let obj_id = Number(_argument)
            fetch(this.main_url + `ims/stock/${obj_id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'instock': _qty,
                    'type': 'in'
                })
            }).then(() => { this.get_products() }).catch(error => { console.error(error) })
        }, // stock_in

        stock_out: function (_argument: string, _qty: string) {
            let obj_id = Number(_argument)
            fetch(this.main_url + `ims/stock/${obj_id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'instock': _qty,
                    'type': 'out'
                })
            }).then(() => { this.get_products() }).catch(error => { console.error(error) })
        }, //stock_out


        add_product_type: function () {
            fetch(this.main_url + "ims/ims_type/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': this.ims_type_title,
                    'description': this.ims_type_description,
                    'type': this.ims_type_type
                })
            }).then(() => { this.get_products() })
        }, //add_product_type

        add_product: function () {
            fetch(this.main_url + "ims/ims_product/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': this.product_title,
                    'description': this.product_description,
                    'sale_price': this.product_sale_price,
                    'purchase_price': this.product_purchase_price,
                    'imstype': String(this.product_type),
                    'instock': '0'
                })
            }).then(res => { return res.json() }).then(data => { this.get_products(); this.show_modal_product(); })
        }, //add_product

        test: function (e: any) {
            console.log(e.target)
        },

        add_order: function () {
            fetch(this.main_url + "ims/ims_order/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': this.order_title,
                    'description': this.order_description,
                    'customer_name': this.order_customer_name,
                    'products': this.order_products,
                    'quantity': this.order_products_quantity,
                    'status': this.order_status
                })
            }).then(res => { return res.json() }).then(data => { this.get_products(); this.show_modal_order(); this.temp_products_list = [] })
        }, //add_order


        add_in_quantity: function (_argument: string) {
            this.order_products_quantity.push(_argument)
        },

        add_balance: function () {
            fetch(this.main_url + 'ims/balances/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': this.balance_title,
                    'description': this.balance_description,
                    'type': this.balance_type,
                    'bill': String(this.balance_bill)
                })
            }).then(() => { this.show_modal_balance(); this.get_products() })
        }, // add_balance

        show_modal_product: function () {
            if (this.product_mod == true) {
                this.product_mod = false
                this.product_mod_inverse = true
            }
            else {
                this.product_mod = true
                this.product_mod_inverse = false
            }
        }, //show_modal_product
        show_modal_order: function () {
            if (this.order_mod == true) {
                this.order_mod = false
                this.order_mod_inverse = true
                this.temp_products_list = []
            }
            else {
                this.order_mod = true
                this.order_mod_inverse = false
            }
        },
        show_modal_balance: function () {
            if (this.balance_mod == true) {
                this.balance_mod = false
                this.balance_mod_inverse = true
            }
            else {
                this.balance_mod = true
                this.balance_mod_inverse = false
            }
        },

        set_order: function (_argument: string) {
            localStorage.setItem('order', _argument)
        }

    },
    beforeMount() {
        this.get_products()
    },
})

export default class InventoryView extends Vue { }
</script>