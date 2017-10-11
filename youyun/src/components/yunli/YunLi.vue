<template>
	<div class="yun-li-box">
		<search-header @goSearch="goSearch"></search-header>
		<div class="tab">
			<div class="item" @click="showDistancePicker = true">
				距离
			</div>|
			<div class="item" @click="showLengthPicker = true">
				车长
			</div>|
			<div class="item" @click="cartegoryPicker = true">
				车型
			</div>
		</div>
		<div class="wapper">
			<pull-to :top-load-method="refresh" :bottom-load-method="getData" :bottom-config="{failText: '没有更多信息'}">
				<div class="content">
					<!--<router-link :to="'/FastCreate/' + item.my_driver_id" tag="div" class="item" v-for="(item, index) in listData" :key="index">-->
					<router-link :to="'/FileVehicle/' + item.my_driver_id" tag="div" class="item" v-for="(item, index) in listData" :key="index">
					<!--<div @click="router('/FastCreate/' + item.my_driver_id, '/FileVehicle/' + item.my_driver_id, item.mobile_no, item.my_driver_id, item)" class="item" v-for="(item, index) in listData" :key="index">-->
					<!--<div @click="yunliDeleItem(item.my_driver_id)" class="item" v-for="(item, index) in listData" :key="index">-->
						<div class="first">
							<p>
								{{item.cart_badge_no}}，{{item.realname}}，{{item.mobile_no}}
							</p>
							<img src="../../../static/image/yonghurengzheng@2x.png" v-show="item.service_state === '0'" />
							<img src="../../../static/image/sijirengzheng@2x.png" v-show="item.approve_state === '1'" />
							<img src="../../../static/image/weixinrengzheng@2x.png" v-show="item.band_status === '3'" />
							<img src="../../../static/image/yonghurengzheng2@2x.png" v-show="item.service_state !== '0'" />
							<img src="../../../static/image/sijirengzheng@2x2.png" v-show="item.approve_state !== '1'" />
							<img src="../../../static/image/weixinrengzheng2@2x.png" v-show="item.band_status !== '3'" />
						</div>
						<div class="second">
							<div class="text">
								<p>{{item.cart_type}}，{{item.cart_length}}米,{{item.cart_tonnage}}吨</p>
								<p>定位时间：{{item.last_cur_modified_time}}</p>
							</div>
							<div class="score">
								{{item.score}}分
							</div>
						</div>
						<div class="third">
							当前位置：{{item.cur_position}}
						</div>
					<!--</div>-->
					</router-link>
				</div>
				<load-more :show-loading="showLoading" :tip="tip" background-color="#f1eff2" v-show="listData.length === 0"></load-more>
			</pull-to>
		</div>
		<router-link to="/RegisterVehicle" class="btn">
			注册<br/>车辆
		</router-link>
		<popup-picker :show.sync="showDistancePicker" :data="distanceList" :columns="2" v-model="distanceData" @on-change="change" @on-hide="emptDistance" show-name cancel-text="清除条件">
		</popup-picker>
		<popup-picker :show.sync="showLengthPicker" :data="lengthList" :columns="2" v-model="lengthData" @on-change="change2" show-name cancel-text="清除条件" @on-hide="emptLength">
		</popup-picker>
		<popup-picker :show.sync="cartegoryPicker" :data="cartegoryList" v-model="cartegoryData" @on-change="change3">
		</popup-picker>
		<!--<div class="master" v-show="masterShow">
			<div class="list">
				<router-link to="/FastCreate" tag="p" class="item current">快速建单</router-link>
				<router-link to="" tag="p" class="item">历史轨迹</router-link>
				<router-link to="" tag="p" class="item">定位</router-link>
				<router-link to="/FileVehicle" tag="p" class="item">运力档案</router-link>
				<router-link to="" tag="p" class="item">删除</router-link>
				<x-icon type="ios-close-empty" size="40" @click="closeMaster"></x-icon>
			</div>
		</div>-->
	</div>
</template>

