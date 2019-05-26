<template lang="pug">
    div(id="app")
        navBar
        router-view
        lastFooter
</template>

<script>
import navBar from '@/components/client/navBar.vue'
import lastFooter from '@/components/client/footer.vue'
export default {
	name: 'App',
	components: {
		navBar,
		lastFooter
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>