<template>
	<view>

		<!-- 顶框 -->
		<view class="top-bar">
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
			<view class="slogan">
				您好，欢迎来到RINGTIME
			</view>
		</view>
	</view>
</template>

<script>
	export default {

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
</style>
