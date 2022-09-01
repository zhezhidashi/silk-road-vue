<template>
	<div class="background" style="height: 906px; background: #efefef">
		<div class="academic_activity_details">
			<!--标题-->
			<div class="academic_activity_details_title">
				{{ academic_activity_details_title }}
			</div>
			<!--左侧图片-->
			<img class="academic_activity_details_img" :src="academic_activity_details_img_src" alt="" />

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
	text-align: center;
	top: 140px;
	font-size: 17px;
	width: 900px;
	height: 20px;
	line-height: 100%;
	color: #2f2f2f;
}
/*左侧图片*/
.academic_activity_details_img {
	position: absolute;
	width: 346px;
	height: 490px;
	left: 84px;
	top: 227px;
}

/*描述*/
.academic_activity_details_description {
	position: absolute;
	width: 382px;
	left: 484px;
	top: 227px;
	font-size: 14px;
	line-height: 21px;
	color: #2f2f2f;
}
</style>