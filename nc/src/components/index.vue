<template>
	<div class="body">
		<div class="userinfo-box">
			<div class="left">
				<span class="head-img">
					<img src="../../static/img/header.png"/>
				</span>

				<div>
					<h3>{{userInfo.userPhone}}</h3>
					<p>等级:{{userInfo.userType | dengji}}</p>
				</div>
			</div>
			<div class="right">
				<ul>
					<li>
						<a href="javascript:;" @click='_cangkushow'>
							<img src="../../static/img/cangku.png" />
						</a>
					</li>
					<li>
						<router-link to='/fd'>
							<img src="../../static/img/haoyou.png" />
						</router-link>
					</li>
					<li>
						<a href="javascript:;" @click='loginOut'>
							<img src="../../static/img/loginout.png" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<marquee style="display: inline-block;position: absolute; top: 0.240963rem; width: 50%;left: 0;right: 0;  margin: auto;font-size: 1rem;">
			<h4 style="font-size:0.481927rem; line-height: 1.3rem; color: orangered; ">{{gonggao}}</h4>
		</marquee>

		<div class="left-nav">
			<ul>
				<li @click='leftNava'>
					<img src="../../static/img/yxgl@2x.png" />
				</li>
				<li @click='chengzhang'>
					<img src="../../static/img/czgl@2x.png" />
				</li>
				<li @click='jiaoyi'>
					<img src="../../static/img/jyzx@2x.png" />
				</li>
				<li @click='leftNavde'>
					<img src="../../static/img/xgzl@2x.png" />
				</li>
			</ul>
		</div>

		<div class="right-nav">
			<ul>
				<li @click='shuaxin'>
					<img src="../../static/img/sx@2x.png" />
				</li>
				<span>
					<em :class="{rotate:isPlaying} " @click='play()'>
						<img src="../../static/img/music.svg"/>
						<audio loop src="../../static/music.mp3" id="media" autoplay="autoplay" preload=""></audio>
					</em>
				</span>
			</ul>

		</div>

		<div class="cart">
			<span>
				<img  v-if='userInfo.bear>0' src="../../static/img/feifei.png" style="width: 2.6rem !important;" />
			</span>
			<span>
				<img  v-if='userInfo.dog>0' src="../../static/img/hsq@2x.png" style="width: 1rem !important;"/>
			</span>
			<span>
				<img v-if='userInfo.human>0'  src="../../static/img/ren.png" style="width: 2rem !important;" />
			</span>
		</div>

		<div class="cropland-box">
			<ul class="ul-hong">
				<li v-for='item in red'>
					<span class="shu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 1'></span>
					<span class="wu" @click='zhongdi(item.id)' v-if='item.landFlag == 0'></span>
					<span class="shouhu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 2'></span>
				</li>
			</ul>

			<ul class="ul-huang">
				<li v-for='item in yellow'>
					<span class="shu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 1'></span>
					<span class="wu" @click='zhongdi(item.id)' v-if='item.landFlag == 0'></span>
					<span class="shouhu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 2'></span>
				</li>
			</ul>

			<ul class="ul-hei">
				<li v-for='item in black'>
					<span class="shu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 1'></span>
					<span class="wu" @click='zhongdi(item.id)' v-if='item.landFlag == 0'></span>
					<span class="shouhu" @click='shu(item.id,item.landMoney)' v-if='item.landFlag == 2'></span>
				</li>
			</ul>
		</div>

		<div v-transfer-dom>
			<x-dialog v-model="show" class='show-shu'>
				<div class="img-box">
					<group title="增加种子数量">
						<p style="margin: 10px 0; color: #666;">当前土地金额: &nbsp;{{tdje}}</p>
						<x-input placeholder='请输入整数数量' v-model="seeds"></x-input>
					</group>
				</div>
				<flexbox style='width: 7rem; margin: auto;'>
					<flexbox-item>
						<x-button type="primary" mini @click.native='shifei'>施肥</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="primary" mini @click.native='zengzhong'>增种</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="warn" mini @click.native='shouhuo'>收获</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="default" mini @click.native='close'>取消</x-button>
					</flexbox-item>
				</flexbox>
			</x-dialog>
		</div>

		<div v-transfer-dom class='cangkushow'>
			<x-dialog v-model="cangkushow">
				<p>
					<span> <em>总数:</em>{{alllong}}</span>
					<span> <em>静态:</em>{{staticMoney}}</span>
					<span> <em>门卫:</em>{{userInfo.human}}</span>
				</p>
				<p>
					<span> <em>肥料:</em>{{userInfo.fodder}}</span>
					<span> <em>动态:</em>{{dt}}</span>
					<span> <em>哈士奇:</em>{{userInfo.dog}}</span>
				</p>
				<p>
					<span> <em>仓库:</em>{{userInfo.balance}}</span>
					<span> <em>日收益:</em>{{dt + staticMoney}}</span>
					<span> <em>狒狒:</em>{{userInfo.bear}}</span>
				</p>
				<x-button type="primary" mini @click.native='hidecangku'>确定</x-button>
			</x-dialog>
		</div>

		<div v-transfer-dom class='gameguanli'>
			<x-dialog v-model="leftNav1" :hide-on-blur='tt'>
				<ul>
					<li>
						<router-link to='/reg'>
							邀请好友
						</router-link>
					</li>
					<li>
						<router-link to='/tips'>
							游戏公告
						</router-link>
					</li>
					<li>
						<router-link to='/round'>
							幸运转盘
						</router-link>
					</li>
				</ul>
			</x-dialog>
		</div>

		<div v-transfer-dom class='gameguanli'>
			<x-dialog v-model="leftNav2" :hide-on-blur='tt'>
				<ul>
					<li>
						<router-link to="/showlist/openRecord">
							开垦记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/addRecord">
							增种记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/stealListAll">
							偷果记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/GrowRecord">
							生长记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/getRecord">
							收获记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/shitRecord">
							施肥记录
						</router-link>
					</li>
					<li>
						<router-link to="/showlist/jiangRecord">
							奖励记录
						</router-link>
					</li>
				</ul>
			</x-dialog>
		</div>

		<div v-transfer-dom class='gameguanli'>
			<x-dialog v-model="leftNav3" :hide-on-blur='tt'>
				<ul>
					<li>
						<router-link to='/chushou'>
							出售果实
						</router-link>
					</li>
					<li>
						<router-link to='/showlist/findOutSell'>
							出售记录
						</router-link>
					</li>
					<li>
						<router-link to='/showlist/findSell'>
							购买记录
						</router-link>
					</li>
					<li>
						<router-link to='/duihuan'>
							兑换果实
						</router-link>
					</li>
					<li>
						<router-link to='/showlist/getChangeList'>
							兑换记录
						</router-link>
					</li>
					<li>
						<router-link to='/kb'>
							游戏商城
						</router-link>
					</li>
				</ul>
			</x-dialog>
		</div>

		<div v-transfer-dom class='gameguanli'>
			<x-dialog v-model="leftNav4" :hide-on-blur='tt'>
				<ul>
					<li>
						<router-link to='/userinfo'>
							个人资料
						</router-link>
					</li>
					<li>
						<router-link to='/change'>
							密码修改
						</router-link>
					</li>
					<li>
						<router-link to='/mibao'>
							密保设置
						</router-link>
					</li>
				</ul>
			</x-dialog>
		</div>

		<div v-transfer-dom class="chenbowen">
			<confirm v-model="show1" title="是否种植?" @on-confirm='truezd'>
			</confirm>
		</div>

		<div v-transfer-dom class="chenbowen">
			<confirm v-model="outLogin" title="是否退出?" @on-confirm="onConfirmOut">
			</confirm>
		</div>

	</div>
