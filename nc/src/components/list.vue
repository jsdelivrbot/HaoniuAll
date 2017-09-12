<template>
	<div class="list-body">
		<x-header>好友农场</x-header>

		<flexbox style='margin-top: 0.240963rem;padding: 0 0.240963rem;box-sizing: border-box;'>
			<flexbox-item>
				<x-button type="primary" @click.native='yjts()'>一键偷果实</x-button>
			</flexbox-item>
			<flexbox-item>
				<x-button type="warn" @click.native='dgyjts()'>订购一键偷果实</x-button>
			</flexbox-item>
		</flexbox>

		<div class="fd-list">
			<ul>
				<li v-for='item in arr1'>
					<p>
						<router-link :to='"/fdnc/"+item.invitedUserId'>
							进入好友农场
						</router-link>
					</p>
					<p>姓名:{{item.nickName}}</p>
					<p>级别: {{item.userType | dengji }}</p>
					<p>手机号:{{item.userPhone}}</p>
					<p>推荐关系:{{item.lv}}</p>
					<p>
						<x-button mini type="primary" v-if='item.lvFlag.split(",")[0] == 0' @click.native='touqu(item.invitedUserId,item.lv)'>偷取果实</x-button>
						<x-button type="warn" v-if='item.lvFlag.split(",")[0] == 1' mini disabled>明天再偷</x-button>
					</p>
				</li>

				<li v-for='item in arr2'>
					<p>
						<router-link :to='"/fdnc/"+item.invitedUserId'>
							进入好友农场
						</router-link>
					</p>
					<p>姓名:{{item.nickName}}</p>
					<p>级别: {{item.userType | dengji }}</p>
					<p>手机号:{{item.userPhone}}</p>
					<p>推荐关系:{{item.lv}}</p>
					<p>
						<x-button mini type="primary" v-if='item.lvFlag.split(",")[1] == 0' @click.native='touqu(item.invitedUserId,item.lv)'>偷取果实</x-button>
						<x-button type="warn" v-if='item.lvFlag.split(",")[1] == 1' mini disabled>明天再偷</x-button>
					</p>
				</li>

				<li v-for='item in arr3'>
					<p>
						<router-link :to='"/fdnc/"+item.invitedUserId'>
							进入好友农场
						</router-link>
					</p>
					<p>姓名:{{item.nickName}}</p>
					<p>级别: {{item.userType | dengji }}</p>
					<p>手机号:{{item.userPhone}}</p>
					<p>推荐关系:{{item.lv}}</p>
					<p>
						<x-button mini type="primary" v-if='item.lvFlag.split(",")[2] == 0' @click.native='touqu(item.invitedUserId,item.lv)'>偷取果实</x-button>
						<x-button type="warn" v-if='item.lv.split(",")[2] == 1' mini disabled>明天再偷</x-button>
					</p>
				</li>

				<div v-transfer-dom>
					<confirm v-model="show" title="提示" @on-confirm="querendg">
						<p style="text-align:center;">您确定要花费100个果实订购一键偷果实吗?</p>
					</confirm>
				</div>

				<div v-transfer-dom>
					<loading v-model="loading" text="偷取中,请等待..."></loading>
				</div>

			</ul>

		</div>

	</div>
</template>
<script>
	import { Loading, XHeader, XButton, Flexbox, FlexboxItem, Confirm, TransferDomDirective as TransferDom } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			Confirm,
			Loading
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				id: '',
				arr1: [],
				arr2: [],
				arr3: [],
				show: false,
				loading: false
			}
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
			this.$http.get(this.enhttp + '/trees/mobile/user/getFriendList?userId=' + this.id).then(
				(res) => {
					this.arr1 = res.data.data.lv1
					this.arr2 = res.data.data.lv2
					this.arr3 = res.data.data.lv3
					console.log(res.data.data)
				}
			)
		},
		methods: {
			touqu(ids, lv) {
				this.$http.get('http://192.168.1.111:8080/trees/mobile/user/steal?userId=' + this.id + '&stealUserId=' + ids + '&lv=' + lv).then(
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
			yjts() {
				this.loading = true
				this.$http.get('http://192.168.1.111:8080/trees/mobile/fodder/stealSeed?id=' + this.id).then(
					(res) => {
						let $this = this
						if(!res.data.success) {
							this.loading = false
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.loading = false
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
			},
			dgyjts() {
				this.show = true
			},
			querendg() {
				this.$http.get('http://192.168.1.111:8080/trees/mobile/fodder/keyStealSeed?id=' + this.id).then(
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
		},
		filters: {
			dengji(val) {
				if(val === '0' || val === 0) {
					return '农民'
				} else if(val === '1') {
					return '富商'
				} else if(val === '2') {
					return '地主'
				}
			}
		}
	}
</script>
<style lang="less">
	@import '~vux/src/styles/1px.less';
	.weui-dialog__hd {
		padding: 0 !important;
	}
	
	.weui-toast {
		min-height: 0 !important;
		top: 3.2rem !important;
	}
	
	.list-body {
		min-height: 100%;
		max-height: 100%;
		background: #fff;
		overflow-y: auto;
		.fd-list {
			height: auto;
			overflow: hidden;
			padding: 0 0.240963rem;
			box-sizing: border-box;
			ul {
				width: 100%;
				height: auto;
				overflow: hidden;
				padding-bottom: 0.120481rem;
				li {
					width: 49%;
					display: inline-block;
					float: left;
					font-size: 0.313253rem;
					border: 1px solid #eee;
					padding: 10px;
					box-sizing: border-box;
					margin-top: 0.180722rem;
				}
				li:nth-child(2n-1) {
					margin-right: 1%;
				}
				li:nth-child(2n) {
					margin-left: 1%;
					width: 48%;
				}
			}
		}
	}
</style>