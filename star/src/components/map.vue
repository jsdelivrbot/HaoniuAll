<template>
	<div>
		<topbar title='地图'></topbar>
		<baidu-map class="map" :zoom='16' :center="center[0]" @ready='handler'>
			<bm-marker :position="center[0]" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
				<bm-label content="我们在这" :labelStyle="{color: '#db3652', fontSize : '16px',borderColor:'#f50',padding:'5px 10px',borderRadius:'5px'}" :offset="{width: -30, height: 30}" />
			</bm-marker>
		</baidu-map>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		name: 'nokeep',
		components: {
			topbar
		},
		data() {
			return {
				center: [{
					lng: 0,
					lat: 0
				}, {
					lng: 0,
					lat: 0
				}, {
					lng: 0,
					lat: 0
				}],
				radius: 200
			}
		},
		methods: {
			handler({
				BMap,
				map
			}) {
				let arr = this.$route.params.lg.split(',')
				console.log(BMap, map)
				this.center[0].lng = arr[0]
				this.center[0].lat = arr[1]
			}
		}
	}
</script>
<style>
	.map {
		width: 100%;
		height: 100vh;
		.rouder {
			background: #f50;
		}
	}
</style>