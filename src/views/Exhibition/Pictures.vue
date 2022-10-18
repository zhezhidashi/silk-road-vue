<template>
	<div class="background" style="min-height: 100vh">
		<!--网页路径-->
		<div class="WebPath">
			<div @click="GoExhibitionList" style="cursor: pointer">
				线上展览
			</div>
			&ensp;&gt;&ensp;
			<div @click="GoExhibition" style="cursor: pointer">
				{{ ExhibitionTitle }}
			</div>
			&ensp;&gt;&ensp;
			<div>
				{{ PictureList[PictureID].Title.ZH }}
			</div>
		</div>

		<div class="Card ListAndMainImageContainer">
			<!--左侧图片列表-->
			<div class="ImageListContainer">
				<vue-scroll class="ImageListContainer" :ops="ops">
					<div v-for="item in PictureList" :key="item.PictureID">
						<div
							@click="ImageListBtn(item)"
							:class="
								item.PictureID === PictureID
									? 'ClickImage'
									: 'ImageListImgContainer'
							"
						>
							<div
								class="ImageListImg Card"
								:style="`background-image:url(${item.PictureUrl})`"
							></div>
						</div>
					</div>
				</vue-scroll>
			</div>

			<!--右侧大图片-->
			<div style="position: relative; width: 65vw; height: 35vw">
				<img
					@click="ImageShift(-1)"
					class="PageShift"
					id="PageShiftLeft"
					:src="ShiftLeftSrc"
				/>
				<img
					@click="ImageShift(1)"
					class="PageShift"
					id="PageShiftRight"
					:src="ShiftRightSrc"
				/>
				<viewer class="MainImageContainer" :images="PictureList">
					<img
						class="MainImage"
						v-for="item in PictureList"
						:src="item.PictureUrl"
						:key="item.PictureID"
						v-show="item.PictureID === PictureID"
					/>
				</viewer>
			</div>
		</div>

		<!--大图片的描述-->
		<div class="InfoContainer">
			<div class="LanguageContainer">
				<div
					@click="ShiftLanguage(0)"
					:class="LanguageIndex === 0 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[0]] }}
				</div>
				<div class="LineVertical"></div>
				<div
					@click="ShiftLanguage(1)"
					:class="LanguageIndex === 1 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[1]] }}
				</div>
				<div class="LineVertical"></div>
				<div
					@click="ShiftLanguage(2)"
					:class="LanguageIndex === 2 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[2]] }}
				</div>
			</div>
			<div class="LineHorizontal"></div>
			<div class="TitleIntroContainer">
				<div class="ImageTitle">
					{{
						PictureList[PictureID].Title[
							LanguageType[LanguageIndex]
						]
					}}
				</div>
				<div class="ImageIntro">
					<div
						v-for="(Paragraph, index) in PictureList[PictureID]
							.Intro[LanguageType[LanguageIndex]]"
						:key="index"
					>
						<div style="margin: 0 0 8px 0;">{{ Paragraph }}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div class="BottomBlank"></div>
		<img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { getForm, LanguageMap, ListContain } from "../../api/data.js";
