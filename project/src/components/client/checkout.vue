<template lang="pug">
    div(class="inner")
        div(class="content")
            div(class="leftInvoice")
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
                                 
                    div(class="step1" v-if="this.step === 1")
                        div(class="nameBox")
                            div(class="firstName")
                                label(class="name" for="firstName") 姓氏
                                input(id="firstName" class="form-control nameinput")
                            div(class="lastName")
                                label(class="name" for="lastName") 名字
                                input(id="lastName" class="form-control nameinput")
                        
                        div(class="form-group" style="padding: 0 5px")
                            label(for="phone" class="h4") 電話
                            input(id="phone" class="form-control form-control-lg bg-primary-lighter")
                        
                        div(style="text-align: left; color: #EAF0ED")
                            label(for="address" class="h4") 地址
                        div(class="addressBox")
                            div(class="city")
                                input(id="city" class="form-control cityinput")
                            div(class="area")
                                input(class="form-control cityinput")
                        div(style="padding: 0 5px")
                            input(id="address" class="form-control form-control-lg bg-primary-lighter")
                    
                    div(class="step2" v-else-if="this.step === 2")
                        div(class="form-group")
                            label(for="cardID" class="h4") 信用卡卡號
                            input(id="cardID" class="form-control form-control-lg bg-primary-lighter")
                        div(style="text-align: left; color: #EAF0ED")
                            label(for="firstName" class="h4") 持卡人姓名
                        div(class="nameBox")
                            div(class="firstName")
                                input(id="firstName" class="form-control nameinput")
                            div(class="lastName")
                                input(class="form-control nameinput")
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
                    
                    div(class="step3" v-else)
                        div(style="display:flex; align-items: center; border: 1px solid #EAF0ED; margin: 20px;")
                            div(style="width: 50%; color: #3F5D45; font-size: 26px; padding:15px; background-color: #EAF0ED;")
                                span 電子發票 
                            div(style="width: 50%; color: #EAF0ED; font-size: 26px;")
                                span 郵寄發票 
                        div(class="form-group")
                            label(for="email" class="h4") 電子郵件信箱
                            input(id="email" class="form-control form-control-lg bg-primary-lighter")
                        div(class="form-group")
                            label(for="taxID" class="h4") 統一編號（選填）
                            input(id="taxID" class="form-control form-control-lg bg-primary-lighter")
                
                button(class="nextStep" @click="nextStep" v-if="this.step < 3") 下一步
                a(class="nextStep" href="#/success" v-else) 下一步
            
            div(class="rightInfo")
                div(class="bill")
                    div(class="Title") 訂單摘要
                    div(class="billItem")
                        span 小計
                        span $NT {{GET_TOTALPRICE.TOTAL}}
                    div(class="billItem")
                        span 運費
                        span $NT {{GET_TOTALPRICE.FARE}}
                    div(class="billItem")
                        span 總計
                        span $NT {{GET_TOTALPRICE.TOTAL + GET_TOTALPRICE.FARE}}
                div(class="list")
                    div(class="Title") 購物清單
                    div(class="listItem" v-for="(item, index) in GET_SHOPCARTDATA")
                        img(class="listImg" :src="item.url")
                        div(class="text-left")
                            p {{item.title}}
                            p NT ${{item.price * item.amount}}
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'checkout',
    data () { 
        return {
            step: 1
        }
    },
    computed: {
        ...mapGetters([
			'GET_SHOPCARTDATA',
			'GET_TOTALPRICE',
        ])
    },
	methods: {
        nextStep () {
            this.step ++
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
                    .firstName, .lastName, .city, .area, .limitYear, .limitMonth, .limitDate {
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
                .name, .nameinput, .cityinput, .limitinput {
                    display: block;
                    width: 100%;
                }
            }
        }
        .nextStep {
            width: 100%;
            padding: 20px 0;
            font-size: 24px;
            display: block;
            background-color: #ffe180;
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