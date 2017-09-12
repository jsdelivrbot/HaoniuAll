<template>
	<div class="list-body">
		<x-header>游戏商城</x-header>
		<div style="text-align: center; color: red;line-height: 40vw;">
			商城对接中,敬请期待....
		</div>

	</div>
</template>
<script>
	import { XTextarea, XHeader, XButton, Flexbox, FlexboxItem, XInput, Group } from 'vux'
	export default {
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			XTextarea
		}
	}
</script>
<style lang="less">
	.chushou-tips {
		padding: 10px;
		box-sizing: border-box;
		font-size: 0.313253rem;
		p {
			color: red;
			display: inline-block;
		}
		span {
			font-size: 0.26506rem;
			color: #666;
		}
	}
	
	.kechushou {
		font-size: 0.313253rem;
		padding: 10px;
		box-sizing: border-box;
		background: #f90;
		color: #fff;
	}
</style>