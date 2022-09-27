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
		<!--线上展览标题-->
		<div class="exh_list_h1">线上展览</div>

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
						<div
							@click="
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
						</div>
					</div>
					<!--图片列表-->
					<div class="list_images" id="exh_list_images">
						<!-- 照片只展示前四个 -->
						<div
							v-for="(img_src, index) in item.imgList"
							:key="img_src.gallery_id"
						>
							<div
								@click="
									exh_list_images_btn(
										$event,
										item.gallery_list_id,
										img_src.gallery_id,
										item.exh_list_h2,
                                        item.exh_list_text
									)
								"
								class="exh_list_images_img_container"
                                @mouseover="MouseOverImage(item.gallery_list_id, img_src.gallery_id)"
                                @mouseleave="MouseLeaveImage(item.gallery_list_id, img_src.gallery_id)"
							>
								<!-- 鼠标悬停查看详情 -->
								<div class="ImageSeeDetailsHover" :id="`ImageSeeDetails_${item.gallery_list_id}_${img_src.gallery_id}`">查看大图</div>
								<div class="ImageContainerHover" :id="`ImageContainer_${item.gallery_list_id}_${img_src.gallery_id}`"></div>
                                <div
									class="exh_list_images_img"
									:style="`background-image:url(${img_src.src})`"
									v-show="index < 4"
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 这里留一块300px高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 600px"></div>
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
					exh_list_h2: "",
					exh_list_text: "",
					gallery_list_id: "",
					imgList: [],
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
			this.$router.push({
                path: '/Home'
            })
            this.$store.dispatch("GetHeaderIndex", 0);
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
            this.$store.dispatch("GetHeaderIndex", 3);
		},
		exh_list_images_btn(event, gallery_list_id, gallery_id, exh_list_h2, intro) {
			this.$router.push({
				path: "/ExhibitionGallery",
				query: {
					gallery_list_id,
					gallery_id,
					gallery_list_title: exh_list_h2,
                    exh_gallery_list_text: intro,
				},
			});
            this.$store.dispatch("GetHeaderIndex", 3);
		},
        MouseOverImage(v1, v2){
            let Container = document.querySelector(`#ImageContainer_${v1}_${v2}`)
            let SeeDetails = document.querySelector(`#ImageSeeDetails_${v1}_${v2}`)
            Container.style.display = "flex";
            SeeDetails.style.display = "flex";
        },
        MouseLeaveImage(v1, v2){
            let Container = document.querySelector(`#ImageContainer_${v1}_${v2}`)
            let SeeDetails = document.querySelector(`#ImageSeeDetails_${v1}_${v2}`)
            Container.style.display = "none";
            SeeDetails.style.display = "none";
        }
	},
};
</script>

<style scoped>

/*页面标题*/
.exh_list_h1 {
	position: absolute;
	width: 1440px;
    text-align: center;
	top: 100px;
	font-size: 32px;
    line-height: 150%;
	color: #023871;
}

/*exhibition list 整个框*/
.exh_list_container {
	position: relative;
	width: 1150px;
    min-height: 100vh;
	top: 220px;
	/* background: lightblue; */
    left: 0;
    right: 0;
    margin: auto;
}

/*每一个exhibition对应的块*/
.exh_list_content {
	position: relative;
	width: 1100px;
	height: 500px;
	margin: 30px;
	/* background: blue; */
}

/*每一个exhibition的标题*/
.exh_list_h2 {
	position: absolute;
	width: 800px;
	left: 20px;
	top: 25px;
	font-size: 28px;
	line-height: 120%;
	color: #2f2f2f;
}

/*每一个exhibition对应文字描述*/
.exh_list_text {
	position: absolute;
	width: 1050px;
	left: 20px;
	top: 100px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
    /* background: red; */

	/* 最多显示2行文字，否则就是省略号 */
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

/*每一个exhibition对应的查看全部*/
#exh_list_see_all {
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 20px;
}

/*一排一排陈列图片 上半部分对应的id*/
#exh_list_images {
	width: 1000px;
	left: 0;
	top: 180px;
	z-index: 10;
}

/* 每一张图片的属性 */
.exh_list_images_img_container {
	width: 210px;
	height: 210px;
	border-radius: 7px;
	margin: 20px;
	cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.exh_list_images_img {
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	border-radius: 7px;

	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px;
}

/* 鼠标悬浮出现“查看详情” */
.ImageContainerHover{
    position: absolute;
    width: 210px;
	height: 210px;
    overflow: hidden;
    background: rgba(95, 95, 95, 0.37);
    display: none;
    z-index: 15;
} 

.ImageSeeDetailsHover {
	position: absolute;
	width: 150px;
	height: 50px;

	background: #588cc8;
	border-radius: 7px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 18px;
	color: #ffffff;
	cursor: pointer;
	z-index: 20;

    display: none;
}

</style>