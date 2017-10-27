<template>
	<div class="jigou-detail">
		<topbar title='授课点简介'></topbar>
		<div class="jigou-info">
			<img :src="detailInfo.coverUrl" v-if='detailInfo.coverUrl' />
			<div class="detail_center">
				<h2>{{detailInfo.name}}</h2>
				<p><em>最新授课点:</em>{{detailInfo.distance}}公里</p>
			</div>
		</div>
		<div class="intro-box">
			<div class="title vux-1px-b">
				机构介绍
			</div>
			<p v-html='detailInfo.intro'></p>
		</div>

		<div class="intro-box" style="padding: 0;">
			<div class="title vux-1px-b" style="margin: 0;">
				课程列表
			</div>
			<div v-for='(item,index) in detailInfo.objectSome' class="vux-1px-b">
				<cell is-link :link='"/coursedetail/"+item.id' @click.native='clickshow(index)' :inline-desc='item.name+item.addess'>
				</cell>
			</div>
		</div>

		<div class="intro-box" style="margin-bottom: 10px;">
			<div class="title vux-1px-b">
				教师简介
			</div>
			<p>暂无</p>
		</div>

		<div class="collect">
			<ul>
				<li v-if='detailInfo.watched' @click="collect()">
					加入收藏
				</li>
				<li v-if='!detailInfo.watched' class="actives" @click="nocollect()">
					已收藏
				</li>
			</ul>
		</div>

		<!--<div class="collect" >
				<img src="../../static/img/collect.png" />
			</div>

			<div class="collect" >
				<img src="../../static/img/collect2.png" />
			</div>-->

	</div>
