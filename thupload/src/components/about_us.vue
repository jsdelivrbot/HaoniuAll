<template>
	<div class="about_us_box">
		<goback title='关于我们'></goback>
		<div class="about_text">
			<div class="logo">
				<img src="../../static/img/logo.png" />
			</div>
			<p v-html="content">{{content}}</p>
			<!--<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;太湖县，古称左县、晋熙，安徽省安庆市下辖县。位于安徽省西南部、大别山南麓、长江北岸，介于北纬30°09′至30°46′和东经115°45′至116°30′之间。东邻潜山县、怀宁县，南望望江县，西南接宿松县，西界湖北省蕲春县、英山县，北毗岳西县。合九铁路、沪渝高速、105国道横贯东西，东香高速临境而过。</p>-->
			<!--<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：0551-6888070</p>-->
		</div>
	</div>
</template>

<script>
	import goback from '@/components/return'
	export default {
		name: 'about',
		data() {
			return {
				content: ''
			}
		},
		components: {
			goback
		},
		activated() {
			this.$http.get('/api/frontBase/department/findAboutMe').then((res) => {
				if(res.data.result === 0) {
					console.log(res.data.obj.content)
					this.content = res.data.obj.content
				} else {
					this.content = '太湖县，古称左县、晋熙，安徽省安庆市下辖县。位于安徽省西南部、大别山南麓、长江北岸，介于北纬30°09′至30°46′和东经115°45′至116°30′之间。东邻潜山县、怀宁县，南望望江县，西南接宿松县，西界湖北省蕲春县、英山县，北毗岳西县。合九铁路、沪渝高速、105国道横贯东西，东香高速临境而过。'
					this.$vux.loading.hide()
					this.$vux.alert.show({
						title: '提示',
						content: res.data.msg
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.about_us_box {
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 44px;
		background-color: #f7f7f7;
		.about_text {
			margin-top: 60px;
			padding: 0 20px;
			.logo {
				margin: auto;
				overflow: hidden;
				text-align: center;
				margin-bottom: 30px;
				img {
					display: block;
					width: 80px;
					margin: auto;
				}
			}
			p {
				line-height: 30px;
				color: #5c5c5c;
			}
		}
	}
</style>