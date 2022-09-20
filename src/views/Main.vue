<template>
	<div class="Container">
		<div class="Header">
			<common-header></common-header>
		</div>
		<div class="Main">
			<router-view></router-view>
		</div>

		<div class="Footer">
			<common-footer></common-footer>
		</div>
	</div>
	<!-- <el-container style="height: 100%">
		<el-container>
			<el-header height="90px">
				<common-header></common-header>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer height="70px">
				<common-footer></common-footer>
			</el-footer>
		</el-container>
	</el-container> -->
</template>

<style scoped>
.Container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #efefef;
}

.Header {
	position: fixed;
	top: 0;
	z-index: 999;
	height: auto;
	width: 100%;
	display: flex;
	justify-content: center;
	align-content: center;
	background: #023871;
}
.Main {
	position: relative;
    height: auto;
	display: flex;
	justify-content: center;
	align-content: center;
}
.Footer {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #023871;
}
</style>

<script>
import CommonFooter from "../components/CommonFooter.vue";
import CommonHeader from "../components/CommonHeader.vue";

export default {
	name: "Main",
	components: {
		CommonFooter,
		CommonHeader,
	},
	data() {
		return {};
	},
};
</script>
