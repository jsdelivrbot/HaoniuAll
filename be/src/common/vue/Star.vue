<template>
	<div class="star-box">
		<div class="bg">
			<img src="../../../static/star.png" />
			<img src="../../../static/star.png" />
			<img src="../../../static/star.png" />
			<img src="../../../static/star.png" />
			<img src="../../../static/star.png" />
			<span class="score">{{scroeFull}}分</span>
			<div class="active">
			<img src="../../../static/active-star.png" v-if="scroe>=1"/>
			<img src="../../../static/active-star.png" v-if="scroe>=2"/>
			<img src="../../../static/active-star.png" v-if="scroe>=3"/>
			<img src="../../../static/active-star.png" v-if="scroe>=4"/>
			<img src="../../../static/active-star.png" v-if="scroe>=5"/>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			scroe: {
				type: Number,
				default: 0
			}
		},
		computed: {
			scroeFull() {
				return this.scroe.toFixed(1)
			}
		}
	}
</script>

<style lang="less">
	.star-box {
		line-height: 14px;
		.bg, .active{
			position: relative;
			img {
				width: 12px;
				height: 12px;
				margin-right: 2px;
				display: inline-block;
			}
			.score{
				color: #e60012;
				font-size: 12px;
			}
		}
		.active {
			position: absolute;
			top: 0;
		}
	}
</style>