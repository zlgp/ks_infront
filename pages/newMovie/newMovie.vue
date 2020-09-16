<template>
	<view class="newMovie">
		<view class="index_content">
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_0.time}}
					</view>

				</view>
				<view class="label_movie">
					<view class="img_box" v-for="(item,index) in movieList_0.list" :key="index">
						<goDetail :movieID="item.id">
							<u-image :src="item.cover" :lazy-load="true" width="90%" height="200rpx" :border-radius="5"></u-image>
							<view class="movie_title">{{item.title}}</view>
							<view class="movie_epi_tt">共{{item.epi_tt}}集</view>
							<view class="movie_ended" v-if="item.ended==0">已完结</view>
							<view class="movie_ended" v-if="item.ended==1">连载中</view>
						</goDetail>
					</view>

				</view>
			</view>
			<!-- 第一个 -->
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_1.time}}
					</view>

				</view>
				<view class="label_movie">
					<view class="img_box" v-for="(item,index) in movieList_1.list" :key="index">
						<goDetail :movieID="item.id">
							<u-image :src="item.cover" :lazy-load="true" width="90%" height="200rpx" :border-radius="5"></u-image>
							<view class="movie_title">{{item.title}}</view>
							<view class="movie_epi_tt">共{{item.epi_tt}}集</view>
							<view class="movie_ended" v-if="item.ended==0">已完结</view>
							<view class="movie_ended" v-if="item.ended==1">连载中</view>
						</goDetail>
					</view>

				</view>
			</view>
			<!-- 第一个 -->
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_2.time}}
					</view>

				</view>
				<view class="label_movie">
					<view class="img_box" v-for="(item,index) in movieList_2.list" :key="index">
						<goDetail :movieID="item.id">
							<u-image :src="item.cover" :lazy-load="true" height="200rpx" :border-radius="5" width="90%"></u-image>
							<view class="movie_title">{{item.title}}</view>
							<view class="movie_epi_tt">共{{item.epi_tt}}集</view>
							<view class="movie_ended" v-if="item.ended==0">已完结</view>
							<view class="movie_ended" v-if="item.ended==1">连载中</view>
						</goDetail>
					</view>
				</view>

			</view>
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_3.time}}
					</view>

				</view>
				<view class="label_movie">
					<view class="img_box" v-for="(item,index) in movieList_3.list" :key="index">
						<goDetail :movieID="item.id">
							<u-image :src="item.cover" :lazy-load="true" height="200rpx" :border-radius="5" width="90%"></u-image>
							<view class="movie_title">{{item.title}}</view>
							<view class="movie_epi_tt">共{{item.epi_tt}}集</view>
							<view class="movie_ended" v-if="item.ended==0">已完结</view>
							<view class="movie_ended" v-if="item.ended==1">连载中</view>
						</goDetail>
					</view>
				</view>

			</view>
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_4.time}}
					</view>

				</view>
				<view class="label_movie">
					<view class="img_box" v-for="(item,index) in movieList_4.list" :key="index">
						<goDetail :movieID="item.id">
							<u-image :src="item.cover" :lazy-load="true" height="200rpx" :border-radius="5" width="90%"></u-image>
							<view class="movie_title">{{item.title}}</view>
							<view class="movie_epi_tt">共{{item.epi_tt}}集</view>
							<view class="movie_ended" v-if="item.ended==0">已完结</view>
							<view class="movie_ended" v-if="item.ended==1">连载中</view>
						</goDetail>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from '@/components/goDetail.vue'
	export default {
		components: {
			goDetail
		},
		data() {
			return {
				movieList_0: {},
				movieList_1: {},
				movieList_2: {},
				movieList_3: {},
				movieList_4: {},
				page: 1,
				limit: 6
			}
		},
		async onShow() {
			await this.getNewMovies("0", this.page, this.limit)
			await this.getNewMovies("1", this.page, this.limit)
			await this.getNewMovies("2", this.page, this.limit)
			await this.getNewMovies("3", this.page, this.limit)
			await this.getNewMovies("4", this.page, this.limit)
		},
		methods: {
			// 获取最新片源
			getNewMovies(day, page, limit) {
				this.request('post', '/getNewMovies', {
					day,
					page,
					limit
				}).then(res => {
					switch (day) {
						case "0":
							this.movieList_0 = res.data
							break;
						case "1":
							this.movieList_1 = res.data
							break;
						case "2":
							this.movieList_2 = res.data
							break;
						case "3":
							this.movieList_3 = res.data
							break;
						case "4":
							this.movieList_4 = res.data
							break;

					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.newMovie {
		.index_content {
			width: 100%;

			.label_box {
				width: 100%;
				background-color: #FFFFFF;
				padding: 0rpx 20rpx;
				margin-bottom: 30rpx;

				.label_title {
					padding: 30rpx 0rpx;
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;

					.label_name {
						color: $fontColor;
					}

					.label_more {
						color: $fontColor;
					}
				}

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
	}
</style>
