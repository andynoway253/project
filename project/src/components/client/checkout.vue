<template lang="pug">
    div(class="inner")
        div(class="content")
            form(class="leftInvoice" @submit.prevent="creatOrder()")
                div(class="leftInvoiceContent")
                    div(style="display:flex; align-items: center;")
                        div(style="width: 50%; color: #ffffff;  font-size: 40px; text-align: left")
                            span(v-if="this.step < 3") 運送
                            span(v-else) 發票
                        div(style="width: 50%;")
                            div(class="process-steps w-100")
                                div(class="step-circle" :class="(this.step >= 1) ? 'active' : ''")
                                    icon(name="check" v-if="this.step > 1")
                                div(class="step-circle" :class="(this.step >= 2) ? 'active' : ''")
                                    icon(name="check" v-if="this.step > 2")
                                div(class="step-circle" :class="(this.step >= 3) ? 'active' : ''")
                                 
                    div(class="step1" v-show="this.step === 1")
                        div(class="nameBox")
                            div(class="firstName")
                                label(class="name" for="firstName") 姓名
                                input(id="firstName" class="form-control nameinput" :class="{'is-invalid': errors.has('name')}" v-model="form.user.name" name="name" v-validate="'required'" placeholder="請輸入姓名")
                                span(class="text-danger" v-if="errors.has('name')") 請輸入姓名
                         
                        div(class="form-group" style="padding: 0 5px")
                            label(for="phone" class="h4") 電話
                            input(type="tel" id="phone" class="form-control bg-primary-lighter" :class="{'is-invalid': errors.has('tel')}" v-model="form.user.tel" name="tel" v-validate="'required'" placeholder="請輸入電話")
                            span(class="text-danger" v-if="errors.has('tel')") 請輸入電話

                        div(style="text-align: left; color: #EAF0ED")
                            label(for="address" class="h4") 地址
                        div(class="addressBox")
                            div(class="city")
                                input(id="city" class="form-control cityinput" :class="{'is-invalid': errors.has('city')}" v-model="form.user.city" name="city" v-validate="'required'" placeholder="縣市")
                                span(class="text-danger" v-if="errors.has('city')") 請輸入縣市
                            div(class="area")
                                input(class="form-control cityinput" :class="{'is-invalid': errors.has('area')}" v-model="form.user.area" name="area" v-validate="'required'" placeholder="區域")
                                span(class="text-danger" v-if="errors.has('area')") 請輸入地區
                        div(style="padding: 0 5px; text-align: left;")
                            input(id="address" class="form-control bg-primary-lighter" :class="{'is-invalid': errors.has('address')}" v-model="form.user.address" name="address" v-validate="'required'" placeholder="請輸入詳細地址")
                            span(class="text-danger" v-if="errors.has('address')") 請輸入地址

                    div(class="step2" v-show="this.step === 2")
                        div(class="form-group")
                            label(for="cardID" class="h4") 信用卡卡號
                            input(id="cardID" class="form-control bg-primary-lighter")
                        div(style="text-align: left; color: #EAF0ED")
                            label(for="firstName" class="h4") 持卡人姓名
                        div(class="nameBox")
                            div(class="firstName")
                                input(id="firstName" class="form-control nameinput")
                        
                        div(style="text-align: left; color: #EAF0ED")
                            label(for="limitYear" class="h4") 有效期限
                        div(class="limitBox")
                            div(class="limitYear")
                                input(id="limitYear" class="form-control limitinput")
                            div(class="limitMonth")
                                input(class="form-control limitinput")
                        div(style="text-align: left; color: #EAF0ED")
                            label(for="limitDate" class="h4") 有效期限
                        div(class="limitBox")
                            div(class="limitDate")
                                input(id="limitDate" class="form-control limitinput")
                    
                    div(class="step3" v-show="this.step === 3")
                        div(style="display:flex; align-items: center; border: 1px solid #EAF0ED; margin: 20px;")
                            div(style="width: 50%; color: #3F5D45; font-size: 26px; padding:15px; background-color: #EAF0ED;")
                                span 電子發票 
                            div(style="width: 50%; color: #EAF0ED; font-size: 26px;")
                                span 郵寄發票 
                        div(class="form-group")
                            label(for="email" class="h4") 電子郵件信箱
                            input(id="email" class="form-control bg-primary-lighter" :class="{'is-invalid': errors.has('email')}" v-model="form.user.email" name="email" v-validate="'required|email'" placeholder="請輸入電子信箱")
                            span(class="text-danger" v-if="errors.has('email')") 請輸入電子信箱
                        div(class="form-group")
                            label(for="taxID" class="h4") 統一編號（選填）
                            input(id="taxID" class="form-control bg-primary-lighter")
                div(style="display: flex")
                    button(class="nextStep" type="button" @click="Step('pre')" v-if="this.step > 1") 上一步
                    button(class="nextStep" type="button" @click="Step('next')" v-if="this.step < 3") 下一步
                    button(class="nextStep" v-if="this.step === 3") 送出訂單
            
            div(class="rightInfo")
                div(class="bill")
                    div(class="Title") 訂單摘要
                    div(class="billItem")
                        span 小計
                        span $NT {{GET_TOTALPRICE.TOTAL | currency}}
                    div(class="billItem")
                        span 運費
                        span $NT {{GET_TOTALPRICE.FARE | currency}}
                    div(class="billItem")
                        span 總計
                        span $NT {{GET_TOTALPRICE.TOTAL + GET_TOTALPRICE.FARE | currency}}
                    div(class="billItem" v-if="coupon === true")
                        span(class="text-success") 折扣價
                        span(class="text-success") {{final_total | currency}}

                div(class="input-group mb-3 input-group-sm")
                    input(type="text" class="form-control" placeholder="請輸入優惠碼" v-model="code")
                    div(class="input-group-append")
                        button(class="btn btn-outline-secondary" type="button" @click="useCoupon") 套用優惠碼
                
                div(class="list")
                    div(class="Title") 購物清單
                    div(class="listItem" v-for="(item, index) in GET_SHOPCARTDATA")
                        img(class="listImg" :src="item.productInfo.imageUrl")
                        div(class="text-left")
                            p {{item.productInfo.title}} * {{item.amount}}
                            p NT ${{item.productInfo.price * item.amount | currency}}       
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'checkout',
    data () { 
        return {
            step: 1,
            form: {
                user: {
                    date: '',
                    name: '',
                    tel: '',
                    city: '',
                    area: '',
                    address: '',
                    email: '',
                    fare: 0
                },
                message: '',    
            },
            code: '',
            coupon: false,
            final_total: 0
        }
    },
    computed: {
        ...mapGetters([
			'GET_SHOPCARTDATA',
			'GET_TOTALPRICE',
        ])
    },
	methods: {
        ...mapActions([
            'getCart'
		]),
        Step (step) {
            if(step === 'next'){
                this.step ++
            } else {
                this.step --
            }
        },
        useCoupon() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
            this.$http.post(api, { data: { code: this.code } }).then(response => {
                if (response.data.success) {
                    this.coupon = true
                    this.final_total = this.GET_TOTALPRICE.TOTAL < 500 ? response.data.data.final_total + 60 : response.data.data.final_total
                } else {
                    alert(response.data.message)
                }
            })
        },
        creatOrder () {
            var date = new Date()
            const order = this.form
            if(this.GET_TOTALPRICE.TOTAL < 500) { //用原始價格來判斷要不要加運費
                 this.form.user.fare = this.GET_TOTALPRICE.FARE
            }
            this.form.user.date = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
            this.$validator.validate().then((result) => {
                if (result) {
                    this.$http.post(api, { data: order }).then((response) => {
                        console.log('訂單已建立', response)
                        if(response.data.success) {
                            this.$router.push(`/checkout2/${response.data.orderId}`)
                        }
                    })
                } else {
                    console.log('欄位不完整')
                }
            })
        }
	}
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";
//  標籤的style重定義
button {
    border: 0;
}
.text-danger, .text-success {
    font-size: 20px;
}
.content {
	display: flex;
	margin: 60px auto;    
    .leftInvoice {
        width: 70%;
        margin-right: 30px;
        .leftInvoiceContent {
            padding: 30px;
            background-color: #3F5D45;
            .process-steps {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background-color: #8DA291;
                }
            }

            .process-steps .step-circle {
                height: 20px;
                width: 20px;
                border: 1px solid #8DA291;
                border-radius: 20px;
                position: relative;
                background-color: #3F5D45;
                z-index: 1;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: center;
                justify-content: center;

                &.active::after {
                    content: "";
                    height: 14px;
                    width: 14px;
                    display: block;
                    background-color: #EAF0ED;
                    border-radius: 20px;
                    position: absolute;
                    z-index: -1;
                }
            }

            .form-group {
                text-align: left;
                font-size: 30px;
                color: #EAF0ED;
            }

            .step1, .step2 {
                .nameBox, .addressBox, .limitBox {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    .firstName, .city, .area, .limitYear, .limitMonth, .limitDate {
                        width: 100%;
                        color: #EAF0ED;
                        font-size: 26px;
                        text-align: left;
                        padding: 0 5px;
                    }
                    .limitDate {
                        width: 50%;
                    }
                }

                .addressBox {
                    display: flex;
                    align-items: baseline;
                }
                .name, .nameinput, .cityinput, .limitinput {
                    display: block;
                    width: 100%;
                }
            }
        }
        .nextStep {
            display: block;
            width: 100%;
            padding: 20px 0;
            border: 1px solid #3f5d45;
            background-color: #ffe180;
            font-size: 24px;
        }
    }

    .rightInfo {
        width: 30%;
        .Title {
            padding: 10px;
            font-size: 30px;
            color: #8DA291;
            background-color: #EAF0ED;
        }

        .bill {
            margin-bottom: 20px;
            border: 1px solid #EAF0ED;
            .billItem {
                display: flex;
                color: #8DA291;
                padding: 10px 30px;
                justify-content: space-between;
                &:nth-child(4) {
                    font-size: 20px;
                }
            }
        }

        .list {
            max-height: 430px;
            overflow: auto;
            .listItem {
                display: flex;
                padding: 10px;
                align-items: center;
                .listImg {
                    width: 100px;
                    height: 100px;
                    margin-right: 10px;
                }
            }
        }
    }
}

@media screen and (max-width: $pad) {
    .content{
		flex-wrap: wrap;
        flex-direction: column-reverse;
		.leftInvoice {
			width: 100%;
            margin: 30px 0 0;
		}

		.rightInfo {
			width: 100%;
		}
	}
}
</style>