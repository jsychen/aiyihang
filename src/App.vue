<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  created(){
  
  }
}
</script>

<style>
html,body,.wrap{
  height:100%;
  margin:0;
  padding:0;
}
#app {
  height:100%;
}
input{
  -webkit-appearance: none;
}
.tx-center{
  text-align: center;
}
input:disabled {
  background:#fff!important;
}
img{
  border: 0; 
}
</style>
