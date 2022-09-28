<template>
	<div class="IndexBoard">
		<!-- 公告部分 -->
		<div class="ExhibitionBoardTitle">近期展览</div>

		<div class="ContentContainer">
			<div v-for="(item, index) in ExhibitionList" :key="index">
				<div
					class="ItemContainer"
					@click="GoExhibition(item, index)"
					@mouseover="ItemMouseOver(`Exhibition${index}`)"
					@mouseleave="ItemMouseLeave(`Exhibition${index}`)"
				>
					<div class="ImageContainer">
						<div
							class="BackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div
						class="ImageTitleContainer"
						:id="`TitleContainerExhibition${index}`"
					>
						<div class="ImageTitle" :id="`TitleExhibition${index}`">
							{{ item.Title }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="BoardContainer">
			<div class="ExhibitionBoardTitle" style="margin: 30px">
				最新公告
			</div>
			<div class="ContentContainer">
				<div
					v-for="(item, index) in BoardList[BoardIndex]"
					:key="index"
				>
					<div
						class="ItemContainer"
						:id="`ItemContainerBoard${index}`"
						@click="GoBoard(item, index)"
						@mouseover="ItemMouseOver(`Board${index}`)"
						@mouseleave="ItemMouseLeave(`Board${index}`)"
					>
						<div class="ImageContainer">
							<div
								class="BackgroundImage"
								:style="`background-image:url(${item.Image})`"
							></div>
						</div>
						<div
							class="ImageTitleContainer"
							:id="`TitleContainerBoard${index}`"
						>
							<div class="ImageTitle" :id="`TitleBoard${index}`">
								{{ item.Title }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="BoardShiftContainer">
				<!-- 公告部分左右切换按钮 -->
				<img
					@click="BoardShift(-1)"
					class="PageShift"
					:src="ShiftLeftSrc"
				/>
				<div class="BoardShiftPages">
					{{ BoardIndex + 1 }}&emsp;/&emsp;{{ BoardTotal }}
				</div>
				<img
					@click="BoardShift(1)"
					class="PageShift"
					:src="ShiftRightSrc"
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
			// 近期展览的标题和图片
			ExhibitionList: [
				{
					Title: "测试标题1测试标题1测试标题1测试标题1测试标题1测试标题1",
					Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
				},
				{
					Title: "测试标题2测试标题2测试标题2测试标题2测试标题2测试标题2",
					Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
				},
				{
					Title: "测试标题3测试标题3测试标题3测试标题3测试标题3测试标题3",
					Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
				},
			],

			// 最新公告的Index，总共多少个，公告的图片，三个一组放到数组里面
			BoardIndex: 0,
			BoardTotal: 1,
			BoardList: [
				[
					{
						Title: "项目组获得西班牙海军博物馆前副馆长马塞利诺·冈萨雷斯部分画作资料",
						Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
					},
					{
						Title: "文理共建，深度融合，探索数字人文建设模式",
						Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
					},
					{
						Title: "课题组成员参加第五届“文学与图像”学术论坛",
						Image: "https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
					},
				],
			],

			// 切换按钮的图片
			ShiftLeftSrc: "ShiftLeft.png",
			ShiftRightSrc: "ShiftRight.png",
		};
	},
	methods: {
		BoardShift: throttle(function (d) {
			let BoardImage =
				document.querySelectorAll(".BackgroundImage");
			let BoardTitle = document.querySelectorAll(".ImageTitle");

			let ImageFadeTimer = setInterval(ImageFade, 7);
			let opa = 100;
			let _this = this;
			function ImageFade() {
				if (opa > 0) {
					for (let i = 3; i < 6; i++) {
						BoardImage[i].style.opacity = String(opa / 100);
						BoardTitle[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.BoardIndex =
						(_this.BoardIndex + d + _this.BoardTotal) %
						_this.BoardTotal;
				} else if (opa > -100) {
					for (let i = 3; i < 6; i++) {
						BoardImage[i].style.opacity = String(-opa / 100);
						BoardTitle[i].style.opacity = String(-opa / 100);
					}
				} else {
					clearInterval(ImageFadeTimer);
				}
				opa--;
			}
		}, 2000),

		GoBoard(item, index) {
			this.$router.push({
				path: "/LatestBoard",
				query: {
					BoardIndex: index,
				},
			});
			this.$store.dispatch("GetHeaderIndex", 2);
		},

		GoExhibition(item, index) {},

		ItemMouseOver(type) {
			// 鼠标悬浮修改 Style
			let TitleContainer = document.querySelector(
				`#TitleContainer` + type
			);
			let Title = document.querySelector(`#Title` + type);
			TitleContainer.style.background = "rgb(02, 38, 71, 0.6)";
			Title.style.color = "white";
		},
		ItemMouseLeave(type) {
			// 鼠标离开修改 Style
			let TitleContainer = document.querySelector(
				`#TitleContainer` + type
			);
			let Title = document.querySelector(`#Title` + type);
			TitleContainer.style.background = "white";
			Title.style.color = "black";
		},
	},
};
</script>

<style scoped>
.IndexBoard {
	position: relative;
	width: 100%;
	height: 1200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	/* 字体颜色 */
	color: black;
	/* background: blue; */
}

/* 标题 */
.ExhibitionBoardTitle {
	position: relative;
	width: 200px;
	height: 80px;
	font-size: 48px;
	line-height: 166%;
	/* background: red; */
}

/* 近期展览内容的 Container */
.ContentContainer {
	position: relative;
	width: 1020px;
	height: 260px;
	/* background: skyblue; */

	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

/* 最新公告的 Container，包括标题、内容、分页器 */
.BoardContainer {
	position: relative;
	width: 1020px;
	height: 560px;
	background: white;
	margin-top: 30px;
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	border-radius: 7px;
}

/* 近期展览、最新公告 每一部分的 Container */
.ItemContainer {
	position: relative;
	width: 300px;
	height: 260px;
	margin: 0 20px 0 20px;
	/* background: red; */
	border-radius: 7px;
	cursor: pointer;
	filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
}
/* 图片的 Container */
.ImageContainer {
	position: relative;
	width: 100%;
	height: 180px;
	border-radius: 7px 7px 0 0;
	/* background: blue; */
}
.BackgroundImage {
	width: 100%;
	height: 0;
	padding-bottom: 60%;
	overflow: hidden;
	background-position: top center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px 7px 0 0;
}

.ImageTitleContainer {
	position: relative;
	width: 100%;
	height: 80px;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0 0 7px 7px;
}
.ImageTitle {
	font-size: 18px;
	line-height: 150%;
	margin: 0 30px 0 30px;
	color: black;
	text-align: center;

	/*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

/* 翻页 */
.BoardShiftContainer {
	position: relative;
	width: 459px;
	height: 60px;
	margin: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* background: red; */
}

.BoardShiftPages {
	width: 90px;
	height: 60px;
	text-align: center;

	font-size: 20px;
	line-height: 60px;
}
</style>