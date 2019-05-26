<template lang="pug">
	div
		navBar
		div(class="container-fluid")
			div(class="row")
				sideBar
				main(role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4")
					router-view
</template>

<script>
import sideBar from './sideBar'
import navBar from './navBar'

export default {
	components: {
		sideBar,
		navBar
	}
}
</script>

<style lang="scss">
@import "src/assets/css/bootstrap.scss";
</style>