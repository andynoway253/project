<template lang="pug">
    div(class="inner")
        div(class="content")
            table(class="table mt-4")
                thead
                    tr
                        th 購買時間
                        th 購買人姓名
                        th 購買人電話
                        th E-mail
                        th 購買品項
                        th(class="text-right") 應付金額
                        th(class="text-right") 是否付款
                tbody
                    tr(v-for="item in orderList")
                        td {{item.user.date}}
                        td {{item.user.name}}
                        td {{item.user.tel}}
                        td {{item.user.email}}
                        td
                            ul
                                li(v-for="item in item") {{item.productInfo.title}} * {{item.productInfo.amount}}
                                    
                        td(class="text-right") {{item.total + item.user.fare}}
                        td(class="text-right")
                            span(class="text-success" v-if="item.is_paid") 已付款
                            span(class="text-danger" v-else) 未付款
       
        Pagination(:pagination="pagination" @getInform="getOrder")
</template>

<script>
import Pagination from '@/components/admin/pageNavigation'
export default {
    data() { return {
        orderList: [],
        pagination: {}
    }},
    created() {
        this.getOrder()
    },
    methods: {
        getOrder(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
			this.$http.get(api).then((response) => {
                var arr = []
                response.data.orders.forEach((element, index) => {
                    arr[index] = []  
                    Object.keys(element.products).forEach((element2, index2) => {
                        arr[index][index2] = {
                            productInfo: element.products[element2].product
                        }
                    })
                })

                const set = new Set()
                const result = []
                arr.forEach((item, index) => {
                    result[index] = arr[index].filter(item => !set.has(item.productInfo.title) ? set.add(item.productInfo.title) : false)
                    set.clear()
                })
        
                const count = []
                arr.forEach((item, index) => {
                    count[index] = []
                    item.forEach((item2, index2) => {
                        count[index][item2.productInfo.title] = count[index][item2.productInfo.title] ? count[index][item2.productInfo.title]+1 : 1
                    })
                })
           
                result.forEach((item, index) => {
                    item.is_paid = response.data.orders[index].is_paid
                    item.user = response.data.orders[index].user
                    item.total = response.data.orders[index].total
                    item.forEach((item2, index2) => {
                        item2.productInfo.amount = count[index][item2.productInfo.title]                        
                    })
                })
                this.orderList = result
                this.pagination = response.data.pagination
			})
        }
    },
	components: {
        Pagination
    }
}
</script>