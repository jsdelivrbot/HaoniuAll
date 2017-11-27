<template>
  <div id="app">
	  <keep-alive include="Hello,Personal">
	  	<router-view></router-view>
	  </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/close.less';

body {
  background-color: #eeeeee;
}
</style>
