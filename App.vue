<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			uni.getStorage({
				key: 'uerInfo',
				success: res => {
					this.login(res.data);
				}
			});
		},
		methods: {
			...mapMutations(['login'])
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	body {
		background-color: #f4f1f4 !important;
	}
		@import "uview-ui/index.scss";
</style>
