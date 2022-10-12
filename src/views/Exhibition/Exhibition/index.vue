<template>
	<div class="background">
		<title-intro
			:ExhibitionTitle="ExhibitionTitle[ExhibitionID]"
			:ExhibitionIntro="ExhibitionIntro"
			:ExhibitionID="ExhibitionID"
		/>
		<pic-list :Images="Images[ExhibitionID]" :ExhibitionID="ExhibitionID" />
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
			ExhibitionTitle: [
				"马尼拉：亚洲中转站",
				"大帆船：海上堡垒",
				"船上生活：太平洋针路",
				"阿卡普尔科：辐射美洲",
			],
			ExhibitionIntro: [
				"2009年，联合国教科文组织将每年的10月8日定为“国际大帆船日”，纪念1565-1815年间往返于墨西哥阿卡普尔科和菲律宾马尼拉之间的大帆船贸易。以大帆船贸易为依托，太平洋地区逐渐形成了一个纵横交错、多地联动、辐射亚洲大陆和美洲大陆的贸易网络，构筑了文化交流的美丽画卷。东方的商品通过中菲贸易和大帆船贸易到达太平洋东岸，进一步通过陆路穿过美洲，接入大西洋贸易网络，到达欧洲地区。来自美洲的白银、作物也“返空”进入东方世界，丰富了此岸的商业活动、农业生产和社会发展。中菲贸易和大帆船贸易共同形成了独具特色的太平洋丝绸之路，频繁的往回带来了丰富的物质史，催生了新的思想、制度和秩序，改变了个人与世界的关系，充实了太平洋两岸的精神空间，深刻地影响了世界。",
				"经过数百年的探索和积累，以太平洋丝绸之路为通道，人员交流、知识传播、制度互鉴愈发深入，形成经济、文化、政治等领域互相交流的地理场域和历史空间，铸就了东西方文化传播的繁荣景象。大量珍贵的、可视化的、直观的历史图像，涵盖海上航线、海外贸易、文化交流、海外移民、民间信仰、地理描述等领域，印证着这条互惠之路、沟通之路。",
				"大帆船贸易承载了中国、菲律宾与墨西哥源远流长的文化交往，拉开了早期全球化的序幕，对这一重要时期的回溯不仅能为新时代中、菲、墨和平交流提供重要的历史参照，还将为三国的进一步信任合作带来新机遇和新启示。为更好地展现这段风起云涌的太平洋之旅，北京大学外国语学院拟于2022年10月8日举行主题为“有帆自远方来”的线上历史文化展。展览由国家社会科学基金重大项目“‘太平洋丝绸之路’档案文献整理与研究”项目组承办，精选16世纪大帆船贸易至今有代表性的百余幅地图、海图、档案、肖像、书信、音乐等材料，既展现大帆船贸易关联起的大世界，也发掘在时代大潮中起伏的“小”人物，从史料史实中捕捉和呈现太平洋交流的全貌。本次主题展览期望能够引起国内学界对于中墨、中菲、中拉关系史以及全球史视角下太平洋贸易的更多关注，为“一带一路”倡议拓展更大的国际空间，为推动构建人类命运共同体的美好愿景作出积极的贡献。",
			],
			ExhibitionID: "0",
			Images: [
				[
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-Gf6C84oLjP.jpg",
						Title: {
							ZH: "古今形胜之图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "传入欧洲的首张中国全图，为福建金沙书院重刻本，地图经闽南华商取得，并在马尼拉华人协助下由神父将图注译为西班牙文。1574年，时任西班牙驻菲律宾总督将其呈交西班牙国王菲利普二世。",
							EN: "",
							ES: "",
						},
						PictureID: "0",
					},
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-q4tjvrVuN3.jpg",
						Title: {
							ZH: "西班牙人绘吕宋岛及周边中国海岸图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "附于数学家、天文学家Hernando de los Ríos Coronel上书，信中号召由两条路前来占领爱尔摩沙岛。",
							EN: "",
							ES: "",
						},
						PictureID: "1",
					},
				],
				[
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-2IP3692m8x.jpg",
						Title: {
							ZH: "麦哲伦环球航行譬喻图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "西奥多·德布莱生于比利时列日，后为逃避天主教迫害前往法兰克福，这幅铜版是他1590年代开始制作的“伟大航行·西印度”系列之一，其去世前完成了6卷，美洲为第4卷、共24幅，此幅描绘了渡过麦哲伦海峡的光辉意义。",
							EN: "",
							ES: "",
						},
						PictureID: "0",
					},
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-AV8SBpcdmY.jpg",
						Title: {
							ZH: "西班牙巴斯克地区的一份造船委托合同",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "合同中明确要一艘内径最大宽度13.5腕尺、龙骨26.5腕尺、艏楼艉楼舷高10.75腕尺的船。此处1腕尺为57厘米。",
							EN: "",
							ES: "",
						},
						PictureID: "1",
					},
				],
				[
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-CxLavSdZZx.jpg",
						Title: {
							ZH: "",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "",
							EN: "",
							ES: "Grumete en la tabla de jarcia. Es un joven de 16 a 20 años, aprendiz de marinero, vestido con blusón blanco, calzones azules y bonete rojo, que tenía mucho éxito entre la marinería.(Dibujo de Marcelino González)",
						},
						PictureID: "0",
					},
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-hMQT94rLWC.jpg",
						Title: {
							ZH: "",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "",
							EN: "",
							ES: "Representación de una nao medieval tomada de un grabado de época. (Dibujo de Marcelino González)",
						},
						PictureID: "1",
					},
				],
				[
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-OeJOa2J52o.jpg",
						Title: {
							ZH: "新制墨西哥及周边省份地图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "新西班牙总督地图，在北纬15°到28 °之间。右上角显示了与下加利福尼亚半岛和索诺拉海岸及部分内陆地区相应的领土，表示的是雷维拉吉多群岛的索科罗岛和加利福尼亚湾的岛屿。中间的插图描绘了墨西哥，东部是普埃布拉，南部是约特佩克和库埃纳瓦卡，西部是托卢卡和莱尔马，北部是图拉。它显示了湖泊、从墨西哥城出发的公路网。这是一个非常详细的地图，有许多地名，涵盖了了首都、城市、村庄、矿场、庄园、牧场和保护区等。",
							EN: "",
							ES: "",
						},
						PictureID: "0",
					},
					{
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-6yKMZGWDye.jpg",
						Title: {
							ZH: "阿卡普尔科和马尔克斯港之间的海岸图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "图例用A到Z标明了两地之间的重要设施，图下方还绘制了阿卡普尔科海湾和周边的天际线，以便领航员辨认进港。此图由4部分拼接而成，为护卫舰舰长Juan Vernacci下令绘制，他在1804年至1809年间指挥“麦哲伦号”每年往返于阿卡普尔科和马尼拉之间。",
							EN: "",
							ES: "",
						},
						PictureID: "1",
					},
				],
			],
		};
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
	},
	methods: {},
};
</script>

<style scoped>
</style>