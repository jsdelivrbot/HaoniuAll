<template>
	<div class="tab-box">
		<div class="tab-main">
			<div class="tab-item" v-for="item,index in data" :class="{tabItemBg: item.children.length}" @click="getCurrentList(item, index)">{{item.option_name}}</div>
		</div>
		<div class="tab-selector" @click.stop="closeCurrentList" v-show="currentList === index" v-for="item,index in data" @touchmove.prevent>
			<ul>
				<li v-for="list,listindex in item.children" class="border-1px" :class="{active: list.active}" @click.stop="chooseList(index,listindex)">
					<span>{{list.option_name}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data', 'type_id'],
		data() {
			return {
				currentList: Number,
				listData: [],
				searchArr: []
			}
		},
		computed: {
			searchData() {
				return this.searchArr.filter(function(item) {
					return item
				})
			}
		},
		methods: {
			getCurrentList(item, index) {
				if(item.children.length === 0) {
					this.currentList = -1
					return
				}
				this.currentList = index
			},
			closeCurrentList() {
				this.currentList = -1
			},
			chooseList(index, listindex) {
				//切换选中状态
				let list = this.data[index].children
				for(var i = 0; i < list.length; i++) {
					list[i].active = false
				}
				list[listindex].active = true
				//改变顶部文字
				this.data[index].option_name = list[listindex].option_name
				//隐藏选项
				this.currentList = -1
				//添加搜索条件
				//				this.searchArr[index] = list[listindex].id
				//				this.$set(this.searchArr, index, parseInt(list[listindex].id))
				this.$set(this.searchArr, index, [list[listindex].id])
				this.searchArr[index].push(this.data[index].children[0].option_name)
//				console.log(index)
//				console.log(this.data)
//				this.$set(this.typeNameArr, index, this.data[index].children[0].option_name)
//				console.log(this.data[index].children[0].option_name)
//				console.log(this.data[0].children[0].option_name)
				//				console.log(this.searchArr)
				//				console.log(this.searchData)
				//请求数据
				this.$http.get('getData/index.php?m=home&c=Form&a=infoList', {
						params: {
							seachdata: {
								'type_id': this.type_id,
								//								'option_data': JSON.stringify(this.searchData)
								'option_data': this.searchData,
								'city': sessionStorage.getItem('city')
							}
						}
					})
					.then((res) => {
						//this.listData = res.data.data
//						console.log(this.searchData)
						this.$emit('getData', res, this.searchData)
					})
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.tab-box {
		position: fixed;
		top: 44px;
		left: 0;
		z-index: 1;
		width: 100%;
		.tab-main {
			height: 44px;
			width: 100%;
			background-color: white;
			padding: 10px 12px;
			box-sizing: border-box;
			display: flex;
			.tab-item {
				flex: 1;
				color: #707070;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.tabItemBg {
				background: url(../../../static/home-tab-icon.png) right bottom no-repeat;
				background-size: 6px 6px;
			}
		}
		.tab-selector {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.4);
			ul {
				background-color: white;
				li {
					height: 34px;
					line-height: 34px;
					width: 100%;
					font-size: 12px;
					color: #707070;
					padding-left: 12px;
					box-sizing: border-box;
					.border-1px-top(#e2e2e2);
					&.active {
						background: url(../../../static/choose.png) right center no-repeat;
						background-position: right 20px center;
						background-size: 12px 12px;
					}
					span {
						width: 25%;
						display: inline-block;
						text-align: center;
					}
				}
			}
		}
	}
</style>