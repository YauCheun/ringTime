<template>
	<view>

		<!-- 顶框 -->
		<view class="top-bar">
			<view class="top-bar-left" @tap="toLogin">
				<image class="back-img" src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="text">
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
			<view class="inputs">
				<!-- 用户名输入框 -->
				<view class="userinput">
					<input type="text" placeholder="请取个名字" class="user" @input="getUser" />
					<view class="usertip" v-if="useremploy">用户名已有</view>
					<view class="imgpd">
						<image src="../../static/images/sign/right1.png" v-if="isuser"></image>
					</view>
				</view>

				<view class="line"></view>
				<!-- 邮箱输入框 -->
				<view class="emailinput">
					<input type="text" placeholder="请输入邮箱" class="email" @input="isEmail" />
					<view class="emailtip" v-if="emailemploy">邮箱被占用</view>
					<view class="emailtip" v-if="invalid">该邮箱无效</view>
					<view class="imgpd">
						<image src="../../static/images/sign/right1.png" v-if="isemail"></image>
					</view>
				</view>


				<view class="line"></view>
				<!-- 密码输入框 -->
				<view class="passwordinput">
					<input :type="type" placeholder="这里输入密码" class="password" @input="getPwd" />
					<view class="imgpd">
						<image src="../../static/images/sign/look.png" class="look" v-if="look" @tap="looks"></image>
						<image src="../../static/images/sign/biyan.png" class="ulook" v-if="!look" @tap="looks"></image>
					</view>
				</view>


				<view class="line"></view>
			</view>

			<view :class="['submit',{'isSubmit': isSubmit}]">注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password',
				useremploy: false, //名字是否被占用
				isuser: true, //名字是否可用
				invalid: false, //邮箱是否有效
				emailemploy: false, //邮箱是否被占用
				isemail: false, //邮箱是否可用
				look: false, //密码可见性
				email: '', //邮箱
				user: '',
				pwd: '',
				isok: false,
				isSubmit: false
			}
		},
		methods: {
			isEmail(e) {
				let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
				this.email = e.detail.value;
				if (this.email.length > 0) {
					if (reg.test(this.email)) {
						console.log("正确");
						this.isemail = true;
						this.invalid = false;
					} else {
						console.log("不正确");
						this.invalid = true;
						this.isemail = false;
					}
				}
			},
			getPwd(e) {
				this.pwd = e.detail.value;
				this.isOk();
				// console.log(this.pwd)
			},
			looks() {
				if (this.look) {
					this.type = "password";
					this.look = !this.look;
				} else {
					this.type = "text";
					this.look = !this.look;
				}
			},
			getUser(e) {
				this.user = e.detail.value;
				this.isOk();
				// console.log(this.user);
			},
			isOk() {
				if (this.isuser && this.isemail && this.pwd.length > 5) {
					this.isSubmit = true;
				} else {
					this.isSubmit = false;
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login",
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background-color: $uni-bg-color;
		// box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
		// border-bottom: 1px solid $uni-border-color;
		z-index: 9999;

		.top-bar-left {
			float: left;
			display: flex;
			margin-top: 20rpx;
			margin-left: 24rpx;

			image {
				width: 26rpx;
				height: 46rpx;
			}

		}

		.top-bar-right {
			float: right;
			padding-right: 32rpx;

			.text {
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
			}
		}
	}

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

		.inputs {
			margin-top: 64rpx;

			.userinput {
				display: flex;

				.user {
					font-size: 32rpx;
					line-height: 44rpx;
					width: 460rpx;
					// border: 1rpx solid red;
				}

				.usertip {
					// display: none;
					margin-left: 18rpx;
					font-size: 28rpx;
					line-height: 44rpx;
					text-align: center;
					color: rgba(255, 93, 91, 1);
				}

				.imgpd {
					height: 44rpx;
					line-height: 44rpx;
					margin-left: 126rpx;

					image {
						margin-top: 8rpx;
						width: 42rpx;
						height: 32rpx;
					}
				}
			}

			.emailinput {
				margin-top: 52rpx;
				display: flex;

				.email {
					// display: none;
					font-size: 32rpx;
					line-height: 44rpx;
					width: 460rpx;
					// border: 1rpx solid red;
				}

				.emailtip {
					margin-left: 18rpx;
					font-size: 28rpx;
					line-height: 44rpx;
					text-align: center;
					color: rgba(255, 93, 91, 1);
				}

				.imgpd {
					// display: none;
					height: 44rpx;
					line-height: 44rpx;
					margin-left: 126rpx;

					// border: 1rpx solid red;
					image {
						margin-top: 8rpx;
						width: 42rpx;
						height: 32rpx;
					}
				}
			}

			.passwordinput {
				margin-top: 52rpx;
				display: flex;

				.password {
					font-size: 32rpx;
					line-height: 44rpx;
					width: 460rpx;
					// border: 1rpx solid red;
				}

				.imgpd {
					height: 44rpx;
					line-height: 44rpx;
					margin-left: 128rpx;

					.look {
						margin-top: 8rpx;
						width: 40rpx;
						height: 22rpx;
					}

					.ulook {
						margin-top: 8rpx;
						width: 42rpx;
						height: 22rpx;
					}
				}
			}

			.line {
				margin-top: 22rpx;
				width: 627rpx;
				height: 1rpx;
				background-color: #999;
			}
		}

		.submit {
			position: absolute;
			top: 572rpx;
			left: 53rpx;
			width: 520rpx;
			height: 96rpx;
			background-color: rgba(39, 40, 50, 0.2);
			color: rgba(255, 255, 255, 1);
			box-shadow: 0px 50rpx 32rpx -36rpx rgbargba(255, 228, 49, 0.4);
			border-radius: 48rpx;
			font-size: 32rpx;
			font-weight: 550;
			line-height: 96rpx;
			text-align: center;
		}

		.isSubmit {
			background-color: $uni-color-primary;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
