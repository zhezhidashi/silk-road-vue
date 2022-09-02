<template>
	<div class="background" style="height: 906px">
		<!--回退到上一个页面-->
		<img @click="router_go_back()" class="go_back" id="go_back1" src="arrow_left_3.png" alt="" />
        <p class="web_intro_title">网站简介</p>
	</div>
</template>

<script>
export default {
	name: "WebIntro",
	data() {
		return {
            UnderlineStyleLeft: '395px',
        };
	},
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

/* 修改导航栏波浪线的样式 */
.nav_bar_underline{
    visibility: visible;
    left: 305px;
    top: 45px;
}

/*标题*/
.web_intro_title{
    position: absolute;
    left: 441px;
    top: 135px;
    font-size: 22px;
    line-height: 0;
    color: #023871;
}

</style>