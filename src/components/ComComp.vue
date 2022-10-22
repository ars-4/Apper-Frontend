<template>
    <div class="col-md-4">
        <Pie v-if="loaded" :chart-data="PieChartData" />
    </div>
</template>

<script>

import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
    name: 'ComCompVue',
    components: { Pie },
    data() {
        return {
            loaded: false,
            pending: 0,
            completed: 0,
            PieChartData: {
                labels: ['Pending', 'Completed'],
                datasets: []
            },
        }
    },

    methods: {
        runner: function() {
            fetch(this.main_url + "cm/complaints/").then(res => {
                return res.json()
            }).then(data => {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].status == 'pending') {
                        this.pending = this.pending + 1
                    }
                    else {
                        this.completed = this.completed + 1
                    }
                }
            }).then(() => {
                this.PieChartData.lebels = ['Pending', 'Completed']
                this.PieChartData.datasets = [{
                    data: [this.pending, this.completed],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                }]
            })
            this.loaded = true
        }
    },

    async mounted() {
        this.loaded = false
        this.runner();
    }
}
</script>