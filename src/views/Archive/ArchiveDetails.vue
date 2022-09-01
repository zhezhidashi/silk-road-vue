<template>
	<div class="background" style="height: 1427px; background: #efefef">
		<!--为了方便vue，我们把整个页面的图片文字全部放到 archive_details_data 里面-->
		<div id="archive_details_data">
			<!--    标题与副标题-->
			<p class="archive_details_title">{{ archive_details_title }}</p>
			<p class="archive_details_subtitle">
				{{ archive_details_subtitle }}
			</p>

			<!--    左侧图片、查看档案、查看来源、图片中文描述、图片其他语种描述-->
			<img
				class="archive_details_img"
				:src="archive_details_img"
				alt=""
			/>

			<p
				@mousedown="archive_details_see_archive($event)"
				class="archive_details_view"
				style="left: 270px"
			>
				查看档案
			</p>
			<p
				@mousedown="archive_details_see_source($event)"
				class="archive_details_view"
				style="left: 343px"
			>
				查看来源
			</p>
			<p class="archive_details_description_title_Chinese">描述</p>
			<p class="archive_details_description_text_Chinese">
				{{ archive_details_description_text_Chinese }}
			</p>
			<p class="archive_details_description_title_other">Description</p>
			<p class="archive_details_description_text_other">
				{{ archive_details_description_text_other }}
			</p>

			<!--    右侧档案的属性-->
			<div class="archive_details_properties_container">
				<!--        每一行都是一个div，分为左侧和右侧文字-->
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">年份</p>
					<p class="archive_details_properties_text_left_down">
						Year
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_year_from }}~{{
							archive_details_properties_year_to
						}}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_year_from }}~{{
							archive_details_properties_year_to
						}}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						关键词
					</p>
					<p class="archive_details_properties_text_left_down">
						Keywords
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_keywords_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_keywords_en }}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						收藏单位
					</p>
					<p class="archive_details_properties_text_left_down">
						Collection
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_collection_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_collection_en }}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						收藏地点
					</p>
					<p class="archive_details_properties_text_left_down">
						Location
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_location_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_location_en }}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						档案页数
					</p>
					<p class="archive_details_properties_text_left_down">
						pages
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_pages_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_pages_en }}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						文件尺寸
					</p>
					<p class="archive_details_properties_text_left_down">
						Size
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_size_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_size_en }}
					</p>
				</div>
				<div class="archive_details_properties_content">
					<p class="archive_details_properties_text_left_up">
						使用语种
					</p>
					<p class="archive_details_properties_text_left_down">
						Language
					</p>
					<p class="archive_details_properties_text_right_up">
						{{ archive_details_properties_language_ch }}
					</p>
					<p class="archive_details_properties_text_right_down">
						{{ archive_details_properties_language_en }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ArchiveDetails",
	data() {
		return {
			//档案在后端数据库的主键
			archive_details_id: "",
			//主标题、副标题、主页大图的url、中文描述、外文描述
			archive_details_title: "",
			archive_details_subtitle: "",
			archive_details_img: "",
			archive_details_description_text_Chinese: "",
			archive_details_description_text_other: "",

			//档案的各种属性：年份（中英文）、关键词（中英文）、收藏单位（中英文）、收藏地点（中英文）、档案页数（中英文）、文件尺寸（中英文）、使用语种（中英文）
			archive_details_properties_year_from: "",
			archive_details_properties_year_to: "",
			archive_details_properties_keywords_ch: "",
			archive_details_properties_keywords_en: "",
			archive_details_properties_collection_ch: "",
			archive_details_properties_collection_en: "",
			archive_details_properties_location_ch: "",
			archive_details_properties_location_en: "",
			archive_details_properties_pages_ch: "",
			archive_details_properties_pages_en: "",
			archive_details_properties_size_ch: "",
			archive_details_properties_size_en: "",
			archive_details_properties_language_ch: "",
			archive_details_properties_language_en: "",

			//图片下方“查看文档”和“查看来源”对应的 url
			archive_details_see_archive_url: "",
			archive_details_see_source_url: "",
		};
	},

	created() {
		//从url中获取档案在后端数据库中的主键
		this.archive_details_id = this.$route.query.search_result_id;
		//向http请求档案的详细信息
		let url = "/archive/detail?archive_id=" + this.archive_details_id;

		console.log(url);

		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log(data);

			// 五个具有二级字典的先初始化为 N/A
			inner_this.archive_details_title = "N/A";
			inner_this.archive_details_subtitle = "N/A";
			inner_this.archive_details_description_text_Chinese = "N/A";
			inner_this.archive_details_description_text_other = "N/A";
			inner_this.archive_details_properties_collection_ch = "N/A";
			inner_this.archive_details_properties_collection_en = "N/A";
			inner_this.archive_details_properties_location_ch = "N/A";
			inner_this.archive_details_properties_location_en = "N/A";
			inner_this.archive_details_properties_language_ch = "N/A";
			inner_this.archive_details_properties_language_en = "N/A";

			//主标题、副标题、主页大图的url、中文描述、外文描述
			for (let item in data.title) {
				if (item === "ZH")
					inner_this.archive_details_title = data.title.ZH;
				else inner_this.archive_details_subtitle = data.title[item];
			}

			inner_this.archive_details_img =
				data.pic_url === "" ? "N/A" : data.pic_url;

			for (let item in data.intro) {
				if (item === "ZH")
					inner_this.archive_details_description_text_Chinese =
						data.intro.ZH;
				else
					inner_this.archive_details_description_text_other =
						data.intro[item];
			}

			//档案的各种属性：年份（中英文）、关键词（中英文）、收藏单位（中英文）、收藏地点（中英文）、档案页数（中英文）、文件尺寸（中英文）、使用语种（中英文）
			inner_this.archive_details_properties_year_from =
				data.begin_year === "" ? "N/A" : data.begin_year;
			inner_this.archive_details_properties_year_to =
				data.end_year === "" ? "N/A" : data.end_year;

			inner_this.archive_details_properties_keywords_ch = "N/A";
			inner_this.archive_details_properties_keywords_en = "N/A";

			for (let item of data.tag_list) {
				if (item.slice(0, 2) === "ZH") {
					if (
						inner_this.archive_details_properties_keywords_ch ===
						"N/A"
					) {
						inner_this.archive_details_properties_keywords_ch =
							item.slice(3);
					} else {
						inner_this.archive_details_properties_keywords_ch +=
							"、" + item.slice(3);
					}
				} else {
					if (
						inner_this.archive_details_properties_keywords_en ===
						"N/A"
					) {
						inner_this.archive_details_properties_keywords_en =
							item.slice(3);
					} else {
						inner_this.archive_details_properties_keywords_en +=
							", " + item.slice(3);
					}
				}
			}

			for (let item in data.organization) {
				if (item === "ZH")
					inner_this.archive_details_properties_collection_ch =
						data.organization.ZH;
				else
					inner_this.archive_details_properties_collection_en =
						data.organization[item];
			}

			for (let item in data.location) {
				if (item === "ZH")
					inner_this.archive_details_properties_location_ch =
						data.location.ZH;
				else
					inner_this.archive_details_properties_location_en =
						data.location[item];
			}

			inner_this.archive_details_properties_pages_ch =
				data.page_count === undefined ? "N/A" : data.page_count;
			inner_this.archive_details_properties_pages_en =
				data.page_count === undefined ? "N/A" : data.page_count;

			inner_this.archive_details_properties_size_ch =
				data.file_size === undefined ? "N/A" : data.file_size;
			inner_this.archive_details_properties_size_en =
				data.file_size === undefined ? "N/A" : data.file_size;

			for (let item in data.language) {
				if (item === "ZH")
					inner_this.archive_details_properties_language_ch =
						data.language.ZH;
				else
					inner_this.archive_details_properties_language_en =
						data.language[item];
			}

			//图片下方“查看文档”和“查看来源”对应的 url
			inner_this.archive_details_see_archive_url = data.pic_url;
			inner_this.archive_details_see_source_url = data.from_url;
		});
	},
	methods: {
		archive_details_see_archive(event) {
			if (event.button === 0) {
				window.open(this.archive_details_see_archive_url, "_blank");
			} else if (event.button === 1) {
				window.open(this.archive_details_see_archive_url, "_blank");
			}
		},
		archive_details_see_source(event) {
			if (event.button === 0) {
				window.open(this.archive_details_see_source_url, "_blank");
			} else if (event.button === 1) {
				window.open(this.archive_details_see_source_url, "_blank");
			}
		},
	},
};
</script>

