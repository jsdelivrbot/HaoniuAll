<template>
	<div class="search-header-box">
		<input type="text" placeholder="搜索车牌号或者车辆信息" v-model="text" />
		<span @click="search">搜索</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		props: {
			title: String,
			iconShow: Boolean
		},
		created() {
			window.$initInput = this
		},
		methods: {
			back() {
				if(this.$route.query.goindex === 'true') {
					window.android.close()
				} else {
					this.$router.back(-1)
				}
			},
			search() {
				this.$emit('goSearch', this.text)
			},
			initData() {
				this.text = ''
			}
		}
	}
</script>

<style lang="less">
	.search-header-box {
		width: 100%;
		height: 45px;
		background-color: #63bffe;
		display: flex;
		align-items: center;
		color: white;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		box-sizing: border-box;
		padding: 0 0 0 30px;
		input {
			width: 0;
			flex: 1;
			height: 30px;
			border: none;
			font-size: 14px;
			background: url(../../../static/image/search.png) 12px center no-repeat;
			background-size: 14px;
			background-color: white;
			text-indent: 3em;
			border-radius: 6px;
			outline: none;
		}
		span {
			width: 52px;
			flex: 0 0 52px;
			text-align: center;
			line-height: 45px;
			font-size: 16px;
			padding-right: 12px;
		}
	}
</style>