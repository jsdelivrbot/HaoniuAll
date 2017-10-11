<template>
	<div class="addtext-box">
		<el-form ref="form" :form='form' label-width="80px">
			<el-form-item label="文章标题" class='sm-box'>
				<el-input v-model='form.title' placeholder='请输入文章标题'></el-input>
			</el-form-item>

			<el-form-item label="文章描述" class='sm-box'>
				<el-input v-model='form.intro' type="textarea" placeholder='请输入文章描述'></el-input>
			</el-form-item>
			<el-form-item label="文章插图" class='sm-box'>
				<el-upload class="avatar-uploader" action="http://192.168.1.252:8360/admin_pub/upload" :on-success="uploadSuc" :show-file-list="false">
					<img v-if="form.illustration" :src="form.illustration" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<div class="text-box">
				<label for="">内容</label>
				<vue-html5-editor :content="form.content" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
			</div>

			<el-form-item label="是否推荐">
				<el-switch on-text="" off-text=""></el-switch>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click.native='sendText'>立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					title: '',
					intro: '',
					content: '',
					illustration: ''
				}
			}
		},
		methods: {
			uploadSuc(res, file) {
				this.form.illustration = this.$http.defaults.baseURL + '/' + res.data
			},
			sendText() {
				alert(1)
			}
		}
	}
</script>
<style lang="less">
	.addtext-box {
		padding: 30px;
		box-sizing: border-box;
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		.sm-box {
			width: 50%;
		}
		.text-box {
			display: flex;
			label {
				width: 80px;
			}
		}
	}
</style>