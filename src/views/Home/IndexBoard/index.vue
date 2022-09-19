<template>
	<div style="position: relative; width: 100%; height: 781px">
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
		<div class="index_latest_board_main_title">最新公告</div>
		<div class="BoardTextContainer">
			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_left_title }}
				</div>
				<div class="index_board_text">
					{{ index_board_left_text }}
				</div>
			</div>

			<div class="index_board_left_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_middle_title }}
				</div>
				<div class="index_board_text">
					{{ index_board_middle_text }}
				</div>
			</div>

			<div class="index_board_right_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_right_title }}
				</div>
				<div class="index_board_text">
					{{ index_board_right_text }}
				</div>
			</div>
		</div>

		<div class="BoardShiftContainer">
			<!-- 公告部分左右切换按钮 -->
			<div
				@mousedown="board_shift_left_btn"
				class="shift_eclipse_light"
				id="index_board_shift_left"
			>
				<img
					class="shift_left_arrow_light"
					:src="shift_left_arrow_light_src"
				/>
			</div>

			<div class="index_board_shift_pages">1&emsp;/&emsp;5</div>

			<div
				@mousedown="board_shift_right_btn"
				class="shift_eclipse_light"
				id="index_board_shift_right"
			>
				<img
					class="shift_right_arrow_light"
					:src="shift_right_arrow_light_src"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "IndexBoard",
	data() {
		return {
			search_keywords: "",
			shift_left_arrow_light_src: "arrow_left_1.png",
			shift_right_arrow_light_src: "arrow_right_1.png",

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
		};
	},
    methods: {
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

		board_shift_left_btn() {
			let page_num = document.querySelector(".index_board_shift_pages");
			let num = parseInt(page_num.textContent.charAt(0));
			let left_title = document.getElementById("index_board_left_title");
			let left_text = document.getElementById("index_board_left_text");

			num = num === 1 ? 5 : num - 1;
			page_num.textContent =
				num.toString() + page_num.textContent.substring(1);
			left_title.textContent = `the ${num}th title`;
			left_text.textContent = `the ${num}th text`;
		},

		board_shift_right_btn() {
			let page_num = document.querySelector(".index_board_shift_pages");
			let num = parseInt(page_num.textContent.charAt(0));
			let left_title = document.getElementById("index_board_left_title");
			let left_text = document.getElementById("index_board_left_text");

			num = num === 5 ? 1 : num + 1;
			page_num.textContent =
				num.toString() + page_num.textContent.substring(1);
			left_title.textContent = `the ${num}th title`;
			left_text.textContent = `the ${num}th text`;
		},

    }
};
</script>

<style scoped>
/* 搜索框部分 */
.index_search_back {
	position: absolute;
	width: 1081px;
	height: 70px;
	left: 0;
	right: 0;
	margin: auto;
	top: 73px;

	background: #ffffff;
	border-radius: 7px;
}

.index_search_words {
	position: relative;
	width: 650px;
	height: 55px;
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
	width: 36px;
	height: 48px;
	left: 1016px;
	top: 11px;
	cursor: pointer;
}

/* 公告部分 */
.index_latest_board_main_title {
	position: absolute;
	width: 200px;
	height: 42px;
	top: 246px;
	left: 0;
	right: 0;
	margin: auto;

	font-size: 48px;
	line-height: 150%;
	color: #ffffff;

    font-family:"微软雅黑";
}

.BoardTextContainer {
	position: absolute;
	width: 1284px;
	height: 298px;
	top: 370px;
	left: 0;
	right: 0;
	margin: auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.BoardTextBlock {
	width: 364px;
	height: 258px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
}

.index_board_left_line {
	width: 0;
	height: 189px;
	border: 0.5px solid #ffffff;
}
.index_board_right_line {
	width: 0;
	height: 189px;
	border: 0.5px solid #ffffff;
}

.index_board_title {
	width: 340px;
	height: 30px;
	font-size: 24px;
	color: #ffffff;
	padding: 10px;
	text-align: center;
}

.index_board_text {
	width: 340px;
	height: 125px;

	font-size: 16px;
	line-height: 180%;
	color: #ffffff;
	padding: 10px;
}

.BoardShiftContainer {
	position: absolute;
	width: 459px;
	height: 60px;
	left: 0;
	right: 0;
	margin: auto;
	top: 666px;

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.index_board_shift_pages {
	width: 73px;
	height: 60px;
    text-align: center;

	font-size: 20px;
	line-height: 60px;
	color: #ffffff;
}
</style>