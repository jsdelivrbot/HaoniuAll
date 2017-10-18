<template>
	<div class="perfect-more-box">
		<div class="header">
			<span class="iconfont icon-fanhui" @click="back"></span>
			<h1 class="title">更多信息</h1>
			<span class="map"></span>
		</div>
		<div class="content">
			<div class="item" v-for="(item, index) in list">
				<p class="content-title">{{item.option_name}}</p>
				<div class="option" v-if="!item.more">
					<span v-for="(list, listIndex) in item.children" @click="changeCurrent(index, listIndex)" :class="{current: currentList[index] === listIndex}">
						{{list}}
					</span>
				</div>
				<div class="option" v-if="item.more">
					<span v-for="(list, listIndex) in item.children" @click="changeCurrentMore(index, listIndex, list)" :class="{current: currentMore(index,list)}">
						{{list}}
					</span>
				</div>
			</div>
		</div>
		<div class="in-footer vux-1px-t">
			<div class="item item1" @click="reset">
				重置
			</div>
			<div class="item item2" @click="save">
				保存
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$emit('cancelShow')
			},
			changeCurrent(index, listIndex) {
				this.list[index].currentIndex = listIndex
//				console.log(this.currentList)
			},
			changeCurrentMore(index, listIndex, list) {
				let listItem = this.list[index]
				let indexOf = listItem.currentIndex.indexOf(list)
				//元素存在 删除
				if(indexOf !== -1) {
					listItem.currentIndex.splice(indexOf, 1)
//					console.log(indexOf)
//					console.log(this.list[index].currentIndex)
					return
				}
				listItem.currentIndex.push(listItem.children[listIndex])
			},
			currentMore(index, list) {
//				console.log(this.list[index].currentIndex)
				if(this.list[index].currentIndex.indexOf(list) === -1) {
					return false
				} else {
					return true
				}
			},
			reset() {
				for(let i = 0; i < this.list.length; i++) {
					if(this.list[i].more) {
						this.list[i].currentIndex = []
					} else {
						this.list[i].currentIndex = -1
					}
				}
			},
			save() {
				let chosenList = []
				for (let i = 0; i < this.list.length; i++) {
					if(this.list[i].more) {
						let moreChosen = []
						for (let j = 0; j < this.list[i].currentIndex.length; j++) {
							console.log(this.list[i].currentIndex[j])
							moreChosen.push(this.list[i].currentIndex[j])
						}
						chosenList.push(moreChosen)
					} else {
						chosenList.push(this.list[i].children[this.list[i].currentIndex])
					}
				}
				console.log(chosenList)
				this.$emit('save', chosenList)
			},
			findCurrent(item, list) {
				for (let i = 0; i < list.length; i++) {
					if(item === list[i]) {
						return i
					}
				}
			},
			findCurrentGroup(item, list) {
				let arr = []
				for (let i = 0; i < list.length; i++) {
//					console.log(list[i])
//					console.log(item)
//					console.log(item.indexOf(list[i]))
					if(item.indexOf(list[i]) >= 0) {
						arr.push(list[i])
					}
				}
//				console.log(arr)
				return arr
			}
		},
		data() {
			return {
				list: [{
					option_name: '性别',
					children: ['男', '女'],
					currentIndex: -1
				}, {
					option_name: '年龄区间',
					children: ['18岁以下', '18-25岁', '26-35岁', '36-45岁', '46-55岁', '56岁以上'],
					currentIndex: -1
				}, {
					option_name: '行业',
					children: ['IT行业', '电商', '财经金融', '创投管理',
						'车房家居', '广告公关', '健康医疗', '媒体杂志', '母婴教育',
						'汽车旅游', '生活美食', '手游网游', '新闻资讯', '移动互联', '影视娱乐'
					],
					currentIndex: -1
				}, {
					option_name: '兴趣爱好（多选）',
					children: ['户外运动', '健康/体育', '棋类', '旅游',
						'音乐/舞蹈', '影视', '阅读/写作', '社交', '美食/烹饪',
						'购物/时尚'
					],
					currentIndex: [],
					more: true
				}]
			}
		},
		props: ['sex', 'age', 'work', 'hobby'],
		created() {
			this.list[0].currentIndex = this.findCurrent(this.sex, this.list[0].children)
			this.list[1].currentIndex = this.findCurrent(this.age, this.list[1].children)
			this.list[2].currentIndex = this.findCurrent(this.work, this.list[2].children)
			this.list[3].currentIndex = this.findCurrentGroup(this.hobby, this.list[3].children)
		},
		computed: {
			currentList() {
				let current = []
				for(let i = 0; i < this.list.length; i++) {
					current.push(this.list[i].currentIndex)
				}
				return current
			}
		}
	}
</script>

<style lang="less">
	.perfect-more-box {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		min-height: 100vh;
		background-color: white;
		box-sizing: border-box;
		padding: 54px 0 50px;
		.header {
			width: 100%;
			height: 44px;
			background-color: #e70012;
			position: fixed;
			top: 0;
			left: 0;
			box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
			display: flex;
			align-items: center;
			z-index: 10;
			.icon-fanhui {
				color: white;
				font-size: 20px;
				font-weight: 700;
				flex: 0 0 66px;
				text-align: center;
				height: 44px;
				line-height: 44px;
			}
			.title {
				text-align: center;
				font-size: 18px;
				font-weight: 400;
				color: white;
				line-height: 44px;
				flex: 1;
				width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.map {
				flex: 0 0 66px;
				height: 44px;
				line-height: 44px;
			}
		}
		.content {
			padding: 0 12px;
			margin-bottom: 20px;
			.item {
				margin-top: 10px;
				.content-title {
					font-size: 14px;
					color: #afafaf;
				}
				.option {
					margin-top: 6px;
					font-size: 0;
					span {
						width: 94px;
						height: 24px;
						display: inline-block;
						border-radius: 24px;
						border: 1px solid #afafaf;
						text-align: center;
						font-size: 14px;
						color: #333333;
						line-height: 24px;
						margin: 6px 0 0 18px;
						&.current {
							background-color: #e60012;
							color: white;
							border-color: white;
						}
					}
				}
			}
		}
		.in-footer {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 50px;
			display: flex;
			z-index: 2;
			.item {
				flex: 1;
				width: 0;
				text-align: center;
				line-height: 50px;
				font-size: 18px;
			}
			.item1 {
				color: #333333;
				background-color: white;
			}
			.item2 {
				color: white;
				background-color: #e60012;
			}
		}
	}
</style>