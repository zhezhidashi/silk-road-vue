<template>
	<!-- <div class="Container">
		<div class="Header Card">
			<common-header></common-header>
		</div>
		<div class="Main">
			<router-view></router-view>
		</div>

		<div class="Footer">
			<common-footer></common-footer>
		</div>
	</div> -->
	<el-container>
		<el-header class="Header" height="11vh">
			<common-header></common-header>
		</el-header>
		<el-main class="Main">
			<router-view></router-view>
		</el-main>
		<el-footer class="Footer" height="12vh">
			<common-footer></common-footer>
		</el-footer>
	</el-container>
</template>

<style scoped>
.Container {
	position: relative;
	width: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}

.Header {
	position: fixed;
	top: 0;
	z-index: 999;
	height: auto;
	width: 98.8vw;
	background: #023871;
	border-radius: 0;
}
.Main {
    padding: 0;
	position: relative;
	top: 11vh;
	width: 98.8vw;
	height: auto;
}
.Footer {
	position: relative;
	display: flex;
	top: 11vh;
	justify-content: center;
	align-items: center;
	background: #023871;
	width: 98.8vw;
}

/* .NotClick {
	pointer-events: none;
} */
</style>

<script>
import CommonFooter from "../components/CommonFooter.vue";
import CommonHeader from "../components/CommonHeader.vue";

export default {
	name: "Main",
	components: {
		CommonFooter,
		CommonHeader,
	},
	data() {
		return {};
	},
	// 路由改变时强制刷新页面，可以解决 Header 波浪线残留和点击新页面选中所有文字的问题
	// watch: {
	// 	$route(to, from) {
	// 		window.location.reload(); //监测到路由发生跳转时刷新一次页面
	// 	},
	// },
	methods: {},
};

// 滚动的时候禁止掉鼠标事件，可以解决新页面滚动残留的问题，scroll_cnt1 === scroll_cnt2 才开启鼠标事件
// let scroll_cnt1 = 0,
// 	scroll_cnt2 = 0;

// 禁止滚轮事件
// window.onscroll = function () {
// 	document.querySelector("div").style["pointer-events"] = "none";
// 	scroll_cnt1++;
// 	setTimeout(() => {
// 		scroll_cnt2++;
// 		if (scroll_cnt1 === scroll_cnt2) {
// 			document.querySelector("div").style["pointer-events"] = "auto";
//             scroll_cnt1 = scroll_cnt2 = 0;
// 		}
// 	}, 10);
// };

// 禁止选中文字
// window.onclick = function () {
// 	document.querySelector("div").style["user-select"] = "none";
// 	scroll_cnt1++;
// 	setTimeout(() => {
// 		scroll_cnt2++;
// 		if (scroll_cnt1 === scroll_cnt2) {
// 			document.querySelector("div").style["user-select"] = "auto";
//             scroll_cnt1 = scroll_cnt2 = 0;
// 		}
// 	}, 10);
// };
</script>
