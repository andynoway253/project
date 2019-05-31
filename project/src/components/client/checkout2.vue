<template lang="pug">
    div(class="inner")
        div(class="content")
            span(class="title") 訂單資訊
            table(class="table mt-4") 
                thead
                    tr
                        th 購買品項
                        th(class="text-right") 數量
                        th(class="text-right") 價錢
                tbody
                    tr(v-for="(item, index) in orderList.products")
                        td {{item.productInfo.title}}
                        td(class="text-right") {{item.amount}}
                        td(class="text-right" v-if="item.productFinal_total === item.productInfo.price") {{item.productInfo.price * item.amount | currency}}
                        td(class="text-right" v-else) {{item.productFinal_total * item.amount | currency}}
                            p(class="text-success" v-if="item.userCoupon") (已套用優惠卷)
                    tr(v-if=" orderList.user.fare")
                        td(class="text-right" colspan='2') 運費
                        td(class="text-right") {{ 60 | currency}}    
                    tr(style="font-size: 24px;")
                        td(class="text-right" colspan='2') 總計
                        td(class="text-right") {{ orderList.total | currency}}

        table(class="infoBox")
            tr(class="title") 訂購人資訊
            tr
                td Email：
                td {{orderList.user.email}}
            tr 
                td 收件人姓名：
                td {{orderList.user.name}}
            tr 
                td 收件人電話：
                td {{orderList.user.tel}}
            tr 
                td 收件人地址：
                td {{orderList.user.city + orderList.user.area + orderList.user.address}}
            tr 
                td 付款狀態： 
                td(class="text-danger") 未付款

        button(class="btn btn-outline-success checkPaid" @click="payOrder()") 確認付款
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'checkout2',
    data () { 
        return { 
            orderId: '',
            orderList: '',
            code: ''
        }
    },
    created() {
        this.orderId = this.$route.params.orderId
        this.getOrder()
        this.getCart()
    },
	methods: {
        ...mapActions([
            'getCart'
		]),
        getOrder() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${this.orderId}`
            this.$http.get(api).then((response) => {
                var arr = []
                Object.values(response.data.order.products).forEach((item, index) => {
                    arr[index] = {
                        productInfo: item.product,
                        productFinal_total: item.final_total,
                        userCoupon: item.coupon ? true : false
                    }
                })

                const set = new Set()
                const result = arr.filter(item => !set.has(item.productInfo.title) ? set.add(item.productInfo.title) : false)
                
                var count = []
                arr.forEach(function(item) {
                    count[item.productInfo.title] = count[item.productInfo.title] ? count[item.productInfo.title]+1 : 1
                })

                result.forEach(function(item) {
                    item.amount = count[item.productInfo.title]  
                })
                console.log(result)
                response.data.order.products = result
                response.data.order.total = response.data.order.user.fare ? response.data.order.total + 60 :  response.data.order.total
                this.orderList = response.data.order
            })
        },
        payOrder() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${this.orderId}`
            this.$http.post(api).then((response) => {
                if(response.data.success) {
                    this.$router.push('/success')
                }
            })
        }
	}
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.content {
    width: 768px;
    margin:  auto;
}

.title {
    font-size: 24px;
}




.infoBox {
    width: 480px;
    margin: auto;
    text-align: left;
}

.checkPaid {
    margin: 20px 0;
}

@media screen and (max-width: $pad) {
    .content{
        width: 100%;
	}
}
</style>