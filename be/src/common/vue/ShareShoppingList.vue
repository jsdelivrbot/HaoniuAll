<template>
	<router-link to="/share-shopping/detail/1"  tag="div" class="share-shopping-list-box">
		<div class="item">
			<div class="item-title">男人也可以活的精致</div>
			<div class="content">
				<div class="img">
					<!--<img src="../../../static/shareshopping1.png" />-->
				</div>
				<div class="img">
					<!--<img src="../../../static/shareshopping2.png" />-->
				</div>
				<div class="img">
					<!--<img src="../../../static/shareshopping3.png" />-->
				</div>
			</div>
			<div class="item-footer">
				<div class="pre">
					<span class="key">返佣</span>
					<span class="value">￥30.0/单</span>
				</div>
				<div class="count">
					<div class="good">
						<!--<img src="../../../static/shareshopping4.png" />-->
						<span>10</span>
					</div>
					<div class="share">
						<!--<img src="../../../static/shareshopping5.png" />-->
						<span>21</span>
					</div>
				</div>
				<div class="share-btn">
					<span>立即分享</span>
				</div>
			</div>
		</div>
	</router-link>
</template>

<script>
</script>

<style lang="less">
	@rem: 40rem;
	.share-shopping-list-box {
		padding: 0 12px;
		.item {
			background-color: white;
			margin-top: 10px;
			padding: 0 12px;
			box-shadow: 0 4px 4px rgba(0,0,0,0.35);
			.item-title {
				font-size: 16px;
				height: 44px;
				line-height: 44px;
			}
			.content {
				display: flex;
				.img {
					flex: 1;
					width: 0;
					&+.img {
						margin-left: 16/@rem;
					}
					img {
						width: 100%;
					}
				}
			}
			.item-footer {
				display: flex;
				height: 49px;
				line-height: 49px;
				.pre {
					flex: 1;
					width: 0;
					span {
						line-height: 0;
					}
					.key {
						font-size: 12px;
						color: #707070;
					}
					.value {
						font-size: 18px;
						color: #e60012;
					}
				}
				.count {
					flex: 0 0 114px;
					width: 114px;
					display: flex;
					div {
						width: 0;
						flex: 1;
						display: flex;
						align-items: center;
						&.good {
							img {
								width: 16px;
								height: 16px;
							}
						}
						&.share {
							img {
								width: 14px;
								height: 16px;
							}
						}
						span {
							font-size: 12px;
							color: #707070;
							padding-left: 6px;
						}
					}
				}
				.share-btn {
					flex: 0 0 58px;
					width: 58px;
					display: flex;
					align-items: center;
					span {
						color: #e60012;
						font-size: 12px;
						width: 100%;
						text-align: center;
						height: 20px;
						line-height: 20px;
						border: 1px solid #e60012;
						border-radius: 6px;
					}
				}
			}
		}
	}
</style>