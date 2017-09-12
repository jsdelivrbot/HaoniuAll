<template>
	<div class="add-children">
		<topbar title='修改子女信息'></topbar>
		<group>
			<x-input placeholder='请输入您孩子的姓名' v-model='childrenName'></x-input>
		</group>
		<group class='sm-margin'>
			<popup-picker :show.sync="sexshow" value-text-align='left' :data="sex" v-model="sex1" placeholder="请选择您孩子的性别"></popup-picker>
		</group>
		<group v-if='!dateshow'>
			<datetime :trueHides.sync='dateshow' :default-selected-value="oldAge" value-text-align='left' v-model="age" :placeholder="oldAge" start-date=2000-01-01 :end-date='endDate' title='' format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
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
			},
			oldAge() {
				return this.info.birthday.substr(0, 4) + '-' + this.info.birthday.substr(5, 2) + '-' + this.info.birthday.substr(8, 2)
			},
			oldSex() {
				if(this.info.gender === 0) {
					return ['男']
				} else {
					return ['女']
				}
			}
		},
		data() {
			return {
				info: JSON.parse(localStorage.getItem('childrenInfo'))[this.$route.params.id],
				sexshow: false,
				dateshow: false,
				childrenName: '',
				age: '',
				sex1: [],
				sex: [
					['男', '女']
				]
			}
		},
		mounted() {
			this.childrenName = this.info.name
			this.sex1 = this.oldSex
			this.$nextTick(function() {
				this.age = this.oldAge
			})
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

				this.$http.get('/user/children/updateChildren', {
					params: {
						id: this.info.id,
						name: this.childrenName,
						gender: sex,
						dateString: this.age
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							localStorage.setItem('childrenInfo', JSON.stringify(res.data.obj))
							mui.toast('恭喜您修改成功!')
							this.$router.replace('/childrenlist')
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