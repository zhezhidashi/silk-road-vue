<template>
	<div class="background" :style="`height: auto; background: #efefef`">
		<!--回退到上一个页面-->
		<img
			@click="router_go_back()"
			class="go_back"
			id="go_back1"
			src="arrow_left_3.png"
			alt=""
		/>
		<div class="BoardTitle">{{ BoardTitle[BoardIndex] }}</div>
		<img
			v-show="BoardImage[BoardIndex] !== ''"
			class="BoardImage"
			:src="BoardImage[BoardIndex]"
		/>
		<div class="BoardText">
			<div
				v-for="(Paragraph, index) in BoardText[BoardIndex]"
				:key="index"
				class="BoardTextParagraph"
			>
				&emsp;&emsp;{{ Paragraph }}
			</div>
		</div>

		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div style="position: relative; height: 800px"></div>
	</div>
</template>

<script>
export default {
	name: "LatestBoard",
	data() {
		return {
			BoardIndex: 0,
			BoardTitle: [
				"项目组获得西班牙海军博物馆前副馆长马塞利诺·冈萨雷斯部分画作资料",
				"文理共建，深度融合，探索数字人文建设模式",
				"课题组成员参加第五届“文学与图像”学术论坛",
			],
			BoardImage: [
				"",
				"https://dev.pacificsilkroad.cn/img-service/1/1-COIa7dl373.jpg",
				"",
			],
			BoardText: [
				[
					"2022年9月20日，西班牙海军上校、西班牙海军博物馆前副馆长、西班牙王家海军学院院士马塞利诺·冈萨雷斯（Marcelino González, 1943- ）将其七十余幅画作授权项目组使用，其中二十余幅集中展示16世纪西班牙探索太平洋相关的人物和船只，将结集成“波涛中的面孔”主题线上展览。这些人物中，有著名航海家如麦哲伦、德雷克这些英雄式的“明星”，也包括不甚里程碑式、传奇性的探险家——但回到历史现场，其“征服”世界上最后一片未知大洋的勇气和智慧依然令人钦佩。画作参照这些历史人物最有名的油画、版画，通过再创作，以相对统一的尺寸、材质（水彩或铅笔）、笔触画成，体现出一位退役海军军官对前辈的理解，对西班牙最辉煌的一段海洋史的回顾。",
				],
				[
					"项目团队和人工智能研究院智能系统软件研究中心马郓团队开展紧密合作，共同建设“太平洋丝绸之路档案文献数据库”。项目团队主要负责收集、整理太平洋丝绸之路外文档案文献，人工智能研究院团队师生主要负责技术层面的建设和实施工作，探索出“深度融合，适度交叉，有序推进，互相成就”的数字人文建设模式。",
					"数据库以太平洋丝绸之路相关多语种档案文献资料为元数据，最初的建设内容是发挥外国语学院的语言优势，依托日本、印度尼西亚、菲律宾、美国、墨西哥、英国、葡萄牙、西班牙等国家数字档案馆的资料，聚焦太平洋沿岸的东北亚、东南亚、北美、拉美相关的海上贸易文献，梳理英语、日语、西班牙语、荷兰语、葡萄牙语、印度尼西亚语等语种中涉及太平洋丝绸之路的档案文献，对其中具有典型性和代表性的档案文献进行翻译、研究和展示。在马郓团队加入之后，将北京大学自主研发的数联网关键技术与系统应用于数据库建设，不仅数据收集、整理和归类的进度得到根本性的提升，而且工作方法得到极大的改进，档案展示的手段也更加丰富，为项目的数字化建设注入了强劲动力。经过团队的共同努力，现已完成数据库的内部架构建设，收集外文档案资料5000余份，内容包括贸易货物清单、人员信息、海图、海关制度、法律文书等，基本上都是国内学界初次接触的原始资料。",
					"项目团队的成员主要来自外语学科（负责内容）、计算机软件（负责数据库软件架构）、人工智能（负责档案数据的收集和分类）、图书情报（负责数据编目）、艺术学（负责人机交互界面设计）等领域。项目组针对数据库建设的具体目标，每周定期开展项目交流会，并根据项目的需要对其他成员进行“科普”，降低利用数据、接触前沿技术的门槛。面对跨学科知识结构的差异，甚至是壁垒，团队成员真诚交流，开阔视野，将本学科的需求用其他学科术语表达出来，并在工作成果的迭代中，寻找到更多更新的研究思路。数联网、人工智能等新一代信息技术不断赋能人文学者，提升人文学科资料查询和获取的便利性、研究手段和方法的丰富性、结果展示和观点争鸣的多样性。人文学者不再是单打独斗而是有组织的团队合作，无须管中窥豹而是直接综揽全局的资料掌控，开启了相关研究领域的广阔空间。人工智能研究院智能系统软件研究团队通过项目，将对数联网技术赋能文献档案研究开展进一步实践，并择机开展与国外的合作，探索档案数据的跨境交流融通。",
				],
				[
					"2022年1月8—9日，项目组成员参加北京大学第五届“文学与图像”学术论坛并发表论文：《画像与海图：对“中国船”在太平洋文化交流中影响的几点思考》（吴杰伟）、《〈西印度舶来药物史〉第二部分插图研究》（于施洋）、《图绘太平洋：荷兰东印度公司太平洋航路的开辟与航海图绘制》（谢侃侃）、《蒙昧的帝国：Bik 海参采捕图与荷兰殖民知识焦虑，1814—1824》（徐冠勉）。",
				],
			],
		};
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
				path: "/Home",
			});
            this.$store.dispatch("GetHeaderIndex", 0);
		},
	},
	created() {
		if (this.$route.query.BoardIndex)
			this.BoardIndex = this.$route.query.BoardIndex;
	},
	mounted() {
		//开启页面滚动
		let m = function (e) {
			e.preventDefault();
		};
		document.body.style.overflow = ""; //出现滚动条
		document.removeEventListener("touchmove", m, { passive: true });
	},
};
</script>

<style scoped>
/*标题*/
.BoardTitle {
	position: relative;
	width: 1440px;
	text-align: center;
	top: 100px;
	font-size: 32px;
	line-height: 150%;
	color: black;
	/* background:red; */
}
/* 图片 */
.BoardImage {
	position: relative;
	width: 800px;
	height: auto;
	left: 320px;
	top: 200px;
}
/* 正文的 Container */
.BoardText {
	position: relative;
	width: 1000px;
	height: auto;
	left: 220px;
	top: 250px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.BoardTextParagraph {
	position: relative;
	margin: 10px;
	width: 900px;
	font-size: 20px;
	line-height: 200%;
}
</style>
