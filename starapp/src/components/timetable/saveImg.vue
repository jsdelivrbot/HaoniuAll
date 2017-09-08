<template>
	<div class="saveImg">
		<topbar title='图片详情'></topbar>
		<div  class="div" v-for="(item,index) in chuli">
			<img :src="item.src" class="saveimg" @click="show(index)" />
		</div>
		<button class="saveBtn" @click="save" v-show="btnShow">保存</button>
		<div v-transfer-dom>
			<previewer :list="chuli" ref="previewer" @on-close="btnShow = !btnShow"></previewer>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { Previewer, TransferDom } from 'vux'
	export default {
		name: 'nokeep',
		directives: {
			TransferDom
		},
		components: {
			topbar,
			Previewer
		},
		data() {
			return {
				detailId: this.$route.params.id,
				chidlrenId: this.$route.params.childrenId,
				timetableId: this.$route.params.timetableId,
				detailInfo: [],
				chuli: [],
				btnShow: false
			}
		},
		mounted() {
			this.$http.get('/classHour/notice/listByNoticesId', {
				params: {
					id: this.detailId
				}
			}).then(
				(res) => {
					this.detailInfo = res.data.obj.objectSome
					for(var i = 0; i < res.data.obj.objectSome.length; i++) {
						let arr = {}
						arr.src = res.data.obj.objectSome[i].cover
						this.chuli.push(arr)
					}
					console.log(this.chuli)
				}
			)
		},
		methods: {
			show(index) {
				this.btnShow = true
				this.$refs.previewer.show(index)
			},
			save() {
				let weizhi = document.getElementsByClassName('pswp__counter')[0].innerHTML.indexOf('/')
				let num = document.getElementsByClassName('pswp__counter')[0].innerHTML.substr(0, weizhi).trim()
				console.log(this.chuli[num - 1].src)
				this.$http.get('/classHour/datum/saveDatum', {
					params: {
						childId: this.chidlrenId,
						timetableId: this.timetableId,
						cover: this.chuli[num - 1].src,
						type: 0
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '保存成功!'
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
	.saveImg {
		height: auto;
		width: 100vw;
		overflow: hidden;
		padding-top: 54px;
		box-sizing: border-box;
		position: relative;
		>.div {
			height: auto;
			overflow: hidden;
			margin-bottom: 10px;
			padding: 0 15px;
			img {
				width: 100%;
				display: block;
			}
		}
		.saveBtn {
			position: fixed;
			z-index: 999999;
			bottom: 40px;
			margin: 0 20%;
			width: 60%;
			height: 40px;
			background: #fff;
			border-radius: 3px;
			border: 1px solid #eee;
			color: #666;
		}
	}
</style>