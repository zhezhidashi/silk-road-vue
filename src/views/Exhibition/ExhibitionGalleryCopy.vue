<template>
	<el-scrollbar ref="scrollMenuRef" class="scrollMenuBox">
		<p v-for="i in titleTotal" :key="i">标题{{ i }}</p>
	</el-scrollbar>
</template>
<script>
export default {
	data() {
		return {
			// 总行数
			titleTotal: 50,
		};
	},
	mounted() {
		// 监听浏览器/页面滚动条的滚动
		window.addEventListener("scroll", this.scrollContent);
		// 监听el-scrollbar内滚动条的滚动
		this.$refs.scrollMenuRef.wrap.addEventListener(
			"scroll",
			this.scrollMenu
		);
	},
	methods: {
		// el-scrollbar内滚动条滚动时，打印滚动条向下滚动的距离
		scrollMenu() {
			console.log(this.$refs.scrollMenuRef.wrap.scrollTop);
		},
		// 页面滚动时触发
		scrollContent() {
			// scrollTop为显示屏顶部与整个文档顶部间的距离
			let scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop;
			// 页面滚动条滚动时，el-scrollbar内滚动条按比例跟随一起滚动
			this.$refs.scrollMenuRef.wrap.scrollTop =
				(scrollTop / document.body.scrollHeight) *
				this.$refs.scrollMenuRef.wrap.scrollHeight;
		},
		// el-scrollbar内滚动条滚动到指定的标题号
		scrollTo(titleNo) {
			this.$refs.scrollMenuRef.wrap.scrollTop =
				((titleNo - 1) / this.titleTotal) *
				this.$refs.scrollMenuRef.wrap.scrollHeight;
		},
		// 获取el-scrollbar内滚动条向下滚动的距离
		getScrollTop() {
			alert(this.$refs.scrollMenuRef.wrap.scrollTop);
		},
	},
};
</script>
<style scoped>


/*el-scrollbar 必须指定高度*/
.scrollMenuBox {
    position: relative;
    top: 200px;
	height: 500px;
	width: 100px;
	border: 1px solid red;
}

</style>