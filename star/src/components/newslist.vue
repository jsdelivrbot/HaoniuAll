<template>
	<div class="news-list">
		<topbar title='专题文章'></topbar>
		<ul class="subject-text">
			<li v-for='item in newslist' class="vux-1px-b">
				<router-link :to='"/newsdetail/"+item.id'>
					<img :src="item.thumb" />
					<div class="info">
						<h2>{{item.title}}</h2>
						<p>{{item.intro}}</p>
						<span class="time">
								{{item.updateTime}}
							</span>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				isloop: true,
				localhttp: localStorage.getItem('localhttp'),
				list: [],
				tj: [],
				newslist: []
			}
		},
		mounted() {
			this.$http.get('/recommendArticles?page=1&rows=1000').then(
				(res) => {
					this.newslist = res.data.obj.items
					console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
.news-list{
	padding-top: 44px;
	box-sizing: border-box;
	.subject-text {
			margin-top: 10px;
			background: #fff;
			height: auto;
			overflow: hidden;
			li {
				float: left;
				list-style: none;
				height: auto;
				overflow: hidden;
				a {
					padding: 15px;
					box-sizing: border-box;
					display: flex;
					overflow: hidden;
				}
				img {
					width: 130px;
					height: 80px;
					display: block;
					margin-right: 10px;
				}
				.info {
					flex: 1;
					overflow: hidden;
					h2 {
						font-size: 15px;
						line-height: 20px;
						color: #333;
						font-weight: normal;
						/*font-weight: 600;*/
					}
					p {
						display: block;
						color: #666;
						line-height: 1.5;
						font-size: 13px;
						height: 40px;
						overflow: hidden;
					}
					.time {
						display: block;
						text-align: right;
						color: #999;
						font-size: 13px;
					}
				}
			}
		}
}
</style>