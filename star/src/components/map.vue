<template>
	<div>
		<topbar title='地图'></topbar>
		<baidu-map class="map" :zoom='16' :center="center[0]" @ready='handler'>
			<bm-marker :position="center[0]" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
				<bm-label content="我们在这" :labelStyle="{color: '#db3652', fontSize : '16px',borderColor:'#f50',padding:'5px 10px',borderRadius:'5px'}" :offset="{width: -30, height: 30}" />
			</bm-marker>
			<!--<bm-circle :center="center[0]" :radius="radius" :editing="true" class='rouder'>
				<span>fdfkl</span>
			</bm-circle>-->
			<!--<bm-label @click='chenalert' content="静安</br>140课" :offset='0' :position="center[0]" :labelStyle="{borderColor:'#3cb8ff',color: '#fff',textAlign:'center',lineHeight:'20px',padding:'10px',boxSize:'border-box', fontSize : '14px',left:'0px',width:'40px',height:'40px',borderRadius:'50%',top:'-50px',backgroundColor:'rgba(29,137,248,0.9)'}" title="Hover me" />-->
		</baidu-map>
	</div>
</template>
<script>
	import topbar from '../components/callback'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				localhttp: localStorage.getItem('localhttp'),
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