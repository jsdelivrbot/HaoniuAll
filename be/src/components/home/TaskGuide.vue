<template>
	<div class="task-guide-box">
		<!--<v-header :title="fullDate"></v-header>-->
		<div class="title">{{fullDate}}</div>
	    <inline-calendar
	    :render-month="renderMonth"
	    hide-header
	    :return-six-rows="false"
	    :render-on-value-change="false"
	    :weeks-list="weekList"></inline-calendar>
	    <div class="detail vux-1px-b">
	    	<p>一键分享赚现金，更多好礼等着你！</p>
	    </div>
	    <p class="guide-title">爱蜂享赚钱宝典</p>
	    <p class="sub-title">要想富先读书，下载爱蜂享赚点零花钱</p>
	    <div class="guide-tab-box vux-1px-tb">
	    	<div class="guide-tab-item vux-1px-r" tag="div" @click="toPerfect">
	    		<div class="guide-content">
	    			<div class="img-content">
	    				<img src="../../../static/usercenter/task-guide1.png" />
	    				<span>完善资料</span>
	    			</div>
	    			<p class="guide-text">只关注自己喜欢的</p>
	    		</div>
	    	</div>
	    	<router-link to="/task" class="guide-tab-item" tag="div" v-if="showAll === '1'">
	    		<div class="guide-content">
	    			<div class="img-content">
	    				<img src="../../../static/usercenter/task-guide2.png" />
	    				<span>多做任务</span>
	    			</div>
	    			<p class="guide-text">积极分享 认真完成 早日成壕</p>
	    		</div>
	    	</router-link>
	    </div>
	    <index-footer></index-footer>
	</div>
</template>

<script>
	import Header from '@/common/vue/Header'
	import { InlineCalendar } from 'vux'
	import IndexFooter from '@/common/vue/IndexFooter'
	export default {
		name: 'TaskGuide',
		components: {
			'v-header': Header,
			InlineCalendar,
			IndexFooter
		},
		data() {
			return {
				weekList: ['日', '一', '二', '三', '四', '五', '六'],
				token: sessionStorage.getItem('token'),
				showAll: sessionStorage.getItem('showAll')
			}
		},
		computed: {
			year() {
				const newDate = new Date()
				const year = newDate.getFullYear()
				return year
			},
			month() {
				const newDate = new Date()
				const year = newDate.getMonth() + 1
				return year
			},
			fullDate() {
				return this.year + '年' + this.month + '月'
			},
			renderMonth() {
				return [this.year, this.month]
			}
		},
		methods: {
			toPerfect() {
				if(this.token) {
					this.$router.push('/usercenter/perfect')
				}else {
					this.$router.push('/login')
				}
			}
		}
	}
</script>

<style lang="less">
	.task-guide-box {
		padding: 44px 0 94px;
		min-height: 100vh;
		background-color: white;
		box-sizing: border-box;
		.header-box {
			box-shadow: none!important;
		}
		.title {
			width: 100%;
			height: 44px;
			background-color: #e70012;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 6;
			color: white;
			font-size: 18px;
		}
		.inline-calendar {
			padding-top: 10px;
			background-color: #e70012;
			table {
				thead {
					tr {
						th {
							font-weight: normal;
							font-size: 14px;
						}
					}
				}
				tr {
					height: 44px;
					color: white;
					.is-disabled {
						color: #f6bcb9;
					}
					td {
						font-size: 14px;
						&.is-today {
							span {
								color: #e70012;
								background-color: white;
								border-radius: 50%;
							}
						}
						&.current {
							span {
								background: none;
							}
						}
						&.is-today.current {
							span {
								background-color: white;
								color: #e70012!important;
							}
						}
					}
				}
			}
		}
		.detail {
			width: 80%;
			height: 44px;
			line-height: 44px;
			font-size: 12px;
			text-align: center;
			margin: 0 auto;
			color: #afafaf;
		}
		.guide-title {
			text-align: center;
			font-size: 14px;
			color: #333333;
			line-height: 30px;
			margin-top: 14px;
		}
		.sub-title {
			text-align: center;
			font-size: 12px;
			color: #afafaf;
			line-height: 30px;
			margin-bottom: 10px;
		}
		.guide-tab-box {
			height: 100px;
			display: flex;
			.guide-tab-item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				.guide-content {
					.img-content {
						display: flex;
						align-items: center;
						img {
							width: 38px;
							height: 38px;
						}
						span {
							font-size: 14px;
							color: #333333;
							margin-left: 10px;
						}
					}
					.guide-text {
						font-size: 12px;
						color: #afafaf;
						margin-top: 10px;
						text-align: center;
					}
				}
			}
		}
	}
</style>