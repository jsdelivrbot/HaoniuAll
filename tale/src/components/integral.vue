<template>
	<div class="integral-box">
		<goback title='我的积分' linkname='积分规则' islink='/integralrule'></goback>
		<div class="integral-info">
			<div>
				<p>总积分</p>
				<h2>380</h2>
			</div>
		</div>
		<ul class="integral-record">
			<li v-for='item in list'>
				<h2>
					<span>{{item.description}}</span>
					<em>{{item.credit}}</em>
				</h2>
				<p>
					<span>余额:{{item.oldCredit}}</span>
					<em>{{item.createTime.substr(0,10)}}</em>
				</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import goback from '../components/goback'

	export default {
		components: {
			goback
		},
		data() {
			return {
				lchttp: localStorage.getItem('http'),
				list: []
			}
		},
		created() {
			this.$http.get(this.lchttp + '/app/user/creditList').then(
				(res) => {
					this.list = res.data.obj.result
					console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
	.integral-box {
		min-height: 100vh;
		padding-top: 46px;
		box-sizing: border-box;
	}
	
	.integral-info {
		width: 100%;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-bottom: 0.5px solid #E0E0E0;
		div {
			/*color: #fff;*/
			text-align: center;
			p {
				font-size: 14px;
			}
			h2 {
				font-size: 26px;
			}
		}
	}
	
	.integral-record {
		height: auto;
		overflow: hidden;
		li:before {
			content: '';
			width: 200%;
			height: 1px;
			left: 0;
			bottom: 0;
			position: absolute;
			border-bottom: 1px solid #ededed;
			transform: scale(0.5);
			transform-origin: 0 0;
		}
		li {
			height: 70px;
			padding: 10px;
			box-sizing: border-box;
			background: #fff;
			/*border-bottom: 0.5px solid #ededed;*/
			position: relative;
			h2 {
				font-size: 16px;
				display: flex;
				color: #363636;
				span {
					flex: 1;
				}
			}
			p {
				display: flex;
				color: #363636;
				font-size: 14px;
				span {
					flex: 1;
				}
			}
		}
	}
</style>