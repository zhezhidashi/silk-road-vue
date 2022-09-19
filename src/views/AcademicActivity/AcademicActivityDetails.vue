<template>
	<div class="background" style="height: 1304px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>
		<div class="academic_activity_details">
			<!--标题-->
			<div class="academic_activity_details_title">
				{{ academic_activity_details_title }}
			</div>
			<!--左侧图片-->
			<div class="academic_activity_details_img_container">
				<div
					class="academic_activity_details_img"
					:style="`background-image:url(${academic_activity_details_img_src})`"
					alt=""
				></div>
			</div>

			<!--描述-->
			<div class="academic_activity_details_description">
				{{ academic_activity_details_description }}
			</div>
		</div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "AcademicActivityDetails",
	data() {
		return {
			academic_activity_id: "",
			academic_activity_details_title: "",
			academic_activity_details_img_src: "",
			academic_activity_details_description: "",
		};
	},
	created() {
		//从本页url的参数中获取academic_activity_id的值
		this.academic_activity_id = this.$route.query.academic_activity_id;

		//http请求
		let url = "/activity/detail?activity_id=" + this.academic_activity_id;

		console.log(url);
		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("http-get data is here");
			console.log(data);
			inner_this.academic_activity_id = data["main_id"];
			inner_this.academic_activity_details_title = data["title"];
			inner_this.academic_activity_details_img_src = data["cover_pic"];
			inner_this.academic_activity_details_description = data["intro"];
		});

		//把主页图片的 url 设置好
		document.querySelector(".academic_activity_details_img").src =
			this.academic_activity_details_img_src;
	},
	methods: {
		// 路由回退
		router_go_back() {
			console.log("click!");
			this.$router.go(-1);
		},
	},
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 577px;
	top: 45px;
}

/*标题*/
.academic_activity_details_title {
	position: absolute;
	top: 220px;
	width: 1440px;
	height: 24px;
	font-size: 24px;
	text-align: center;
	line-height: 100%;
	color: #2f2f2f;
}
/*左侧图片*/
.academic_activity_details_img_container {
	position: absolute;
	width: 498px;
	height: 705px;
	left: 122px;
	top: 327px;
}
.academic_activity_details_img {
	width: 100%;
	height: 0;
	padding-bottom: 142%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
}

/*描述*/
.academic_activity_details_description {
	position: absolute;
	width: 550px;
	height: 705px;
	left: 697px;
	top: 327px;
	font-size: 20px;
	line-height: 180%;
	color: #2f2f2f;
}
</style>