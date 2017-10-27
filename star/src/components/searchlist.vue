<template>
	<div class="searchlist">
		<div class="search-box vux-1px-b">
			<div class="out-img" @click="goback()">
				<img src="../../static/img/Backicon@3x.png" />
			</div>

			<div class="input">
				<img src="../../static/img/iconsearch.png" />
				<input type="search" v-model="searchdata.keyword" name="" @keydown.enter="searchall()" id="" value="" placeholder="请输入您想要搜索的内容" />
			</div>
			<span v-if="maporList==='map'" @click="changeml('list')">
				<img src="../../static/img/iconlist.png"/>
			</span>
			<span v-if="maporList!=='map'" @click="changeml('map')">
				<img src="../../static/img/iconmap.png"/>
			</span>
		</div>

		<div class="select-box">
			<ul class="select-list">
				<!--<li :class="[tabbar==1?'active':'']" @click="changeSelect(1)">
					<span v-if='selectvalue1[0]=="k"'>课程</span>
					<span v-if='selectvalue1[0]=="c"'>机构</span>
				</li>-->
				<li :class="[tabbar==2?'active':'']" @click="changeSelect(2)">
					科目
				</li>
				<li :class="[tabbar==3?'active':'']" @click="changeSelect(3)">
					年龄
				</li>
				<li :class="[tabbar==4?'active':'']" @click="changeSelect(4)">
					距离
				</li>
			</ul>

			<div class="select-detail" style="min-height: calc(100% - 88px); " v-show='tabbar>0'>
				<picker :data='kemu' ref="picker1" :columns=3 v-model='selectvalue2' style='background: #fff;' v-show='tabbar==2'></picker>
				<picker :data='ages' :columns=1 @on-change='search3()' v-model='selectvalue3' style='background: #fff;' v-show='tabbar==3'></picker>
				<picker :data='address' :columns=3 v-model='selectvalue4' style='background: #fff;' v-show='tabbar==4'></picker>
				<div style="text-align: center;">
					<button v-show='tabbar==2' @click="search2()" style="width: 180px;height: 32px;border: none;background: #84BEF3;color: #fff;outline:none;border-radius:3px ;margin: auto;margin-top: 30px;">确定</button>
					<button v-show='tabbar==4' @click="search4()" style="width: 180px;height: 32px;border: none;background: #84BEF3;color: #fff;outline:none;border-radius:3px ;margin: auto;margin-top: 30px;">确定</button>
				</div>

			</div>
		</div>
		<!--<div class="titlebar" v-html="titlebar" v-if='titlebar&&searchdata.type=="map"&&tabbar==0'></div>-->
		<component @getaddress='getaddress' :zoom='zooms' :focus='onfocus' :is="ismaps" :center='resultData' v-if='maporList=="map"'></component>

		<div class="map-solo" v-if='maporList==="map"'>
			<div @click="zooms++">
				<img src="../../static/img/jian.png" />
			</div>
			<div @click="zooms--">
				<img src="../../static/img/add.png" />
			</div>
		</div>

		<!--<courseList v-if='searchdata.type!=="map"' style='margin-top: 94px;' :shownull='truenull' :data='list' :iscollect='1'></courseList>-->
		<!--<jigoulist v-if='searchdata.type!=="map"' style='margin-top: 94px;' :shownull='truenull' :list='jigoulist' :iscollect='1'></jigoulist>-->
		<searchresult :val='resultData' v-if='maporList=="list"'></searchresult>
	</div>