</template>
<script>
	import { Confirm, XInput, Group, Flexbox, FlexboxItem, XButton, XDialog, TransferDomDirective as TransferDom } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XDialog,
			XButton,
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			Confirm
		},
		computed: {
			alllong() {
				let all = this.totalsee + this.userInfo.fodder + this.userInfo.balance
				all = all * 1
				let c = all.toFixed(1)
				return c
			}
		},
		data() {
			return {
				enhttp: localStorage.getItem('htppurl'),
				tt: true,
				show: false,
				show1: false,
				id: '',
				outLogin: false,
				userInfo: [],
				black: [],
				yellow: [],
				red: [],
				cangkushow: false,
				leftNav1: false,
				leftNav2: false,
				leftNav3: false,
				leftNav4: false,
				zdid: '',
				seeds: '',
				ckval: '',
				tdje: '',
				isPlaying: true,
				dt: '',
				staticMoney: '',
				gonggao: '',
				totalsee: ''
			}
		},
		mounted() {
			this.$http.get(this.enhttp + '/trees/mobile/fodder/gundong').then(
				(res) => {
					this.gonggao = '公告:' + res.data.data.content
					console.log(res.data.data.content)
				}
			)
			let id = localStorage.getItem('id')
			this.id = id
			let $this = this
			this.$http.get(this.enhttp + '/trees/mobile/app/index?id=' + id).then(
				(res) => {
					$this.userInfo = res.data.data.userData
					$this.black = res.data.data.blackLand
					$this.yellow = res.data.data.yellowLand
					$this.red = res.data.data.redLand
					$this.dt = res.data.data.dynamicMoney
					$this.totalsee = res.data.data.total
					$this.staticMoney = res.data.data.staticMoney
					console.log(res.data)
				},
				(res) => {
					console.log(res.data)
				}
			)
		},
		methods: {
			play() {
				var audio = document.querySelector('#media')
				if(!this.isPlaying) {
					audio.play()
					this.isPlaying = true
				} else {
					audio.pause()
					audio.currentTime = 0
					this.isPlaying = false
				}
			},
			leftNava() {
				this.leftNav1 = true
			},
			chengzhang() {
				this.leftNav2 = true
			},
			jiaoyi() {
				this.leftNav3 = true
			},
			leftNavde() {
				this.leftNav4 = true
			},
			hidecangku() {
				this.cangkushow = false
			},
			_cangkushow() {
				this.cangkushow = true
			},
			loginOut() {
				this.outLogin = true
			},
			onConfirmOut() {
				this.$router.push('/login')
			},
			shu(id, money) {
				this.zdid = id
				this.tdje = money
				this.show = true
			},
			shifei() {
				let $this = this
				this.$http.get(this.enhttp + '/trees/mobile/user/shit?userId=' + this.id + '&landId=' + this.zdid + '&shitNumbers=' + this.seeds).then(
					(res) => {
						if(!res.data.success) {
							this.show = false
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.show = false
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message,
								onHide() {
									$this.$router.go(0)
								}
							})
						}
						console.log(res.data)
					}
				)
			},
			zengzhong() {
				if(isNaN(this.seeds) || this.seeds === '') {
					this.show = false
					this.$vux.alert.show({
						title: '对不起',
						content: '请输入增种数量'
					})
					return false
				}
				let $this = this
				this.$http.get(this.enhttp + '/trees/mobile/user/addSeeds?userId=' + this.id + '&landId=' + this.zdid + '&seedNumbers=' + this.seeds).then(
					(res) => {
						if(!res.data.success) {
							this.show = false
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.show = false
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message,
								onHide() {
									$this.$router.go(0)
								}
							})
						}
					}
				)
			},
			close() {
				this.seeds = ''
				this.show = false
			},
			shouhuo() {
				let $this = this
				this.$http.get(this.enhttp + '/trees/mobile/user/recSeeds?userId=' + this.id + '&landId=' + this.zdid).then(
					(res) => {
						if(!res.data.success) {
							this.show = false
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.show = false
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message,
								onHide() {
									$this.$router.go(0)
								}
							})
						}
					}
				)
			},
			queding() {
				this.show = false
			},
			zhongdi(id) {
				this.zdid = id
				this.show1 = true
			},
			truezd() {
				let $this = this
				this.$http.get(this.enhttp + '/trees/mobile/user/openLand?userId=' + this.id + '&landId=' + this.zdid).then(
					(res) => {
						if(!res.data.success) {
							this.$vux.alert.show({
								title: '对不起',
								content: res.data.message
							})
						} else {
							this.$vux.alert.show({
								title: '恭喜您',
								content: res.data.message,
								onHide() {
									$this.$router.go(0)
								}
							})
						}
					}
				)
			},
			shuaxin() {
				this.$router.go(0)
			}
		},
		filters: {
			dengji(val) {
				if(val === '0' || val === 0) {
					return '农民'
				} else if(val === '1') {
					return '富商'
				} else if(val === '2') {
					return '地主'
				}
			}
		}
	}
