import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import request from './until/request.js'
import md5 from 'js-md5'
Vue.prototype.request=request
Vue.prototype.md5=md5
Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
