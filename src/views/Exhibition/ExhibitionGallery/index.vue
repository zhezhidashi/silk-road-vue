<template>
	<div class="background" style="height: auto">
		<!-- 图片题目 -->

		<!--网页路径-->
		<div class="WebPath">
			线上展览&ensp;&gt;&ensp;{{
				WebPathGalleryListTitle
			}}&ensp;&gt;&ensp;{{ WebPathGalleryTitle }}
		</div>

		<div class="Heading" style="top: 150px">
			{{ MainImageProp.TitleZH }}
		</div>

		<div class="ListAndMainImageContainer">
			<!--左侧图片列表-->
			<div class="ImageListContainer">
				<vue-scroll class="ImageListContainer" :ops="ops">
					<div v-for="item in ImgList" :key="item.gallery_img_id">
						<div
							@click="ImageListBtn(item)"
							class="ImageListImgContainer"
							:id="`ImageListImgContainer_${item.gallery_img_id}`"
						>
							<div
								class="ImageListImg"
								:style="`background-image:url(${item.src})`"
							></div>
						</div>
					</div>
				</vue-scroll>
			</div>

			<!--右侧大图片-->
			<viewer class="GalleryMainImageContainer" :images="ImgList">
				<img
					class="GalleryMainImage"
					v-for="item in ImgList"
					:src="item.src"
					:key="item.gallery_img_id"
					v-show="
						item.gallery_img_id === MainImageProp.gallery_img_id
					"
				/>
			</viewer>
		</div>

		<!--大图片的描述-->
		<el-tabs type="border-card" class="MainImageDescription">
			<el-tab-pane
				v-for="(LanguageItem, index) in LanguageType"
				:key="index"
				:label="LanguageMap[LanguageItem]"
			>
				<el-descriptions
					class="margin-top"
					:column="1"
					border
					style="font-size: 20px"
					:label-style="{ width: '120px' }"
				>
					<el-descriptions-item>
						<template slot="label"> 标题 </template>
						{{ MainImageProp["Title" + LanguageItem] }}
					</el-descriptions-item>
				</el-descriptions>

				<el-descriptions
					class="margin-top"
					:column="2"
					border
					style="font-size: 20px"
					:label-style="{ width: '120px' }"
				>
					<el-descriptions-item>
						<template slot="label"> 档案日期 </template>
						{{ MainImageProp.date }}
					</el-descriptions-item>

					<el-descriptions-item>
						<template slot="label"> 档案尺寸 </template>
						{{ MainImageProp.size }}
					</el-descriptions-item>

					<el-descriptions-item>
						<template slot="label"> 档案组织 </template>
						{{ MainImageProp.organization }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label"> 档案编号 </template>
						{{ MainImageProp.archive_id }}
					</el-descriptions-item>
				</el-descriptions>

				<el-descriptions
					class="margin-top"
					:column="1"
					border
					style="font-size: 20px"
					:label-style="{ width: '120px' }"
				>
					<el-descriptions-item>
						<template slot="label"> 档案描述 </template>
						{{ MainImageProp["Intro" + LanguageItem] }}
					</el-descriptions-item>
				</el-descriptions>
			</el-tab-pane>
		</el-tabs>
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 600px"></div>
	</div>
</template>

<script>
import { getForm } from "../../../api/data.js";
export default {
	name: "ExhibitionGallery",
	data() {
		return {
			// gallery_list 在数据库中的主键，gallery在数据库中主键
			ExhibitionID: "",
			AlbumID: "",
			// 展览的简介，用于回退
			exh_gallery_list_text: "",
			// 左上角的路径、大图的url，大图底下的文字描述
			WebPathGalleryListTitle: "加载中",
			WebPathGalleryTitle: "加载中",

			// 大图片的属性
			MainImageProp: {
				src: "Loading.gif",
				gallery_img_id: "",
				TitleZH: "加载中",
				TitleEN: "",
				TitleOther: "",
				IntroZH: "",
				IntroEN: "",
				IntroOther: "",
				date: "",
				size: "",
				organization: "",
				archive_id: "",
			},

			// 存储图片列表及其相关属性
			ImgList: [],

			// 为了方便 v-viewer 显示下方的列表，需要单独存储所有 Img 的 Src
			ImgSrcList: ["Loading.gif"],

            // 记录三种语言
            LanguageType: [],

			// 语种简称对应表
			LanguageMap: {
				AR: "阿拉伯文",
				BE: "白俄罗斯文",
				BG: "保加利亚文",
				CA: "加泰罗尼亚文",
				CS: "捷克文",
				DA: "丹麦文",
				DE: "德文",
				EL: "希腊文",
				EN: "英文",
				ES: "西班牙文",
				ET: "爱沙尼亚文",
				FI: "芬兰文",
				FR: "法文",
				HR: "克罗地亚文",
				HU: "匈牙利文",
				IT: "意大利文",
				IW: "希伯来文",
				JA: "日文",
				KO: "朝鲜文",
				LT: "立陶宛文",
				MK: "马其顿文",
				NL: "荷兰文",
				NO: "挪威文",
				PL: "波兰文",
				PT: "葡萄牙文",
				RO: "罗马尼亚文",
				RU: "俄文",
				SK: "斯洛伐克文",
				SL: "斯洛文尼亚文",
				SQ: "阿尔巴尼亚文",
				SR: "塞尔维亚文",
				SV: "瑞典文",
				TH: "泰文",
				TR: "土耳其文",
				UK: "乌克兰文",
				ZH: "中文",
			},

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
		};
	},
	mounted() {
		this.GetData();
		this.$store.dispatch("GetHeaderIndex", 3);
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
				path: "/ExhibitionGalleryList",
				query: {
					gallery_list_id: this.ExhibitionID,
					exh_gallery_list_heading: this.WebPathGalleryListTitle,
					exh_gallery_list_text: this.exh_gallery_list_text,
				},
			});
		},
		// 点击下方列表的图片，修改大图的url
		ImageListBtn(item) {
			this.MainImageProp = item;
		},

        ListContain(list, x){
            for(let item of list){
                if(x === item) return true;
            }
            return false;
        },
		// HTTP获取网页基本数据
		GetData() {
			//从本页面的url中获取 ExhibitionID 和 AlbumID 的值
			this.ExhibitionID = this.$route.query.gallery_list_id;
			this.AlbumID = this.$route.query.gallery_id;
			this.WebPathGalleryListTitle = this.$route.query.gallery_list_title;
			this.exh_gallery_list_text =
				this.$route.query.exh_gallery_list_text;

			//http请求

			let url =
				"/exhibition/album-detail?exhibition_id=" +
				this.ExhibitionID +
				"&album_id=" +
				this.AlbumID;

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
						TitleZH: "N/A",
						TitleEN: "N/A",
						TitleOther: "N/A",
						IntroZH: "N/A",
						IntroEN: "N/A",
						IntroOther: "N/A",
						date: data[item].date,
						size: data[item].size,
						organization: data[item].organization,
						archive_id: data[item].archive_id,
					};
					for (let item_id in data[item].title) {
                        if(!_this.ListContain(_this.LanguageType, item_id)) _this.LanguageType.push(item_id);
                        new_map['Title' + item_id] = data[item].title[item_id];
					}
					for (let item_id in data[item].intro) {
                        new_map['Intro' + item_id] = data[item].title[item_id];
					}
					_this.ImgList.push(new_map);
					if (_this.ImgList.length === 1) {
						_this.ImageListBtn(_this.ImgList[0]);
					}
				}
				console.log("ImgList", _this.ImgList);
			});
		},
	},
	watch: {
		MainImageProp: {
			handler(newValue, oldValue) {
				this.$nextTick(() => {
					// 把之前的 Container 还原
					if (oldValue.gallery_img_id !== "") {
						let CurGalleryImg = document.querySelector(
							`#ImageListImgContainer_${oldValue.gallery_img_id}`
						);
						CurGalleryImg.style.width = "130px";
						CurGalleryImg.style.height = "130px";
						CurGalleryImg.style.padding = "30px";
					}

					// 把新的 Container 放大
					let CurGalleryImg = document.querySelector(
						`#ImageListImgContainer_${newValue.gallery_img_id}`
					);
					CurGalleryImg.style.width = "160px";
					CurGalleryImg.style.height = "160px";
					CurGalleryImg.style.padding = "15px";
				});
			},
		},
	},
};
</script>