<style>
/* 隐藏导航栏波浪线 */
.nav_bar_underline {
	visibility: hidden;
}

/*标题与副标题*/
.archive_details_title {
	position: absolute;
	text-align: center;
	width: 900px;
	top: 140px;
	font-size: 17px;
	line-height: 120%;
	color: #2f2f2f;
}
.archive_details_subtitle {
	position: absolute;
	text-align: center;
	width: 900px;
	top: 174px;
	font-size: 11px;
	line-height: 0;
	color: #b9b9b9;
}

/*左侧图片、查看档案、查看来源、图片中文描述、图片其他语种描述*/
.archive_details_img {
	position: absolute;
	width: 315px;
	height: 364px;
	left: 85px;
	top: 240px;
	filter: drop-shadow(6px 6px 11px rgba(0, 0, 0, 0.25));
}
.archive_details_view {
	position: absolute;
	top: 625px;
	font-weight: 600;
	font-size: 14px;
	line-height: 0;
	color: #023871;
	text-decoration: underline;
	cursor: pointer;
}

.archive_details_description_title_Chinese {
	position: absolute;
	left: 85px;
	top: 704px;
	font-size: 17px;
	line-height: 0;
	color: #588cc8;
}
.archive_details_description_text_Chinese {
	position: absolute;
	width: 382px;
	height: 224px;
	left: 85px;
	top: 742px;

	font-size: 14px;
	line-height: 21px;
	color: #2f2f2f;
}
.archive_details_description_title_other {
	/* Description */

	position: absolute;
	left: 540px;
	top: 704px;
	font-size: 17px;
	line-height: 0;
	color: #588cc8;
}
.archive_details_description_text_other {
	position: absolute;
	width: 367px;
	height: 224px;
	left: 540px;
	top: 742px;

	font-size: 14px;
	line-height: 21px;
	color: #2f2f2f;
}

/*右侧档案的属性*/
.archive_details_properties_container {
	position: absolute;
	width: 414px;
	height: 382px;
	left: 528px;
	top: 232px;
	display: flex;
	flex-direction: column;
	/*background: #588CC8;*/
}

/*每一行（中英文）都包装成一个类*/
.archive_details_properties_content {
	position: relative;
	width: 414px;
	height: 54px;
}

/*类别名字中文*/
.archive_details_properties_text_left_up {
	position: absolute;
	left: 10px;
	top: 5px;
	font-size: 14px;
	line-height: 0;
	color: #9a9999;
}
/*类别名字英文*/
.archive_details_properties_text_left_down {
	position: absolute;
	left: 10px;
	top: 30px;
	font-size: 10px;
	line-height: 0;
	color: #9a9999;
}
/*类别内容中文*/
.archive_details_properties_text_right_up {
	position: absolute;
	left: 100px;
	top: 5px;
	font-size: 14px;
	line-height: 0;
	color: #2f2f2f;
}
/*类别内容英文*/
.archive_details_properties_text_right_down {
	position: absolute;
	left: 100px;
	top: 30px;
	font-size: 10px;
	line-height: 0;
	color: #9a9999;
}
</style>