<template>
	<div class="guide-box">
		<div class="skip">
			<router-link to='/pub/job' replace>跳&nbsp;&nbsp;过</router-link>
		</div>
		<div class="header">
			<p class="first">来了？坐。</p>
			<p class="second">这是我的APP，也是我的工作室</p>
			<p class="third">您需要的，正是我毕生专注和擅长的。</p>
			<p class="fourth">请点击 选择相符的内容进入</p>
		</div>
		<div class="list">
			<ul>
				<li v-for='item in list'>
					<a @click='golinkto(item.url)'>
						<span>{{item.title}}</span>
						<span class="right-enter">点击进入</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="guide-footer">
			<p>民间骨事，成就你的故事</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				list: [],
				time: 7
			}
		},
		mounted() {
			var _self = this
			setInterval(function() {
				_self.time = _self.time - 1
			}, 1000)
		},
		created() {
			this.$http.get(this.lchttp + '/app/indexTab/list').then(
				(res) => {
					this.list = res.data
					console.log(res.data)
				}
			)
		},
		methods: {
			golinkto(val) {
				sessionStorage.setItem('tolink', val)
				this.$router.replace('/ifm2')
			}
		}
	}
</script>

<style lang="less">
	.guide-box {
		width: 100%;
		height: 100%;
		overflow: auto;
		/*background-image: url(../../static/img/guide-bg.jpg);*/
		background-color: #558ed4;
		/*background-size: 100% 100%;*/
		/*background-repeat: no-repeat;*/
		.skip {
			width: 74px;
			height: 30px;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 6px;
			position: absolute;
			right: 4%;
			top: 2%;
			text-align: center;
			a {
				color: white;
				font-size: 14px;
				line-height: 30px;
			}
		}
		.header {
			width: 85.3%;
			margin: 20.26% auto 0;
			box-sizing: border-box;
			p {
				font-size: 16px;
				color: white;
				&.first {
					color: #ffff00;
				}
				&.second {
					text-indent: 2em;
				}
				&.third {
					text-indent: 2em;
					color: #ffff00;
				}
				&.fourth {
					text-indent: 2em;
				}
			}
		}
		.list {
			width: 69.6%;
			height: 60%;
			/*margin: 45.3% auto 0;*/
			margin: auto;
			ul {
				height: 100%;
				li,
				a {
					display: block;
					height: 19.424%;
					background-color: #ffff00;
					border-radius: 6px;
					margin-top: 6%;
					width: 100%;
					display: table;
					position: relative;
					span {
						display: table-cell;
						vertical-align: middle;
						text-align: center;
						color: #ff3f3f;
						font-size: 24px;
						position: relative;
						&.enter {
							position: absolute;
							font-size: 12px;
							color: black;
							left: 4px;
							top: 0;
						}
						&.right-enter {
							position: absolute;
							font-size: 12px;
							color: black;
							right: 4px;
							left: auto;
							bottom: -20px;
						}
					}
				}
			}
		}
		.guide-footer {
			width: 100%;
			p {
				text-align: center;
				color: #bed4ef;
			}
		}
	}
</style>