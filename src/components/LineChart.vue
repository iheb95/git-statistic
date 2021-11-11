<template>
    <div v-if="loading" class="loading">
        Line Chart Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>
    <div v-if="!loading" class="charts">
        <div class="data-display-title">
            <h3>Participation</h3>
        </div>
        <highcharts :options="options" ref="chart"></highcharts>
    </div>
</template>

<script>
export default {
    props: {
        repoInfo: Object
    },
    data() {
        return {
            options: {
                chart: {
                    type: "line"
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                tooltip: {
                    valueSuffix: null
                },
                plotOptions: {
                    bar: {
                    dataLabels: {
                        enabled: true
                    }
                    }
                },
                legend: {
                    layout: "vertical",
                    align: "right",
                    verticalAlign: "top",
                    x: -20,
                    y: 50,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: "#FFFFFF",
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        name: "Owner",
                        data: null
                    },
                    {
                        name: "Others",
                        data: null
                    }
                ]
                },
            error: null,
            loading: false
        };
    },
    created () {
        this.getCommitData() //add it to :callback
    },
    methods: {
        updateChartData(fetchedData) {
            this.options.series[0].data = fetchedData.owner;
            this.options.series[1].data = fetchedData.all;
        },
        async fetchCommitData(owner, repoName) {
            try {
                const res = await fetch(`api/repos/${owner}/${repoName}/stats/participation`);
                const data = await res.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        getCommitData () {
            this.loading = true
            this.fetchCommitData(this.repoInfo.owner, this.repoInfo.repoName).then((data, err) => {
                if (err) {
                this.error = err.toString()
                } else {
                this.updateChartData(data);
                }
                this.loading = false;
            })
        }
    } 
};
</script>

<style scoped>
.charts {
    max-width: 80%;
    margin: auto;
}
.loading {
    height: 200px;
}
.data-display-title {
    height: 50px;
    border: 1px solid #d8dee4;
    border-radius: 5px;
    background-color: #f6f8fa;
    margin-bottom: 10px;
}
.data-display-title h3 {
        padding: 7px;
}
</style>