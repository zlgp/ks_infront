<template>
	<view class="car">

		<view class="car_content">
			<u-checkbox-group :wrap="true">
				<u-checkbox @change="checkboxChange()" v-model="item.checked" v-for="(item, index) in carList" :key="index" :name="item.price"
				 :detail='item.checked' shape="circle">
					<view class="checkbox">
						<view class="img_box">
							<u-image width="100%" height="300rpx" :lazy-load="true" :border-radius="5" :src="item.epi_cover" bg-color="#ffffff"></u-image>
						</view>
						<view class="checkbox_msg">
							<view class="title">
								{{item.title}}
								第{{item.epi_curr}}集
							</view>
							<view class="">
								时长:{{item.show_time}}s
							</view>

							<view class="">
								水印类型:{{item.rule_title}}
							</view>
							<view class="">
								项目:{{item.web_title}}
							</view>
						</view>
					</view>
				</u-checkbox>

			</u-checkbox-group>


			<view class="operation">
				<u-button @click="checkedAll" size="mini">全选/反选</u-button>
				<u-button size="mini" @click="del()">删除</u-button>
				<view class="">
					合计:${{total}}
				</view>
				<view class="">
					<u-button @click="checkedAll" size="mini">下单:{{total_num}}</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carList: [],
				// 全选或者反选的识别
				checkall: false,
				// 总额
				total: 0,
				// 全选的数量
				total_num: 0,
				id_list: []
			}
		},
		onShow() {
			this.getCarList()
		},
		methods: {
			// 获取购物车影片
			getCarList() {
				this.request('post', '/getCarList').then(res => {
					this.carList = res.data
				})
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				if (e.value == true) {
					this.total_num -= 1
					this.total -= parseInt(e.name)
				} else {
					this.total_num += 1
					this.total += parseInt(e.name)
				}
				this.id_list = []
				this.carList.forEach((element) => {
					if (element.checked == true) {
						this.id_list.push(element.audio_id)
					}
				})
			},
		
			// 全选
			checkedAll() {
				// 全选都为0,再去加
				this.total_num = 0
				this.total = 0
				if (this.checkall == false) {
					this.checkall = true
					this.id_list = []
					this.carList.map(val => {
						val.checked = true;
						if (val.checked = true) {
							this.total_num++
							this.total += parseInt(val.price)
							this.id_list.push(val.audio_id)
						}
					})

				} else {
					this.checkall = false
					this.id_list = []
					this.carList.map(val => {
						val.checked = false;
					})
					this.total_num = 0
					this.total = 0
				}
			},
			async del(){
				await this.request('post','/deletById',{audio_id:this.id_list}).then(res=>{})
			    await this.getCarList()
			}
		}
	}
</script>

<style lang="scss">
	.car {
		.car_content {
			padding: 30rpx;

			.checkbox {
				display: flex;
				width: 100vw;
				align-items: center;
				margin-top: 30rpx;
				background-color: #FFFFFF;
				padding: 20rpx 0rpx;

				.img_box {
					width: 40%;
				}

				.checkbox_msg {
					height: 300rpx;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30rpx;

					view {
						color: #000;
						font-size: 25rpx;
					}

					.title {
						width: 300rpx;
						font-size: 35rpx;
						font-weight: bold;
						overflow: hidden;

						text-overflow: ellipsis;

						white-space: nowrap;
					}
				}
			}

			.operation {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				background-color: #fff;
				margin-top: 50rpx;
				padding-left: 20rpx;
				justify-content: space-around;
			}
		}
	}
</style>
