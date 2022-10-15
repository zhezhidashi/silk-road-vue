<template>
	<div class="background">
		<title-intro
			:ExhibitionTitle="ExhibitionTitle"
			:ExhibitionIntro="ExhibitionIntro"
			:ExhibitionID="ExhibitionID"
		/>
		<pic-list :Images="Images" :ExhibitionID="ExhibitionID" />
		<info />
		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div class="BottomBlank"></div>
		<img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { getForm } from "../../../api/data.js";
import TitleIntro from "./TitleIntro.vue";
import PicList from "./PicList.vue";
import Info from "./Info.vue";
export default {
	name: "Exhibition",
	components: {
		TitleIntro,
		PicList,
		Info,
	},
	data() {
		// 记住，Exhibition 这个界面只保存八张图片
		return {
			ExhibitionTitle: "",
			ExhibitionIntro: [],
			ExhibitionID: "0",
			Images: [],
		};
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.GetData();
	},
	methods: {
		// 获取数据
		GetData() {
			let _this = this;

			let url = `/exhibition/detail?exhibition_id=${this.ExhibitionID}`;
            console.log("请求的url", url);
			getForm(url, (res) => {
				let data = res.data;
				_this.ExhibitionTitle = data.title;
				_this.ExhibitionIntro = data.intro.Introduction.split("$$$");
				for (let i = 0; i < data.pic_list.length; i++) {
					let item = data.pic_list[i];
					let obj = {
						PictureUrl: item.pic_url,
						Title: {
							ZH: item.title.ZH,
							EN: item.title.EN,
							ES: item.title.ES,
						},
						Intro: {
							ZH: item.intro.ZH,
							EN: item.intro.EN,
							ES: item.intro.ES,
						},
						PictureID: i,
					};
					_this.Images.push(obj);
				}
			});
		},
	},
};
</script>

<style scoped>
</style>