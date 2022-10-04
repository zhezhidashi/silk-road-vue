<template>
	<div class="navigation" id="index_navigation">
		<img
			@click="MenuClick(menu[0], 0)"
			class="navigation_logo"
			src="logo.png"
		/>

		<div class="nav_bar_text_container">
			<div v-for="(item, index) in menu" class="NavBarItem" :key="index">
				<div
					@click="MenuClick($event, menu[index])"
					:id="item.name"
				>
					{{ item.title }}
				</div>
			</div>

			<img
				class="nav_bar_underline"
				src="nav_bar_underline.png"
				:style="`left: ${LineLeft[HeaderIndex]}; display: ${LineDisplay[LineIndex]};`"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "CommonHeader",
	computed: {
		...mapGetters(["HeaderIndex", "LineIndex"]),
	},
	data() {
		return {
			// 波浪线的左端距离
			LineLeft: [
				"-1vw",
				"7.4vw",
				"17.3vw",
				"27vw",
				"37vw",
				"46vw",
				"55vw",
			],
			LineDisplay: ["none", "inline"],
			// 为了导航栏 hover 效果, HeaderIndex 做一个备份
			HeaderIndexCopy: 0,
			menu: [
				{
					path: "/Home",
					name: "Home",
					title: "首页",
				},
				{
					path: "/WebIntro",
					name: "WebIntro",
					title: "网站简介",
				},
				{
					path: "/LatestBoardList",
					name: "LatestBoardList",
					title: "最新公告",
				},
				{
					path: "/ExhibitionList",
					name: "ExhibitionList",
					title: "最新展览",
				},
				{
					path: "/AcademicActivityList",
					name: "AcademicActivityList",
					title: "学术活动",
				},
				{
					path: "/MajorEvent",
					name: "MajorEvent",
					title: "大事记",
				},
				{
					path: "/ContactUs",
					name: "ContactUs",
					title: "联系我们",
				},
			],
		};
	},
	methods: {
		MenuClick(event, item) {
			this.$router.push({
				name: item.name,
			});

            let ClickID = event.target.id;
            console.log(document.querySelector('#' + ClickID).style)
		},
	},
};
</script>

<style scoped>
/*导航栏蓝色背景*/
.navigation {
	position: relative;
	width: 100%;
	height: inherit;
	/* background: #023871; */
	/* z-index: 999; */
}
/*导航栏“太平洋丝绸之路”的logo*/
.navigation_logo {
	position: absolute;
	height: 9vh;
	left: 9vw;
	top: 0;
	bottom: 0;
	margin: auto;
	cursor: pointer;
}
/*导航栏六个跳转选项*/
.nav_bar_text_container {
	position: absolute;
	width: 60vw;
	height: auto;
	right: 9vw;
	top: 0;
	bottom: 0;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* background: red; */
}

.NavBarItem {
	font-size: 20px;
	line-height: 100%;
	color: #ffffff;
	cursor: pointer;
}

/*导航栏中跳转至某个页面的下划波浪线*/
.nav_bar_underline {
	position: absolute;
	height: 9px;
	top: 7vh;
}
/* .nav_bar_underline::before {
	width: 0;
}
.nav_bar_underline::after {
	width: 72px;
}
.nav_bar_underline::active {
	transition: all 0.5s linear;
} */
</style>
