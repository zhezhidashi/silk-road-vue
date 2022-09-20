<template>
	<div class="background" style="height: 906px; background: #efefef">
		<!--回退到上一个页面-->
		<img @click="router_go_back()" class="go_back" id="go_back1" src="arrow_left_3.png" alt="" />        
		<div class="latest_content_title">最新内容</div>
	</div>
</template>

<script>
export default {
    name: 'LatestContent',
    methods: {
        // 路由回退
        router_go_back() {
            console.log("click!")
			this.$router.go(-1);
		},
    }
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 746px;
}
/*标题*/
.latest_content_title {
	position: absolute;
	width: 139px;
	height: 42px;
	left: 651px;
	top: 213px;
	font-size: 32px;
	color: #023871;
}
</style>
