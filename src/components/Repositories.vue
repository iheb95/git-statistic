<template>
    <div v-for="repo in repos" :key="repo.id">
        <Rep :repo="repo"/>
    </div>
</template>

<script>
import Rep from './Rep'

export default {
    name: 'Repositories',
    components: {
        Rep
    },
    props: {
         repos: Array
    }
}
</script>
