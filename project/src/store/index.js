import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        isLogin: false,
        cartLength: 0,
        productClas: {
            All: '所有甜點',
            Featured: '本日精選',
            Popular: '人氣推薦',
            New: '新品上市'
        },
        titleDate: [
            {title: '本日精選', url: 'https://bit.ly/2Dwoxd7'},
            {title: '人氣推薦', url: 'https://bit.ly/2OUteif'},
            {title: '新品上市', url: 'https://bit.ly/2NcDVuB'}
        ],
        countCategory: [],
        productData: [],    //  商品資料陣列
        shopcartData: [],   //  未處理過的購物車陣列
        resultShopcart: [], //  處理過的購物車陣列
        pagination: {}      //  分頁物件
    },
    actions: {
        getProducts({commit}) {
            commit('getProductData')
            setTimeout(() => {
                commit('getCountClas')
            }, 1000)  
        },

        getCart(context, payload) {
            context.commit('getCart', payload)
        },
    
        addCart({commit}, payload) {
            commit('addCart', payload)
            setTimeout(() => {
                commit('getCart')
            }, 500)
        },

        // delCart({commit}, payload) {
        //     commit('delCart', payload)
        //     setTimeout(() => {
        //         commit('getCart')
        //     }, 500)
        // },

        delOneCart({commit}, payload) {
            commit('delOneCart', payload)
            setTimeout(() => {
                commit('getCart')
            }, 500)
        },
        getLogin(context, payload) {
            context.commit('getLogin', payload)
        }
    },
    mutations: {
        gotData(){
            console.log(1)
        },
        gotOtherData(){
            console.log(2)
        },
        addCart(state, status) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            const cart = {
                product_id: status.id,
                qty: 1
            }
			axios.post(api, {data: cart}).then((response) => {
                console.log(response)
            })
        },
        getCart(state, status) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
			axios.get(api).then((response) => {
                state.shopcartData = response.data.data.carts
                state.cartLength = response.data.data.carts.length
            })
        },
        // delCart(state, status) {         
        //     const result = state.shopcartData.filter((item) => item.product.title === status.productInfo.title)

        //     result.forEach(function(item) {
        //         let id = item.id
        //         const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
        //         	axios.delete(api).then((response) => {
        //         		console.log(response)           
        //         	})
        //     })
        // },
        delOneCart(state, status) {
            const result = state.shopcartData.filter((item) => item.product.title === status.productInfo.title)
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${result.shift().id}`
            axios.delete(api).then((response) => {
                console.log(response)           
            })
        },
        getCountClas(state, status) {
            var arr = [], count = 0

            state.productData.filter(function (item) { 
                if(item.is_enabled) {
                    arr[item.category] = arr[item.category] || []
                    if (arr[item.category] == []) {
                        arr[item.category] = 0
                    }
                    arr[item.category]++
                    count ++
                    return arr
                }
            })
            state.countCategory = arr
            state.countCategory['所有甜點'] = count
            return state.countCategory
        },
        getProductData(state, status) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
			axios.get(api).then((response) => {
                
                let indexProduct = response.data.products.filter(item => {
                    return item.is_enabled === true
                })
                state.productData = indexProduct
            })
        },
        getLogin(state, status) {
            state.isLogin = localStorage.getItem('adminToken') === 'adminLogin'
        }
    },
    getters: {
        GET_TITLEDATA: state => state.titleDate,
        GET_PRODUCTDATA: state => state.productData,
        GET_PRODUCTDATACLAS: state => state.productClas,
        GET_COUNTCLAS: state => state.countCategory,
        GET_SHOPCARTLENGTH: state => state.cartLength,
        GET_SHOPCARTDATA: state => {
            // 重整api物件
            var arr = []
            state.shopcartData.forEach(function(item, index){ 
                arr[index] = {
                    productID: item.id,
                    productInfo: item.product,
                    coupon: item.coupon
                }
            })

            // 重複物件只取一個出來
            const set = new Set()
            const result = arr.filter(item => !set.has(item.productInfo.title) ? set.add(item.productInfo.title) : false)
     
            // 計算相同物件出現次數
            var count = []
            arr.forEach(function(item) {
                count[item.productInfo.title] = count[item.productInfo.title] ? count[item.productInfo.title]+1 : 1
            })
            // // 新增amount屬性
            result.forEach(function(item) {
                item.amount = count[item.productInfo.title]  
            })
            
            state.resultShopcart = result
            return state.resultShopcart
        },
        GET_TOTALPRICE: state => {
            var total = 0, fare = 0
            state.resultShopcart.forEach(function(item) {
                if(item.productInfo.price === undefined){
                    item.productInfo.price = 0
                }
                total += item.productInfo.price * item.amount            
            })
            
            total < 500 ? fare = 60 : fare = 0

            var infoData = {}
            infoData.TOTAL = total
            infoData.FARE = fare
            return infoData
        },
        GET_LOGIN: state => {
            return state.isLogin
        }
    }
})
