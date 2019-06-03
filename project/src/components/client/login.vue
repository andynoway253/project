<template lang="pug">
    div(class="inner")
        form(class="content" :class="{'admin' : type === 'admin'}" @submit.prevent="signin")
            div(class="titleBox")
                //- p(class="title" @click="changeType('client')") 會員登入
                p(class="title" @click="changeType('admin')") 管理者登入
            div(class="contentBox")
                p
                    icon(class="user" name="user" scale="1")
                    input(type="email" class="account" placeholder="電子郵件" v-model="user.username")
                p
                    icon(class="key" name="key" scale="1")
                    input(type="password" class="password" placeholder="密碼" v-model="user.password")
                p(class="text-danger" v-if="error")
                    span 帳號或密碼輸入錯誤
                p
                    input(type="checkbox" class="remember")
                    span(class="rememberStr") 記住我
            button(class="login" :class="{'admin' : type === 'admin'}" type="submit") 登入帳號
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'product',
    data () { 
        return {
            user: {
                username: '',
                password: '',
                
            },
            type: 'admin',
            error: false
        } 
    },
	methods: {
		signin() {
            const api = `${process.env.APIPATH}/admin/signin`
            this.$http.post(api, this.user).then((response) => {
                if(response.data.success) {
                    if(this.type === 'client') {
                        localStorage.setItem('clientToken', 'clientLogin')
                        this.$store.state.isLogin = true
                        this.$router.push('/')
                    } else {
                        localStorage.setItem('adminToken', 'adminLogin')
                        this.$router.push('/adminIndex/adminProduct')
                    }
                } else {
                    this.error = true
                }
            })
        },
        changeType(type) {
            this.type = type
        }
	}
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/common.scss";

.content {
    width: 500px;
    margin: 20px auto;
    background-color: #3f5d45;
    .titleBox {
        display: flex;
        justify-content: center;
    }

    .contentBox {
        padding: 0 20px;
        p:nth-child(1),
        p:nth-child(2) {
            position: relative;
        }
        p:nth-child(n+3) {
            text-align: left;
        }
    }   
}

.title {
    margin: 10px;
    padding: 20px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 32px;
    font-weight: bolder;
    cursor: pointer;
}

.account, .password {
    width: 100%;
    padding: 10px 30px;
    border: 0;
    background-color: #eaf0ed;
}

.user, .key {
    position: absolute;
    left: 10px;
    height: 44px;
}

.remember {
    margin-right: 10px;
    vertical-align: middle;
}
.rememberStr {
    color: #eaf0ed;
}

.login {
    width: 100%;
    padding: 10px 0; 
    border: 0;
    color: #3f5d45;
    background-color: #ffe180;
    font-size: 24px;
    font-weight: bolder;
}
@media screen and (max-width: $pad) {
    .content {
        width: 100%;
    }
}
</style>