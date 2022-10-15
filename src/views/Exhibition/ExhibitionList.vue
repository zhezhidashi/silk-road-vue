<template>
	<div class="background">
		<div class="Heading">线上展览</div>
		<div class="ExhibitionContainer">
			<div v-for="(item, index) in ExhibitionList" :key="index">
				<div
					class="ExhibitionItem Card HoverShadow"
					@click="GoExhibition(item.ExhibitionID)"
				>
					<div class="ExhibitionItemImageContainer">
						<div
							class="ExhibitionItemImage BackgroundImage"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div class="ExhibitionItemText">
						<div class="ExhibitionItemTitle">{{ item.Title }}</div>
						<div class="ExhibitionItemIntro">
							{{ item.Intro[0] }}
						</div>
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
import { getForm } from "../../api/data";
export default {
	data() {
		return {
			ExhibitionList: [],
		};
	},
	methods: {
		// 点击跳转到展览详情页
		GoExhibition(ExhibitionID) {
			this.$router.push({
				path: "/Exhibition",
				query: {
					ExhibitionID,
				},
			});
		},

		// 获取数据
		GetData() {
			let _this = this;
			_this.ExhibitionList = [];
			let url = "/exhibition/list?&page_size=100";
			console.log("请求的url", url);
			getForm(url, (res) => {
				let data = res.data;

				for (let item of data.list) {
					_this.ExhibitionList.push({
						ExhibitionID: item.main_id,
						Title: item.title,
						Image: item.intro.PictureUrl,
						Intro: item.intro.Introduction.toString().split("$$$"),
					});
				}
			});
		},
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
		this.GetData();
	},
};
</script>

<style scoped>
.ExhibitionContainer {
	position: relative;
	width: 80vw;
	height: auto;
	min-height: 100vh;
	/* background: skyblue; */
	top: 200px;
	left: 0;
	right: 0;
	margin: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.ExhibitionItem {
	position: relative;
	width: 80vw;
	height: 10vw;
	min-height: 100px;
	margin: 20px;
	/* background: red; */
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
}
.ExhibitionItemImageContainer {
	position: relative;
	width: 8vw;
	height: 8vw;
}
.ExhibitionItemImage {
	padding-bottom: 100%;
}
.ExhibitionItemText {
	position: relative;
	width: 66vw;
	height: 8vw;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
.ExhibitionItemTitle {
	font-size: 20px;
	line-height: 200%;
	font-weight: bold;
	/*最多显示一行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.ExhibitionItemIntro {
	font-size: 16px;
	line-height: 200%;

	/*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>