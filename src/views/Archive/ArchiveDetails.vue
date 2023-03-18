<template>
	<div class="background" style="height: auto">
		<!--    标题与副标题-->
		<div class="Heading" style="width: 80vw">
			{{ Title }}
		</div>
		<div class="Subtitle">
			{{ Subtitle }}
		</div>

		<div class="ImageInfoContainer">
			<div class="ImageContainer Card">
				<div
					class="Image BackgroundImage Card"
					:style="`background-image:url(${Image})`"
				></div>
			</div>
			<div class="InfoContainer">
				<div v-for="(item, index) in Info" :key="index">
					<div class="InfoItem">
						<div class="InfoName">
							<div class="InfoNameZH">{{ item.NameZH }}</div>
							<div class="InfoNameEN">{{ item.NameEN }}</div>
						</div>
						<div class="InfoValue">
							<div class="InfoValue1">{{ item.Value1 }}</div>
							<div v-show="item.Type === 2" class="InfoValue2">
								{{ item.Value2 }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ArchiveSourceContainer">
			<div class="ArchiveSource" @click="SeeArchive">查看档案</div>
			<div class="ArchiveSource" @click="SeeSource">查看来源</div>
		</div>
		<div class="DescriptionContainer">
			<div class="DescriptionItem">
				<div class="DescriptionTitle">描述</div>
				<div class="Description">{{ DescriptionZH }}</div>
			</div>
			<div class="DescriptionItem">
				<div class="DescriptionItem">
					<div class="DescriptionTitle">Description</div>
					<div class="Description">{{ DescriptionEN }}</div>
				</div>
			</div>
		</div>

		<div class="BottomBlank"></div>
		<img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ArchiveDetails",
	data() {
		return {
			Info: [
				{
					Type: 1,
					NameZH: "年份",
					NameEN: "Year",
					Value1: "",
					Value2: "",
				},
				{
					Type: 2,
					NameZH: "关键词",
					NameEN: "Keywords",
					Value1: "",
					Value2: "",
				},
				{
					Type: 2,
					NameZH: "收藏单位",
					NameEN: "Collection",
					Value1: "",
					Value2: "",
				},
				{
					Type: 2,
					NameZH: "收藏地点",
					NameEN: "Location",
					Value1: "",
					Value2: "",
				},
				{
					Type: 1,
					NameZH: "档案页数",
					NameEN: "Pages",
					Value1: "",
					Value2: "",
				},
				{
					Type: 1,
					NameZH: "文件尺寸",
					NameEN: "Size",
					Value1: "",
					Value2: "",
				},
				{
					Type: 2,
					NameZH: "使用语种",
					NameEN: "Language",
					Value1: "",
					Value2: "",
				},
                {
                    Type: 1,
                    NameZH: "数字对象标识",
                    NameEN: "DOID",
                    Value1: "86.5000.470/pacificsilkroad-100358"
                }
			],

			//档案在后端数据库的主键
			ArchiveID: "",
			//主标题、副标题、主页大图的url、中文描述、外文描述
			Title: "",
			Subtitle: "",
			Image: "",

			DescriptionZH: "",
			DescriptionEN: "",

			//图片下方“查看文档”和“查看来源”对应的 url
			ArchiveUrl: "",
			SourceUrl: "",
		};
	},

	mounted() {
		this.$store.dispatch("GetHeaderIndex", 0);
		this.$store.dispatch("GetLineIndex", 0);
        this.GetData();
	},
	methods: {
		GetData() {
			//从url中获取档案在后端数据库中的主键
			this.ArchiveID = this.$route.query.search_result_id;
			//向http请求档案的详细信息
			let url = "/archive/detail?archive_id=" + this.ArchiveID;

			let _this = this; // 别改

			getForm(url, 3, (res) => {
				let data = res.data;
				//主标题、副标题、主页大图的url、中文描述、外文描述
				for (let item in data.title) {
					if (item === "ZH") _this.Title = data.title.ZH;
					else _this.Subtitle = data.title[item];
				}
                
                _this.Image = "默认图片.jpg"
				// _this.Image =
				// 	data.mini_pic_url === ""
				// 		? "默认图片.jpg"
				// 		: data.mini_pic_url;

				for (let item in data.intro) {
					// if (item === "ZH") _this.DescriptionZH = data.intro.ZH;
					if(item != "ZH") _this.DescriptionEN = data.intro[item];
				}

				//档案的各种属性：年份（中英文）、关键词（中英文）、收藏单位（中英文）、收藏地点（中英文）、档案页数（中英文）、文件尺寸（中英文）、使用语种（中英文）
				_this.Info[0].Value1 =
					data.begin_year === "" ? "" : data.begin_year;
				_this.Info[0].Value2 =
					data.end_year === "" ? "" : data.end_year;

				// for (let item of data.tag_list) {
				// 	if (item.slice(0, 2) === "ZH") {
				// 		if (_this.Info[1].Value1 === "") {
				// 			_this.Info[1].Value1 = item.slice(3);
				// 		} else {
				// 			_this.Info[1].Value1 += "、" + item.slice(3);
				// 		}
				// 	} else {
				// 		if (_this.Info[1].Value2 === "") {
				// 			_this.Info[1].Value2 = item.slice(3);
				// 		} else {
				// 			_this.Info[1].Value2 += ", " + item.slice(3);
				// 		}
				// 	}
				// }

				for (let item in data.organization) {
					if (item === "ZH")
						_this.Info[2].Value1 = data.organization.ZH;
					else _this.Info[2].Value2 = data.organization[item];
				}

				for (let item in data.location) {
					if (item === "ZH") _this.Info[3].Value1 = data.location.ZH;
					else _this.Info[3].Value2 = data.location[item];
				}

				_this.Info[4].Value1 =
					data.page_count === undefined ? "" : data.page_count;

				_this.Info[5].Value1 =
					data.file_size === undefined ? "" : data.file_size;

				for (let item in data.language) {
					if (item === "ZH") _this.Info[6].Value1 = data.language.ZH;
					else _this.Info[6].Value2 = data.language[item];
				}

				//图片下方“查看文档”和“查看来源”对应的 url
				_this.ArchiveUrl = data.archive_url;
				_this.SourceUrl = data.from_url;
			});
		},

		SeeArchive(event) {
			if (event.button === 0) {
				window.open(this.ArchiveUrl, "_blank");
			} else if (event.button === 1) {
				window.open(this.ArchiveUrl, "_blank");
			}
		},
		SeeSource(event) {
			if (event.button === 0) {
				window.open(this.SourceUrl, "_blank");
			} else if (event.button === 1) {
				window.open(this.SourceUrl, "_blank");
			}
		},
	},
};
</script>

