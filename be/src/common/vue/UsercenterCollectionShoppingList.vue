<template>
	<div class="usercenter-collection-shopping-list-box">
		<transition-group name="flip-list" tag="ul" class="clearfix">
			<li v-for="item,index in list" :key="item" class="test">
				<div class="img">
					<img src="../../../static/usercenter/collection-good.png">
				</div>
				<div class="text">
					<p class="title">韩国可爱波点iphone6手机壳 苹果7时尚光面硬壳6s保护套女款7plus</p>
					<span class="price">￥18</span>
					<span class="count">383人购买</span>
				</div>
				<div class="delete" v-show="editting" :class="{shakeLittle:editting}" @click="deleteItem(index)">
					<img src="../../../static/usercenter/delete.png" />
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script>
	export default {
		computed: {
			editting() {
				return this.$store.state.editting
			}
		},
		data() {
			return {
				list: [1, 2, 3, 4, 5, 6]
			}
		},
		methods: {
			deleteItem(index) {
				this.list.splice(index, 1)
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../static/less/mixin.less");
	@rem: 40rem;
	@import url("../../../static/less/csshake.css");
	.usercenter-collection-shopping-list-box {
		.test {
			transition: all .6s;
		}
		.flip-list-enter,
		.flip-list-leave-to
		/* .list-complete-leave-active for below version 2.1.8 */
		{
			opacity: 0;
			transform: translateY(30px);
		}
		.flip-list-leave-active {
			position: absolute;
		}
		ul {
			list-style-type: none;
			li {
				width: 340/@rem;
				height: 444/@rem;
				background-color: white;
				position: relative;
				float: left;
				margin-top: 20/@rem;
				margin-left: 20/@rem;
				.img {
					width: 100%;
					height: 339/@rem;
					img {
						width: 100%;
						height: 339/@rem;
					}
				}
				.text {
					padding: 0 16px;
					box-sizing: border-box;
					.title {
						font-size: 12px;
						color: #707070;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 48/@rem;
					}
					.price {
						color: #e60012;
						font-size: 18px;
						float: left;
					}
					.count {
						color: #707070;
						font-size: 12px;
						float: right;
						line-height: 48/@rem;
					}
				}
				.delete {
					width: 44/@rem;
					height: 44/@rem;
					position: absolute;
					top: 10/@rem;
					right: 10/@rem;
					img {
						width: 100%;
					}
				}
			}
		}
	}
</style>