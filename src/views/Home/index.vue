<template>
	<div class="background" style="height: 2136px; background: #023871">
		<!-- 标题图片 -->
		<img class="index_title_image" :src="index_title_image_src" />

		<!-- 标题部分 -->
		<div class="index_title_back">
			<p class="index_main_title">
				{{ index_main_title }}
			</p>
			<p class="index_sub_title">{{ index_sub_title }}</p>
			<p class="index_title_intro">
				{{ index_title_intro }}
			</p>
		</div>

		<!-- 查看详情部分 -->
		<div
			@mousedown="index_title_see_details_btn($event)"
			class="blue_rectangle_container"
			id="index_title_see_details"
		>
			<p class="index_see_details" style="font-weight: 700">查看详情</p>
		</div>

		<!-- 标题部分左右切换按钮 -->
		<div class="shift_eclipse_light" id="index_title_shift_left">
			<img
				class="shift_left_arrow_light"
				:src="shift_left_arrow_light_src"
			/>
		</div>
		<div class="shift_eclipse_light" id="index_title_shift_right">
			<img
				class="shift_right_arrow_light"
				:src="shift_right_arrow_light_src"
			/>
		</div>

		<!-- 搜索框 -->
		<div class="index_search_back">
			<input
				type="search"
				v-model="search_keywords"
				class="index_search_words"
				placeholder="输入档案关键词"
			/>
			<img
				@mousedown="click_search_btn($event, search_keywords)"
				class="index_search_logo"
				:src="index_search_logo_src"
			/>
		</div>

		<!-- 公告部分 -->
		<p class="index_latest_board_main_title">最新公告</p>
		<div class="index_board_left_line"></div>
		<div class="index_board_right_line"></div>

		<p class="index_board_title" id="index_board_left_title">
			{{ index_board_left_title }}
		</p>
		<p class="index_board_text" id="index_board_left_text">
			{{ index_board_left_text }}
		</p>

		<p class="index_board_title" id="index_board_middle_title">
			{{ index_board_middle_title }}
		</p>
		<p class="index_board_text" id="index_board_middle_text">
			{{ index_board_middle_text }}
		</p>

		<p class="index_board_title" id="index_board_right_title">
			{{ index_board_right_title }}
		</p>
		<p class="index_board_text" id="index_board_right_text">
			{{ index_board_right_text }}
		</p>

		<!-- 公告部分左右切换按钮 -->
		<div class="shift_eclipse_light" id="index_board_shift_left">
			<img
				class="shift_left_arrow_light"
				:src="shift_left_arrow_light_src"
			/>
		</div>
		<div class="shift_eclipse_light" id="index_board_shift_right">
			<img
				class="shift_right_arrow_light"
				:src="shift_right_arrow_light_src"
			/>
		</div>
		<p class="index_board_shift_pages">1&emsp;/&emsp;5</p>

		<!-- 近期展览部份 -->
		<!-- 上半 -->
		<div class="index_exh_back"></div>
		<p class="index_exh_title">近期展览</p>

		<div class="index_exh_up_back"></div>
		<img class="index_exh_up_image" :src="index_exh_up_image_src" />
		<p class="index_exh_up_title1">{{ index_exh_up_title1 }}</p>
		<p class="index_exh_up_title2">{{ index_exh_up_title2 }}</p>
		<p class="index_exh_up_text">
			{{ index_exh_up_text }}
		</p>
		<div class="index_exh_up_line"></div>
		<div
			@mousedown="index_exh_see_details_btn($event, 1)"
			class="blue_rectangle_container"
			id="index_exh_up_see_details"
		>
			<p class="index_see_details" style="font-weight: 700">查看详情</p>
		</div>

		<!-- 下半 -->
		<div class="index_exh_down_back"></div>
		<img class="index_exh_down_image" :src="index_exh_down_image_src" />
		<p class="index_exh_down_title1">{{ index_exh_down_title1 }}</p>
		<p class="index_exh_down_title2">{{ index_exh_down_title2 }}</p>
		<p class="index_exh_down_text2">{{ index_exh_down_text2 }}</p>

		<div class="index_exh_down_line"></div>
		<div
			@mousedown="index_exh_see_details_btn($event, 2)"
			class="blue_rectangle_container"
			id="index_exh_down_see_details"
		>
			<p class="see_details" style="font-weight: 700">查看详情</p>
		</div>

		<!-- 左右切换近期展览的图标 -->
		<div class="shift_eclipse_dark" id="index_exh_shift_left">
			<img
				class="shift_left_arrow_dark"
				:src="shift_left_arrow_dark_src"
			/>
		</div>

		<div class="shift_eclipse_dark" id="index_exh_shift_right">
			<img
				class="shift_right_arrow_dark"
				:src="shift_right_arrow_dark_src"
			/>
		</div>

		<p class="index_exh_shift_pages">1&emsp;/&emsp;5</p>
	</div>
</template>

