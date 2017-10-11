<template>
	<div class="recharge-withdraw-box">
		<v-header title="充值提现"></v-header>
		<div class="tab">
			<div class="item" :class="{current: listShow === 1}" @click="listShow=1">
				充值记录
			</div>|
			<div class="item" :class="{current: listShow === 2}" @click="listShow=2">
				提现记录
			</div>
		</div>
		<div class="list" v-show="listShow === 1">
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
		</div>
		<div class="list" v-show="listShow === 2">
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
			<div class="item vux-1px-b">
				<p>
					<span>充值时间：2017/10/27</span>
					<span class="label">已到账</span>
				</p>
				<p>
					<span>充值帐号：1222 3333 3444 444</span>
					<span class="label">30000元</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/base/Header'
	export default {
		data() {
			return {
				listShow: 1
			}
		},
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="less">
	.recharge-withdraw-box {
		padding-top: 85px;
		.tab {
			width: 100%;
			height: 40px;
			position: fixed;
			top: 45px;
			left: 0;
			background-color: white;
			display: flex;
			color: #999999;
			line-height: 40px;
			.item {
				width: 0;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #646464;
			}
			.current {
				color: #63bffe;
			}
		}
		.list {
			margin: 10px;
			.item {
				padding: 15px;
				background-color: white;
				p {
					font-size: 14px;
					display: flex;
					justify-content: space-between;
					.label {
						color: #63bffe;
					}
				}
			}
		}
	}
</style>