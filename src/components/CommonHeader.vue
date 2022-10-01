<template>
	<div class="navigation" id="index_navigation">
		<img
			@click="MenuClick(menu[0], 0)"
			class="navigation_logo"
			src="logo.png"
		/>

		<div class="nav_bar_text_container">
			<div @click="MenuClick(menu[1], 1)" class="nav_bar_intro">
				网站简介
			</div>
			<div @click="MenuClick(menu[2], 2)" class="nav_bar_latest">
				最新公告
			</div>
			<div @click="MenuClick(menu[3], 3)" class="nav_bar_display">
				线上展览
			</div>
			<div @click="MenuClick(menu[4], 4)" class="nav_bar_academic">
				学术活动
			</div>
			<div @click="MenuClick(menu[5], 5)" class="nav_bar_event">
				大事记
			</div>
			<div @click="MenuClick(menu[6], 6)" class="nav_bar_contact">
				联系我们
			</div>
            <img class="nav_bar_underline" src="nav_bar_underline.png" :style="`left: ${LineLeft[HeaderIndex]}; display: ${DisplayState[HeaderIndex]};`">
		</div>
		
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "CommonHeader",
    computed: {
        ...mapGetters(['HeaderIndex'])
    },
	data() {
		return {
            // 波浪线的左端距离
            LineLeft: ['0', '0', '137px', '273px', '407px', '532px', '654px'],
            DisplayState: ['none', 'inline', 'inline', 'inline', 'inline', 'inline', 'inline'],
			menu: [
				{
					path: "/Home",
					name: "Home",
				},
				{
					path: "/WebIntro",
					name: "WebIntro",
				},
				{
					path: "/LatestBoardList",
					name: "LatestBoardList",
				},
				{
					path: "/ExhibitionList",
					name: "ExhibitionList",
				},
				{
					path: "/AcademicActivityList",
					name: "AcademicActivityList",
				},
				{
					path: "/MajorEvent",
					name: "MajorEvent",
				},
				{
					path: "/ContactUs",
					name: "ContactUs",
				},
			],
		};
	},
	methods: {
		MenuClick(item, index) {
			this.$router.push({
				name: item.name,
			});
            this.$store.dispatch("GetHeaderIndex", index);
		},
	},
};
</script>

<style scoped>
/*导航栏蓝色背景*/
.navigation {
	position: relative;
	width: 1440px;
	height: 13vh;
	/* background: #023871; */
	/* z-index: 999; */
}
/*导航栏“太平洋丝绸之路”的logo*/
.navigation_logo {
	position: absolute;
	height: 80px;
	left: 100px;
	top: 0;
    bottom: 0;
    margin: auto;
	cursor: pointer;
}
/*导航栏六个跳转选项*/
.nav_bar_text_container {
	position: absolute;
	width: 730px;
	height: auto;
	right: 100px;
    top: 0;
    bottom: 0;
    margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav_bar_intro,
.nav_bar_latest,
.nav_bar_display,
.nav_bar_academic,
.nav_bar_event,
.nav_bar_contact {
	font-size: 20px;
	line-height: 100%;
	color: #ffffff;
	cursor: pointer;
}

/*导航栏中跳转至某个页面的下划波浪线*/
.nav_bar_underline {
	position: absolute;
	width: 72px;
	height: 9px;
    top: 8vh;
}
</style>