<script scoped>
export default {
	name: "Home",
	data() {
		return {
            
			search_keywords: "",
			gallery_list_id_up: "1",
			gallery_list_id_down: "1",
            

			publicPath: process.env.BASE_URL,
			index_title_image_src: "background_image_1.png",

			index_main_title: "探险家与原住民：意象再造与现实记录",
			index_sub_title: "阿贝尔·塔斯曼航海日志",
			index_title_intro:
				"阿贝尔·塔斯曼（Abel JanszoonTasman）是荷兰商人、航海家、探险家，1642年至1644年间两次受命于荷兰东印度公司探索南太平洋，是早期到达澳大利亚塔斯马尼亚岛、斐济、新西兰等地的欧洲探险家......",

			shift_left_arrow_light_src: "arrow_left_1.png",
			shift_right_arrow_light_src: "arrow_right_1.png",
			shift_left_arrow_dark_src: "arrow_left_2.png",
			shift_right_arrow_dark_src: "arrow_right_2.png",

			index_search_logo_src: "search_logo.png",

			index_board_left_title: "大平洋考古最新发现",
			index_board_left_text:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置...",
			index_board_middle_title: "荷兰资料馆的资料更新",
			index_board_middle_text:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置...",
			index_board_right_title: "西印度档案总馆地图",
			index_board_right_text:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置...",

			index_exh_up_image_src: "exh_image1.jpg",
			index_exh_up_title1: "菲律宾的地图档案",
			index_exh_up_title2: "西印度档案总馆",
			index_exh_up_text:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置，有一个大型结构。这里的结构跨度长达150千米，每个疑似跑道的结构宽度达到了8000米左右。<br />从该结构来看，这里曾经的科学技术水平应该很高。因此有些人怀疑，这是不是传说中淹没海中的亚特兰蒂斯文明。",

			index_exh_down_image_src: "exh_image2.jpg",
			index_exh_down_title1: "菲律宾的地图档案",
			index_exh_down_title2: "西印度档案总馆",
			index_exh_down_text2:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置，有一个大型结构。这里的结构跨度长达150千米，每个疑似跑道的结构宽度达到了8000米左右。<br />从该结构来看，这里曾经的科学技术水平应该很高。因此有些人怀疑，这是不是传说中淹没海中的亚特兰蒂斯文明。",
		};
	},
	methods: {
		// 标题部分查看详情的按钮
		index_title_see_details_btn(event) {
			this.$router.push({
				name: "LatestContent",
			});
		},

		//搜索框的搜索按钮
		click_search_btn(event) {
			this.$router.push({
				path: "/ArchiveList",
				query: {
					search_keywords: this.search_keywords,
					search_date_from: "",
					search_date_to: "",
					search_language: "",
					now_page_num: "",
				},
			});
		},

		//近期展览的查看详情，option 为 1 表示上半部分的查看详情，option 为 2 表示下半部分的查看详情
		index_exh_see_details_btn(event, option) {
			this.$router.push({
				path: "/ExhibitionGalleryList",
				query: {
					gallery_list_id:
						option === 1
							? this.gallery_list_id_up
							: this.gallery_list_id_down,
				},
			});
		},
	},
};
</script>

<style>
/* 标题图片 */
.index_title_image {
	position: absolute;
	width: 1000px;
	height: 550px;
	left: 0;
	top: -7px;
	opacity: 1;
}

/* 主标题及介绍部分 */
.index_title_back {
	position: absolute;
	width: 431px;
	height: 158px;
	left: 269px;
	top: 109px;

	background: rgba(54, 54, 54, 0.35);
}

.index_main_title {
	position: relative;
	display: flex;
	justify-content: center;

	font-size: 23px;
	line-height: 0;
	color: #ffffff;
}

.index_sub_title {
	position: relative;
	display: flex;
	justify-content: center;

	font-size: 32px;
	line-height: 0;
	color: #ffffff;
}

.index_title_intro {
	position: relative;
	width: 372px;
	height: 63px;
	left: 47px;

	font-size: 12px;
	line-height: 21px;
	color: #ffffff;
}

#index_title_see_details {
	position: absolute;
	left: 426px;
	top: 273px;
}

#index_title_shift_left {
	position: absolute;
	left: 35px;
	top: 290px;
}
#index_title_shift_right {
	position: absolute;
	left: 925px;
	top: 290px;
}

/* 搜索框部分 */
.index_search_back {
	position: absolute;
	width: 751px;
	height: 49px;
	left: 125px;
	top: 450px;

	background: #ffffff;
	border-radius: 7px;
}

.index_search_words {
	position: relative;
	width: 650px;
	height: 33px;
	left: 30px;
	top: 8px;
	border: none;
	outline: none;
	font-size: 17px;
	line-height: 100%;
	color: rgba(0, 0, 0, 0.5);
}

.index_search_logo {
	position: absolute;
	width: 25px;
	height: 33px;
	left: 705px;
	top: 8px;
	cursor: pointer;
}

/* 公告部分 */
.index_latest_board_main_title {
	position: absolute;
	width: 137px;
	height: 23px;
	left: 434px;
	top: 645px;

	font-size: 33px;
	line-height: 0;
	color: #ffffff;
}

