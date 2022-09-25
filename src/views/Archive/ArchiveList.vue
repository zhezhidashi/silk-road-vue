<template>
	<div class="background" style="background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>

		<!--    左侧高级搜索部分-->
		<div class="SearchContainer">
			<!-- 关键词 -->
			<div class="archive_list_search_keywords">关键词</div>
			<!-- 关键词白框 -->
			<div class="archive_list_search_keywords_block">
				<input
					type="search"
					v-model="search_keywords"
					class="archive_list_search_keywords_text"
				/>
			</div>

			<!-- 年份 -->
			<div class="archive_list_search_year">年份</div>

			<!-- 年份白框 -->
			<div class="YearFromToContainer">
				<div class="archive_list_search_date_from">
					<input
						type="search"
						v-model="search_date_from"
						class="archive_list_search_date_from_text"
					/>
				</div>
				<div class="archive_list_search_date_text">至</div>
				<div class="archive_list_search_date_to">
					<input
						type="search"
						v-model="search_date_to"
						class="archive_list_search_date_to_text"
					/>
				</div>
			</div>

			<!-- 语言 -->
			<div class="archive_list_search_language">语言</div>

			<div class="LanguageContainer">
				<div v-for="item in search_language_list" :key="item.id">
					<div class="archive_list_search_language_option">
						<div
							@mousedown="
								archive_list_search_language_option(
									$event,
									item.id
								)
							"
							class="archive_list_search_language_option_square"
							:id="`archive_list_search_language_option_square_${item.language}`"
							:style="`background: ${item.SquareColor}`"
						></div>
						<div class="archive_list_search_language_option_text">
							{{ item.text }}
						</div>
					</div>
				</div>
			</div>

			<!--高级搜索框-->
			<div class="blue_rectangle_container" id="AdvancedSearchContainer">
				<div
					@mousedown="archive_list_advanced_search_btn($event)"
					style="font-weight: 700; font-size: 18px; color: #ffffff"
				>
					搜索
				</div>
			</div>
		</div>

		<!--右方的搜索结果-->
		<div class="archive_list_search_result">
			<div
				v-for="search_result in search_result_list"
				:key="search_result.search_result_id"
			>
				<div
					@mousedown="
						archive_list_search_result_btn(
							$event,
							search_result.search_result_id
						)
					"
					@mouseover="
						archive_list_search_result_mouseover(
							$event,
							search_result.search_result_id
						)
					"
					@mouseleave="
						archive_list_search_result_mouseleave(
							$event,
							search_result.search_result_id
						)
					"
					class="archive_list_search_result_container"
					:id="
						'archive_list_search_result_container_' +
						search_result.search_result_id
					"
				>
					<div class="search_result_img_container">
						<div
							class="search_result_img"
							:style="`background-image:url(${search_result.img_src})`"
							alt="图片路径错误"
						></div>
					</div>
					<div class="archive_list_search_result_title">
						{{ search_result.search_result_title }}
					</div>
					<div class="archive_list_search_result_subtitle">
						{{ search_result.search_result_subtitle }}
					</div>
					<div class="archive_list_search_result_date">
						{{ search_result.search_result_date_from }}~{{
							search_result.search_result_date_to
						}}
					</div>
					<div class="archive_list_search_result_description">
						{{ search_result.search_result_description }}
					</div>
				</div>
			</div>
		</div>

		<div class="archive_list_jump_container">
			<div
				class="shift_eclipse_dark"
				id="archive_list_shift_left"
				@mousedown="archive_list_jump_last_btn($event)"
			>
				<img
					class="shift_left_arrow_dark"
					src="arrow_left_2.png"
					alt=""
				/>
			</div>

			<div class="archive_list_shift_pages">
				{{ now_page_num }}&emsp;/&emsp;{{ total_page_num }}
			</div>

			<div
				class="shift_eclipse_dark"
				id="archive_list_shift_right"
				@mousedown="archive_list_jump_next_btn($event)"
			>
				<img
					class="shift_right_arrow_dark"
					src="arrow_right_2.png"
					alt=""
				/>
			</div>
		</div>
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 600px; z-index: 0"></div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ArchiveList",
	data() {
		return {
			// 高级搜索栏的语言选项
			search_language_list: [
				{
					id: 1,
					language: "Chinese",
					text: "中文",
					SquareColor: "rgb(255, 255, 255)",
				},
				{
					id: 2,
					language: "Japanese",
					text: "日语",
					SquareColor: "rgb(255, 255, 255)",
				},
				{
					id: 3,
					language: "French",
					text: "法语",
					SquareColor: "rgb(255, 255, 255)",
				},
				{
					id: 4,
					language: "Spanish",
					text: "西班牙语",
					SquareColor: "rgb(255, 255, 255)",
				},
			],

			search_keywords: "",
			search_date_from: "",
			search_date_to: "",
			search_language: "",

			//搜索结果
			search_result_list: [],
			//现在是第几页
			now_page_num: "",
			//总共的页数
			total_page_num: "",
		};
	},
	created() {
		this.getList();
	},
	methods: {
		router_go_back() {
			this.$router.push({
				path: "/Home",
			});
		},
		getList() {
			console.log(this.$route);
			//从接收的url中取出参数，把data中的变量赋值，用于发送http请求
			this.search_keywords = this.$route.query.search_keywords;
			this.search_date_from = this.$route.query.search_date_from;
			this.search_date_to = this.$route.query.search_date_to;
			this.search_language = this.$route.query.search_language;
			this.now_page_num = this.$route.query.now_page_num;

			//修改该实例中now_page_num的值 如果传参是空，那么默认就是第一页
			if (this.now_page_num === "") this.now_page_num = "1";

			// console.log('this.search_language', this.search_language === '4')
			//左侧搜索页面有语言选项，因此要根据 url 传递的参数，把对应的选项前面的白色方块变成黑色方块

			if (this.search_language !== "") {
				this.search_language_list[
					parseInt(this.search_language) - 1
				].SquareColor = "rgb(0, 0, 0)";
			}

			let now_search_language = "";
			//把language从数字变成英语单词
			if (this.search_language === "1") now_search_language = "Chinese";
			if (this.search_language === "2") now_search_language = "Japanese";
			if (this.search_language === "3") now_search_language = "French";
			if (this.search_language === "4") now_search_language = "Spanish";

			/***************************************************************************************
        关于url拼接的事项"
            如果字段为空，就不拼接上去：所以需要做个判断来实现拼接
            之前的url前缀不对，127.0.0.1是本地ip，不是服务器的ip
            以api文档为准，上面能请求则说明是前端bug，不能请求则是后端bug（通常会提示服务器内部错误，500）
         ****************************************************************************************/

			//如果关键字的值为空，就不传参
			let url = "/archive/list/?";
			if (this.now_page_num !== "")
				url += "&page_index=" + this.now_page_num;
			if (this.search_keywords !== "")
				url += "&q_word=" + this.search_keywords;
			if (this.search_date_from !== "")
				url += "&begin_year=" + this.search_date_from;
			if (this.search_date_to !== "")
				url += "&end_year=" + this.search_date_to;
			if (this.search_language !== "")
				url += "&language=" + now_search_language;

			console.log(url);
			let inner_this = this; // 别改
			let http_get_result = [];

			getForm(url, function (res, msg) {
				let data = res.data;
				console.log("data is here");
				console.log(data);
				/* your code begin*/

				/****************************************************************************************
             请求到数据后，从data里取出内容
             代码必须写在这里面！！！！！！！！！
             ****************************************************************************************/
				// 计算出总共多少页
				console.log("total_page_num", data["total_items"]);
				inner_this.total_page_num = Math.ceil(
					data["total_items"] / 15
				).toString();

				console.log("data.list", data.list);
				for (let search_list_item of data.list) {
					let new_map = {
						search_result_id:
							search_list_item["main_id"].toString(),
						img_src: search_list_item["mini_pic_url"],
						search_result_title: search_list_item["title"]["ZH"],
						search_result_subtitle:
							search_list_item["location"]["ZH"],
						search_result_date_from: search_list_item["begin_year"],
						search_result_date_to: search_list_item["end_year"],
						search_result_description:
							search_list_item["intro"]["ZH"],
					};
					// console.log(new_map);
					if (new_map["search_result_id"] === undefined)
						new_map["search_result_id"] = "N/A";
					if (new_map["search_result_title"] === undefined)
						new_map["search_result_title"] = "N/A";
					if (new_map["search_result_subtitle"] === undefined)
						new_map["search_result_subtitle"] = "N/A";
					if (new_map["search_result_date"] === undefined)
						new_map["search_result_date"] = "N/A";
					if (new_map["search_result_description"] === undefined)
						new_map["search_result_description"] = "N/A";
					http_get_result.push(new_map);
				}
				/* your code end*/
			});
			this.search_result_list = http_get_result;
		},

		//左侧搜索页面有语言选项，鼠标点击哪个，就把哪个选项前面的白色方块变成黑色方块，或者是把黑色方块变成白色方块
		archive_list_search_language_option(event, language_option) {
			console.log(
				"language_option",
				language_option,
				this.search_language_list[language_option - 1]
			);
			if (
				this.search_language_list[language_option - 1].SquareColor ===
				"rgb(0, 0, 0)"
			) {
				this.search_language_list[language_option - 1].SquareColor =
					"rgb(255, 255, 255)";
				this.search_language = "";
			} else {
				for (let item of this.search_language_list) {
					if (item.id === language_option) {
						item.SquareColor = "rgb(0, 0, 0)";
					} else {
						item.SquareColor = "rgb(255, 255, 255)";
					}
				}
				this.search_language = language_option.toString();
			}
		},

		archive_list_advanced_search_btn(event) {
			this.$router.push({
				path: "/ArchiveList",
				query: {
					search_keywords: this.search_keywords,
					search_date_from: this.search_date_from,
					search_date_to: this.search_date_to,
					search_language: this.search_language,
					now_page_num: this.now_page_num,
				},
			});
		},

		archive_list_search_result_btn(event, search_result_id) {
			this.$router.push({
				path: "/ArchiveDetails",
				query: {
					search_result_id: search_result_id,
				},
			});
		},

		//服务于下面三个跳转的函数
		archive_list_jmp(event, page_num) {
			this.$router.push({
				path: "/ArchiveList",
				query: {
					search_keywords: this.search_keywords,
					search_date_from: this.search_date_from,
					search_date_to: this.search_date_to,
					search_language: this.search_language,
					now_page_num: page_num,
				},
			});
		},

		//跳转至上一页
		archive_list_jump_last_btn(event) {
			let now_page_num_int = parseInt(this.now_page_num);
			if (this.now_page_num === "1") {
				alert("当前已经是第一页");
				return;
			}
			this.archive_list_jmp(event, (now_page_num_int - 1).toString());
		},

		//跳转至下一页
		archive_list_jump_next_btn(event) {
			let now_page_num_int = parseInt(this.now_page_num);
			if (this.now_page_num >= this.total_page_num) {
				alert("当前已经是最后一页");
				return;
			}
			this.archive_list_jmp(event, (now_page_num_int + 1).toString());
		},

		// 鼠标停留效果
		archive_list_search_result_mouseover(event, search_result_id) {
			document.querySelector(
				"#archive_list_search_result_container_" + search_result_id
			).style.background = "rgba(47, 47, 47, 0.5)";
		},
		archive_list_search_result_mouseleave(event, search_result_id) {
			document.querySelector(
				"#archive_list_search_result_container_" + search_result_id
			).style.background = "#F4F4F4";
		},
	},
};
</script>

