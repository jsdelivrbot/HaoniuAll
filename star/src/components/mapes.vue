<template>
	<div style="height: calc(100vh-88px);">
		<baidu-map class='map' :zoom='zoom' v-if='center' @ready="handler" :center='centers'>
			<bm-marker :position="centers" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			</bm-marker>
			<bm-marker :position="sty" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			</bm-marker>
			<!--<bm-marker v-for='item in center'  :position="item" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			</bm-marker>-->
			<bm-label v-for='item in center' :key='item' :offset="{width: -22, height: -50}" v-if='item.count>0&&item.opt==""' @click='chenalert(item.lng+","+item.lat+","+item.count)' :content='item.count+"课"' :position='item' :labelStyle="{backgroundColor:'rgba(0,0,0,0)',backgroundSize:'100% 100%',backgroundImage:'url(../../static/img/cionbg.png)',borderColor:' rgba(0,0,0,0) ',color: '#fff ',textAlign:'center ',lineHeight:'32px ',padding:'5px ',boxSize:'border-box ', fontSize : '12px ',left:'50px',width:'32px ',height:'39px ',top:'-50px '}" title='Hover me' />
			<bm-label v-for='item in center' :key='item' :offset="{width: -22, height: -50}" v-if='item.count>0&&item.opt!==""' @click='chenalert(item.lng+","+item.lat+","+item.count)' :content='item.opt.substr(5,2)+"<br>"+item.count+"课"' :position='item' :labelStyle="{backgroundColor:'rgba(0,0,0,0)',backgroundSize:'100% 100%',backgroundImage:'url(../../static/img/cionbg.png)',borderColor:' rgba(0,0,0,0) ',color: '#fff ',textAlign:'center ',lineHeight:'16px ',padding:'5px ',boxSize:'border-box ', fontSize : '12px ',width:'32px ',height:'39px'}" title='Hover me' />
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :locationIcon='stys' @locationSuccess='abcd' :showAddressBar="true" :autoLocation="true"></bm-geolocation>
		</baidu-map>
	</div>
</template>
<script>
	//	import topbar from '../components/callback'
	export default {
		props: {
			center: {},
			focus: {},
			zoom: {
				default: 10
			}
		},
		data() {
			return {
				centers: {
					lng: 0,
					lat: 0
				},
				stys: {
					url: 'String',
					size: 'Size',
					opts: {
						anchor: 'Size',
						imageOffset: 'Size',
						imageSize: 'Size',
						infoWindowAnchor: 'Size',
						printImageUrl: 'String'
					}
				},
				sty: {
					lng: 0,
					lat: 0
				}
			}
		},
		methods: {
			abcd(a, b) {
				this.sty = a.point
				console.log(a.point)
			},
			chenalert(val) {
				this.$emit('getaddress', val)
			},
			handler({
				BMap,
				map
			}) {
				if(this.focus !== '') {
					this.centers.lng = this.focus.lng
					this.centers.lat = this.focus.lat
				} else {
					this.centers.lng = 121.496209
					this.centers.lat = 31.244657
				}
			}
		}
	}
</script>
<style>
	.map {
		width: 100%;
		height: 100vh;
		.mapspan {
			display: block;
			width: 32px;
			height: 39px;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	}
</style>