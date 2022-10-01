<template>
	<div class="background" style="background: #efefef">
			<!-- 展览详情页面标题 -->
			<div class="Heading">
				{{ exh_gallery_list_heading }}
			</div>
			<!-- 展览详情的描述 -->
			<div class="exh_gallery_list_text">
				<div
					v-for="(item, index) in exh_gallery_list_text"
					:key="index"
					style="padding: 5px"
				>
					&emsp;&emsp;{{ item }}
				</div>
			</div>

			<!--    这下面的东西看起来也像是从数据库里面捞出来的，也用v-for做成list吧-->
			<div class="exh_gallery_list_imgText">
				<div v-for="item in imgText_list" :key="item.gallery_list_id">
					<div class="exh_gallery_list_imgText_container">
						<!--图片-->
						<div
							class="exh_gallery_list_imgText_img_container"
							@mouseenter="
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
							<div
								class="exh_gallery_list_imgText_img"
								:style="`background-image:url(${item.img_src})`"
							></div>
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
									@click="
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
						</div>

						<!--图片右侧的介绍文字-->
						<div class="exh_gallery_list_imgText_text">
							{{ item.text }}
						</div>
					</div>
				</div>
			</div>
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 800px"></div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";

export default {
	name: "ExhibitionGalleryList",
	data() {
		return {
			exh_gallery_list_heading: "",
			exh_gallery_list_text: [],
			gallery_list_id: "",
			imgText_list: [],
            exh_gallery_list_text_origin: '',
		};
	},
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 3);
    },
	created() {
		this.gallery_list_id = this.$route.query.gallery_list_id;
		this.exh_gallery_list_heading =
			this.$route.query.exh_gallery_list_heading;
        this.exh_gallery_list_text_origin = this.$route.query.exh_gallery_list_text;
		this.exh_gallery_list_text = this.$route.query.exh_gallery_list_text
			.toString()
			.split("\\n");

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
					text: data[item]["title"],
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
			this.$router.push({
                path: '/ExhibitionList'
            })
		},
		// 点击图片跳转到 gallery 界面
		exh_gallery_list_imgText_btn(event, gallery_id) {
            
			this.$router.push({
				path: "/ExhibitionGallery",
				query: {
					gallery_list_id: this.gallery_list_id,
					gallery_id,
					gallery_list_title: this.exh_gallery_list_heading,
                    exh_gallery_list_text: this.exh_gallery_list_text_origin,
				},
			});
		},

		// 鼠标停留在图片上方的效果
		exh_gallery_list_imgText_mouseover(event, gallery_id) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + gallery_id
			);
			// console.log(now_shadow);
			now_shadow.style.visibility = "visible";
		},

		// 鼠标离开图片上方恢复原样
		exh_gallery_list_imgText_mouseleave(event, gallery_id) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + gallery_id
			);
			now_shadow.style.visibility = "hidden";
		},
	},
};
</script>

<style scoped>

.exh_gallery_list_text {
	position: relative;
	width: 1000px;
	top: 200px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	/* background: red; */
    left: 0;
    right: 0;
    margin: auto;
}

/*展览详情页，把整个模块都定义成类*/
.exh_gallery_list_imgText {
	position: relative;
	width: 1100px;
	left: 0;right: 0;margin: auto;
	top: 300px;
	z-index: 10;
	/* background: #588cc8; */
}

/*整个模块的框*/
.exh_gallery_list_imgText_container {
	position: relative;
	width: 1150px;
	height: 372px;
	margin: 100px 0 80px 0;
	/* background: red; */
	filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
	box-shadow: 6px 0 12px -5px rgb(190, 196, 252),
		-6px 0 12px -5px rgb(189, 196, 252);
}

/*图片部分*/
.exh_gallery_list_imgText_img_container {
	position: absolute;
	width: 574px;
	height: 372px;
	left: 0;
	top: 0;
	border-radius: 7px;
}

.exh_gallery_list_imgText_img {
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
	width: 574px;
	height: 372px;
	left: 0;
	top: 0;
	border-radius: 7px;
	background: rgba(47, 47, 47, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	visibility: hidden;
}

/*文字部分*/
.exh_gallery_list_imgText_text {
	position: absolute;
	width: 383px;
	left: 700px;
	top: 150px;

	font-size: 28px;
	line-height: 200%;
	color: #2f2f2f;
}
</style>