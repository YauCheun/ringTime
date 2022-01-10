<template>
	<view>

		<!-- 顶框 -->
		<view class="top-bar">
			<view class="top-bar-right">
				<view class="text" @tap="toRegister">
					注册
				</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/sign/logo.png"></image>
		</view>
		<view class="main">
			<view class="title">
				登录
			</view>
			<view class="slogan">
				您好，欢迎来到 RINGTIME ！
			</view>
			<view class="inputs">
				<input v-model="user" type="text" placeholder="用户名/邮箱" class="user"
					placeholder-style="color: #aaa;font-weight: 400;" />
				<view class="line"></view>
				<input v-model="pwd" type="password" placeholder="密码" class="password"
					placeholder-style="color: #aaa;font-weight: 400;" @input="isShowErr = false" />
				<view class="line"></view>
			</view>
			<view class="submit" @tap="login">登录</view>
			<view v-if="isShowErr" class="tips">用户名或密码错误</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				pwd: '',
				isShowErr: false
			}
		},
		onLoad: function() {
			const user =this.$Route.query.user
			if (user) {
				this.user = user
				uni.showToast({
					title: "注册成功请登录",
					icon: 'none',
					duration: 2000
				})
			}
		},
		methods: {
			//跳转注册页面
			toRegister() {
				this.$Router.push({ name: 'register'})
			},

			login(e) {
				if (this.user && this.pwd) {
					this.$ajax.baseRequest({
						url: '/signin/login',
						method: 'post'
					}, {
						data: this.user,
						psw: this.pwd
					}).then(res => {
						// 成功则跳转到登录
						if (res.success === false) {
							this.isShowErr = true
							uni.showToast({
								title: res.resultmsg,
								icon: 'none',
								duration: 2000
							})
						} else {
							try{
								uni.setStorageSync('userinfo',res.data)
								console.log(uni.getStorageSync('userinfo'))
								this.$Router.push({ name: 'index'})
							}catch(e){
								console.log('数据存储失败！')
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../commons/css/mycss.scss';
	// .top-bar {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 88rpx;
	// 	padding-top: var(--status-bar-height);
	// 	background-color: $uni-bg-color;
	// 	// box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
	// 	// border-bottom: 1px solid $uni-border-color;
	// 	z-index: 9999;

	// 	.top-bar-right {
	// 		float: right;
	// 		padding-right: 32rpx;

	// 		.text {
	// 			font-size: $uni-font-size-lg;
	// 			font-weight: 500;
	// 			color: $uni-text-color;
	// 			line-height: 88rpx;
	// 		}
	// 	}
	// }

	.logo {
		position: absolute;
		top: 168rpx;
		left: 329rpx;

		image {
			width: 92rpx;
			height: 92rpx;
		}
	}

	.main {
		position: relative;
		top: 314rpx;
		left: 62rpx;
		right: 62rpx;

		.title {
			font-size: 56rpx;
			line-height: 80rpx;
			font-weight: 600;
		}

		.slogan {
			margin-top: 14rpx;
			font-size: 40rpx;
			color: #999;
			line-height: 56rpx;
		}

		.inputs {
			margin-top: 72rpx;

			.user {
				font-size: 32rpx;
				line-height: 56rpx;
			}

			.line {
				margin-top: 20rpx;
				width: 627rpx;
				height: 1rpx;
				background-color: #999;
			}

			.password {
				margin-top: 80rpx;
			}
		}

		.submit {
			position: absolute;
			top: 538rpx;
			left: 53rpx;
			width: 520rpx;
			height: 96rpx;
			background-color: rgba(255, 228, 49, 1);
			box-shadow: 0px 50rpx 32rpx -36rpx rgbargba(255, 228, 49, 0.4);
			border-radius: 48rpx;
			font-size: 32rpx;
			font-weight: 550;
			line-height: 96rpx;
			text-align: center;
		}

		.tips {
			float: left;
			font-size: 32rpx;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
	}
</style>
