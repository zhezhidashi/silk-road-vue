<template>
	<div class="background" style="background: #efefef">
		<!--回退到上一个页面-->
		<img @click="router_go_back()" class="go_back" id="go_back1" src="arrow_left_3.png" alt="" />
		<!--线上展览标题-->
		<p class="exh_list_h1">线上展览</p>

		<!-- 把 标题、查看全部、图片列表当作一个类，记为 exh_list_content。并且把这些类全部装到 exh_list_container 里面方便 v-for 展示-->
		<div class="exh_list_container">
			<div v-for="item in exh_list_items" :key="item.gallery_list_id">
				<div class="exh_list_content">
					<!--标题-->
					<div class="exh_list_h2">{{ item.exh_list_h2 }}</div>
					<!--文字描述-->
					<div class="exh_list_text">{{ item.exh_list_text }}</div>
					<!--“查看全部”方框-->
					<div class="blue_rectangle_container" id="exh_list_see_all">
						<p
							@mousedown="
								see_all_btn(
									$event,
									item.gallery_list_id,
									item.exh_list_h2,
									item.exh_list_text
								)
							"
							class="see_all_text"
						>
							查看全部
						</p>
					</div>
					<!--图片列表-->
					<div class="list_images" id="exh_list_images">
						<!-- 照片只展示前四个 -->
						<div
							v-for="(img_src, index) in item.imgList"
							:key="img_src.gallery_id"
						>
							<img
								@mousedown="
									exh_list_images_btn(
										$event,
										item.gallery_list_id,
										img_src.gallery_id,
										item.exh_list_h2
									)
								"
								class="img"
								:src="img_src.src"
								style="
									width: 178px;
									height: 178px;
									border-radius: 7px;
									margin: 20px;
									cursor: pointer;
								"
								v-show="index < 4"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 这里留一块300px高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 300px"></div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ExhibitionList",
	data() {
		return {
			exh_list_items: [
				{
					exh_list_h2: "探险家与原住民",
					exh_list_text:
						"阿贝尔·塔斯曼（Abel Janszoon Tasman）是荷兰商人、航海家、探险家，1642年至1644年间两次受命于荷兰东印度公司探索南太平洋，是早期到达澳大利亚塔斯马尼亚岛、斐济、新西兰等地的欧洲探险家。",
					gallery_list_id: "1",
					imgList: [
						{
							src: "../static/images/exh_list_image_up_1.png",
							gallery_id: "1",
						},
						{
							src: "../static/images/exh_list_image_up_2.png",
							gallery_id: "2",
						},
						{
							src: "../static/images/exh_list_image_up_3.png",
							gallery_id: "3",
						},
						{
							src: "../static/images/exh_list_image_up_4.png",
							gallery_id: "4",
						},
						{
							src: "../static/images/exh_list_image_up_1.png",
							gallery_id: "5",
						},
						{
							src: "../static/images/exh_list_image_up_2.png",
							gallery_id: "6",
						},
					],
				},
			],
		};
	},

	created() {
		// http 请求部分
		let url = "/exhibition/list";

		console.log("http请求的url是 " + url);

		this.exh_list_items = [];
		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log(data);

			// 遍历 gallery
			for (let item of data.list) {
				let new_img_list = [];

				// console.log('album_dict', item['album_dict'])

				// 遍历 album
				for (let item_gallery in item["album_dict"]) {
					let new_img_map = {
						src: null,
						gallery_id: item_gallery,
					};
					// console.log('item_gallery', item_gallery)

					// 这个遍历仅仅是为了取出 album 的封面
					for (let item_img in item["album_dict"][item_gallery][
						"picture_dict"
					]) {
						// console.log('item_img', item['album_dict'][item_gallery]['picture_dict'][item_img]['pic_url'])
						// 把相册封面取出来
						if (new_img_map["src"] === null) {
							new_img_map["src"] =
								item["album_dict"][item_gallery][
									"picture_dict"
								][item_img]["pic_url"];
							break;
						}
					}
					// console.log(new_img_map)
					new_img_list.push(new_img_map);
				}

				let new_map = {
					exh_list_h2: item["title"],
					exh_list_text: item["intro"],
					gallery_list_id: item["main_id"],
					imgList: new_img_list,
				};
				inner_this.exh_list_items.push(new_map);
			}
		});
	},
	methods: {
        // 路由回退
        router_go_back() {
            console.log("click!")
			this.$router.go(-1);
		},
		see_all_btn(event, gallery_list_id, title, intro) {
			this.$router.push({
				path: "/ExhibitionGalleryList",
				query: {
					gallery_list_id,
					exh_gallery_list_heading: title,
					exh_gallery_list_text: intro,
				},
			});
		},
		exh_list_images_btn(event, gallery_list_id, gallery_id, exh_list_h2) {
			this.$router.push({
				path: "/ExhibitionGallery",
				query: {
					gallery_list_id,
					gallery_id,
					gallery_list_title: exh_list_h2,
				},
			});
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

/*页面标题*/
.exh_list_h1 {
	position: absolute;
	width: 90px;
	height: 21px;
	left: 441px;
	top: 135px;
	font-size: 22px;
	line-height: 0;
	color: #023871;
}

/*exhibition list 整个框*/
.exh_list_container {
	position: relative;
	/*height: 900px;*/
	width: 940px;
	left: 30px;
	top: 206px;

	/*background: lightblue;*/
}

/*每一个exhibition对应的块*/
.exh_list_content {
	position: relative;
	height: 400px;
	width: 880px;
	margin: 30px;

	/* background: blue; */
}

/*每一个exhibition的标题*/
.exh_list_h2 {
	position: absolute;
	width: 500px;
	left: 20px;
	top: 25px;

	font-size: 17px;
	line-height: 120%;
	color: #2f2f2f;
}

/*每一个exhibition对应文字描述*/
.exh_list_text {
	position: absolute;
	width: 840px;
	height: 35px;
	left: 20px;
	top: 68px;
	font-size: 11px;
	line-height: 120%;
	color: #2f2f2f;
}

/*每一个exhibition对应的查看全部*/
#exh_list_see_all {
	position: absolute;
	right: 10px;
	top: 10px;
}

/*一排一排陈列图片 上半部分对应的id*/
#exh_list_images {
	width: 880px;
	left: 0;
	top: 134px;
	z-index: 10;
}
</style>