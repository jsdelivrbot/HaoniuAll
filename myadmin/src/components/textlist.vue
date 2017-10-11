<template>
	<div class="text-list-box">
		<ul>
			<li v-for="item in 100">
				<img src="../../static/img/20669.jpg" />
				<p>星星点课</p>
				<p>2017-06-06</p>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="less">
	.text-list-box {
		display: block;
		width: 100%;
		height: 100%;
		padding: 30px 20px;
		box-sizing: border-box;
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 24%;
				overflow: hidden;
				padding: 10px;
				box-sizing: border-box;
				border: 1px solid #eee;
				margin: 0.5%;
				img {
					width: 100%;
				}
			}
		}
	}
</style>