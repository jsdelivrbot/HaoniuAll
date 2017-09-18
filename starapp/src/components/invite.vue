<template>
	<div class="invite">
		<topbar title='邀请好友'></topbar>
		<img src="../../static/img/invite.jpg" @click="goto" />
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
				this.$router.push('/pub')
			}
		}
	}
</script>
<style lang="less">
	.invite {
		height: auto;
		overflow: hidden;
		position: relative;
		background: #5ba1e0;
		padding-bottom: 40px;
		padding-top: 64px;
		>img {
			width: 100%;
			display: block;
		}
	}
</style>