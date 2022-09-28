<template>
	<div class="background" style="height: 906px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="GoBack.png"
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
			this.$router.push({
                path: '/Home'
            })
            this.$store.dispatch("GetHeaderIndex", 0);
		},
	},
};
</script>

<style scoped>
/*标题*/
.contact_us_title {
	position: absolute;
	width: 1440px;
    text-align: center;
	top: 100px;
    font-size: 32px;
    line-height: 150%;
	color: #023871;
}
</style>