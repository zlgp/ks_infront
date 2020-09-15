<template>
	<view class="register">
		<view class="register_box">
			<view class="logo_box">
				<image src="../../static/img/login_logo.png" mode="widthFix"></image>
			</view>
			<view class="title">
				注册账号
			</view>
			<view class="form">
				<view class="uni-form-item uni-column">
					<text>用户名:</text>
					<input class="uni-input" type="text" placeholder="用户名" v-model="params.username" />
				</view>
				<view class="uni-form-item uni-column">
					<text>密码:</text>
					<input class="uni-input" password type="text" placeholder="密码" v-model="params.password" />
				</view>
			</view>
			<view class="btn">
				<button type="default" class="register_btn" @tap="register()">注册</button>
			</view>
			<view class="go_login">
				<navigator url="../register/register">如已有账号,请前往登陆</navigator>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					username: "",
					password: "",
				},
			}
		},
		onReady() {


		},
		methods: {
			register() {
				// md5加密
				this.params.password = this.md5(this.params.password)
				console.log(this.params.password)
				this.request('post', '/register', { ...this.params
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
					uni.navigateTo({
						url: '../login/login'
					});
				})
			}
		}
	}
</script>

<style lang="less">
	.register {
		position: relative;
		padding: 0px 30px;
		height: 100vh;
		display: flex;
		align-items: center;

		.register_box {
			width: 100%;

			.logo_box {
				display: flex;
				justify-content: center;

				image {
					width: 244rpx;
					height: 79rpx;
				}
			}

			.title {
				font-size: 40rpx;
				display: flex;
				justify-content: center;
				margin: 30rpx 0rpx;
			}

			.form {
				width: 100%;
				background-color: #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.uni-form-item {
					display: flex;
					border-bottom: 1px solid #808080;
					padding-left: 20rpx;
					padding-top: 25rpx;
					padding-bottom: 25rpx;

					text {
						width: 120rpx;
						margin-right: 20rpx;
					}
				}
			}

			.btn {
				margin: 50rpx 0rpx;

				.register_btn {
					background-color: rgba(255, 112, 0, 1) !important;
					color: #fff;
					border-radius: 40rpx;
				}
			}

			.go_login {
				display: flex;
				justify-content: center;
				color: #007AFF;
			}
		}
	}
</style>
