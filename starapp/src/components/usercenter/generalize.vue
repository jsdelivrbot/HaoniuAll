<template>
	<div class="generalize">
		<v-title title='我的推广'></v-title>
		<group style='margin-top: 60px;'>
			<cell title="奖励余额" value="提现" is-link link='/tixian'></cell>
			<cell title="已推广人数" :value="total"></cell>
			<cell title="我的推广码" is-link link='/tuiguangma'></cell>
		</group>
		<group>
			<cell title="推广记录" is-link link='/tuiguang'></cell>
			<cell title="推广奖励获取记录" is-link link='/getrecord'></cell>
		</group>
	</div>
</template>
<script>
	import title from '@/components/callback'
	import { Cell, CellBox, Group } from 'vux'
	export default {
		components: {
			Cell,
			CellBox,
			Group,
			'v-title': title
		},
		data() {
			return {
				total: ''
			}
		},
		mounted() {
			this.$http.get('/user/reward/createErwei').then(
				(res) => {
					this.total = res.data.obj.count
					console.log(res.data)
				}
			)
		},
		methods: {
			toma() {
				window.location.href = '/#/tuiguangma'
			}
		}
	}
</script>
<style lang="less">

</style>