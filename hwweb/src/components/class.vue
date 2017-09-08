<template>
	<div style="margin-left: 200px;position: fixed;">
		<iframe :src="'../../static/web-im/index.html?username='+thus"  width="1000" height="800"></iframe>
		<!--<iframe :src="'http://192.168.1.143:8020/web-im/index.html?username='+thus" width="800" height="600"></iframe>-->
	</div>
</template>
<script>
    import WebIM from 'easemob-websdk'
    export default {
        data() {
            return {
                thus: ''
            }
        },
        mounted() {
            var conn = new WebIM.connection({
                https: WebIM.config.https,
                url: WebIM.config.xmppURL,
                isAutoLogin: WebIM.config.isAutoLogin,
                isMultiLoginSessions: WebIM.config.isMultiLoginSessions
            })
            let $$this = this
            let uss = sessionStorage.getItem('username')
            let pws = sessionStorage.getItem('pws')
            let us = uss
                //console.log(uss)
                //console.log(pws)
            var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: us,
                    pwd: pws,
                    appKey: WebIM.config.appkey,
                    success: function(res) {
                        let encryptUsername = WebIM.utils.encrypt(uss)
                        $$this.thus = encryptUsername
                        var token = res.access_token
                            //console.log(token)
                        WebIM.utils.setCookie('webim_' + encryptUsername, token, 1)
                    },
                    error: function() {
                        alert('登录失败')
                    }
                }
                //console.log(options)
            conn.open(options)

            //console.log(us)
            //console.log(pws)
        }
    }
</script>
<style lang="less">

</style>