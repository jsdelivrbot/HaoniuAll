<template>
	<div class="list-body">
		<x-header>游戏公告</x-header>
		<group v-for='item in tipsList'>
			<cell :title="item.title" is-link :border-intent="false" @click.native="showadd(item.id)">
			</cell>
			<p class="slide" :class='{"animate":showlist==item.id}'>{{item.content}}</p>
		</group>
	</div>
</template>
<script>
	import { Cell, CellBox, XHeader, XButton, Flexbox, FlexboxItem, XInput, Group } from 'vux'
	export default {
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				id: '',
				tipsList: '',
				showlist: '0',
				fangxiang: 'right'
			}
		},
		components: {
			XHeader,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			Cell,
			CellBox
		},
		mounted() {
			let id = localStorage.getItem('id')
			this.id = id
			this.$http.get(this.enhttp + '/trees/mobile/fodder/announcement').then(
				(res) => {
					console.log(res.data)
					if(!res.data.success) {
						this.$vux.alert.show({
							title: '对不起',
							content: res.data.message
						})
					} else {
						this.tipsList = res.data.data
					}
				}
			)
		},
		methods: {
			showadd(id) {
				if(this.showlist === id) {
					this.showlist = ''
					this.fangxiang = 'right'
				} else {
					this.showlist = id
					this.fangxiang = 'down'
				}
			}
		}

	}
</script>
<style lang="less">
	.slide {
		padding: 0 20px;
		overflow: hidden;
		max-height: 0;
		color: #666;
		transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
	}
	
	.animate {
		padding: 10px 20px;
		max-height: 9999px;
		transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
		transition-delay: 0s;
	}
</style>