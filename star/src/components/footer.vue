<template>
	<div class="footer">
		<ul>
			<li>
				<router-link to='/pub/home' replace>
					<div class="icon-home"></div>
					<span>首页</span>
				</router-link>

			</li>
			<li>
				<router-link to='/pub/collect' replace>
					<div class="icon-collect"></div>
					<span>收藏</span>
				</router-link>
			</li>
			<li>
				<router-link to='/pub/usercenter' replace>
					<div class="icon-my"></div>
					<span>个人</span>
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
				list-style: none;
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
					.icon-my {
						background: url(../../static/img/my.png) no-repeat center;
					}
					.icon-collect {
						background: url(../../static/img/collect.png) no-repeat center;
					}
					.icon-home {
						background: url(../../static/img/home.png) no-repeat center;
					}
					span {
						display: block;
						line-height: 20px;
						font-size: 12px;
						color: #bcbcbc;
					}
				}
				.router-link-active {
					.icon-my {
						background: url(../../static/img/my2.png) no-repeat center;
					}
					.icon-collect {
						background: url(../../static/img/collect2.png) no-repeat center;
					}
					.icon-home {
						background: url(../../static/img/home2.png) no-repeat center;
					}
					span {
						color: #84BEF3;
					}
				}
			}
		}
	}
</style>