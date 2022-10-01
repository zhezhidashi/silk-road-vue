<template>
	<div class="background">
		<!--    标题-->
		<div class="Heading">学术活动</div>

		<!--一排一排陈列图片-->
		<div class="list_images" id="academic_activity_images">
			<div
				v-for="item in academic_activity_images_src"
				:key="item.academic_activity_id"
			>
				<!--把每一块img、时间、简介都包装成一个container-->
				<div
					@click.once="
						academic_activity_images_btn(
							$event,
							item.academic_activity_id
						)
					"
					@mouseover="
						academic_activity_mouseover(
							$event,
							item.academic_activity_id
						)
					"
					@mouseleave="
						academic_activity_mouseleave(
							$event,
							item.academic_activity_id
						)
					"
					class="academic_activity_images_container"
					:id="
						'academic_activity_images_container_' +
						item.academic_activity_id
					"
				>
					<!--图片-->
					<div class="academic_activity_images_img_container">
						<div
							:style="`background-image:url(${item.src})`"
							class="academic_activity_images_img"
							:id="
								'academic_activity_images_img_' +
								item.academic_activity_id
							"
						></div>
					</div>

					<!--日期-->
					<div
						class="academic_activity_images_date"
						:id="
							'academic_activity_images_date_' +
							item.academic_activity_id
						"
					>
						{{ item.date }}
					</div>

					<!--图片描述-->
					<div
						class="academic_activity_images_text"
						:id="
							'academic_activity_images_text_' +
							item.academic_activity_id
						"
					>
						{{ item.description }}
					</div>
				</div>
			</div>
		</div>
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 500px"></div>
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

		let inner_this = this; // 别改

		getForm(url, function (res, msg) {
			let data = res.data;
			console.log("http-get data is here");
			console.log("data list", data.list);
			for (let item of data.list) {
				console.log("academic item", item);
				let new_map = {
					academic_activity_id: item["main_id"].toString(),
					src: item["cover_pic"],
					date: item["date"],
					description: item["title"],
				};
				console.log("academic new_map", new_map);
				inner_this.academic_activity_images_src.push(new_map);
			}
		});

		console.log("academic_list", this.academic_activity_images_src);
	},
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 4);
    },
	// 这里定义方法
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
				path: "/Home",
			});
		},
		academic_activity_images_btn(event, academic_activity_id) {
			this.$router.push({
				path: "/AcademicActivityDetails",
				query: {
					academic_activity_id,
				},
			});

			document.querySelector("div").style["user-select"] = "none";
			setTimeout(() => {
				document.querySelector("div").style["user-select"] = "auto";
			}, 500);
		},
		//鼠标悬停效果。背景色改为蓝色，文字改为白色
		academic_activity_mouseover(event, academic_activity_id) {
			//修改整个边框和鼠标指针样式
			let now_container = document.querySelector(
				"#academic_activity_images_container_" + academic_activity_id
			);
			now_container.style.cursor = "pointer";
			now_container.style.background = "#023871";

			//修改图片大小
			// let now_img = document.querySelector(
			// 	"#academic_activity_images_img_" + academic_activity_id
			// );
			// now_img.style.transform = "scale(1.2, 1.2)";

			//修改图片文字颜色
			let now_text = document.querySelector(
				"#academic_activity_images_text_" + academic_activity_id
			);
			now_text.style.color = "#FFFFFF";
		},

		academic_activity_mouseleave(event, academic_activity_id) {
			//还原整个边框和鼠标指针样式
			let now_container = document.querySelector(
				"#academic_activity_images_container_" + academic_activity_id
			);
			now_container.style.cursor = "default";
			now_container.style.background = "#FFFFFF";

			//还原图片大小
			// let now_img = document.querySelector(
			// 	"#academic_activity_images_img_" + academic_activity_id
			// );
			// now_img.style.transform = "scale(1, 1)";

			//还原图片文字颜色
			let now_text = document.querySelector(
				"#academic_activity_images_text_" + academic_activity_id
			);
			now_text.style.color = "#000000";
		},
	},
};
</script>

<style scoped>
/*存放整个页面的数据*/
#academic_activity_images {
	position: relative;
	width: 1330px;
	min-height: 100vh;
	left: 95px;
	top: 200px;
}

/*把每一块img、时间、简介都包装成一个container*/
.academic_activity_images_container {
	position: relative;
	width: 268px;
	height: 490px;

	background: #ffffff;
	margin: 20px;
	box-shadow: 0 3px 3px rgba(159, 158, 158, 0.42);
	border-radius: 7px;
	overflow: hidden;
	z-index: 10;
}

/* 图片的 container */
.academic_activity_images_img_container {
	position: relative;
	width: 268px;
	height: 360px;
	border-radius: 7px 7px 0 0;
	overflow: hidden;
}

/*图片*/
.academic_activity_images_img {
	width: 100%;
	height: 0;
	padding-bottom: 150%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
	border-radius: 7px 7px 0 0;
}

/*图片日期*/
.academic_activity_images_date {
	position: relative;
	font-size: 20px;
	line-height: 150%;
	margin: 10px 15px 0 15px;
	color: #919191;
}

/*图片简介*/
.academic_activity_images_text {
	position: relative;
	font-size: 20px;
	margin: 10px 15px 10px 15px;
	line-height: 150%;
	color: #000000;

	/*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>