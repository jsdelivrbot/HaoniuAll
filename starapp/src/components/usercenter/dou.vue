<template>
	<div class="dou">
		<topbar title='我的转换豆'></topbar>
		<div class="total">
			<img src="../../../static/img/doudou.png" />
			<span>{{total.ValidCurrency}}</span>
			<em>转换豆</em>
			<a href="http://wei.test.3721zh.com/">
				前往购物
			</a>
		</div>

		<group>
			<cell title="获取记录" is-link link='/dourecord'></cell>
		</group>
	</div>
</template>
<script>
	import { Cell, Group } from 'vux'
	import topbar from '@/components/callback'
	export default {
		components: {
			topbar,
			Cell,
			Group
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				total: ''
			}
		},
		methods: {
			getall() {
				let $this = this
				setTimeout(function() {
					if(sessionStorage.getItem('token')) {
						$this.$http.get('/user/dou/findDou').then(
							(res) => {
								$this.total = res.data.obj
								console.log(res.data)
							}
						)
					} else {
						$this.getall()
					}
				}, 100)
			}
		},
		mounted() {
			this.getall()
		}
	}
</script>
<style lang="less" scoped="scoped">
	.dou {
		height: auto;
		overflow: hidden;
		padding-top: 56px;
		box-sizing: border-box;
		.total {
			height: 70px;
			padding: 15px;
			box-sizing: border-box;
			display: flex;
			img {
				width: 25px;
				height: 22px;
				margin-top: 9px;
				display: block;
				margin-right: 10px;
			}
			span {
				color: #84BEF3;
				line-height: 40px;
				font-size: 27px;
				font-weight: 600;
				margin-right: 5px;
			}
			em {
				flex: 1;
				font-size: 13px;
				line-height: 40px;
				color: #333;
				text-align: left;
			}
			a {
				display: inline-block;
				width: 75px;
				height: 27px;
				border: 1px solid #84BEF3;
				text-align: center;
				line-height: 27px;
				margin-top: 5px;
				border-radius: 3px;
				font-size: 12px;
				color: #84BEF3;
			}
		}
	}
</style>