<style>
/* 网页图片标题 */

/*左上角的网页路径*/
.WebPath {
	position: relative;
	width: 1200px;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	top: 80px;
	font-size: 24px;
	line-height: 150%;
	color: #2f2f2f;
}

/* 图片列表和大图片的 Container */
.ListAndMainImageContainer {
	position: relative;
	top: 250px;
	height: 80vh;
	width: 1220px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: red; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/*左侧的图片列表*/
.ImageListContainer {
	position: relative;
	width: 220px;
	height: 80vh;
	/* background: blue; */

	display: flex;
	flex-direction: column;
	align-items: center;
}

.ImageListImgContainer {
	position: relative;
	width: 130px;
	height: 130px;
	padding: 30px;
	/* background: blue; */
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

/* 网页主图 */
.GalleryMainImageContainer {
	position: relative;
	width: 1000px;
	height: 80vh;
	/* background: red; */

	display: flex;
	justify-content: center;
	align-items: center;
}

.GalleryMainImage {
	position: relative;
	max-width: 1000px;
	max-height: 80vh;
	cursor: pointer;
	box-shadow: 6px 0 12px -5px rgb(190, 196, 252),
		-6px 0 12px -5px rgb(189, 196, 252);
}

/*大图片的描述*/
.MainImageDescription {
	position: relative;
	top: 350px;
	left: 0;
	right: 0;
	margin: auto;
	width: 1200px;
	height: auto;
	/* background: skyblue; */
}
</style>