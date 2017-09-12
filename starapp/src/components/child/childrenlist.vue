<template>
	<div class="childrenlist-box">
		<topbar title='子女信息'></topbar>
		<div class="children-info-list">
			<ul class="vux-1px-t">
				<router-link class="vux-1px-b" replace :to='"/changeChildrenInfo/"+index' tag='li' :key='index' v-for="(item,index) in list">
					<div class="left-info">
						<div>
							<h2>{{item.name}}</h2>
							<img src="../../../static/img/girl.png" v-if='item.gender ===1' />
							<img src="../../../static/img/boy.png" v-if='item.gender ===0' />
							<em></em>
						</div>
						<p>
							出生日期: <span>{{item.birthday}}</span>
						</p>
					</div>
					<div class="right-info">
						<router-link :to='"/pub/kcb/timeline/"+item.id' tag='div'>
							<img src="../../../static/img/childrenicon.png" />
							<span>课程表</span>
						</router-link>
						<!--<div>
							<img src="../../../static/img/childrenicon.png" />
							<span>课程表</span>
						</div>-->
					</div>
				</router-link>
				<!--<li class="vux-1px-b" v-for="item in list">
					<div class="left-info">
						<div>
							<h2>{{item.name}}</h2>
							<img src="../../../static/img/girl.png" v-if='item.gender ===1' />
							<img src="../../../static/img/boy.png" v-if='item.gender ===0' />
							<em></em>
						</div>
						<p>
							出生日期: <span>{{item.birthday}}</span>
						</p>
					</div>
					<div class="right-info">
						<router-link :to='"/pub/kcb/timeline/"+item.id' tag='div'>
							<img src="../../../static/img/childrenicon.png" />
							<span>课程表</span>
						</router-link>
					</div>
				</li>-->
			</ul>
		</div>

		<div class="btn-addchildren">
			<router-link tag='div' to='addchildreninfo'>
				<em></em>
				<img src="../../../static/img/addicon.png" />
				<p>
					添加子女信息
				</p>
				<em></em>
			</router-link>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { querystring } from 'vux'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				list: JSON.parse(localStorage.getItem('childrenInfo'))
			}
		},
		activated() {
			this.list = JSON.parse(localStorage.getItem('childrenInfo'))
		}
	}
</script>
<style lang="less">
	.childrenlist-box {
		padding-top: 55px;
		box-sizing: border-box;
		.btn-addchildren {
			padding: 0 15px;
			box-sizing: border-box;
			margin-top: 20px;
			div {
				height: 44px;
				width: 100%;
				font-size: 18px;
				padding: 13px 0;
				box-sizing: border-box;
				margin-bottom: 15px;
				border-radius: 5px;
				border: none;
				background: #84BEF3;
				color: #fff;
				display: flex;
				img {
					width: 18px;
					height: 18px;
					margin-right: 5px;
				}
				p {
					line-height: 18px;
				}
				em {
					flex: 1;
				}
			}
		}
		.children-info-list {
			height: auto;
			overflow: hidden;
			li {
				padding: 12px 15px;
				box-sizing: border-box;
				background: #fff;
				height: 62px;
				display: flex;
				.left-info {
					overflow: hidden;
					flex: 2;
					p {
						font-size: 14px;
						color: #999;
						line-height: 14px;
					}
					div {
						display: flex;
						margin-bottom: 4px;
						h2 {
							font-size: 17px;
							font-weight: normal;
							color: #333;
							line-height: 18px;
						}
						img {
							width: 13px;
							height: 13px;
							margin: 1px 6px;
						}
						em {
							flex: 1;
						}
					}
				}
				.right-info {
					overflow: hidden;
					margin-right: 23px;
					div {
						position: relative;
						z-index: 999;
						padding: 2px 0;
						text-align: center;
						img {
							line-height: 20px;
							margin: 0 auto;
							display: block;
							width: 20px;
							height: 20px;
							margin-bottom: 4px;
						}
						span {
							display: block;
							font-size: 10px;
							color: #84bef3;
							line-height: 10px;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>