<template>
	<view class="login">
		<view class="login_box">
			<view class="logo_box">
				<image src="../../static/img/login_logo.png" mode="widthFix"></image>
			</view>
			<view class="title">
				登录到切片系统
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

				<view class="uni-form-item uni-column code">
					<text>验证码:</text>
					<input class="uni-input" type="text" placeholder="验证码" v-model="params.code" />
					<image :src="code_url" mode="widthFix" @tap="changeCode()"></image>
				</view>
			</view>
			<view class="btn">
				<button type="default" class="login_btn" @tap="ks_login()">登录</button>
			</view>
			<view class="go_register">
				<navigator url="../register/register">如未有账号,请前往注册</navigator>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				code_url: "http://localhost:3000/code",
				params: {
					username: "",
					password: "",
					code: ""
				},
			}
		},
		onReady() {


		},
		methods: {
			changeCode() {
				this.code_url = "http://localhost:3000/code?" + Math.ceil(Math.random() * 10);
			},
			ks_login() {
				// md5加密
				// this.params.password = this.md5(this.params.password)
				this.request('post', '/login', { ...this.params
				}).then(res => {
					if (res.code == 1) {
						// login 是mutations的里的方法
						this.login(res.data)
						uni.switchTab({
							url: '../index/index'
						});
					}

				})
			},

			...mapMutations(['login'])
			// 印射为this.$store.commit("login",this.userInfo);
		}
	}
</script>

<style lang="less">
	.login {
		position: relative;
		padding: 0px 30px;
		height: 100vh;
		display: flex;
		align-items: center;



		.login_box {
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

				.code {
					image {
						padding-right: 20rpx;
						width: 226rpx;
						height: 57rpx;
					}
				}
			}

			.btn {
				margin: 50rpx 0rpx;

				.login_btn {
					background-color: rgba(255, 112, 0, 1) !important;
					color: #fff;
					border-radius: 40rpx;
				}
			}

			.go_register {
				display: flex;
				justify-content: center;
				color: #007AFF;
			}
		}
	}
</style>
