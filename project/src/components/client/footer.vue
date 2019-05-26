<template lang="pug">
    div(class="footer")
        div(class="emailBox")
                div(class="container emailContainer")
                    div(class="emailLeft")
                        img(src="static/images/logo-light.svg" style="width:40px; height:40px" alt="")
                        span(style="color: #fff; margin:0 15px; font-size:24px; vertical-align: middle;") 訂閱你我的甜蜜郵件
                    div(class="emailRight")
                        div(style="display: flex; background-color: #EAF0ED;")
                            label(class="emailIcon" for="subscription")
                                icon(name="envelope")                          
                            input(type="email" id="subscription" class="emailInput")
                            button(class="emailBtn")
                                icon(name="arrow-right")
        div(class="container inner" style="padding: 20px")
            div(class="left")
                div(class="footerInfo")
                    img(class="footerLogo" src="static/images/logotype-sm-dark.svg")
                    p 07-1234-5678
                    p sweetaste@email.com
                    p 800 高雄市新興區幸福路 520 號
            div(class="right")
                img(src="static/images/sm-今天是個吃甜點的好日子.svg")
            div(class="buttom")
                div(class="left")
                    img(class="line" src="static/images/ic-line@.svg")
                    img(class="fb" src="static/images/ic-facebook.svg")
                div(class="right str")
                    span © 2018 Sweetaste* All Rights Reserved
</template>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.footer {
    background-color: #EAF0ED;
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .buttom {
        display: flex;
        width: 100%;
        margin-top: 20px;
    }
}

.left {
    display: block;
    width: 50%;
    text-align: left;
    .footerInfo {
        .footerLogo{
            width: 200px;
            margin-bottom: 20px;
        }
    }
}

.right {
    display: block;
    width: 50%;
    text-align: right;
    img {
        width:60px
    }
}

.line, .fb {
    margin-right: 10px;
    width: 30px;
}

.emailBox {
    background-color: #3F5D45;
    .emailContainer {
        display:flex;
        padding: 30px;
        align-items: center;
        .emailLeft {
            width: 50%;
        }

        .emailRight {
            width: 50%;
            .emailIcon {
                position: absolute;
                margin: 0px 20px;
                line-height: 64px;
            }

            .emailInput {
                width: 90%;
                border: 0;
                padding: 5px;
                padding-left: 60px;
                background-color: transparent;
            }

            .emailBtn {
                border: 0;
                padding: 20px;
                color: #212529;
                background-color: #FFE180;
                border-color: #FFE180;
                
            }
        }

        .fa-icon {
            color: #2c3e50;
        }
    }
}

@media screen and (max-width: 768px) {
    .footer .buttom {
        display: block;
    }
    .left {
        width: 100%;
    }
    .right {
        display: none;
    }
    .str {
        display: block;
        width: 100%;
        text-align: left;
        margin-top: 10px;
    }
}

</style>
