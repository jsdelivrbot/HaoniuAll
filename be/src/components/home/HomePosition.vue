<template>
	<div class="position-box">
		<div class="top">
			<div class="topbar">
				<div class="title vux-1px-b">
					<div class="back" @click="back">
						<span class="iconfont icon-fanhui"></span>
					</div>
					<div class="choose-btn">
						选择城市
					</div>
				</div>
				<div class="search vux-1px-b">
					<input type="search" placeholder="请输入城市名/拼音查询" v-model="searchtext"/>
					<span @click="goSearch">搜索</span>
				</div>
				<div class="now vux-1px-b">
					<span>您正在看：{{cityNow}}</span>
					<span class="chooseCounties" @click="showCounties">
					{{countiesNow}}
					<span class="iconfont icon-moreunfold" v-show="!countiesShow"></span>
					<span class="iconfont icon-less" v-show="countiesShow"></span>
					</span>
				</div>
			</div>
			<transition name="slide">
				<div class="counties vux-1px-b" v-show="countiesShow">
					<div class="in-counties">
						<span class="vux-1px" v-for="(item, index) in countiesData" :key="index" @click="chooseCounties(item.area_name)">{{item.area_name}}</span>
					</div>
				</div>
			</transition>
			<div class="now vux-1px-b" @click="chooseNowPosition">
				<span>当前城市：{{cityPosition}}</span>
			</div>
		</div>
		<city-list :city="city" @select="selectCity" v-show="cityShow"></city-list>
		<city-search-list :city="searchCity" @select="selectCity" v-show="!cityShow"></city-search-list>
	</div>
</template>

<script>
	import CityList from '@/common/vue/CityList2'
	import CitySearchList from '@/common/vue/CitySearchList'
	import city from '../../../static/js/city.js'
	export default {
		name: 'HomePosition',
		components: {
			CityList,
			CitySearchList
		},
		methods: {
			back() {
				this.$router.back(-1)
			},
			selectCity(item) {
				sessionStorage.setItem('city', item)
				this.citynow = item
				this.countiesnow = ''
				sessionStorage.setItem('counties', '')
			},
			showCounties() {
				if(sessionStorage.getItem('city') === '') {
					this.$vux.alert.show({
						title: '提示',
						content: '请选择城市'
					})
					return
				}
				this.$http.get('getData/index.php?m=home&c=Form&a=getAreas', {
					params: {
						seachdata: {
							'area_name': sessionStorage.getItem('city')
						}
					}
				}).then((res) => {
					console.log(res)
					this.countiesData = res.data.data
				})
				this.countiesShow = !this.countiesShow
			},
			chooseCounties(item) {
				sessionStorage.setItem('counties', item)
				this.countiesnow = item
				this.countiesShow = false
				this.$router.push('/home')
			},
			chooseNowPosition() {
				sessionStorage.setItem('city', this.cityPosition)
				this.citynow = this.cityPosition
				this.countiesnow = ''
				sessionStorage.setItem('counties', '')
			},
			goSearch() {
				this.searchCity = []
				for (let i = 0; i < this.city.length; i++) {
					for(let j = 0; j < this.city[i].content.length; j++) {
						if (this.city[i].content[j].indexOf(this.searchtext) !== -1) {
							this.searchCity.push(this.city[i].content[j])
						}
					}
				}
				if(this.searchCity.length === 0) {
					this.$vux.alert.show({
						title: '提示',
						content: '没有搜索结果'
					})
				}else {
					this.cityShow = false
				}
			}
		},
		data() {
			return {
				city,
				cityPosition: sessionStorage.getItem('cityPosition'),
				countiesShow: false,
				countiesData: [],
				citynow: sessionStorage.getItem('city'),
				countiesnow: sessionStorage.getItem('counties'),
				searchCity: [],
				searchtext: '',
				cityShow: true
			}
		},
		computed: {
			cityNow() {
				if(this.citynow === '') {
					return '全国'
				}
				return this.citynow
			},
			countiesNow() {
				if(this.countiesnow === '') {
					return '选择县区'
				}
				return this.countiesnow
			}
		},
		watch: {
			searchtext() {
				if(this.searchtext === '') {
					this.cityShow = true
				}
			}
		}
	}
</script>

<style lang="less">
	.position-box {
		padding-top: 176px;
		.top {
			width: 100%;
			height: 176px;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2;
			.topbar {
				position: relative;
				z-index: 2;
			}
			.title {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 44px;
				background-color: #f0f0f0;
				position: relative;
				line-height: 44px;
				.back {
					line-height: 44px;
					width: 44px;
					height: 44px;
					text-align: center;
					position: absolute;
					z-index: 2;
					left: 0;
					top: 0;
					font-size: 22px;
					.icon-fanhui {
						font-size: 22px;
						line-height: 44px;
					}
				}
				.choose-btn {
					/*width: 175px;
					height: 32px;
					border: 1px solid #99000d;
					border-radius: 4px;*/
					text-align: center;
					font-size: 16px;
				}
			}
			.search {
				height: 44px;
				background-color: white;
				padding: 0 12px;
				display: flex;
				align-items: center;
				input {
					height: 32px;
					width: 0;
					flex: 1;
					outline: none;
					border: none;
					background: url(../../../static/search.png) 10px center no-repeat;
					background-size: 16px 16px;
					background-color: #e2e2e2;
					text-indent: 2em;
					font-size: 16px;
					border-radius: 4px;
				}
				span {
					font-size: 14px;
					display: block;
					padding: 0 10px;
					text-align: center;
					height: 32px;
					line-height: 32px;
				}
			}
			.now {
				height: 44px;
				line-height: 44px;
				background-color: white;
				padding: 0 12px;
				font-size: 16px;
				span {
					font-size: 16px;
					font-weight: 500;
					color: #333333;
					line-height: 44px;
				}
				.chooseCounties {
					color: #afafaf;
					float: right;
				}
			}
			.counties {
				position: fixed;
				top: 132px;
				left: 0;
				width: 100%;
				z-index: 1;
				background-color: white;
				padding: 10px 0;
				.in-counties {
					span {
						/*width: 80px;*/
						padding: 0 10px;
						height: 40px;
						display: inline-block;
						margin: 6px 0 6px 12px;
						font-size: 16px;
						color: #333333;
						line-height: 40px;
						text-align: center;
					}
				}
			}
			/*.slide*/
			.slide-enter-active,
			.slide-leave-active {
				transition: all .5s;
			}
			.slide-enter,
			.slide-leave-to {
				transform: translateY(-100%);
				/*opacity: 0;*/
			}
		}
	}
</style>