<template lang="pug">
    div(class="header inner")
        b-navbar(toggleable="md" variant="")
            b-navbar-toggle(target="nav_collapse")
            b-navbar-brand(href="#/")
                img(class="bigLogo" src="static/images/logo-all-dark.svg")
                img(class="smallLogo" src="static/images/logotype-lg-dark.svg")

            a(class="cart" href="#/cart")
                div(class="cartNumber")
                    span(class="number") {{GET_SHOPCARTLENGTH}}
                icon(class="cart" name="shopping-cart" scale="1")

            b-collapse(is-nav id="nav_collapse")
                b-navbar-nav(class="ml-auto")
                    b-navbar-nav
                        b-nav-item(href="#/") 首頁
                        b-nav-item(href="#/product") 商品
                        b-nav-item(href="#/login" v-if="GET_LOGIN === false") 登入
                        b-nav-item(href="#/" v-if="GET_LOGIN === true" @click="singout()") 登出
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'narBar',
    data () { return {} },
    created() {
        this.getCart()
    },
    computed: {
        ...mapGetters([
            'GET_SHOPCARTLENGTH',
            'GET_LOGIN'
        ])
    },
    methods: {
        ...mapActions([
            'getCart'
        ]),
        singout() {
            const api = `${process.env.APIPATH}/logout`
            this.$http.post(api).then((response) => {
                if(response.data.success) {
                    localStorage.removeItem('clientToken')
                    this.$store.state.isLogin = false
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.bigLogo {
    display: block;
    width: 220px;
}

.smallLogo {
    display: none;
    width: 114px;
}

.navbar-brand {
    margin: 0;
}

.nav-item {
    width: 80px;
    margin: 0 10px;
    border: 2px solid #3f5d45;
    border-radius: 8px;
}

.cart {
    position: relative;
    width: unset;
    height: 25px;
    color: #2c3e50;
    order: 1;
}

.cartNumber {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    color: #fff;
    background-color: red;
    border-radius: 15px;
    z-index: 100;
    .number {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    }
}

@media screen and (max-width: $pad) {
    .cart {
        order: 0;
    }
    .bigLogo {
        display: none;
    }

    .smallLogo {
        display: block;
    }

    .nav-item {
        width: 80px;
        border: 0;
        margin: 0;
    }

}
</style>