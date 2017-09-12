<template>
	<div class="round-box">
		<a href="javascript:;" class="gotoreturn" @click='goReturn'>
			<img src="../../static/img/ac9936f9538a2d55d9c9505237b33124.png" />
		</a>
		<div class="round-round">
			<div class="round-center" @click='start' :class="deg">
				<img src="../../static/img/roundcenter.png" />
			</div>
		</div>
		<div v-transfer-dom class="chenbowens">
			<alert v-model="show" :title="title" :content="msg" @on-hide='onHide'></alert>
		</div>
		<p class="tips">新注册用户7天内可每天免费抽取一次!七天后每次抽取花费10棵种子</p>
	</div>
</template>
<script>
	import { XButton, Alert, TransferDomDirective as TransferDom } from 'vux'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Alert,
			XButton
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				deg: 'deg0',
				id: '',
				show: false,
				num: 0,
				msg: '',
				title: '',
				add: 0
			}
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
		},
		methods: {
			onHide() {
				this.deg = 'deg0'
			},
			goReturn() {
				this.$router.push('/index')
			},
			start() {
				if(this.add > 0) {
					this.$vux.alert.show({
						title: '对不起',
						content: '请等待抽奖结果!'
					})
					return false
				}
				this.add = 1
				this.$http.get(this.enhttp + '/trees/mobile/app/extract?id=' + this.id).then(
					(res) => {
						let $this = this
						if(res.data.success) {
							console.log(res.data)
							this.deg = 'deg' + res.data.data.number
							this.num = res.data.data.seeds
							this.title = '恭喜'
							this.msg = '恭喜您获得' + this.num + '棵种子!'
							setTimeout(function() {
								$this.add = 0
								$this.show = true
							}, 2000)
						} else {
							this.title = '失败'
							$this.show = true
							this.msg = res.data.message
							$this.add = 0
						}
					}
				)
			}
		}
	}
</script>
<style>
	.gotoreturn {
		display: block;
		margin: 10px;
		width: 1.084337rem;
		height: 1.084337rem;
		overflow: hidden;
	}
	
	.tips {
		text-align: center;
		position: absolute;
		bottom: 10px;
		width: 100%;
		height: 0.602409rem;
		line-height: 0.602409rem;
		font-size: 0.337349rem;
		color: #fff;
		letter-spacing: 0.012048rem;
	}
	
	.gotoreturn img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.header-return {
		height: 0.722891rem;
		background: rgba(255, 255, 255, 0.5);
	}
	
	.vux-x-icon {
		position: absolute;
		top: 0.024096rem;
		fill: #fff;
	}
	
	.chenbowens .weui-dialog {
		max-width: 200px !important;
	}
	
	.chenbowens .weui-dialog__hd {
		padding: 0 !important;
	}
	
	.round-box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(../../static/img/roundbg.png) repeat center;
		background-size: 100% auto;
		position: relative;
	}
	
	.round-round {
		width: 7.398rem;
		height: 7.398rem;
		background: url(../../static/img/rounda.png) no-repeat center;
		background-size: 100% auto;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		right: 30px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	
	.round-center {
		position: relative;
		width: 2.168674rem;
		height: 2.168674rem;
		background: url(../../static/img/roundss.png) repeat;
		background-size: 100% 100%;
		left: 0.13rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	
	.round-center img {
		width: 1.783132rem;
		height: 1.783132rem;
	}
	
	.round-center:after {
		position: absolute;
		top: -0.52012rem;
		content: '';
		left: 0;
		width: 2.168674rem;
		height: 0.53012rem;
		background: url(../../static/img/roundsa.png) center no-repeat;
		background-size: 100% 100%;
	}
	
	.deg0 {
		transform: rotate(0deg);
	}
	
	.deg1 {
		transform: rotate(384.5deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg2 {
		transform: rotate(430deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg3 {
		transform: rotate(475deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg4 {
		transform: rotate(520deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg5 {
		transform: rotate(565deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg6 {
		transform: rotate(610deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg7 {
		transform: rotate(655deg);
		transition: 1.8s ease-in-out;
	}
	
	.deg8 {
		transform: rotate(700deg);
		transition: 1.8s ease-in-out;
	}
</style>