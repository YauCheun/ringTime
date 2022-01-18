<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/images/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					{{this.fname}}
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
				<view class="group-img" v-if="type == 0">
					<image :src="fimgurl"></image>
				</view>
			</view>
		</view>
		<scroll-view class="chat" scroll-y="true" :scroll-with-animation="swanition" :scroll-into-view="scrollToView"
			@scrolltoupper="nextPage()">
			<view class="chat-main" :style="{paddingBottom:inputh + 'px'}">
				<view class="loading" :class="{displaynone:isloading}">
					<image src="../../static/images/common/loading.png" class="loading-img" :animation="animationData">
					</image>
				</view>
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="'msg'+item.id">
					<view class="chat-time" v-if="item.sendtime!=''">{{changeTime(item.sendtime)}}</view>
					<view class="msg-m msg-left" v-if="item.fromId === fid">
						<image :src="fimgurl" class="user-img-l"></image>
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.types == 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)">
							</image>
						</view>
						<view class="message" v-if="item.types == 2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}"
								@tap="playVoice(item.message.voice)">
								<image src="../../static/images/chatroom/yy.png" class="voice-img"></image>
								{{item.message.time}}″
							</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types == 3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image src="../../static/images/chatroom/map.png" mode="aspectFit" class="map-img">
								</image>
								<!--<view class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)">{{item.message.longitude}}</view>-->
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-else>
						<image :src="uimgurl" class="user-img-r"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types == 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)">
							</image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types == 2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}"
								@tap="playVoice(item.message.voice)">
								{{item.message.time}}″
								<image src="../../static/images/chatroom/yy.png" class="voice-img"></image>
							</view>
						</view>
						<!-- 位置 -->
						<view class="message" style="padding-right: 78rpx;" v-if="item.types == 3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<image src="../../static/images/chatroom/map.png" mode="aspectFit" class="map-img">
								</image>
								<!--<view class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)">{{item.message.longitude}}</view>-->
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--<view class="padbt"></view>-->
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import utils from '../../commons/js/utils.js'
	import submit from '../../components/submit/Submit.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				scrollTop: 0,
				uid: '',
				uimgurl: '',
				token: '',
				uname: '',
				fid: '',
				fname: '小明',
				fimgurl: '',
				type: 0, //0为好友，1为群
				msgs: [],
				imgMsg: [],
				scrollToView: '',
				oldTime: new Date(),
				inputh: '72',
				animationData: {},
				nowpage: 0,
				pageSize: 10,
				loading: '',
				isloading: true,
				swanition: true,
				beginloading: true
			};
		},
		components: {
			submit
		},
		created() {
			console.log(this.$route)
			const info = JSON.parse(decodeURIComponent(this.$route.query.query))
			this.fid = info.id;
			this.fname = info.name;
			this.fimgurl = this.$ajax.baseUrl + '/upload/user/' + info.imgurl;
			this.uimgurl = this.$ajax.baseUrl + '/upload/user/' + uni.getStorageSync('userinfo').imgurl
			this.uid = uni.getStorageSync('userinfo').id
			//console.log(e)
			console.log(this.fid,
				this.fname,
				this.fimgurl)
			this.getStorages()
			this.getMsg();

			this.nextPage();
			//this.goBottom()
		},
		methods: {
			getStorages: function() {
				try {
					const value = uni.getStorageSync('userinfo');
					if (value) {
						this.uid = value.id;
						this.imgurl = this.serverUrl + value.imgurl;
						this.token = value.token;
						this.myname = value.name;
					} else {
						//如果没有用户缓存，跳转到登录页面
						uni.navigateTo({
							url: '../login/login'
						})
					}
				} catch (e) {
					// error
				}
			},
			backOne: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			goGroupHome: function() {
				uni.navigateTo({
					url: '../groupHome/groupHome?gid=' + this.fid + '&gimg' + this.fimgurl,
				})
			},
			// type:0 自己发送的 1：接收到的
			receivedMsg(e,id,type){
				this.swanition = true
				let len = this.msgs.length;
				let nowTime = new Date()
				let t = utils.spaceTime(this.oldTime, nowTime);
				if (t) {
					this.oldTime = t;
				}
				nowTime = t;
				let data = {
					id: id,
					message: e.message,
					types: e.types,
					sendtime: t,
					tip: len,
				};
				this.msgs.push(data);
				console.log(e);
				this.$nextTick(function() {
					this.scrollToView = 'msg' + len;
				})
				if (e.types == 1) {
					this.imgMsg.push(e.message)
				}
			},
			//接收数据
			inputs(e) {
				this.receivedMsg(e,this.uid,0)
			},
			//滚动顶部加载下一页
			nextPage() {
				if (this.nowpage > 0 && this.beginloading) {
					this.isloading = false
					//禁止重复加载
					this.beginloading = false
					var animation = uni.createAnimation({
						duration: 1000,
						timingFunction: 'step-start',
					})

					this.animation = animation

					let i = 1;
					this.loading = setInterval(function() {
						animation.rotate(i * 30).step()
						this.animationData = animation.export()
						i++;
						//获取聊天数据
						if (i > 20) {
							this.getMsg(this.nowpage)
						}

					}.bind(this), 100)
				}
			},
			//输入框高度
			heights(e) {
				this.inputh = e;
			},
			//播放音频
			playVoice: function(e) {
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			//地图定位
			covers: function(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: '../../../static/images/chatroom/dw.png'
				}]
				return (map);
			},
			//导航
			openLocation: function(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});
			},
			//滚动到底部
			goBottom: function() {
				this.swanition = true
				this.scrollToView = '';
				this.$nextTick(function() {
					let len = this.msgs.length - 1;
					this.scrollToView = 'msg' + this.msgs[len].tip;
					console.log(this.scrollToView)
				})
			},
			//处理时间
			changeTime: function(date) {
				return utils.dateTime1(date);
			},
			//获取数据
			getMsg: function(page = 0) {
				if (page === -1) {
					clearInterval(this.loading)
					this.isloading = true
				} else {
					const params = {
						uid: uni.getStorageSync('userinfo').id,
						fid: this.fid,
						nowPage: page,
						pageSize: this.pagesize
					}
					this.$ajax.baseRequest({
						url: '/chat/getMsg',
						method: 'post'
					}, params).then(res => {
						// 成功则跳转到登录
						if (res.status == 200) {
							if (res.result.length > 0) {
								const data = res.result
								data.reverse()
								let oldTime = data[0].sendtime
								let msgImgList = []
								for (let i = 1; i < data.length; i++) {
									// data[i].imgurl = this.$ajax.baseUrl + '/upload/user/' + data[i].imgurl;
									//时间间隔
									if (i < data.length - 1) {
										let t = utils.spaceTime(oldTime, data[i].sendtime);
										if (t) {
											oldTime = t;
										}
										data[i].sendtime = t;
									}
									if (data[i].types == 1) {
										data[i].message = this.$ajax.baseUrl + data[i].message;
										msgImgList.push(data[i].message)
										// this.imgMsg.unshift(data[i].message);
									}
									//this.msgs.unshift(data[i])
								}
								this.imgMsg = msgImgList.concat(this.imgMsg)
								this.msgs = data.concat(this.msgs)
								if (data.length === 10) {
									this.nowpage++
								} else {
									this.nowpage = -1
								}
								clearInterval(this.loading)
								this.isloading = true
							}
						}
					})
				}
			},
			//获取数据
			// getMsg1: function(page = 0) {
			// 	if (page === -1) {
			// 		clearInterval(this.loading)
			// 		this.isloading = true
			// 	} else {
			// 		let msg = datas.message();
			// 		let maxLen = msg.length
			// 		if (maxLen > (page + 1) * 10) {
			// 			maxLen = (page + 1) * 10
			// 			this.nowpage++
			// 		} else {
			// 			this.nowpage = -1
			// 		}
			// 		for (let i = 10 * page; i < maxLen; i++) {
			// 			msg[i].imgurl = '../../static/images/img/' + msg[i].imgurl;
			// 			//时间间隔
			// 			if (i < msg.length - 1) {
			// 				let t = utils.spaceTime(this.oldTime, msg[i].time);
			// 				if (t) {
			// 					this.oldTime = t;
			// 				}
			// 				msg[i].time = t;
			// 			}
			// 			if (msg[i].types == 1) {
			// 				msg[i].message = '../../static/images/img/' + msg[i].message;
			// 				this.imgMsg.unshift(msg[i].message);
			// 			}
			// 			this.msgs.unshift(msg[i])

			// 		}
			// 		clearInterval(this.loading)
			// 		this.isloading = true
			// 		console.log(this.msgs)
			// 	}
			// },
			//预览图片
			previewImg: function(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background: rgba(244, 244, 244, 1);
	}

	.top-bar {
		background: rgba(244, 244, 244, 0.96);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.10);

		.top-bar-center {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			font-family: PingFangSC-Regular;
			font-size: 40rpx;
			color: #272832;
			letter-spacing: -1.38rpx;
		}

		.group-img {
			position: absolute;
			bottom: 18rpx;
			right: 32rpx;
			width: 68rpx;
			height: 68rpx;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}

	.displaynone {
		display: none;
	}

	.chat {
		height: 100%;

		.padbt {
			height: var(--status-bar-height);
			width: 100%;
		}

		.loading {
			text-align: center;

			.loading-img {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 100rpx;
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 28rpx 0;

				.user-img-r {
					margin-left: 16rpx;;
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
				.user-img-l {
					margin-left: 16rpx;;
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
				

				.message {
					flex: none;
					max-width: 400rpx;
				}

				.msg-text {
					font-size: 32rpx;
					color: #272832;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: 20rpx;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;

					.map-name {
						font-size: 32rpx;
						color: #272832;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: 24rpx;
						color: #272832;
						padding: 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-img {
						padding-top: 8rpx;
						width: 480rpx;
						height: 190rpx;
					}
				}

				.voice {
					min-width: 88rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0 10px 10px 10px;
				}

				.msg-img {
					margin-left: 16rpx;
				}

				.msg-map {
					margin-left: 16rpx;
					border-radius: 10px 0px 10px 10px;
				}

				.voice {
					text-align: right;
				}

				.voice-img {
					float: left;
					transform: rotate(180deg);
					width: 28rpx;
					height: 36rpx;
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #fff260;
					border-radius: 10px 0px 10px 10px;
				}

				.msg-map {
					// position: absolute;
					// right: 120rpx;
					// margin-right: 16rpx;
					border-radius: 10px 0px 10px 10px;
				}

				.voice {
					text-align: left;
				}

				.voice-img {
					float: right;
					transform: rotate(180deg);
					width: 28rpx;
					height: 36rpx;
					padding-top: 4rpx;
				}
			}
		}
	}
</style>
