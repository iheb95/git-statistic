<template>
    <div v-if="loading" class="loading">
        Bar Chart Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>
    <div v-if="!loading" class="charts">
        <div class="data-display-title">
            <h3>Commit Activity</h3>
        </div>
        <highcharts :options="options" ref="barChart"></highcharts>
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
                    type: "bar"
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: null,
                    title: {
                    text: 'Week'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                    text: "Commits",
                    align: "high"
                    },
                    labels: {
                    overflow: "justify"
                    }
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
                    name: "Sunday",
                    data: []
                    },
                    {
                    name: "Monday",
                    data: []
                    },
                    {
                    name: "Tuesday",
                    data: []
                    },
                    {
                    name: "Wednesday",
                    data: []
                    },
                    {
                    name: "Thursday",
                    data: []
                    },
                    {
                    name: "Friday",
                    data: []
                    },
                    {
                    name: "Saturday",
                    data: []
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
            this.options.xAxis.categories = fetchedData.map(el => el.week.toString());
            for (let i=0; i<fetchedData.length; i++) {
                for (let j=0; j<7; j++){
                    this.options.series[j].data.push(fetchedData[i].days[j]);
                }
            }
        },
        async fetchCommitData(owner, repoName) {
            try {
                const res = await fetch(`api/repos/${owner}/${repoName}/stats/commit_activity`);
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
    margin-top: 100px;
    border: 1px solid #d8dee4;
    border-radius: 5px;
    background-color: #f6f8fa;
    margin-bottom: 10px;
}
.data-display-title h3 {
        padding: 7px;
}
</style>