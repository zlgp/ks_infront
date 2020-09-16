<template>
	<view class="hot">
		<u-subsection :list="list" :current="current" @change="changeCurrent()" bg-color="rgb(231, 229, 229)" font-size="35"
		 active-color="#fff" inactive-color="#000" button-color="#626262"></u-subsection>
		<view class="hot_content">
			<!-- 日榜 -->
			<view v-if="current === 0">
				<dayList></dayList>
			</view>
			<!-- 周榜 -->
			<view v-if="current === 1">
				<weekList></weekList>
			</view>
			<!-- 总榜 -->
			<view v-if="current === 2">
				<wholeList></wholeList>
			</view>
		</view>

	</view>
</template>

<script>
	import dayList from '@/components/hotSon/dayList.vue'
	import weekList from '@/components/hotSon/weekList.vue'
	import wholeList from '@/components/hotSon/wholeList.vue'
	import goDetail from '@/components/goDetail.vue'
	export default {
		components: {
			dayList,
			weekList,
			wholeList,
			goDetail
		},
		data() {
			return {
				list: [{
						name: '日榜'
					},
					{
						name: '周榜'
					},
					{
						name: '总榜'
					}
				],
				current: 0
			}
		},
		methods: {
			changeCurrent(index) {
				this.current = index
			}
		}
	}
</script>

<style lang="scss">
</style>
