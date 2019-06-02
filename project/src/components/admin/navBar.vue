<template lang="pug">
    nav(class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow")
        a(class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/adminindex") Sweetaste後臺管理
        ul(class="navbar-nav px-3")
            li(class="nav-item text-nowrap")
                a(class="nav-link" @click="singout()" style="cursor: pointer;")  Sign out
</template>

<script>
export default {
    name: 'narBar',
    data () { return {} },
    methods: {
        singout() {
            const api = `${process.env.APIPATH}/logout`
            this.$http.post(api).then((response) => {
                if(response.data.success) {
                    localStorage.removeItem('adminToken')
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>