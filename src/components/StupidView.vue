<template>
    <div class="row">
        <div class="col-md-4">
            <h3>Sales</h3>
            <Bar v-if="loaded" :chart-data="chartData" />
        </div>
        <div class="col-md-4">
            <Line v-if="loaded" :chart-data="chartData" />
        </div>
        <div class="col-md-4">
            <Pie v-if="loaded" :chart-data="chartData" />
        </div>
    </div>
</template>
  
<script>
import { Bar, Line, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar, Line, Pie },
    data() {
        return {
            dataOne: null,
            loaded: false,
            chartData: {
                labels: [],
                datasets: [

                ]
            }
        }
    },
    methods: {
        runner: function () {
            fetch("http://172.16.30.5:8000/ims/balances/").then(
                res => { return res.json() }
            ).then(
                data => {
                    let spr = JSON.stringify(data.length)
                    this.chartData.labels = [
                        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                    ]
                    this.chartData.datasets = [
                        {
                            label: 'Profit',
                            backgroundColor: '#f87979',
                            data: [spr, 20, 18]
                        },
                        {
                            label: 'Expense',
                            backgroundColor: '#242424',
                            data: [4, 24, 12]
                        }
                    ]
                }
            ).then(
                () => { this.loaded = true }
            )
        }
    },

    async mounted() {
        this.loaded = false
        this.runner();
    }

}
</script>