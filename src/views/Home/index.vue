<template>
	<div
		class="background"
		style="width: 100%; height: auto;"
	>
		<!-- 轮播图 -->
		<IndexImage />
		<IndexBoard />
	</div>
</template>

<script scoped>
import IndexImage from "./IndexImage";
import IndexBoard from "./IndexBoard";

export default {
	name: "Home",
	components: {
		IndexImage,
		IndexBoard,
	},
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 0);
    },
	data() {
		return {};
	},
};
</script>

<style scoped>
</style>