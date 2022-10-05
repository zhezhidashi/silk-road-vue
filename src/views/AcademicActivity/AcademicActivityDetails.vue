<template>
	<div class="background">
		<!--标题-->
		<div class="Heading">
			{{ academic_activity_details_title }}
		</div>
		<!--左侧图片-->
		<div class="ImageAndText">
			<div class="academic_activity_details_img_container Card">
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
        <div class="BottomBlank"></div>
        <img src="底部浪花.svg" class="BottomWave" />
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
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 4);
        this.$store.dispatch("GetLineIndex", 1);
    },
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
                path: '/AcademicActivityList'
            })
		},
	},
};
</script>

<style scoped>

.ImageAndText {
	position: relative;
	width: 1200px;
	top: 220px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	justify-content: space-around;
}
/*左侧图片*/
.academic_activity_details_img_container {
	position: relative;
	width: 498px;
	height: 705px;
	/* background: red; */
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
	position: relative;
	width: 550px;
	height: auto;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	/* background: blue; */
}
</style>