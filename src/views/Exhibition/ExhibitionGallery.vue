<template>
	<div class="background" style="height: 1577px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>

		<!--    左上角的网页路径-->
		<div class="web_path">
			线上展览&gt;{{ web_path_gallery_list_title }}&gt;{{
				web_path_gallery_title
			}}&gt;
		</div>

		<!--    大图片-->
		<div class="MainImageContainer">
			<canvas
				ref="MainImageCanvas"
				:width="CanvasWidth"
				:height="CanvasHeight"
			></canvas>
		</div>
		<!-- <img class="MainImage" :src="MainImage_src" alt="" /> -->

		<!--    大图片的描述-->
		<div class="MainImage_text">
			{{ MainImage_text }}
		</div>
		<!--    底下的图片列表-->
		<div class="list_images" id="imgList">
			<div v-for="item in imgList_src" :key="item.gallery_img_id">
				<div
					@mousedown="imgList_btn($event, item)"
					class="imgList_container"
				>
					<div
						class="ImgList_img"
						:style="`background-image:url(${item.src})`"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	name: "ExhibitionGallery",
	data() {
		return {
			// gallery_list 在数据库中的主键，gallery在数据库中主键
			list_id: "",
			id: "",
			// 左上角的路径、大图的url，大图底下的文字描述
			web_path_gallery_list_title: "",
			web_path_gallery_title: "",
			MainImage_src: "./风景壁纸04.jpg",
			MainImage_text: "",

			imgList_src: [],

			CanvasWidth: 810, // 画布大小
			CanvasHeight: 410,
			extraImgList: [
				{
					url: require("./风景壁纸04.jpg"),
					x: 0,
					y: 0,
					width: 810,
					height: 410,
				},
			],
			MCanvas: null,
			ctx: null,
			ImgObject: [],
			ImgX: 0, // 图片在画布中渲染的起点x坐标
			ImgY: 0,
			ImgScale: 1, // 图片的缩放大小
		};
	},
	mounted() {
		this.GetData();
		this.SetCanvas();
	},
	methods: {
		// 路由回退
		router_go_back() {
			console.log("click!");
			this.$router.go(-1);
		},
		// 点击下方列表的图片，修改大图的url
		imgList_btn(event, item) {
			this.MainImage_src = item.src;
			this.MainImage_text = item["intro"];
		},

		// HTTP获取网页基本数据
		GetData() {
			//从本页面的url中获取 list_id 和 id 的值
			this.list_id = this.$route.query.gallery_list_id;
			this.id = this.$route.query.gallery_id;
			this.web_path_gallery_list_title =
				this.$route.query.gallery_list_title;

			//http请求

			let url =
				"/exhibition/album-detail?exhibition_id=" +
				this.list_id +
				"&album_id=" +
				this.id;

			console.log(url);

			this.imgList_src = [];

			let inner_this = this; // 别改

			getForm(url, function (res, msg) {
				let data = res.data;
				console.log("http-get data is here", data);
				// 修改 标题、图片url，图片简介
				inner_this.web_path_gallery_title = data["title"];
				inner_this.MainImage_src = null;
				inner_this.MainImage_text = data["intro"];

				for (let item in data["picture_dict"]) {
					if (inner_this.MainImage_src === null) {
						inner_this.MainImage_src =
							data["picture_dict"][item]["pic_url"];
					}
					let new_map = {
						src: data["picture_dict"][item]["pic_url"],
						gallery_img_id: item,
						intro: data["picture_dict"][item]["intro"],
						title: data["picture_dict"][item]["title"],
					};
					console.log("exhibition gallery new_map", new_map);
					inner_this.imgList_src.push(new_map);
				}
			});
		},

		// 初始化 Canvas 设置相关参数
		SetCanvas() {
			this.MyCanvas = this.$refs.MainImageCanvas;
			console.log("this.MyCanvas", this.MyCanvas);
			this.ctx = this.MyCanvas.getContext("2d");
			this.loadImg();
			this.canvasEventsInit();
		},

		loadImg() {
			var _this = this;
			let extraImgList = _this.extraImgList;
			let length = extraImgList.length;
			var imageList = [];
			let count = 0;
			//加载背景图片
			var isBgLoaded = false;
			var img = new Image();
			var bgImg = extraImgList[0];
			img.src = bgImg.url;
			img.onload = () => {
				imageList.push({
					img: img,
					x: bgImg.x,
					y: bgImg.y,
					width: bgImg.width,
					height: bgImg.height,
				});
				++count;
				if (length > 1) {
					//加载剩余图片
					for (let key = 1; key < length; key++) {
						let item = extraImgList[key];
						let extraImg = new Image();
						extraImg.src = item.url;
						extraImg.onload = () => {
							imageList.push({
								img: extraImg,
								x: item.x,
								y: item.y,
								width: item.width,
								height: item.height,
							});
							if (++count >= length) {
								_this.ImgObject = imageList;
								_this.drawImage(imageList);
							}
						};
					}
				} else {
					_this.ImgObject = imageList;
					_this.drawImage(imageList);
				}
			};
		},
		drawImage(imgList) {
			var _this = this;
			_this.ctx.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
			for (let i = 0; i < imgList.length; i++) {
				_this.ctx.drawImage(
					imgList[i].img, //规定要使用的图片
					_this.ImgX + imgList[i].x * _this.ImgScale,
					_this.ImgY + imgList[i].y * _this.ImgScale, //在画布上放置图像的 x 、y坐标位置。
					imgList[i].width * _this.ImgScale,
					imgList[i].height * _this.ImgScale //要使用的图像的宽度、高度
				);
			}
		},
		/**
		 * 为画布上鼠标的拖动和缩放注册事件
		 */
		canvasEventsInit() {
			var _this = this;
			var canvas = _this.MyCanvas;

			canvas.onmousedown = function (event) {
				var ImgX = _this.ImgX;
				var ImgY = _this.ImgY;
				var pos = { x: event.clientX, y: event.clientY }; //坐标转换，将窗口坐标转换成canvas的坐标
				canvas.onmousemove = function (evt) {
					//移动
					canvas.style.cursor = "move";

					var x = (evt.clientX - pos.x) * 2 + ImgX;
					var y = (evt.clientY - pos.y) * 2 + ImgY;
					_this.ImgX = x;
					_this.ImgY = y;
					_this.drawImage(_this.ImgObject); //重新绘制图片
				};
				canvas.onmouseup = function () {
					canvas.onmousemove = null;
					canvas.onmouseup = null;
					canvas.style.cursor = "default";
				};
			};

			canvas.onmousewheel = canvas.onwheel = function (event) {
				//滚轮放大缩小
				var wheelDelta = event.wheelDelta
					? event.wheelDelta
					: event.deltaY * -40; //获取当前鼠标的滚动情况
				if (wheelDelta > 0) {
					_this.ImgScale += 0.02;
				} else {
					if (_this.ImgScale > 0.3) {
						_this.ImgScale -= 0.02;
					}
				}
				_this.drawImage(_this.ImgObject); //重新绘制图片
				event.preventDefault && event.preventDefault();
				return false;
			};
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

/*左上角的网页路径*/
.web_path {
	position: absolute;
	width: 266px;
	height: 13px;
	left: 99px;
	top: 192px;
	font-size: 14px;
	line-height: 96%;
	color: #2f2f2f;
}

/*大图片*/
.MainImageContainer {
	position: absolute;
	width: 810px;
	height: 410px;
	left: 98px;
	top: 240px;
	background: gainsboro;
	border-radius: 7px;
}

/*大图片的描述*/
.MainImage_text {
	position: absolute;
	width: 813px;
	left: 99px;
	height: 30px;
	top: 665px;
	font-size: 11px;
	line-height: 120%;
	color: #2f2f2f;
}
/*底下的图片列表*/
#imgList {
	width: 814px;
	left: 84px;
	top: 730px;
	/*background: red;*/
}
.imgList_container {
	position: relative;
	width: 83px;
	height: 65px;
	margin: 13px;
}
.ImgList_img {
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px;
	filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
	cursor: pointer;
	z-index: 10;
}
</style>