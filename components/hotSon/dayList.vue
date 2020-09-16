<template>
	<view class="day">
		<view class="label_box">
			<view class="label_movie">
				<view class="img_box" v-for="(item,index) in dayList" :key="index">
					<goDetail :movieID="item.sid">
						<u-image :src="item.cover" :lazy-load="true" width="90%" height="200rpx" :border-radius="5"></u-image>
						<view class="movie_title">{{item.title}}</view>
						<view class="movie_epi_tt">第{{item.epi_curr}}集</view>
						<view class="movie_epi_tt">共{{item.counts}}集</view>
						<view class="movie_ended" v-if="item.ended==0">已完结</view>
						<view class="movie_ended" v-if="item.ended==1">连载中</view>
					</goDetail>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from '@/components/goDetail.vue'
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				dayList: [],
				type: 1
			}
		},
		mounted() {
			this.getDayList()
		},
		methods: {
			// 获取日榜的数据
			getDayList() {
				this.request('post', '/getHotMovies', {
					type: this.type
				}).then(res => {
					this.dayList = res.data.data
					console.log(this.dayList);

				})
			}
		}
	}
</script>

<style lang="scss">
	.day {
		.label_box {
			width: 100%;
			background-color: #FFFFFF;
			padding: 0rpx 20rpx;
			margin-bottom: 30rpx;
			padding-top: 30rpx;
			margin-top: 30rpx;

			.label_movie {
				display: flex;
				flex-wrap: wrap;

				.img_box {
					width: 33.33%;
					min-height: 200rpx;
					margin-bottom: 10rpx;
					text-align: center;
					color: $fontColor;

					.movie_title {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-top: 10rpx;
					}

				}
			}
		}
	}
</style>
