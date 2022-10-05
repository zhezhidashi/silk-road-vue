<template>
	<div class="background" style="background: #efefef">
		<!-- 展览详情页面标题 -->
		<div class="Heading">
			{{ ExhibitionTitle }}
		</div>
		<!-- 展览详情的描述 -->
		<div class="ExhibitionIntro">
			<div v-for="(item, index) in ExhibitionIntro" :key="index">
				<div style="margin: 10px 0 15px 0">{{ item }}</div>
			</div>
		</div>

		<!--    这下面的东西看起来也像是从数据库里面捞出来的，也用v-for做成list吧-->
		<div class="exh_gallery_list_imgText">
			<div v-for="item in imgText_list" :key="item.ExhibitionID">
				<div class="exh_gallery_list_imgText_container">
					<!--图片-->
					<div class="exh_gallery_list_imgText_img_container">
						<div
							class="exh_gallery_list_imgText_img"
							:style="`background-image:url(${item.img_src})`"
						></div>
						<!--图片的阴影-->
						<div class="exh_gallery_list_imgText_img_shadow">
							<!--查看详情部分-->
							<div
								@click="
									exh_gallery_list_imgText_btn(
										$event,
										item.AlbumID
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
		<div class="BottomBlank"></div>
        <img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";

export default {
	name: "AlbumList",
	data() {
		return {
			ExhibitionTitle: "",
			ExhibitionIntro: [],
			ExhibitionID: "",
			imgText_list: [],
		};
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.GetExhibitionTitleText();
		this.GetAlbumList();
	},
	methods: {
		// 获取展览名称和简介
		GetExhibitionTitleText() {
			let url = "/exhibition/list";
			console.log("http请求的url是 " + url);
			let _this = this;
			getForm(url, (res) => {
				let data = res.data;

				for (let item of data.list) {
					if (_this.ExhibitionID === item.main_id.toString()) {
						_this.ExhibitionTitle = item.title;
						_this.ExhibitionIntro = item.intro
							.toString()
							.split("\\n");
					}
				}
			});
		},

		// 获取该展览下的相册信息
		GetAlbumList() {
			let url =
				"/exhibition/all-album?exhibition_id=" + this.ExhibitionID;
			this.imgText_list = [];

			console.log("http请求的url是 " + url);
			let _this = this;

			getForm(url, (res) => {
				let data = res.data;
				for (let item in data) {
					let new_map = {
						AlbumID: item,
						img_src: null,
						text: data[item]["title"],
					};
					for (let img_item in data[item]["picture_dict"]) {
						new_map["img_src"] =
							data[item]["picture_dict"][img_item]["pic_url"];
						break;
					}
					_this.imgText_list.push(new_map);
				}
			});
		},

		// 点击图片跳转到 gallery 界面
		exh_gallery_list_imgText_btn(event, AlbumID) {
			this.$router.push({
				path: "/Album",
				query: {
					ExhibitionID: this.ExhibitionID,
					AlbumID,
				},
			});
		},

		// 鼠标停留在图片上方的效果
		exh_gallery_list_imgText_mouseover(event, AlbumID) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + AlbumID
			);
			// console.log(now_shadow);
			now_shadow.style.visibility = "visible";
		},

		// 鼠标离开图片上方恢复原样
		exh_gallery_list_imgText_mouseleave(event, AlbumID) {
			let now_shadow = document.querySelector(
				"#exh_gallery_list_imgText_img_shadow_" + AlbumID
			);
			now_shadow.style.visibility = "hidden";
		},
	},
};
</script>

<style scoped>
.ExhibitionIntro {
	position: relative;
	width: 1000px;
	top: 200px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	left: 0;
	right: 0;
	margin: auto;

	display: flex;
	flex-direction: column;
}

/*展览详情页，把整个模块都定义成类*/
.exh_gallery_list_imgText {
	position: relative;
	width: 1100px;
	left: 0;
	right: 0;
	margin: auto;
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
	border-radius: 7px;
	display: flex;
	justify-content: space-between;
}

/*图片部分*/
.exh_gallery_list_imgText_img_container {
	position: relative;
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
	cursor: pointer;
}

/*图片的灰色表面，用于hover效果*/
.exh_gallery_list_imgText_img_shadow {
	position: absolute;
	width: 574px;
	height: 373px;
	left: 0;
	top: 0;
	border-radius: 7px;
	background: rgba(47, 47, 47, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;

	/* 需要参与过渡的属性 */
	transition-property: opacity;
	/* 过渡动画的持续时间 */
	transition-duration: 0.5s;
}
.exh_gallery_list_imgText_img_container:hover
	.exh_gallery_list_imgText_img_shadow {
	opacity: 1;
}

/*文字部分*/
.exh_gallery_list_imgText_text {
	position: relative;
	width: 576px;
	height: 372px;
	font-size: 28px;
	line-height: 200%;
	color: #2f2f2f;
	/* background: red; */
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>