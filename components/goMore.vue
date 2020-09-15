<template>
	<view class="" @click="goMore()">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: ["sid"],
		mounted() {
		
		},
		methods: {
			goMore() {
					console.log(this.sid)
				// 跳转到更多的页面
				uni.navigateTo({
					url: ""
				})
			}
		}
	}
</script>

<style>
</style>
