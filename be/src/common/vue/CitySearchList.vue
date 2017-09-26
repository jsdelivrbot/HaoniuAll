<template>
	<div class="city-search-list-box">
		<ul class="list">
			<li class="vux-1px-b" @click="selectItem(item)" v-for="(item, index) in city">{{item}}</li>
		</ul>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		props: {
			city: Array
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			}
		}
	}
</script>

<style lang="less">
	.city-search-list-box {
		.list {
			background-color: white;
			li {
				height: 44px;
				line-height: 44px;
				padding-left: 12px;
				font-size: 16px;
				color: #333333;
			}
		}
	}
</style>