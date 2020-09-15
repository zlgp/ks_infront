// 请求的域名
let baseURL = ""
if (process.env.NODE_ENV == "development") {
	baseURL = "http://localhost:3000"
} else {}

module.exports = baseURL
