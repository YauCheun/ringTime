<template>
	<view>
		<view class="top-bar">
			<view class="search">
				<input type="text" placeholder="搜索用户/群" class="search-text" @input="search" />
				<image src="../../static/images/search/search.png"></image>
			</view>
			<view class="adduser-cancle" @tap="backOne">取消</view>
		</view>
		<view class="result-show">
			<view class="user-show">
				<view class="user-show-tip" v-if="userarr.length>0">用户</view>
				<view class="user-show-message" v-for="(item,index) in userarr" :key="index">
					<!-- 设置点击跳转用户中心界面 -->
					<navigator url="../userhome/userhome?id=aaa" hover-class="none">
						<image :src="item.imgurl" mode=""></image>
					</navigator>
					<view class="username" v-html="item.name">
						<view class="search-word"></view>
					</view>
					<view class="email" v-html="item.email"></view>
					<view class="operation-send" v-if="item.tip==1">发消息</view>
					<view class="operation-add" v-if="item.tip==0" @tap="toAddUser">加好友</view>
				</view>
				<view class="line" v-if="userarr.length>0"></view>

			</view>


			<view class="group-show">
				<view class="user-show-tip" v-if="groupArr.length>0">群组</view>

				<view class="user-show-message" v-for="(item,index) in groupArr" :key="index">
					<image :src="item.imgurl" mode=""></image>
					<view class="groupname" v-html="item.groupName"></view>
					<view class="operation-send" v-if="item.tip==1">发消息</view>
					<view class="operation-add" v-if="item.tip==0">加入群</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myfuns from '../../commons/js/myfun.js'
	export default {
		data() {
			return {
				userarr: [],
				groupArr: [],
			}
		},
		methods: {
			//获取搜索好友关键词
			search:myfuns.debounce(function(e) {
				this.userarr = []; //每次更新前需要清空
				this.groupArr = [];
				let searchval = e.detail.value;
				if (searchval.length > 0) {
					this.searchUser(searchval)
				}
			}, 500),
			//寻找关键词匹配的好友
			searchUser(e) {
				console.log(1)
				let arr = datas.friends();
				let arr1 = datas.groups();
				let exp = eval("/" + e + "/g");
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
						this.isFriend(arr[i]);
						arr[i].imgurl = '../../static/images/img/' + arr[i].imgurl;
						arr[i].name = arr[i].name.replace(exp, "<span style='color:rgba(74,170,255,1);'>" + e +
							"</span>");
						arr[i].email = arr[i].email.replace(exp, "<span style='color:rgba(74,170,255,1);'>" + e +
							"</span>");
						this.userarr.push(arr[i]);
					}
				};
				for (let i = 0; i < arr1.length; i++) {
					if (arr1[i].groupName.search(e) != -1) {
						this.isGroup(arr1[i]);
						arr1[i].imgurl = '../../static/images/img/' + arr1[i].imgurl;
						arr1[i].groupName = arr1[i].groupName.replace(exp, "<span style='color:rgba(74,170,255,1);'>" +
							e +
							"</span>");
						this.groupArr.push(arr1[i]);
					}
				}
			},

			//判断是否为好友
			isFriend(e) {
				let tip = 0;
				let arr = datas.isFriend();
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].friendid == e.id) {
						tip = 1;
					}
				}
				e.tip = tip;
				// console.log(e.tip);
			},
			//判断是否为已加入的群
			isGroup(e) {
				let tip = 0;
				let arr = datas.isGroup();
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].groupid == e.id) {
						tip = 1;
					}
				}
				e.tip = tip;
				// console.log(e.tip);
			},
			//返回首页
			backOne() {
				uni.navigateBack({
					delta: 1
				});
			},
			toAddUser() {
				this.$Router.replace({
					name: 'register',
					query: {
						user: this.user
					}
				})
				uni.navigateTo({
					url: "../userhome/Userhome",
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
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		padding-top: var(--status-bar-height);
		z-index: 9999;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);

		.search {
			width: 600rpx;
			height: 60rpx;
			background-color: #F3F4F6;
			border-radius: 8rpx;
			margin-top: 14rpx;
			margin-left: 32rpx;
			display: flex;

			.search-text {
				line-height: 40rpx;
				width: 500rpx;
				height: 40rpx;
				margin-left: 32rpx;
				margin-top: 7rpx;

			}

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 12rpx;
				margin-top: 8rpx;
			}
		}

		.adduser-cancle {
			margin-left: 30rpx;
			line-height: 88rpx;
			text-align: center;
			font-size: 28rpx;
			color: #272832;
		}
	}

	.result-show {
		padding-top: var(--status-bar-height);
		margin-top: 88rpx;
		// border: 1px solid red;
		position: fixed;
		top: 0;
		bottom: 0;
		overflow-x: hidden;
		overflow-y: scroll;

		.user-show-tip {
			margin-top: 34rpx;
			margin-left: 32rpx;
			font-size: 44rpx;
			color: #272832;
		}

		.user-show-message {
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			width: 750rpx;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			position: relative;

			image {
				margin-left: 32rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 16rpx;
			}

			.username {
				font-size: 36rpx;
				color: #272832;
				margin-top: -15rpx;
				margin-left: 32rpx;
			}

			.groupname {
				font-size: 36rpx;
				color: #272832;
				margin-left: 32rpx;
			}

			.email {
				position: absolute;
				left: 144rpx;
				top: 25rpx;
				font-size: 23rpx;
			}

			.search-word {
				display: inline;
				color: rgba(74, 170, 255, 1);
			}

			.operation-send {
				width: 120rpx;
				height: 48rpx;
				line-height: 48rpx;
				background-color: #FFE431;
				border-radius: 22rpx;
				text-align: center;
				font-size: 24rpx;
				color: #272832;
				margin-top: 16rpx;
				position: absolute;
				right: 32rpx;
			}

			.operation-add {
				width: 120rpx;
				height: 48rpx;
				line-height: 48rpx;
				background-color: rgba(74, 170, 255, 0.1);
				border-radius: 22rpx;
				text-align: center;
				font-size: 24rpx;
				color: rgba(74, 170, 255, 1);
				margin-top: 16rpx;
				position: absolute;
				right: 32rpx;
			}
		}
	}

	.line {
		width: 750rpx;
		height: 26rpx;
	}
</style>
