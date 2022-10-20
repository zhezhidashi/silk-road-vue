<template>
	<div>
		<!--网页路径-->
		<div class="WebPath">
			<div @click="GoExhibitionList" style="cursor: pointer">
				线上展览
			</div>
			&ensp;&gt;&ensp;
		</div>

		<!-- 图片题目 -->
		<div class="Heading" style="top: 70px">
			{{ ExhibitionTitle }}
		</div>

		<!-- 展览详情的描述 -->
		<div class="ExhibitionIntro">
			<div v-for="(item, index) in ExhibitionIntro" :key="index">
				<div class="ExhibitionIntroParagraph" style="margin: 10px 0 10px 0">{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["ExhibitionID", "ExhibitionTitle", "ExhibitionIntro"],
	methods: {
		// 跳转到展览列表
		GoExhibitionList() {
			this.$router.push({
				path: "/ExhibitionList",
			});
		},
	},
};
</script>

<style scoped>
.ExhibitionIntro {
	position: relative;
	width: 80vw;
	top: 120px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	left: 0;
	right: 0;
	margin: auto;

	display: flex;
	flex-direction: column;
}
.ExhibitionIntroParagraph {
    position: relative;
    margin: 0 0 8px 0;
    white-space: pre-wrap;
}
</style>