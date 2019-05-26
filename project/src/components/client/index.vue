<template lang="pug">
    div(class="content")
        section
            div(class="background inner")
            div(class="anchorPointBox inner")
                div(class="anchor" v-for="(item, index) in GET_TITLEDATA" @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)" v-scroll-to="'#anchor'")
                    <span :class=" (currentitem === index) ? 'greenTitleText' : 'whiteTitleText'"> {{item.title}} </span>
                    div(:id="'mask_' + index" :class=" (currentitem === index) ? 'yellowAnchorPointMask' : 'greenAnchorPointMask'" )
                    div(:id="'image_' + index" :class=" (currentitem === index) ? 'anchorPointImg' : 'blurAnchorPointImg'" :style="{'background-image': 'url(' + item.url + ')'}" )

        section(class="section")
            div(class="backgroundColor")
                div(class="contain inner")
                    img(class="landscapeImg" src="static/images/sm-橫式-為什麼選擇了做甜點.svg")
                    div(class="row") 
                        div(class="imgBox")
                            div(class="backgroundImg" style="background-image:url(https://bit.ly/2xPn7Eq);")
                        div(class="strBox")
                            div(class="str")
                                p 青山依舊在，幾度夕陽紅。慣看秋月春風。
                                p 一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
                                p 是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。

                            div
                                img(class="strImg" src="static/images/lg-為什麼選擇了做甜點.svg")

        section(class="section")
            div(class="backgroundColor")
                div(class="contain inner")
                    img(class="landscapeImg" src="static/images/sm-橫式-為什麼一定要吃甜點.svg")
                    div(class="row res")
                        div(class="imgBox")
                            div(class="backgroundImg" style="background-image:url(https://bit.ly/2xPn7Eq);")
                        div(class="strBox")
                            div(class="str")
                                p 青山依舊在，幾度夕陽紅。慣看秋月春風。
                                p 一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
                                p 是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
                            div
                                img(class="strImg" src="static/images/lg-為什麼一定要吃甜點.svg")
  
        section(class="section")
            div(class="imgBox")
                img(src="static/images/lg-想吃甜點是不需要理由的.svg" width="89px")

        section(class="section")
            div(id="anchor" class="container")
                div(class="product")
                    swiper(:options="swiperOption" ref="mySwiper" style="width: 100%")
                        swiper-slide(class="productBox" v-for="(item, index) in GET_PRODUCTDATA" :key="index")
                            div(class="productImg" :style="{'background-image': 'url(' + item.imageUrl + ')'}")
                                div(class="productClas") {{item.category}}
                            div(class="productInfo")
                                div(class="productName") {{item.title}}
                                div(class="productPrice") NT$ {{item.price}}
                            div(class="addCart" @click="addCart(item)") 加入購物車
                        <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'index',
    data () { 
        return {
            currentitem: '',
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    768:{
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    }
                }
            }
        }
    },
    created() {
		this.getProducts()
	},
    computed: {
        ...mapGetters([
            'GET_TITLEDATA',
            'GET_PRODUCTDATA'
        ])
    },
    methods: {
        mouseOver(data) {
            this.currentitem = data
        },
        mouseLeave(data) {
            this.currentitem = ''
        },
        ...mapActions([
            'addCart',
            'getProducts'
        ])
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

anchorPointImg {
    position: absolute;
    right: -10px;
    left: -10px;
    top: -10px;
    bottom: -10px;
    background-size: cover;
    background-position: center;
    z-index: 0;
}

anchorPointMask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

titleText{
    position: absolute;
    font-size: 24px;
    letter-spacing: 10px;
    font-weight: bolder;
    z-index: 2;
}

.inner {
    width: 1200px;
    margin: auto;
    @media all and (max-width: $pc) {
        width: 80%;
    }

    @media all and (max-width: $pad) {
        width: 100%;
    }
}

.background {
    height: 500px;
    background-image: url("https://bit.ly/2OhbMHr");
    background-size: cover;
    background-position: center center;
}

.anchorPointBox {
    margin-top: -90px;
    display: flex;
    justify-content: center;
    .anchor {
        position: relative;
        overflow: hidden;
        z-index: 2;
        width: 300px;
        height: 250px;
        -webkit-writing-mode: vertical-lr;
        writing-mode: vertical-lr;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        .greenAnchorPointMask{
            @extend anchorPointMask;
            background-color: rgba(63, 93, 69, 0.8);
            transition: background-color .5s;
        }

        .yellowAnchorPointMask{
            @extend anchorPointMask;
            background-color: rgba(255, 225, 128, 0.8);
            transition: background-color .5s;
        }

        .whiteTitleText {
            @extend titleText;
            color: #ffffff;
            transition: color .5s;
        }

        .greenTitleText {
            @extend titleText;
            color: rgba(63, 93, 69, 0.8);
            transition: color .5s;
        }

        .blurAnchorPointImg {   //模糊圖片
            @extend anchorPointImg;
            filter: blur(5px);
            transition: filter .5s;
        }

        .anchorPointImg {   //清晰圖片
            @extend anchorPointImg;
            filter: blur(0px);
            transition: filter .5s;
        }
    }
    .anchor:nth-child(n+2) {
        border-left: 1px solid #ffffff;
    }
}

.section {
    margin: 105px auto;

    .landscapeImg {
        display: none;
    }

    .backgroundColor {
        background-color: #EAF0ED; 

        .res{
            flex-direction: row-reverse;
        }

        .imgBox {
            width:50%;
            margin: -24px 0;
            padding: 0 40px;
        }

        .backgroundImg {
            height: 100%;
            background-size: cover;
            background-position: center center;
        }

        .strBox {
            display: flex;
            width: 50%;
            max-height: 420px; 
        }
        
        .str {
            -webkit-writing-mode: vertical-rl;
            -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
            line-height: 2.5;
            padding: 70px 0;
            margin-right: auto;
            text-align: left
        }

        .strImg {
            width: 88px;
            margin: -24px 0;
        }        
    }
}

.product {
    display: flex;
    .productBox {
        width: 33%;
        padding: 10px;
        .productImg {
            position: relative;
            height: 315px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            position: relative;
        }

        .productClas {
            position: absolute;
            top: -10px;
            left: 20px;
            padding: 15px 5px;
            color: #fff;
            background-color: #3f5d45;
            writing-mode: vertical-rl;
            letter-spacing: 5px;
        }

        .productInfo {
            display: flex;
            border: 1px solid #EAF0ED;
            .productName, .productPrice {
                width: 50%;
                padding: 0 10px;
                line-height: 50px;
                font-size: 18px;
                font-weight: bold;
                color: #3f5d45;
                border-right: 1px solid #EAF0ED;
            }           
        }

        .addCart {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            button {
                border: 0;
				background-color: transparent;
                outline: none;
            }
            background-color: #EAF0ED;
            border-color: #EAF0ED;
            line-height: 60px;

            &:hover {
                background-color: #6c757d;
                transition: background-color .5s;
            }
        }
    }
}

// 
.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -5px;
}

