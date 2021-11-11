<template>
    <h1>Repository details</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="repository" class="content">
        <div class="container">
            <div class="info">
                <span><b>Name of repository:</b> {{ repository.name }}</span><br>
                <span><b>Main programming language:</b> {{ repository.language }}</span><br>
                <span><b>Number of stars:</b> {{ repository.stargazers_count }}</span><br>
            </div>
        </div>
        <BarChart :repoInfo="{repoName: repository.name, owner: repository.owner.login}"></BarChart>
        <Table :repoInfo="{repoName: repository.name, owner: repository.owner.login}"></Table>
        <LineChart :repoInfo="{repoName: repository.name, owner: repository.owner.login}"></LineChart>
    </div>
    <router-link to="/statistic">
        <Button text="Back" color="#3ca44e" class="back-btn"/>
    </router-link>
</template>

<script>
import BarChart from "../components/BarChart.vue";
import LineChart from "../components/LineChart.vue";
import Table from "../components/Table.vue";
import Button from '../components/Button';

export default {
    name: 'DetailsPage',
    components: {
        BarChart,
        LineChart,
        Table,
        Button
    },
    data() {
        return {
            repository: null,
            RepoId: null,
            error: null,
            loading: false
        }
    },
    created () {
        this.getRepo()
    },
    watch: {
        '$route': 'getRepo'
    },
    methods: {
        async fetchRepository(id) {
            try {
                const res = await fetch(`api/repositories/${id}`);
                const data = await res.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        getRepo () {
            this.RepoId = this.$route.params.data;
            this.error = this.repository = null
            this.loading = true
            this.fetchRepository(this.RepoId).then((data, err) => {
                this.loading = false
                if (err) {
                this.error = err.toString()
                } else {
                this.repository = data;
                }
            })
        }
    }    
}
</script>

<style scoped>
.container {
    display: flex;
    border: 1px solid #d8dee4;
    border-radius: 5px;
    background-color: #f6f8fa;
    width: 70%;
    margin: auto;
    padding: 20px;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
}
.info {
    display: block;
}
.back-btn {
    width: 300px;
}
.loading {
    height: 713.75px;
}
</style>