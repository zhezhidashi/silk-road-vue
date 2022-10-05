<template>
	<div class="background" style="height: auto; background: #efefef">
		<!--    标题与副标题-->
		<div class="Heading" style="width: 1000px">
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
					<div class="Description">{{ DescriptionZH }}</div>
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
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 2,
					NameZH: "关键词",
					NameEN: "Keywords",
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 2,
					NameZH: "收藏单位",
					NameEN: "Collection",
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 2,
					NameZH: "收藏地点",
					NameEN: "Location",
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 1,
					NameZH: "档案页数",
					NameEN: "Pages",
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 1,
					NameZH: "文件尺寸",
					NameEN: "Size",
					Value1: "N/A",
					Value2: "N/A",
				},
				{
					Type: 2,
					NameZH: "使用语种",
					NameEN: "Language",
					Value1: "N/A",
					Value2: "N/A",
				},
			],

			//档案在后端数据库的主键
			ArchiveID: "",
			//主标题、副标题、主页大图的url、中文描述、外文描述
			Title: "N/A",
			Subtitle: "N/A",
			Image: "",

			DescriptionZH: "N/A",
			DescriptionEN: "N/A",

			//图片下方“查看文档”和“查看来源”对应的 url
			ArchiveUrl: "",
			SourceUrl: "",
		};
	},

	created() {
		//从url中获取档案在后端数据库中的主键
		this.ArchiveID = this.$route.query.search_result_id;
		//向http请求档案的详细信息
		let url = "/archive/detail?archive_id=" + this.ArchiveID;

		console.log(url);

		let _this = this; // 别改
        
		getForm(url, (res) => {
			let data = res.data;
			//主标题、副标题、主页大图的url、中文描述、外文描述
			for (let item in data.title) {
				if (item === "ZH") _this.Title = data.title.ZH;
				else _this.Subtitle = data.title[item];
			}

			_this.Image =
				data.mini_pic_url === "" ? "默认图片.jpg" : data.mini_pic_url;

			for (let item in data.intro) {
				if (item === "ZH") _this.DescriptionZH = data.intro.ZH;
				else _this.DescriptionEN = data.intro[item];
			}

			//档案的各种属性：年份（中英文）、关键词（中英文）、收藏单位（中英文）、收藏地点（中英文）、档案页数（中英文）、文件尺寸（中英文）、使用语种（中英文）
			_this.Info[0].Value1 =
				data.begin_year === "" ? "N/A" : data.begin_year;
			_this.Info[0].Value2 = data.end_year === "" ? "N/A" : data.end_year;

			for (let item of data.tag_list) {
				if (item.slice(0, 2) === "ZH") {
					if (_this.Info[1].Value1 === "N/A") {
						_this.Info[1].Value1 = item.slice(3);
					} else {
						_this.Info[1].Value1 += "、" + item.slice(3);
					}
				} else {
					if (_this.Info[1].Value2 === "N/A") {
						_this.Info[1].Value2 = item.slice(3);
					} else {
						_this.Info[1].Value2 += ", " + item.slice(3);
					}
				}
			}

			for (let item in data.organization) {
				if (item === "ZH") _this.Info[2].Value1 = data.organization.ZH;
				else _this.Info[2].Value2 = data.organization[item];
			}

			for (let item in data.location) {
				if (item === "ZH") _this.Info[3].Value1 = data.location.ZH;
				else _this.Info[3].Value2 = data.location[item];
			}

			_this.Info[4].Value1 =
				data.page_count === undefined ? "N/A" : data.page_count;

			_this.Info[5].Value1 =
				data.file_size === undefined ? "N/A" : data.file_size;

			for (let item in data.language) {
				if (item === "ZH") _this.Info[6].Value1 = data.language.ZH;
				else _this.Info[6].Value2 = data.language[item];
			}

			//图片下方“查看文档”和“查看来源”对应的 url
			_this.ArchiveUrl = data.archive_url;
			_this.SourceUrl = data.from_url;
		});
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 0);
        this.$store.dispatch("GetLineIndex", 0);
	},
	methods: {
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
	width: 1000px;
	height: auto;
	top: 100px;
	font-size: 20px;
	line-height: 150%;
	color: #b8b8b8;

	left: 0;
	right: 0;
	margin: auto;
}

.ImageInfoContainer {
	position: relative;
	width: 1100px;
	height: 500px;
	top: 200px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */

	display: flex;
	justify-content: space-between;
	align-items: center;
}

/*左侧图片、图片中文描述、图片其他语种描述*/
.ImageContainer {
	position: relative;
	width: 450px;
	height: 500px;
}

.Image {
	padding-bottom: 111%;
}

/* 查看档案、查看来源 */
.ArchiveSourceContainer {
	position: relative;
	width: 200px;
	height: auto;
	top: 230px;
	left: 400px;
	/* background: red; */
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.ArchiveSource {
	font-weight: 600;
	font-size: 20px;
	line-height: 150%;
	color: #023871;
	text-decoration: underline;
	cursor: pointer;
}

/* 图片的中文描述和外文描述 */
.DescriptionContainer {
	position: relative;
	top: 260px;
	width: 1100px;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* background: skyblue; */
}

.DescriptionItem {
	position: relative;
	width: 500px;
	height: auto;
	display: flex;
	flex-direction: column;
}
.DescriptionTitle {
	position: relative;
	font-size: 20px;
	line-height: 200%;

	font-size: 24px;
	line-height: 200%;
	color: #588cc8;
}
.Description {
	position: relative;
	font-size: 20px;
	line-height: 200%;
	/* background: red; */
}

.InfoContainer {
	position: relative;
	width: 500px;
	height: 500px;
	/* background: skyblue; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
/*每一行（中英文）都包装成一个类*/
/* 只有一行文字 */
.InfoItem {
	position: relative;
	width: 500px;
	height: auto;
	/* background: pink; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.InfoName {
	position: relative;
	width: 80px;
	/* background: yellow; */
}
.InfoValue {
	position: relative;
	width: 400px;
	/* background: yellow; */
}

.InfoNameZH,
.InfoValue1 {
	font-size: 20px;
	line-height: 150%;
	color: #9a9999;
}
.InfoNameEN,
.InfoValue2 {
	font-size: 16px;
	line-height: 150%;
	color: #9a9999;
}
</style>