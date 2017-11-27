<template>
	<div class="sure_invoice_box">
		<v-header title="确认发票信息"></v-header>
		<div class="item">
			<p>发票名称: {{info.tax_name}}</p>
		</div>
		<div class="item">
			<p class="title">价税合计</p>
			<p>￥ {{NoToChinese(acount)}}</p>
			<p>(小写){{fixed2(acount)}}</p>
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
				<input type="text" v-model="address" />
			</p>
			<p class="input">
				<span>电&nbsp;&nbsp;&nbsp;&nbsp;话:</span>
				<input type="number" v-model="tel" />
			</p>
			<p class="input">
				<span>开户行:</span>
				<input type="text" v-model="account_bank" />
			</p>
			<p class="input">
				<span>账&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
				<input type="number" v-model="account_no" />
			</p>
		</div>
		<div class="btn" @click="goNext" v-show="!loading">
			下一步
		</div>
		<div class="btn disabled" v-show="loading">
			稍等
			<spinner type="ios-small"></spinner>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	import { Spinner } from 'vux'
	export default {
		data() {
			return {
				loading: false,
				project_id: this.$route.params.id,
				token: sessionStorage.getItem('token'),
				info: {},
				acount: this.$route.params.acount,
				address: '',
				tel: '',
				account_bank: '',
				account_no: '',
				err: ''
			}
		},
		components: {
			'v-header': Header,
			Spinner
		},
		created() {
			let info = sessionStorage.getItem('info')
			if(info) {
				this.info = JSON.parse(info)
				this.address = this.info.address
				this.tel = this.info.tel
				this.account_bank = this.info.account_bank
				this.account_no = this.info.account_no
				return
			}
			this.$http.post('personal/html/get/v1/tax_billing_begin/' + this.project_id + '?token=' + this.token)
				.then((res) => {
					console.log(res)
					if(res.data.result.reCode === '0') {
						this.info = res.data.data
					}else {
						this.err = res.data.result.reInfo
					}
				})
		},
		methods: {
			fixed2(num) {
				num = parseFloat(num)
				return num.toFixed(2)
			},
			goNext() {
				if(this.err) {
					this.$vux.toast.text(this.err)
					return
				}
				if(this.address === '' || this.tel === '' || this.account_bank === '' || this.account_no === '') {
					this.$vux.toast.text('请填写所有选项')
					console.log(this.account_no)
					return
				}
				let pattern = /^[0-9]*$/
				if(!pattern.test(this.tel)) {
					this.$vux.toast.text('请输入正确的电话')
					return
				}
				if(!pattern.test(this.account_no)) {
					this.$vux.toast.text('请输入正确的账号')
					return
				}
				let info1 = {
					address: this.address,
					tel: this.tel,
					account_bank: this.account_bank,
					account_no: this.account_no,
					total_fee: this.acount,
					project_id: this.project_id
				}
				let info0 = JSON.parse(sessionStorage.getItem('info0'))
				let info = Object.assign(this.info, info1, info0)
				sessionStorage.setItem('info', JSON.stringify(info))
//				console.log(this.project_id)
				this.$router.push('/SureInvoice2')
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
	.sure_invoice_box {
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
		.btn {
			width: 68%;
			height: 36px;
			background-color: #63bffe;
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