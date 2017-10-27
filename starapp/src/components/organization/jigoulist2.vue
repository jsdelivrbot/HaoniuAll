<template>
	<div class="jigou-list">
		<ul>
			<li v-for='item in list' class="vux-1px-b">
				<router-link :to='"/jigoudetail/"+item.name'>
					<img :src="item.logo" v-if='item.logo' />
					<img :src="item.schools[0].thumbnail" v-if='!item.logo' />
					<!--<img src="../../../static/img/../../static/img/wallhaven-307832.jpg" v-if='!item.logo' />-->
					<div class="center-jigou">
						<h2>{{item.name}}</h2>
						<p>{{item.intro}}</p>
						<!--<div>{{item.intro.length>30?item.intro.substring(0,34)+'...':item.intro}}</div>-->
					</div>
				</router-link>
			</li>
		</ul>

		<div v-if='list==""&&iscollect>0&&shownull' class="null">
			暂无数据
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			list: Array,
			iscollect: Number,
			shownull: {
				default: false
			}
		}
	}
</script>
<style lang="less">
	.jigou-list {
		width: 100%;
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
			background: #fff;
			padding-left: 15px;
			box-sizing: border-box;
			li {
				width: 100%;
				display: block;
				height: 93px;
				padding: 16px 0;
				padding-right: 15px;
				box-sizing: border-box;
				a {
					display: flex;
					overflow: hidden;
				}
				img {
					width: 90px;
					height: 60px;
					display: block;
					margin-right: 10px;
				}
				.center-jigou {
					flex: 1;
					overflow: hidden;
					h2 {
						color: #333;
						font-size: 17px;
						line-height: 20px;
						font-weight: normal;
						margin-bottom: 3px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					p,
					div {
						/*display: flex;*/
						display: -webkit-box;
						width: 100%;
						font-size: 13px;
						line-height: 20px;
						height: 40px;
						color: #999;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}
</style>