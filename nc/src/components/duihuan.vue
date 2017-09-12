<template>
	<div class="list-body">
		<x-header>兑换果实</x-header>

		<div class="chushou-tips">
			<p>交易说明:</p>
			<span>交易扣除卖家10%果实。地主级别交易不扣手续费。</span>
		</div>

		<div class="kechushou">
			果实数量:{{cknum}}
		</div>

		<group>
			<x-input title="兑换数量" v-model='num' name="username" placeholder="请输入您的数量,必须是200的整数倍,才可转换"></x-input>
			<x-input type='password' v-model='mima' title="二级密码" name="username" placeholder="交易密码（二级密码）"></x-input>
		</group>
		<group style='padding: 0.240963rem;box-sizing: border-box;'>
			<x-button type="primary" @click.native='duihuan()'>确认兑换</x-button>
		</group>
	</div>
</template>
<script>
	import { XTextarea, XHeader, XButton, Flexbox, FlexboxItem, XInput, Group } from 'vux'
	export default {
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			XTextarea
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				cknum: '',
				num: '',
				mima: ''
			}
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
			this.$http.get(this.enhttp + '/trees/mobile/app/getSeedsBalance?userId=' + id).then(
				(res) => {
					console.log(res.data)
					this.cknum = res.data.data
				}
			)
		},
		methods: {
			duihuan() {
				this.$http.get(this.enhttp + '/trees/mobile/app/changeSeeds?userId=' + this.id + '&seeds=' + this.num + '&dealPassword=' + this.mima).then(
					(res) => {
						let $this = this
						if(!res.data.success) {
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message,
								onHide() {
									$this.$router.go(0)
								}
							})
						}
						console.log(res.data)
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.chushou-tips {
		padding: 10px;
		box-sizing: border-box;
		font-size: 0.313253rem;
		p {
			color: red;
			display: inline-block;
		}
		span {
			font-size: 0.26506rem;
			color: #666;
		}
	}
	
	.kechushou {
		font-size: 0.313253rem;
		padding: 10px;
		box-sizing: border-box;
		background: #f90;
		color: #fff;
	}
</style>