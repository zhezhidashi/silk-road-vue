<template>
	<div class="IndexBoard">
		<!-- 公告部分 -->
		<div class="index_latest_board_main_title">最新公告</div>

		<div class="BoardTextContainer">
			<div class="BoardTextBlock">
				<div class="index_board_title" @click="GoIndexBoard(3 * BoardIndex)">
					{{ IndexBoardTitle[3 * BoardIndex] }}
				</div>
				<div class="index_board_text">
					{{ IndexBoardText[3 * BoardIndex] }}
				</div>
			</div>

			<div class="index_board_left_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title" @click="GoIndexBoard(3 * BoardIndex + 1)">
					{{ IndexBoardTitle[3 * BoardIndex + 1] }}
				</div>
				<div class="index_board_text">
					{{ IndexBoardText[3 * BoardIndex + 1] }}
				</div>
			</div>

			<div class="index_board_right_line"></div>

			<div class="BoardTextBlock">
				<div class="index_board_title" @click="GoIndexBoard(3 * BoardIndex + 2)">
					{{ IndexBoardTitle[3 * BoardIndex + 2] }}
				</div>
				<div class="index_board_text">
					{{ IndexBoardText[3 * BoardIndex + 2] }}
				</div>
			</div>
		</div>

		<div class="BoardShiftContainer">
			<!-- 公告部分左右切换按钮 -->
			<div
				@click="BoardShift(-1)"
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
				@click="BoardShift(1)"
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
			shift_left_arrow_light_src: "arrow_left_1.png",
			shift_right_arrow_light_src: "arrow_right_1.png",

			// 记录公告现在展示第几个，总共多少个
			BoardIndex: 0,
			BoardTotal: 1,

            IndexBoardTitle: [
                "项目组获得西班牙海军博物馆前副馆长马塞利诺·冈萨雷斯部分画作资料",
                "文理共建，深度融合，探索数字人文建设模式",
                "课题组成员参加第五届“文学与图像”学术论坛",
            ],
            IndexBoardText: [
                "2022年9月20日，西班牙海军上校、西班牙海军博物馆前副馆长、西班牙王家海军学院院士马塞利诺·冈萨雷斯（Marcelino González, 1943- ）将其七十余幅画作授权项目组使用，其中二十余幅集中展示16世纪西班牙探索太平洋相关的人物和船只，将结集成“波涛中的面孔”主题线上展览。这些人物中，有著名航海家如麦哲伦、德雷克这些英雄式的“明星”，也包括不甚里程碑式、传奇性的探险家——但回到历史现场，其“征服”世界上最后一片未知大洋的勇气和智慧依然令人钦佩。画作参照这些历史人物最有名的油画、版画，通过再创作，以相对统一的尺寸、材质（水彩或铅笔）、笔触画成，体现出一位退役海军军官对前辈的理解，对西班牙最辉煌的一段海洋史的回顾。",
                "项目团队和人工智能研究院智能系统软件研究中心马郓团队开展紧密合作，共同建设“太平洋丝绸之路档案文献数据库”。项目团队主要负责收集、整理太平洋丝绸之路外文档案文献，人工智能研究院团队师生主要负责技术层面的建设和实施工作，探索出“深度融合，适度交叉，有序推进，互相成就”的数字人文建设模式。",
                "2022年1月8—9日，项目组成员参加北京大学第五届“文学与图像”学术论坛并发表论文：《画像与海图：对“中国船”在太平洋文化交流中影响的几点思考》（吴杰伟）、《〈西印度舶来药物史〉第二部分插图研究》（于施洋）、《图绘太平洋：荷兰东印度公司太平洋航路的开辟与航海图绘制》（谢侃侃）、《蒙昧的帝国：Bik 海参采捕图与荷兰殖民知识焦虑，1814—1824》（徐冠勉）。",
            ],
		};
	},
	methods: {
		BoardShift: throttle(function (d) {
			let IndexBoardTitle =
				document.querySelectorAll(".index_board_title");
			let IndexBoardText = document.querySelectorAll(".index_board_text");

			let image_fade_timer = setInterval(image_fade, 7);
			let opa = 100;
			let _this = this;
			function image_fade() {
				if (opa > 0) {
					for (let i = 0; i < 3; i++) {
						IndexBoardTitle[i].style.opacity = String(opa / 100);
						IndexBoardText[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.BoardIndex =
						(_this.BoardIndex + d + _this.BoardTotal) %
						_this.BoardTotal;
				} else if (opa > -100) {
					for (let i = 0; i < 3; i++) {
						IndexBoardTitle[i].style.opacity = String(-opa / 100);
						IndexBoardText[i].style.opacity = String(-opa / 100);
					}
				} else {
					clearInterval(image_fade_timer);
				}
				opa--;
			}
		}, 2000),

		GoIndexBoard(d) {
			this.$router.push({
				path: "/LatestBoard",
				query: {
					BoardIndex: d,
				},
			});
            this.$store.dispatch("GetHeaderIndex", 2);
		},
	},
};
</script>

<style scoped>
.IndexBoard {
	position: relative;
	width: 100%;
	height: 800px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

    /* 字体颜色 */
    color: black;
	/* background: blue; */
}
/* 公告部分 */
.index_latest_board_main_title {
	position: relative;
	width: 200px;
	height: auto;

	font-size: 48px;
	line-height: 150%;
	/* background: red; */
}

.BoardTextContainer {
	position: relative;
	width: 1200px;
	height: auto;

	display: flex;
	justify-content: space-around;
	align-items: center;
	/* background: red; */
}

/* 左中右每个部分的 Container */
.BoardTextBlock {
	width: 390px;
	height: 258px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	/* background: blue; */
}

/* 公告中间两条竖着的白线 */
.index_board_left_line {
	width: 0;
	height: 210px;
	border: 0.5px solid darkblue;
}
.index_board_right_line {
	width: 0;
	height: 210px;
	border: 0.5px solid darkblue;
}

/* 每一小部分的标题和文字描述 */
.index_board_title {
	width: 350px;
	height: auto;
	font-size: 20px;
	line-height: 150%;
	text-align: center;
	opacity: 1;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;

    cursor: pointer;
}
.index_board_text {
	width: 360px;

	font-size: 18px;
	line-height: 200%;

	opacity: 1;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
}

.index_board_title:hover {
	text-decoration: underline;
}

/* 翻页 */
.BoardShiftContainer {
	position: relative;
	width: 459px;
	height: 60px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	/* background: red; */
}

.index_board_shift_pages {
	width: 90px;
	height: 60px;
	text-align: center;

	font-size: 20px;
	line-height: 60px;
}
</style>