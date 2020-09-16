<template>
	<view class="index">
		<view class="tag_box">
			<view class="tag_list" v-for="(item,index) in tagList" :key="index">
				<goMore :sid="item.id">
					<u-tag :text="item.title" mode="plain" shape="circle" type="info" />
				</goMore>
			</view>
		</view>
		<view class="index_content">
			<!-- 第一个 -->
			<view class="label_box">
				<view class="label_title">
					<view class="label_name">
						{{movieList_1.label}}
					</view>
					<goMore :sid="movieList_1.label_id">
						<view class="label_more">
							更多
						</view>
					</goMore>
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
						{{movieList_2.label}}
					</view>
					<goMore :sid="movieList_2.label_id">
						<view class="label_more">
							更多
						</view>
					</goMore>
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
						{{movieList_3.label}}
					</view>
					<goMore :sid="movieList_3.label_id">
						<view class="label_more">
							更多
						</view>
					</goMore>
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
						{{movieList_4.label}}
					</view>
					<goMore :sid="movieList_4.label_id">
						<view class="label_more">
							更多
						</view>
					</goMore>
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
	import {
		mapState
	} from 'vuex'
	import goMore from '@/components/goMore.vue'
	import goDetail from '@/components/goDetail.vue'
	export default {
		components: {
			goMore,
			goDetail
		},
		data() {
			return {
				tagList: [],
				movieList_1: {},
				movieList_2: {},
				movieList_3: {},
				movieList_4: {}
			}
		},
		async onShow() {
			// 获取标签
			await this.request('post', '/getTag').then(res => {
				this.tagList = res.data
			})
			await this.getMovie(1)
			await this.getMovie(2)
			await this.getMovie(3)
			await this.getMovie(4)
		},
		methods: {
			// 请求获取影片
			getMovie(label) {
				this.request('post', '/getIndexByLabel', {
					label
				}).then(res => {
					switch (label) {
						case 1:
							this.movieList_1 = res.data
							break;
						case 2:
							this.movieList_2 = res.data
							break;
						case 3:
							this.movieList_3 = res.data
							break;
						case 4:
							this.movieList_4 = res.data
							break;

					}

				})
			}
		},
		computed: {
			...mapState(['hasLogin', 'uerInfo'])
		}
	}
</script>

<style lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.tag_box {
			width: 100%;
			background-color: #FFFFFF;
			padding: 0rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 40rpx;

			.tag_list {
				width: 20%;
				margin-top: 20rpx;
			}
		}

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
