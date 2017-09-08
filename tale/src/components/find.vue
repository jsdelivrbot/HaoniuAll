<template>
	<div class="find-box">
		<goback title='发现' isShare='isLogin'></goback>
		<group title='推荐'>
			<cell title="砸金蛋中大奖" is-link :link='"/ifm/"+token' v-if="token">
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/13.png">
			</cell>
			<!--<cell title="砸金蛋" is-link link='http://192.168.1.124:8020/zaJinDan/index.html' v-if="token">
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../dist/static/img/13.png">
			</cell>-->
			<cell title="砸金蛋中大奖" is-link link='/login' v-if="!token">
				<img slot="icon" width="28" style="margin-right: 10px;" src="../../static/img/13.png">
			</cell>
			<cell v-for="item in tjList" :title="item.text" is-link :link='"/newslist/"+item.id+"/"+item.text'>
				<img slot="icon" width="28" style="margin-right: 10px;" :src="item.icon | fullImgUrl">
			</cell>
		</group>
		<group title='最新成功案列'>
			<cell v-for="item in anList" :title="item.text" is-link :link='"/newslist/"+item.id+"/"+item.text'>
				<img slot="icon" width="28" style="margin-right: 10px;" :src="item.icon | fullImgUrl">
			</cell>
		</group>
		<group title='频道'>
			<cell v-for="item in pdList" :title="item.text" is-link :link='"/newslist/"+item.id+"/"+item.text'>
				<img slot="icon" width="28" style="margin-right: 10px;" :src="item.icon | fullImgUrl">
			</cell>
		</group>
	</div>
</template>
<script>
	import goback from '../components/goback'
	import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
	export default {
		components: {
			Cell,
			CellBox,
			CellFormPreview,
			Group,
			Badge,
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				tjList: [],
				anList: [],
				pdList: [],
				token: ''
			}
		},
		created() {
			var _self = this
			this.$http.post(_self.lchttp + '/app/news/column?newsId=6').then(
				(res) => {
					_self.tjList = res.data.obj
				}
			)
			this.$http.post(_self.lchttp + '/app/news/column?newsId=9').then(
				(res) => {
					_self.anList = res.data.obj
				}
			)
			this.$http.post(_self.lchttp + '/app/news/column?newsId=13').then(
				(res) => {
					_self.pdList = res.data.obj
				}
			)
		},
		filters: {
			fullImgUrl(val) {
				return localStorage.getItem('http') + val
			}
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.token = localStorage.getItem('token')
			})
		}
	}
</script>
<style lang="less">
	.find-box {
		margin-top: 50px;
		padding-bottom: 100px;
	}
	
	.cell-bar {
		height: auto;
		overflow: hidden;
		.title {
			height: 38px;
			line-height: 38px;
			background: #f3f3f3;
			padding: 0 15px;
			font-size: 14px;
			color: #999999;
		}
		ul {
			height: auto;
			overflow: hidden;
			padding-left: 15px;
			box-sizing: border-box;
			border-top: 0.5px solid #e0e0e0;
			background: #fff;
			li {
				display: flex;
				height: 45px;
				line-height: 45px;
				border-bottom: 0.5px solid #ebebeb;
			}
		}
	}
</style>