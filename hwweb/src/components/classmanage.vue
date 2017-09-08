<template>
	<div class="max-wd">
		<div class="top-info">
			<img src="../assets/logo.png" />

			<div class="center">
				<h2>
					{{classInfo.name}}
				</h2>
				<p>
					班级人数: {{studentList.length}} 人
				</p>
			</div>

			<div class="right">
				<p @click='noshowwenti()'>
					<el-radio class="radio" v-model="radio" label="0">公开</el-radio>
				</p>

				<p @click='showWenti = true'>
					<el-radio class="radio" v-model="radio" label="1">不公开</el-radio>
				</p>
			</div>
		</div>

		<!--<p>{{studentList}}</p>-->

		<el-table :data="studentList" border style="width: 100%">
			<el-table-column prop="type" label="" width="100">
			</el-table-column>
			<el-table-column prop="nickname" label="班级成员" width="180">
			</el-table-column>
			<el-table-column prop="mobile" label="手机号">
			</el-table-column>
			<el-table-column prop="createTime" label="加入时间" width="180">
			</el-table-column>
			<el-table-column prop="address" label="" width="80">
				<template scope="scope">
					<el-button @click="deleteS(scope.row.id,scope.$index)" type="text" size="small">删除</el-button>
					<!--<el-button type="text" size="small">编辑</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="设置问题" size='tiny' v-model="showWenti" :close-on-click-modal='false' :close-on-press-escape='false' :show-close='false'>
			<el-input v-model="setWenti" placeholder="请输入验证问题!"></el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showWenti = false; radio='0'">取 消</el-button>
				<el-button type="primary" @click="change()">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				enHttp: localStorage.getItem('http'),
				radio: '0',
				classId: '',
				classInfo: [],
				studentList: [],
				check: '',
				showWenti: false,
				setWenti: ''
			}
		},
		methods: {
			deleteS(username, index) {
				this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((value) => {
					if(value === 'confirm') {
						this.$http({
							url: this.enHttp + '/mobile/groupUser/delete?id=' + username,
							method: 'get',
							headers: {
								'token': this.token
							}
						}).then(
							(res) => {
								if(res.data.success) {
									this.$message({
										type: 'success',
										message: '删除成功!'
									})
									this.studentList.splice(index, 1)
								} else {
									//console.log(res.data)
									this.$message({
										type: 'error',
										message: '删除失败!' + res.data.msg
									})
								}
							}
						)
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
				//				this.studentList.splice(index, 1)
				let a = true
				if(a) {
					return false
				}
			},
			noshowwenti() {
				this.radio = '0'
				this.setinfo()
			},
			change() {
				//console.log(this.radio)
				if(this.setWenti === '') {
					this.$notify({
						title: '警告',
						message: '请输入验证问题!',
						type: 'warning',
						duration: 1000
					})
				} else {
					this.setinfo()
				}
			},
			setinfo() {
				this.$http({
					url: this.enHttp + '/mobile/group/update?name=' + this.classInfo.name + '&applyQuestion=' + this.setWenti + '&applySetting=' + this.radio + '&id=' + this.classId,
					method: 'get',
					headers: {
						'token': this.token
					}
				}).then(
					(res) => {
						if(res.data.success) {
							this.$notify({
								title: '成功',
								message: '设置成功!',
								type: 'success',
								duration: 1000
							})
						} else {
							this.$notify({
								title: '提示',
								message: '修改失败请重试!',
								type: 'warning',
								duration: 1000
							})
						}
						this.showWenti = false
						//console.log(res.data)
					}
				)
			}
		},
		mounted() {
			this.classId = this.$route.params.id
			this.token = sessionStorage.getItem('token')
			//			alert(this.classId)
			this.$http({
				url: this.enHttp + '/mobile/groupUser/listGroupUser?page=1&rows=1000&groupId=' + this.classId,
				method: 'get',
				headers: {
					'token': this.token
				}
			}).then(
				(res) => {
					this.studentList = res.data.data.entityList
				}
			)

			this.$http({
				url: this.enHttp + '/mobile/group/info?id=' + this.classId,
				method: 'get',
				headers: {
					'token': this.token
				}
			}).then(
				(res) => {
					this.classInfo = res.data.data
					this.radio = this.classInfo.applySetting.toString()
					//console.log(res.data)
				}
			)
		}
	}
</script>
<style lang="less">
	.max-wd {
		max-width: 800px;
		overflow: hidden;
		margin-left: 200px;
	}
	
	.top-info {
		height: 100px;
		width: 800px;
		overflow: hidden;
		border: 1px solid #d1d3d6;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		padding: 15px;
		margin-bottom: 20px;
		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			/*background: #f60;*/
			margin-right: 20px;
		}
		.center {
			flex: 1;
			h2 {
				height: 40px;
				line-height: 40px;
				font-size: 18px;
				color: #222222;
			}
			p {
				color: #666666;
				line-height: 20px;
			}
		}
		.right {
			width: 200px;
			p {
				height: 35px;
				line-height: 35px;
			}
		}
	}
</style>