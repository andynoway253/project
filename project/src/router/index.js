import Vue from 'vue'
import Router from 'vue-router'
import clientView from '@/components/client/clientView'
import index from '@/components/client/index'
import product from '@/components/client/product'
import cart from '@/components/client/cart'
import checkout from '@/components/client/checkout'
import checkout2 from '@/components/client/checkout2'
import success from '@/components/client/success'
import login from '@/components/client/login'

import adminIndex from '@/components/admin/index'
import adminProduct from '@/components/admin/product'
import adminOrder from '@/components/admin/order'
import adminCoupon from '@/components/admin/coupon'

Vue.use(Router)

export default new Router({
	routes: [
	
	{
		path: '/',
		component: clientView,
		children: [
			{
				path: '/',
				name: 'index',
				component: index,
			},
			{
				path: '/product',
				name: 'product',
				component: product,
				meta: { requiresAuth: false}
			},
			{
				path: '/cart',
				name: 'cart',
				component: cart,
				meta: { requiresAuth: true}
			},
			{
				path: '/checkout',
				name: 'checkout',
				component: checkout,
				meta: { requiresAuth: true}
			},
			{
				path: '/checkout2/:orderId',
				name: 'checkout2',
				component: checkout2,
				meta: { requiresAuth: true}
			},
			{
				path: '/success',
				name: 'success',
				component: success,
				meta: { requiresAuth: true}
			},
			{
				path: '/login',
				name: 'login',
				component: login,
				meta: { requiresAuth: false}
			}
		]
	},
	{
		path: '/adminIndex',
		name: 'adminIndex',
		component: adminIndex,
		children:[
			{
				path: 'adminProduct',
				name: 'adminProduct',
				component: adminProduct,
				meta: { requiresAuth: true}
			},
			{
				path: 'adminOrder',
				name: 'adminOrder',
				component: adminOrder,
				meta: { requiresAuth: true}
			},
			{
				path: 'adminCoupon',
				name: 'adminCoupon',
				component: adminCoupon,
				meta: { requiresAuth: true}
			}
		]
	},

	{ 
		path: '*', 
		redirect: '/'
	}
  ]
})
