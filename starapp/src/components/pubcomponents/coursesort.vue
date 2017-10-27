<template>
	<div class="course-sort-box">
		<div class="search-top-bar">
			<div class="left" @click="goback()">
				<img src="~IMG/lefticon.png" />
			</div>
			<span @click="search">
				搜索科目、机构、课程
			</span>
			<router-link tag='div' class='div' to='/searchlist/cat=&target=k'>
				<img src="~IMG/ditu@3x.png" />
				<em>地图</em>
			</router-link>
		</div>

		<div class="sortList">
			<ul class="left">
				<li v-for="(item,index) in theOne" :key='index' :class="{active:selectNum==item.id}" @click="changeNum(item.id)">
					{{item.name}}
				</li>
			</ul>

			<div class="right">
				<div v-if='sortdata!==""'>
					<div v-for="item in sortdata">
						<h2>{{item.name}}</h2>
						<ul>
							<router-link v-for='(items,indexs) in item.nextCategory' :key='indexs' tag='li' :to="'/searchlist/cat='+items.someIdString">
								<img :src="items.realUrl" />
								<span>{{items.name}}</span>
							</router-link>
						</ul>
					</div>
				</div>
				<div v-if='sortdata==""'>
					<p>
						暂无课程
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				selectNum: 1,
				sortdata: '',
				theOne: ''
			}
		},
		activated() {
			window.scrollTo(0, 0)
		},
		created() {
			this.$http.get('/category/classificationAll').then(
				(res) => {
					this.theOne = res.data.obj
					this.changeNum(this.theOne[0].id)
				}
			)
		},
		methods: {
			changeNum(res) {
				this.selectNum = res
				this.$http.get('/category/classificationAll', {
					params: {
						id: res
					}
				}).then(
					(res) => {
						this.sortdata = res.data.obj
						console.log(res.data)
					}
				)

				window.scrollTo(0, 0)
			},
			goback() {
				if(sessionStorage.getItem('goback')) {
					this.$router.back(-1)
				} else {
					this.$router.push('/pub/home')
				}
			},
			search() {
				this.$router.push('/vaguesearch')
			}
		}
	}
</script>
<style lang="less">
	.course-sort-box {
		.sortList {
			display: flex;
			.left {
				position: fixed;
				top: 0;
				z-index: 1;
				height: 100vh;
				padding-top: 44px;
				width: 100px;
				background: #f4f8fb;
				li {
					height: 65px;
					line-height: 65px;
					text-align: center;
				}
				.active {
					background: #fff;
					position: relative;
					color: #85bef3;
				}
				.active:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 3px;
					height: 100%;
					background: #85bef3;
				}
			}
			.right {
				width: 100%;
				padding-left: 100px;
				min-height: 100vh;
				padding-top: 44px;
				background: #ffffff;
				box-sizing: border-box;
				background: url(~IMG/bg_img02@3x.png) center /100% auto;
				p {
					width: 100%;
					display: block;
					line-height: 300px;
					text-align: center;
					height: auto;
					overflow: hidden;
				}
				h2 {
					padding: 0 12px;
					color: #333333;
					font-size: 16px;
					font-weight: normal;
					line-height: 40px;
				}
				ul {
					display: flex;
					flex-wrap: wrap;
					padding: 0 10px;
					box-sizing: border-box;
					list-style: none;
					li {
						flex: 1;
						padding: 3px;
						box-sizing: border-box;
						max-width: 33.33333%;
						min-width: 33.33333%;
						img {
							width: 100%;
						}
						span {
							display: block;
							color: #333333;
							font-size: 14px;
							text-align: center;
						}
					}
				}
			}
		}
		.search-top-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 2;
			padding: 8px 10px;
			padding-left: 0;
			box-sizing: border-box;
			background: #84bef3;
			display: flex;
			.left {
				text-align: center;
				img {
					margin: 5px 0;
					padding: 0 15px;
					display: block;
					height: 18px;
				}
			}
			span {
				vertical-align: text-top;
				flex: 1;
				height: 28px;
				line-height: 29px;
				border-radius: 3px;
				border: none;
				text-align: left;
				background: #ffffff;
				outline: none;
				font-size: 13px;
				color: #B2B2B2;
				background: url(~IMG/iconsearch.png) no-repeat #fff;
				background-size: 15px;
				background-position: 4%;
				text-indent: 32px;
				margin-right: 8px;
			}
			.div {
				display: flex;
				color: #fff;
				height: 28px;
				img {
					width: 16px;
					height: 16px;
					display: block;
					margin: 6px 3px;
				}
				em {
					font-size: 12px;
					line-height: 28px;
					color: #fff;
					font-style: normal;
				}
			}
		}
		.title {
			height: 45px;
			display: flex;
			padding: 14px 15px;
			box-sizing: border-box;
			div {
				flex: 1;
			}
			.left {
				display: flex;
				line-height: 17px;
				font-size: 15px;
				height: 17px;
				span {
					color: #333;
				}
				em {
					margin: 0;
					font-style: normal;
					color: #ffa421;
				}
			}
			.right {
				text-align: right;
				display: flex;
				span {
					display: inline-block;
					height: 17px;
					font-size: 14px;
					color: #999999;
					line-height: 20px;
					/*background: #FF1818;*/
					flex: 1;
					margin-right: 5px;
				}
				img {
					width: 10px;
				}
			}
		}
	}
</style>