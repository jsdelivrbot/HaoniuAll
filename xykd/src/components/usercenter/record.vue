<template>
	<section class="record-box">
		<v-header title='借款记录'></v-header>
		<ul class="record_list">
			<router-link tag='li' :to='/recordDetail/+item.id' v-for="(item,index) in recordList" class="vux-1px-b" :key='index'>
				<div class="info">
					<h3>{{item.money.toFixed(2)}}</h3>
					<p>{{item.applyTime}}</p>
				</div>
				<div class="operation">
					<span v-if='item.orderStatus==0'>
						审批中
					</span>
					<span v-else-if='item.orderStatus==1'>
						待还款
					</span>
					<span v-else-if='item.orderStatus==2'>
						待还款
					</span>
					<span v-else-if='item.orderStatus==3'>
						已结清
					</span>
					<span v-else-if='item.orderStatus==4'>
						已逾期
					</span>
					<span v-else>
						已严重逾期
					</span>
					<i>
						<img src="./img/youla@3x.png"/>
					</i>
				</div>
			</router-link>
		</ul>
	</section>
</template>

<script>
	import Header from '@/components/element/header'
	export default {
		components: {
			'v-header': Header
		},
		data() {
			return {
				recordList: ''
			}
		},
		mounted() {
			this.$http.get('api/order/list').then(
				(res) => {
					this.recordList = res.data.obj
				}
			)
		}
	}
</script>
<style lang="less">
	.record-box {
		padding-top: 60px;
		box-sizing: border-box;
		background: #f7f7f7;
	}
	
	.record_list {
		background: #fff;
		height: auto;
		overflow: hidden;
		li {
			padding: 15px;
			box-sizing: border-box;
			display: flex;
			.info {
				flex: 1;
				h3 {
					line-height: 25px;
					font-size: 16px;
					color: #333;
					font-weight: normal;
				}
				p {
					font-size: 14px;
					line-height: 25px;
					color: #999;
				}
			}
			.operation {
				font-size: 12px;
				line-height: 50px;
				color: #999;
				display: flex;
				i {
					width: 7px;
					margin: 20px 0;
					margin-left: 10px;
					height: 10px;
					line-height: 50px;
					img {
						display: block;
						width: 100%;
					}
				}
			}
		}
	}
</style>