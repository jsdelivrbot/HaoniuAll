<template>
	<div class="course-list">
		<ul>
			<li v-for='item in data' class="vux-1px-b">
				<router-link :to='"/coursedetail/"+item.schoolName+","+item.companyName+","+item.name'>
					<img :src="item.school.thumbnail" v-if='item.school.thumbnail' />
					<div class="center">
						<h2>{{item.name}}</h2>
						<p>{{item.school.address}}</p>
					</div>
					<div class="right">
						<span class="money">
							<em>¥</em>{{item.price}}
						</span>
						<div class="address">
							<!--<div>
								<img src="../../static/img/address.png"/>
							</div>-->
							<em v-if='item.school.distance'>{{ Math.floor(item.school.distance*100)/100}}公里</em>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<div v-if='data==""&&iscollect>0&&shownull' class="null">
			暂无数据
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: Array,
			iscollect: Number,
			shownull: {
				default: false
			}
		}
	}
</script>
<style lang="less">
	.course-list {
		margin-top: 5px;
		height: auto;
		overflow: hidden;
		.null {
			padding: 60px 0;
			text-align: center;
			color: #666;
		}
		ul {
			height: auto;
			overflow: hidden;
			/*padding: 0 15px;*/
			padding-left: 15px;
			background: #fff;
			box-sizing: border-box;
			li {
				display: block;
				height: 93px;
				padding: 16px 0;
				padding-right: 15px;
				box-sizing: border-box;
				a {
					display: flex;
				}
				img {
					width: 90px;
					height: 60px;
					display: block;
					margin-right: 10px;
				}
				.center {
					flex: 1;
					overflow: hidden;
					h2 {
						color: #333;
						font-size: 17px;
						line-height: 20px;
						height: 20px;
						font-weight: normal;
						margin-bottom: 3px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					p {
						font-size: 13px;
						line-height: 20px;
						height: 40px;
						color: #999;
						overflow: hidden;
						display:-webkit-box; 
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
				.right {
					display: block;
					width: 80px;
					height: 60px;
					text-align: right;
					.money {
						display: block;
						width: 100%;
						height: 30px;
						color: #ffa019;
						line-height: 20px;
						font-size: 20px;
						em {
							font-size: 15px;
							font-style: normal;
						}
					}
					.address {
						display: flex;
						height: 20px;
						margin-top: 10px;
						line-height: 24px;
						background: url(../../static/img/address.png) no-repeat left;
						background-size: 13px;
						background-position: 3px 0px;
						text-indent: 18px;
						/*div {
							flex: 1;
							line-height: 40px;
						}
						img {
							margin: auto;
							width: 11px;
							height: 13px;
							float: right;
							margin-top: 14px;
							margin-right: 2px;
						}*/
						em {
							text-align: left;
							flex: 1;
							color: #999;
							font-style: normal;
							font-size: 13px;
						}
					}
				}
			}
		}
	}
</style>