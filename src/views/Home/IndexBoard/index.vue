<template>
	<div style="position: relative; top: 129px; width: 100%; height: 800px">
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
		<!-- <div class="BoardTextContainer">
			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_left_title[BoardIndex] }}
				</div>
				<div class="index_board_text">
					{{ index_board_left_text[BoardIndex] }}
				</div>
			</div>

			<div class="index_board_left_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_middle_title[BoardIndex] }}
				</div>
				<div class="index_board_text">
					{{ index_board_middle_text[BoardIndex] }}
				</div>
			</div>

			<div class="index_board_right_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title">
					{{ index_board_right_title[BoardIndex] }}
				</div>
				<div class="index_board_text">
					{{ index_board_right_text[BoardIndex] }}
				</div>
			</div>
		</div> -->

		<div class="BoardTextContainer">
			<div class="BoardTextTitle" @click="GoIndexBoard">{{ BoardTextTitle[BoardIndex] }}</div>
			<div class="BoardTextParagraph">
				&emsp;&emsp;{{ BoardTextParagraph[BoardIndex] }}
			</div>
		</div>

		<div class="BoardShiftContainer">
			<!-- 公告部分左右切换按钮 -->
			<div
				@mousedown="BoardShift(-1)"
				class="shift_eclipse_light"
				id="index_board_shift_left"
			>
				<img
					class="shift_left_arrow_light"
					:src="shift_left_arrow_light_src"
				/>
			</div>

			<div class="index_board_shift_pages">
				{{ BoardIndex + 1 }}&emsp;/&emsp;{{ BoardTotal }}
			</div>

			<div
				@mousedown="BoardShift(1)"
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
import { throttle } from "lodash";
export default {
	name: "IndexBoard",
	data() {
		return {
			search_keywords: "",
			shift_left_arrow_light_src: "arrow_left_1.png",
			shift_right_arrow_light_src: "arrow_right_1.png",

			index_search_logo_src: "search_logo.png",

			// 记录公告现在展示第几个，总共多少个
			BoardIndex: 0,
			BoardTotal: 2,

			BoardTextTitle: [
				"课题组成员参加第五届“文学与图像”学术论坛",
				"文理共建，深度融合，探索数字人文建设模式",
			],

			BoardTextParagraph: [
				"2022年1月8—9日，项目组成员参加北京大学第五届“文学与图像”学术论坛并发表论文：《画像与海图：对“中国船”在太平洋文化交流中影响的几点思考》（吴杰伟）、《〈西印度舶来药物史〉第二部分插图研究》（于施洋）、《图绘太平洋：荷兰东印度公司太平洋航路的开辟与航海图绘制》（谢侃侃）、《蒙昧的帝国：Bik 海参采捕图与荷兰殖民知识焦虑，1814—1824》（徐冠勉）。",
				"项目团队和人工智能研究院智能系统软件研究中心马郓团队开展紧密合作，共同建设“太平洋丝绸之路档案文献数据库”。项目团队主要负责收集、整理太平洋丝绸之路外文档案文献，人工智能研究院团队师生主要负责技术层面的建设和实施工作，探索出“深度融合，适度交叉，有序推进，互相成就”的数字人文建设模式。",
			],
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

		BoardShift: throttle(function (d) {
			let IndexBoardTitle = document.querySelector(".BoardTextTitle");
			let IndexBoardText = document.querySelector(".BoardTextParagraph");

			let image_fade_timer = setInterval(image_fade, 7);
			let opa = 100;
			let _this = this;
			function image_fade() {
				if (opa > 0) {
					IndexBoardTitle.style.opacity = String(opa / 100);
					IndexBoardText.style.opacity = String(opa / 100);
				} else if (opa === 0) {
					_this.BoardIndex =
						(_this.BoardIndex + d + _this.BoardTotal) %
						_this.BoardTotal;
				} else if (opa > -100) {
					IndexBoardTitle.style.opacity = String(-opa / 100);
					IndexBoardText.style.opacity = String(-opa / 100);
				} else {
					clearInterval(image_fade_timer);
				}
				opa--;
			}
		}, 2000),

        GoIndexBoard(){
            this.$router.push({
                path: '/LatestBoard',
                query: {
                    'BoardIndex': this.BoardIndex,
                }
            })
        }
	},
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
}

/* 公告整体的 Container */
/* .BoardTextContainer {
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
} */

/* 左中右每个部分的 Container */
/* .BoardTextBlock {
	width: 364px;
	height: 258px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
} */

/* 公告中间两条竖着的白线 */
/* .index_board_left_line {
	width: 0;
	height: 189px;
	border: 0.5px solid #ffffff;
}
.index_board_right_line {
	width: 0;
	height: 189px;
	border: 0.5px solid #ffffff;
} */

/* 每一小部分的标题和文字描述 */
/* .index_board_title {
	width: 340px;
	height: 30px;
	font-size: 28px;
	color: #ffffff;
	padding: 10px;
	text-align: center;
	opacity: 1;
}
.index_board_text {
	width: 340px;

	font-size: 20px;
	line-height: 200%;
	color: #ffffff;
	padding: 10px;

	opacity: 1;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
} */

.BoardTextContainer {
	position: absolute;
	width: 1000px;
	height: 298px;
	top: 370px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: red; */
}

.BoardTextTitle {
	position: absolute;
	width: auto;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	top: 10px;
	text-align: center;
	font-size: 32px;
	line-height: 150%;
	color: #ffffff;
	/* background: blue; */
}
.BoardTextParagraph {
	position: absolute;
	width: 800px;
	height: auto;
	top: 90px;
	left: 100px;
	color: #ffffff;
	font-size: 24px;
	line-height: 170%;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
.BoardTextTitle:hover {
	text-decoration: underline;
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
	width: 90px;
	height: 60px;
	text-align: center;

	font-size: 20px;
	line-height: 60px;
	color: #ffffff;
}
</style>