<template>
	<div class="hot-article-box">
		<v-header title="热门文章" map="任务说明" @edit="showMaster"></v-header>
		<router-view></router-view>
		<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
			<div class="content">
				<p>
					1.热文打开后请阅读至少5秒钟；<br/>
					2.每增加一次阅读得0.05元，最高得2元；<br/>
					3.自己分享并阅读可得0.05元；<br/>
					4.分享到朋友圈时，写点分享语可以吸引阅读哦；<br/>
					5.分享到微信后，自己点击阅读也有收益；<br/>
					6.分享到微信群中，收益更多更快。
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				masterShow: false
			}
		},
		methods: {
			showMaster() {
				this.masterShow = true
			}
		}
	}
</script>

<style lang="less">
	@rem: 40rem;
	.hot-article-box{
		padding-top: 44px;
		.header-box{
			.map{
				padding-right: 16px;
			}
		}
		.master {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 3;
			left: 0;
			top: 0;
			background-color: rgba(0,0,0,0.4);
			.content {
				width: 600/@rem;
				height: 300/@rem;
				background-color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -300/@rem;
				margin-top: -150/@rem;
				border-radius: 9px;
				overflow-y: auto;
				p {
					font-size: 24/@rem;
					margin: auto;
					line-height: 44/@rem;
					margin-top: 16/@rem;
					margin-bottom: 16/@rem;
					margin-left: 40/@rem;
				}
			}
		}
	}
</style>