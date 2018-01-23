<template>
  <div id="app">
    <img-view style="width:80%;height:80%;position:absolute;" :imgUrl="imgUrl" background="#000"></img-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      imgUrl: 'http://n.sinaimg.cn/ent/transform/w630h945/20171228/Uu4x-fypyuvc9834765.jpg'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
