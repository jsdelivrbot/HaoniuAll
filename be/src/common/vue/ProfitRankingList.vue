<template>
	<div class="profit-ranking-list-box">
		<ul class="list">
			<li>
				<div class="label first"></div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
			<li>
				<div class="label second"></div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
			<li>
				<div class="label third"></div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
			<li>
				<div class="label">4</div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
			<li>
				<div class="label">5</div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
			<li>
				<div class="label">6</div>
				<div class="img">
					<img src="../../../static/ranking4.png" />
				</div>
				<div class="name">胡一菲</div>
				<div class="total">500.00元</div>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="less">
	.profit-ranking-list-box {
		.list {
			li {
				display: flex;
				height: 60px;
				&:nth-child(odd) {
					background-color: white;
				}
				&:nth-child(even) {
					background-color: #f5f7fb;
				}
				.label {
					flex: 0 0 54px;
					width: 54px;
					font-size: 18;
					color: #343434;
					display: flex;
					justify-content: center;
					align-items: center;
					&.first {
						background: url(../../../static/ranking1.png) center no-repeat;
						background-size: 14px 22px;
					}
					&.second {
						background: url(../../../static/ranking2.png) center no-repeat;
						background-size: 14px 22px;
					}
					&.third {
						background: url(../../../static/ranking3.png) center no-repeat;
						background-size: 14px 22px;
					}
				}
				.img {
					flex: 0 0 44px;
					width: 44px;
					display: flex;
					align-items: center;
					img {
						width: 100%;
					}
				}
				.name {
					flex: 1;
					width: 0;
					margin-left: 18px;
					font-size: 14px;
					color: #343434;
					display: flex;
					align-items: center;
				}
				.total {
					flex: 0 0 80px;
					width: 80px;
					font-size: 14px;
					color: #343434;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>