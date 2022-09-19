<template>
	<div>
		<!-- 标题图片 -->
		<div class="swiper-container" id="IndexImageContainer">
			<div class="swiper-wrapper">
				<div
					class="swiper-slide"
					v-for="(item, index) in index_title_image_src"
					:key="index"
				>
					<img class="IndexImage" :src="item" />
				</div>
			</div>

			<div class="swiper-pagination"></div>
			<!-- 如果需要导航按钮 -->
			<div class="swiper-button-prev" id="IndexImageShiftPrev"></div>
			<div class="swiper-button-next" id="IndexImageShiftNext"></div>
		</div>
		<!-- 查看详情部分 -->
		<div
			@mousedown="index_title_see_details_btn($event)"
			class="blue_rectangle_container"
			id="index_title_see_details"
		>
			<div class="index_see_details" style="font-weight: 700">
				查看详情
			</div>
		</div>
		<!-- 标题部分 -->
		<!-- <div class="index_title_back">
			<div class="index_main_title">
				{{ index_main_title[now_img_num] }}
			</div>
			<div class="index_sub_title">
				{{ index_sub_title[now_img_num] }}
			</div>
			<div class="index_title_intro">
				&emsp;&emsp;{{ index_title_intro[now_img_num] }}
			</div>
		</div> -->
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

			index_main_title: [
				"有帆自远方来:",
				"有帆自远方来:",
				"有帆自远方来:",
				"有帆自远方来:",
				"有帆自远方来:",
				"有帆自远方来:",
				"有帆自远方来:",
			],
			index_sub_title: [
				"大帆船日主题展",
				"大帆船日主题展",
				"大帆船日主题展",
				"大帆船日主题展",
				"大帆船日主题展",
				"大帆船日主题展",
				"大帆船日主题展",
			],
			index_title_intro: [
				"《古今形胜之图》，约1574年。传入欧洲的首张中国（明）全图，福建金沙书院重刻本，经闽南华商取得，在马尼拉华人协助下由传教士将图注译为西班牙文，交菲律宾都督呈递西班牙国王菲利普二世。图中城镇、山川、河流、军事要地均十分详细。",
				"奥特里乌斯绘制的太平洋地图（局部），1589年。作者出生于哈布斯堡王朝治下的安特卫普，对海外探索极为关注，同时享有发达的图书出版资源，搜集和传播了大量有关太平洋的新知，如图中新几内亚、所罗门群岛均刚刚为西班牙人由秘鲁西航“发现”。",
				"西班牙人绘中国艾尔摩沙岛和南方部分地区，1626年。附于1626年菲岛都督上书，称已占领艾尔摩沙岛北部一港口。",
				"阿卡普尔科圣迭戈棱堡设计图，1707年9月1日。原防御工事建于1615-1617年，因战役和地震多次重修，此为工程师Luis Bouchard de Becourt为“加强南海沿岸及港口海防”所提交的报告之一。该堡垒1949年改造为博物馆，向游人开放至今，许多收藏和展陈与“中国船”有关。",
				"卡加延河岸教堂分布图（局部），1719年。船长、领航员Juan Luis de Acosta绘，以字母标注了吕宋岛最北端卡加延河流域地势、道路、村庄、教堂等。",
				"马尼拉-加的斯航线图，1777年。18世纪中后期，西班牙成立王家菲律宾公司，此后大帆船也可行驶印度洋、大西洋航线。",
				"缺失",
			],
		};
	},
	method: {
		// 标题部分查看详情的按钮
		index_title_see_details_btn(event) {
			this.$router.push({
				name: "LatestContent",
			});
		},
	},
	mounted() {
		// 初始化 Swiper
		var mySwiper = new Swiper(
			document.querySelector("#IndexImageContainer"),
			{
				loop: true, // 循环模式选项
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
			}
		);
	},
};
</script>

<style scoped>
/* 标题图片 */
#IndexImageContainer {
	position: relative;
	width: 100%;
	height: auto;
	left: 0;
	top: -7px;
}
.IndexImage {
	width: 100%;
}

/* 标题部分“查看详情”  */
#index_title_see_details {
	position: absolute;
	right: 30px;
	margin: auto;
	z-index: 20;
}

/* 分页器颜色 */

/* 主标题及介绍部分 */
/* .index_title_back {
	position: absolute;
	width: 621px;
	height: 227px;
	left: 400px;
	top: 109px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background: rgba(54, 54, 54, 0.35);
}

.index_main_title {
	position: relative;
	text-align: center;
	font-size: 28px;
	line-height: 120%;
	color: #ffffff;
}

.index_sub_title {
	position: relative;
	text-align: center;
	margin-left: 40px;
	margin-right: 40px;
	font-size: 23px;
	line-height: 120%;
	color: #ffffff;
}

.index_title_intro {
	position: relative;
	margin-left: 20px;
	margin-right: 20px;
	font-size: 13px;
	line-height: 140%;
	color: #ffffff;
} */

/* #index_title_shift_left {
	position: absolute;
	left: 53px;
	top: 412px;
}
#index_title_shift_right {
	position: absolute;
	left: 1350px;
	top: 412px;
} */
</style>