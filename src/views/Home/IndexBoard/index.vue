<template>
	<div class="IndexBoard">
		<!-- 公告部分 -->
		<div class="ExhibitionBoardTitle">近期展览</div>

		<div class="ContentContainer">
			<div v-for="(item, index) in ExhibitionList" :key="index">
				<div
					class="ItemContainer Card HoverDark"
					@click="GoExhibition(item, index)"
				>
					<div class="ImageContainer">
						<div
							class="BackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div
						class="ImageTitleContainer"
					>
						<div class="ImageTitle">
							{{ item.Title }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="ExhibitionBoardTitle">最新公告</div>
		<div class="ContentContainer">
			<div v-for="(item, index) in BoardList[BoardIndex]" :key="index">
				<div
					class="ItemContainer Card HoverDark"
					:id="`ItemContainerBoard${index}`"
					@click="GoBoard(item, index)"
				>
					<div class="ImageContainer">
						<div
							class="BackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div
						class="ImageTitleContainer"
					>
						<div class="ImageTitle">
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

        <!-- 页底放浪花效果 -->
        <img src="底部浪花.svg" class="BottomWave"/>
	</div>
</template>

<script>
import { throttle } from "lodash";
export default {
	name: "IndexBoard",
	data() {
		return {
			// 近期展览的标题和图片
            // 注意，如果要增加或删除这里的数据，别忘把切换按钮的一并修改。
			ExhibitionList: [
                {
					Title: "波涛中的面孔",
					Image: "https://dev.pacificsilkroad.cn/img-service/1/1-kiWbO6Mu0Q.jpg",
                    ID: '5',
                    Intro: '暂无',
				},
				{
					Title: "有帆自远方来",
					Image: "https://dev.pacificsilkroad.cn/img-service/1/1-sh2p9ppPcH.jpg",
                    ID: '4',
                    Intro: '2009年，联合国教科文组织将每年的10月8日定为“国际大帆船日”，纪念1565-1815年间往返于墨西哥阿卡普尔科和菲律宾马尼拉之间的大帆船贸易。以大帆船贸易为依托，太平洋地区逐渐形成了一个纵横交错、多地联动、辐射亚洲大陆和美洲大陆的贸易网络，构筑了文化交流的美丽画卷。东方的商品通过中菲贸易和大帆船贸易到达太平洋东岸，进一步通过陆路穿过美洲，接入大西洋贸易网络，到达欧洲地区。来自美洲的白银、作物也“返空”进入东方世界，丰富了此岸的商业活动、农业生产和社会发展。中菲贸易和大帆船贸易共同形成了独具特色的太平洋丝绸之路，频繁的往回带来了丰富的物质史，催生了新的思想、制度和秩序，改变了个人与世界的关系，充实了太平洋两岸的精神空间，深刻地影响了世界。%5Cn%20经过数百年的探索和积累，以太平洋丝绸之路为通道，人员交流、知识传播、制度互鉴愈发深入，形成经济、文化、政治等领域互相交流的地理场域和历史空间，铸就了东西方文化传播的繁荣景象。大量珍贵的、可视化的、直观的历史图像，涵盖海上航线、海外贸易、文化交流、海外移民、民间信仰、地理描述等领域，印证着这条互惠之路、沟通之路。%20%5Cn%20大帆船贸易承载了中国、菲律宾与墨西哥源远流长的文化交往，拉开了早期全球化的序幕，对这一重要时期的回溯不仅能为新时代中、菲、墨和平交流提供重要的历史参照，还将为三国的进一步信任合作带来新机遇和新启示。为更好地展现这段风起云涌的太平洋之旅，北京大学外国语学院拟于2022年10月8日举行主题为“有帆自远方来”的线上历史文化展。展览由国家社会科学基金重大项目“‘太平洋丝绸之路’档案文献整理与研究”项目组承办，精选16世纪大帆船贸易至今有代表性的百余幅地图、海图、档案、肖像、书信、音乐等材料，既展现大帆船贸易关联起的大世界，也发掘在时代大潮中起伏的“小”人物，从史料史实中捕捉和呈现太平洋交流的全貌。本次主题展览期望能够引起国内学界对于中墨、中菲、中拉关系史以及全球史视角下太平洋贸易的更多关注，为“一带一路”倡议拓展更大的国际空间，为推动构建人类命运共同体的美好愿景作出积极的贡献。',
				},
			],

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
		BoardShift: throttle(function (d) {
			let BoardImage = document.querySelectorAll(".BackgroundImage");
			let BoardTitle = document.querySelectorAll(".ImageTitle");

			let ImageFadeTimer = setInterval(ImageFade, 7);
			let opa = 100;
			let _this = this;
			function ImageFade() {
				if (opa > 0) {
					for (let i = 2; i < 5; i++) {
						BoardImage[i].style.opacity = String(opa / 100);
						BoardTitle[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.BoardIndex =
						(_this.BoardIndex + d + _this.BoardTotal) %
						_this.BoardTotal;
				} else if (opa > -100) {
					for (let i = 2; i < 5; i++) {
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
		},

		GoExhibition(item, index) {
            this.$router.push({
				path: "/AlbumList",
				query: {
					gallery_list_id: item.ID,
					exh_gallery_list_heading: item.Title,
                    exh_gallery_list_text: item.Intro,
				},
			});
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
	width: 1020px;
	height: 260px;
	/* background: skyblue; */

	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

/* 近期展览、最新公告 每一部分的 Container */
.ItemContainer {
	position: relative;
	width: 300px;
	height: 260px;
	margin: 0 20px 0 20px;
	/* background: red; */
	cursor: pointer;
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
	/* background-color: white; */
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0 0 7px 7px;
}
.ImageTitle {
	font-size: 18px;
	line-height: 150%;
	margin: 0 30px 0 30px;
	/* color: black; */
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