<template>
	<div>
		<div class="max-right">
			<div class="tips-box">
				<div class="title">
					<span>全部通知 <em>(共{{tipsList.length}}个)</em></span>
					<span>
						</span>
				</div>

				<ul class="tips-list">
					<li v-for='item in tipsList'>
						<div>
							<h3>{{item.title}} <em>{{item.createTime}}</em> </h3>
							<p>{{item.content}}</p>
						</div>
					</li>

				</ul>

			</div>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                enHttp: localStorage.getItem('http'),
                token: '',
                tipsList: []
            }
        },
        mounted() {
            let token = sessionStorage.getItem('token')
            this.token = token
            this.$http({
                url: this.enHttp + '/mobile/institutionNotice/list?page=1&rows=10',
                method: 'get',
                headers: {
                    'token': token
                }
            }).then(
                (res) => {
                    this.tipsList = res.data.data.entityList
                        //console.log(this.tipsList)
                }
            )
        }
    }
</script>
<style>

</style>