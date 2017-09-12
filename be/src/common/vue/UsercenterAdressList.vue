<template>
	<div class="usercenter-adress-list">
		<ul>
			<li class="border-1px">
				<div class="checked-box"></div>
				<div class="content">
					<p class="name">谢惠伊，15862322589</p>
					<p class="adress">安徽省合肥市金寨路327号新鸿安大厦505室</p>
				</div>
				<div class="edit"></div>
			</li>
			<li class="border-1px">
				<div class="checked-box"></div>
				<div class="content">
					<p class="name">谢惠伊，15862322589</p>
					<p class="adress">安徽省合肥市金寨路327号新鸿安大厦505室</p>
				</div>
				<div class="edit"></div>
			</li>

		</ul>
	</div>
</template>

<script>
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	.usercenter-adress-list {
		ul {
			li {
				height: 66px;
				display: flex;
				align-items: center;
				background-color: white;
				padding: 0 12px;
				.border-1px(#e2e2e2);
				.checked-box {
					flex: 0 0 20px;
					height: 20px;
					border-radius: 50%;
					border: 2px solid #e60012;
				}
				.content {
					flex: 1;
					width: 0;
					margin-left: 20px;
					p {
						line-height: 24px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.name {
						font-size: 14px;
					}
					.adress {
						font-size: 14px;
						color: #707070;
					}
				}
				.edit {
					flex: 0 0 30px;
					height: 100%;
					background: url(../../../static/usercenter/adress-edit.png) left 22px no-repeat;
					background-size: 20px 20px;
				}
			}
		}
	}
</style>