<template>
	<view class="movieDetail">
		<view class="video_box">
			<video :src="movieMsg.audio_url" controls :poster="movieMsg.thumbnail" class="audio_url"></video>
		</view>
		<view class="movieMsg_box">
			<u-collapse>
				<u-collapse-item title="简介">
					<view class="movieMsg_sub">标题:<text>{{movieMsg.title}}</text></view>
					<view class="movieMsg_sub">来源:<text>{{movieMsg.video_source}}</text></view>
					<view class="movieMsg_sub">
						主演:<text>{{movieMsg.actors}}</text>
					</view>
					<view class="movieMsg_sub">
						标签:<text>{{movieMsg.label}}</text>
					</view>
					<view class="movieMsg_sub">
						剧情简介:<text>{{movieMsg.description}}</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="movieMsg_curr" v-for="(item,index) in CurrList" :key="index">
			<view class="movieMsg_curr_box" v-for="(value,index1) in item" :key="index1">
				<u-button size="mini" :ripple="true" ripple-bg-color="#ff7000" @click="changeCurr(value.sid)">{{value.epi_curr}}</u-button>
			</view>
		</view>
		<view class="price">
			价格:<text>${{movieMsg.price}}</text>
		</view>
		<view class="choose_box">
			<u-dropdown class="u-dropdown">
				<u-dropdown-item v-model="ruleid" title="水印类型" :options="ruleList"></u-dropdown-item>
				<u-dropdown-item v-model="webid" title="发布项目" :options="webList"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="btn">
			<view class="btn_box">
				<u-button type="warning" shape="circle" class="btn_box">加入购物车</u-button>
			</view>
			<u-button type="warning" shape="circle" class="btn_box">立即下单</u-button>
		</view>

	</view>


</template>

<script>
	export default {
		data() {
			return {
				movieId: 1,
				sid: "",
				movieMsg: {},
				// 获取集数
				CurrList: [],
				ruleid: "",
				webid: "",
				ruleList: [],
				webList: [],
			}
		},
		async onLoad(option) {
			// this.movieId = option.id
			await this.getMovieDetail()
			await this.getCurrList()
			await this.getRuleType()
			await this.getWebType()
		},
		methods: {
			// 获取电影详情
			getMovieDetail() {
				this.request('post', '/getMovieDetail', {
					id: this.movieId,
					sid: this.sid
				}).then(res => {
					this.movieMsg = res.data

				})
			},
			// 获取集数
			getCurrList() {
				this.request('post', '/getEpisode', {
					id: this.movieId,
				}).then(res => {
					this.CurrList = res.data.list
				})
			},
			// 获取水印类型
			getRuleType() {
				this.request('post', '/getUserRuleTile').then(res => {
					this.ruleList = res.data
				})
			},
			// 获取项目类型
			getWebType() {
				this.request('post', '/getUserWeb').then(res => {
					this.webList = res.data
				})
			},
			// 切换集数
			async changeCurr(sid) {
				this.sid = sid
				await this.getMovieDetail()
			}
		}
	}
</script>

<style lang="scss">
	.movieDetail {
		.video_box {
			width: 100%;

			.audio_url {
				width: 100%;
			}
		}

		.movieMsg_box {
			padding: 0rpx 30rpx;

			.u-collapse-item {
				.movieMsg_sub {
					color: #000;
					display: flex;
					margin-bottom: 30rpx;

					text {
						flex: 1;
						padding-left: 20rpx;
					}

				}
			}
		}

		.movieMsg_curr {
			padding: 0rpx 30rpx;
			margin-top: 50rpx;
			display: flex;
			flex-wrap: wrap;

			.movieMsg_curr_box {
				width: 20%;
				margin-bottom: 20rpx;

			}
		}

		.price {
			padding: 0rpx 30rpx;

			text {
				font-size: 35rpx;
				color: #ff7000;
			}
		}

		.choose_box {
			padding: 0rpx 30rpx;

			.u-dropdown__menu__item {
				justify-content: flex-start;
			}
		}

		.btn {
			padding: 0rpx 30rpx;
			margin-top: 50rpx;
			height: 300rpx;
			overflow: hidden;
			.btn_box{
				margin-bottom: 50rpx;
			}
		}
	}
</style>