</template>
<script>
	import { Cell, CellBox, Group } from 'vux'
	import topbar from '@/components/callback'

	export default {
		components: {
			topbar,
			Cell,
			CellBox,
			Group
		},
		data() {
			return {
				detailId: '',
				detailInfo: [],
				show: null,
				token: ''
			}
		},
		activated() {
			window.scrollTo(0, 0)
			this.token = sessionStorage.getItem('token')
			this.detailId = this.$route.params.name
			this.$http.get('/user/watch/schoolDetail', {
				params: {
					id: this.detailId,
					longitude: localStorage.getItem('lng'),
					latitude: localStorage.getItem('lat')
				}
			}).then(
				(res) => {
					if(res.data.result === 0) {
						this.detailInfo = res.data.obj
					}
					console.log(res.data.obj)
				}
			)
		},
		methods: {
			clickshow(index) {
				if(this.show === index) {
					this.show = null
				} else {
					this.show = index
				}
			},
			collect() {
				let $this = this
				console.log(this.token)
				if(this.token === null) {
					this.$vux.alert.show({
						title: '提示',
						content: '您还没有登录,请登录!',
						onHide() {
							$this.$router.replace('/login')
						}
					})
					return false
				}
				this.$http.get('/user/watch/watchSchool', {
					params: {
						schoolId: $this.detailId
					}
				}).then(
					(res) => {
						if(res.data.result === 0) {
							$this.$vux.toast.text('收藏成功!', 'center')
							$this.detailInfo.watched = false
						}
						console.log(res.data)
					}
				)
			},
			nocollect() {
				let $this = this
				console.log(this.token)
				if(this.token === null) {
					this.$vux.alert.show({
						title: '提示',
						content: '您还没有登录,请登录!',
						onHide() {
							$this.$router.replace('/login')
						}
					})
					return false
				}

				this.$vux.confirm.show({
					title: '提示',
					content: '确定取消收藏吗?',
					onConfirm() {
						$this.$http.get('/user/watch/disWatchSchool', {
							params: {
								schoolId: $this.detailId
							}
						}).then(
							(res) => {
								$this.detailInfo.watched = true
								console.log(res.data)
							}
						)
					},
					onCancel() {
						console.log('plugin confirm')
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.jigou-detail {
		padding-top: 44px;
		box-sizing: border-box;
		.skd {
			padding-top: 6px;
			padding-bottom: 6px;
			font-size: 14px;
			line-height: 20px;
		}
		.vux-cell-primary {
			padding-right: 15px !important;
			box-sizing: border-box !important;
		}
		.collect {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #84BEF3;
			height: 45px;
			color: #fff;
			text-align: center;
			line-height: 44px;
			.actives {
				background: #d2d2d2;
			}
		}
		.inside {
			display: block;
			padding: 0 15px;
			box-sizing: border-box;
			li {
				list-style: none;
				line-height: 35px;
				font-size: 13px;
				height: 35px;
				a {
					display: block;
					color: #999;
				}
			}
		}
		.jigou-info {
			display: flex;
			padding: 15px;
			box-sizing: border-box;
			background: #fff;
			height: 112px;
			img {
				width: 120px;
				height: 80px;
				margin-right: 10px;
			}
			.detail_center {
				flex: 1;
				overflow: hidden;
				h2 {
					font-size: 17px;
					color: #333;
					font-weight: normal;
					line-height: 30px;
					height: 30px;
					margin-bottom: 7px;
					margin-bottom: 28px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p {
					font-size: 13px;
					line-height: 13px;
					color: #999;
					margin-bottom: 5px;
					em {
						margin-right: 10px;
						font-style: normal;
					}
				}
			}
		}
		.intro-box {
			height: auto;
			overflow: hidden;
			background: #fff;
			padding-bottom: 20px;
			margin-top: 5px;
			box-sizing: border-box;
			.title {
				height: 44px;
				line-height: 44px;
				font-size: 15px;
				color: #333;
				padding: 0 15px;
				box-sizing: border-box;
				margin-bottom: 10px;
			}
			>p {
				font-size: 14px;
				line-height: 24px;
				color: #666;
				padding: 0 15px;
				box-sizing: border-box;
				min-height: 80px;
			}
		}
	}
	
	.haitao-select {
		height: auto;
		overflow: hidden;
		background: #f2f2f2;
		margin-top: 40px;
		.banner {
			height: auto;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		.sideslip-bar {
			height: auto;
			width: 100%;
			background: #fff;
			ul {
				display: flex;
				width: 100vw;
				height: 100px;
				overflow-x: auto;
				padding-top: 10px;
				li {
					width: 100px;
					height: 100px;
					padding: 0 10px;
					text-align: center;
					float: left;
					img {
						display: block;
						width: 70px;
						margin: auto;
					}
					p {
						line-height: 20px;
						font-size: 14px;
						color: #333333;
					}
				}
			}
		}
		.hot {
			height: auto;
			overflow: hidden;
			margin-top: 10px;
			background: #fff;
			padding: 0 5px;
			box-sizing: border-box;
			.title {
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #ff6f06;
			}
			.hot-list {
				height: auto;
				overflow: hidden;
				li {
					display: inline-block;
					width: 50%;
					height: auto;
					overflow: hidden;
					float: left;
					a {
						display: block;
						text-align: center;
						padding: 8px;
						box-sizing: border-box;
						img {
							display: block;
							margin: auto;
							width: 100%;
							margin-bottom: 5px;
						}
						p {
							line-height: 24px;
							color: #333333;
							text-align: left;
							//                      padding: 0 8px;
							font-size: 14px;
						}
						div {
							line-height: 26px;
							width: 100%;
							span {
								display: inline-block;
								float: left;
								width: 50%;
								font-size: 14px;
								color: #6f6f6f;
								text-align: right;
							}
							span:first-child {
								color: #ff3c3c;
								text-align: left;
							}
						}
					}
				}
			}
		}
	}
	
	.overseas-box {
		height: auto;
		overflow: hidden;
		.nav-bar {
			height: 45px;
			line-height: 45px;
			width: 100vw;
			overflow: auto;
			ul {
				min-width: 200vw;
				width: auto;
				height: 45px;
				li {
					width: 25vw;
					height: 45px;
					display: inline-block;
					float: left;
					text-align: center;
					font-size: 15px;
					a {
						display: block;
						color: #333;
						position: relative;
					}
				}
				.active a {
					color: #ff6d02;
				}
				.active a:before {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 6px;
					margin: auto;
					content: '';
					width: 35%;
					height: 2px;
					border-radius: 1px;
					background: #ff6d02;
				}
			}
		}
		.sort-box {
			height: auto;
			overflow: hidden;
			.sort-title {
				width: 100%;
				height: auto;
				overflow: hidden;
				position: relative;
				img {
					display: block;
					width: 100%;
				}
				div {
					position: absolute;
					z-index: 999;
					width: 70%;
					height: 90px;
					background: rgba(255, 255, 255, 0.77);
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					outline-offset: 5px;
					outline: 2px solid #fff;
					padding: 15px 0;
					box-sizing: border-box;
					span {
						display: block;
						text-align: center;
						color: #000;
						height: 25px;
						line-height: 25px;
					}
				}
			}
			.sort-list {
				height: auto;
				overflow: hidden;
				padding: 20px 0;
				box-sizing: border-box;
				ul li {
					display: inline-block;
					width: 25%;
					height: 30px;
					line-height: 30px;
					float: left;
					text-align: center;
					font-size: 13px;
					a {
						display: block;
						color: #333333;
					}
				}
			}
		}
	}
	
	.shop-nav-box {
		height: auto;
		overflow: hidden;
		.banner {
			width: 100%;
			height: auto;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
			}
		}
		.nav-list {
			height: auto;
			overflow: hidden;
			margin-top: 10px;
			>ul {
				padding: 0 10px;
				box-sizing: border-box;
			}
			>ul .active {
				>div em img {
					transform: rotate(90deg);
				}
			}
			.active>ul {
				display: block;
			}
			>ul li {
				display: block;
				height: auto;
				overflow: hidden;
				box-sizing: border-box;
				>ul {
					display: none;
				}
				>div,
				a {
					height: 50px;
					line-height: 50px;
					display: flex;
					display: -webkit-flex;
					border-bottom: 1px solid #eee;
					>img {
						margin: 5px;
						height: 40px;
						margin-right: 10px;
					}
					span {
						flex: 1;
						-webkit-flex: 1;
						color: #000;
					}
					em {
						width: 15px;
						height: 50px;
						line-height: 50px;
						img {
							vertical-align: middle;
							width: 100%;
							margin: auto;
						}
					}
				}
			}
		}
	}
	
	.success-box {
		height: auto;
		overflow: hidden;
		text-align: center;
		padding-top: 60px;
		img {
			margin: 10px auto;
			width: 95px;
		}
		h2 {
			font-size: 18px;
			color: #323232;
			line-height: 40px;
			letter-spacing: 1px;
			font-weight: 600;
		}
		p {
			color: #888888;
			font-size: 15px;
			line-height: 30px;
		}
		button {
			background: #ff8406;
			border: none;
			color: #fff;
			height: 40px;
			width: 80%;
			font-size: 16px;
			margin-top: 140px;
			border-radius: 5px;
			letter-spacing: 1px;
		}
	}
	
	.about-box {
		height: auto;
		overflow: hidden;
		background: #f2f2f2;
		min-height: 100vh;
		.banner {
			width: 100%;
			height: auto;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
			}
		}
		.introduce-box:before {
			position: absolute;
			content: '';
			left: -50%;
			right: 0;
			bottom: -1px;
			width: 200%;
			height: 1px;
			border-bottom: 1px solid #e0e0e0;
			transform: scale(0.5);
		}
		.introduce-box {
			height: auto;
			position: relative;
			background: #fff;
			>p {
				padding: 8px 15px;
				box-sizing: border-box;
				line-height: 28px;
				font-size: 15px;
				color: #333333;
			}
			.top {
				display: flex;
				display: -webkit-flex;
				padding: 0 15px;
				box-sizing: border-box;
				height: 60px;
				.logo {
					width: 60px;
					height: 60px;
					position: relative;
					top: -10px;
					z-index: 99;
					margin-right: 10px;
					box-shadow: 1px 2px 5px #aaa;
					-webkit-box-shadow: 1px 2px 5px #aaa;
					img {
						width: 100%;
					}
				}
				.name {
					flex: 1;
					-webkit-flex: 1;
					h2 {
						color: #333;
						line-height: 30px;
						font-size: 16px;
					}
					p {
						line-height: 20px;
						font-size: 13px;
						color: #888;
					}
				}
				.href {
					width: 80px;
					text-align: center;
					a {
						margin-top: 15px;
						display: block;
						color: #ff7103;
						height: 30px;
						text-align: center;
						line-height: 30px;
						font-size: 12px;
						border-radius: 5px;
						position: relative;
					}
					a:before {
						position: absolute;
						left: -50.5%;
						top: -51%;
						content: '';
						width: 200%;
						height: 200%;
						border: 1px solid #ff7103;
						border-radius: 10px;
						transform: scale(0.5);
					}
				}
			}
		}
		.comment {
			height: auto;
			overflow: hidden;
			background: #fff;
			//      padding: 0 15px;
			box-sizing: border-box;
			margin-top: 10px;
			.title {
				height: 35px;
				line-height: 35px;
				color: #999999;
				font-size: 14px;
				padding: 0 15px;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
			}
			ul {
				padding-bottom: 60px;
			}
			ul li:before {
				position: absolute;
				left: -50%;
				bottom: 0;
				content: '';
				width: 200%;
				height: 1px;
				border-bottom: 1px solid #dfdfdf;
				transform: scale(0.5);
			}
			ul li {
				height: auto;
				overflow: hidden;
				display: block;
				position: relative;
				padding: 0 15px;
				padding-bottom: 10px;
				box-sizing: border-box;
				.top {
					height: 50px;
					line-height: 50px;
					display: flex;
					display: -webkit-flex;
					img {
						margin: 7px 0;
						width: 36px;
						margin-right: 10px;
						height: 36px;
						border-radius: 50%;
					}
					span {
						flex: 1;
						-webkit-flex: 1;
					}
					em {
						font-size: 14px;
						color: #999999;
					}
				}
				>p {
					height: auto;
					line-height: 22px;
					overflow: hidden;
					font-size: 14px;
					color: #333;
				}
			}
		}
		.from {
			position: fixed;
			bottom: 0;
			height: 50px;
			width: 100%;
			background: #fff;
			padding: 7px;
			box-sizing: border-box;
			input {
				width: 70%;
				height: 34px;
				border: 1px solid #eee;
				outline: none;
				text-indent: 4px;
				border-radius: 5px;
			}
			a {
				display: inline-block;
				float: right;
				width: 25%;
				height: 37px;
				line-height: 37px;
				background: #ff8406;
				text-align: center;
				color: #fff;
				border-radius: 5px;
			}
		}
		.from:before {
			position: absolute;
			left: -50%;
			top: -1px;
			content: '';
			width: 200%;
			height: 1px;
			border-bottom: 1px solid #dfdfdf;
			transform: scale(0.5);
		}
	}
	
	.idea {
		height: auto;
		overflow: hidden;
		padding: 0 10px;
		box-sizing: border-box;
		.num {
			display: flex;
			display: -webkit-flex;
			height: 60px;
			line-height: 60px;
			box-sizing: border-box;
			>span {
				flex: 1;
				-webkit-flex: 1;
			}
			div {
				width: 120px;
				display: flex;
				display: -webkit-flex;
				span {
					width: 30px;
					height: 30px;
					margin: 15px 0;
					line-height: 30px;
					background: #ebebeb;
					text-align: center;
				}
				input {
					margin: 15px 0;
					width: 60px;
					flex: 1;
					height: 30px;
					line-height: 30px;
					-webkit-flex: 1;
					text-align: center;
				}
			}
		}
		.input {
			min-height: 50px;
			line-height: 40px;
			background: #f1f1f1;
			padding: 5px;
			box-sizing: border-box;
			display: flex;
			display: -webkit-flex;
			margin-bottom: 10px;
			span {
				margin: 0 10px;
			}
			input {
				background: none;
				outline: none;
			}
			textarea {
				flex: 1;
				height: 80px;
				border: none;
				background: none;
				outline: none;
				padding: 11px;
				box-sizing: border-box;
			}
		}
		button {
			background: #ff8406;
			width: 100%;
			height: 40px;
			border: none;
			margin-top: 40px;
			color: #fff;
			border-radius: 5px;
			font-size: 16px;
			letter-spacing: 1px;
		}
	}
	
	.onfocus {
		height: auto;
		overflow: hidden;
		.input {
			width: 100%;
			height: 40px;
			padding: 7px 10px;
			box-sizing: border-box;
			input {
				width: 100%;
				height: 26px;
				border-radius: 5px;
				background: #ecf0f1;
				font-size: 14px;
				text-indent: 15px;
				outline: none;
			}
		}
		>ul li {
			display: block;
			height: auto;
			overflow: hidden;
			box-sizing: border-box;
			>ul {
				display: block;
			}
			>div,
			a {
				height: 50px;
				line-height: 50px;
				display: flex;
				display: -webkit-flex;
				border-bottom: 1px solid #eee;
				padding: 0px 10px;
				box-sizing: border-box;
				>img {
					margin: 5px;
					height: 40px;
					margin-right: 10px;
					border-radius: 50%;
				}
				span {
					flex: 1;
					-webkit-flex: 1;
					color: #000;
				}
				div {
					width: 15px;
					height: 50px;
					line-height: 50px;
					img {
						vertical-align: middle;
						width: 100%;
						margin: auto;
					}
				}
			}
		}
	}
	
	.share {
		height: auto;
		overflow: hidden;
		text-align: center;
		.banner {
			width: 100%;
			height: auto;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
			}
		}
		h2 {
			margin-top: 70px;
			height: 40px;
			line-height: 40px;
			color: #363636;
			font-size: 18px;
			font-weight: 600;
		}
		p {
			color: #888888;
			line-height: 50px;
			font-size: 14px;
		}
	}
	
	.offer {
		min-height: 100vh;
		height: auto;
		overflow: hidden;
		background: #ecf0f1;
		ul {
			height: auto;
			overflow: hidden;
			padding: 10px;
			box-sizing: border-box;
			li {
				height: 135px;
				background: #fff;
				overflow: hidden;
				padding: 15px;
				padding-bottom: 0;
				box-sizing: border-box;
				margin-bottom: 10px;
				.top {
					height: 80px;
					overflow: hidden;
					border-bottom: 1px solid #eee;
					img {
						width: 80px;
						height: 80px;
						float: left;
						display: block;
						margin-right: 10px;
					}
					div {
						height: 80px;
						display: inline-block;
						.name {
							color: #232326;
							line-height: 30px;
						}
						.moeny {
							color: #666666;
							font-size: 15px;
							height: 25px;
							line-height: 25px;
						}
						.size {
							color: #808080;
							font-size: 13px;
							line-height: 25px;
							height: 25px;
						}
					}
				}
				.bottom {
					height: 40px;
					line-height: 40px;
					text-indent: 90px;
					font-size: 14px;
					color: #333333;
					em {
						color: #ff5b5b;
						margin-right: 10px;
					}
					span {
						color: #808080;
					}
				}
			}
		}
	}
	
	.offer-form {
		min-height: 100vh;
		height: auto;
		overflow: hidden;
		background: #ecf0f1;
		padding: 10px;
		box-sizing: border-box;
		.userinfo {
			background: #fff;
			padding: 10px;
			box-sizing: border-box;
			line-height: 30px;
			position: relative;
			margin-bottom: 10px;
			.phone {
				color: #232326;
			}
			.address {
				color: #666666;
				font-size: 14px;
			}
			.right {
				width: 22px;
				height: 22px;
				position: absolute;
				top: 0;
				right: 10px;
				bottom: 0;
				margin: auto;
				img {
					width: 100%;
				}
			}
		}
		button {
			width: 100%;
			background: #ff8406;
			height: 45px;
			color: #fff;
			font-size: 17px;
			margin-top: 40px;
			border: none;
		}
		.goods-info {
			box-sizing: border-box;
			ul {
				height: auto;
				overflow: hidden;
				li {
					height: auto;
					background: #fff;
					overflow: hidden;
					padding: 15px;
					padding-bottom: 0;
					box-sizing: border-box;
					margin-bottom: 10px;
					.top {
						height: 80px;
						overflow: hidden;
						border-bottom: 1px solid #eee;
						img {
							width: 80px;
							height: 80px;
							float: left;
							display: block;
							margin-right: 10px;
						}
						div {
							height: 80px;
							display: inline-block;
							.name {
								color: #232326;
								line-height: 30px;
							}
							.moeny {
								color: #666666;
								font-size: 15px;
								height: 25px;
								line-height: 25px;
							}
							.size {
								color: #808080;
								font-size: 13px;
								line-height: 25px;
								height: 25px;
							}
						}
					}
					.bottom {
						height: auto;
						font-size: 14px;
						color: #333333;
						p {
							display: flex;
							line-height: 40px;
							color: #232326;
						}
						em {
							flex: 1;
							color: #ff5b5b;
							text-align: right;
						}
						span {
							flex: 1;
						}
						textarea {
							flex: 5;
							height: 80px;
							margin-top: 10px;
							margin-bottom: 10px;
							background: #f3f3f3;
							outline: none;
							border-radius: 5px;
							padding: 3px;
							box-sizing: border-box;
						}
					}
				}
			}
		}
		.total {
			background: #fff;
			line-height: 40px;
			height: 40px;
			text-align: right;
			color: #232326;
			position: relative;
			em {
				color: #ff5b5b;
			}
		}
		.total:before {
			position: absolute;
			content: '';
			width: 200%;
			left: -50%;
			height: 1px;
			border-bottom: 1px solid #eee;
			transform: scale(0.5);
		}
	}
</style>