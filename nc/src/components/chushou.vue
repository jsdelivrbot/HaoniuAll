<template>
	<div class="list-body">
		<x-header>出售果实</x-header>

		<div class="chushou-tips">
			<p>交易说明:</p>
			<span>交易扣除卖家10%果实。地主级别交易不扣手续费。</span>
		</div>

		<div class="kechushou">
			仓库中可出售数量:{{cknum}}
		</div>

		<group>
			<x-input title="出售数量" v-model='num' name="username" placeholder="请输入您的数量"></x-input>
			<x-input type='text' v-model='phone' title="目标手机号码" name="username" placeholder="出售对象的手机号码"></x-input>
			<x-input type='password' v-model='mima' title="二级密码" name="username" placeholder="交易密码（二级密码）"></x-input>
			<x-textarea title="备注" v-model="beizhu"></x-textarea>
		</group>
		<group style='padding: 0.240963rem;box-sizing: border-box;'>
			<x-button type="primary" @click.native='gomai()'>确认出售</x-button>
		</group>

		<div class="chushou-tips">
			<p>交易说明:</p>
			<span>
				果实恒定价格人民币一块钱一枚，交易时平台收取10%的手续费，此手续费由卖家出售的时候承担，如果出售100只果实，则实际扣除果实110只（地开垦满后免收手续费），本次将锁定出售的果实，无法再让其他人购买；请确认您已经与接收方联系并达成买卖意愿，否则由此造成的交易失败后果自己承担。
			</span>
		</div>
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
				enhttp: localStorage.getItem('httpurl'),
				cknum: '',
				num: '',
				phone: '',
				mima: '',
				beizhu: ''
			}
		},
		created() {
			let id = localStorage.getItem('id')
			this.id = id
			this.$http.get(this.enhttp + '/trees/mobile/app/index?id=' + id).then(
				(res) => {
					this.cknum = res.data.data.userData.balance
				}
			)
		},
		methods: {
			gomai() {
				if(this.id === '' || this.num === '' || this.phone === '' || this.mima === '') {
					this.$vux.alert.show({
						title: '对不起',
						content: '请完善您的出售信息!'
					})
					return false
				}
				this.$http.get(this.enhttp + '/trees/mobile/user/SellSeed?id=' + this.id + '&seed=' + this.num + '&userPhone=' + this.phone + '&dealPassword=' + this.mima + '&remark=' + this.beizhu).then(
					(res) => {
						let $this = this
						if(!res.data.success) {
							this.show = false
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.show = false
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