<script>
	import SearchHeader from '@/components/base/SearchHeader'
	//	import PullTo from 'vue-pull-to'
	import PullTo from '@/components/base/PullTo/vue-pull-to'
	import { LoadMore, PopupPicker } from 'vux'

	export default {
		data() {
			return {
				masterShow: false,
				listData: [],
				total_pages: 0,
				current_page: 1,
				token: sessionStorage.getItem('token'),
				tip: '正在加载',
				showLoading: true,
				distanceData: [],
				distanceListBase: [{
					name: '0km',
					value: '0km',
					parent: 0
				}, {
					name: '1km',
					value: '1',
					parent: 0
				}, {
					name: '5km',
					value: '5',
					parent: 0
				}, {
					name: '10km',
					value: '10',
					parent: 0
				}, {
					name: '20km',
					value: '20',
					parent: 0
				}, {
					name: '50km',
					value: '50',
					parent: 0
				}, {
					name: '80km',
					value: '80',
					parent: 0
				}, {
					name: '100km',
					value: '100',
					parent: 0
				}, {
					name: '200km',
					value: '200',
					parent: 0
				}, {
					name: '500km',
					value: '500',
					parent: 0
				}, {
					name: '1000km',
					value: '1000',
					parent: 0
				}, {
					name: '1500km',
					value: '1500',
					parent: 0
				}],
				showDistancePicker: false,
				showLengthPicker: false,
				lengthData: [],
				lengthListBase: [{
						name: '3.3km',
						value: '3.3',
						parent: 0
					},
					{
						name: '3.5km',
						value: '3.5',
						parent: 0
					},
					{
						name: '3.8km',
						value: '3.8',
						parent: 0
					},
					{
						name: '4m',
						value: '4',
						parent: 0
					},
					{
						name: '4.2m',
						value: '4.2',
						parent: 0
					},
					{
						name: '4.3m',
						value: '4.3',
						parent: 0
					},
					{
						name: '4.8m',
						value: '4.8',
						parent: 0
					},
					{
						name: '5m',
						value: '5',
						parent: 0
					},
					{
						name: '5.2m',
						value: '5.2',
						parent: 0
					},
					{
						name: '5.8m',
						value: '5.8',
						parent: 0
					},
					{
						name: '6m',
						value: '6',
						parent: 0
					},
					{
						name: '6.8m',
						value: '6.8',
						parent: 0
					},
					{
						name: '7m',
						value: '7',
						parent: 0
					},
					{
						name: '7.2m',
						value: '7.2',
						parent: 0
					},
					{
						name: '7.4m',
						value: '7.4',
						parent: 0
					},
					{
						name: '7.6m',
						value: '7.6',
						parent: 0
					},
					{
						name: '7.7m',
						value: '7.7',
						parent: 0
					},
					{
						name: '7.8m',
						value: '7.8',
						parent: 0
					},
					{
						name: '8m',
						value: '8',
						parent: 0
					},
					{
						name: '8.2m',
						value: '8.2',
						parent: 0
					},
					{
						name: '8.6m',
						value: '8.6',
						parent: 0
					},
					{
						name: '8.7m',
						value: '8.7',
						parent: 0
					},
					{
						name: '8.8m',
						value: '8.8',
						parent: 0
					},
					{
						name: '9m',
						value: '9',
						parent: 0
					},
					{
						name: '9.2km',
						value: '9.2',
						parent: 0
					},
					{
						name: '9.6km',
						value: '9.6',
						parent: 0
					},
					{
						name: '9.8km',
						value: '9.8',
						parent: 0
					},
					{
						name: '10km',
						value: '10',
						parent: 0
					},
					{
						name: '11km',
						value: '11',
						parent: 0
					},
					{
						name: '12.5km',
						value: '12.5',
						parent: 0
					},
					{
						name: '13km',
						value: '13',
						parent: 0
					},
					{
						name: '13.5km',
						value: '13.5',
						parent: 0
					},
					{
						name: '14km',
						value: '14',
						parent: 0
					},
					{
						name: '14.5km',
						value: '14.5',
						parent: 0
					},
					{
						name: '15km',
						value: '15',
						parent: 0
					},
					{
						name: '15.5km',
						value: '15.5',
						parent: 0
					},
					{
						name: '16km',
						value: '16.5',
						parent: 0
					},
					{
						name: '17km',
						value: '17',
						parent: 0
					},
					{
						name: '17.5km',
						value: '17.5',
						parent: 0
					},
					{
						name: '18km',
						value: '18',
						parent: 0
					},
					{
						name: '19.5km',
						value: '19.5',
						parent: 0
					},
					{
						name: '20km',
						value: '20',
						parent: 0
					},
					{
						name: '20.5km',
						value: '20.5',
						parent: 0
					},
					{
						name: '20.6km',
						value: '20.6',
						parent: 0
					},
					{
						name: '20.8km',
						value: '20.8',
						parent: 0
					},
					{
						name: '21.5km',
						value: '21.5',
						parent: 0
					},
					{
						name: '21.6km',
						value: '21.6',
						parent: 0
					},
					{
						name: '21.8km',
						value: '21.8',
						parent: 0
					},
					{
						name: '22.5km',
						value: '22.5',
						parent: 0
					},
					{
						name: '22.6km',
						value: '22.6',
						parent: 0
					},
					{
						name: '22.8km',
						value: '22.8',
						parent: 0
					},
					{
						name: '30.5km',
						value: '30.5',
						parent: 0
					},
					{
						name: '31.5km',
						value: '31.5',
						parent: 0
					},
					{
						name: '32km',
						value: '32',
						parent: 0
					},
					{
						name: '32.5km',
						value: '32.5',
						parent: 0
					}
				],
				min_distance: '',
				max_distance: '',
				min_cart_length: '',
				max_cart_length: '',
				supplyofgoods: '',
				corps: '',
				condition: '',
				cartegoryPicker: false,
				cartegoryData: [],
				cartegoryList: [
					['不限车型', '普通', '平板', '高低平板', '厢式', '封闭', '开项箱', '罐式', '集装箱', '自卸', '高栏', '轴线板', '满轮车', '框架板', '高低高板', '抽拉板', '簸箕板', '超低板', '高低板高栏', '笼子车', '叶片车'],
					['不限功能', '冷藏车', '危险品', '邮政车', '棉被车', '起重车', '搅拌机', '推土机', '装载机', '挖掘机', '平地机', '压路车', '爬梯车', '随车吊', '汽车吊', '大件车', '罐体专用车', '飞翼车', '尾板车']
				]
			}
		},
		computed: {
			distanceList() {
				let distanceListBase = this.distanceListBase
				let distanceList = []
				for(let i = 0; i < distanceListBase.length; i++) {
					for(let j = 0; j < distanceListBase.length; j++) {
						if(parseInt(distanceListBase[j].value) > parseInt(distanceListBase[i].value)) {
							distanceList.push({
								name: distanceListBase[j].name,
								value: distanceListBase[j].value + 'in',
								parent: distanceListBase[i].value
							})
						}
					}
				}
				//				distanceList.push(distanceListBase)
				distanceList = distanceList.concat(distanceListBase)
				//				console.log(distanceList)
				return distanceList
			},
			lengthList() {
				let lengthListBase = this.lengthListBase
				let lengthList = []
				for(let i = 0; i < lengthListBase.length; i++) {
					for(let j = 0; j < lengthListBase.length; j++) {
						if(parseFloat(lengthListBase[j].value) > parseFloat(lengthListBase[i].value)) {
							lengthList.push({
								name: lengthListBase[j].name,
								value: lengthListBase[j].value + 'in',
								parent: lengthListBase[i].value
							})
						}
					}
				}
				lengthList = lengthList.concat(lengthListBase)
				return lengthList
			}
		},
		components: {
			SearchHeader,
			PullTo,
			LoadMore,
			PopupPicker
		},
		created() {
			this.initData()
		},
		methods: {
			emptDistance(closeType) {
				if(!closeType) {
					this.min_distance = ''
					this.max_distance = ''
					this.initData()
				}
			},
			emptLength(closeType) {
				if(!closeType) {
					this.min_cart_length = ''
					this.max_cart_length = ''
					this.initData()
				}
			},
			goSearch(text) {
				//				console.log(text)
				this.condition = text
				this.initData()
			},
			initData() {
				this.total_pages = 0
				this.current_page = 1
				this.tip = '正在加载'
				this.showLoading = true
				this.listData = []
				this.$http.post('driver/html/post/v1/driver_list?token=' + this.token, {
						data: {
							min_distance: this.min_distance,
							max_distance: this.max_distance,
							min_cart_length: this.min_cart_length,
							max_cart_length: this.max_cart_length,
							supplyofgoods: this.supplyofgoods,
							corps: this.corps,
							condition: this.condition,
							current_page: this.current_page.toString()
						}
					})
					.then((res) => {
						console.log(res.data)
						//请求数据成功
						if(res.data.result.reCode === '0') {
							this.listData = res.data.data.driver_list
							this.total_pages = res.data.data.total_pages
							this.current_page = this.current_page + 1
						}
						//						if(res.data.result.reCode === '0')
						this.tip = '暂无数据'
						this.showLoading = false
					})
			},
			change() {
				console.log(this.distanceData)
				let num = parseInt(this.distanceData[0])
				this.min_distance = num.toString()
				if(this.min_distance === '1500') {
					this.max_distance = ''
				} else {
					let num2 = parseInt(this.distanceData[1])
					this.max_distance = num2.toString()
				}
				this.initData()
			},
			change2() {
				console.log(this.lengthData)
				let num = parseFloat(this.lengthData[0])
				this.min_cart_length = num.toString()
				if(this.min_cart_length === '32.5') {
					this.max_cart_length = ''
				} else {
					let num2 = parseInt(this.lengthData[1])
					this.max_cart_length = num2.toString()
				}
				this.initData()
			},
			change3() {
				this.supplyofgoods = this.cartegoryData[0]
				this.corps = this.cartegoryData[1]
				if(this.supplyofgoods === '不限车型') {
					this.supplyofgoods = ''
				}
				if(this.corps === '不限功能') {
					this.corps = ''
				}
				//				console.log(this.cartegoryData)
				this.initData()
			},
			router(path1, path2, num, id, item) {
				let item2 = JSON.stringify(item)
//				console.log(item)
				window.android.YLSelectDialog(path1, path2, num, id, item2)
				//				window.location.hash = path1
				//				window.myvue._router.push(path1)
				//				this.$router.push(path1)
				//				window.goRoute()
			},
			yunliDeleItem(id) {
				//				this.$http.get('driver/html/get/v1/driver_delete/' + id + '?token=' + this.token)
				//					.then((res) => {
				//						if(res.data.result.reCode === '0') {
				//							this.$vux.toast.text('修改成功')
				//							setTimeout(() => {
				//								this.$router.go(0)
				//							}, 500)
				//						}else {
				//							this.$vux.toast.text(res.data.result.reInfo)
				//						}
				//					})
				window.yunliDeleItem(id)
			},
			//刷新
			refresh(loaded) {
				this.total_pages = 0
				this.current_page = 1
				this.$http.post('driver/html/post/v1/driver_list?token=' + this.token, {
						data: {
							min_distance: this.min_distance,
							max_distance: this.max_distance,
							min_cart_length: this.min_cart_length,
							max_cart_length: this.max_cart_length,
							supplyofgoods: this.supplyofgoods,
							corps: this.corps,
							condition: this.condition,
							current_page: this.current_page.toString()
						}
					})
					.then((res) => {
						console.log(res.data)
						this.listData = []
						//请求数据成功
						if(res.data.result.reCode === '0') {
							this.listData = res.data.data.driver_list
							this.total_pages = res.data.data.total_pages
							this.current_page = this.current_page + 1
						}
						loaded('done')
					})
			},
			//上拉加载数据
			getData(loaded) {
				//判断是否到最后一页
				if(this.current_page > this.total_pages) {
					loaded('fail')
					return false
				}
				this.$http.post('driver/html/post/v1/driver_list?token=' + this.token, {
						data: {
							min_distance: this.min_distance,
							max_distance: this.max_distance,
							min_cart_length: this.min_cart_length,
							max_cart_length: this.max_cart_length,
							supplyofgoods: this.supplyofgoods,
							corps: this.corps,
							condition: this.condition,
							current_page: this.current_page.toString()
						}
					})
					.then((res) => {
						console.log(res.data)
						if(res.data.result.reCode === '0') {
							this.listData = this.listData.concat(res.data.data.driver_list)
							this.current_page = this.current_page + 1
							loaded('done')
						} else {
							loaded('fail')
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.yun-li-box {
		padding-top: 85px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			color: #999999;
			line-height: 40px;
			z-index: 2;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #646464;
			}
		}
		.wapper {
			position: fixed;
			width: 100%;
			left: 0;
			top: 85px;
			bottom: 0;
		}
		.content {
			padding: 0 10px 10px;
			font-size: 14px;
			.item {
				margin-top: 10px;
				background-color: white;
				padding: 15px;
				.first {
					display: flex;
					p {
						width: 0;
						flex: 1;
					}
					img {
						width: 22px;
						height: 20px;
						margin-left: 4px;
					}
				}
				.second {
					display: flex;
					align-items: center;
					.text {
						width: 0;
						flex: 1;
						color: #646464;
					}
					.score {
						font-size: 18px;
					}
				}
				.third {
					color: #646464;
				}
			}
		}
		.btn {
			width: 60px;
			height: 60px;
			background-color: #ffc71a;
			background-size: 66px;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			border-radius: 50%;
			line-height: 20px;
			position: fixed;
			right: 24px;
			bottom: 68px;
			box-shadow: 0 2px 5px #888888;
		}
		.vux-popup-picker-select {
			span {
				display: none;
			}
		}
		.vux-cell-box {
			display: none;
		}
		/*.master {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(40, 40, 40, 0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			.list {
				width: 280px;
				background-color: white;
				border-radius: 10px;
				padding: 30px 0;
				position: relative;
				.item {
					width: 210px;
					height: 30px;
					border-radius: 15px;
					color: #636363;
					border: 1px solid #ebebeb;
					text-align: center;
					line-height: 30px;
					margin: 12px auto;
					font-size: 14px;
				}
				.current {
					background-color: #63bffe;
					color: white;
				}
				svg {
					position: absolute;
					top: 4px;
					right: 4px;
				}
				.vux-x-icon {
					fill: #9b9b9b;
				}
			}
		}*/
	}
</style>