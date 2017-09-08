<template>
	<div class="footer">
		<ul>
			<li>
				<router-link to='/pub/job' replace>
					<div class="icon-job"></div>
					<span>工作室</span>
				</router-link>

			</li>
			<li>
				<router-link to='/pub/find' replace>
					<div class="icon-find"></div>
					<span>发现</span>
				</router-link>

			</li>
			<li>
				<router-link to='/pub/ranking' replace>
					<div class="icon-ranking"></div>
					<span>排行榜</span>
				</router-link>

			</li>
			<li>
				<router-link to='/pub/my' replace>
					<div class="icon-my"></div>
					<span>我的</span>
				</router-link>

			</li>
		</ul>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="less">
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: #ffffff;
		border-top: 0.5px solid #e5e5e5;
		ul {
			display: flex;
			li {
				flex: 1;
				text-align: center;
				padding: 5px 0;
				box-sizing: border-box;
				a {
					display: block;
					div {
						width: 100%;
						height: 24px;
						background-size: auto 100% !important;
					}
					.icon-job {
						background: url(../../static/img/5.png) no-repeat center;
					}
					.icon-find {
						background: url(../../static/img/6.png) no-repeat center;
					}
					.icon-ranking {
						background: url(../../static/img/7.png) no-repeat center;
					}
					.icon-my {
						background: url(../../static/img/8.png) no-repeat center;
					}
					span {
						display: block;
						line-height: 20px;
						font-size: 12px;
						color: #bcbcbc;
					}
				}
				.router-link-active {
					.icon-job {
						background: url(../../static/img/9.png) no-repeat center;
					}
					.icon-find {
						background: url(../../static/img/10.png) no-repeat center;
					}
					.icon-ranking {
						background: url(../../static/img/12.png) no-repeat center;
					}
					.icon-my {
						background: url(../../static/img/11.png) no-repeat center;
					}
					span {
						color: #ff5d5c;
					}
				}
			}
		}
	}
</style>