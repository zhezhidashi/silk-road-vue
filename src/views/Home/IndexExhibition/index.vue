<template>
	<div>
		<!-- 近期展览部份 -->
		<!-- 上半 -->
		<div class="index_exh_back">
			<div class="index_exh_title">近期展览</div>

			<div class="index_exh_up_back">
				<img class="index_exh_up_image" :src="index_exh_up_image_src" />
				<div class="index_exh_up_title1">{{ index_exh_up_title1 }}</div>
				<div class="index_exh_up_title2">{{ index_exh_up_title2 }}</div>
				<div class="index_exh_up_text">
					{{ index_exh_up_text }}
				</div>
				<div class="index_exh_up_line"></div>
				<div
					@mousedown="index_exh_see_details_btn($event, 1)"
					class="blue_rectangle_container"
					id="index_exh_up_see_details"
				>
					<div class="index_see_details" style="font-weight: 700">
						查看详情
					</div>
				</div>
			</div>

			<!-- 下半 -->
			<div class="index_exh_down_back">
				<img
					class="index_exh_down_image"
					:src="index_exh_down_image_src"
				/>
				<div class="index_exh_down_title1">
					{{ index_exh_down_title1 }}
				</div>
				<div class="index_exh_down_title2">
					{{ index_exh_down_title2 }}
				</div>
				<div class="index_exh_down_text2">
					{{ index_exh_down_text2 }}
				</div>

				<div class="index_exh_down_line"></div>
				<div
					@mousedown="index_exh_see_details_btn($event, 2)"
					class="blue_rectangle_container"
					id="index_exh_down_see_details"
				>
					<div class="see_details" style="font-weight: 700">
						查看详情
					</div>
				</div>
			</div>

			<!-- 左右切换近期展览的图标 -->
			<div class="ExhibitionShiftContainer">
				<div
					@mousedown="exh_shift_left_btn"
					class="shift_eclipse_dark"
					id="index_exh_shift_left"
				>
					<img
						class="shift_left_arrow_dark"
						:src="shift_left_arrow_dark_src"
					/>
				</div>

				<div class="index_exh_shift_pages">1&emsp;/&emsp;5</div>

				<div
					@mousedown="exh_shift_right_btn"
					class="shift_eclipse_dark"
					id="index_exh_shift_right"
				>
					<img
						class="shift_right_arrow_dark"
						:src="shift_right_arrow_dark_src"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "IndexExhibition",
	data() {
		return {
			gallery_list_id_up: "1",
			gallery_list_id_down: "1",

			shift_left_arrow_dark_src: "arrow_left_2.png",
			shift_right_arrow_dark_src: "arrow_right_2.png",

			index_exh_up_image_src: "exh_image1.jpg",
			index_exh_up_title1: "菲律宾的地图档案",
			index_exh_up_title2: "西印度档案总馆",
			index_exh_up_text:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置，有一个大型结构。这里的结构跨度长达150千米，每个疑似跑道的结构宽度达到了8000米左右。<br>从该结构来看，这里曾经的科学技术水平应该很高。因此有些人怀疑，这是不是传说中淹没海中的亚特兰蒂斯文明。",

			index_exh_down_image_src: "exh_image2.jpg",
			index_exh_down_title1: "菲律宾的地图档案",
			index_exh_down_title2: "西印度档案总馆",
			index_exh_down_text2:
				"一位业余海底考古学家Mac·McIver在哥斯达黎加的科科斯岛附近发现了一座庞大的水下结构，非常类似于大型机场。据他介绍，在科科斯岛东北约80千米处，水下约1800米左右的位置，有一个大型结构。这里的结构跨度长达150千米，每个疑似跑道的结构宽度达到了8000米左右。<br>从该结构来看，这里曾经的科学技术水平应该很高。因此有些人怀疑，这是不是传说中淹没海中的亚特兰蒂斯文明。",
		};
	},
	methods: {
		exh_shift_left_btn() {
			let page_num = document.querySelector(".index_exh_shift_pages");
			let num = parseInt(page_num.textContent.charAt(0));

			num = num === 1 ? 5 : num - 1;
			page_num.textContent =
				num.toString() + page_num.textContent.substring(1);
		},

		exh_shift_right_btn() {
			let page_num = document.querySelector(".index_exh_shift_pages");
			let num = parseInt(page_num.textContent.charAt(0));

			num = num === 5 ? 1 : num + 1;
			page_num.textContent =
				num.toString() + page_num.textContent.substring(1);
		},
	},
};
</script>

