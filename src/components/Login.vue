<template>
    <div class="container">
        <h5>Enter Github username</h5>
        <input class="start-field" placeholder="username" v-model="username"/>
        <Button @click="shareUsername()" class="start-btn" :class="{ disabled: !validName }" text="Start" color="#3ca44e"/>
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'Login',
    components: {
        Button
    },
    data() {
        return {
            username: ''
        }
    },
    computed: {
        validName() {
            return this.username !== ''
        }
    },
    methods: {
        shareUsername() {
            this.$router.push({name: "StatisticPage", params:{data: this.username}});
        }
    }
}
</script>

<style scoped>
.container {
    border: 1px solid #d8dee4;
    border-radius: 5px;
    display: block;
    background-color: #f6f8fa;
    width: 350px;
    height: 180px;
    margin: auto;
    padding: 20px;
}
.start-btn {
    width: 300px;
    padding-left: 25px;
    padding-right: 25px;
}
.start-field {
    width: 300px;
    height: 40px;
    margin: 5px;
}
.error-text {
    color: red;
    display: block;
    text-align: left;
    margin-left: 20px;
}
.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>