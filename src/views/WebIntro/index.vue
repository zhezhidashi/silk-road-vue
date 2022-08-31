<template>
	<div class="background" style="height: 906px">
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