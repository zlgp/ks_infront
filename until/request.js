import baseURL from '@/config/config.js';
import Vue from 'vue'
export default (method, url, data) => {
	uni.showLoading({
		title: "加载中"
	})
	return new Promise((resolve, reject) => {
		let header = {}
		const {
			token
		} = uni.getStorageSync('uerInfo');
		if (token) {
			header = {
				'Authorization': 'Bearer ' + token,
			}
		} else {
			header = {}
		}
		uni.request({
			method,
			url: baseURL + url,
			data,
			header,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete(res) {
				// 统一提示信息
				uni.showToast({
					title: res.data.msg,
					icon: "none"
				})
				// 如果状态码为-1,token过期
				if (res.data.code == -1) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					// 清除token等信息,变为未登陆状态
					Vue.prototype.$store.commit("logout");
				}
				uni.hideLoading()
			}
		})
	})
}
