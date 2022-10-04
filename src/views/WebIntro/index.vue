<template>
	<div class="background" style="height: 1500px">
		<div class="Heading">网站简介</div>
		<div class="web_intro_text">
			<div class="web_intro_paragraph">
				&emsp;&emsp;{{ ParagraphOne }}
			</div>
			<div class="web_intro_paragraph">
				&emsp;&emsp;{{ ParagraphTow }}
			</div>
			<div class="web_intro_paragraph">
				&emsp;&emsp;{{ ParagraphThree }}
			</div>
			<div class="web_intro_paragraph">
				&emsp;&emsp;{{ ParagraphFour }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "WebIntro",
	data() {
		return {
			UnderlineStyleLeft: "395px",
			ParagraphOne:
				"本数据库网站是北京大学外国语学院吴杰伟教授主持的国家社会科学基金中国历史研究院重大历史问题重大项目“‘太平洋丝绸之路’档案文献整理与研究”（项目号：LSYZD21016）的主要成果之一。",
			ParagraphTow:
				"“太平洋丝绸之路”，既包括中国与东南亚、东北亚等太平洋西岸地区的贸易活动，也包括太平洋东岸以拉丁美洲为中心的贸易活动，还包括以中国丝绸为主要代表的商品通过以“菲律宾马尼拉—墨西哥阿卡普尔科大帆船贸易”为代表的跨太平洋海上航线，到达太平洋东岸地区的贸易活动。从16世纪开始，太平洋东西两岸、南北两端通过环太平洋和跨太平洋的海上航线，逐渐将太平洋变成一个纵横交错、多地联动、辐射亚洲大陆和美洲大陆的贸易网络。东方的商品通过海路到达太平洋东岸后，通过陆路穿过美洲，并通过大西洋贸易网络，到达欧洲地区；太平洋西岸的贸易网络连接印度洋贸易网络，进一步到达欧洲地区。来自美洲的白银、农作物也通过太平洋丝绸之路进入东方世界，丰富了东方世界的农业生产和商业活动，促进了东方世界的社会发展。太平洋丝绸之路成为汇聚大西洋贸易、印度洋贸易的重要一环，形成了以中国丝绸为代表的商品在全球范围内的流动。以太平洋丝绸之路为通道，人员交流、知识传播、制度互鉴愈发深入，形成了东西方文化交流与传播的繁荣景象，也留下了大量珍贵的历史档案文献。西班牙、荷兰、英国、法国依托殖民统治的优势，建立了关于太平洋贸易网的成熟的档案文献库，形成了对太平洋贸易网络、历史进程、航线和自然水文资料的充分记载。",
			ParagraphThree:
				"本网站依托项目组成员的外语优势和历史学科背景，对太平洋丝绸之路沿线各国多个语种的重要档案文献资料进行了整理、转写、翻译和研究，尝试从多语种、多地区的视角来呈现太平洋丝绸之路的繁盛局面，提升太平洋丝绸之路的历史价值和文化影响。本网站旨在实现太平洋丝绸之路信息资源的数字化管理和集中保护，建立系统的太平洋丝绸之路档案文献索引，进而更好地实现档案文献的信息整合和虚拟化利用，同时志在为广大国内学者开展更广泛的研究敷设基本轨道，为推动形成更大的太平洋丝绸之路学术共同体作出绵薄贡献。",
			ParagraphFour:
				"本网站重点收藏了16-19世纪太平洋丝绸之路中重要的西班牙语、荷兰语和菲律宾语档案，同时涉及少量的日语、葡萄牙语、法语、印尼语档案。本网站主要收集相关档案文献信息，并提供检索服务。原始档案文件信息来自西班牙西印度档案总馆、西班牙国家图书馆、荷兰国家档案馆、荷兰东印度公司档案与研究合作计划、菲律宾国家档案馆、日本国立公文书馆等机构的公开和特色馆藏，数据库的信息来源还在不断增加中。",
		};
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
                path: '/Home'
            });
		},
	},
    mounted(){
        this.$store.dispatch("GetHeaderIndex", 1);
        this.$store.dispatch("GetLineIndex", 1);
    }
};
</script>

<style scoped>
.web_intro_text {
	position: relative;
	width: 1000px;
    left: 0;
    right: 0;
    margin: auto;
    top: 160px;
}
.web_intro_paragraph{
    margin: 20px;
    font-size: 20px;
    line-height: 200%;
    /* display: flex;
    justify-content: space-between; */
}
</style>