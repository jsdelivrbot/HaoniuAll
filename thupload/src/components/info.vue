<template>
	<div class="info_box">
		<goback title="消息" right="清空" @rightHandle="empty"></goback>
		<div class="wrapper">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="list">
					<div class="item vux-1px-b" v-for="(item, index) in listData" :key="index">
						<div class="title">
							<p>系统消息</p>
							<p class="date">{{item.createTime}}</p>
						</div>
						<p class="detail">{{item.content}}</p>
					</div>
				</div>
				<load-more :show-loading="showLoading" :tip="tip" v-show="listData.length === 0"></load-more>
			</pull-to>
		</div>
	</div>
</template>

<script>
	import goback from '@/components/return'
	import PullTo from '@/components/PullTo/vue-pull-to'
	import { LoadMore } from 'vux'
	export default {
		name: 'Info',
		data() {
			return {
				listData: [],
				showLoading: true,
				tip: '正在加载'
			}
		},
		components: {
			goback,
			PullTo,
			LoadMore
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				this.showLoading = true
				this.tip = '正在加载'
				this.$http.get('/api/frontBase/region/findNotice', {
					params: {
						seeid: ''
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result === 0) {
						this.listData = res.data.obj
						if(this.listData.length === 0) {
							this.showLoading = false
							this.tip = '暂无数据'
						}
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
				})
			},
			refresh(loaded) {
				this.$http.get('/api/frontBase/region/findNotice', {
					params: {
						seeid: ''
					}
				}).then((res) => {
					if(res.data.result === 0) {
						this.listData = res.data.obj
						if(this.listData.length === 0) {
							this.showLoading = false
							this.tip = '暂无数据'
						}
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: res.data.msg
						})
					}
					loaded('done')
				})
			},
			getData(loaded) {
				if(this.listData.length === 0) {
					loaded('fail')
					return
				}
				this.$http.get('/api/frontBase/region/findNotice', {
					params: {
						seeid: this.listData[this.listData.length - 1].id
					}
				}).then((res) => {
					//					console.log(res)
					if(res.data.result === 0) {
						if(res.data.obj.length === 0) {
							loaded('fail')
						} else {
							this.listData = this.listData.concat(res.data.obj)
							loaded('done')
						}
					}
				})
			},
			empty() {
				if(this.listData.length === 0) {
					this.$vux.alert.show({
						title: '提示',
						content: '消息列表为空'
					})
					return
				}
				let $this = this
				this.$vux.confirm.show({
					title: '提示',
					content: '是否清空消息列表？',
					onConfirm() {
						$this.$vux.loading.show({
							text: '请稍等'
						})
						$this.$http.get('/api/frontBase/region/deleteNotice')
							.then((res) => {
								$this.$vux.loading.hide()
								if(res.data.result === 0) {
									$this.$vux.toast.show({
										text: '提交成功'
									})
									setTimeout(() => {
										$this.init()
									}, 500)
								} else {
									$this.$vux.alert.show({
										title: '提示',
										content: res.data.msg
									})
								}
							})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.info_box {
		min-height: 100vh;
		background-color: white;
		/*padding-top: 44px;*/
		box-sizing: border-box;
		.wrapper {
			position: fixed;
			left: 0;
			top: 44px;
			bottom: 0;
			width: 100%;
		}
		.list {
			.item {
				padding: 10px 15px;
				.title {
					display: flex;
					justify-content: space-between;
					p {
						font-size: 16px;
						color: #282828;
						line-height: 30px;
						&.date {
							color: #999999;
							font-size: 12px;
						}
					}
				}
				.detail {
					font-size: 14px;
					color: #999999;
					line-height: 30px;
				}
			}
		}
	}
</style>