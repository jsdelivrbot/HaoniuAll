<template>
	<div class="list-body">
		<x-header>{{title}}记录</x-header>
		<div class="fd-list">
			<ul>
				<li v-for='item in list'>
					<p>时间:{{item.addTime}}</p>
					<!--<p v-if='item.userId'>用户ID:{{item.userId}}</p>-->
					<p v-if='item.nickName '>用户名: {{item.nickName }}</p>
					<p v-if='item.userPhone '>用户手机号: {{item.userPhone }}</p>
					<p v-if='item.rewardType || item.rewardType == 0 '>{{item.rewardType | rewardTypes}}</p>
					<p v-if='item.landType || item.landType == 0 '>土地类型: {{item.landType | landTypes}}</p>
					<p v-if='item.landId'>土地编号: {{item.landId}}</p>
					<p v-if='item.seeds'>种子数量:{{item.seeds}}</p>
					<p v-if='item.dayRate'>收益:{{item.dayRate}}</p>
					<p v-if='item.dogTotal || item.dogTotal == 0'>哈士奇拆分倍数:{{item.dogTotal*100+'%'}}</p>
					<p v-if='item.personTotal || item.personTotal == 0'>人拆分倍数:{{item.personTotal*100+'%'}}</p>
					<p v-if='item.bearTotal || item.bearTotal == 0'>熊拆分倍数:{{item.bearTotal*100+'%'}}</p>
					<p v-if='item.dayTotal'>总收益:{{item.dayTotal*100+'%'}}</p>
					<p v-if='item.totalMoney || item.totalMoney == 0'>总收益数:{{item.totalMoney}}</p>
					<p v-if='item.canSteal'>可偷取金额:{{item.canSteal}}</p>
					<p v-if='item.rewardMoney'>金额:{{item.rewardMoney}}</p>
					<p v-if='item.stealUserPhone'>被偷取人手机号:{{item.stealUserPhone}}</p>
					<p v-if='item.stealNicname'>被偷取人昵称:{{item.stealNicname}}</p>
					<p v-if='item.allseed'>出售总金额:{{item.allseed}}</p>
					<p v-if='item.fee || item.fee == 0'>手续费:{{item.fee}}</p>
					<p v-if='item.seed'>出售金额:{{item.seed}}</p>
					<p v-if='item.orderState || item.orderState == 0'>交易状态:{{item.orderState | jyzt }}</p>

					<p v-if='item.remark'>备注:{{item.remark}}</p>

					<span v-if='dbtitle == "findSell"'>
						<p v-if='item.state || item.state == 0'>
							<x-button type="primary" v-if='item.state==0' mini @click.native.once='qrsh(item.id,item.seed)'>确认收货1</x-button>
							<x-button type="primary" v-if='item.state==1' mini disabled>已收货</x-button>
							<x-button type="primary" v-if='item.state==2' mini @click.native.once='qrsk(item.userId,item.buyUserId,item.id,item.seed)'>确认收款</x-button>
							<x-button type="primary" v-if='item.state==3' mini disabled>收款完成</x-button>
						</p>
					</span>

					<span v-if='dbtitle !== "findSell"'>
						<p v-if='item.state || item.state == 0'>
							<x-button type="primary" v-if='item.state==0' mini @click.native.once='qrsh(item.id,item.seed)'>等待买家付款</x-button>
							<x-button type="primary" v-if='item.state==2' mini disabled>已收货2</x-button>
							<x-button type="primary" v-if='item.state==1' mini @click.native.once='qrsk(item.userId,item.buyUserId,item.id,item.seed)'>确认收款</x-button>
							<x-button type="primary" v-if='item.state==3' mini disabled>收款完成</x-button>
						</p>
					</span>
					<!--<p v-if='item.allseed'>出售总金额:{{item.allseed}}</p>-->

					<p>
						<x-button mini type="primary" v-if='item.stealFlag ==0' @click.native.once='touqu(item.id)'>偷取果实</x-button>
						<x-button type="warn" v-if='item.stealFlag==1' mini disabled>明天再偷</x-button>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { XHeader, XButton, Flexbox, FlexboxItem } from 'vux'
	export default {
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				id: '',
				name: '',
				list: [],
				title: '',
				dbtitle: ''
			}
		},
		mounted() {
			let name = this.$route.params.name
			if(name === 'getRecord') {
				this.title = '收获'
			}
			if(name === 'addRecord') {
				this.title = '增种'
			}
			if(name === 'GrowRecord') {
				this.title = '生长'
			}
			if(name === 'openRecord') {
				this.title = '开垦'
			}
			if(name === 'jiangRecord') {
				this.title = '奖励'
			}
			if(name === 'shitRecord') {
				this.title = '施肥'
			}
			if(name === 'stealListAll') {
				this.title = '偷取'
			}
			if(name === 'findOutSell') {
				this.dbtitle = 'findOutSell'
				this.title = '出售'
			}
			if(name === 'findSell') {
				this.title = '购买'
				this.dbtitle = 'findSell'
			}
			if(name === 'getChangeList') {
				this.title = '兑换'
			}

			let id = localStorage.getItem('id')
			this.id = id
			console.log(id)
			this.$http.get(this.enhttp + '/trees/mobile/user/' + name + '?id=' + this.id).then(
				(res) => {
					this.list = res.data.data
					console.log(res.data)
				}
			)
		},
		methods: {
			qrsh(ddid, seeds) {
				this.$http.get(this.enhttp + '/trees/mobile/user/SellSeedEnd?id=' + this.id + '&sellId=' + ddid + '&seed=' + seeds).then(
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
					}
				)
			},
			qrsk(uid, buyid, ddid, seeds) {
				this.$http.get(this.enhttp + '/trees/mobile/user/SellSeedEnd1?id=' + buyid + '&sellId=' + ddid + '&seed=' + seeds + '&uid=' + uid).then(
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
					}
				)
			}
		},
		filters: {
			landTypes(val) {
				if(val === '0') {
					return '红土地'
				} else if(val === '1') {
					return '黄土地'
				} else if(val === '2') {
					return '黑土地'
				}
			},
			jyzt(val) {
				if(val === 0) {
					return '交易中'
				} else if(val === 1) {
					return '交易已完成'
				}
			},
			rewardTypes(val) {
				if(val === 0) {
					return '偷取奖励'
				} else if(val === 1) {
					return '转盘奖励'
				} else if(val === 2) {
					return '直推奖励'
				}
			}
		}
	}
</script>
<style lang="less">

</style>