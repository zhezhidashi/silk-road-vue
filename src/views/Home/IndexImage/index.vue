<template>
	<!-- 标题图片 -->
	<div class="swiper-container" id="IndexImageContainer">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="(item, index) in ImageUrl"
				:key="index"
			>
				<img id="IndexImage" :src="item.Url" />
				<!-- 图片的标题 -->
				<div class="ImageTitle">{{ item.Title }}</div>
			</div>
		</div>

		<div class="swiper-pagination"></div>
		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev" id="IndexImageShiftPrev"></div>
		<div class="swiper-button-next" id="IndexImageShiftNext"></div>

		<!-- 搜索框 -->
		<div class="SearchContainer">
			<div
				style="
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0.4;
				"
				:style="`background-image:url(底部浪花.svg)`"
			></div>
			<div class="SearchTextLogo">
				<input
					type="search"
					v-model="search_keywords"
					class="SearchContent"
					placeholder="输入档案关键词 / search for"
					@keyup.13="SearchButton"
				/>
				<img id="SearchLogo" :src="index_search_logo_src" />
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "IndexImage",
	data() {
		return {
			ImageUrl: [
				{
					Url: "background_image_1.jpg",
					Title: "传入欧洲的首张中国（明）全图",
				},
				{
					Url: "background_image_2.jpg",
					Title: "奥特里乌斯绘制的太平洋地图（局部，1589年）",
				},
				{
					Url: "background_image_3.jpg",
					Title: "西班牙人绘中国艾尔摩沙岛和南方部分地区（1626年）",
				},
				{
					Url: "background_image_4.jpg",
					Title: "阿卡普尔科圣迭戈棱堡设计图（1707年）",
				},
				{
					Url: "background_image_5.jpg",
					Title: "卡加延河岸教堂分布图（局部，1719年）",
				},
				{
					Url: "background_image_6.jpg",
					Title: "马尼拉-加的斯航线图（1777年）",
				},
				{
					Url: "background_image_7.jpg",
					Title: "太平洋海上航线的探索",
				},
			],
			search_keywords: "",
			index_search_logo_src: "search_logo.png",
		};
	},
	methods: {
		SearchButton() {
			this.$router.push({
				path: "/ArchiveList1",
				query: {
					search_keywords: this.search_keywords,
					search_date_from: "",
					search_date_to: "",
					search_language: "",
					now_page_num: "",
				},
			});
		},
	},
	mounted() {
		// 初始化 Swiper
		let _this = this;
		var mySwiper = new Swiper(".swiper-container", {
			loop: true, // 循环模式选项

			autoplay: {
				delay: 7000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},

			// 如果需要分页器
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			// 如果需要前进后退按钮
			navigation: {
				prevEl: "#IndexImageShiftPrev",
				nextEl: "#IndexImageShiftNext",
			},
			keyboard: true,
			on: {
				click: function (event) {
                    console.log(event)
					if (event.path[0].id === "IndexImage") {
						console.log("点击了主页的图片！");
					} else if (event.path[0].id === "SearchLogo") {
						_this.$router.push({
							path: "/ArchiveList1",
							query: {
								search_keywords: _this.search_keywords,
								search_date_from: "",
								search_date_to: "",
								search_language: "",
								now_page_num: "",
							},
						});
					}
				},
			},
		});
	},
};
</script>

<style scoped>
/* 搜索框部分 */
.SearchContainer {
	position: absolute;
	width: 80vw;
	height: 8vh;
	left: 0;
	right: 0;
	margin: auto;
	bottom: 0;
	background: #efefef;
	border-radius: 7px 7px 0 0;
	z-index: 15;

	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
}
/* 文字和搜索放大镜的Container */
.SearchTextLogo {
	position: relative;
	width: auto;
	height: 8vh;
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: 2px solid #588cc8;
	outline: none;
	font-size: 1.5vw;
	line-height: 100%;
	color: rgb(136, 136, 136);
	background: rgb(240, 240, 240, 0);
	display: flex;
	justify-content: center;
	align-items: center;
}
.SearchContent {
	position: relative;
	width: 73vw;
	height: 7vh;
	border: none;
	outline: none;
	font-size: 1.5vw;
	line-height: 100%;
	color: rgb(136, 136, 136);
	background: rgb(240, 240, 240, 0);
}
/* 浪花 */
#Wave {
	position: absolute;
	bottom: 0;
	right: 0;
	/* background: red; */
	/* cursor: pointer; */
	width: 90px;
	/* z-index: 100; */
}
#SearchLogo {
	position: relative;
	width: 36px;
	cursor: pointer;
}
::-webkit-input-placeholder {
	color: #588cc8;
}

/* 大图片 */
#IndexImageContainer {
	position: relative;
	width: auto;
	height: 89vh;
	left: 0;
}
/* 图片题目 */
.ImageTitle {
	position: absolute;
	width: 100%;
	font-size: 1.8vw;
	font-weight: 600;
	color: white;
	text-align: center;
	bottom: 11.5vh;

	/* 文字阴影 */
	text-shadow: 1px 1px 1px black;
    /* 文字间距 */
    letter-spacing: 2px;
}

.swiper-slide {
	position: relative;
	height: inherit;
	width: auto;
	overflow: hidden;
}
#IndexImage {
	position: absolute;
	width: auto;
	height: inherit;
	cursor: pointer;
	left: 50%;
	transform: translate(-50%, 0);
}
.swiper-pagination {
	bottom: 18vh;
}
</style>

