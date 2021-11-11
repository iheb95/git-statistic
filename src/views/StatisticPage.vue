<template>
    <div class="container">
        <h1>List of repositories owned by: {{ username }}</h1>
        <br>
        <div v-if="loading" class="loading">
        Loading...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>

        <div v-if="repos" class="content">
            <Repositories :repos="repos"/>
        </div>
        <router-link to="/">
            <Button text="Back" color="#3ca44e" class="back-btn"/>
        </router-link>
    </div>
</template>

<script>
import Repositories from '../components/Repositories'
import Button from '../components/Button'
export default {
    name: 'StatisticPage',
    props: {
    },
    components: {
        Repositories,
        Button
    },
    data() {
        return {
            username: null,
            error: null,
            loading: false,
            repos: null
        }
    },
    created () {
        this.getRepos()
    },
    methods: {
        async fetchRepositories(name) {
            try {
                const res = await fetch(`api/users/${name}/repos`);
                const data = await res.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        getRepos () {
            this.username = this.$route.params.data;
            this.error = this.repos = null;
            this.loading = true;
            this.fetchRepositories(this.username).then((data, err) => {
                this.loading = false
                if (err) {
                this.error = err.toString()
                } else {
                this.repos = data.filter((el, id) => id < 5);
                }
            })
        }
    }    
}
</script>

<style scoped>
.back-btn {
    width: 300px;
}
</style>