<style>
/* 隐藏导航栏波浪线 */
.nav_bar_underline {
	display: none;
}
/*左侧高级搜索部分*/
.SearchContainer {
	position: absolute;
	left: 100px;
	top: 150px;
	width: 230px;
	height: 500px;
	/* background: red; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* align-items: center; */
}
/* 左侧搜索的向下指的箭头图片 */
.archive_list_search_arrow {
	position: absolute;
	width: 13px;
}

/*关键字和年份的Container*/

/* 关键字 */
.archive_list_search_keywords {
	position: relative;
	width: 60px;

	font-weight: 600;
	font-size: 20px;
	line-height: 150%;
	color: #2f2f2f;
}
/* 输入关键字的Container */
.archive_list_search_keywords_block {
	position: relative;
	width: 230px;
	height: 42px;
	background: #ffffff;
	box-shadow: inset 0.7px 0.7px 1.4px rgba(0, 0, 0, 0.11);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
}
/* 输入关键字文本 */
.archive_list_search_keywords_text {
	position: absolute;
	width: 210px;
	height: 30px;
	border: none;
	outline: none;
	font-size: 20px;
}

/* 年份 */
.archive_list_search_year {
	position: relative;
	width: 42px;
	font-weight: 600;
	font-size: 20px;
	line-height: 150%;
	color: #2f2f2f;
}
/* 年份 from to 的 Container */
.YearFromToContainer {
	position: relative;
	height: 42px;
	width: 230px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.archive_list_search_date_from {
	position: relative;
	width: 84px;
	height: 42px;
	background: #ffffff;
	box-shadow: inset 0.7px 0.7px 1.3px rgba(0, 0, 0, 0.11);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}
/* 年份 from 的文本 */
.archive_list_search_date_from_text {
	position: absolute;
	width: 75px;
	height: 30px;
	border: none;
	outline: none;
	font-size: 20px;
}
/* “至” 那个字 */
.archive_list_search_date_text {
	position: relative;
	font-size: 18px;
	line-height: 150px;
	color: #2f2f2f;
}
/* 年份 to 的 Container */
.archive_list_search_date_to {
	position: relative;
	width: 84px;
	height: 42px;
	background: #ffffff;
	box-shadow: inset 0.7px 0.7px 1.3px rgba(0, 0, 0, 0.11);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}
/* 年份 to 的文本 */
.archive_list_search_date_to_text {
	position: absolute;
	width: 75px;
	height: 30px;
	border: none;
	outline: none;
	font-size: 20px;
}

/*语言*/
.archive_list_search_language {
	position: relative;
	width: 42px;
	font-weight: 600;
	font-size: 20px;
	line-height: 150%;
	color: #2f2f2f;
	z-index: 10;
}
/* 语言的 Container */
.LanguageContainer {
	position: relative;
	width: 230px;

	height: 170px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	z-index: 10;
	/* background: skyblue; */

	outline: 1px blue dashed;
	outline-offset: -5px;
	border-radius: 10px;
	box-shadow: 0 0 0 5px transparent;
}

.archive_list_search_language_option {
	position: relative;
	width: 190px;
	height: 27px;
	/* background: pink; */
	margin-left: 20px;

	display: flex;
	align-items: center;
}
.archive_list_search_language_option_square {
	position: absolute;
	width: 18px;
	height: 18px;
	left: 0;
	cursor: pointer;
}
.archive_list_search_language_option_text {
	position: absolute;
	left: 30px;
	font-size: 18px;
	line-height: 150%;
	color: #2f2f2f;
}

/*高级搜索框*/
#AdvancedSearchContainer {
	position: relative;
	width: 230px;
	height: 48px;
	z-index: 10;
}

