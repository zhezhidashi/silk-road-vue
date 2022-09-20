<template>
	<div class="background" style="height: 3000px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
		/>

		<!-- 图片题目 -->
		<div class="GalleryImageTitle">{{ MainImageProp.title_zh }}</div>

		<img class="GalleryMainImage" :src="MainImageProp.src" />
		<!--网页路径-->
		<div class="WebPath">
			线上展览&ensp;&gt;&ensp;{{
				WebPathGalleryListTitle
			}}&ensp;&gt;&ensp;{{ WebPathGalleryTitle }}
		</div>

		<!--    大图片-->

		<!--    大图片的描述-->
		<!-- <div class="MainImage_text">
			<div class="MainImage_text_item">
				<div class="title_intro_item">
					<div style="font-weight: bold">标题:</div>
					<div>{{ MainImageProp.title_zh }}</div>
				</div>
				<div class="title_intro_item">
					<div style="font-weight: bold">title:</div>
					<div>{{ MainImageProp.title_en }}</div>
				</div>
				<div class="title_intro_item">
					<div style="font-weight: bold">título:</div>
					<div>{{ MainImageProp.title_es }}</div>
				</div>
			</div>
			<br />
			<div class="MainImage_text_item">
				<div>档案日期: {{ MainImageProp.date }}</div>
				<div>档案尺寸: {{ MainImageProp.size }}</div>
				<div>档案组织: {{ MainImageProp.organization }}</div>
				<div>档案编号: {{ MainImageProp.archive_id }}</div>
			</div>
			<br />
			<div class="MainImage_text_item" style="flex-direction: column">
				<div style="font-weight: bold">描述:</div>
				<div>{{ MainImageProp.intro_zh }}</div>
			</div>
			<div class="MainImage_text_item" style="flex-direction: column">
				<div style="font-weight: bold">description:</div>
				<div>{{ MainImageProp.intro_en }}</div>
			</div>
			<div class="MainImage_text_item" style="flex-direction: column">
				<div style="font-weight: bold">descripción:</div>
				<div>{{ MainImageProp.intro_es }}</div>
			</div>
		</div> -->

		<!--    底下的图片列表-->

		<el-scrollbar class="ImageListContainer">
			<div v-for="item in ImgList" :key="item.gallery_img_id">
				<div
					@mousedown="ImageListBtn(item)"
					class="ImageListImgContainer"
				>
					<div
						class="ImageListImg"
						:style="`background-image:url(${item.src})`"
					></div>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script>
import { getForm } from "../../../api/data.js";
import { HappyScroll } from "vue-happy-scroll";
export default {
	name: "ExhibitionGallery",
	components: {
		HappyScroll,
	},
	data() {
		return {
			// gallery_list 在数据库中的主键，gallery在数据库中主键
			list_id: "",
			id: "",
			// 左上角的路径、大图的url，大图底下的文字描述
			WebPathGalleryListTitle: "马尼拉：亚洲中转站",
			WebPathGalleryTitle: "1.1接近中国",

			// 大图片的属性
			MainImageProp: {
				src: "https://dev.pacificsilkroad.cn/img-service/1/1-h1j13w9f7A.jpg",
				gallery_img_id: "",
				title_zh: "古今形胜之图",
				title_en: "",
				title_es: "",
				intro_zh: "",
				intro_en: "",
				intro_es: "",
				date: "",
				size: "",
				organization: "",
				archive_id: "",
			},

			// 存储图片列表及其相关属性
			ImgList: [],
		};
	},
	mounted() {
		this.GetData();
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.go(-1);
		},
		// 点击下方列表的图片，修改大图的url
		ImageListBtn(item) {
			this.MainImageProp = item;
		},

		// HTTP获取网页基本数据
		GetData() {
			//从本页面的url中获取 list_id 和 id 的值
			this.list_id = this.$route.query.gallery_list_id;
			this.id = this.$route.query.gallery_id;
			this.WebPathGalleryListTitle = this.$route.query.gallery_list_title;

			//http请求

			let url =
				"/exhibition/album-detail?exhibition_id=" +
				this.list_id +
				"&album_id=" +
				this.id;

			console.log(url);

			this.ImgList = [];

			let _this = this; // 别改

			getForm(url, function (res, msg) {
				let data = res.data["picture_dict"];
				// console.log("picture_dict is here", res.data);
				// 修改 标题、图片url，图片简介
				_this.WebPathGalleryTitle = res.data["title"];

				for (let item in data) {
					let new_map = {
						src: data[item]["pic_url"],
						gallery_img_id: item,
						title_zh: "N/A",
						title_en: "N/A",
						title_es: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
						intro_es: "N/A",
						date: data[item].date,
						size: data[item].size,
						organization: data[item].organization,
						archive_id: data[item].archive_id,
					};
					for (let item_id in data[item].title) {
						if (item_id === "ZH") {
							new_map.title_zh = data[item].title[item_id];
						} else if (item_id === "EN") {
							new_map.title_en = data[item].title[item_id];
						} else if (item_id === "ES") {
							new_map.title_es = data[item].title[item_id];
						}
					}
					for (let item_id in data[item].intro) {
						if (item_id === "ZH") {
							new_map.intro_zh = data[item].intro[item_id];
						} else if (item_id === "EN") {
							new_map.intro_en = data[item].intro[item_id];
						} else if (item_id === "ES") {
							new_map.intro_es = data[item].intro[item_id];
						}
					}
					_this.ImgList.push(new_map);
					if (_this.ImgList.length === 1)
						_this.ImageListBtn(_this.ImgList[0]);
				}
				console.log("ImgList", _this.ImgList);
			});
		},
	},
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 882px;
}

/* 网页图片标题 */
.GalleryImageTitle {
	position: absolute;
	width: 1440px;
	height: auto;
	top: 225px;
	font-size: 36px;
	line-height: 150%;
	text-align: center;
	/* background: blue; */
}

/*左上角的网页路径*/
.WebPath {
	position: absolute;
	width: 1214px;
	height: auto;
	left: 143px;
	top: 318px;
	font-size: 24px;
	line-height: 150%;
	color: #2f2f2f;
}

/* 网页主图 */
.GalleryMainImage {
	position: relative;
	width: 1172px;
	height: auto;
	left: 141px;
	top: 380px;
}

/*底下的图片列表*/
.ImageListContainer {
	position: relative;
	width: 1172px;
	height: 160px;
	left: 141px;
	top: 390px;
	background: red;

	display: flex;
	flex-direction: row;
	align-items: center;

	/* overflow-x:hidden; */
}

.ImageListImgContainer {
	position: relative;
	width: 120px;
	height: 100px;
	margin: 10px;
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
	filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
	cursor: pointer;
	z-index: 10;
}

/*大图片的描述*/
.MainImage_text {
	position: absolute;
	width: 860px;
	left: 140px;
	height: 180px;
	top: 765px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.MainImage_text_item {
	position: relative;
	color: #2f2f2f;
	font-size: 16px;
	line-height: 20px;
	width: 860px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px;
}
.title_intro_item {
	width: 280px;
}
</style>