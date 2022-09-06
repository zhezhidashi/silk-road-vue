<template>
	<div class="background" style="height: 1577px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			style="left: 0"
			alt=""
		/>

		<!--    左上角的网页路径-->
		<div class="web_path">
			线上展览&gt;{{ web_path_gallery_list_title }}&gt;{{
				web_path_gallery_title
			}}&gt;
		</div>

		<!--    大图片-->
		<div
			class="MainImageContainer"
			:style="`width: ${CanvasWidth}; height: ${CanvasHeight}; `"
		>
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
			MainImage_src: null,
			MainImage_text: "",

			imgList_src: [],

			CanvasWidth: 0, // 画布大小
			CanvasHeight: 0,
			extraImgList: [
				{
					url: null,
					x: 0,
					y: 0,
					width: 0,
					height: 0,
				},
			],
			MyCanvas: null,
			ctx: null,
			ImgObject: [],
			ImgX: 0, // 图片在画布中渲染的起点x坐标
			ImgY: 0,
			ImgScale: 1, // 图片的缩放大小
		};
	},
	mounted() {
        this.GetData();
		
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.go(-1);
		},
		// 点击下方列表的图片，修改大图的url
		imgList_btn(event, item) {
			this.MainImage_src = item.src;
			this.MainImage_text = item["intro"];
			this.SetCanvas();
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

			let _this = this; // 别改

			getForm(url, function (res, msg) {
				let data = res.data;
				console.log("http-get data is here", data);
				// 修改 标题、图片url，图片简介
				_this.web_path_gallery_title = data["title"];
				_this.MainImage_src = null;
				_this.MainImage_text = data["intro"];

				for (let item in data["picture_dict"]) {
					if (_this.MainImage_src === null) {
						_this.MainImage_src =
							data["picture_dict"][item]["pic_url"];
					}
					let new_map = {
						src: data["picture_dict"][item]["pic_url"],
						gallery_img_id: item,
						intro: data["picture_dict"][item]["intro"],
						title: data["picture_dict"][item]["title"],
					};
					_this.imgList_src.push(new_map);
				}

                _this.SetCanvas();
			});
		},

		// 初始化 Canvas 设置相关参数
		SetCanvas() {
			this.CanvasWidth = 1000;
			this.CanvasHeight = 500;
			this.MyCanvas = this.$refs.MainImageCanvas;
			this.ctx = this.MyCanvas.getContext("2d");
			this.loadImg();
			this.canvasEventsInit();
		},

		loadImg() {
			this.extraImgList[0].url = this.MainImage_src;
			var _this = this;
			let extraImgList = _this.extraImgList;
			let length = extraImgList.length;
			var imageList = [];
			let count = 0;
			//加载背景图片
			var img = new Image();
			img.src = extraImgList[0].url;
			console.log("url", this.MainImage_src, this.extraImgList[0]);
			console.log("img", img.url, img.width, img.height);

			// 图片比较窄
			if (img.height * 2 >= img.width) {
				extraImgList[0].width =
					(_this.CanvasHeight * img.width) / img.height;
				extraImgList[0].height = _this.CanvasHeight;
				_this.CanvasWidth = extraImgList[0].width;
			}

			// 图片比较宽
			if (img.height * 2 < img.width) {
				extraImgList[0].width = _this.CanvasWidth;
				extraImgList[0].height =
					(_this.CanvasWidth * img.height) / img.width;
				_this.CanvasHeight = extraImgList[0].height;
			}
			var bgImg = extraImgList[0];

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
		/*
		为画布上鼠标的拖动和缩放注册事件
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

					var x = evt.clientX - pos.x + ImgX;
					var y = evt.clientY - pos.y + ImgY;

					// if (
					// 	x <= 0 &&
					// 	x + _this.extraImgList[0].width * _this.ImgScale >=
					// 		_this.CanvasWidth
					// )
						_this.ImgX = x;
					// if (
					// 	y <= 0 &&
					// 	y + _this.extraImgList[0].height * _this.ImgScale >=
					// 		_this.CanvasHeight
					// )
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
				if (wheelDelta > 0 && _this.ImgScale < 3) {
					_this.ImgScale += 0.01;
				} else if (wheelDelta < 0 && _this.ImgScale > 0.3) {
					_this.ImgScale -= 0.01;
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
	width: 1000px;
	height: 13px;
	left: 0px;
	top: 192px;
	font-size: 14px;
	line-height: 96%;
	color: #2f2f2f;
}

/*大图片*/
.MainImageContainer {
	position: absolute;
	left: 0;
	top: 240px;
	background: gainsboro;
	border-radius: 7px;
	/* border: 3px solid #000 */
}

/*大图片的描述*/
.MainImage_text {
	position: absolute;
	width: 1000px;
	left: 0;
	height: 30px;
	top: 765px;
	font-size: 11px;
	line-height: 120%;
	color: #2f2f2f;
}
/*底下的图片列表*/
#imgList {
	width: 1000px;
	left: 0px;
	top: 830px;
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