<template>
	<div class="plan">
		<ul>
			<li :class="{select:index>=0}">
				<span>
					
				</span>
				<p>
					提交申请
				</p>
			</li>
			<li :class="{select:index>=1}">
				<span>
					
				</span>
				<p>
					客服介入
				</p>
			</li>
			<li :class="{select:index>=2}">
				<span>
					
				</span>
				<p>
					申请通过
				</p>
			</li>
			<li :class="{select:index>=3}">
				<em>
					
				</em>
				<p>
					已退款
				</p>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			index: Number
		}
	}
</script>
<style lang="less">
	.plan {
		height: auto;
		margin: 20px 0;
		background: #fff;
		overflow: hidden;
		/*padding: 0 15px;*/
		box-sizing: border-box;
		.select span,.select em {
			border-color: #84bef3;
		}
		.select span:after ,.select em:after {
			background: #84bef3;
		}
		.select span:before ,.select em:before {
			position: absolute;
			content: '';
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 10px;
			height: 10px;
			background: #84bef3;
			border-radius: 50%;
		}
		.select p {
			color: #333333;
		}
		li {
			list-style: none;
			height: 35px;
			line-height: 35px;
			display: flex;
			span,
			em {
				width: 18px;
				height: 18px;
				border: 1px solid #999;
				box-sizing: border-box;
				border-radius: 50%;
				margin: 8px;
				position: relative;
				z-index: 9999999;
			}
			/*.sele {
				color: #84bef3;
			}*/
			span:after {
				position: absolute;
				content: '';
				left: 0;
				right: 0;
				bottom: -20px;
				margin: auto;
				width: 1px;
				height: 20px;
				background: #999;
			}
			span:last-child:after {
				height: 0;
			}
			p {
				color: #999;
				line-height: 35px;
				font-size: 12px;
			}
		}
	}
</style>