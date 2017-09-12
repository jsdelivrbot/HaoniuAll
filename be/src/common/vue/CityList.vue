<template>
	<div class="city-list-box">
		<!--<div class="list-top">
			<div class="top-item">
				<p class="top-title">当前定位城市</p>
				<div class="top-content">
					<span class="vux-1px">合肥</span>
				</div>
			</div>
			<div class="top-item">
				<p class="top-title">热门城市</p>
				<div class="top-content">
					<span class="vux-1px">上海</span>
					<span class="vux-1px">北京</span>
					<span class="vux-1px">广州</span>
					<span class="vux-1px">深圳</span>
					<span class="vux-1px">武汉</span>
					<span class="vux-1px">天津</span>
					<span class="vux-1px">西安</span>
					<span class="vux-1px">南京</span>
					<span class="vux-1px">杭州</span>
				</div>
			</div>
		</div>-->
		<scroll class="list-view" ref="listview" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType">
			<div>
				<div class="list" v-for="(item, index) in city" ref="listGroup">
					<p class="list-title">
						{{item.title[0]}}
					</p>
					<ul>
						<li class="vux-1px-b" v-for="list,listindex in item.content" @click="selectItem(list)">{{list}}</li>
					</ul>
				</div>
			</div>
			<!--<div class="shortCutList" @touchstart.stop.prevent="onShortcutTouchStart" 
				@touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
				<ul>
					<li v-for="(item, index) in shortCutList" :data-index="index" 
						:class="{'current':currentIndex===index}">
						{{item}}
					</li>
				</ul>
			</div>-->
			<div class="list-fixed" ref="fixed" v-show="fixedTitle">
				<div class="fixed-title">{{fixedTitle}} </div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import Scroll from '@/common/vue/Scroll'
//	import { getData } from '../../../static/js/dom.js'
	const TITLE_HEIGHT = 30
	const ANCHOR_HEIGHT = 28
	export default {
		data() {
			return {
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		components: {
			Scroll
		},
		props: {
			city: Array
		},
		computed: {
			shortCutList() {
				return this.city.map((item) => {
					return item.title[0].substr(0, 1)
				})
			},
			fixedTitle() {
				if(this.scrollY > 0) {
					return ''
				}
				return this.city[this.currentIndex] ? this.city[this.currentIndex].title[0] : ''
			}
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
			this.touch = {}
			this.listHeight = []
		},
		methods: {
//			onShortcutTouchStart(e) {
//				let anchorIndex = this.getData(e.target, 'index')
//				let firstTouch = e.touches[0]
//				this.touch.y1 = firstTouch.pageY
//				this.touch.anchorIndex = anchorIndex
//
//				this._scrollTo(anchorIndex)
//			},
//			onShortcutTouchMove(e) {
//				let firstTouch = e.touches[0]
//				this.touch.y2 = firstTouch.pageY
//				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
//				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
//
//				this._scrollTo(anchorIndex)
//			},
			selectItem(item) {
				this.$emit('select', item)
			},
			refresh() {
				this.$refs.listview.refresh()
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			_calculateHeight() {
				this.listHeight = []
				const list = this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i < list.length; i++) {
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
					//					console.log(this.listHeight)
				}
			},
			_scrollTo(index) {
				if(!index && index !== 0) {
					return
				}
				if(index < 0) {
					index = 0
				} else if(index > this.listHeight.length - 2) {
					index = this.listHeight.length - 2
					//					console.log(this.listHeight)
					//					console.log(index)
				}
				this.scrollY = -this.listHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
			},
			getData(el, name, val) {
				const prefix = 'data-'
				if(val) {
					return el.setAttribute(prefix + name, val)
				}
				return el.getAttribute(prefix + name)
			}
		},
		mounted() {
			this.$nextTick(() => {
				this._calculateHeight()
			})
		},
		watch: {
			city() {
				setTimeout(() => {
					this._calculateHeight()
				}, 20)
			},
			scrollY(newY) {
				const listHeight = this.listHeight
				// 当滚动到顶部，newY>0
				if(newY > 0) {
					this.currentIndex = 0
					return
				}
				// 在中间部分滚动
				for(let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if(-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						this.diff = height2 + newY
						return
					}
				}
				// 当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
			},
			diff(newVal) {
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
				if(this.fixedTop === fixedTop) {
					return
				}
				this.fixedTop = fixedTop
				this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
		}
	}
</script>

<style lang="less">
	.city-list-box {
		.list-view {
			width: 100%;
			position: fixed;
			top: 176px;
			bottom: 0;
			overflow: hidden;
		}
		.list-top {
			padding: 0 12px 12px;
			.top-item {
				.top-title {
					color: #707070;
					font-size: 16px;
					height: 44px;
					line-height: 44px;
				}
				.top-content {
					span {
						width: 94px;
						height: 38px;
						font-size: 16px;
						color: #333333;
						background-color: white;
						display: inline-block;
						text-align: center;
						line-height: 38px;
						margin-left: 10px;
						margin-top: 6px;
					}
				}
			}
		}
		.list {
			.list-title {
				font-size: 16px;
				color: #707070;
				height: 30px;
				line-height: 30px;
				padding-left: 12px;
			}
			ul {
				background-color: white;
				li {
					height: 44px;
					line-height: 44px;
					padding-left: 12px;
					font-size: 16px;
					color: #333333;
				}
			}
		}
		.shortCutList {
			position: absolute;
			z-index: 2;
			right: 4px;
			top: 50%;
			transform: translateY(-50%);
			width: 20px;
			border-radius: 10px;
			text-align: center;
			font-size: 14px;
			ul {
				list-style-type: none;
				li {
					padding: 4px;
					&.current {
						color: #e70012;
					}
				}
			}
		}
		.list-fixed {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.fixed-title {
				height: 30px;
				line-height: 30px;
				padding-left: 12px;
				font-size: 16px;
				color: #707070;
				background-color: #F0F0F0;
			}
		}
	}
</style>