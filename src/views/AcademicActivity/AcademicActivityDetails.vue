<template>
	<div class="background">
		<!--标题-->
		<div class="Heading">
			{{ Title }}
		</div>
		<!--左侧图片-->
		<div class="ImageAndText">
			<div class="ImageContainer Card">
				<div
					class="Image BackgroundImage"
					:style="`background-image:url(${ImageUrl})`"
					alt=""
				></div>
			</div>

			<!--描述-->
			<div class="ActivityDescription">
				<div v-for="(item, index) in ActivityDescription" :key="index">
					<div style="margin: 10px 0 15px 0">{{ item }}</div>
				</div>
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

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("http-get data is here");
			console.log(data);
			_this.AcademicActivityID = data["main_id"];
			_this.Title = data["title"];
			_this.ImageUrl = data["cover_pic"];
			_this.ActivityDescription = data["intro"]
				.toString()
				.split("\\n");
            console.log(_this.ActivityDescription)
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
.ImageAndText {
	position: relative;
	width: 80vw;
	top: 220px;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	justify-content: space-between;
}
/*左侧图片*/
.ImageContainer {
	position: relative;
	width: 33vw;
	height: 44vw;
	/* background: red; */
}
.Image {
	padding-bottom: 133%;
	border-radius: 7px;
}

/*描述*/
.ActivityDescription {
	position: relative;
	width: 40vw;
	height: auto;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	/* background: blue; */
}
</style>