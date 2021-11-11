<template>
    <div class="container">
        <div class="info">
            <span><b>Name of repository:</b> {{ repo.name }}</span><br>
            <span><b>Main programming language:</b> {{ repo.language }}</span><br>
            <span><b>Number of stars:</b> {{ repo.stargazers_count }}</span><br>
        </div>
        <Button @click="shareRepId()" text="More info" color="#24292f" class="info-btn"/>
    </div>
</template>

<script>
import Button from './Button'
export default {
    name: 'Rep',
    components: {
        Button
    },
    props: {
        repo: Object
    },
    methods: {
        shareRepId() {
            this.$router.push({name: "DetailsPage", params:{data: this.repo.id}});
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
    max-width: calc(100% - 250px);
}
.info-btn {
    margin-left: auto;
    min-width: 130px;
    height: 40px;
}
</style>