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
		<div class="exh_gallery_list_container">
			<!--    展览详情页面标题-->
			<p class="exh_gallery_list_heading">
				{{ exh_gallery_list_heading }}
			</p>
			<!--展览详情的描述-->
			<p class="exh_gallery_list_text">{{ exh_gallery_list_text }}</p>

			<!--    这下面的东西看起来也像是从数据库里面捞出来的，也用v-for做成list吧-->
			<div class="exh_gallery_list_imgText">
				<div v-for="item in imgText_list" :key="item.gallery_list_id">
					<div
						class="exh_gallery_list_imgText_container"
						:id="
							'exh_gallery_list_imgText_container_' +
							item.gallery_id
						"
						@mouseover="
							exh_gallery_list_imgText_mouseover(
								$event,
								item.gallery_id
							)
						"
						@mouseleave="
							exh_gallery_list_imgText_mouseleave(
								$event,
								item.gallery_id
							)
						"
					>
						<!--图片-->
						<div class="exh_gallery_list_imgText_img_container">
							<div
								class="exh_gallery_list_imgText_img"
								:style="`background-image:url(${item.img_src})`"
							></div>
						</div>
						<!--图片的阴影-->
						<div
							class="exh_gallery_list_imgText_img_shadow"
							:id="
								'exh_gallery_list_imgText_img_shadow_' +
								item.gallery_id
							"
						>
							<!--查看详情部分-->
							<div
								@mousedown="
									exh_gallery_list_imgText_btn(
										$event,
										item.gallery_id
									)
								"
								class="blue_rectangle_container"
								id="exh_gallery_list_imgText_see_details"
							>
								查看详情
							</div>
						</div>

						<!--图片右侧的介绍文字-->
						<p class="exh_gallery_list_imgText_text">
							{{ item.text }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 400px"></div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";

export default {
	name: "ExhibitionGalleryList",
	data() {
		return {
			exh_gallery_list_heading: "",
			exh_gallery_list_text: "",
			gallery_list_id: "",
			imgText_list: [],
		};
	},
	created() {
		this.gallery_list_id = this.$route.query.gallery_list_id;
		this.exh_gallery_list_heading =
			this.$route.query.exh_gallery_list_heading;
		this.exh_gallery_list_text = this.$route.query.exh_gallery_list_text;

		console.log(this.gallery_list_id);

		// http 请求部分
		let url = "/exhibition/all-album?exhibition_id=" + this.gallery_list_id;

		this.imgText_list = [];

		console.log("http请求的url是 " + url);
		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("gallery list data", data);
			for (let item in data) {
				console.log("gallery list data item", item);
				let new_map = {
					gallery_id: item,
					img_src: null,
					text: data[item]["intro"],
				};
				for (let img_item in data[item]["picture_dict"]) {
					new_map["img_src"] =
						data[item]["picture_dict"][img_item]["pic_url"];
					break;
				}
				inner_this.imgText_list.push(new_map);
			}
		});
	},
	methods: {
		// 路由回退
		router_go_back() {
			console.log("click!");
			this.$router.go(-1);
		},
		// 点击图片跳转到 gallery 界面
		exh_gallery_list_imgText_btn(event, gallery_id) {
			this.$router.push({
				path: "/ExhibitionGallery",
				query: {
					gallery_list_id: this.gallery_list_id,
					gallery_id,
					gallery_list_title: this.exh_gallery_list_heading,
				},
			});
		},

		// 鼠标停留在图片上方的效果
		exh_gallery_list_imgText_mouseover(event, gallery_id) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + gallery_id
			);
			// console.log(now_shadow);
			now_shadow.style.display = "inline";
		},

		// 鼠标离开图片上方恢复原样
		exh_gallery_list_imgText_mouseleave(event, gallery_id) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + gallery_id
			);
			now_shadow.style.display = "none";
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
.exh_gallery_list_heading {
	position: absolute;
	width: 330px;
	height: 50px;
	left: 345px;
	top: 130px;
	font-size: 19px;
	line-height: 150%;
	text-align: center;
	color: #2f2f2f;
}
.exh_gallery_list_text {
	position: absolute;
	width: 813px;
	height: 43px;
	left: 97px;
	top: 259px;
	font-size: 11px;
	line-height: 21px;
	color: #2f2f2f;
}

/*展览详情页，把整个模块都定义成类*/
.exh_gallery_list_imgText {
	position: relative;
	width: 869px;
	left: 73px;
	top: 321px;
	z-index: 10;
	/*background: #588CC8;*/
}

/*整个模块的框*/
.exh_gallery_list_imgText_container {
	position: relative;
	width: 850px;
	height: 281px;
	margin: 10px;
	/*background: red;*/
}

/*图片部分*/
.exh_gallery_list_imgText_img_container {
	position: absolute;
	width: 399px;
	height: 258px;
	left: 14px;
	top: 12px;
	border-radius: 7px;
}

.exh_gallery_list_imgText_img{
    width: 100%;
	height: 0;
	padding-bottom: 65%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
    border-radius: 7px;
}

/*图片的灰色表面，用于hover效果*/
.exh_gallery_list_imgText_img_shadow {
	position: absolute;
	width: 399px;
	height: 258px;
	left: 14px;
	top: 12px;
	border-radius: 7px;
	background: rgba(47, 47, 47, 0.5);
	display: none;
}

/*hover效果的查看详情*/
#exh_gallery_list_imgText_see_details {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}

/*文字部分*/
.exh_gallery_list_imgText_text {
	position: absolute;
	width: 383px;
	left: 446px;
	top: 100px;

	font-size: 11px;
	line-height: 17px;
	color: #2f2f2f;
}
</style>