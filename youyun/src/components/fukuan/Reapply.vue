<template>
	<div class="reapply_box">
		<v-header title="确认发票信息"></v-header>
		<div class="item">
			<p>发票名称: {{info.tax_name}}</p>
		</div>
		<div class="item">
			<p class="title">价税合计</p>
			<p v-if="info.total_fee">￥ {{NoToChinese(info.total_fee)}}</p>
			<p>(小写){{info.total_fee}}</p>
		</div>
		<div class="item">
			<p class="title">销售方</p>
			<p>名称: {{info.sale_name}}</p>
			<p>纳税人识别号: {{info.sale_taxpayer_no}}</p>
			<p>地址: {{info.sale_address }}</p>
			<p>电话: {{info.sale_tel}}</p>
			<p>开户行: {{info.sale_account_bank}}</p>
			<p>账号: {{info.sale_account_no}}</p>
		</div>
		<div class="item">
			<p class="title">购买方</p>
			<p>名称: {{info.rec_name}}</p>
			<p>纳税人识别号: {{info.rec_taxpayer_no}}</p>
			<p class="input">
				<span>地&nbsp;&nbsp;&nbsp;&nbsp;址:</span>
				<input type="text" v-model="info.address" />
			</p>
			<p class="input">
				<span>电&nbsp;&nbsp;&nbsp;&nbsp;话:</span>
				<input type="number" v-model="info.tel" />
			</p>
			<p class="input">
				<span>开户行:</span>
				<input type="text" v-model="info.account_bank" />
			</p>
			<p class="input">
				<span>账&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
				<input type="number" v-model="info.account_no" />
			</p>
		</div>
		<div class="group">
			<p class="title">备注</p>
			<group>
				<x-textarea :height="89" v-model="info.note"></x-textarea>
			</group>
		</div>
		<div class="btn" @click="complete" v-show="!loading">
			完成修改
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Group, XTextarea, Spinner } from 'vux'
	export default {
		data() {
			return {
				loading: false,
				tax_id: this.$route.params.id,
				info: {},
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			'v-header': Header,
			Spinner,
			Group,
			XTextarea
		},
		created() {
			this.$http.post('personal/html/get/v1/tax_billing_detail/' + this.tax_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.info = res.data.data.tax_billing_detail
					}
				})
		},
		methods: {
			complete() {
				if(this.info.address === '') {
					this.$vux.toast.text('请输入地址')
					return
				}
				if(this.info.tel === '') {
					this.$vux.toast.text('请输入电话')
					return
				}
				if(this.info.account_bank === '') {
					this.$vux.toast.text('请输入开户行')
					return
				}
				if(this.info.account_no === '') {
					this.$vux.toast.text('请输入账号')
					return
				}
				this.loading = true
				this.$http.post('personal/html/put/v1/tax_billing_again?token=' + this.token, {
					data: {
						tax_id: this.tax_id,
						address: this.info.address,
						tel: this.info.tel,
						account_bank: this.info.account_bank,
						account_no: this.info.account_no,
						note: this.info.note
					}
				}).then((res) => {
					console.log(res)
					this.loading = false
					if(res.data.result.reCode === '0') {
						this.$vux.toast.text('修改成功!')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}else {
						this.$vux.toast.text(res.data.result.reInfo)
					}
				})
			},
			NoToChinese(n) {
				var fraction = ['角', '分'];
				var digit = [
					'零', '壹', '贰', '叁', '肆',
					'伍', '陆', '柒', '捌', '玖'
				];
				var unit = [
					['元', '万', '亿'],
					['', '拾', '佰', '仟']
				];
				var head = n < 0 ? '欠' : '';
				n = Math.abs(n);
				var s = '';
				for(var i = 0; i < fraction.length; i++) {
					s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
				}
				s = s || '整';
				n = Math.floor(n);
				for(var i = 0; i < unit[0].length && n > 0; i++) {
					var p = '';
					for(var j = 0; j < unit[1].length && n > 0; j++) {
						p = digit[n % 10] + unit[1][j] + p;
						n = Math.floor(n / 10);
					}
					s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
				}
				return head + s.replace(/(零.)*零元/, '元')
					.replace(/(零.)+/g, '零')
					.replace(/^整$/, '零元整');
			}
		}
	}
</script>

<style lang="less">
	.reapply_box {
		padding-top: 45px;
		.item {
			padding: 10px 15px;
			background-color: white;
			font-size: 13px;
			margin-bottom: 10px;
			line-height: 26px;
			.title {
				font-size: 16px;
			}
			.input {
				line-height: 32px;
				input {
					width: 206px;
					height: 22px;
					border: none;
					border: 1px #DFDFDF solid;
					outline: none;
				}	
			}
		}
		.group {	
			background-color: white;
			padding: 0 15px 25px;
			.title {
				font-size: 14px;
				color: #222222;
				line-height: 42px;
			}
			.weui-cells {
				margin-top: 0;
				&:before {
					border: none;
				}
				.weui-cell {
					padding: 0;
					box-sizing: border-box;
					border: 1px #DFDFDF solid;
					textarea {
						font-size: 13px;
						background-color: #FCFCFC;
					}
				}
			}
		}
		.btn {
			width: 68%;
			height: 36px;
			background-color: #FECE4E;
			margin: 18px auto 35px;
			text-align: center;
			color: white;
			line-height: 36px;
			border-radius: 18px;
			font-size: 16px;
		}
		.disabled {
			background-color: #999999;
		}
	}
</style>