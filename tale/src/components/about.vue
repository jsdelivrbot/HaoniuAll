<template>
	<div class="about">
		<goback title='关于我们'></goback>
		<img src="../../static/img/gscqlogo.png" class="logo" />
		<h2>民间骨事</h2>
		<p>公司概况 本公司是一家专业致力于项目投资、技术开发、策划、推广及销售为一体的新型科技创新型企业。公司经安庆市工商行政管理局批准登记成立，经安徽省食品药品监督管理局批准拥有互联网药品经营许可资质、经安庆市食品药品监督管理局批准拥有国家二类医疗器械经营许可资质、拥有食品流通经营许可。</p>
	</div>
</template>
<script>
	import goback from '../components/goback'
	export default {
		components: {
			goback
		}
	}
</script>
<style lang="less">
	.about {
		padding-top: 80px;
		box-sizing: border-box;
		background: #fff;
		min-height: 100vh;
		.logo {
			width: 120px;
			margin: auto;
			border-radius: 5px;
		}
		h2 {
			text-align: center;
			font-size: 18px;
			margin-top: 20px;
		}
		
		p{
			padding: 15px;
			box-sizing: border-box;
			line-height: 24px;
			font-size: 14px;
			color: #363636;
			text-indent: 2em;
		}
	}
</style>