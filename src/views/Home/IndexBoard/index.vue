<template>
	<div class="IndexBoard">
		<!-- 公告部分 -->
		<div class="ExhibitionBoardTitle">线上展览</div>

		<div class="ContentContainer">
			<div
				v-for="(item, index) in ExhibitionList[ExhibitionIndex]"
				:key="index"
			>
				<div
					class="Card HoverShadow ItemContainer"
					@click="GoExhibition(item, index)"
				>
					<div class="ImageContainer">
						<div
							class="BackgroundImage"
							id="ExhibitionBackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div class="ImageTitleContainer">
						<div class="ImageTitle" id="ExhibitionImageTitle">
							{{ item.Title }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="ShiftContainer">
			<!-- 展览部分左右切换按钮 -->
			<img
				@click="ExhibitionShift(-1)"
				class="PageShift"
				:src="ShiftLeftSrc"
			/>
			<div class="ShiftPages">
				{{ ExhibitionIndex + 1 }}&emsp;/&emsp;{{ ExhibitionTotal }}
			</div>
			<img
				@click="ExhibitionShift(1)"
				class="PageShift"
				:src="ShiftRightSrc"
			/>
		</div>

		<div class="ExhibitionBoardTitle">最新公告</div>
		<div class="ContentContainer">
			<div v-for="(item, index) in BoardList[BoardIndex]" :key="index">
				<div
					class="ItemContainer Card HoverShadow"
					:id="`ItemContainerBoard${index}`"
					@click="GoBoard(item, index)"
				>
					<div class="ImageContainer">
						<div
							class="BackgroundImage"
							id="BoardBackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div class="ImageTitleContainer">
						<div class="ImageTitle" id="BoardImageTitle">
							{{ item.Title }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ShiftContainer">
			<!-- 公告部分左右切换按钮 -->
			<img
				@click="BoardShift(-1)"
				class="PageShift"
				:src="ShiftLeftSrc"
			/>
			<div class="ShiftPages">
				{{ BoardIndex + 1 }}&emsp;/&emsp;{{ BoardTotal }}
			</div>
			<img
				@click="BoardShift(1)"
				class="PageShift"
				:src="ShiftRightSrc"
			/>
		</div>

		<!-- 页底放浪花效果 -->
		<img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { throttle } from "lodash";
import { getForm } from "../../../api/data";
export default {
	name: "IndexBoard",
	data() {
		return {
			// 近期展览的标题和图片
			// 注意，如果要增加或删除这里的数据，别忘把切换按钮的一并修改。
			ExhibitionIndex: 0,
			ExhibitionTotal: 2,
			ExhibitionList: [],

			// 最新公告的Index，总共多少个，公告的图片，三个一组放到数组里面
			BoardIndex: 0,
			BoardTotal: 1,
			BoardList: [
				[
					{
						Title: "项目组获得西班牙海军博物馆前副馆长马塞利诺·冈萨雷斯部分画作资料",
						Image: "BoardImage1.jpg",
					},
					{
						Title: "文理共建，深度融合，探索数字人文建设模式",
						Image: "BoardImage2.jpg",
					},
					{
						Title: "课题组成员参加第五届“文学与图像”学术论坛",
						Image: "BoardImage3.jpg",
					},
				],
			],

			// 切换按钮的图片
			ShiftLeftSrc: "ShiftLeft.png",
			ShiftRightSrc: "ShiftRight.png",
		};
	},
	methods: {
		// 在线展览按钮切换
		ExhibitionShift: throttle(function (d) {
			let ExhibitionImage = document.querySelectorAll(
				"#ExhibitionBackgroundImage"
			);
			let ExhibitionTitle = document.querySelectorAll(
				"#ExhibitionImageTitle"
			);
			let Len = ExhibitionImage.length;

			let ImageFadeTimer = setInterval(ImageFade, 7);
			let opa = 100;
			let _this = this;
			function ImageFade() {
				if (opa > 0) {
					for (let i = 0; i < Len; i++) {
						ExhibitionImage[i].style.opacity = String(opa / 100);
						ExhibitionTitle[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.ExhibitionIndex =
						(_this.ExhibitionIndex + d + _this.ExhibitionTotal) %
						_this.ExhibitionTotal;
				} else if (opa > -100) {
					for (let i = 0; i < Len; i++) {
						ExhibitionImage[i].style.opacity = String(-opa / 100);
						ExhibitionTitle[i].style.opacity = String(-opa / 100);
					}
				} else {
					clearInterval(ImageFadeTimer);
				}
				opa--;
			}
		}, 2000),

		// 最新公告按钮切换
		BoardShift: throttle(function (d) {
			let BoardImage = document.querySelectorAll("#BoardBackgroundImage");
			let BoardTitle = document.querySelectorAll("#BoardImageTitle");

			let Len = BoardImage.length;
			let ImageFadeTimer = setInterval(ImageFade, 7);
			let opa = 100;
			let _this = this;
			function ImageFade() {
				if (opa > 0) {
					for (let i = 0; i < Len; i++) {
						BoardImage[i].style.opacity = String(opa / 100);
						BoardTitle[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.BoardIndex =
						(_this.BoardIndex + d + _this.BoardTotal) %
						_this.BoardTotal;
				} else if (opa > -100) {
					for (let i = 0; i < Len; i++) {
						BoardImage[i].style.opacity = String(-opa / 100);
						BoardTitle[i].style.opacity = String(-opa / 100);
					}
				} else {
					clearInterval(ImageFadeTimer);
				}
				opa--;
			}
		}, 2000),
		
        // 点击在线展览跳转
		GoExhibition(item, index) {
			this.$router.push({
				path: "/Exhibition",
				query: {
					ExhibitionID: item.ExhibitionID,
				},
			});
		},

		// 点击最新公告跳转
		GoBoard(item, index) {
			this.$router.push({
				path: "/LatestBoard",
				query: {
					BoardIndex: index,
				},
			});
		},

		// 获取数据
		GetData() {
			let _this = this;
			_this.ExhibitionList = [];
			let url = "/exhibition/list?&page_size=100";
			console.log("请求的url", url);
			getForm(url, (res) => {
				let data = res.data;
                // 计算在线展览的栏数（三个在线展览为一栏，向上取整）
				_this.ExhibitionTotal = Math.ceil((data.list.length) / 3);

				for (let i = 0; i < data.list.length; ) {
					let temp = [];

					for (let j = 0; j < 3 && i < data.list.length; j++) {
						let item = data.list[i];
						temp.push({
							ExhibitionID: item.main_id,
							Title: item.title,
							Image: item.intro.PictureUrl,
						});
						i++;
					}
					_this.ExhibitionList.push(temp);
				}
			});
		},
	},
    mounted() {
        this.GetData();
    }
};
</script>

<style scoped>
.IndexBoard {
	position: relative;
	width: 100%;
	height: 120vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	/* 字体颜色 */
	/* color: black; */
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
	width: 70vw;
	height: 18vw;
	/* background: skyblue; */

	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

/* 近期展览、最新公告 每一部分的 Container */
.ItemContainer {
	position: relative;
	width: 20vw;
	height: 18vw;
	margin: 0 20px 0 20px;
	/* background: red; */
	cursor: pointer;
}
/* 图片的 Container */
.ImageContainer {
	position: relative;
	width: 100%;
	height: 12vw;
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
	height: 6vw;
	/* background-color: white; */
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0 0 7px 7px;
}
.ImageTitle {
	font-size: 18px;
    font-weight: 400;
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
.ShiftContainer {
	position: relative;
	width: 30vw;
	min-height: 5vw;
	margin: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* background: red; */
}

.ShiftPages {
	width: 90px;
	height: 60px;
	text-align: center;

	font-size: 20px;
	line-height: 60px;
}
</style>