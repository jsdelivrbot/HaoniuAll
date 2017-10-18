<template>
	<div class="vaguesearch-box">
		<div class="search-top vux-1px-b">
			<div class="out-img" @click="goback()">
				<img src="../../static/img/Backicon@3x.png" />
			</div>
			<!--<div class="left" @click="select1=!select1">
				<span v-if='iskecheng'>课程</span>
				<span v-if='!iskecheng'>机构</span>
				<img src="../../static/img/down3.png" />
				<ul v-show="select1">
					<li class="vux-1px-b" @click="iskecheng=true">课程</li>
					<li class="vux-1px-b" @click="iskecheng=false">机构</li>
				</ul>
			</div>-->

			<div class="input">
				<img src="../../static/img/iconsearch.png" />
				<input type="search" v-model="searchval" name="" @keyup.enter="search" id="" value="" placeholder="请输入您想要搜索的内容" />
			</div>
			<span @click="search(1)">搜索</span>
		</div>

		<div class="hide-box" v-show="hidebox">
			<div class="hot-search vux-1px-b">
				<h2 class="title">
					热门搜索
				</h2>

				<ul>
					<!--<li>
						<router-link to='/searchlist/keyword=1111&target=1'>
							测试
						</router-link>
					</li>-->
					<li v-for='item in hottxt'>
						<router-link :to='"/searchlist/keyword="+item.target+"&target="+item.type'>
							{{item.target}}
						</router-link>
					</li>
				</ul>
			</div>

			<div class="history-search" v-if='histroy'>
				<ul>
					<li class="vux-1px-b">
						历史搜索
					</li>
					<li class="vux-1px-b" v-for='item in histroy' @click="histroybtn(item.name)">{{item.name}}</li>
				</ul>

				<div class="btn-clear">
					<span @click="clearhis()">清空历史搜索</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
				searchval: '',
				select1: false,
				iskecheng: true,
				hidebox: true,
				hottxt: [],
				list: [],
				jigoulist: [],
				histroy: JSON.parse(localStorage.getItem('histroy'))
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.path === '/pub/home') {
				this.searchval = ''
			}
			next()
		},
		mounted() {
			this.$http.get('/hotKeyword').then(
				(res) => {
					this.hottxt = res.data.obj
					console.log(res.data)
				}
			)
		},
		methods: {
			goback() {
				this.$router.back()
			},
			histroybtn(val) {
				this.searchval = val
				this.search()
			},
			clearhis() {
				localStorage.removeItem('histroy')
				this.histroy = null
			},
			search() {
				if(this.searchval === '') {
					this.$vux.toast.text('请输入搜索的内容', 'center')
					return false
				}
				let arr = []
				let val = {}
				val.name = this.searchval
				if(JSON.parse(localStorage.getItem('histroy'))) {
					let loop = false
					for(var i = 0; i < this.histroy.length; i++) {
						if(this.histroy[i].name === this.searchval) {
							loop = true
						}
					}
					let all = JSON.parse(localStorage.getItem('histroy'))
					if(!loop) {
						if(all.length > 3) {
							all.splice(all.length - 1, 1)
						}
						all.unshift(val)
					}
					localStorage.setItem('histroy', JSON.stringify(all))
				} else {
					arr.unshift(val)
					localStorage.setItem('histroy', JSON.stringify(arr))
				}
				this.histroy = JSON.parse(localStorage.getItem('histroy'))
				this.$router.push('/searchlist/keyword=' + this.searchval)
			}
		}
	}
</script>
<style lang="less">
	.vaguesearch-box {
		height: auto;
		overflow: hidden;
		padding-top: 44px;
		.history-search {
			margin-top: 10px;
			text-align: center;
			ul {
				height: auto;
				overflow: hidden;
				background: #fff;
				text-align: left;
				li:first-child {
					height: 33px;
					line-height: 33px;
					color: #333;
				}
				li {
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 14px;
					color: #666;
				}
			}
			.btn-clear {
				margin: auto;
				padding: 0 15px;
				box-sizing: border-box;
				margin-top: 25px;
				span {
					display: block;
					height: 43px;
					box-sizing: border-box;
					line-height: 43px;
					background: #fff;
					border-radius: 5px;
					position: relative;
					color: #292929;
				}
				span:before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					width: 200%;
					height: 1px;
					border: 1px solid #e5e5e5;
					color: #e5e5e5;
					height: 200%;
					border-radius: 5px;
					-webkit-transform-origin: left top;
					transform-origin: left top;
					-webkit-transform: scale(0.5);
					transform: scale(0.5);
				}
			}
		}
		.search-top {
			height: 44px;
			width: 100%;
			display: flex;
			background: #fff;
			padding: 8px 15px;
			padding-left: 0;
			padding-right: 0;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			z-index: 999;
			.out-img {
				width: 44px;
				height: 28px;
				text-align: center;
				img {
					display: block;
					width: 10px;
					margin: 5px auto;
					/*margin: 13px auto;*/
					height: 18px;
				}
			}
			.left {
				display: flex;
				margin-right: 10px;
				span {
					font-size: 16px;
					color: #666;
					margin-right: 5px;
				}
				img {
					margin-top: 10px;
					width: 14px;
					height: 8px;
				}
				ul {
					position: absolute;
					width: 100%;
					z-index: 999;
					background: #fff;
					left: 0;
					top: 44px;
					li {
						list-style: none;
						padding: 0 15px;
						box-sizing: border-box;
						height: 44px;
						line-height: 44px;
						font-size: 16px;
						color: #666;
					}
				}
			}
			.input {
				display: flex;
				flex: 1;
				height: 28px;
				/*margin: 8px 0;*/
				overflow: hidden;
				background: #f0f2f5;
				border-radius: 3px;
				padding: 0 10px;
				box-sizing: border-box;
				img {
					width: 14px;
					height: 14px;
					margin: 7px 0;
				}
				input {
					background: none;
					flex: 1;
					border: none;
					outline: none;
					text-indent: 3px;
				}
			}
			>span {
				width: 55px;
				text-align: center;
				line-height: 28px;
				font-size: 16px;
				color: #666666;
			}
		}
		.hide-box {
			margin-top: 10px;
			height: auto;
			overflow: hidden;
			.hot-search {
				height: auto;
				overflow: hidden;
				padding: 15px;
				box-sizing: border-box;
				background: #fff;
				.title {
					font-size: 15px;
					color: #333;
				}
				ul {
					display: block;
					height: auto;
					overflow: hidden;
					li {
						display: inline-block;
						margin-top: 10px;
						width: 33.333333%;
						float: left;
						text-align: center;
						a {
							display: block;
							width: 80%;
							/*min-width: 100px;*/
							/*margin: auto;*/
							background: #f0f2f5;
							text-align: center;
							font-size: 14px;
							line-height: 24px;
							color: #666;
							height: 24px;
							border-radius: 3px;
						}
					}
				}
			}
		}
	}
</style>