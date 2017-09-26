<template>
	<div class="invitereg">
		<topbar title='邀请好友'></topbar>
		<img src="../../static/img/invitereg.jpg" @click="goto" />
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		methods: {
			goto() {
				this.$router.push('/reg')
			}
		}
	}
</script>
<style lang="less">
	.invitereg {
		height: auto;
		overflow: hidden;
		position: relative;
		background: #ffa714;
		padding-bottom: 40px;
		padding-top: 64px;
		>img {
			width: 100%;
			display: block;
		}
	}
</style>