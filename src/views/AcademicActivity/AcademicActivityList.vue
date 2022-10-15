<template>
	<div class="background">
		<!--    标题-->
		<div class="Heading">学术活动</div>

		<!--一排一排陈列图片-->
		<div class="ListImages ImageItemContainer">
			<div
				v-for="item in academic_activity_images_src"
				:key="item.AcademicActivityID"
			>
				<!--把每一块img、时间、简介都包装成一个container-->
				<div
					@click.once="ImageItemButton(item.AcademicActivityID)"
					:class="item.AcademicActivityID === '-1' ? `ImageItem ` : `ImageItem Card HoverShadow`"
                    :style="item.AcademicActivityID === '-1' ? `` : `cursor: pointer`"
				>
					<!--图片-->
					<div
						v-show="item.AcademicActivityID !== '-1'"
						class="ImageContainer"
					>
						<div
							:style="`background-image:url(${item.src})`"
							class="BackgroundImage"
						></div>
					</div>

					<!--日期和描述-->
					<div
						v-show="item.AcademicActivityID !== '-1'"
						class="ImageDateDescription"
					>
						<div class="ImageDate">{{ item.date }}</div>
						<div class="ImageTitle">{{ item.description }}</div>
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
	name: "AcademicActivityList",
	data() {
		return {
			academic_activity_images_src: [],
		};
	},

	created() {
		//http请求
		let url = "/activity/list";

		console.log(url);

		this.academic_activity_images_src = [];

		let _this = this; // 别改
		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("data list", data.list.length);
			let Length = data.list.length;
			while (Length % 4 != 0) {
				data.list.push({
					main_id: -1,
					cover_pic: "",
					date: "",
					title: "",
				});
				Length++;
			}
			for (let item of data.list) {
				let new_map = {
					AcademicActivityID: item["main_id"].toString(),
					src: item["cover_pic"],
					date: item["date"],
					description: item["title"],
				};
				_this.academic_activity_images_src.push(new_map);
			}
		});

		console.log("academic_list", this.academic_activity_images_src);
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 4);
		this.$store.dispatch("GetLineIndex", 1);
	},
	// 这里定义方法
	methods: {
		ImageItemButton(AcademicActivityID) {
            if(AcademicActivityID === '-1') return;
			this.$router.push({
				path: "/AcademicActivityDetails",
				query: {
					AcademicActivityID,
				},
			});

			document.querySelector("div").style["user-select"] = "none";
			setTimeout(() => {
				document.querySelector("div").style["user-select"] = "auto";
			}, 500);
		},
	},
};
</script>

<style scoped>
/*存放整个页面的数据*/
.ImageItemContainer {
	position: relative;
	width: 80vw;
	min-height: 100vh;
	left: 0;
	right: 0;
	margin: auto;
	top: 200px;
}

/*把每一块img、时间、简介都包装成一个container*/
.ImageItem {
	position: relative;
	width: 18vw;
	height: 36vw;

	margin-bottom: 5vh;
	z-index: 10;
}

/* 图片的 container */
.ImageContainer {
	position: relative;
	width: 18vw;
	height: 27vw;
	border-radius: 7px 7px 0 0;
	overflow: hidden;
}

/*图片*/
.BackgroundImage {
	padding-bottom: 150%;
}

.ImageDateDescription {
	position: relative;
	width: 18vw;
	height: 9vw;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
/*图片日期*/
.ImageDate {
	position: relative;
	font-size: 16px;
	line-height: 150%;
	margin-left: 1vw;
	margin-right: 1vw;
	color: #919191;
}

/*图片简介*/
.ImageTitle {
	position: relative;
	font-size: 20px;
    font-weight: 400;
	line-height: 150%;
	margin-left: 1vw;
	margin-right: 1vw;
    color: black;

	/*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>