</script>
<style lang="less">
	.weui-dialog {
		max-width: 400px !important;
	}
	
	.cangkushow {
		height: auto;
		overflow: hidden;
		.weui-dialog {
			padding-top: 30px;
			height: auto;
			overflow: hidden;
			height: 4rem;
			box-sizing: border-box;
		}
		.weui-btn_mini {
			margin-top: 0.120481rem;
			display: inherit;
		}
	}
	
	.gameguanli {
		.weui-dialog {
			text-align: center;
			box-sizing: border-box;
		}
		ul {
			width: 100%;
			text-align: center;
			height: auto;
			overflow: hidden;
			padding: 0.481927rem;
			box-sizing: border-box;
			li {
				display: inline-block;
				width: 50%;
				float: left;
				margin: 0.120481rem 0;
			}
		}
		a {
			display: block;
			margin: auto;
			height: 0.722891rem;
			width: 2.554216rem;
			background: #f50;
			background: url(../../static/img/btnbg.png) no-repeat;
			background-size: 100%;
			overflow: hidden;
			font-size: 0.337349rem;
			line-height: 0.722891rem;
			color: #fff;
		}
	}
	
	.cangkushow p {
		display: flex;
		height: 0.722891rem;
		overflow: hidden;
		span {
			flex: 1;
			height: 0.722891rem;
			font-size: 0.361445rem;
			font-size: 0.313253rem;
			color: #666;
			text-align: center;
			em {
				color: #3C3C3C;
				font-style: normal;
				margin-right: 0.240963rem;
			}
		}
	}
</style>