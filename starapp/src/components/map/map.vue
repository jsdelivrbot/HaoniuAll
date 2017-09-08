<template>
	<div>
		<topbar title='地图'></topbar>
		<baidu-map class="map" :zoom='16' :center="center[0]" @ready='handler' v-if='isactivated'>
			<bm-marker :position="center[0]" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
				<bm-label content="我们在这" :labelStyle="{color: '#db3652', fontSize : '16px',borderColor:'#f50',padding:'5px 10px',borderRadius:'5px'}" :offset="{width: -30, height: 30}" />
			</bm-marker>
		</baidu-map>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				isactivated: true,
				token: sessionStorage.getItem('token'),
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
		beforeRouteLeave(to, from, next) {
			this.isactivated = false
			next()
		},
		activated() {
			this.isactivated = true
		},
		methods: {
			chenalert() {
				alert(1)
			},
			handler({
				BMap,
				map
			}) {
				let arr = this.$route.params.lg.split(',')
				console.log(BMap, map)
				this.center[0].lng = arr[0]
				this.center[0].lat = arr[1]
			}
			//			handler2({
			//				BMap,
			//				map
			//			}) {
			//				let $this = this
			//				var jsonp = require('jsonp')
			//				jsonp('http://api.map.baidu.com/location/ip?ak=Z8Oh2BjN3e3a0bZ7EUoUYiY9fpNTFxtP&coor=bd09ll', null, function(err, data) {
			//					if(err) {} else {
			//						$this.center.lng = data.content.point.x
			//						$this.center.lat = data.content.point.y
			//					}
			//				})
			//			}
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