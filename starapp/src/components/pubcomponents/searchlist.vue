<template>
	<div class="searchlist">
		<div class="search-box vux-1px-b">
			<div class="out-img" @click="goback()">
				<img src="../../../static/img/outleft.png" />
			</div>

			<div class="input">
				<img src="../../../static/img/iconsearch.png" />
				<input type="search" v-model="searchdata.keyword" name="" @keydown.enter="searchall()" id="" value="" placeholder="请输入您想要搜索的内容" />
			</div>
			<span v-if="searchdata.type==='map'" @click="changeml('list')">
				<img src="../../../static/img/iconlist.png"/>
			</span>
			<span v-if="searchdata.type!=='map'" @click="changeml('map')">
				<img src="../../../static/img/iconmap.png"/>
			</span>
		</div>

		<div class="select-box">
			<ul class="select-list">
				<li :class="[tabbar==1?'active':'']" @click="changeSelect(1)">
					<span v-if='selectvalue1[0]=="k"'>课程</span>
					<span v-if='selectvalue1[0]=="c"'>机构</span>
				</li>
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
				<picker :data='kecheng' :columns=1 @on-change='search()' v-model='selectvalue1' style='background: #fff;' v-show='tabbar==1'></picker>
				<picker :data='kemu' ref="picker1" :columns=3 v-model='selectvalue2' style='background: #fff;' v-show='tabbar==2'></picker>
				<picker :data='ages' :columns=1 @on-change='search3()' v-model='selectvalue3' style='background: #fff;' v-show='tabbar==3'></picker>
				<picker :data='address' :columns=3 v-model='selectvalue4' style='background: #fff;' v-show='tabbar==4'></picker>
				<div style="text-align: center;">
					<button v-show='tabbar==2' @click="search2()" style="width: 180px;height: 32px;border: none;background: #84BEF3;color: #fff;outline:none;border-radius:3px ;margin: auto;margin-top: 30px;">确定</button>
					<button v-show='tabbar==4' @click="search4()" style="width: 180px;height: 32px;border: none;background: #84BEF3;color: #fff;outline:none;border-radius:3px ;margin: auto;margin-top: 30px;">确定</button>
				</div>

			</div>
		</div>
		<div class="titlebar" v-html="titlebar" v-if='titlebar&&searchdata.type=="map"&&tabbar==0'></div>
		<component @getaddress='getaddress' :zoom='zooms' :focus='onfocus' v-bind:is="ismaps" :center='maplist' v-if='ismaps!==""&&searchdata.type=="map"'></component>
		<courseList v-if='this.searchdata.target==="k"&&searchdata.type!=="map"' style='margin-top: 94px;' :shownull='truenull' :data='list' :iscollect='1'></courseList>
		<jigoulist v-if='this.searchdata.target==="c"&&searchdata.type!=="map"' style='margin-top: 94px;' :shownull='truenull' :list='jigoulist' :iscollect='1'></jigoulist>
	</div>
