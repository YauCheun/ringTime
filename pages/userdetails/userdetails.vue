<template>
	<view>
		<!-- topbar结构 -->
		<view class="fix">
			<view class="top-bar">
				<view class="top-bar-back" v-on:click="backOne()">
					<image src="../../static/images/common/back.png" mode=""></image>
				</view>
				<view class="top-bar-center">详情</view>
			</view>
		</view>

		<!-- 详情主体 -->
		<view class="main">
			<!-- 头像 -->
			<view class="avatar">
				<view class="avatarTitle">头像</view>
				<view class="avatarImg">
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					<image :src="dataArr.cropFilePath" @tap="upload"></image>
					<!-- <image :src="imgUrl" mode=""></image> -->
				</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<!-- 签名 -->
			<view class="signature" @tap="editInfo(dataArr.signature,false,editDataNameObj.signature)">
				<view class="signatureTitle">签名</view>
				<view class="signatureWord">{{dataArr.signature}}</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<!-- 注册时间 -->
			<view class="register">
				<view class="registerTitle">注册</view>
				<view class="registerWord">{{dataArr.register | timeFormat}}</view>
			</view>
			<!-- 昵称 -->
			<view class="nickname" @tap="editInfo(dataArr.nickname,false,editDataNameObj.nickname)">
				<view class="nicknameTitle">昵称</view>
				<view class="nicknameWord">{{dataArr.nickname}}</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<view class="sex">
				<view class="sexTitle">性别</view>
				<view class="sexWord">
					<!-- 性别选择器 -->
					<picker @change="sexPickerChange" :value="index" :range="sexArray">
						<view class="uni-input">{{sexArray[index]}}</view>
					</picker>
				</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<view class="birthday">
				<view class="birthdayTitle">生日</view>
				<view class="birthdayWord">
					<!-- 日期选择器 -->
					<picker mode="date" :value="birthdayDate" :start="startDate" :end="endDate"
						@change="birthdayDateChange">
						<view class="uni-input">{{birthdayDate}}</view>
					</picker>
				</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<view class="phoneNumber" @tap="editInfo(dataArr.phoneNumber,false,editDataNameObj.phoneNumber)">
				<view class="phoneNumberTitle">电话</view>
				<view class="phoneNumberWord">{{dataArr.phoneNumber}}</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<view class="email" @tap="editInfo(dataArr.email,false,editDataNameObj.email)">
				<view class="emailTitle">邮箱</view>
				<view class="emailWord">{{dataArr.email}}</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
			<view class="password" @tap="editInfo(dataArr.password,true,editDataNameObj.password)">
				<view class="passwordTitle">密码</view>
				<view class="passwordWord">{{dataArr.password}}</view>
				<view class="go">
					<image src="../../static/images/common/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="quitApp">
			退出应用
		</view>

		<!-- 弹出层 -->
		<view class="edit" :style="{bottom:-+editHeight+'px'}" :animation="animationData">
			<view class="edit-top-bar">
				<view class="edit-top-cancle" @tap="editInfo">
					取消
				</view>
				<view class="edit-top-title">
					{{this.editDataName}}
				</view>
				<view class="edit-top-confirm" @tap="editConfirm">
					确定
				</view>
			</view>
			<view class="edit-textArea">
				<input type="text" v-if="isPwd" v-model="pwd" placeholder="请输入原密码" class="edit-pwd" />
				<textarea v-model="editData" placeholder="这是要修改的内容" class="edit-text" />
			</view>
		</view>

	</view>
</template>

<script>
	// 引入图片裁剪工具
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue"
	// 引入时间格式化工具
	import myfuns from "../../commons/js/myfun.js"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 模拟数据
				dataArr: {
					cropFilePath: '../../static/images/img/d.png',
					signature: '我是法外狂徒',
					register: new Date(),
					nickname: '张三',
					sex: '男',
					birthday: '',
					phoneNumber: '17671176439',
					email: '2524339178@qq.com',
					password: '*****',
				},
				editDataNameObj: {
					signature: '签名',
					nickname: '昵称',
					phoneNumber: '电话',
					email: '邮箱',
					password: '密码'
				},
				// 原密码
				pwd: '',
				// 修改数据
				editData: '',
				// 修改数据的名称
				editDataName: '',
				// 头像链接2
				// cropFilePath: '../../static/images/img/d.png',
				tempFilePath: "",
				// 性别数组
				sexArray: ['男', '女', '保密'],
				index: 0,
				// 生日
				birthdayDate: currentDate,
				// 以下为修改信息过渡动画
				animationData: {},
				// 是否修改
				isEdit: false,
				// 页面高度
				editHeight: '',
				// 状态栏高度
				StatusBar: '',
				// 是否密码框
				isPwd: false
			}
		},
		components: {
			ImageCropper,
		},
		filters: {
			timeFormat(value) {
				let old = new Date(value);
				// 获取过去时间
				let d = old.getTime();
				let h = old.getHours();
				let m = old.getMinutes();
				let Y = old.getFullYear();
				let M = old.getMonth() + 1;
				let D = old.getDate();
				// 处理时间
				if (M < 10) {
					M = '0' + M
				}
				if (D < 10) {
					D = '0' + D
				}
				if (h < 10) {
					h = '0' + h;
				}
				if (m < 10) {
					m = '0' + m;
				}
				return Y + '-' + M + '-' + D + '-' + h + ':' + m;
			}
		},
		methods: {
			// 返回上一级
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 性别选择器
			sexPickerChange(e) {
				this.index = e.target.value
				this.dataArr.sex = this.sexArray[this.index]
			},
			// 生日日期选择器
			birthdayDateChange: function(e) {
				this.birthdayDate = e.target.value
				this.dataArr.birthday = this.birthdayDate
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 图片裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift();
					},
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.dataArr.cropFilePath = e.detail.tempFilePath;

				// #ifdef APP-PLUS||MP
				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.cropFilePath,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
					},

					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});

				// #endif
			},
			cancel() {
				console.log("canceled");
				this.tempFilePath = "";
			},
			// 修改项弹框
			editInfo(data, isPwd, editDataName) {
				if (!isPwd) {
					this.editData = data
				}
				this.editDataName = editDataName
				this.isEdit = !this.isEdit;
				this.isPwd = isPwd
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",
				});
				if (this.isEdit) {
					animation.bottom(-this.StatusBar).step();
				} else {
					animation.bottom(-this.editHeight).step();
				}
				this.animationData = animation.export()
			},
			// 修改框确定
			editConfirm() {
				this.editInfo()
				// console.log(this.dataArr)
			},
			// 获取页面高度
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.edit').boundingClientRect(data => {
					this.editHeight = data.height;
					// 获取状态栏高度
					this.StatusBar = uni.getSystemInfoSync().statusBarHeight
					// console.log(this.editHeight)
				}).exec();
			},
		},
		onReady() {
			this.getElementStyle();
		},
		// 计算属性
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
	}
