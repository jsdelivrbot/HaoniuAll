<template>
	<div class="flea-market-edit-box">
		<v-header title="编辑商品" map="待卖清单" @edit="goMy"></v-header>
		<div class="choose-img">
			<div class="item" v-for="(item, index) in imgList" :key="index">
				<img :src="item.link" />
				<span @click="removeImg(index)">
					<x-icon type="ios-close" size="30"></x-icon>
				</span>
			</div>
			<div class="item choose-btn">
				<p>添加照片</p>
				<input type="file" @change="fileChange" ref="imgFile" />
			</div>
		</div>
		<group gutter="10px">
			<x-input placeholder="宝贝标题品牌型号不可少" style="font-size: 14px;" v-model="title"></x-input>
			<x-textarea placeholder="在这里详细描述您的宝贝吧！" style="font-size: 14px;" :autosize="true" v-model="detail">
			</x-textarea>
			<!--<x-input placeholder="选择宝贝的地址" style="font-size: 14px;">
				<img slot="label" style="padding-right:20px;display:block;" src="../../../static/position.png" width="15" height="20" />
			</x-input>-->
			<x-address title="选择地址" v-model="addressValue" :list="addressData" placeholder="请选择宝贝地址" style="font-size: 14px;" @on-hide="test"></x-address>
			<!--<cell title="分类" is-link value="选择分类" style="font-size: 14px;" 
				@click.native="getCategory"></cell>-->
			<popup-picker title="分类" :data="list3" :columns="2" v-model="value4" show-name style="font-size: 14px;" placeholder="选择分类"></popup-picker>
			<!--<cell title="原价" is-link value="￥0" style="font-size: 14px;"></cell>-->
			<x-input title="号码" placeholder="请输入手机号码" style="font-size: 14px;" v-model="phone" text-align="right" type="number"></x-input>
			<x-input title="原价" placeholder="请输入宝贝原价" style="font-size: 14px;" v-model="price" text-align="right"></x-input>
		</group>
		<div class="btn" @click="release">修改</div>
		<div class="master" v-show="masterShow">发布成功</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Group, XInput, XTextarea, Cell, PopupPicker, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name } from 'vux'
	export default {
		name: 'FleaMarketRelease',
		components: {
			'v-header': Header,
			Group,
			XInput,
			XTextarea,
			Cell,
			PopupPicker,
			XAddress
		},
		data() {
			return {
				masterShow: false,
				value4: [],
				list3: [{
					name: '二手物品',
					value: 'second',
					parent: 0
				}, {
					name: '土特产',
					value: 'local',
					parent: 0
				}, {
					name: '农产品',
					value: 'farm',
					parent: 0
				}],
				imgList: [],
				httpUrl: localStorage.getItem('httpUrl'),
				addressValue: [],
				addressData: ChinaAddressV2Data,
				title: '',
				detail: '',
				price: '',
				phone: '',
				info: {}
			}
		},
		created() {
			this.$http.get('getData/index.php?m=home&c=Form&a=optionList', {
				params: {
					seachdata: {
						'type_id': 39,
						'parent_id': 597
					}
				}
			}).then((res) => {
				//				console.log(res)
				let list = res.data.data
				for(let i = 0; i < list.length; i++) {
					this.list3.push({
						name: list[i].option_name,
						parent: 'second',
						value: list[i].id
					})
				}
			})
			this.$http.get('getData/index.php?m=home&c=Form&a=optionList', {
				params: {
					seachdata: {
						'type_id': 40,
						'parent_id': 616
					}
				}
			}).then((res) => {
				//				console.log(res)
				let list = res.data.data
				for(let i = 0; i < list.length; i++) {
					this.list3.push({
						name: list[i].option_name,
						parent: 'local',
						value: list[i].id
					})
				}
			})
			this.$http.get('getData/index.php?m=home&c=Form&a=optionList', {
				params: {
					seachdata: {
						'type_id': 41,
						'parent_id': 635
					}
				}
			}).then((res) => {
				//				console.log(res)
				let list = res.data.data
				for(let i = 0; i < list.length; i++) {
					this.list3.push({
						name: list[i].option_name,
						parent: 'farm',
						value: list[i].id
					})
				}
			})
			this.$http.get('getData/index.php?m=home&c=Form&a=myGoodsList', {
				params: {
					seachdata: {
						id: this.$route.params.id
					}
				}
			}).then((res) => {
				console.log(res)
				this.info = res.data.data[0]
				this.title = this.info.title
				this.phone = this.info.phone
				this.price = this.info.price
				this.detail = res.data.detail[0].content
				this.imgList.push({
					link: this.httpUrl + res.data.data[0].img
				})
				if(res.data.img_data) {
					for(let i = 0; i < res.data.img_data.length; i++) {
						this.imgList.push({
							link: this.httpUrl + res.data.img_data[i].content
						})
					}
				}
			})
		},
		computed: {
			imgArr() {
				let imgs = []
				for(let i = 0; i < this.imgList.length; i++) {
					imgs.push(this.imgList[i].link)
				}
				return imgs
			},
			addressValueText() {
				let addressText = this.getName(this.addressValue)
				let address = addressText.split(' ')
				return address
			}
			//			addressValueText2() {
			//				let addressText = this.getName(this.addressValue[1])
			//				console.log(addressText)
			//				return addressText
			//			},
			//			addressValueText3() {
			//				let addressText = this.getName(this.addressValue[2])
			//				console.log(addressText)
			//				return addressText
			//			}
		},
		beforeRouteLeave(to, from, next) {
			this.$vux.loading.hide()
			next()
		},
		methods: {
			goMy() {
				this.$router.back()
			},
			removeImg(index) {
				this.imgList.splice(index, 1)
			},
			test() {
				console.log(this.addressValue)
				console.log(this.addressValueText)
			},
			fileChange() {
				this.$vux.loading.show({
					text: '正在读取图片'
				})
				const img = this.$refs.imgFile.files[0]
				this.$refs.imgFile.value = ''
				const formData = new FormData()
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				formData.append('file', img)
				this.$http.post('getData/index.php?m=home&c=Form&a=imgUpload', formData, config)
					.then((res) => {
						console.log(res)
						if(res.data.datastatus === 1) {
							this.imgList.push({
								img: res.data.data.img,
								link: this.httpUrl + res.data.data.link
							})
							console.log(this.imgList)
							console.log(this.imgArr)
						} else {
							this.$vux.toast.text(res.data.data.message)
						}
						this.$vux.loading.hide()
					})
			},
			release() {
				if(this.title === '') {
					this.$vux.toast.text('请输入标题')
					return
				}
				if(this.price === '') {
					this.$vux.toast.text('请输入价格')
					return
				}
				if(this.phone.length !== 11) {
					this.$vux.toast.text('手机号码格式有误')
					return
				}
				if(this.imgList.length === 0) {
					this.$vux.toast.text('至少要上传一张图片')
					return
				}
				this.$vux.loading.show({
					text: '正在发布'
				})
				this.$http.get('getData/index.php?m=home&c=Form&a=addMyGoods', {
					params: {
						seachdata: {
							title: this.title,
							subtitle: '',
							price: this.price,
							province: this.addressValueText[0],
							city: this.addressValueText[1],
							county: this.addressValueText[2],
							phone: this.phone.toString(),
							imgs: this.imgArr,
							detail: this.detail,
							id: this.$route.params.id
						}
					}
				}).then((res) => {
					this.$vux.loading.hide()
					console.log(res)
					if(res.data.datastatus === 1) {
						this.$vux.toast.text('修改成功')
						this.$router.back()
					} else {
						this.$vux.toast.text(res.data.message)
					}
				})
			},
			getName(value) {
				return value2name(value, ChinaAddressV2Data)
			}
		}
	}
