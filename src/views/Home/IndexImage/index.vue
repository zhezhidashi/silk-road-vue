<template>
	<!-- 标题图片 -->
	<div class="swiper-container" id="IndexImageContainer">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="(item, index) in index_title_image_src"
				:key="index"
			>
				<img id="IndexImage" :src="item" />
			</div>
		</div>

		<div class="swiper-pagination"></div>
		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev" id="IndexImageShiftPrev"></div>
		<div class="swiper-button-next" id="IndexImageShiftNext"></div>

		<!-- 搜索框 -->
		<div class="index_search_back">
			<div style="position: absolute; width: 100%; height: 100%; opacity: 0.4;" :style="`background-image:url(底部浪花.svg)`"></div>
            <input
				type="search"
				v-model="search_keywords"
				class="index_search_words"
				placeholder="输入档案关键词 / search for"
			/>
			<img id="SearchLogo" :src="index_search_logo_src" />
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "IndexImage",
	data() {
		return {
			index_title_image_src: [
				"background_image_1.jpg",
				"background_image_2.jpg",
				"background_image_3.jpg",
				"background_image_4.jpg",
				"background_image_5.jpg",
				"background_image_6.jpg",
				"background_image_7.jpg",
			],

			search_keywords: "",
			index_search_logo_src: "search_logo.png",
		};
	},
	methods: {},
	mounted() {
		// 初始化 Swiper
		let _this = this;
		var mySwiper = new Swiper(".swiper-container", {
			loop: true, // 循环模式选项

			autoplay: {
				delay: 15000,
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
			on: {
				click: function (event) {
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
.index_search_back {
	position: absolute;
	width: 1080px;
	height: 60px;
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
.index_search_words {
	position: relative;
	width: 1000px;
	height: 60px;
    border-top: none;
    border-left: none;
    border-right: none;
	border-bottom: 2px solid #588cc8;
	outline: none;
	font-size: 20px;
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
	position: absolute;
	width: 36px;
	height: 48px;
	right: 40px;
	cursor: pointer;
}
::-webkit-input-placeholder {
	color: #588cc8;
}


/* 标题图片 */
#IndexImageContainer {
	position: relative;
	width: auto;
	top: -1vh;
	height: 88vh;
	left: 0;
}
.swiper-slide {
	position: relative;
	height: 88vh;
	width: auto;
	overflow: hidden;
}
#IndexImage {
	position: absolute;
	width: auto;
	height: 88vh;
	cursor: pointer;
	left: 50%;
	transform: translate(-50%, 0);
}
.swiper-pagination {
	bottom: 18vh;
}
</style>