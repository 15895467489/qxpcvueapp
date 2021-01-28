<template>
  <div id="app"> 
  <router-link to='/login'></router-link>
  <!-- 渲染路径 匹配到视图组件 -->
    <router-view></router-view>
  </div>
</template>

<script>

// import Login from './views/Login.vue'

export default {
  name: 'App',
  components: {   
    // Login,
  }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
