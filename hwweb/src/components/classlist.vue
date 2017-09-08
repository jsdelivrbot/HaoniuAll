<template>
	<div class="classList-box">
		<div class="classes">
			<ul>
				<li v-for='item in info'>
					<router-link :to='"/pub/classdt/"+item.id'>
						<img :src="item.faceUrl" />
						<span>{{item.name}}</span>
						<em>进入</em>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                info: [],
                token: ''
            }
        },
        created() {
            let token = sessionStorage.getItem('token')
            this.token = token
            this.$http({
                url: this.enHttp + '/mobile/group/listCurUserGroup',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.info = res.data.data
                        //console.log(res.data.data)
                }
            )
        }
    }
</script>
<style lang="less">
    .classList-box {
        width: 800px;
        margin-left: 200px;
        .classes {
            /*display: none;*/
            height: auto;
            background: #fff;
            border: 1px solid #e5e5e5;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;
            li:nth-child(2n-1) {
                border-right: none;
            }
            li {
                display: inline-block;
                float: left;
                width: 50%;
                height: 60px;
                line-height: 60px;
                padding: 5px;
                box-sizing: border-box;
                background: #fff;
                border: 1px solid #eee;
                border-bottom: none;
                a {
                    display: flex;
                    img {
                        margin: 5px;
                        width: 40px;
                        height: 40px;
                        margin-right: 20px;
                    }
                    span {
                        flex: 1;
                        line-height: 50px;
                        color: #333;
                        font-size: 18px;
                    }
                    em {
                        margin-right: 10px;
                        line-height: 50px;
                        color: #0190FE;
                    }
                }
            }
        }
    }
</style>