<template>
	<view>
		<!-- topbar结构 -->
		<view class="top-bar">
			<view class="top-bar-back" v-on:click="backOne()">
				<image src="../../static/images/common/back.png" mode=""></image>
			</view>
			<navigator url="../userdetials/Userdetials" hover-class="none" class="top-bar-more">
				<image src="../../static/images/userhome/more.png" mode=""></image>
			</navigator>
		</view>
		<!-- 用户信息部分 -->
		<view class="user-info">
			<!-- 用户头像 -->
			<view class="user-img">
				<!-- <img src="../../static/images/img/b.png" :animation="animationData3" class="img-content"></img> -->
				<image src="../../static/images/img/b.png" mode="" :animation="animationData3" class="img-content">
				</image>
				<!-- 头像中性别 -->
				<view class="user-sex" :style="{backgroundColor:sexBg}" :animation="animationData4">
					<!-- <img src="../../static/images/userhome/female.png" mode=""></img> -->
					<image src="../../static/images/userhome/female.png" mode=""></image>
				</view>
			</view>
			<!-- 用户文本信息 -->
			<view class="user-text">
				<view class="user-name">{{user.name}}</view>
				<view class="nickname">昵称 : {{user.nick}}</view>
				<view class="signature">{{user.intr}}</view>
			</view>
			<!-- 添加好友按钮 -->
		</view>
		<view class="add-user">
			<view class="useraddtext" @tap="addFriendAnimate">加为好友</view>
		</view>
		<!-- 背景渲染 -->
		<view class="bg">
			<view class="bg-white" :animation="animationData5"></view>
			<image src="../../static/images/img/b.png" mode="aspectFill" class="bg-img"></image>
		</view>
		<!-- 添加好友样式 -->
		<view class="add-msg" :style="{height:addHeight+'px',bottom:-+addHeight+'px'}" :animation="animationData">
			<view class="name">{{user.name}}</view>
			<view class="add-text">
				<textarea :value="myname+'请求添加为好友'" placeholder="" maxlength="120" />
			</view>
			<view class="add-operation" :animation="animationData2">
				<view class="cancle" @tap="addFriendAnimate">取消</view>
				<view class="send">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 以下为查看信息到添加好友过渡动画
				animationData: {},
				animationData2: {},
				animationData3: {},
				animationData4: {},
				animationData5: {},
				// 添加好友框显隐
				isAdd: false,
				sexBg: "#FF5D5B", //性别颜色
				myname: "请求者姓名",
				addHeight: "", //add板块高度
				// 用户测试数据
				user: {
					name: "测试用户名",
					nick: "测试昵称",
					intr: "我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,我是签名,",

				},

			}
		},

		onReady() {
			this.getElementStyle();
		},
		methods: {
			// 返回上一级
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 解决边缘模糊，
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
					this.addHeight = data.height - 186;
				}).exec();
			},
			// 动画
			addFriendAnimate() {
				this.isAdd = !this.isAdd;
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",

				});
				var animation2 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",
				});
				var animation3 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",
				});
				var animation4 = uni.createAnimation({
					duration: 100,
					timingFunction: "ease",
				});
				var animation5 = uni.createAnimation({
					duration: 100,
					timingFunction: "ease",
				});
				if (this.isAdd) {
					animation.bottom(0).step();
					animation2.bottom(30).step();
					animation3.width(120).height(120).top(20).left(-80).step();
					animation4.opacity(0).step();
					animation5.backgroundColor(' rgba(255,228,49,0.60)').step()
				} else {
					animation.bottom(-this.addHeight).step();
					animation2.bottom(-100).step();
					animation3.width().height().top(0).left(0).step();
					animation4.opacity(1).step();
					animation5.backgroundColor('rgba(255,228,49,0)').step()
				}

				this.animationData = animation.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
				this.animationData5 = animation5.export()
			}
		},

	}
</script>

<style lang="scss">
	.top-bar {
		padding-top: var(--status-bar-height);
		width: 750rpx;
		height: 88rpx;
		display: flex;
		// background-color: white;
		z-index: 9999;

		.top-bar-back {
			width: 48rpx;
			height: 48rpx;
			z-index: 12;
			// background-color: red;
			margin-left: 34.2rpx;
			margin-top: 21rpx;

			image {
				width: 25.4rpx;
				height: 50.8rpx;
			}
		}

		.top-bar-more {

			z-index: 12;
			// background-color: red;
			margin-top: 19rpx;
			margin-left: 594rpx;

			image {
				width: 52rpx;
				height: 14rpx;
			}
		}
	}

	.user-info {
		width: 750rpx;
		height: 812rpx;
		overflow: hidden;

		// background-color: orange;
		.user-img {
			display: flex;
			justify-content: center;
			position: relative;
			margin-top: 52rpx;

			.img-content {
				z-index: 10;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				top: 0;
				left: 0;
				border: 8rpx solid rgb(255, 255, 255);
				box-shadow: 0rpx 36rpx 40rpx 0rpx rgba(39, 40, 50, 0.1);
			}

			.user-sex {
				z-index: 11;
				width: 64rpx;
				height: 64rpx;
				border-radius: 56rpx;
				// background-color:#FF5D5B ;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 320rpx;
				left: 496rpx;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

		.user-text {
			margin-top: 40rpx;
			// background-color: blue;
			text-align: center;

			.user-name {
				// border: 1rpx solid red;
				width: 100%;
				height: 74rpx;
				font-size: 52rpx;
				color: #272832;
				text-align: center;
			}

			.nickname {
				// border: 1rpx solid red;
				width: 100%;
				height: 40rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				text-align: center;
			}

			.signature {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				margin-top: 20rpx;
				margin-left: 99rpx;
				// border: 1rpx solid red;
				width: 100%;
				width: 552rpx;
				height: 170rpx;
				text-align: center;
			}
		}

	}

	.add-user {
		// background-color: orange;
		border: 1 solid red;
		width: 100%;
		height: 88rpx;
		position: fixed;
		bottom: 60rpx;
		display: flex;
		justify-content: center;

		.useraddtext {
			width: 684rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: $uni-color-primary;
			text-align: center;
			border-radius: 10rpx;
			font-size: 32rpx;
			color: $uni-text-color;
		}
	}

	.bg {
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.bg-white {
			width: 100%;
			height: 100%;
			// background-color: white;
		}

		.bg-img {
			// opacity: 0.4;
			z-index: -1;
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(12rpx);
		}
	}

	.add-msg {
		width: 100%;
		// height: 1250rpx;
		position: fixed;
		// bottom: 0;
		box-sizing: border-box;
		padding: 0 56rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;

		.name {
			padding-top: 168rpx;
			font-size: 52rpx;
			color: #272832;
			font-weight: 400;
			line-height: 74rpx;
		}

		.add-text {
			margin-top: 40rpx;
			padding: 18rpx 22rpx;
			height: 420rpx;
			background-color: $uni-bg-color-grey;
			border-radius: 18rpx;
			font-size: $uni-font-size-lg;
			color: #272832;
			line-height: 44rpx;
		}

		.add-operation {
			width: 100%;
			height: 88rpx;
			position: fixed;
			bottom: -88rpx;
			display: flex;
			justify-content: center;

			.cancle {
				width: 172rpx;
				height: 80rpx;
				margin-left: -110rpx;
				line-height: 80rpx;
				background-color: rgb(233, 233, 234);
				text-align: center;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #272832;
			}

			.send {
				width: 480rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-left: 32rpx;
				background-color: #FFE431;
				text-align: center;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #272832;
			}
		}
	}
</style>
