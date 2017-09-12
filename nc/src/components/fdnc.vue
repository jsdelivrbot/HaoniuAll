<template>
	<div class="body">
		<a href="javascript:;" class="fanhui" @click='goReturn'>
			<img src="../../static/img/ac9936f9538a2d55d9c9505237b33124.png" />
		</a>
		<div class="userinfo-box">
			<div class="right">
				<ul>
					<li>
						<a href="javascript:;" @click='_cangkushow'>
							<img src="../../static/img/cangku.png" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div v-transfer-dom class='cangkushow'>
			<x-dialog v-model="cangkushow">
				<p>
					<span> <em>总数:</em>{{userInfo.sumMoney}}</span>
					<span> <em>静态:</em>{{userInfo.staticMoney}}</span>
					<span> <em>保安:</em>{{userInfo.human}}</span>
				</p>
				<p>
					<span> <em>肥料:</em>{{userInfo.fodder}}</span>
					<span> <em>动态:</em>{{userInfo.dynamicMoney}}</span>
					<span> <em>哈士奇:</em>{{userInfo.dog}}</span>
				</p>
				<p>
					<span> <em>仓库:</em>{{userInfo.balance}}</span>
					<span> <em>总收益:</em>{{userInfo.dynamicMoney + userInfo.staticMoney}}</span>
					<span> <em>狒狒:</em>{{userInfo.bear}}</span>
				</p>
				<x-button type="primary" mini @click.native='hidecangku'>确定</x-button>
			</x-dialog>
		</div>

		<div class="cart">
			<span>
				<img  v-if='userInfo.bear>0' src="../../static/img/feifei.png" style="width: 2.6rem !important;" />
			</span>
			<span>
				<img  v-if='userInfo.dog>0' src="../../static/img/hsq@2x.png" style="width: 1rem !important;"/>
			</span>
			<span>
				<img v-if='userInfo.human>0'  src="../../static/img/ren.png" style="width: 2rem !important;" />
			</span>
		</div>

		<div class="cropland-box">
			<ul class="ul-hong">
				<li v-for='item in red'>
					<span class="shu" v-if='item.landFlag == 1'></span>
					<span class="wu" v-if='item.landFlag == 0'></span>
					<span class="shouhu" v-if='item.landFlag == 2'></span>
				</li>
			</ul>

			<ul class="ul-huang">
				<li v-for='item in yellow'>
					<span class="shu" v-if='item.landFlag == 1'></span>
					<span class="wu" v-if='item.landFlag == 0'></span>
					<span class="shouhu" v-if='item.landFlag == 2'></span>
				</li>
			</ul>

			<ul class="ul-hei">
				<li v-for='item in black'>
					<span class="shu" v-if='item.landFlag == 1'></span>
					<span class="wu" v-if='item.landFlag == 0'></span>
					<span class="shouhu" v-if='item.landFlag == 2'></span>
				</li>
			</ul>

		</div>
	</div>
</template>
<script>
	import { Confirm, XInput, Group, Flexbox, FlexboxItem, XButton, XDialog, TransferDomDirective as TransferDom } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XDialog,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			Confirm
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				tt: true,
				show: false,
				show1: false,
				fdid: '',
				userInfo: [],
				black: [],
				yellow: [],
				red: [],
				zdid: '',
				seeds: '',
				ckval: '',
				cangkushow: false
			}
		},
		mounted() {
			let id = this.$route.params.id
			this.fdid = id
			let $this = this
			this.$http.get(this.enhttp + '/trees/mobile/app/index?id=' + id).then(
				(res) => {
					$this.userInfo = res.data.data.userData
					$this.black = res.data.data.blackLand
					$this.yellow = res.data.data.yellowLand
					$this.red = res.data.data.redLand
					console.log(res.data)
				},
				(res) => {
					console.log(res.data)
				}
			)
		},
		methods: {
			goReturn() {
				this.$router.push('/index')
			},
			queding() {
				this.show = false
			},
			zhongdi(id) {
				this.zdid = id
				this.show1 = true
			},
			truetou() {
				alert(1)
			},
			hidecangku() {
				this.cangkushow = false
			},
			_cangkushow() {
				this.cangkushow = true
			}
		}
	}
</script>
<style lang="less">
	.cangkushow {
		height: auto;
		overflow: hidden;
		.weui-dialog {
			padding-top: 30px;
			height: auto;
			overflow: hidden;
			height: 4rem;
			box-sizing: border-box;
		}
		.weui-btn_mini {
			margin-top: 0.120481rem;
			display: inherit;
		}
	}
	
	.fanhui {
		display: block;
		position: absolute;
		z-index: 2;
		padding: 0.120481rem;
		img {
			width: 1.204819rem;
		}
	}
	
	.gameguanli {
		.weui-dialog {
			text-align: center;
			box-sizing: border-box;
		}
		ul {
			width: 100%;
			text-align: center;
			height: auto;
			overflow: hidden;
			padding: 0.481927rem;
			box-sizing: border-box;
			li {
				display: inline-block;
				width: 50%;
				float: left;
				margin: 0.120481rem 0;
			}
		}
		a {
			display: block;
			margin: auto;
			height: 0.722891rem;
			width: 2.554216rem;
			background: #f50;
			background: url(../../static/img/btnbg.png) no-repeat;
			background-size: 100%;
			overflow: hidden;
			font-size: 0.337349rem;
			line-height: 0.722891rem;
			color: #fff;
		}
	}
	
	.cangkushow p {
		display: flex;
		height: 0.722891rem;
		overflow: hidden;
		span {
			flex: 1;
			height: 0.722891rem;
			font-size: 0.361445rem;
			font-size: 0.313253rem;
			color: #666;
			text-align: center;
			em {
				color: #3C3C3C;
				font-style: normal;
				margin-right: 0.240963rem;
			}
		}
	}
</style>