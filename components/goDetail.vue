<template>
	<view @click="goDetail()">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: ["movieID"],
		methods: {
			goDetail() {
				uni.navigateTo({
					url: ""
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
