<template>
	<div class="task-box">
		<v-header title="任务大厅" map="任务说明" @edit="showMaster"></v-header>
		<div class="master" @touchmove.prevent v-show="masterShow" @click="masterShow=!masterShow">
			<div class="content">
				<p>
					1、打开任务阅读到最后领取佣金；<br />
2、分享到社交圈，好友查看同样有收益；<br />
3、任务打开后阅读至少6秒钟；<br />
4、每增加一次阅读可得0.05元以上收益，最高可得20元；<br />
5、自己分享并阅读也有相同收益；<br />
6、分享到社交圈时，写点分享语可以吸引阅读哦。<br />
				</p>
			</div>
		</div>
		<router-view></router-view>
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
	.task-box {
		padding-top: 44px;
		.header-box {
			.map {
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
			background-color: rgba(0, 0, 0, 0.4);
			.content {
				width: 600/@rem;
				height: 300/@rem;
				background-color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				height: auto;
				margin-left: -300/@rem;
				margin-top: -150/@rem;
				border-radius: 9px;
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