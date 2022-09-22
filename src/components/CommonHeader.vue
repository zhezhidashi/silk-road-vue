<template>
	<div class="navigation" id="index_navigation">
		<img
			@mousedown="MenuClick($event, menu[0])"
			class="navigation_logo"
			src="logo.png"
		/>

		<div class="nav_bar_text_container">
			<p @mousedown="MenuClick($event, menu[1])" class="nav_bar_intro">
				网站简介
			</p>
			<p @mousedown="MenuClick($event, menu[2])" class="nav_bar_latest">
				最新公告
			</p>
			<p @mousedown="MenuClick($event, menu[3])" class="nav_bar_display">
				线上展览
			</p>
			<p @mousedown="MenuClick($event, menu[4])" class="nav_bar_academic">
				学术活动
			</p>
			<p @mousedown="MenuClick($event, menu[5])" class="nav_bar_event">
				大事记
			</p>
			<p @mousedown="MenuClick($event, menu[6])" class="nav_bar_contact">
				联系我们
			</p>
		</div>
		<img class="nav_bar_underline" src="nav_bar_underline.png" alt="" />
		<!-- <div class="navigation_login_back">
			<a class="navigation_login">登录/注册</a>
		</div> -->
	</div>
</template>

<script>
export default {
	name: "CommonHeader",
	props: {
		UnderlineStyleLeft: String,
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
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
					path: "/LatestBoard",
					name: "LatestBoard",
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
		MenuClick(event, item) {
			this.$router.push({
				name: item.name,
			});
			if (this.$route.fullPath == item.path) {
				window.location.reload();
			}
		},
	},
};
</script>

<style>
/*导航栏蓝色背景*/
.navigation {
	position: relative;
	width: 1440px;
	height: 129px;
	/* background: #023871; */
	/* z-index: 999; */
}
/*导航栏“太平洋丝绸之路”的logo*/
.navigation_logo {
	position: absolute;
	width: 274px;
	height: 86px;
	left: 100px;
	top: 21px;
	cursor: pointer;
}
/*导航栏六个跳转选项*/
.nav_bar_text_container {
	position: absolute;
	width: 730px;
	height: auto;
	right: 100px;
	top: 34px;
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

/*导航栏的登录注册蓝色方框*/
.navigation_login_back {
	position: absolute;
	width: 109px;
	height: 35px;
	left: 825px;
	top: 29px;
	background: #588cc8;
	border-radius: 7px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 14px;
	line-height: 0;
	color: #ffffff;
	text-decoration: none;

	cursor: pointer;
}
/*导航栏中跳转至某个页面的下划波浪线*/
.nav_bar_underline {
	position: relative;
	width: 72px;
	height: 9px;
    top: 70px;
}
</style>