</template>
<script>
	import courseList from '../components/courselist'
	import jigoulist from '../components/jigoulist'
	import mapes from '../components/mapes'
	import searchresult from '../components/searchresult'
	import { Picker, querystring } from 'vux'
	export default {
		components: {
			courseList,
			Picker,
			jigoulist,
			mapes,
			searchresult
		},
		beforeRouteEnter(to, from, next) {
			sessionStorage.setItem('searchpath', from.path)
			next()
		},
		activated() {
			if(sessionStorage.getItem('searchpath') === '/pub/home' || sessionStorage.getItem('searchpath') === '/vaguesearch' || sessionStorage.getItem('searchpath') === '/coursesort') {
				let arr = querystring.parse(this.$route.params.name)
				this.searchdata.category = arr.cat
				this.searchdata.keyword = arr.keyword
				this.searchall()
			}
		},
		methods: {
			changeml(val) {
				this.maporList = val
				if(val === 'map') {
					this.ismaps = 'mapes'
				} else {
					this.ismaps = ''
				}
			},
			searchall() {
				this.$vux.loading.show({
					text: '数据加载中...'
				})
				this.ismaps = ''
				this.$http.get(localStorage.getItem('search') + '/company/search/index', {
					params: {
						keyword: this.searchdata.keyword,
						category: this.searchdata.category,
						minAge: this.searchdata.minAge,
						maxAge: this.searchdata.maxAge,
						areaId: this.searchdata.areaId,
						dist: this.searchdata.dist,
						x: this.searchdata.x,
						y: this.searchdata.y,
						page: this.searchdata.page,
						rows: this.searchdata.rows
					}
				}).then(
					(res) => {
						this.$vux.loading.hide()
						this.ismaps = 'mapes'
						this.zooms = 12
						this.resultData = res.data
						this.tabbar = 0
					}
				)
			},
			getaddress(data) {
				this.$router.push('/jigoudetail/' + data)
			},
			search4() {
				this.searchdata.areaId = this.selectvalue4[0]
				console.log(this.searchdata.areaId)
				this.searchall()
			},
			goback() {
				this.$router.back()
			},
			changeSelect(id) {
				this.tabbar = id
			},
			search2() {
				this.searchdata.category = this.selectvalue2.join('$')
				this.searchall()
			},
			search3() {
				if(this.tabbar <= 0) {
					return false
				}
				let $this = this
				if(this.selectvalue3[0] === '全部') {
					this.selectvalue3[0] = ''
				}
				let location = this.selectvalue3[0].indexOf('-')
				this.searchdata.minAge = this.selectvalue3[0].substring(0, location)
				this.searchdata.maxAge = this.selectvalue3[0].substring(location + 1)
				this.searchall()
			}
		},
		created() {
			this.$http.get('/category/findAllArea').then(
				(res) => {
					this.address = res.data.obj
				}
			)
			this.$http.get('/category/findAllCategory').then(
				(res) => {
					this.kemu = res.data.obj
				}
			)
		},
		data() {
			return {
				resultData: '',
				onfocus: {
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat')
				},
				zooms: 14,
				truenull: false,
				maporList: 'map',
				searchdata: {
					keyword: '',
					category: '',
					minAge: '',
					maxAge: '',
					areaId: '',
					dist: '',
					x: localStorage.getItem('lng'),
					y: localStorage.getItem('lat'),
					page: '1',
					rows: '40'
				},
				dian: 0,
				ismap: false,
				titlebar: '',
				old: [],
				maplist: [],
				val: '',
				ismaps: 'mapes',
				tabbar: '0',
				selectvalue2: [],
				selectvalue3: [],
				selectvalue4: [],
				address: [],
				ages: [{
						name: '全部',
						value: '全部'
					},
					{
						name: '0-3',
						value: '0-3'
					},
					{
						name: '4-6',
						value: '4-6'
					},
					{
						name: '7-9',
						value: '7-9'
					},
					{
						name: '10-12',
						value: '10-12'
					}
				],
				kemu: []
			}
		}
	}
</script>
<style lang="less">
	.searchlist {
		height: auto;
		min-height: 100vh;
		overflow: hidden;
		position: relative;
		.map-solo {
			width: 100px;
			position: fixed;
			display: flex;
			bottom: 10px;
			right: 10px;
			z-index: 999;
			div {
				width: 30px;
				height: 30px;
				margin: auto 10px;
				background: #fff;
				padding: 5px;
				box-sizing: border-box;
				img {
					display: block;
					width: 100%;
				}
			}
		}
		.titlebar {
			height: 30px;
			width: 100%;
			position: fixed;
			top: 88px;
			z-index: 999;
			line-height: 30px;
			font-size: 12px;
			background: rgba(0, 0, 0, 0.5);
			text-align: center;
			color: #fff;
			span {
				color: #ff9600;
			}
		}
		.select-box {
			height: 44px;
			width: 100%;
			position: fixed;
			z-index: 998;
			background: #fff;
			.vux-picker {
				position: relative;
				z-index: -1;
			}
			.select-detail {
				position: absolute;
				z-index: 1;
				top: 88px;
				box-sizing: border-box;
				left: 0;
				width: 100%;
				background: rgba(0, 0, 0, 0.5);
				height: 100vh;
				.scroller-item-selected {
					color: #84BEF3;
				}
				ul {
					width: 100%;
					height: auto;
					overflow: hidden;
					max-height: 238px;
					background: #fff;
					li {
						width: 100%;
						height: 44px;
						text-indent: 35px;
						line-height: 44px;
						color: #666;
						font-size: 14px;
					}
				}
			}
			.select-list {
				display: flex;
				position: fixed;
				top: 44px;
				width: 100%;
				background: #fff;
				z-index: 999;
				li {
					flex: 1;
					list-style: none;
					line-height: 44px;
					text-align: center;
					font-size: 14px;
					color: #999;
					background: url(../../static/img/selectdown1.png) no-repeat;
					background-size: 9px auto;
					background-position: 78% 50%;
				}
				.active {
					color: #333333;
					background-image: url(../../static/img/selectdown2.png);
				}
			}
		}
		.search-box {
			width: 100%;
			height: 44px;
			background: #fff;
			overflow: hidden;
			display: flex;
			position: fixed;
			z-index: 999;
			padding-right: 40px;
			.out-img {
				width: 44px;
				height: 44px;
				text-align: center;
				img {
					display: block;
					width: 10px;
					margin: 13px auto;
					height: 18px;
				}
			}
			.input {
				display: flex;
				flex: 1;
				height: 28px;
				margin: 8px 0;
				overflow: hidden;
				background: #f0f2f5;
				border-radius: 3px;
				padding: 0 10px;
				box-sizing: border-box;
				img {
					width: 14px;
					height: 14px;
					margin: 7px 0;
				}
				input {
					background: none;
					flex: 1;
					border: none;
					outline: none;
					text-indent: 3px;
				}
			}
			span {
				width: 40px;
				text-align: center;
				/*line-height: 44px;*/
				font-size: 14px;
				color: #666666;
				position: relative;
				img {
					width: 16px;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			}
		}
	}
</style>