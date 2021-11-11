<template>
  <fa :icon="['fab', 'github']" style="font-size:50px"/>
  <h1>Welcome to GitStatistic !</h1>
  <Login/>
</template>

<script>
import Login from '../components/Login'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>