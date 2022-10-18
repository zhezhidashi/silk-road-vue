<template>
	<div class="background">
		<!--标题-->
		<div class="Heading">
			{{ Title }}
		</div>
		<div class="BelowHeading ImageTextContainer">
			<img class="ImageContainer Card" :src="ImageUrl" align="left" />
			<div v-for="(item, index) in ActivityDescription" :key="index">
				<div class="ActivityDescription">{{ item }}</div>
			</div>

			<!--描述-->
			<!-- <div class="ActivityDescription">
				<div v-for="(item, index) in ActivityDescription" :key="index">
					<div style="margin: 10px 0 15px 0">{{ item }}</div>
				</div>
			</div> -->
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
			AcademicActivityID: "",
			Title: "",
			ImageUrl: "",
			ActivityDescription: [],
		};
	},
	created() {
		//从本页url的参数中获取academic_activity_id的值
		this.AcademicActivityID = this.$route.query.AcademicActivityID;

		//http请求
		let url = "/activity/detail?activity_id=" + this.AcademicActivityID;

		console.log(url);
		let _this = this; // 别改

		getForm(url, 1, function (res, msg) {
			let data = res.data;
			_this.AcademicActivityID = data["main_id"];
			_this.Title = data["title"];
			_this.ImageUrl = data["cover_pic"];
			_this.ActivityDescription = data["intro"].toString().split("\\n");
		});
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 4);
		this.$store.dispatch("GetLineIndex", 1);
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
				path: "/AcademicActivityList",
			});
		},
	},
};
</script>

<style scoped>
.ImageTextContainer {
	position: relative;
	width: 80vw;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	/* display: flex;
	justify-content: space-between; */
}
/*左侧图片*/
.ImageContainer {
	position: relative;
	width: 33vw;
	height: 46.7vw;
	/* background: red; */
    margin: 0 5vw 2vw 0;
}

/*描述*/
.ActivityDescription {
	position: relative;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
    margin: 10px 0 15px 0
	/* background: blue; */
}
</style>