<template>
	<div class="add-children">
		<topbar title='新增子女信息'></topbar>
		<group>
			<x-input placeholder='请输入您孩子的姓名' v-model='childrenName'></x-input>
		</group>
		<group class='sm-margin'>
			<popup-picker :show.sync="sexshow" value-text-align='left' :data="sex" v-model="sex1" placeholder="请选择您孩子的性别"></popup-picker>
		</group>
		<group v-if='!dateshow'>
			<datetime :trueHides.sync='dateshow' value-text-align='left' v-model="age" placeholder="请选择您孩子的出生日期" start-date=2000-01-01 :end-date='endDate' title='' format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
		</group>

		<div class="button" style="margin-top: 30px;" @click="addinfo">
			<button class="btn-login"> 
				提交
			</button>
		</div>
	</div>
</template>
<script>
	import topbar from '@/components/callback'
	import { Cell, Group, XInput, PopupPicker, Datetime, dateFormat } from 'vux'
	export default {
		name: 'nokeep',
		components: {
			Cell,
			Group,
			XInput,
			PopupPicker,
			Datetime,
			topbar
		},
		computed: {
			endDate() {
				return dateFormat(new Date(), 'YYYY-MM-DD')
			}
		},
		data() {
			return {
				childrenName: '',
				sexshow: false,
				dateshow: false,
				age: '',
				sex1: [],
				sex: [
					['男', '女']
				]
			}
		},
		methods: {
			addinfo() {
				let sex = 0
				if(this.childrenName === '') {
					mui.toast('请输入子女姓名!')
					return false
				}
				if(!this.sex1[0]) {
					mui.toast('请选择子女性别!')
					return false
				} else {
					if(this.sex1[0] === '男') {
						sex = 0
					} else {
						sex = 1
					}
				}
				if(this.age === '') {
					mui.toast('请选择子女年龄!')
					return false
				}

				this.$http.get('/user/children/createChildren', {
					params: {
						name: this.childrenName,
						gender: sex,
						dateString: this.age
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							this.childrenName = ''
							this.sex1 = []
							this.age = ''
							let info = []
							if(JSON.parse(localStorage.getItem('childrenInfo'))) {
								info = JSON.parse(localStorage.getItem('childrenInfo'))
							}
							console.log(info)
							info.push(res.data.obj)
							console.log(info)
							localStorage.setItem('childrenInfo', JSON.stringify(info))
							mui.toast('恭喜您添加成功!')
						} else {
							mui.toast(res.data.msg)
						}
					}
				)
			}
		}
	}
</script>
<style lang="less">
	.add-children {
		padding-top: 40px;
		box-sizing: border-box;
		.sm-margin .weui-cells {
			margin-top: 15px;
			label {
				color: #999;
			}
		}
	}
</style>