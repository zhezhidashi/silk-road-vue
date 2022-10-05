<template>
	<div class="background" style="background: #efefef">
		<!--线上展览标题-->
		<div class="Heading">线上展览</div>

		<!-- 把 标题、查看全部、图片列表当作一个类，记为 exh_list_content。并且把这些类全部装到 exh_list_container 里面方便 v-for 展示-->
		<div class="exh_list_container">
			<div v-for="item in exh_list_items" :key="item.ExhibitionID">
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
									item.ExhibitionID,
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
							:key="img_src.AlbumID"
						>
							<div
								@click="
									exh_list_images_btn(
										$event,
										item.ExhibitionID,
										img_src.AlbumID,
										item.exh_list_h2,
										item.exh_list_text
									)
								"
								class="exh_list_images_img_container Card"
							>
								<!-- 鼠标悬停查看详情 -->
								<div class="ImageContainerHover">
									<div class="ImageSeeDetailsHover">
										查看大图
									</div>
								</div>
								<div
									class="exh_list_images_img Card"
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
		<div class="BottomBlank"></div>
        <img src="底部浪花.svg" class="BottomWave" />
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
					ExhibitionID: "",
					imgList: [],
				},
			],
		};
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
	},
	created() {
		// http 请求部分
		let url = "/exhibition/list";

		console.log("http请求的url是 " + url);

		this.exh_list_items = [];
		let _this = this; // 别改

		getForm(url, function (res) {
			let data = res.data;

			// 遍历 gallery
			for (let item of data.list) {
				let new_img_list = [];

				// console.log('album_dict', item['album_dict'])

				// 遍历 album
				for (let item_gallery in item["album_dict"]) {
					let new_img_map = {
						src: null,
						AlbumID: item_gallery,
					};

					// 这个遍历仅仅是为了取出 album 的封面
					for (let item_img in item["album_dict"][item_gallery][
						"picture_dict"
					]) {
						// 把相册封面取出来
						if (new_img_map["src"] === null) {
							new_img_map["src"] =
								item["album_dict"][item_gallery][
									"picture_dict"
								][item_img]["pic_url"];
							break;
						}
					}
					new_img_list.push(new_img_map);
				}

				let new_map = {
					exh_list_h2: item["title"],
					exh_list_text: item["intro"],
					ExhibitionID: item["main_id"],
					imgList: new_img_list,
				};
				_this.exh_list_items.push(new_map);
			}
		});
	},
	methods: {
		see_all_btn(event, ExhibitionID) {
			this.$router.push({
				path: "/AlbumList",
				query: {
					ExhibitionID,
				},
			});
		},
		exh_list_images_btn(event, ExhibitionID, AlbumID) {
			this.$router.push({
				path: "/Album",
				query: {
					ExhibitionID,
					AlbumID,
				},
			});
		},
	},
};
</script>

<style scoped>
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
.ImageContainerHover {
	position: absolute;
	width: 210px;
	height: 210px;
	overflow: hidden;
	background: rgba(95, 95, 95, 0.37);
	z-index: 15;
	display: flex;
	justify-content: center;
	align-items: center;

    opacity: 0;
	/* 需要参与过渡的属性 */
	transition-property: opacity;
	/* 过渡动画的持续时间 */
	transition-duration: 0.5s;
}
.exh_list_images_img_container:hover .ImageContainerHover {
	opacity: 1;
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
}
</style>