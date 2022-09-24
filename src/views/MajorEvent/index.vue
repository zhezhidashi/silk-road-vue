<template>
	<div class="background" style="height: 1300px; background: #efefef">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>
		<!--标题-->
		<div class="MajorEventTitle">网站大事记</div>

		<!--时间、事件-->
		<div class="MajorEventTextContainer">
			<div class="major_event_time_1">2021年</div>
			<div class="major_event_text_1">
				10月29日，太平洋丝绸之路档案文献整理与研究正式立项。<br />
				10月22日、11月12日、12月3日，项目子课题负责人举行工作会议，讨论项目工作重点和研究路径，并确定数据库建设的内容框架。
			</div>
			<div class="major_event_time_2">2021年</div>
			<div class="major_event_text_2">
				1月15日，太平洋丝绸之路档案文献整理与研究研究团队举行项目开题会，来自中国历史研究院、暨南大学、厦门大学、中国社会科学院、国家文物局、北京师范大学、中山大学、广东省科学院等机构的多位专家学者通过线上线下相结合的方式参加了此次开题会。七位评议专家高度肯定了课题的研究意义和可操作性，并提出了针对性和建设性的建议和意见。<br />
				3月25日，马郓科研团队加入项目组，承担数据库建设的技术工作，并探索文理融合的跨学科科研模式。<br />
				5月12日起，项目组每周开会讨论数据库建设的相关问题，在数据框架、表现形式、网站标识等内容进行深入交流。<br />
				6月1日，确定网站内容和功能，并完成特定档案资料收集工作。<br />
				6月9日，完成网站域名申请工作。<br />
				6月16日，设计项目和网站标识。<br />
				7月14日，完成网站用户界面设计方面和网站页面架构。<br />
				7月31日，数据库网站上线。
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MajorEvent",
	methods: {
		// 路由回退
		router_go_back() {
			console.log("click!");
			this.$router.go(-1);
		},
	},
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 1141px;
}
/*标题*/
.MajorEventTitle {
	position: absolute;
	width: 1440px;
	text-align: center;
	top: 100px;
	font-size: 32px;
	line-height: 150%;
	color: #023871;
}
/* 文字的Container */
.MajorEventTextContainer {
    position: relative;
	width: 1000px;
	left: 0;
	right: 0;
	margin: auto;
    top: 250px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
    /* background: red; */
}
.major_event_time_1 {
	width: 1000px;
	font-weight: 700;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	margin: 10px;
}
.major_event_text_1 {
	width: 1000px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	margin: 10px;
}

.major_event_time_2 {
	width: 1000px;
	font-weight: 700;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	margin: 10px;
}
.major_event_text_2 {
	width: 1000px;
	font-size: 20px;
	line-height: 200%;
	color: #2f2f2f;
	margin: 10px;
}
</style>