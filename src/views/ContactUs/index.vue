<template>
	<div class="background" style="height: 906px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>
		<div class="contact_us_title">联系我们</div>
	</div>
</template>

<script>
export default {
	name: "ContactUs",
	methods: {
		// 路由回退
		router_go_back() {
			console.log("click!");
			this.$router.go(-1);
		},
	},
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 745px;
	top: 45px;
}

/*标题*/
.contact_us_title {
	position: absolute;
	width: 165px;
	height: 35px;
	left: 635px;
	top: 213px;
    font-size: 32px;
	color: #023871;
}
</style>