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
					url:`../movieDetail/movieDetail?id=${this.movieID}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