</script>

<style lang="scss">
	/* 顶部bar */
	.fix {
		padding-top: var(--status-bar-height);
		width: 750rpx;
		height: 88rpx;

		.top-bar {
			// border:1px solid red;
			padding-top: var(--status-bar-height);
			width: 750rpx;
			height: 88rpx;
			display: flex;
			z-index: 1003;
			position: fixed;
			top: 0;
			background-color: rgb(255, 255, 255);
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

			.top-bar-back {
				width: 48rpx;
				height: 48rpx;
				z-index: 12;
				margin-left: 34.2rpx;
				margin-top: 21rpx;

				image {
					width: 25.4rpx;
					height: 50.8rpx;
				}
			}

			.top-bar-center {
				text-align: center;
				position: absolute;
				padding-top: var(--status-bar-height);
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 40rpx;
				color: #272832;
			}
		}

	}

	.go {
		image {
			width: 20rpx;
			height: 28rpx;
		}

		position: absolute;
		right: 26rpx;
	}

	// 主体区域
	.main {
		margin-top: 42rpx;
		padding: 0 34rpx;
		position: relative;

		// 头像
		.register,
		.avatar,
		.signature,
		.nickname,
		.sex,
		.birthday,
		.phoneNumber,
		.email,
		.password {
			display: flex;
			width: 100%;
			height: 130rpx;
			align-items: center;
			box-sizing: border-box;

			.registerTitle,
			.avatarTitle,
			.signatureTitle,
			.nicknameTitle,
			.sexTitle,
			.birthdayTitle,
			.phoneNumberTitle,
			.emailTitle,
			.passwordTitle {
				color: #272832;
				font-size: 32rpx;
				font-weight: 500;
			}

			.registerWord,
			.avatarImg,
			.signatureWord,
			.nicknameWord,
			.sexWord,
			.birthdayWord,
			.phoneNumberWord,
			.emailWord,
			.passwordWord {
				align-items: center;
				margin-left: 32rpx;
				color: rgba(39, 40, 50, 0.60);
				font-size: 32rpx;

				image {
					display: block;
					width: 104rpx;
					height: 104rpx;
					border-radius: 10rpx;
				}
			}
		}

		.register,
		.email,
		.password {
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		}
	}

	.quitApp {
		border: 1 solid red;
		width: 684rpx;
		height: 88rpx;
		position: relative;
		top: 42rpx;
		left: 33rpx;
		line-height: 80rpx;
		color: #FF5D5B;
		text-align: center;
		font-size: 32rpx;
		border-radius: 5rpx;
	}

	// 弹出层样式
	.edit {
		margin-top: var(--status-bar-height);
		position: fixed;
		left: 0;
		z-index: 1005;
		width: 100%;
		height: 100%;
		background-color: white;

		.edit-top-bar {
			// border: 1px solid red;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 32rpx;

			.edit-top-cancle {
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #272832;
			}

			.edit-top-title {
				font-family: PingFangSC-Regular;
				font-size: 40rpx;
				color: #272832;
			}

			.edit-top-confirm {
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #4AAAFF;
			}
		}

		.edit-textArea {
			padding: 32rpx;
			// border: 1px solid red;
			height: 386rpx;

			.edit-text,
			.edit-pwd {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				background-color: #F3F4F6;
				padding: 22rpx;
				border-radius: 20rpx;
				font-family: PingFangSC-Regular;
				font-size: 32rpx;
				color: #272832;
			}

			.edit-pwd {
				height: 90rpx;
				margin-bottom: 32rpx;
			}
		}
	}
</style>
