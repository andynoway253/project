<template lang="pug">
    div(class="inner")
        div(class="content")
            table(class="table mt-4")
                thead
                    tr
                        th 購買時間
                        th E-mail
                        th 購買品項
                        th(class="text-right") 應付金額
                        th(class="text-right") 是否付款
                tbody
                    tr(v-for="item in orderList")
                        td 
                        td {{item.user.email}}
                        td
                            ul
                                li(v-for="item in item.products") {{item.product.title}} * {{item.product.num}}
                                    
                        td(class="text-right") {{  }}
                        td(class="text-right")
                            span(class="text-success" v-if="item.is_paid") 已付款
                            span(class="text-danger" v-else) 未付款

                div(class="total") 

            div
            div
            div
            div
            div
</template>

<script>

export default {
    data() { return {
        orderList: []
    }},
    created() {
        this.getOrder()
    },
    computed: {},
    methods: {
        getOrder(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
			this.$http.get(api).then((response) => {
               
                this.orderList = response.data.orders


                var arr = []
                response.data.orders.forEach((element, index) => {
                    arr[index] = [] 
                    Object.keys(element.products).forEach((element2, index2) => {
                        // console.log(index)
                        arr[index][index2] = {
                            productInfo: element.products[element2].product
                        }
                    })
                })
                
                const set = new Set()
                var result = []
                arr.forEach((item, index) => {
                    result[index] = arr[index].filter(item => !set.has(item.productInfo.title) ? set.add(item.productInfo.title) : false)
                    set.clear()
                })
        
                console.log(result)
                
                // arr.filter((item, index) => {
                //     result[index] = item.filter(item2 => !set.has(item2.productInfo.title) ? set.add(item2.productInfo.title) : false)
                // })
                // // const result = arr.filter(item => !set.has(item.productInfo.title) ? set.add(item.productInfo.title) : false)
                // console.log(result)
                // response.data.orders.products.forEach(item => {
                //      console.log(item.product)
                // });
			})
        }
    }
}
</script>