<style scoped>
/*与副标题*/
.Subtitle {
	position: relative;
	text-align: center;
	width: 80vw;
	height: auto;
	top: 80px;
	font-size: 1.5vw;
	line-height: 150%;
	color: #b8b8b8;

	left: 0;
	right: 0;
	margin: auto;
}

.ImageInfoContainer {
	position: relative;
	width: 80vw;
	min-height: 35vw;
	top: 130px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

/*左侧图片、图片中文描述、图片其他语种描述*/
.ImageContainer {
	position: absolute;
    top: 0;
    left: 0;
	width: 30vw;
	height: 33vw;
	/* background: red; */
}

.Image {
	padding-bottom: 110%;
}

.InfoContainer {
	position: absolute;
    top: 0;
    left: 42vw;
	width: 38vw;
	min-height: 33vw;
	/* background: blue; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
/*每一行（中英文）都包装成一个类*/
.InfoItem {
	position: relative;
	width: 33vw;
	height: auto;
	/* background: pink; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.InfoName {
	position: relative;
	min-width: 10vw;
	margin-right: 10px;
	/* background: yellow; */
}
.InfoValue {
	position: relative;
	min-width: 23vw;
	/* background: yellow; */
}

.InfoNameZH{
    font-size: 1.3vw;
	line-height: 150%;
    color: #9a9999;
}
.InfoValue1 {
	font-size: 1.3vw;
	line-height: 150%;
	color: #000000;
}
.InfoNameEN{
    font-size: 1.1vw;
	line-height: 150%;
    color: #9a9999;   
}

.InfoValue2 {
	font-size: 1.1vw;
	line-height: 150%;
	color: #9a9999;
}

/* 查看档案、查看来源 */
.ArchiveSourceContainer {
	position: relative;
	width: 15vw;
	height: auto;
	top: 160px;
	left: 25vw;
	/* background: red; */
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.ArchiveSource {
	font-weight: 600;
	font-size: 1.5vw;
	line-height: 150%;
	color: #023871;
	text-decoration: underline;
	cursor: pointer;
}

/* 图片的中文描述和外文描述 */
.DescriptionContainer {
	position: relative;
	top: 200px;
	width: 80vw;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	/* background: skyblue; */
}

.DescriptionItem {
	position: relative;
	width: 35vw;
	height: auto;
	display: flex;
	flex-direction: column;
}
.DescriptionTitle {
	position: relative;
	font-size: 1.5vw;
	line-height: 200%;

	font-size: 1.8vw;
	line-height: 200%;
	color: #588cc8;
}
.Description {
	position: relative;
    width: 100%;
	font-size: 1.5vw;
	line-height: 200%;
    white-space: pre-wrap;
	/* background: red; */
}
</style>