<template>
	<div class="background" style="height: 906px; background: #efefef">
		<div class="Heading">联系我们</div>
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
		},
	},
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 6);
    },
};
</script>

<style scoped>
</style>