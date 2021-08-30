export default{
	friends:function(){
		let friendarr=[
			{
				id:1,
				imgurl:'a.png',
				tip:2,
				name:'李清照',
				time:new Date(),
				email:'123@email.com',
				news:'常记溪亭日暮，沉醉不知归路',
			},
			{
				id:2,
				imgurl:'b.png',
				tip:3,
				name:'范仲淹',
				email:'456@gmail.com',
				time:new Date(),
				news:'山映斜阳天接水',
			},
			{
				id:3,
				imgurl:'c.png',
				tip:2546,
				name:'辛弃疾',
				email:'zyzy@qq.com',
				time:new Date(),
				news:'欲说还休，却道天凉好个秋',
			},
			{
				id:4,
				imgurl:'d.png',
				tip:8,
				name:'柳永',
				email:'2575@email.com',
				time:new Date(),
				news:'天际识归舟',
			},
			{
				id:5,
				imgurl:'e.png',
				tip:12,
				name:'宴几道',
				email:'245242@email.com',
				time:new Date(),
				news:'云去雁来，不见来信',
			},
			{
				id:6,
				imgurl:'f.png',
				tip:0,
				name:'李重元',
				email:'425425@email.com',
				time:new Date(),
				news:'欲黄昏，雨打梨花深闭门',
			},
			{
				id:7,
				imgurl:'b.png',
				tip:3,
				name:'范成大',
				email:'gdddg@email.com',
				time:new Date(),
				news:'日长篱落无人过',
			},
			{
				id:8,
				imgurl:'c.png',
				tip:2,
				name:'杜甫',
				email:'1fssaf@email.com',
				time:new Date(),
				news:'返照斜处砌',
			},
			{
				id:9,
				imgurl:'d.png',
				tip:8,
				name:'刘禹锡',
				email:'fdsfdfd@email.com',
				time:new Date(),
				news:'旧时王谢庭前燕，飞入寻常百姓家',
			},
			{
				id:10,
				imgurl:'e.png',
				tip:12,
				name:'朱庆余',
				email:'fdsfdgrgr@email.com',
				time:new Date(),
				news:'画眉深浅入时无',
			},
			{
				id:11,
				imgurl:'d.png',
				tip:0,
				name:'李白',
				email:'12327287@email.com',
				time:new Date(),
				news:'长风破浪会有时',
			},
		]
		return friendarr;
	},
	groups(){
		let groupArr=[
				{
					id:1,
					imgurl:'a.png',
					groupName:'李子',
				},
				{
					id:2,
					imgurl:'b.png',
					groupName:'这是一个群',
				},
				{
					id:3,
					imgurl:'c.png',
					groupName:'你是猪嘛',
				},
				{
					id:4,
					imgurl:'d.png',
					groupName:'我只想干饭',
				},
			]
			return groupArr;
	},
	isFriend:function(){
		let isFriend=[
			{
				userid:1,
				friendid:2,
			},
			{
				userid:1,
				friendid:5,
			},
			{
				userid:1,
				friendid:6,
			},
			{
				userid:1,
				friendid:8,
			},
		]
		return isFriend;
	},
	isGroup:function(){
		let isGroup=[
			{
				userid:1,
				groupid:2,
			},
			{
				userid:1,
				groupid:4,
			},
		]
		return isGroup;
	},
	friedsRequest(){
		let friendRequest=[
			{
				userid:1,
				imgurl:'a.png',
				requestUserName:'声声慢',
				requestMessageWord:'这是留言1，这是留言1，这是留言1'
			},
			{
				userid:2,
				imgurl:'b.png',
				requestUserName:'声声慢2',
				requestMessageWord:'这是留言2，这是留言2，这是留言2'
			},
			{
				userid:3,
				imgurl:'c.png',
				requestUserName:'声声慢3',
				requestMessageWord:'这是留言3，这是留言3，这是留言3'
			},
			{
				userid:4,
				imgurl:'d.png',
				requestUserName:'声声慢4',
				requestMessageWord:'这是留言4，这是留言4，这是留言4'
			},
		]
		return friendRequest;
	},
	message:function(){
		let msgs = [
			{
				id:'a',
				imgurl:'one.png',
				message:{
					name:'天安门城楼售票处',
					address:'东长安街天安门城楼内',
					latitude:'39.989473',
					longitude:'116.39738999999',
				},
				types:3,
				time: new Date(),
				tip:12,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:{
					name:'天安门城楼售票处',
					address:'东长安街天安门城楼内',
					latitude:'39.989473',
					longitude:'116.39738999999',
				},
				types:3,
				time: new Date(),
				tip:11,
			},
			{
				id:'a',
				imgurl:'one.png',
				message:{
					voice:'a',
					time:60,
				},
				types:2,
				time: new Date(),
				tip:10,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:{
					voice:'a',
					time:20,
				},
				types:2,
				time: new Date(),
				tip:9,
			},
			{
				id:'a',
				imgurl:'one.png',
				message:'c.png',
				types:1,
				time: new Date()-1000*16,
				tip:8,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'声声慢',
				types:0,
				time: new Date()-1000*60,
				tip:7,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'a.png',
				types:1,
				time: new Date()-1000*60*16,
				tip:6,
			},
			{
				id:'a',
				imgurl:'one.png',
				message:'声声慢',
				types:0,
				time: new Date()-1000*60*40,
				tip:5,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'b.png',
				types:1,
				time: new Date()-1000*60*57,
				tip:4,
			},
			{
				id:'a',
				imgurl:'one.png',
				message:'声声慢',
				types:0,
				time: new Date()-1000*60*58,
				tip:3,
			},
			{
				id:'b',
				imgurl:'c.png',
				message:'e.png',
				types:1,
				time: new Date()-1000*60*60,
				tip:2,
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'声声慢',
				types:0,
				time: new Date()-1000*60*58*24,
				tip:1,
			},
	];
	return msgs;
	}
}