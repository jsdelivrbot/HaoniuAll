<template>
	<div class="flea-market-release-box">
		<v-header title="发布宝贝" map="待卖清单" @edit="goMy"></v-header>
		<div class="choose-img">
			<div class="item choose-btn">
				<p>添加照片</p>
			</div>
		</div>
		<group gutter="10px">
			<x-input placeholder="宝贝标题品牌型号不可少" style="font-size: 14px;"></x-input>
			<x-textarea placeholder="在这里详细描述您的宝贝吧！" style="font-size: 14px;"
				:autosize="true">
			</x-textarea>
			<x-input placeholder="选择宝贝的地址" style="font-size: 14px;">
				<img slot="label" style="padding-right:20px;display:block;" src="../../../static/position.png" width="15" height="20" />
			</x-input>
			<!--<cell title="分类" is-link value="选择分类" style="font-size: 14px;" 
				@click.native="getCategory"></cell>-->
			<popup-picker title="分类" :data="list3" :columns="2" v-model="value4" show-name 
				style="font-size: 14px;" placeholder="选择分类"></popup-picker>
			<cell title="原价" is-link value="￥0" style="font-size: 14px;"></cell>
		</group>
		<div class="btn">发布</div>
		<div class="master" v-show="masterShow">发布成功</div>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { Group, XInput, XTextarea, Cell, PopupPicker } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			XInput,
			XTextarea,
			Cell,
			PopupPicker
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
				}]
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
				for (let i = 0; i < list.length; i++) {
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
				for (let i = 0; i < list.length; i++) {
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
				for (let i = 0; i < list.length; i++) {
					this.list3.push({
						name: list[i].option_name,
						parent: 'farm',
						value: list[i].id
					})
				}
			})
		},
		methods: {
			goMy() {
				this.$router.push('/fleaMarket/my')
			}
		}
	}
</script>

<style lang="less">
	.flea-market-release-box {
		padding: 44px 0 60px;
		.header-box {
			.map {
				padding-right: 16px;
			}
		}
		.choose-img {
			height: 114px;
			display: flex;
			background-color: white;
			align-items: center;
			.item {
				width: 85px;
				height: 85px;
				margin-left: 12px;
			}
			.choose-btn {
				background: url(../../../static/flea-market5.png) center 18px no-repeat;
				background-size: 34px 28px;
				background-color: #f0f0f0;
				p {
					font-size: 12px;
					color: #343434;
					text-align: center;
					padding-top: 54px;
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