</template>
<script>
	import courseList from '@/components/course/courselist'
	import jigoulist from '@/components/organization/jigoulist'
	import mapes from '@/components/map/mapes'
	import { Picker, querystring } from 'vux'
	export default {
		components: {
			courseList,
			Picker,
			jigoulist,
			mapes
		},
		beforeRouteEnter(to, from, next) {
			sessionStorage.setItem('searchpath', from.path)
			next()
		},
		beforeRouteLeave(to, from, next) {
			next()
		},
		activated() {
			if(sessionStorage.getItem('searchpath') === '/pub/home' || sessionStorage.getItem('searchpath') === '/vaguesearch') {
				this.dian = 0
				this.ismaps = ''
				this.tabbar = 0
				this.maplist = []
				this.onfocus = ''
				this.zooms = 10
				this.searchdata.dist = ''
				this.searchdata.cat = ''
				this.searchdata.type = 'map'
				this.$vux.loading.show({
					text: '数据加载中...'
				})
				let arr = querystring.parse(this.$route.params.name)
				this.searchdata.cat = arr.cat
				this.searchdata.keyword = arr.keyword

				if(arr.target) {
					this.searchdata.target = arr.target
					this.selectvalue1[0] = arr.target
				}
				this.searchall()
			}
		},
		methods: {
			search() {
				this.onfocus = ''
				this.zooms = 10
				this.searchdata.target = this.selectvalue1[0]
				this.searchall()
			},
			changeml(val) {
				if(this.dian > 0) {
					this.searchdata.dist = '3'
				}
				this.list = []
				this.jigoulist = []
				this.searchdata.type = val
				this.searchall()
				this.dian = 0
			},
			searchall() {
				this.lod()
				this.ismaps = ''
				this.searchdata.style = 0
				let $this = this
				this.truenull = false
				this.$http.get('/search', {
					params: {
						keyword: this.searchdata.keyword,
						target: this.searchdata.target,
						cat: this.searchdata.cat,
						age: this.searchdata.age,
						dist: this.searchdata.dist,
						lng: this.searchdata.lng,
						lat: this.searchdata.lat,
						page: this.searchdata.page,
						rows: this.searchdata.rows,
						style: this.searchdata.style,
						type: this.searchdata.type
					}
				}).then(
					(res) => {
						this.truenull = true
						this.searchdata.rows = 60
						this.$vux.loading.hide()
						this.tabbar = 0
						if(this.searchdata.dist === '3') {
							this.zooms = '14'
						}
						if(this.searchdata.type === 'map') {
							this.old = res.data.obj.result
							this.titlebar = res.data.obj.flag
							this.maplist = []
							for(var i = 0; i < this.old.length; i++) {
								let reu = {}
								reu.lng = this.old[i].coord.split(',')[0]
								reu.lat = this.old[i].coord.split(',')[1]
								reu.opt = this.old[i].opt
								reu.count = this.old[i].count
								this.maplist.push(reu)
							}
							this.ismaps = 'mapes'
						} else {
							if(this.searchdata.target === 'k') {
								this.list = res.data.obj.result
							} else {
								this.jigoulist = res.data.obj.result
							}
						}
						console.log(res.data)
					},
					(err) => {
						console.log(err)
					}
				)
			},
			getaddress(data) {
				let arr = data.split(',')
				this.searchdata.lng = arr[0]
				this.searchdata.lat = arr[1]
				this.searchdata.rows = arr[2]
				this.searchdata.type = 'list'
				this.onfocus = {
					lng: this.searchdata.lng,
					lat: this.searchdata.lat
				}
				this.zooms = 14
				this.searchall()
				this.dian++
			},
			search4() {
				this.onfocus = ''
				this.zooms = 10
				if(this.selectvalue4[0] === '全部') {
					this.searchdata.dist = ''
					this.searchall()
					return false
				}

				if(this.selectvalue4[0] === '附近3公里') {
					this.searchdata.dist = '3'
					this.searchdata.lng = localStorage.getItem('lng')
					this.searchdata.lat = localStorage.getItem('lat')
					this.onfocus = {
						lng: this.searchdata.lng,
						lat: this.searchdata.lat
					}
					this.searchall()
				} else {
					let arr = this.selectvalue4[1].split(',')
					this.searchdata.lng = arr[0]
					this.searchdata.lat = arr[1]
					this.searchdata.dist = '3'
					//					this.searchdata.style = '0'
					this.onfocus = {
						lng: this.searchdata.lng,
						lat: this.searchdata.lat
					}
					this.zooms = 12
					this.searchall()
				}
			},
			goback() {
				this.$router.back()
			},
			changeSelect(id) {
				this.tabbar = id
			},
			lod() {
				this.tabbar = 0
				this.$vux.loading.show({
					text: '数据加载中...'
				})
			},
			search2() {
				this.onfocus = ''
				this.zooms = 10
				if(this.tabbar <= 0) {
					return false
				}
				let $this = this
				let searchtxt = ''
				console.log(this.$refs.picker1.getNameValues().split(' '))
				for(var i = 0; i < this.$refs.picker1.getNameValues().split(' ').length; i++) {
					if(this.$refs.picker1.getNameValues().split(' ')[i] !== '全部') {
						searchtxt += this.$refs.picker1.getNameValues().split(' ')[i] + '$'
					}
				}
				this.searchdata.cat = searchtxt.substring(0, searchtxt.length - 1)
				this.searchall()
			},
			search3() {
				this.onfocus = ''
				this.zooms = 10
				if(this.tabbar <= 0) {
					return false
				}
				let $this = this
				if(this.selectvalue3[0] === '全部') {
					this.selectvalue3[0] = ''
				}
				this.searchdata.age = this.selectvalue3[0]
				this.searchall()
			}
		},
		data() {
			return {
				onfocus: '',
				zooms: 10,
				truenull: false,
				searchdata: {
					keyword: '',
					target: '',
					cat: '',
					age: '',
					dist: '',
					lng: localStorage.getItem('lng'),
					lat: localStorage.getItem('lat'),
					page: '1',
					rows: '40',
					style: '1',
					type: 'map'
				},
				dian: 0,
				ismap: false,
				titlebar: '',
				old: [],
				maplist: [],
				val: '',
				ismaps: '',
				tabbar: '0',
				list: [],
				jigoulist: [],
				selectvalue1: [],
				selectvalue2: [],
				selectvalue3: [],
				selectvalue4: [],
				address: [{
					'name': '全部',
					'value': '全部',
					'parent': '0'
				}, {
					'name': '附近3公里',
					'value': '附近3公里',
					'parent': '0'
				}, {
					'name': '热门商圈',
					'value': '热门商圈',
					'parent': '0'
				}, {
					'name': '浦东新区',
					'value': '浦东新区',
					'parent': '0'
				}, {
					'name': '徐汇区',
					'value': '徐汇区',
					'parent': '0'
				}, {
					'name': '黄浦区',
					'value': '黄浦区',
					'parent': '0'
				}, {
					'name': '静安区',
					'value': '静安区',
					'parent': '0'
				}, {
					'name': '长宁区',
					'value': '长宁区',
					'parent': '0'
				}, {
					'name': '闵行区',
					'value': '闵行区',
					'parent': '0'
				}, {
					'name': '杨浦区',
					'value': '杨浦区',
					'parent': '0'
				}, {
					'name': '普陀区',
					'value': '普陀区',
					'parent': '0'
				}, {
					'name': '虹口区',
					'value': '虹口区',
					'parent': '0'
				}, {
					'name': '宝山区',
					'value': '宝山区',
					'parent': '0'
				}, {
					'name': '闸北区',
					'value': '闸北区',
					'parent': '0'
				}, {
					'name': '松江区',
					'value': '松江区',
					'parent': '0'
				}, {
					'name': '嘉定区',
					'value': '嘉定区',
					'parent': '0'
				}, {
					'name': '青浦区',
					'value': '青浦区',
					'parent': '0'
				}, {
					'name': '奉贤区',
					'value': '奉贤区',
					'parent': '0'
				}, {
					'name': '金山区',
					'value': '金山区',
					'parent': '0'
				}, {
					'name': '崇明区',
					'value': '崇明区',
					'parent': '0'
				}, {
					'name': '全部',
					'value': '全部0',
					'parent': '全部'
				}, {
					'name': '全部',
					'value': '全部1',
					'parent': '附近3公里'
				}, {
					'name': '八佰伴',
					'value': '121.523228,31.233729',
					'parent': '热门商圈'
				}, {
					'name': '陆家嘴',
					'value': '121.508824,31.243637',
					'parent': '热门商圈'
				}, {
					'name': '徐家汇',
					'value': '121.443173,31.200871',
					'parent': '热门商圈'
				}, {
					'name': '人民广场',
					'value': '121.481033,31.238802',
					'parent': '热门商圈'
				}, {
					'name': '上南地区',
					'value': '121.503612,31.182258',
					'parent': '热门商圈'
				}, {
					'name': '淮海路',
					'value': '121.474387,31.226735',
					'parent': '热门商圈'
				}, {
					'name': '静安寺',
					'value': '121.453901,31.229402',
					'parent': '热门商圈'
				}, {
					'name': '世纪公园',
					'value': '121.558566,31.221702',
					'parent': '热门商圈'
				}, {
					'name': '虹桥镇',
					'value': '121.391243,31.182559',
					'parent': '热门商圈'
				}, {
					'name': '莘庄',
					'value': '121.391623,31.116581',
					'parent': '热门商圈'
				}, {
					'name': '虹桥',
					'value': '121.400793,31.183216',
					'parent': '热门商圈'
				}, {
					'name': '张江',
					'value': '121.591849,31.210823',
					'parent': '热门商圈'
				}, {
					'name': '金桥',
					'value': '121.597306,31.259608',
					'parent': '热门商圈'
				}, {
					'name': '南京西路',
					'value': '121.46678,31.236136',
					'parent': '热门商圈'
				}, {
					'name': '五角场/大学区',
					'value': '121.520482,31.307447',
					'parent': '热门商圈'
				}, {
					'name': '长寿路',
					'value': '121.444762,31.246718',
					'parent': '热门商圈'
				}, {
					'name': '南京东路',
					'value': '121.490857,31.243738',
					'parent': '热门商圈'
				}, {
					'name': '七宝',
					'value': '121.356049,31.161393',
					'parent': '热门商圈'
				}, {
					'name': '天山',
					'value': '121.395338,31.220209',
					'parent': '热门商圈'
				}, {
					'name': '全部浦东新区',
					'value': '121.54905,31.228218',
					'parent': '浦东新区'
				}, {
					'name': '八佰伴',
					'value': '121.523228,31.233729',
					'parent': '浦东新区'
				}, {
					'name': '陆家嘴',
					'value': '121.502306,31.24398',
					'parent': '浦东新区'
				}, {
					'name': '上南地区',
					'value': '121.503612,31.182258',
					'parent': '浦东新区'
				}, {
					'name': '世纪公园',
					'value': '121.558566,31.221702',
					'parent': '浦东新区'
				}, {
					'name': '张江',
					'value': '121.591849,31.210823',
					'parent': '浦东新区'
				}, {
					'name': '金桥',
					'value': '121.597306,31.259608',
					'parent': '浦东新区'
				}, {
					'name': '康桥/周浦',
					'value': '121.581323,31.130732',
					'parent': '浦东新区'
				}, {
					'name': '金杨地区',
					'value': '121.579321,31.252986',
					'parent': '浦东新区'
				}, {
					'name': '塘桥',
					'value': '121.525353,31.215407',
					'parent': '浦东新区'
				}, {
					'name': '川沙',
					'value': '121.704499,31.192886',
					'parent': '浦东新区'
				}, {
					'name': '惠南镇',
					'value': '121.762326,31.054277',
					'parent': '浦东新区'
				}, {
					'name': '源深体育中心',
					'value': '121.544231,31.238523',
					'parent': '浦东新区'
				}, {
					'name': '三林地区',
					'value': '121.517292,31.148724',
					'parent': '浦东新区'
				}, {
					'name': '北蔡',
					'value': '121.55915,31.194806',
					'parent': '浦东新区'
				}, {
					'name': '外高桥',
					'value': '121.593068,31.342554',
					'parent': '浦东新区'
				}, {
					'name': '三林镇',
					'value': '121.509258,31.150463',
					'parent': '浦东新区'
				}, {
					'name': '碧云社区',
					'value': '121.587696,31.24486',
					'parent': '浦东新区'
				}, {
					'name': '临沂/南码头',
					'value': '117.989608,34.943019',
					'parent': '浦东新区'
				}, {
					'name': '浦东机场',
					'value': '121.809466,31.156303',
					'parent': '浦东新区'
				}, {
					'name': '高行',
					'value': '121.615447,31.298896',
					'parent': '浦东新区'
				}, {
					'name': '曹路',
					'value': '121.673431,31.284586',
					'parent': '浦东新区'
				}, {
					'name': '临港新城',
					'value': '121.90375,30.891101',
					'parent': '浦东新区'
				}, {
					'name': '东明',
					'value': '121.535765,31.169815',
					'parent': '浦东新区'
				}, {
					'name': '新场',
					'value': '121.655259,31.051489',
					'parent': '浦东新区'
				}, {
					'name': '航头',
					'value': '121.603213,31.033598',
					'parent': '浦东新区'
				}, {
					'name': '泥城',
					'value': '121.834862,30.906353',
					'parent': '浦东新区'
				}, {
					'name': '全部徐汇区',
					'value': '121.444991,31.194616',
					'parent': '徐汇区'
				}, {
					'name': '徐家汇',
					'value': '121.443173,31.200871',
					'parent': '徐汇区'
				}, {
					'name': '音乐学院',
					'value': '121.561638,31.233783',
					'parent': '徐汇区'
				}, {
					'name': '万体馆',
					'value': '121.448524,31.194623',
					'parent': '徐汇区'
				}, {
					'name': '漕河泾/田林',
					'value': '121.43915,31.174214',
					'parent': '徐汇区'
				}, {
					'name': '肇嘉浜路沿线',
					'value': '121.456239,31.205916',
					'parent': '徐汇区'
				}, {
					'name': '复兴西路/丁香花园',
					'value': '121.445055,31.218771',
					'parent': '徐汇区'
				}, {
					'name': '衡山路',
					'value': '121.45316,31.211335',
					'parent': '徐汇区'
				}, {
					'name': '光启城',
					'value': '121.43553,31.189765',
					'parent': '徐汇区'
				}, {
					'name': '龙华',
					'value': '121.459229,31.179259',
					'parent': '徐汇区'
				}, {
					'name': '上海南站',
					'value': '121.436708,31.160405',
					'parent': '徐汇区'
				}, {
					'name': '全部黄浦区',
					'value': '121.492134,31.237358',
					'parent': '黄浦区'
				}, {
					'name': '人民广场',
					'value': '121.481033,31.238802',
					'parent': '黄浦区'
				}, {
					'name': '南京东路',
					'value': '121.490857,31.243738',
					'parent': '黄浦区'
				}, {
					'name': '外滩',
					'value': '121.497842,31.240723',
					'parent': '黄浦区'
				}, {
					'name': '老西门',
					'value': '121.489485,31.224674',
					'parent': '黄浦区'
				}, {
					'name': '董家渡',
					'value': '121.508834,31.219061',
					'parent': '黄浦区'
				}, {
					'name': '城隍庙',
					'value': '121.498344,31.231498',
					'parent': '黄浦区'
				}, {
					'name': '淮海路',
					'value': '121.474387,31.226735',
					'parent': '黄浦区'
				}, {
					'name': '打浦桥',
					'value': '121.475402,31.212073',
					'parent': '黄浦区'
				}, {
					'name': '新天地',
					'value': '121.481813,31.222245',
					'parent': '黄浦区'
				}, {
					'name': '瑞金宾馆区',
					'value': '121.471792,31.219077',
					'parent': '黄浦区'
				}, {
					'name': '淮海路',
					'value': '121.474387,31.226735',
					'parent': '黄浦区'
				}, {
					'name': '全部静安区',
					'value': '121.462238,31.2297',
					'parent': '静安区'
				}, {
					'name': '静安寺',
					'value': '121.45272,31.229517',
					'parent': '静安区'
				}, {
					'name': '南京西路',
					'value': '121.46678,31.236136',
					'parent': '静安区'
				}, {
					'name': '同乐坊',
					'value': '121.450427,31.243555',
					'parent': '静安区'
				}, {
					'name': '曹家渡',
					'value': '121.435375,31.23474',
					'parent': '静安区'
				}, {
					'name': '全部长宁区',
					'value': '121.431193,31.22723',
					'parent': '长宁区'
				}, {
					'name': '中山公园',
					'value': '121.422977,31.224163',
					'parent': '长宁区'
				}, {
					'name': '虹桥',
					'value': '121.400793,31.183216',
					'parent': '长宁区'
				}, {
					'name': '天山',
					'value': '121.383116,31.221733',
					'parent': '长宁区'
				}, {
					'name': '上海影城/新华路',
					'value': '121.436218,31.20863',
					'parent': '长宁区'
				}, {
					'name': '古北',
					'value': '121.400247,31.200283',
					'parent': '长宁区'
				}, {
					'name': '北新泾',
					'value': '121.38064,31.222104',
					'parent': '长宁区'
				}, {
					'name': '动物园/虹桥机场',
					'value': '121.369411,31.199264',
					'parent': '长宁区'
				}, {
					'name': '全部闵行区',
					'value': '121.388649,31.119461',
					'parent': '闵行区'
				}, {
					'name': '虹桥镇',
					'value': '121.391243,31.182559',
					'parent': '闵行区'
				}, {
					'name': '莘庄',
					'value': '121.391623,31.116581',
					'parent': '闵行区'
				}, {
					'name': '七宝',
					'value': '121.356049,31.161393',
					'parent': '闵行区'
				}, {
					'name': '南方商城',
					'value': '121.407621,31.137374',
					'parent': '闵行区'
				}, {
					'name': '龙柏地区',
					'value': '121.37699,31.182886',
					'parent': '闵行区'
				}, {
					'name': '虹梅路',
					'value': '121.414604,31.154596',
					'parent': '闵行区'
				}, {
					'name': '仲盛商业中心',
					'value': '121.395033,31.113261',
					'parent': '闵行区'
				}, {
					'name': '万源城/东兰路',
					'value': '121.400231,31.155546',
					'parent': '闵行区'
				}, {
					'name': '老闵行',
					'value': '121.424433,31.014817',
					'parent': '闵行区'
				}, {
					'name': '莘庄龙之梦',
					'value': '121.384141,31.113957',
					'parent': '闵行区'
				}, {
					'name': '浦江镇',
					'value': '121.512891,31.102197',
					'parent': '闵行区'
				}, {
					'name': '春申地区',
					'value': '121.391399,31.106463',
					'parent': '闵行区'
				}, {
					'name': '华漕',
					'value': '121.335517,31.228426',
					'parent': '闵行区'
				}, {
					'name': '颛桥',
					'value': '121.408435,31.072842',
					'parent': '闵行区'
				}, {
					'name': '好爱广场',
					'value': '121.405816,31.092437',
					'parent': '闵行区'
				}, {
					'name': '吴泾',
					'value': '121.47432,31.049829',
					'parent': '闵行区'
				}, {
					'name': '交大闵行校区',
					'value': '121.442869,31.032031',
					'parent': '闵行区'
				}, {
					'name': '金平路步行街',
					'value': '121.442869,31.032031',
					'parent': '闵行区'
				}, {
					'name': '北桥',
					'value': '121.41832,31.016612',
					'parent': '闵行区'
				}, {
					'name': '全部杨浦区',
					'value': '121.538702,31.311678',
					'parent': '杨浦区'
				}, {
					'name': '五角场/大学区',
					'value': '121.515919,31.309899',
					'parent': '杨浦区'
				}, {
					'name': '平凉路',
					'value': '121.543416,31.269694',
					'parent': '杨浦区'
				}, {
					'name': '控江地区',
					'value': '121.537153,31.28577',
					'parent': '杨浦区'
				}, {
					'name': '中原地区',
					'value': '121.55033,31.318487',
					'parent': '杨浦区'
				}, {
					'name': '黄兴公园',
					'value': '121.539677,31.301934',
					'parent': '杨浦区'
				}, {
					'name': '鞍山新村',
					'value': '121.516066,31.278923',
					'parent': '杨浦区'
				}, {
					'name': '全部普陀区',
					'value': '121.403597,31.254894',
					'parent': '普陀区'
				}, {
					'name': '长寿路',
					'value': '121.444762,31.246718',
					'parent': '普陀区'
				}, {
					'name': '月星环球港',
					'value': '121.41957,31.240591',
					'parent': '普陀区'
				}, {
					'name': '梅川路',
					'value': '121.388692,31.248888',
					'parent': '普陀区'
				}, {
					'name': '中山北路/甘泉地区',
					'value': '121.448738,31.262973',
					'parent': '普陀区'
				}, {
					'name': '长风公园/华师大',
					'value': '121.402937,31.231012',
					'parent': '普陀区'
				}, {
					'name': '武宁地区',
					'value': '121.429779,31.244407',
					'parent': '普陀区'
				}, {
					'name': '曹阳地区',
					'value': '121.429779,31.244407',
					'parent': '普陀区'
				}, {
					'name': '真如',
					'value': '121.413834,31.256497',
					'parent': '普陀区'
				}, {
					'name': '曹家渡',
					'value': '121.432544,31.23628',
					'parent': '普陀区'
				}, {
					'name': '桃浦',
					'value': '121.359453,31.29092',
					'parent': '普陀区'
				}, {
					'name': '全部虹口区',
					'value': '121.513406,31.270204',
					'parent': '虹口区'
				}, {
					'name': '虹口足球场',
					'value': '121.485807,31.276632',
					'parent': '虹口区'
				}, {
					'name': '四川北路',
					'value': '121.490774,31.257732',
					'parent': '虹口区'
				}, {
					'name': '临平路/和平公园',
					'value': '121.507604,31.26658',
					'parent': '虹口区'
				}, {
					'name': '北外滩',
					'value': '121.51002,31.256947',
					'parent': '虹口区'
				}, {
					'name': '海宁路/七浦路',
					'value': '121.487912,31.25292',
					'parent': '虹口区'
				}, {
					'name': '凉城/江湾镇',
					'value': '121.491636,31.311153',
					'parent': '虹口区'
				}, {
					'name': '曲阳地区',
					'value': '121.496941,31.282363',
					'parent': '虹口区'
				}, {
					'name': '赤峰路',
					'value': '121.48899,31.287038',
					'parent': '虹口区'
				}, {
					'name': '全部宝山区',
					'value': '121.495008,31.411337',
					'parent': '宝山区'
				}, {
					'name': '庙行/共康',
					'value': '121.445637,31.327534',
					'parent': '宝山区'
				}, {
					'name': '大华地区',
					'value': '121.421312,31.281476',
					'parent': '宝山区'
				}, {
					'name': '通河/泗塘',
					'value': '121.453776,31.340118',
					'parent': '宝山区'
				}, {
					'name': '宝山地区',
					'value': '121.429056,31.285673',
					'parent': '宝山区'
				}, {
					'name': '顾村公园',
					'value': '121.384711,31.346641',
					'parent': '宝山区'
				}, {
					'name': '上海大学',
					'value': '121.400532,31.322212',
					'parent': '宝山区'
				}, {
					'name': '淞滨地区',
					'value': '121.499504,31.377799',
					'parent': '宝山区'
				}, {
					'name': '淞南',
					'value': '121.493278,31.344043',
					'parent': '宝山区'
				}, {
					'name': '高境',
					'value': '121.486175,31.325906',
					'parent': '宝山区'
				}, {
					'name': '杨行',
					'value': '121.447846,31.378207',
					'parent': '宝山区'
				}, {
					'name': '美兰湖',
					'value': '121.360042,31.408231',
					'parent': '宝山区'
				}, {
					'name': '月浦',
					'value': '121.432535,31.420489',
					'parent': '宝山区'
				}, {
					'name': '全部闸北区',
					'value': '121.46122,31.277696',
					'parent': '闸北区'
				}, {
					'name': '大宁地区',
					'value': '121.458074,31.281156',
					'parent': '闸北区'
				}, {
					'name': '闸北公园',
					'value': '121.46418,31.27544',
					'parent': '闸北区'
				}, {
					'name': '火车站',
					'value': '121.462056,31.25592',
					'parent': '闸北区'
				}, {
					'name': '彭浦新村',
					'value': '121.455097,31.312943',
					'parent': '闸北区'
				}, {
					'name': '大悦城',
					'value': '121.478723,31.248773',
					'parent': '闸北区'
				}, {
					'name': '西藏北路/中兴路',
					'value': '121.475457,31.259277',
					'parent': '闸北区'
				}, {
					'name': '北区汽车站',
					'value': '121.464982,31.265898',
					'parent': '闸北区'
				}, {
					'name': '市北工业园/汶水路',
					'value': '121.45652,31.299112',
					'parent': '闸北区'
				}, {
					'name': '彭浦镇',
					'value': '121.446701,31.289276',
					'parent': '闸北区'
				}, {
					'name': '全部松江区',
					'value': '121.232272,31.0388',
					'parent': '松江区'
				}, {
					'name': '佘山',
					'value': '121.236257,31.110609',
					'parent': '松江区'
				}, {
					'name': '九亭',
					'value': '121.325378,31.143844',
					'parent': '松江区'
				}, {
					'name': '松江大学城',
					'value': '121.239201,31.060041',
					'parent': '松江区'
				}, {
					'name': '松江镇',
					'value': '121.239535,31.01597',
					'parent': '松江区'
				}, {
					'name': '松江万达',
					'value': '121.248145,31.06433',
					'parent': '松江区'
				}, {
					'name': '开元地中海',
					'value': '121.224529,31.044717',
					'parent': '松江区'
				}, {
					'name': '新桥',
					'value': '121.321933,31.066225',
					'parent': '松江区'
				}, {
					'name': '鹿都国际商业广场',
					'value': '121.241105,31.010445',
					'parent': '松江区'
				}, {
					'name': '中山中路',
					'value': '121.246348,31.01279',
					'parent': '松江区'
				}, {
					'name': '泰晤士小镇',
					'value': '121.204502,31.04013',
					'parent': '松江区'
				}, {
					'name': '新松江路',
					'value': '121.229344,31.045049',
					'parent': '松江区'
				}, {
					'name': '泗泾',
					'value': '121.267259,31.123976',
					'parent': '松江区'
				}, {
					'name': '江学路',
					'value': '121.218523,31.044063',
					'parent': '松江区'
				}, {
					'name': '松东路',
					'value': '121.26157,31.024507',
					'parent': '松江区'
				}, {
					'name': '飞航广场',
					'value': '121.214956,31.016325',
					'parent': '松江区'
				}, {
					'name': '荣乐中路',
					'value': '121.237565,31.022976',
					'parent': '松江区'
				}, {
					'name': '人民北路',
					'value': '121.227383,31.056998',
					'parent': '松江区'
				}, {
					'name': '全部松江区',
					'value': '121.273091,31.380267',
					'parent': '嘉定区'
				}, {
					'name': '嘉定镇',
					'value': '121.253297,31.384775',
					'parent': '嘉定区'
				}, {
					'name': '江桥',
					'value': '121.360904,31.2593',
					'parent': '嘉定区'
				}, {
					'name': '南翔',
					'value': '121.329748,31.303357',
					'parent': '嘉定区'
				}, {
					'name': '安亭',
					'value': '121.168602,31.294335',
					'parent': '嘉定区'
				}, {
					'name': '丰庄',
					'value': '121.362183,31.248367',
					'parent': '嘉定区'
				}, {
					'name': '马陆',
					'value': '121.28343,31.325402',
					'parent': '嘉定区'
				}, {
					'name': '罗宾森广场',
					'value': '121.252365,31.390308',
					'parent': '嘉定区'
				}, {
					'name': '嘉定新城',
					'value': '121.26104,31.335744',
					'parent': '嘉定区'
				}, {
					'name': '新源路',
					'value': '121.157704,31.320948',
					'parent': '嘉定区'
				}, {
					'name': '博乐广场',
					'value': '121.258933,31.390038',
					'parent': '嘉定区'
				}, {
					'name': '黄渡',
					'value': '121.220671,31.275095',
					'parent': '嘉定区'
				}, {
					'name': '戬浜',
					'value': '121.30315,31.383109',
					'parent': '嘉定区'
				}, {
					'name': '外冈',
					'value': '121.181324,31.363825',
					'parent': '嘉定区'
				}, {
					'name': '全部青浦区',
					'value': '121.131087,31.156057',
					'parent': '青浦区'
				}, {
					'name': '青浦城区',
					'value': '121.133473,31.155541',
					'parent': '青浦区'
				}, {
					'name': '朱家角',
					'value': '121.066797,31.115245',
					'parent': '青浦区'
				}, {
					'name': '徐泾',
					'value': '121.280912,31.176573',
					'parent': '青浦区'
				}, {
					'name': '赵巷',
					'value': '121.200052,31.151583',
					'parent': '青浦区'
				}, {
					'name': '新华',
					'value': '121.0385,31.128881',
					'parent': '青浦区'
				}, {
					'name': '重固',
					'value': '121.184629,31.206345',
					'parent': '青浦区'
				}, {
					'name': '全部奉贤区',
					'value': '121.481785,30.923876',
					'parent': '奉贤区'
				}, {
					'name': '南桥',
					'value': '121.486091,30.920955',
					'parent': '奉贤区'
				}, {
					'name': '百联南桥购物中心',
					'value': '121.490488,30.92128',
					'parent': '奉贤区'
				}, {
					'name': '海湾旅游区',
					'value': '121.531677,30.839683',
					'parent': '奉贤区'
				}, {
					'name': '新都汇',
					'value': '121.531677,30.839683',
					'parent': '奉贤区'
				}, {
					'name': '西渡',
					'value': '121.439936,30.996149',
					'parent': '奉贤区'
				}, {
					'name': '环城东路',
					'value': '121.46663,30.959192',
					'parent': '奉贤区'
				}, {
					'name': '易买得',
					'value': '121.472307,30.932572',
					'parent': '奉贤区'
				}, {
					'name': '南桥新城区',
					'value': '121.49396,30.920576',
					'parent': '奉贤区'
				}, {
					'name': '正阳世纪星城',
					'value': '121.484695,30.919995',
					'parent': '奉贤区'
				}, {
					'name': '环城南路',
					'value': '121.472278,30.911537',
					'parent': '奉贤区'
				}, {
					'name': '全部金山区',
					'value': '121.35128,30.748248',
					'parent': '金山区'
				}, {
					'name': '金山卫',
					'value': '121.324193,30.730982',
					'parent': '金山区'
				}, {
					'name': '金山万达',
					'value': '121.342706,30.762205',
					'parent': '金山区'
				}, {
					'name': '朱泾',
					'value': '121.173227,30.904643',
					'parent': '金山区'
				}, {
					'name': '石化',
					'value': '121.345988,30.719643',
					'parent': '金山区'
				}, {
					'name': '蒙山路',
					'value': '121.353563,30.718999',
					'parent': '金山区'
				}, {
					'name': '枫泾',
					'value': '121.029426,30.89853',
					'parent': '金山区'
				}, {
					'name': '卫清路',
					'value': '121.35846,30.73712',
					'parent': '金山区'
				}, {
					'name': '金山新城',
					'value': '121.336675,30.782544',
					'parent': '金山区'
				}, {
					'name': '卫零路',
					'value': '121.345157,30.730547',
					'parent': '金山区'
				}, {
					'name': '金山嘴',
					'value': '121.380141,30.741388',
					'parent': '金山区'
				}, {
					'name': '亭林',
					'value': '121.322702,30.892295',
					'parent': '金山区'
				}, {
					'name': '朱行',
					'value': '121.34818,30.855689',
					'parent': '金山区'
				}, {
					'name': '廊下',
					'value': '121.198797,30.794557',
					'parent': '金山区'
				}, {
					'name': '全部崇明区',
					'value': '121.407046,31.629521',
					'parent': '崇明区'
				}, {
					'name': '建设镇',
					'value': '121.462006,31.660868',
					'parent': '崇明区'
				}, {
					'name': '港西镇',
					'value': '121.422697,31.693426',
					'parent': '崇明区'
				}, {
					'name': '东平镇',
					'value': '121.547564,31.681674',
					'parent': '崇明区'
				}, {
					'name': '新海镇',
					'value': '121.29967,31.823852',
					'parent': '崇明区'
				}, {
					'name': '新村乡',
					'value': '121.339295,31.834528',
					'parent': '崇明区'
				}, {
					'name': '长兴镇',
					'value': '121.70025,31.395694',
					'parent': '崇明区'
				}, {
					'name': '横沙乡',
					'value': '121.848411,31.346217',
					'parent': '崇明区'
				}, {
					'name': '堡镇',
					'value': '121.624896,31.542238',
					'parent': '崇明区'
				}, {
					'name': '新河镇',
					'value': '121.531104,31.587496',
					'parent': '崇明区'
				}, {
					'name': '城桥镇',
					'value': '121.404578,31.633925',
					'parent': '崇明区'
				}, {
					'name': '向化镇',
					'value': '121.730085,31.526272',
					'parent': '崇明区'
				}, {
					'name': '三星镇',
					'value': '121.294288,31.749213',
					'parent': '崇明区'
				}, {
					'name': '庙镇',
					'value': '121.280177,31.729644',
					'parent': '崇明区'
				}, {
					'name': '竖新镇',
					'value': '121.585145,31.570614',
					'parent': '崇明区'
				}, {
					'name': '陈家镇',
					'value': '121.813642,31.505146',
					'parent': '崇明区'
				}, {
					'name': '绿华镇',
					'value': '121.225017,31.76839',
					'parent': '崇明区'
				}, {
					'name': '港沿镇',
					'value': '121.66427,31.595401',
					'parent': '崇明区'
				}],
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
				kecheng: [{
					name: '课程',
					value: 'k'
				}, {
					name: '机构',
					value: 'c'
				}],
				kemu: [{
					'name': '全部',
					'value': '全部',
					'parent': '0'
				}, {
					'name': '教辅',
					'value': '教辅',
					'parent': '0'
				}, {
					'name': '艺术',
					'value': '艺术',
					'parent': '0'
				}, {
					'name': '运动',
					'value': '运动',
					'parent': '0'
				}, {
					'name': '益智',
					'value': '益智',
					'parent': '0'
				}, {
					'name': '综合素质',
					'value': '综合素质',
					'parent': '0'
				}, {
					'name': '其他',
					'value': '其他',
					'parent': '0'
				}, {
					'name': '全部',
					'value': '全部1',
					'parent': '全部'
				}, {
					'name': '全部',
					'value': '全部1',
					'parent': '教辅'
				}, {
					'name': '辅导提升冲刺',
					'value': '辅导提升冲刺1',
					'parent': '教辅'
				}, {
					'name': '托班',
					'value': '托班1',
					'parent': '教辅'
				}, {
					'name': '小语种',
					'value': '小语种1',
					'parent': '教辅'
				}, {
					'name': '教辅其他',
					'value': '教辅其他1',
					'parent': '教辅'
				}, {
					'name': '学科',
					'value': '学科1',
					'parent': '教辅'
				}, {
					'name': '全部',
					'value': '全部2',
					'parent': '艺术'
				}, {
					'name': '表演',
					'value': '表演2',
					'parent': '艺术'
				}, {
					'name': '艺术欣赏与创作',
					'value': '艺术欣赏与创作2',
					'parent': '艺术'
				}, {
					'name': '美术',
					'value': '美术2',
					'parent': '艺术'
				}, {
					'name': '舞蹈',
					'value': '舞蹈2',
					'parent': '艺术'
				}, {
					'name': '器乐',
					'value': '器乐2',
					'parent': '艺术'
				}, {
					'name': '声乐',
					'value': '声乐2',
					'parent': '艺术'
				}, {
					'name': '全部',
					'value': '全部3',
					'parent': '运动'
				}, {
					'name': '健身',
					'value': '健身3',
					'parent': '运动'
				}, {
					'name': '球类',
					'value': '球类3',
					'parent': '运动'
				}, {
					'name': '运动其他',
					'value': '运动其他3',
					'parent': '运动'
				}, {
					'name': '全部',
					'value': '全部4',
					'parent': '益智'
				}, {
					'name': '科学',
					'value': '科学4',
					'parent': '益智'
				}, {
					'name': '潜能开发',
					'value': '潜能开发4',
					'parent': '益智'
				}, {
					'name': '益智训练',
					'value': '益智训练4',
					'parent': '益智'
				}, {
					'name': '口才训练',
					'value': '口才训练4',
					'parent': '益智'
				}, {
					'name': '全部',
					'value': '全部5',
					'parent': '综合素质'
				}, {
					'name': '儿童早教',
					'value': '儿童早教5',
					'parent': '综合素质'
				}, {
					'name': '亲子活动',
					'value': '亲子活动5',
					'parent': '综合素质'
				}, {
					'name': '生活技能',
					'value': '生活技能5',
					'parent': '综合素质'
				}, {
					'name': '综合其他',
					'value': '综合其他5',
					'parent': '综合素质'
				}, {
					'name': '兴趣拓展',
					'value': '兴趣拓展5',
					'parent': '综合素质'
				}, {
					'name': '学习能力',
					'value': '学习能力5',
					'parent': '综合素质'
				}, {
					'name': '全部',
					'value': '全部6',
					'parent': '其他'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部6'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '幼小衔接班',
					'value': '幼小衔接班abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '学前综合训练',
					'value': '学前综合训练abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '个性化辅导',
					'value': '个性化辅导abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '竞赛班',
					'value': '竞赛班abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '辅导强化班',
					'value': '辅导强化班abc',
					'parent': '辅导提升冲刺1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '托班1'
				}, {
					'name': '晚托班',
					'value': '晚托班abc',
					'parent': '托班1'
				}, {
					'name': '寒暑班',
					'value': '寒暑班abc',
					'parent': '托班1'
				}, {
					'name': '日托班',
					'value': '日托班abc',
					'parent': '托班1'
				}, {
					'name': '暑假班',
					'value': '暑假班abc',
					'parent': '托班1'
				}, {
					'name': '寒假班',
					'value': '寒假班abc',
					'parent': '托班1'
				}, {
					'name': '夏令营',
					'value': '夏令营abc',
					'parent': '托班1'
				}, {
					'name': '全托班',
					'value': '全托班abc',
					'parent': '托班1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '小语种1'
				}, {
					'name': '俄语',
					'value': '俄语abc',
					'parent': '小语种1'
				}, {
					'name': '日语',
					'value': '日语abc',
					'parent': '小语种1'
				}, {
					'name': '西班牙语',
					'value': '西班牙语abc',
					'parent': '小语种1'
				}, {
					'name': '意大利语',
					'value': '意大利语abc',
					'parent': '小语种1'
				}, {
					'name': '法语',
					'value': '法语abc',
					'parent': '小语种1'
				}, {
					'name': '韩语',
					'value': '韩语abc',
					'parent': '小语种1'
				}, {
					'name': '德语',
					'value': '德语abc',
					'parent': '小语种1'
				}, {
					'name': '荷兰语',
					'value': '荷兰语abc',
					'parent': '小语种1'
				}, {
					'name': '上海话',
					'value': '上海话abc',
					'parent': '小语种1'
				}, {
					'name': '语言学习',
					'value': '语言学习abc',
					'parent': '小语种1'
				}, {
					'name': '美语',
					'value': '美语abc',
					'parent': '小语种1'
				}, {
					'name': '汉语',
					'value': '汉语abc',
					'parent': '小语种1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '教辅其他1'
				}, {
					'name': '教辅课程其他',
					'value': '教辅课程其他abc',
					'parent': '教辅其他1'
				}, {
					'name': '特色班',
					'value': '特色班abc',
					'parent': '教辅其他1'
				}, {
					'name': '看图说话',
					'value': '看图说话abc',
					'parent': '教辅其他1'
				}, {
					'name': '绘本阅读',
					'value': '绘本阅读abc',
					'parent': '教辅其他1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '学科1'
				}, {
					'name': '全科',
					'value': '全科abc',
					'parent': '学科1'
				}, {
					'name': '语文',
					'value': '语文abc',
					'parent': '学科1'
				}, {
					'name': '英语',
					'value': '英语abc',
					'parent': '学科1'
				}, {
					'name': '数学',
					'value': '数学abc',
					'parent': '学科1'
				}, {
					'name': '物理',
					'value': '物理abc',
					'parent': '学科1'
				}, {
					'name': '化学',
					'value': '化学abc',
					'parent': '学科1'
				}, {
					'name': '地理',
					'value': '地理abc',
					'parent': '学科1'
				}, {
					'name': '生物',
					'value': '生物abc',
					'parent': '学科1'
				}, {
					'name': '历史',
					'value': '历史abc',
					'parent': '学科1'
				}, {
					'name': '几何',
					'value': '几何abc',
					'parent': '学科1'
				}, {
					'name': '小学课程',
					'value': '小学课程abc',
					'parent': '学科1'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '表演2'
				}, {
					'name': '表演综合',
					'value': '表演综合abc',
					'parent': '表演2'
				}, {
					'name': '主持人',
					'value': '主持人abc',
					'parent': '表演2'
				}, {
					'name': '记者',
					'value': '记者abc',
					'parent': '表演2'
				}, {
					'name': '戏剧表演',
					'value': '戏剧表演abc',
					'parent': '表演2'
				}, {
					'name': '曲艺表演',
					'value': '曲艺表演abc',
					'parent': '表演2'
				}, {
					'name': '歌舞表演',
					'value': '歌舞表演abc',
					'parent': '表演2'
				}, {
					'name': '综艺表演',
					'value': '综艺表演abc',
					'parent': '表演2'
				}, {
					'name': '影视表演',
					'value': '影视表演abc',
					'parent': '表演2'
				}, {
					'name': '表演其他',
					'value': '表演其他abc',
					'parent': '表演2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '影视鉴赏',
					'value': '影视鉴赏abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '摄影',
					'value': '摄影abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '艺术基础',
					'value': '艺术基础abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '艺术综合',
					'value': '艺术综合abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '艺术文学',
					'value': '艺术文学abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '艺术启蒙',
					'value': '艺术启蒙abc',
					'parent': '艺术欣赏与创作2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '美术2'
				}, {
					'name': '绘画',
					'value': '绘画abc',
					'parent': '美术2'
				}, {
					'name': '陶艺',
					'value': '陶艺abc',
					'parent': '美术2'
				}, {
					'name': '工艺美术',
					'value': '工艺美术abc',
					'parent': '美术2'
				}, {
					'name': '书法',
					'value': '书法abc',
					'parent': '美术2'
				}, {
					'name': '美术其他',
					'value': '美术其他abc',
					'parent': '美术2'
				}, {
					'name': '美术综合',
					'value': '美术综合abc',
					'parent': '美术2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '舞蹈2'
				}, {
					'name': '国标舞',
					'value': '国标舞abc',
					'parent': '舞蹈2'
				}, {
					'name': '现代舞',
					'value': '现代舞abc',
					'parent': '舞蹈2'
				}, {
					'name': '少儿舞蹈',
					'value': '少儿舞蹈abc',
					'parent': '舞蹈2'
				}, {
					'name': '民族舞',
					'value': '民族舞abc',
					'parent': '舞蹈2'
				}, {
					'name': '芭蕾',
					'value': '芭蕾abc',
					'parent': '舞蹈2'
				}, {
					'name': '舞蹈其他',
					'value': '舞蹈其他abc',
					'parent': '舞蹈2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '器乐2'
				}, {
					'name': '键盘乐',
					'value': '键盘乐abc',
					'parent': '器乐2'
				}, {
					'name': '管乐',
					'value': '管乐abc',
					'parent': '器乐2'
				}, {
					'name': '弦乐',
					'value': '弦乐abc',
					'parent': '器乐2'
				}, {
					'name': '打击乐',
					'value': '打击乐abc',
					'parent': '器乐2'
				}, {
					'name': '电声乐',
					'value': '电声乐abc',
					'parent': '器乐2'
				}, {
					'name': '弹拨乐器',
					'value': '弹拨乐器abc',
					'parent': '器乐2'
				}, {
					'name': '吹奏乐器',
					'value': '吹奏乐器abc',
					'parent': '器乐2'
				}, {
					'name': '乐器综合',
					'value': '乐器综合abc',
					'parent': '器乐2'
				}, {
					'name': '考级班',
					'value': '考级班abc',
					'parent': '器乐2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '声乐2'
				}, {
					'name': '声乐歌舞',
					'value': '声乐歌舞abc',
					'parent': '声乐2'
				}, {
					'name': '音乐综合',
					'value': '音乐综合abc',
					'parent': '声乐2'
				}, {
					'name': '歌唱',
					'value': '歌唱abc',
					'parent': '声乐2'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部3'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '健身3'
				}, {
					'name': '力量器械',
					'value': '力量器械abc',
					'parent': '健身3'
				}, {
					'name': '有氧运动',
					'value': '有氧运动abc',
					'parent': '健身3'
				}, {
					'name': '武术',
					'value': '武术abc',
					'parent': '健身3'
				}, {
					'name': '户外运动',
					'value': '户外运动abc',
					'parent': '健身3'
				}, {
					'name': '体育训练',
					'value': '体育训练abc',
					'parent': '健身3'
				}, {
					'name': '体操运动',
					'value': '体操运动abc',
					'parent': '健身3'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '球类3'
				}, {
					'name': '高尔夫',
					'value': '高尔夫abc',
					'parent': '球类3'
				}, {
					'name': '篮球',
					'value': '篮球abc',
					'parent': '球类3'
				}, {
					'name': '乒乓球',
					'value': '乒乓球abc',
					'parent': '球类3'
				}, {
					'name': '网球',
					'value': '网球abc',
					'parent': '球类3'
				}, {
					'name': '羽毛球',
					'value': '羽毛球abc',
					'parent': '球类3'
				}, {
					'name': '足球',
					'value': '足球abc',
					'parent': '球类3'
				}, {
					'name': '桌球',
					'value': '桌球abc',
					'parent': '球类3'
				}, {
					'name': '冰球',
					'value': '冰球abc',
					'parent': '球类3'
				}, {
					'name': '毽球',
					'value': '毽球abc',
					'parent': '球类3'
				}, {
					'name': '保龄球',
					'value': '保龄球abc',
					'parent': '球类3'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '运动其他3'
				}, {
					'name': '运动综合',
					'value': '运动综合abc',
					'parent': '运动其他3'
				}, {
					'name': '运动',
					'value': '运动abc',
					'parent': '运动其他3'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部4'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '科学4'
				}, {
					'name': '机器人',
					'value': '机器人abc',
					'parent': '科学4'
				}, {
					'name': '科技',
					'value': '科技abc',
					'parent': '科学4'
				}, {
					'name': '电脑',
					'value': '电脑abc',
					'parent': '科学4'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '潜能开发4'
				}, {
					'name': '蒙氏教育',
					'value': '蒙氏教育abc',
					'parent': '潜能开发4'
				}, {
					'name': '逻辑思维',
					'value': '逻辑思维abc',
					'parent': '潜能开发4'
				}, {
					'name': '五官训练',
					'value': '五官训练abc',
					'parent': '潜能开发4'
				}, {
					'name': '能力拓展',
					'value': '能力拓展abc',
					'parent': '潜能开发4'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '益智训练4'
				}, {
					'name': '益智开发',
					'value': '益智开发abc',
					'parent': '益智训练4'
				}, {
					'name': '棋类',
					'value': '棋类abc',
					'parent': '益智训练4'
				}, {
					'name': '速算',
					'value': '速算abc',
					'parent': '益智训练4'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '口才训练4'
				}, {
					'name': '口语表达',
					'value': '口语表达abc',
					'parent': '口才训练4'
				}, {
					'name': '口才其他',
					'value': '口才其他abc',
					'parent': '口才训练4'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '全部5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '儿童早教5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '亲子活动5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '生活技能5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '综合其他5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '兴趣拓展5'
				}, {
					'name': '全部',
					'value': '全部abc',
					'parent': '学习能力5'
				}]
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
					background: url(../../../static/img/selectdown1.png) no-repeat;
					background-size: 9px auto;
					background-position: 78% 50%;
				}
				.active {
					color: #333333;
					background-image: url(../../../static/img/selectdown2.png);
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
					width: 20px;
					margin: 12px auto;
					height: 20px;
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