/*右方的搜索结果*/
.archive_list_search_result {
	position: relative;
	width: 950px;
	min-height: 100vh;
	left: 440px;
	top: 150px;
	display: flex;
	flex-flow: wrap;
	align-content: flex-start;
	z-index: 10;
	/* background: #588cc8; */
}
/*白色的框*/
.archive_list_search_result_container {
	position: relative;
	width: 909px;
	height: 339px;
	background: #f4f4f4;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
	border-radius: 7px;
	margin: 20px;
	cursor: pointer;
}
/*图片*/
.search_result_img_container {
	position: absolute;
	position: absolute;
	width: 208px;
	height: 240px;
	left: 49px;
	top: 40px;
}
.search_result_img {
	width: 100%;
	height: 0;
	padding-bottom: 115%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
}
/*标题*/
.archive_list_search_result_title {
	position: absolute;
	width: 400px;
	height: 30px;
	left: 286px;
	top: 40px;
	font-size: 24px;
	line-height: 30px;
	color: #2f2f2f;
	/*最多显示一行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

/*副标题*/
.archive_list_search_result_subtitle {
	/* 西印度档案总馆 */
	position: absolute;
	width: 400px;
	height: 16px;
	left: 290px;
	top: 76px;
	font-size: 16px;
	color: #2f2f2f;
}
/*时间*/
.archive_list_search_result_date {
	position: absolute;
	width: 224px;
	height: 18px;
	left: 289px;
	top: 102px;
	font-size: 16px;
	color: #2f2f2f;
}
/*描述*/
.archive_list_search_result_description {
	position: absolute;
	position: absolute;
	width: 589px;
	left: 286px;
	top: 208px;

	font-size: 16px;
	line-height: 150%;
	color: #2f2f2f;

	/*最多显示四行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}

/*搜索结果换页*/
.archive_list_jump_container {
	position: relative;
	width: 400px;
	height: 40px;
	top: 10px;
	z-index: 10;
	/* background: skyblue; */

	display: flex;
	align-items: center;
	justify-content: space-between;
	left: 0;
	right: 0;
	margin: auto;
}

/*第几页*/
.archive_list_shift_pages {
	width: auto;
	height: auto;

	font-size: 20px;
	line-height: 100%;
	color: #000;
}

/*上页*/
#archive_list_shift_left {
	cursor: pointer;
}
/*下页*/
#archive_list_shift_right {
	cursor: pointer;
}
</style>