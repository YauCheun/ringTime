<template>
	<view class="input-content">
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc"></image>
				</view>
				<textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs" v-model="msg" @focus="focus"></textarea>
				<view class="record btn" :class="{displaynone:!isrecord}" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">按住说话</view>
				<view class="bt-img" @tap="emoji">
					<image src="../../static/images/submit/bq.png"></image>
				</view>
				<view class="bt-img" @tap="more">
					<image src="../../static/images/submit/tj.png"></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:isemoji}">
				<view class="emoji-send">
					<view class="emoji-send-det" @tap="emojiBack">
						<image src="../../static/images/submit/back.png"></image>
					</view>
					<view class="emoji-send-bt" @tap="emojiSend">发送</view>
				</view>
				<emoji @emotion="emotion" :height="260"></emoji>
			</view>
			<view class="more" :class="{displaynone:ismore}">
				<view class="more-list">
					<image src="../../static/images/submit/tp.png"></image>
					<view class="more-list-title" @tap="sendImg('album')">图片</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/pz.png"></image>
					<view class="more-list-title" @tap="sendImg('camera')">拍照</view>
				</view>
				<view class="more-list" @tap="chooseLocation">
					<image src="../../static/images/submit/dw.png"></image>
					<view class="more-list-title">定位</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/sp.png"></image>
					<view class="more-list-title">视频</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/wj.png"></image>
					<view class="more-list-title">文件</view>
				</view>
			</view>
		</view>
		<view class="voice-bg" :class="{displaynone:voicebg}">
			<view class="voice-bg-len">
				<view class="voice-bg-time":style="{width:vlength/0.6+'%'}">{{vlength}}″</view>
			</view>
			<view class="voice-del">上滑取消录音</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../emoji/emoji.vue'
	const recorderManager = uni.getRecorderManager();
	export default {
		name:"Submit",
		data() {
			return {
				isrecord: false,
				isemoji: true,
				msg:'',
				ismore:true,
				toc:'../../static/images/submit/yy.png',
				timer:'',
				voicebg:true,
				vlength:0,//录音时长
				pageY:0,
				type:''
			};
		},
		components:{
			emoji
		},
		methods:{
			getElementHeight:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights',data.height);
				}).exec();
			},
			//开始录音
			touchstart:function(e){
				console.log('开始')
				this.voicebg = false
				//点击时y轴位置
				this.pageY = e.changedTouches[0].pageY;
				let i = 1;
				this.timer = setInterval(()=>{
					this.vlength = i;
					i++;
					console.log(i)
					if(i>60){
						//结束计时
						clearInterval(this.timer);
						this.touchend()
					}
				},1000)
				recorderManager.start()
			},
			//结束录音
			touchend:function(){
				console.log('结束')
				clearInterval(this.timer)
				recorderManager.stop();
				RecorderManager.onStop(function(res){
					let data = {
						voice:res.tempFilePath,
						time:this.vlength
					}
					if(this.voicebg){
						this.send(data,2);
					}
					//时长归位
					this.vlength = 0;
					this.voicebg = true;
				})
			},
			
			//图片发送
			sendImg:function(e){
				let count = 9;
				if(e == 'album'){
					count = 9;
				}else{
					count = 1;
				}
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
				        const filePaths = res.tempFilePaths;
						for(let i=0;i<filePaths.length;i++){
							this.send(filePaths[i],1)
						}
				    }
				});
			},
			//点击切换音频
			records:function(){
				//关闭其他项
				this.isemoji = true;
				this.ismore =true;
				setTimeout(()=>{
					this.getElementHeight();
				},10)
				if(this.isrecord){
					this.isrecord=false;
					this.toc="../../static/images/submit/yy.png";
				}else{
					this.isrecord=true;
					this.toc="../../static/images/submit/jp.png";
				}
				console.log('1')
			},
			//终止录音
			touchmove:function(){
				if(this.pageY-e.changedTouches[0].pageY>100){
					this.voicebg = true
				}
			},
			//表
			emoji:function(){
				this.isemoji = !this.isemoji;
				this.ismore = true;
				this.isrecord=false;
				this.toc="../../static/images/submit/yy.png";
				setTimeout(()=>{
					this.getElementHeight();
				},10)
			},
			//文字发送
			inputs:function(e){
				var chatm = e.detail.value;
				var pos = chatm.indexOf('\n');
				if(pos!=-1&&chatm.length>1){
					this.send(this.msg,0)
				}
			},
			//接受表情
			emotion:function(e){
				this.msg = this.msg+e
			},
			//表情内发送
			emojiSend:function(){
				if(this.msg.length>0){
					this.send(this.msg,0)
				}
			},
			//删除
			emojiBack:function(){
				if(this.msg.length>0){
					this.msg = this.msg.substring(0,this.msg.length-1);
				}
			},
			//输入框聚焦
			focus:function(){
				this.isemoji = true;
				setTimeout(()=>{
					this.getElementHeight();
				},10)
			},
			send:function(msg,types){
				let data = {
					message:msg,
					types:types,
				}
				this.$emit('inputs',data);
				setTimeout(()=>{
					this.msg = ''
				},0)
			},
			//更多功能
			more:function(){
				this.ismore = !this.ismore;
				this.isemoji = true;
				this.isrecord=false;
				this.toc="../../static/images/submit/yy.png";
				setTimeout(()=>{
					this.getElementHeight();
				},10)
			},
			//位置获取
			chooseLocation:function(){
				uni.chooseLocation({
				    success:res => {
						let data = {
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							longitude:res.longitude,
						}
						this.send(data,3);
				        //console.log('位置名称：' + res.name);
				        //console.log('详细地址：' + res.address);
				        //console.log('纬度：' + res.latitude);
				        //console.log('经度：' + res.longitude);
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.submit{
		background: rgba(244,244,244,1);
		border-bottom:1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: -1rpx;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.displaynone{
		display: none;
	}
	.submit-chat{
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
		image{
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}
		.btn{
			flex:auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}
		.cht-send{
			line-height: 44rpx;
		}
		.record{
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}
	}
	.emoji{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.1);
		.emoji-send{
			width: 380rpx;
			height: 104rpx;
			padding-top: 24rpx;
			background-color: rgba(236,237,238,0.8);
			position: fixed;
			bottom:env(safe-area-inset-bottom);
			right: 0;
			display: flex;
			.emoji-send-bt{
				flex:1;
				margin: 0 32rpx 0 20rpx;
				height: 80rpx;
				background: rgba(255,228,49,0.9);
				font-size: 32rpx;
				text-align: center;
				line-height: 88rpx;
				border-radius: 12rpx;
			}
			.emoji-send-det{
				flex:1;
				margin-left: 24rpx;
				height: 80rpx;
				background: #fff;
				font-size: 32rpx;
				text-align: center;
				line-height: 88rpx;
				border-radius: 12rpx;
				padding-top: 6rpx;
				image{
					width: 40rpx;
					height: 34rpx;
				}
			}
		}
	}
	.more{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.1);
		bottom:env(safe-area-inset-bottom);
		padding: 8rpx 20rpx;
		box-sizing: border-box;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			margin-top: 20rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255,255,255,1);
				border-radius: 24rpx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rgba(39,40,50,0.5);
				line-height: 34rpx;
			}
		}
	}
	.voice-bg{
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;
		.voice-bg-len{
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom:0;
			margin: auto;
			background-color: rgba(255,255,255,0.2);
			border-radius: 42rpx;
			text-align: center;
		}
		.voice-bg-time{
			display: inline-block;
			min-width: 120rpx;
			line-height: 84rpx;
			background-color: $uni-color-primary;
		}
		.voice-del{
			position: absolute;
			margin-bottom: env(safe-area-inset-bottom);
			bottom: 148rpx;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: $uni-font-size-base;
		}
	}
</style>