.swiper-button-prev {
    left: 0;
}

.swiper-button-next{
    right: 0;
}

@media screen and (max-width: 1200px) {
    .inner {
       max-width: 960px;
    }
}

@media screen and (max-width: $pc) {
    .section {
        .landscapeImg {
            display: block;
            width: 50%;
            min-height: 250px;
            margin: 0 auto;
        }
        
        .backgroundColor {
            .imgBox {
                width: 100%;
                min-height: 250px;
                padding: 0;
            }

            .strImg {
                display: none;
            }

            .strBox {
                width: 100%;
                padding: 0 15px;
            }

            .str {
                writing-mode: unset;
                line-height: 1;
            }
        }

        .row {
            margin: 0;
        }
    }
}

@media screen and (max-width: $pad) {
    .section {
        margin: 30px auto;
        .landscapeImg {
            min-height: 200px;
        }
    }
    .product {
        flex-wrap: wrap;
        .productBox {
            width: 100%;
            padding: 10px 0;
        }
    }

    .emailBox {
         .emailContainer {
            display: block !important;
            .emailLeft, .emailRight {
                width: 100%;
            }
            .emailLeft {
                margin-bottom: 20px;
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        margin: 10px auto;
        .landscapeImg {
            min-height: 150px;
        }
    }
}
</style>
