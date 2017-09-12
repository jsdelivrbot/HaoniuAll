<template>
	<div class="usercenter-task-list-box">
		<ul>
			<router-link to="/task/detail/1" tag="li" class="border-1px">
				<div class="icon">
					<img src="../../../static/usercenter/task-icon.png" />
				</div>
				<div class="content">
					<p class="firstrow">
						<span class="title">【进行时】</span>
						<span class="date-label">
							<span class="date">2017-7-3~2017-7-10</span>
							<span class="label">待推荐</span>
						</span>
					</p>
					<p class="secondrow">
						民以食为天，各种各样的美食对于人来说都是一个……
					</p>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-task-list-box {
		margin-top: 10px;
		ul {
			li {
				display: flex;
				align-items: center;
				height: 46px;
				padding: 0 12px;
				box-sizing: border-box;
				background-color: white;
				.border-1px(#e2e2e2);
				.icon {
					flex: 0 0 30px;
					height: 30px;
					img {
						width: 100%;
					}
				}
				.content {
					flex: 1;
					width: 0;
					margin-left: 12px;
					p {
						font-size: 12px;
						line-height: 16px;
						&.firstrow {
							.title {
								color: #e60012;
							}
							.date-label {
								float: right;
								.date {
									color: #707070;
									margin-right: 18px;
								}
								.label {
									color: #e60012;
								}
							}
						}
						&.secondrow {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: #333333;
						}
					}
				}
			}
		}
	}
</style>