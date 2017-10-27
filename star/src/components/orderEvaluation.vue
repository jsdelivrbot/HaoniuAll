<template>
	<div class="orderEvaluation">
		<topbar title='订单评价'></topbar>
		<group style='margin-top: 60px;'>
			<cell :title="detailInfo.courseName" style='font-weight: 600;font-size: 17px;color: #333;'></cell>
			<cell title="评价课程">
				<rater v-model="star" active-color="#ff9600" star='✩'></rater>
			</cell>
			<x-textarea placeholder='分享你的购买心得' v-model='content' style='color: #666;font-size: 14px;' :height="120"></x-textarea>
		</group>

		<div class="button" style="margin-top: 30px;">
			<button @click="submit">
				提交评价
			</button>
		</div>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	import { Cell, CellBox, Group, Range, Rater, XTextarea } from 'vux'
	export default {
		components: {
			Cell,
			CellBox,
			Group,
			Range,
			Rater,
			XTextarea,
			topbar
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				token: sessionStorage.getItem('token'),
				detailInfo: '',
				ordernum: '',
				star: 0,
				content: ''
			}
		},
		mounted() {
			let props = this.$route.params.id
			this.ordernum = props
			this.$http.get('/business/order/downOrderDetail', {
				params: {
					number: props
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj
					console.log(res.data)
				}
			)
		},
		methods: {
			submit() {
				if(this.star <= 0) {
					this.$vux.alert.show({
						title: '提示',
						content: '请给课程打分!'
					})
					return false
				}

				this.$http.get('/business/orderEvaluate/createEvaluate', {
					params: {
						number: this.detailInfo.number,
						content: this.content,
						score: this.star
					}
				}).then(
					(res) => {
						let $this = this
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '恭喜您,评价成功!',
								onHide() {
									$this.$router.replace('/pub/home')
								}
							})
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: res.data.msg
							})
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">

</style>