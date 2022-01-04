// router/modules/home.js
		const home = [{
				//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
				path: '/pages/index/index',
				aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
				name: 'index',
				meta: {
					title: '首页',
				},
			},
			{
				path: '/pages/login/login',
				name: 'login',
				meta: {
					title: '登录',
				},
			},
			{
				path: '/pages/userhome/userhome',
				name: 'userhome',
				meta: {
					title: '好友详情',
				},
			},
			{
				path: '/pages/register/register',
				name: 'register',
				meta: {
					title: '注册',
				},
			},
			{
				path: '/pages/search/search',
				name: 'search',
				meta: {
					title: '搜索',
				},
			},
			{
				path: '/pages/userdetails/userdetails',
				name: 'userdetails',
				meta: {
					title: '用户详情',
				},
			},
			{
				path: '/pages/friendrequest/friendrequest',
				name: 'friendrequest',
				meta: {
					title: '好友请求',
				},
			},
		]
		export default home
