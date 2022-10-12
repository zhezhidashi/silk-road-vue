<template>
	<div>
		<div class="ListImages ImageItemContainer">
			<div v-for="(item, index) in Images" :key="index">
				<div
					class="ImageItem Card"
					v-if="index < 7"
					@click="GoImage(item)"
				>
					<!-- 鼠标悬停查看详情 -->
					<div class="ImageItemHover">
						<div class="ImageSeeImageHover">查看大图</div>
					</div>

					<!-- 图片 -->
					<div
						class="BackgroundImage Card Image"
						:style="`background-image:url(${item.PictureUrl})`"
					></div>
				</div>
				<div
					class="ImageItem Card"
					v-if="index === 7"
					@click="GoImage(item)"
				>
					<!-- 鼠标悬停查看详情 -->
					<div class="ImageItemLast">
						<div
							class="ImageSeeImageHover"
							style="background: white; color: #588cc8"
						>
							查看全部
						</div>
					</div>

					<!-- 图片 -->
					<div
						class="BackgroundImage Card Image"
						:style="`background-image:url(${item.PictureUrl}); opacity: 0.5;`"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["ExhibitionID", "Images"],
	data() {
		return {};
	},
	methods: {
		GoImage(item) {
			if (item.PictureID != "7") {
				this.$router.push({
					path: "/Pictures",
					query: {
						ExhibitionID: this.ExhibitionID,
						PictureID: item.PictureID,
					},
				});
			} else {
				this.$router.push({
					path: "/Pictures",
					query: {
						ExhibitionID: this.ExhibitionID,
						PictureID: 0,
					},
				});
			}
		},
	},
};
</script>

<style scoped>
.ImageItemContainer {
	position: relative;
	width: 82vw;
	height: auto;
	top: 300px;
	min-height: 20vw;
    height: auto;
	/* background: skyblue; */
	left: 0;
	right: 0;
	margin: 0 auto;
	justify-content: flex-start;
}

/* 鼠标悬浮出现“查看详情” */
.ImageItemHover {
	position: absolute;
	width: 18vw;
	height: 18vw;
	overflow: hidden;
	background: rgba(95, 95, 95, 0.37);
	z-index: 15;
	display: flex;
	justify-content: center;
	align-items: center;

	opacity: 0;
	transition-property: opacity;
	transition-duration: 0.5s;
}
/* 冒号两边不能有空格！！！ */
.ImageItem:hover .ImageItemHover {
	opacity: 1;
}
.ImageSeeImageHover {
	position: absolute;
	width: 9vw;
	min-width: 80px;
	min-height: 20px;
	height: 3vw;

	background: #588cc8;
	border-radius: 7px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 18px;
	font-weight: bold;
	color: #ffffff;
	cursor: pointer;
	z-index: 20;
}

/* 图片 */
.ImageItem {
	position: relative;
	width: 18vw;
	height: 18vw;
	margin: 1vw;
	cursor: pointer;
	/* background: red; */
}
/* 第八章图片 */
.ImageItemLast {
	position: absolute;
	width: 18vw;
	height: 18vw;
	overflow: hidden;
	z-index: 15;
	display: flex;
	justify-content: center;
	align-items: center;
}
.Image {
	padding-bottom: 100%;
}
</style>