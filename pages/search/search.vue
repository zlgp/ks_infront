<template>
	<scroll-view class="search" scroll-y="true" @scrolltolower="handletolower">
		<u-search placeholder="请输入搜索关键词" v-model="keyword" bg-color="#fff" :show-action="false" @search='getSeachMovie'></u-search>
		<view class="search_content">
			<view class="search_movie" v-for="(item,index) in search_List" :key="index">
				<view class="img_box">
					<u-image :src="item.cover" :lazy-load="true" width="90%" height="350rpx" :border-radius="5"></u-image>
				</view>
				<view class="search_msg">
					<view class="">
						<text class="title">{{item.title}}</text>
						<text class="year">{{item.year}}</text>
					</view>
					<view class="">
						<text>{{item.area}}</text>
					</view>
					<view class="actors">
						<text>{{item.actors}}</text>
					</view>
					<view class="">
						<text>播放源:{{item.video_source}}</text>
					</view>
					<view class="">
						<goDetail :movieID='item.id'>
							<u-button type="warning" size="medium" shape="circle" :ripple="true">立即播放</u-button>
						</goDetail>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import goDetail from '@/components/goDetail.vue'
	export default {
		components: {
			goDetail
		},
		data() {
			return {
				keyword: "",
				page: 1,
				search_List: [],
				total_page: "",
				// 是否还有下一页
				hasMore: true

			}
		},
		onShow() {
			this.getSeachMovie()
		},
		methods: {
			getSeachMovie() {
				this.request('post', '/searchMovie', {
					keyword: this.keyword,
					page: this.page
				}).then(res => {
					this.total_page = res.data.total_page
					if (this.page > this.total_page) {
						this.hasMore = false
						uni.showToast({
							title: "没有数据了",
							icon: "none"
						})
						return;
					}
					this.search_List = [...this.search_List, ...res.data.list]

				})
			},
			// 下拉加载
			handletolower() {
				if (this.hasMore == true) {
					this.page += 1
					console.log(this.page )
					this.getSeachMovie()
				} else {
					uni.showToast({
						title: "没有数据了",
						icon: "none"
					})
				}
			}
		},
		watch: {
			keyword(val) {
				this.keyword = val
				this.page = 1
				this.search_List = []
				this.getSeachMovie()
			}
		}
	}
</script>

<style lang="scss">
	.search {
		height: calc(100vh - 0px);

		.search_content {
			.search_movie {
				display: flex;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				padding: 20rpx 20rpx;

				.img_box {
					flex: 1;
				}

				.search_msg {
					flex: 1;

					view {

						margin-bottom: 20rpx;

						text {
							color: #000000;
							font-size: 25rpx;
						}

						.title {
							color: #fe9612;
							font-size: 30rpx;
						}

						.year {
							color: rgba(0, 0, 0, 0.6);
							font-size: 18rpx;
						}

					}

					.actors {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}
</style>