<style scoped>
/*近期展示部分*/
.index_exh_back {
	position: absolute;
	width: 100%;
	height: 1642px;
	background: #efefef;
}

.index_exh_title {
	position: absolute;
	width: 196px;
	height: 47px;
	top: 66px;
	left: 0;
	right: 0;
	margin: auto;

	font-size: 33px;
	line-height: 100%;
	color: #2f2f2f;
}

/* 上半部分 */
.index_exh_up_back {
	position: absolute;
	width: 1218px;
	height: 520px;
	top: 189px;
	left: 0;
	right: 0;
	margin: auto;
	background: #023871;
	border-radius: 28px;
}
.index_exh_up_image {
	position: absolute;
	width: 633px;
	height: 520px;
	left: 0;
	top: 0;
	border-radius: 28px;
}

.index_exh_up_title1 {
	position: absolute;
	width: 472px;
	height: 31px;
	left: 609px;
	top: 48px;

	font-size: 32px;
	line-height: 100%;
	color: #ffffff;
}

.index_exh_up_title2 {
	position: absolute;
	width: 270px;
	height: 19px;
	left: 609px;
	top: 99px;

	font-size: 20px;
	line-height: 100%;
	color: #ffffff;
}

.index_exh_up_text {
	position: absolute;
	width: 574px;
	height: 229px;
	left: 609px;
	top: 147px;

	font-size: 16px;
	line-height: 200%;
	color: #ffffff;
}

.index_exh_up_line {
	position: absolute;
	width: 557px;
	height: 0;
	left: 613px;
	top: 398px;

	border: 1px solid #ffffff;
}
/* “查看详情” 部分 */
#index_exh_up_see_details {
	position: absolute;
	width: 180px;
	height: 48px;
	left: 991px;
	top: 426px;
}

/* 下半部分 */
.index_exh_down_back {
	position: absolute;
	width: 1218px;
	height: 520px;
	top: 761px;
	left: 0;
	right: 0;
	margin: auto;

	background: #023871;
	border-radius: 28px;
}

.index_exh_down_image {
	position: absolute;
	width: 633px;
	height: 520px;
	left: 585px;
	top: 0;
	border-radius: 28px;
}

.index_exh_down_title1 {
	position: absolute;
	width: 436px;
	height: 32px;
	left: 52px;
	top: 51px;

	font-size: 32px;
	line-height: 100%;
	color: #ffffff;
}

.index_exh_down_title2 {
	position: absolute;
	width: 445px;
	height: 21px;
	left: 52px;
	top: 102px;

	font-size: 20px;
	line-height: 100%;
	color: #ffffff;
}

.index_exh_down_text2 {
	position: absolute;
	width: 557px;
	height: 234px;
	left: 52px;
	top: 149px;

	font-size: 16px;
	line-height: 200%;
	color: #ffffff;
}

.index_exh_down_line {
	position: absolute;
	width: 557px;
	height: 0;
	left: 52px;
	top: 400px;

	border: 1px solid #ffffff;
}
#index_exh_down_see_details {
	position: absolute;
	width: 180px;
	height: 48px;
	left: 57px;
	top: 432px;
}

/* “查看详情” 部分 */
.ExhibitionShiftContainer {
	position: absolute;
	width: 459px;
	height: 60px;
	left: 0;
	right: 0;
	margin: auto;
	top: 1400px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.index_exh_shift_pages {
	width: 106px;
	height: 60px;
    
	font-size: 20px;
    text-align: center;
	line-height: 60px;
	color: #000;
}

#index_exh_shift_left {
	width: 30px;
	height: 30px;
}
#index_exh_shift_right {
	width: 30px;
	height: 30px;
}
</style>