<template>
	<div id="app">
		<!-- <div class="images">
			<img
				src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"
			/>
			<img
				src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"
			/>
		</div> -->

		<viewer :images="images">
			<img v-for="(src, index) in images" :src="src" :key="index" />
		</viewer>
	</div>
</template>
<script>
export default {
	data() {
		return {
			//images必须是数组
			images: [
				"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943",
				"https://dev.pacificsilkroad.cn/img-service/1/1-BZpi703xX3.jpg",
			],
		};
	},
};
</script>