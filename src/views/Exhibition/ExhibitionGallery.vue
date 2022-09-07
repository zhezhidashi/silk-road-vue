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
				z-index="15"
				position="absolute"
				style="vertical-align: middle"
			></canvas>
			<div
				style="
					position: absolute;
					box-sizing: border-box;
					border: 2px solid #000;
					top: 2px;
					right: 2px;
					z-index: 20;
				"
				:width="`${MiniImgWidth}px`"
				:height="`${MiniImgHeight}px`"
			>
				<img
					position="absolute"
					:src="MainImage_src"
					:width="`${MiniImgWidth}px`"
					:height="`${MiniImgHeight}px`"
					style="vertical-align: middle"
				/>
				<div
					class="RedBorder"
					:style="`position: absolute;
                        box-sizing: border-box;
						border: 2px solid red;
						z-index: 25;
                        left: ${
							(-ImgX / CanvasWidth / ImgScale) * MiniImgWidth
						}px;
                        top: ${
							(-ImgY / CanvasHeight / ImgScale) * MiniImgHeight
						}px;
                        width: ${MiniImgWidth / ImgScale}px;
                        height: ${MiniImgHeight / ImgScale}px;`"
				></div>
			</div>
		</div>

		<!--    大图片的描述-->
		<div class="MainImage_text">
			<div class="MainImage_text_item">中文标题：&ensp;{{ MainImage_prop.title_zh }}</div>
			<div class="MainImage_text_item">外文标题：&ensp;{{ MainImage_prop.title_en }}</div>
			<div class="MainImage_text_item">中文简介：&ensp;{{ MainImage_prop.intro_zh }}</div>
			<div class="MainImage_text_item">外文简介：&ensp;{{ MainImage_prop.intro_en }}</div>
			<div class="MainImage_text_item">档案日期：&ensp;{{ MainImage_prop.date }}</div>
			<div class="MainImage_text_item">档案尺寸：&ensp;{{ MainImage_prop.size }}</div>
			<div class="MainImage_text_item">
				档案组织：&ensp;{{ MainImage_prop.organization }}
			</div>
			<div class="MainImage_text_item">
				档案编号：&ensp;{{ MainImage_prop.archive_id }}
			</div>
		</div>
		<!--    底下的图片列表-->
		<div class="list_images" id="imgList">
			<div v-for="item in ImgList" :key="item.gallery_img_id">
				<div @mousedown="ImgList_btn(item)" class="imgList_container">
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
			MainImage_text: "111",
			MainImage_prop: {
				src: "",
				gallery_img_id: "",
				title_zh: "",
				title_en: "",
				intro_zh: "",
				intro_en: "",
				date: "",
				size: "",
				organization: "",
				archive_id: "",
			},

			ImgList: [],

			CanvasWidth: 1, // 画布大小
			CanvasHeight: 1,
			MiniImgWidth: 1, //右上角缩略图大小
			MiniImgHeight: 1,
			MyCanvas: null,
			ctx: null,
			ImgObject: {
				img: null,
				url: null,
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			},
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
		ImgList_btn(item) {
			this.MainImage_src = item.src;
			this.MainImage_prop = item;
            this.web_path_gallery_title = item.title_zh;
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

			this.ImgList = [];

			let _this = this; // 别改

			getForm(url, function (res, msg) {
				let data = res.data["picture_dict"];
				console.log("picture_dict is here", data);
				// 修改 标题、图片url，图片简介
				_this.web_path_gallery_title = data["title"];
				_this.MainImage_src = null;
				_this.MainImage_text = data["intro"];

				for (let item in data) {
					let new_map = {
						src: data[item]["pic_url"],
						gallery_img_id: item,
						title_zh: "N/A",
						title_en: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
						date: data[item].date,
						size: data[item].size,
						organization: data[item].organization,
						archive_id: data[item].archive_id,
					};
					for (let item_id in data[item].title) {
						if (item_id === "ZH") {
							new_map.title_zh = data[item].title[item_id];
						} else {
							new_map.title_en = data[item].title[item_id];
						}
					}
					for (let item_id in data[item].intro) {
						if (item_id === "ZH") {
							new_map.intro_zh = data[item].intro[item_id];
						} else {
							new_map.intro_en = data[item].intro[item_id];
						}
					}
					_this.ImgList.push(new_map);
					if (_this.ImgList.length === 1)
						_this.ImgList_btn(_this.ImgList[0]);
				}

				console.log("ImgList", _this.ImgList);
				_this.SetCanvas();
			});
		},

		// 初始化 Canvas 设置相关参数
		SetCanvas() {
			this.CanvasWidth = 1000;
			this.CanvasHeight = 500;
			this.MyCanvas = this.$refs.MainImageCanvas;
			this.ctx = this.MyCanvas.getContext("2d");
			// console.log(this.ctx)
			this.loadImg();
			this.canvasEventsInit();
		},

		loadImg() {
			// 初始化图像相关参数
			this.ImgX = this.ImgY = 0;
			this.ImgScale = 1;

			this.ImgObject.url = this.MainImage_src;
			//加载背景图片
			this.ImgObject.img = new Image();
			this.ImgObject.img.src = this.ImgObject.url;

			// 图片比较窄
			if (this.ImgObject.img.height * 2 >= this.ImgObject.img.width) {
				this.ImgObject.width =
					(this.CanvasHeight * this.ImgObject.img.width) /
					this.ImgObject.img.height;
				this.ImgObject.height = this.CanvasHeight;
				this.CanvasWidth = this.ImgObject.width;
			}

			// 图片比较宽
			if (this.ImgObject.img.height * 2 < this.ImgObject.img.width) {
				this.ImgObject.width = this.CanvasWidth;
				this.ImgObject.height =
					(this.CanvasWidth * this.ImgObject.img.height) /
					this.ImgObject.img.width;
				this.CanvasHeight = this.ImgObject.height;
			}

			// 设置缩略图大小
			this.MiniImgWidth = this.CanvasWidth * 0.2;
			this.MiniImgHeight = this.CanvasHeight * 0.2;

			let _this = this;
			this.ImgObject.img.onload = () => {
				_this.drawImage(_this.ImgObject);
			};
		},

		drawImage(Img) {
			let _this = this;

			// 保证  imgX  在  [img.width*(1-imgScale),0]   区间内
			if (_this.ImgX < _this.CanvasWidth * (1 - _this.ImgScale)) {
				_this.ImgX = _this.CanvasWidth * (1 - _this.ImgScale);
			} else if (_this.ImgX > 0) {
				_this.ImgX = 0;
			}
			// 保证  imgY   在  [img.height*(1-imgScale),0]   区间内
			if (_this.ImgY < _this.CanvasHeight * (1 - _this.ImgScale)) {
				_this.ImgY = _this.CanvasHeight * (1 - _this.ImgScale);
			} else if (_this.ImgY > 0) {
				_this.ImgY = 0;
			}

			// console.log("ImgX", _this.ImgX, _this.CanvasWidth, document.querySelector('.RedBorder'))

			_this.ctx.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
			_this.ctx.drawImage(
				Img.img, //规定要使用的图片
				_this.ImgX + Img.x * _this.ImgScale,
				_this.ImgY + Img.y * _this.ImgScale, //在画布上放置图像的 x 、y坐标位置。
				Img.width * _this.ImgScale,
				Img.height * _this.ImgScale //要使用的图像的宽度、高度
			);
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
				if (wheelDelta > 0 && _this.ImgScale < 3) {
					_this.ImgScale += 0.02;
				} else if (wheelDelta < 0 && _this.ImgScale > 1) {
					_this.ImgScale -= 0.02;
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
	/* border-radius: 7px; */
	box-sizing: border-box;
	border: 3px solid #000;
}

/*大图片的描述*/
.MainImage_text {
	position: absolute;
	width: 1000px;
	left: 0;
	height: 180px;
	top: 765px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.MainImage_text_item {
	position: relative;
	color: #2f2f2f;
	font-size: 16px;
	width: 1000px;
}

/*底下的图片列表*/
#imgList {
	width: 1000px;
	left: 0px;
	top: 980px;
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