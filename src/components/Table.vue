<template>
    <div v-if="loading" class="loading">
        Data Table Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>
    
    <div v-if="!loading" class="data-table mt-4">
        <div class="data-display-title">
            <h3>Contribution</h3>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Author Id</th>
                    <th scope="col">Author Login</th>
                    <th scope="col">Total Contributions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in items" :key="index">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.author }}</td>
                    <td>{{ item.total }}</td>
                </tr>
            </tbody>
        </table>    
    </div>
</template>

<script>
export default {
    props: {
        repoInfo: Object
    },
    data() {
        return {
            items: null,
            error: null,
            loading: false
        }
    },
    created () {
        this.getCommitData() //add it to :callback
    },
    methods: {
        updateChartData(fetchedData) {
            const arr = [];
            fetchedData.forEach(el => {
                arr.push({
                    id: el.author.id,
                    author: el.author.login,
                    total: el.total
                })
            });
            arr.sort((a, b) => {
                return b.total - a.total
            });
            this.items = arr.slice(0,5);
        },
        async fetchCommitData(owner, repoName) {
            try {
                const res = await fetch(`api/repos/${owner}/${repoName}/stats/contributors`);
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
                this.error = err.toString();
                console.log('there is err');
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
.data-table {
    max-width: 80%;
    margin: auto;
}
table tbody {
    margin-bottom: 100px;
}
table tbody tr {
    width: 100%;
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