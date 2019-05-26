<template lang="pug">
    div(class="inner")
        form(class="content" :class="{'admin' : type === 'admin'}" @submit.prevent="signin")
            div(class="titleBox")
                p(class="title" @click="changeType('client')") 會員登入
                p(class="title" @click="changeType('admin')") 管理者登入
            div(class="contentBox")
                p
                    icon(class="user" name="user" scale="1")
                    input(type="email" class="account" placeholder="電子郵件" v-model="user.username")
                p
                    icon(class="key" name="key" scale="1")
                    input(type="password" class="password" placeholder="密碼" v-model="user.password")
                p
                    input(type="checkbox" class="remember")
                    span(class="rememberStr") 記住我
            button(class="login" :class="{'admin' : type === 'admin'}" type="submit") 登入帳號
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'product',
    data () { return {
        user: {
            username: '',
            password: ''
        },
        type: 'client'
    } },
	computed: {
     
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
                        //this.$store.state.isLogin = true
                        this.$router.push('/adminIndex/adminProduct')
                    }
                    
                } else {
                    //this.$router.push('/login')
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
        p:nth-child(3) {
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

.content.admin {
    background-color: #3f4a5d;
}
.login.admin {
    color: #fff;
    background-color: #8c8c8c;
}

@media screen and (max-width: $pad) {
    .content {
        width: 100%;
    }
}
</style>