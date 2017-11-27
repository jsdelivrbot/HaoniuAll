<template>
	<div class="search-result-box">
		<div v-if='val==""' class="null">
			暂无数据
		</div>
		<ul>
			<li v-for="(items,indexs) in val" :key='indexs' v-if='items.size>0'>
				<div class="jigou vux-1px-b">
					<img :src="items.schoolUrl" />
					<div class="info">
						<h2>{{items.schoolName}}{{items.schoolName}}</h2>
						<div class="address">
							<p>
								{{items.address}}
							</p>
							<span>
								<img src="../../static/img/zbicon@3x.png"/>
								<em>{{items.dist}}</em>
							</span>
						</div>
					</div>
				</div>

				<ul :class="{'the_more':openIndex==indexs}">
					<router-link tag='li' :to='"/coursedetail/"+item.id' :key='index' v-for="(item,index) in items.courses" class="vux-1px-b">
						<!--<img :src="item.courseUrl" />-->
						<div class="center">
							<h2>{{item.courseName}}</h2>
							<p>
								{{item.intro}}
							</p>
						</div>
						<div class="right">
							<em>¥</em><span>{{item.price}}</span>
						</div>
					</router-link>
				</ul>

				<div class="see_more" @click="clickIndex(indexs)" v-if='items.size>2'>
					<div v-show="openIndex!==indexs">查看更多课程</div>
					<div v-show="openIndex==indexs">点击收起</div>
				</div>
			</li>
		</ul>

	</div>
</template>
<script>
	export default {
		props: {
			val: ''
		},
		data() {
			return {
				openIndex: -1,
				openNum: 2
			}
		},
		methods: {
			clickIndex(index) {
				if(this.openIndex === index) {
					this.openIndex = -1
				} else {
					this.openIndex = index
				}
			}
		}
	}
</script>
<style lang="less">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
	
	* {
		list-style: none;
	}
	
	.search-result-box {
		margin-top: 98px;
		.null {
			padding: 60px 0;
			text-align: center;
			color: #666;
		}
		>ul>li {
			list-style: none;
			padding-left: 15px;
			box-sizing: border-box;
			margin-bottom: 10px;
			background: #fff;
			.see_more {
				line-height: 44px;
				color: #666;
				font-size: 13px;
				text-align: center;
			}
			.jigou {
				height: 75px;
				overflow: hidden;
				padding: 10px 0;
				box-sizing: border-box;
				display: flex;
				>img {
					width: 55px;
					height: 100%;
					margin-right: 15px;
				}
				.info {
					flex: 1;
					height: 55px;
					overflow: hidden;
					h2 {
						font-size: 15px;
						color: #333;
						font-weight: normal;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.address {
						width: 100%;
						display: flex;
						overflow: hidden;
						p {
							flex: 1;
							height: 30px;
							font-size: 13px;
							line-height: 15px;
							color: #999;
						}
						span {
							width: 60px;
							display: flex;
							line-height: 12px;
							padding-top: 18px;
							margin-right: 15px;
							img {
								width: 10px;
								height: 12px;
							}
							em {
								font-style: normal;
								font-size: 12px;
								color: #999;
							}
						}
					}
				}
			}
			>ul {
				max-height: 160px;
				overflow: hidden;
			}
			.the_more {
				max-height: 1000vh !important;
				height: auto !important;
			}
			>ul>li {
				display: flex;
				height: 80px;
				padding: 10px 0;
				box-sizing: border-box;
				overflow: hidden;
				img {
					width: 90px;
					height: 60px;
					margin-right: 10px;
				}
				.center {
					flex: 1;
					overflow: hidden;
					h2 {
						font-size: 15px;
						color: #333;
						font-weight: normal;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					p {
						height: 30px;
						font-size: 13px;
						line-height: 15px;
						color: #999;
						overflow: hidden;
						display: -webkit-box;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
				.right {
					margin-left: 10px;
					margin-right: 15px;
					overflow: hidden;
					font-size: 17px;
					color: #FF9600;
					em {
						font-size: 12px;
						font-style: normal;
					}
				}
			}
		}
	}
</style>