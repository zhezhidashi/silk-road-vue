<template>
	<div class="navigation" id="index_navigation">
		<img
			@click="MenuClick(menu[0])"
			class="navigation_logo"
			src="logo.png"
		/>

		<div class="NavBarContainer">
			<div v-for="(item, index) in menu" class="NavBarItem" :key="index">
				<div
					@click="MenuClick(menu[index])"
					:id="item.name"
					class="NavBarTitle"
                    v-if="index != 0"
				>
					<div class="ItemTitle">{{ item.title }}</div>
					<img
						:class="{ nav_bar_underline: index === HeaderIndex }"
						src="nav_bar_underline.svg"
						v-show="
							LineDisplay[LineIndex] === 'inline' &&
							index === HeaderIndex
						"
					/>
				</div>
			</div>
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
			// 波浪线是否显示
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
					title: "线上展览",
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
		MenuClick(item) {
			this.$router.push({
				path: item.path,
			});
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
	width: 16vw;
	min-width: 170px;
	left: 8vw;
	top: 0;
	bottom: 0;
	margin: auto;
	cursor: pointer;
}

/*导航栏六个跳转选项*/
.NavBarContainer {
	position: absolute;
	width: 43vw;
	height: auto;
	right: 8vw;
	top: 0;
	bottom: 0;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* background: red; */
}

.NavBarItem {
	cursor: pointer;
	margin-left: 1px;
}
.NavBarTitle {
	position: relative;
	width: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.ItemTitle {
	min-width: 18px;
	width: 6.5vw;
	text-align: center;
	font-size: 1.5vw;
	line-height: 96%;
	color: #ffffff;
}

/*导航栏中跳转至某个页面的下划波浪线*/
.nav_bar_underline {
	position: relative;
    top: 3px;
	animation: ClickUnderline 0.3s forwards;
}

@keyframes ClickUnderline {
	from {
		width: 0;
	}
	to {
		width: 5vw;
        max-width: 70px;
	}
}
</style>
