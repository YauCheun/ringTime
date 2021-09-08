<template>
	<view>
		<!-- topbar结构 -->
		<view class="fix">
			<view class="top-bar">
				<view class="top-bar-back" v-on:click="backOne()">
					<image src="../../static/images/common/back.png" mode=""></image>
				</view>
				<view class="top-bar-center">好友请求</view>
			</view>
		</view>
		<!-- 请求内容主体 -->
		<view class="request-main" v-for="item in friendRequest" :key="item.id">
			<view class="userImg">
				<image :src="item.imgurl" mode=""></image>
			</view>
			<!-- 请求信息 -->
			<view class="requestInfo">
				<!-- 请求处理 -->
				<view class="requestManage">
					<view class="requestRefuse">
						拒绝
					</view>
					<view class="requestAccept">
						同意
					</view>
				</view>
				<!-- 请求人昵称，时间 -->
				<view class="requestUser">
					<view class="requestUserName">
						{{item.requestUserName}}
					</view>
					<view class="requestTime">
						2021-08-19
					</view>
				</view>
				<!-- 请求留言 -->
				<view class="requestMessage">
					<view class="requestMessageWord">
						{{item.requestMessageWord}}
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'

	export default {
		data() {
			return {
				friendRequest: []
			}
		},
		onLoad() {
			this.getFriends();
		},
		methods: {
			// 获取添加好友请求信息
			getFriends() {
				this.friendRequest = datas.friedsRequest();
				for (let i = 0; i < this.friendRequest.length; i++) {
					this.friendRequest[i].imgurl = '../../static/images/img/' + this.friendRequest[i].imgurl;
				}
				console.log(this.friendRequest);
			},
			// 返回上一级
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
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
				font-size: 36rpx;
				color: $uni-text-color;
			}
		}

	}

	.request-main {
		// border: 1px solid red;
		width: 100%;
		height: 480rpx;
		box-sizing: border-box;
		padding: 32rpx;
		margin-top: 64rpx;
		margin-bottom: 32rpx;
		position: relative;
		bottom: 32rpx;

		// 用户头像
		.userImg {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			box-shadow: 0rpx 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.3);
			border-radius: 50%;

			image {
				display: block;
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
				background-color: rgba(255, 228, 49, 1);
			}
		}

		// 用户请求信息
		.requestInfo {
			position: absolute;
			bottom: 0;
			width: 686rpx;
			height: 388rpx;
			box-shadow: 0rpx 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.3);
			border-radius: 40rpx;
			box-sizing: border-box;

			// 处理框
			.requestManage {
				width: 100%;
				display: flex;
				justify-content: space-between;

				// 请求拒绝按钮样式
				.requestRefuse,
				.requestAccept {
					width: 160rpx;
					height: 64rpx;
					line-height: 64rpx;
					background-color: red;
					border-radius: 40rpx;
					margin: 32rpx;
					font-size: 32rpx;
					font-weight: 400;
					text-align: center;
				}

				.requestRefuse {
					background-color: rgba(255, 93, 91, 0.1);
					color: $uni-color-warning;
					font-weight: 600;
				}

				.requestAccept {
					background-color: $uni-color-primary;
					color: $uni-text-color;
					font-weight: 600;
				}
			}

			// 请求添加好友用户信息
			.requestUser {
				width: 100%;
				height: 100rpx;
				text-align: center;
				margin-top: -25rpx;

				.requestUserName {
					font-size: 36rpx;
					font-weight: 600;
					color: rgb(39, 40, 50);
				}

				.requestTime {
					margin-top: 15rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(39, 40, 50, 0.4);
				}
			}

			.requestMessage {
				width: 622rpx;
				height: 150rpx;
				background-color: rgba(243, 244, 246, 1);
				margin-left: 32rpx;
				border-radius: 40rpx;
				margin-top: 15rpx;
				padding: 20rpx;
				box-sizing: border-box;
				.requestMessageWord{
					font-size: 32rpx;
					font-weight: 500;
					color: rgb(39, 40, 50);
					line-height: 60rpx;
				}
			}
		}
	}
</style>
