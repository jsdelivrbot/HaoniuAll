<template>
	<div class="commnet-box">
		<div class="top-out-bar">
			<img src="../../static/img/left.svg" />
			<span>更多评论</span>
		</div>

		<div class="title">
			评论
		</div>
		<ul class="commnet-list">
			<li>
				<div class="img">
					<img src="../../static/img/meizi.jpg" />
				</div>
				<div class="content">
					<p><span>王先生</span> <em>昨天 20:50</em></p>
					<span>你好请问你是怎么治好的?</span>
				</div>
			</li>
			<li>
				<div class="img">
					<img src="../../static/img/meizi.jpg" />
				</div>
				<div class="content">
					<p><span>李女士</span> <em>昨天 20:50</em></p>
					<span>真的可以治好吗?</span>
				</div>
			</li>
			<li>
				<div class="img">
					<img src="../../static/img/meizi.jpg" />
				</div>
				<div class="content">
					<p><span>康教授</span> <em>昨天 20:50</em></p>
					<span>只要谨遵医嘱一定可以治好的!</span>
				</div>
			</li>
		</ul>

		<div class="static-footer">
			<input type="text" name="" id="" value=""  placeholder="在这里输入评论的内容....." />
			<span>发送</span>
		</div>

	</div>
</template>
<script>
	export default {}
</script>
<style lang="less">
	.static-footer {
		height: 50px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		padding: 7px 15px;
		box-sizing: border-box;
		display: flex;
		input {
			flex: 1;
			margin-right: 10px;
			border: 0.5px solid #e5e5e5;
			border-radius:5px ;
			text-indent: 1em;
			font-size: 14px;
		}
		span {
			width: 65px;
			background: #ff5d5c;
			height: 36px;
			color: #fff;
			text-align: center;
			line-height: 36px;
			font-size: 14px;
			border-radius: 5px;
		}
	}
	
	.commnet-box {
		height: auto;
		overflow: hidden;
		background: #f3f3f3;
		min-height: 100vh;
		padding-bottom: 50px;
		box-sizing: border-box;
		.title {
			height: 40px;
			line-height: 40px;
			padding: 0 22px;
			box-sizing: border-box;
			background: #fff;
			font-size: 14px;
			position: relative;
			color: #333333;
		}
		.title:before {
			content: '';
			position: absolute;
			left: 15px;
			top: 10px;
			width: 3px;
			height: 20px;
			background: #ff5d5c;
		}
		.commnet-list {
			height: auto;
			overflow: hidden;
			padding-left: 15px;
			background: #fff;
			border-bottom: 0.5px solid #dadada;
			li:last-child {
				border: none !important;
			}
			li {
				height: 65px;
				display: flex;
				border-bottom: 0.5px solid #eeeeee;
				padding-top: 5px;
				box-sizing: border-box;
				.img {
					width: 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 12px;
					height: 100%;
					img {
						width: 100%;
						border-radius: 50%;
					}
				}
				.content {
					flex: 1;
					margin: 5px 0;
					padding-right: 15px;
					box-sizing: border-box;
					p {
						display: flex;
						height: 25px;
						line-height: 25px;
						color: #666666;
						span {
							flex: 1;
							text-align: left;
						}
						em {
							flex: 1;
							font-size: 14px;
							text-align: right;
						}
					}
					>span {
						line-height: 25px;
						color: #333333;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>