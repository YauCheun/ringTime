<template>
	<view class="content">
		<!-- 顶框 -->
		<view class="top-bar">
			<view  class="top-bar-left" @tap="linkToDetail">
				<image :src="imgurl"></image>
			</view>
<!-- 			<navigator url="../userdetails/userdetails" hover-class="none" class="top-bar-left">
				<image :src="imgurl"></image>
			</navigator> -->

			<view class="top-bar-center">
				<!-- <image src="../../static/images/index/logo.png"></image> -->
			</view>

			<view class="top-bar-right">
				<view class="top-bar-search">
					<image src="../../static/images/index/search.png"></image>
				</view>
				<view class="top-bar-add" @tap="toSearch">
					<image src="../../static/images/index/add.png"></image>
				</view>
			</view>

		</view>
		<!-- 好友信息 -->
		<view class="friends">
			<!-- 好友申请 -->

			<view class="friend-list">
				<view class="friend-list-left">
					<image src="../../static/images/index/apply.png"></image>
					<text class="tip">1</text>
				</view>
				<navigator url="../friendrequest/friendrequest" hover-class="none" class="friend-list-right">
					<view class="top">
						<view class="name">好友申请</view>
						<view class="time">12:12</view>
					</view>
					<view class="message">你有新的好友申请</view>
				</navigator>
			</view>

			<!-- 消息列表 -->
			<view class="friend-list" v-for="(item,index) in friends" :keys="item.id">
				<view class="friend-list-left">
					<image :src="'../../static/images/img/'+item.imgurl" mode=""></image>
					<text class="tip" v-if='item.tip>0&&item.tip<100'>{{item.tip}}</text>
					<text class="tip" v-if='item.tip>99'>99+</text>
				</view>
				<view class="friend-list-right">
					<view class="top">
						<view class="name">{{item.name}}</view>
						<view class="time">{{changeTime(item.time)}}</view>
					</view>
					<view class="message">{{item.news}}</view>
				</view>
			</view>

		</view>
		<view class=".bottom-bar">

		</view>
	</view>
</template>

<script>
	import data from '../../commons/js/datas.js'
	import utils from '../../commons/js/utils.js'
	export default {
		data() {
			return {
				friends: [],
				imgurl: '',
				uid: ''
			}
		},
		onLoad() {
			this.getUserInfo()
			this.getFriend()
		},
		methods: {
			getUserInfo() {
				try {
					let userinfo = uni.getStorageSync('userinfo')
					this.uid = userinfo.id
					this.imgurl = this.$ajax.baseUrl + '/upload/user/' + userinfo.imgurl
				} catch (e) {
					console.log('获取失败')
				}
			},
			getFriend() {
				this.friends = data.friends()
			},
			// 格式化时间
			changeTime(time) {
				return utils.dateTime(time)
			},
			toSearch() {
				uni.navigateTo({
					url: "../search/search",
				})
			},
			linkToDetail(){
				this.$Router.push({ name: 'userdetails'})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
		z-index: 9999;

		.top-bar-left {
			float: left;
			margin-top: 10rpx;
			margin-left: 32rpx;

			image {
				height: 68rpx;
				width: 68rpx;
				border-radius: 16rpx;
			}
		}

		.top-bar-center {
			text-align: center;

			image {
				width: 68rpx;
				height: 68rpx;
			}
		}

		.top-bar-right {
			float: right;
			display: flex;
			margin-top: 18rpx;
			margin-right: 18rpx;

			.top-bar-search {
				width: 52rpx;
				height: 52rpx;
				margin-right: 40rpx;

				image {
					width: 52rpx;
					height: 52rpx;
				}
			}

			.top-bar-add {
				width: 52rpx;
				height: 52rpx;

				image {
					width: 52rpx;
					height: 52rpx;
				}
			}


		}
	}

	.friends {
		position: fixed;
		top: 0;
		bottom: 0;
		overflow-x: hidden;
		overflow-y: scroll;
		top: 108rpx;
		margin-top: var(--status-bar-height);

		.friend-list {
			height: 136rpx;
			width: 750rpx;
			display: flex;

			&:active {
				background-color: #f8f8f8;
			}


			.friend-list-left {
				position: relative;

				image {
					margin-top: 20rpx;
					margin-left: 32rpx;
					width: 96rpx;
					height: 96rpx;
					border-radius: 16rpx;
				}

				.tip {
					min-width: 22rpx;
					min-height: 36rpx;
					background-color: rgba(255, 93, 91, 1);
					border-radius: 20rpx;
					padding: 0 8rpx;
					text-align: center;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 1);
					position: absolute;
					top: 10rpx;
					left: 100rpx;
					z-index: 10;
				}
			}



			.friend-list-right {
				margin-left: 32rpx;
				margin-top: 20rpx;
				margin-right: 32rpx;
				margin-bottom: 20rpx;
				width: 558rpx;

				.top {
					height: 50rpx;

					.name {
						float: left;
						font-size: 36rpx;
						font-weight: 400;
						color: rgba(39, 40, 50, 1);
					}

					.time {
						float: right;
						// margin-right: 32rpx;
						font-size: 24rpx;
						color: #C0C0C0;
						text-align: center;
					}
				}

				.message {
					font-size: 28rpx;
					color: #999;
					height: 40rpx;
					margin-top: 7rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

			}
		}
	}

	.bottom-bar {
		height: 32rpx;
		width: 100%;
		position: fixed;
		z-index: 100;
		bottom: 0;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