</script>

<style lang="less">
	.flea-market-edit-box {
		padding: 44px 0 60px;
		.header-box {
			.map {
				padding-right: 16px;
			}
		}
		.choose-img {
			/*height: 114px;*/
			display: flex;
			flex-wrap: wrap;
			background-color: white;
			align-items: center;
			.item {
				width: 85px;
				/*height: 85px;*/
				margin: 16px;
				position: relative;
				img {
					width: 85px;
					/*height: 85px;*/
				}
				span {
					position: absolute;
					right: -15px;
					top: -15px;
					.vux-x-icon {
						fill: #C7C7C7;
					}
				}
			}
			.choose-btn {
				background: url(../../../static/usercenter/flea-market5.png) center 18px no-repeat;
				background-size: 34px 28px;
				background-color: #f0f0f0;
				position: relative;
				height: 85px;
				p {
					font-size: 12px;
					color: #343434;
					text-align: center;
					padding-top: 54px;
				}
				input {
					display: block;
					position: absolute;
					left: 0;
					top: 0;
					width: 85px;
					height: 85px;
					opacity: 0;
				}
			}
		}
		.btn {
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #e60012;
			text-align: center;
			color: white;
			font-size: 16px;
			font-weight: 500;
			position: fixed;
			bottom: 0;
		}
		.master {
			width: 10.15rem;
			height: 5.1rem;
			background-color: rgba(0, 0, 0, 0.4);
			border-radius: 0.2rem;
			position: absolute;
			right: 50%;
			top: 50%;
			transform: translate(50%, -50%);
			text-align: center;
			line-height: 5.1rem;
			color: white;
			font-weight: 500;
		}
		.weui-cell {
			/*height: 30px;*/
		}
	}
</style>