.index_board_left_line {
	position: absolute;
	width: 0;
	height: 131px;
	left: 345px;
	top: 770px;
	border: 0.3px solid #ffffff;
}

.index_board_right_line {
	position: absolute;
	width: 0;
	height: 131px;
	left: 660px;
	top: 770px;

	border: 0.3px solid #ffffff;
}

.index_board_title {
	width: 171px;
	height: 16px;

	font-size: 17px;
	line-height: 96%;
	color: #ffffff;
}

.index_board_text {
	width: 237px;
	height: 84px;

	font-size: 11px;
	line-height: 21px;
	color: #ffffff;
}

#index_board_left_title {
	position: absolute;
	left: 126px;
	top: 745px;
}

#index_board_left_text {
	position: absolute;
	left: 84px;
	top: 788px;
}

#index_board_middle_title {
	position: absolute;
	left: 421px;
	top: 745px;
}

#index_board_middle_text {
	position: absolute;
	left: 385px;
	top: 788px;
}

#index_board_right_title {
	position: absolute;
	left: 729px;
	top: 745px;
}

#index_board_right_text {
	position: absolute;
	left: 701px;
	top: 788px;
}

#index_board_shift_left {
	position: absolute;
	left: 370px;
	top: 968px;
}
#index_board_shift_right {
	position: absolute;
	left: 615px;
	top: 968px;
}
.index_board_shift_pages {
	position: absolute;
	width: 54px;
	height: 13px;
	left: 480px;
	top: 968px;

	font-size: 14px;
	line-height: 0;
	color: #ffffff;
}

/*近期展示部分*/
.index_exh_back {
	position: absolute;
	width: 1000px;
	height: 1067px;
	left: 0;
	top: 1069px;
	background: #efefef;
}

.index_exh_title {
	position: absolute;
	width: 142px;
	height: 26px;
	left: 410px;
	top: 1110px;

	font-size: 33px;
	line-height: 96%;
	color: #2f2f2f;
}

.index_exh_up_image {
	position: absolute;
	width: 445px;
	height: 361px;
	left: 77px;
	top: 1227px;
	border-radius: 28px;
}

.index_exh_up_back {
	position: absolute;
	width: 453px;
	height: 359.5px;
	left: 470px;
	top: 1228px;
	background: #023871;
	border-radius: 28px;
}

.index_exh_up_title1 {
	position: absolute;
	width: 328px;
	height: 21px;
	left: 500px;
	top: 1241px;

	font-size: 22px;
	line-height: 96%;
	color: #ffffff;
}

.index_exh_up_title2 {
	position: absolute;
	width: 188px;
	height: 13px;
	left: 500px;
	top: 1286px;

	font-size: 16px;
	line-height: 96%;
	color: #ffffff;
}

.index_exh_up_text {
	position: absolute;
	width: 397px;
	height: 146px;
	left: 500px;
	top: 1330px;

	font-size: 11px;
	line-height: 21px;
	color: #ffffff;
}

.index_exh_up_line {
	position: absolute;
	width: 387px;
	height: 0;
	left: 503px;
	top: 1504px;
	border: 0.3px solid #ffffff;
}
/* “查看详情” 部分 */
#index_exh_up_see_details {
	position: absolute;
	left: 740px;
	top: 1524px;
}

.index_exh_down_back {
	position: absolute;
	width: 439px;
	height: 361px;
	left: 77px;
	top: 1625px;

	background: #023871;
	border-radius: 28px;
}

.index_exh_down_image {
	position: absolute;
	width: 460px;
	height: 362px;
	left: 470px;
	top: 1625px;
	border-radius: 28px;
}

.index_exh_down_title1 {
	position: absolute;
	width: 179px;
	height: 19px;
	left: 113px;
	top: 1640px;

	font-size: 22px;
	line-height: 96%;
	color: #ffffff;
}

.index_exh_down_title2 {
	position: absolute;
	width: 120px;
	height: 16px;
	left: 113px;
	top: 1686px;

	font-size: 16px;
	line-height: 96%;
	color: #ffffff;
}

.index_exh_down_text2 {
	position: absolute;
	width: 387px;
	height: 146px;
	left: 113px;
	top: 1728px;

	font-size: 11px;
	line-height: 21px;
	color: #ffffff;
}

.index_exh_down_line {
	position: absolute;
	width: 383px;
	height: 0;
	left: 113px;
	top: 1902px;
	border: 0.3px solid #ffffff;
}
/* “查看详情” 部分 */

#index_exh_down_see_details {
	position: absolute;
	left: 120px;
	top: 1925px;
}

.index_exh_shift_pages {
	position: absolute;
	width: 54px;
	height: 13px;
	left: 470px;
	top: 2040px;

	font-size: 14px;
	line-height: 0;
	color: #000;
}

#index_exh_shift_left {
	position: absolute;
	width: 30px;
	height: 30px;
	left: 350px;
	top: 2040px;
}
#index_exh_shift_right {
	position: absolute;
	width: 30px;
	height: 30px;
	left: 615px;
	top: 2040px;
}

.nav_bar_underline {
	visibility: hidden;
}
</style>