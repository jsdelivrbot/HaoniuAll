<template>
	<div class="agreement-box">
		<v-header title="爱蜂享服务协议"></v-header>
		<p class="detail">
			世界网络化、信息化将延伸到我们生活与工作的各个细微处，这是互联网发展的必然趋势,也是移动互联网这个新事物发展的一般规律。互联网对生活、对商业、对传媒广告的影响波及到我们每一个人。2015年中国网民达7.6亿、手机客户端移动网民5.8亿，2016年手机客户端移动网民6.56亿，平均日上网时间3.8小时。浏览资讯、订餐订票打车、联络沟通、购物学习、信息查询、生活缴费…… 安徽嘉润传媒科技有限公司重金打造的基于社交网络的新兴APP，用户可以通过做任务，将内容分享到微信朋友圈或者微博，从而获得金钱。这种新鲜的互动模式一经推出便是话题的风口浪尖。它颠覆了以往的传播模式，打破了广告主和用户的固定思维，用户由原来的被动接受，转为了主动传播并能从中获利，它跳过了媒介，而是直接将广告传播到社交网络内部。
		</p>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.agreement-box {
		padding-top: 44px;
		.detail {
			padding: 12px;
			font-size: 16px;
			color: #343434;
		}
	}
</style>