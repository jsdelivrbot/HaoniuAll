<template>
	<div class="search-box">
		<div class="header">
			<div class="title" @click="back">

			</div>
			<div class="input">
				<input type="search" placeholder="请输入您想输入的内容" @keyup.enter="pushlist" v-model="title" />
			</div>
			<div class="button" @click="pushlist">
				搜索
			</div>
		</div>
		<div class="newslist">
			<ul>
				<li v-for="newsinfo in newslist">
					<router-link :to='"/newsdetail/"+newsinfo.id'>
						<span class="img">
							<img :src="newsinfo.imgUrl" />
						</span>
						<div>
							<h2>{{newsinfo.title}}</h2>
							<p>{{newsinfo.content}}</p>
							<span class="info-footer read-count">阅读数：{{newsinfo.readCount}}</span>
							<span class="info-footer up-vote-count">
								<img src="../../static/img/38.png" />
								{{newsinfo.upVoteCount}}
							</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>

		<!--<newslist-search></newslist-search>-->
		<!--<div class="subhead">
			<h1>热门搜索</h1>
		</div>
		<div class="content">
			<ul>
				<li class="content-title">历史搜索</li>
				<li v-for="item,index in list">{{item.title}}</li>
			</ul>
		</div>
		<div class="button-footer">
			<button @click="emptylist">清空历史记录</button>
		</div>-->
	</div>
</template>

<script>
	//	import newslistSearch from '@/components/newslist-search'
	//	var list = []
	export default {
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				list: '',
				title: '',
				newslist: ''
			}
		},
		methods: {
			back() {
				this.$router.back(-1)
			},
			pushlist() {
				this.$http.get(this.lchttp + '/app/news/infoList?newsId=' + this.$route.params.id + '&&title=' + this.title).then(
					(res) => {
						this.newslist = res.data.obj.result
						if(this.newslist.length === 0) {
							this.$vux.alert.show({
								title: '提示',
								content: '没有相关内容'
							})
							return false
						}
						console.log(this.newslist)
					}
				)
			}
		}
	}
</script>

<style lang="less">
	.search-box {
		height: auto;
		min-height: 100vh;
		overflow: hidden;
		.newslist {
			margin-top: 10px;
			background: none;
		}
		/*background: #dcdcdc;*/
		.header {
			height: 44px;
			background-color: #fff;
			display: flex;
			.title {
				width: 40px;
				line-height: 44px;
				text-align: center;
				color: #656566;
				font-size: 16px;
				background-image: url(../../static/img/back.png);
				background-size: 26px 26px;
				background-position: 6px 9px;
				background-repeat: no-repeat;
				text-indent: 1em;
				flex: 0 0 auto;
			}
			.input {
				flex: 1 1 auto;
				input {
					padding: 0 4%;
					box-sizing: border-box;
					width: 100%;
					height: 30px;
					margin-top: 6px;
					font-size: 14px;
					background-color: #f2f3f6;
					outline: none;
				}
			}
			.button {
				width: 54px;
				line-height: 44px;
				text-align: center;
				color: #656566;
				font-size: 16px;
				flex: 0 0 auto;
			}
		}
		/*.subhead {
			height: 52px;
			background-color: white;
			margin: 14px 0;
			h1 {
				line-height: 52px;
				padding-left: 4%;
				font-size: 16px;
			}
		}
		.content {
			ul {
				background-color: white;
				padding: 0 4%;
				box-sizing: border-box;
				li {
					font-size: 14px;
					border-bottom: 1px solid #f3f3f3;
					height: 44px;
					line-height: 44px;
					color: #656566;
					&.content-title {
						height: 34px;
						line-height: 34px;
					}
				}
			}
		}
		.button-footer {
			padding: 0 4%;
			box-sizing: border-box;
			margin-top: 24px;
			button {
				background-color: white;
				height: 44px;
				width: 100%;
				border: 1px solid #e7e7e7;
			}
		}*/
	}
</style>