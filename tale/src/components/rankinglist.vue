<template>
	<div class="ranking-box-list">
		<ul class="top-list">
			<li v-for="(obj,index) in val" v-if='index < 3'>
				<router-link :to='"/newsdetail/"+obj.id'>
					<span v-if="index==0"><img src="../../static/img/28.png"/></span>
					<span v-if="index==1"><img src="../../static/img/29.png"/></span>
					<span v-if="index==2"><img src="../../static/img/30.png"/></span>
					<img :src="obj.imgUrl" v-if='obj.imgUrl' />
					<img src="../../static/img/wallhaven-414644.png" v-if='!obj.imgUrl' />
					<div>
						<p>
							{{obj.title}}
						</p>
						<em v-if="index==0" style="background: #f15b58;">{{obj.readCount}}</em>
						<em v-if="index==1" style="background: #7d83f9;">{{obj.readCount}}</em>
						<em v-if="index==2" style="background: #ffc45c;">{{obj.readCount}}</em>
					</div>
				</router-link>
			</li>
			<!--<li>
				<router-link to='/newsdetail/1'>
					<span>
						<img src="../../static/img/29.png"/>
					</span>
					<img src="../../static/img/timg9.jpg" />
					<p>怎么预防骨质酥松? <em style="background: #7d83f9;">1024</em></p>
				</router-link>
			</li>
			<li>
				<router-link to='/newsdetail/1'>
					<span>
						<img src="../../static/img/30.png"/>
					</span>
					<img src="../../static/img/timg10.jpg" />
					<p>保持六种习惯,远离颈椎病<em style="background: #ffc45c;">2048</em></p>
				</router-link>
			</li>-->
		</ul>

		<ul class="bottom-list">
			<!--<li>
				<router-link to='/newsdetail/1'>
					<i>1.</i>
					<span>腰痛？腰椎病？这些你都知道吗?</span>
					<em>1024</em>
				</router-link>
			</li>
			<li>
				<router-link to='/newsdetail/1'>
					<i>2.</i>
					<span>上班族如何预防颈椎病?</span>
					<em>1824</em>
				</router-link>
			</li>
			<li>
				<router-link to='/newsdetail/1'>
					<i>3.</i>
					<span>告别肩周炎的有效方法?</span>
					<em>1224</em>
				</router-link>
			</li>-->
			<li v-for="(obj,index) in val" v-if="index > 2">
				<router-link to='/newsdetail/1'>
					<i>{{index + 1}}.</i>
					<span>{{obj.title}}</span>
					<em>{{obj.readCount}}</em>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			val: Array
		},
		updated() {
			console.log(this.val)
		}
	}
</script>
<style lang="less">
	.ranking-box-list {
		height: auto;
		overflow: hidden;
		background: #f3f3f3;
		/*min-height: 100vh;*/
		.bottom-list {
			height: auto;
			overflow: hidden;
			background: #fff;
			border-top: 0.5px solid #E0E0E0;
			padding-left: 15px;
			li {
				height: 40px;
				line-height: 40px;
				padding-right: 15px;
				box-sizing: border-box;
				a {
					display: flex;
					border-bottom: 0.5px solid #ebebeb;
				}
				i {
					display: inline-block;
					width: 30px;
					height: 40px;
					line-height: 40px;
					font-weight: 600;
					margin-right: 8px;
					color: #999999;
				}
				span {
					flex: 1;
					width: 100%;
					color: #333333;
					height: 40px;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				em {
					min-width: 36px;
					display: inline-block;
					background: #c3c3c3;
					padding: 0 5px;
					color: #fff;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					margin: 10px 0;
					text-align: center;
				}
			}
		}
		.top-list {
			height: auto;
			margin-top: 10px;
			overflow: hidden;
			li {
				height: auto;
				overflow: hidden;
				background: #fff;
				padding: 15px;
				padding-bottom: 0;
				box-sizing: border-box;
				margin-bottom: 10px;
				border-bottom: 0.5px solid #E0E0E0;
				a {
					display: block;
					height: auto;
					overflow: hidden;
					position: relative;
					span {
						display: block;
						width: 20px;
						height: auto;
						overflow: hidden;
						position: absolute;
						top: 0;
						left: 0;
						img {
							width: 100%;
						}
					}
					>img {
						display: block;
						width: 100%;
						height: auto;
					}
					>div{
						height: 40px;
						line-height: 40px;
						color: #333333;
						overflow: hidden;
						display: flex;
						
						p{
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-right: 10px;
						}
						
						
						em {
							margin: 7px 0;
							display: block;
							line-height: 26px;
							font-size: 14px;
							height: 26px;
							float: right;
							padding: 0 6px;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>