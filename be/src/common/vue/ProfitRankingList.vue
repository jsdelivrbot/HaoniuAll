<template>
	<div class="profit-ranking-list-box">
		<ul class="list">
			<div v-for="(item, index) in list" :key="index">
				<li v-if="index === 0">
					<div class="label first"></div>
					<div class="img">
						<img :src="avatarSrc(item.avatar)" />
					</div>
					<div class="name">{{item.nickname}}</div>
					<div class="total">{{item.credit1}}元</div>
				</li>
				<li v-if="index === 1">
					<div class="label second"></div>
					<div class="img">
						<img :src="avatarSrc(item.avatar)" />
					</div>
					<div class="name">{{item.nickname}}</div>
					<div class="total">{{item.credit1}}元</div>
				</li>
				<li v-if="index === 2">
					<div class="label third"></div>
					<div class="img">
						<img :src="avatarSrc(item.avatar)" />
					</div>
					<div class="name">{{item.nickname}}</div>
					<div class="total">{{item.credit1}}元</div>
				</li>
				<li v-if="index > 2">
					<div class="label">{{parseInt(index) + 1}}</div>
					<div class="img">
						<img :src="avatarSrc(item.avatar)" />
					</div>
					<div class="name">{{item.nickname}}</div>
					<div class="total">{{item.credit1}}元</div>
				</li>
			</div>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		},
		methods: {
			avatarSrc(value) {
				if(value.substring(0, 4) === 'http') {
					return value
				}else {
					return this.httpUrl + value
				}
			}
		}
	}
</script>

<style lang="less">
	.profit-ranking-list-box {
		.list {
			li {
				display: flex;
				height: 60px;
				&:nth-child(odd) {
					background-color: white;
				}
				&:nth-child(even) {
					background-color: #f5f7fb;
				}
				.label {
					flex: 0 0 54px;
					width: 54px;
					font-size: 18;
					color: #343434;
					display: flex;
					justify-content: center;
					align-items: center;
					&.first {
						background: url(../../../static/ranking1.png) center no-repeat;
						background-size: 14px 22px;
					}
					&.second {
						background: url(../../../static/ranking2.png) center no-repeat;
						background-size: 14px 22px;
					}
					&.third {
						background: url(../../../static/ranking3.png) center no-repeat;
						background-size: 14px 22px;
					}
				}
				.img {
					flex: 0 0 44px;
					width: 44px;
					display: flex;
					align-items: center;
					img {
						width: 100%;
					}
				}
				.name {
					flex: 1;
					width: 0;
					margin-left: 18px;
					font-size: 14px;
					color: #343434;
					display: flex;
					align-items: center;
				}
				.total {
					flex: 0 0 80px;
					width: 80px;
					font-size: 14px;
					color: #343434;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>