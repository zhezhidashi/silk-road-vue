<template>
	<div class="FooterStyle">
		<div class="footer_container">
			<div class="footer_privacy">隐私保护</div>
			<div class="footer_line_left"></div>
			<div class="footer_copyright">版权说明</div>
			<div class="footer_line_right"></div>
			<div class="footer_record">备案号</div>
		</div>
	</div>
</template>

<style>
.FooterStyle{
    width: 100%;
    height: inherit;
    display: flex;
	justify-content: center;
	align-items: center;
	background: #023871;
}
.footer_container {
	position: relative;
	width: 410px;
	height: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	line-height: 150%;
	color: #ffffff;
}
.footer_line_left {
	width: 0;
	height: 26px;
	border: 0.7px solid #ffffff;
}
.footer_line_right {
	width: 0;
	height: 26px;
	border: 0.7px solid #ffffff;
}
</style>

<script>
export default {
	name: "CommonFooter",
	data() {
		return {
			menu: [],
		};
	},
};
</script>