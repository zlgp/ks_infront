<template>
	<view class="mine">
		<view class="Icon">
			<u-image :src="userInfo.avatar" shape="circle" width="100rpx" height="100rpx">
				<view slot="error" style="font-size: 24rpx;">暂无头像</view>
			</u-image>
			<view class="username">
				{{userInfo.username}}
			</view>
		</view>
		<view class="msg_box">
			<view class="coin box">
				<navigator url="">
					<image src="../../static/img/icon_one.png" mode="widthFix"></image>
					<view>{{userInfo.coin}}</view>
				</navigator>
			</view>
			<view class="car box">
				<navigator url="">
					<image src="../../static/img/icon_two.png" mode="widthFix"></image>
					<view>{{userInfo.car_num}}</view>
				</navigator>
			</view>
			<view class="msg box">
				<navigator url="">
					<image src="../../static/img/icon_three.png" mode="widthFix"></image>
					<view>{{userInfo.message_num}}</view>
				</navigator>
			</view>
		</view>
		<view class="btn">
			<u-button type="warning" :ripple="true" shape="circle" @click="outLogin()">退出</u-button>
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
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 获取个人信息
			getUserInfo() {
				this.request('post', '/getUserInfo').then(res => {
					this.userInfo = res.data
				})
			},
			// 退出登陆
			async outLogin() {
				await this.logout()
				await uni.navigateTo({
					url: "../login/login"
				})
			},
			// 印射为this.$store.commit("logout");
			...mapMutations(['logout'])
		},



	}
</script>

<style lang="scss">
	.mine {
		padding: 0rpx 20rpx;

		.Icon {
			margin-top: 50rpx;
			display: flex;
			background-color: #fff;
			align-items: center;
			border-radius: 15rpx;
			padding: 30rpx 0rpx;

			.username {
				padding-left: 30rpx;
				font-size: 40rpx;
			}
		}

		.msg_box {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			border-radius: 15rpx;
			padding: 30rpx 0rpx;

			.box {
				text-align: center;
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.btn {
			margin-top: 50rpx;
		}
	}
</style>