export default {
	data() {
		return {
			// 展览主键
			ExhibitionID: 0,
			// 线上展览标题
			ExhibitionTitle: "",

			// 大图在展览中的序号
			PictureID: 0,
			PictureTotal: 0,

			// 存储图片列表及其相关属性
			PictureList: [],

			// 记录三种语言
			LanguageType: ["ZH", "EN"],
			LanguageMap,
			// 记录现在选择的是哪种语言
			LanguageIndex: 0,

			// scroll 的配置项
			ops: {
				vuescroll: {},
				scrollPanel: {},
				rail: {
					keepShow: true,
				},
				bar: {
					hoverStyle: true,
					onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
					opacity: 0, //滚动条透明度
					"overflow-x": "hidden",
				},
			},

			// 切换按钮的图片
			ShiftLeftSrc: "ShiftLeft.png",
			ShiftRightSrc: "ShiftRight.png",
		};
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);

		//从本页面的url中获取 ExhibitionID 和 PictureID 的值
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.PictureID = parseInt(this.$route.query.PictureID);
		this.GetData();
	},
	methods: {
		GetData() {
			let _this = this;
			let url = `/exhibition/detail?exhibition_id=${this.ExhibitionID}`;
			console.log("请求的url", url);
			getForm(url, 5, (res) => {
				let data = res.data;
				_this.ExhibitionTitle = data.title;
				_this.PictureTotal = data.pic_list.length;
				for (let i = 0; i < data.pic_list.length; i++) {
					let item = data.pic_list[i];
					let obj = {
						PictureUrl: item.pic_url,
						Title: {
							ZH:
								item.title.ZH === undefined
									? ""
									: item.title.ZH,
							EN:
								item.title.EN === undefined
									? ""
									: item.title.EN,
						},
						Intro: {
							ZH:
								item.intro.ZH === undefined
									? ""
									: item.intro.ZH.split("$$$"),
							EN:
								item.intro.EN === undefined
									? ""
									: item.intro.EN.split("$$$"),
						},
						PictureID: i,
					};

					// 把小语种的语言也加入到语言列表中
					for (let language_item in item.title) {
						if (language_item !== "ZH" || language_item !== "EN") {
							obj.Title[language_item] =
								item.title[language_item];
							if (
								!ListContain(_this.LanguageType, language_item)
							) {
								_this.LanguageType.push(language_item);
							}
						}
					}
					for (let language_item in item.intro) {
						if (language_item !== "ZH" || language_item !== "EN") {
							obj.Intro[language_item] =
								item.intro[language_item].split("$$$");
							if (
								!ListContain(_this.LanguageType, language_item)
							) {
								_this.LanguageType.push(language_item);
							}
						}
					}

					_this.PictureList.push(obj);
				}
			});
		},

		// 面包屑退回线上展览
		GoExhibitionList() {
			this.$router.push({
				path: "/ExhibitionList",
			});
		},
		GoExhibition() {
			this.$router.push({
				path: "/Exhibition",
				query: {
					ExhibitionID: this.ExhibitionID,
				},
			});
		},

		// 切换语言
		ShiftLanguage(index) {
			this.LanguageIndex = index;
		},

		// 点击下方列表的图片，修改大图的url
		ImageListBtn(item) {
			this.PictureID = item.PictureID;
		},

		// 左右按钮切换图片
		ImageShift(d) {
			this.PictureID =
				(this.PictureID + d + this.PictureTotal) % this.PictureTotal;
			// console.log(this.PictureID);
		},
	},
};
</script>

<style>
/* 图片列表和大图片的 Container */
.ListAndMainImageContainer {
	position: relative;
	top: 50px;
	height: 35vw;
	width: 80vw;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/*左侧的图片列表*/
.ImageListContainer {
	position: relative;
	width: 15vw;
	height: 35vw;
	background: white;
	border-radius: 7px 0 0 7px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.ImageListImgContainer {
	position: relative;
	width: 8vw;
	height: 8vw;
	padding: 2vw;
	/* background: blue; */
}

.ClickImage {
	position: relative;
	animation: MyMove 0.3s forwards;
}

@keyframes MyMove {
	from {
		width: 8vw;
		height: 8vw;
		padding: 2vw;
	}
	to {
		width: 10vw;
		height: 10vw;
		padding: 1vw;
	}
}

.ImageListImg {
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px;
	cursor: pointer;
	z-index: 10;
}

/* 网页主图 */
.MainImageContainer {
	position: relative;
	width: 65vw;
	height: 35vw;
	background: lightgrey;
	border-radius: 0 7px 7px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
#PageShiftLeft {
	position: absolute;
	top: 17vw;
	left: 1vw;
	z-index: 120;
}
#PageShiftRight {
	position: absolute;
    top: 17vw;
	right: 1vw;
	z-index: 120;
}
.MainImage {
	position: relative;
	max-width: 65vw;
	max-height: 35vw;
	cursor: pointer;
}

/* 大图片的信息 */
.InfoContainer {
	position: relative;
	top: 100px;
	width: 80vw;
	height: auto;
	/* min-height: 300px; */
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
/* 三种语言 */
.LanguageContainer {
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.Language {
	position: relative;
	font-size: 18px;
	line-height: 200%;
	cursor: pointer;
}
.SelectLanguage {
	color: #023871;
	font-weight: bold;
	position: relative;
	font-size: 18px;
	line-height: 200%;
	cursor: pointer;
}
/* 竖线 */
.LineVertical {
	position: relative;
	background: #588cc8;
	width: 2px;
	height: 20px;
	margin-left: 5px;
	margin-right: 5px;
}
/* 横线 */
.LineHorizontal {
	position: relative;
	background: #588cc8;
	height: 2px;
	width: 80vw;
	margin-bottom: 10px;
}
.TitleIntroContainer {
	position: relative;
}
.ImageTitle {
	position: relative;
	font-size: 20px;
	font-weight: bold;
	color: #023871;
	line-height: 200%;
}
.ImageIntro {
	position: relative;
	font-size: 18px;
	line-height: 200%;
}
</style>