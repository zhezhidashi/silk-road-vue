<template>
	<div class="background" style="height: 1577px; background: #efefef">
		<!--回退到上一个页面-->
		<img @click="router_go_back()" class="go_back" id="go_back1" src="arrow_left_3.png" alt="" />

		<!--    把整个页面所有数据包装到container里面-->
		<div class="exh_gallery_container">
			<!--    左上角的网页路径-->
			<div class="exh_gallery_web_path">
				线上展览&gt;{{ exh_gallery_web_path_gallery_list_title }}&gt;{{
					exh_gallery_web_path_gallery_title
				}}&gt;
			</div>

			<!--    大图片-->
			<img
				class="exh_gallery_mainImage"
				:src="exh_gallery_mainImage_src"
				alt=""
			/>

			<!--    大图片的描述-->
			<div class="exh_gallery_mainImage_text">
				{{ exh_gallery_mainImage_text }}
			</div>
			<!--    底下的图片列表-->
			<div class="list_images" id="exh_gallery_imgList">
				<div
					v-for="item in exh_gallery_imgList_src"
					:key="item.gallery_img_id"
				>
					<div class="exh_gallery_imgList_container">
						<img
							@mousedown="exh_gallery_imgList_btn($event, item)"
							:src="item.src"
							style="
								position: absolute;
								width: 83px;
								height: 65px;
								left: 0;
								top: 0;
								border-radius: 7px;
								filter: drop-shadow(
									3px 3px 3px rgba(0, 0, 0, 0.25)
								);
								cursor: pointer;
								z-index: 10;
							"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ExhibitionGallery",
	data() {
		return {
			// gallery_list 在数据库中的主键，gallery在数据库中主键
			exh_gallery_list_id: "",
			exh_gallery_id: "",
			// 左上角的路径、大图的url，大图底下的文字描述
			exh_gallery_web_path_gallery_list_title: "",
			exh_gallery_web_path_gallery_title: "",
			exh_gallery_mainImage_src: "",
			exh_gallery_mainImage_text: "",

			exh_gallery_imgList_src: [],
		};
	},
	created() {
		//从本页面的url中获取 exh_gallery_list_id 和 exh_gallery_id 的值
		this.exh_gallery_list_id = this.$route.query.gallery_list_id;
		this.exh_gallery_id = this.$route.query.gallery_id;
		this.exh_gallery_web_path_gallery_list_title =
			this.$route.query.gallery_list_title;

		//http请求
		if (this.exh_gallery_list_id === "")
			alert("exh_gallery_list_id 不能为空");
		if (this.exh_gallery_id === "") alert("exh_gallery_id 不能为空");

		let url =
			"/exhibition/album-detail?exhibition_id=" +
			this.exh_gallery_list_id +
			"&album_id=" +
			this.exh_gallery_id;

		console.log(url);

		this.exh_gallery_imgList_src = [];

		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("http-get data is here", data);
			// 修改 标题、图片url，图片简介
			inner_this.exh_gallery_web_path_gallery_title = data["title"];
			inner_this.exh_gallery_mainImage_src = null;
			inner_this.exh_gallery_mainImage_text = data["intro"];

			for (let item in data["picture_dict"]) {
				if (inner_this.exh_gallery_mainImage_src === null) {
					inner_this.exh_gallery_mainImage_src =
						data["picture_dict"][item]["pic_url"];
				}
				let new_map = {
					src: data["picture_dict"][item]["pic_url"],
					gallery_img_id: item,
					intro: data["picture_dict"][item]["intro"],
					title: data["picture_dict"][item]["title"],
				};
				console.log("exhibition gallery new_map", new_map);
				inner_this.exh_gallery_imgList_src.push(new_map);
			}
		});
	},
	methods: {
        // 路由回退
        router_go_back() {
            console.log("click!")
			this.$router.go(-1);
		},
		// 点击下方列表的图片，修改大图的url
		exh_gallery_imgList_btn(event, item) {
			document.querySelector(".exh_gallery_mainImage").src = item.src;
			this.exh_gallery_mainImage_text = item["intro"];
		},
	},
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 485px;
	top: 45px;
}

/*左上角的网页路径*/
.exh_gallery_web_path {
	position: absolute;
	width: 266px;
	height: 13px;
	left: 99px;
	top: 192px;
	font-size: 14px;
	line-height: 96%;
	color: #2f2f2f;
}

/*大图片*/
.exh_gallery_mainImage {
	position: absolute;
	height: 409px;
	left: 98px;
	top: 240px;

	border-radius: 7px;
}

/*大图片的描述*/
.exh_gallery_mainImage_text {
	position: absolute;
	width: 813px;
	left: 99px;
	height: 30px;
	top: 665px;
	font-size: 11px;
	line-height: 120%;
	color: #2f2f2f;
}

/*底下的图片列表*/
#exh_gallery_imgList {
	width: 814px;
	left: 84px;
	top: 730px;
	/*background: red;*/
}
.exh_gallery_imgList_container {
	position: relative;
	width: 83px;
	height: 65px;
	margin: 13px;
}
</style>