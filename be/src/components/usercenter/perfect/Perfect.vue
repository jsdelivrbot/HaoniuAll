<template>
	<div class="perfect-box">
		<div class="main">
			<v-header title="修改个人资料"></v-header>
			<group>
				<cell title="账号" value="17755164120"></cell>
				<!--<cell title="昵称" value="默默"></cell>-->
				<x-input title="昵称" type="text" v-model="username" style="font-size: 14px;" text-align="right" :show-clear="false"></x-input>
				<!--<datetime title="出生年月" :min-year="1900" :max-year="2017" 
					placeholder="请选择" style="font-size: 14px;" default-selected-value="1995-03-24"
					year-row="{value}年" month-row="{value}月" day-row="{value}日"></datetime>-->
				<cell is-link>
					<span slot="title">
	        			头像
					</span>
					<span slot="value">
						<span class="chooseImg">
							<span>上传头像</span>
					<input type="file" value="test" style="background-color: white;" />
					</span>
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>性别</span> &nbsp;
					<span style="color: #e60012; vertical-align: middle;">*</span>
					</span>
					<span slot="value">
						{{sex}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>年龄区间</span> &nbsp;
					<span style="color: #e60012; vertical-align: middle;">*</span>
					</span>
					<span slot="value">
						{{age}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
        			<span>行业</span> &nbsp;
					<span style="color: #e60012; vertical-align: middle;">*</span>
					</span>
					<span slot="value">
						{{work}}
					</span>
				</cell>
				<cell is-link @click.native="isShow = true">
					<span slot="title">
	        			<span>兴趣爱好</span> &nbsp;
					<span style="color: #e60012; vertical-align: middle;">*</span>
					</span>
					<span slot="value" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; width: 200px;">
						{{hobby}}
					</span>
				</cell>
			</group>
			<p class="detail">完善资料做有身份的人，更能彰显自己的价值！<br/> 资料越全面，商家越愿意给您派发广告！
				<br/> 资料越真实，广告的效果会越好，您的收益才会越高！
			</p>
		</div>
		<div class="footer">
			完成
		</div>
		<transition name="slide">
			<perfect-more @cancelShow="cancelShow" v-show="isShow" @save="save"></perfect-more>
		</transition>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import PerfectMore from '@/components/usercenter/perfect/PerfectMore'
	import { Group, Cell, PopupPicker, Datetime, XInput } from 'vux'
	export default {
		components: {
			'v-header': Header,
			Group,
			Cell,
			PerfectMore,
			PopupPicker,
			Datetime,
			XInput
		},
		methods: {
			cancelShow() {
				this.isShow = false
			},
			save(chosenList) {
				this.isShow = false
				if(!chosenList[0]) {
					this.sex = '请选择'
				} else {
					this.sex = chosenList[0]
				}
				if(!chosenList[1]) {
					this.age = '请选择'
				} else {
					this.age = chosenList[1]
				}
				if(!chosenList[2]) {
					this.work = '请选择'
				} else {
					this.work = chosenList[2]
				}
				if(chosenList[3].length === 0) {
					this.hobby = '请选择'
				} else {
					this.hobby = chosenList[3].join(',')
				}
			}
		},
		data() {
			return {
				isShow: false,
				sex: '请选择',
				age: '请选择',
				work: '请选择',
				hobby: '请选择',
				username: '默默'
			}
		}
	}
</script>

<style lang="less">
	.perfect-box {
		.main {
			min-height: 100vh;
			padding-top: 44px;
			box-sizing: border-box;
			.vux-label {
				font-size: 14px;
				color: #333333;
			}
			.weui-cell__ft {
				font-size: 14px;
				color: #afafaf;
			}
			.detail {
				font-size: 12px;
				color: #8b8b8b;
				text-align: center;
				line-height: 24px;
				margin-top: 24px;
			}
			.weui-label {
				color: #333333;
			}
			/*.weui-cell__bd {
				input {
					color: #afafaf;
				}
			}*/
			.weui-cell {
				.chooseImg {
					span,
					input {
						position: absolute;
						width: 300px;
						height: 20px;
						right: 10px;
						top: -10px;
						display: block;
					}
					input {
						opacity: 0;
					}
				}
			}
		}
		.footer {
			text-align: center;
			height: 32px;
			line-height: 32px;
			margin: -48px 25px 16px;
			background-color: #e60012;
			color: white;
			font-size: 18px;
			border-radius: 6px;
		}
		.slide-enter-active,
		.slide-leave-active {
			transition: all .5s;
		}
		.slide-enter,
		.slide-leave-to {
			transform: translateX(100%);
			/*opacity: 0;*/
		}
	}
</style>