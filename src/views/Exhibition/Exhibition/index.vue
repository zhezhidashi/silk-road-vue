<template>
	<div class="background">
		<title-intro :ExhibitionTitle="ExhibitionTitle" :ExhibitionIntro="ExhibitionIntro" :ExhibitionID="ExhibitionID"/>
        <pic-list :Images="Images" :ExhibitionID="ExhibitionID" />
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
        Info
    },
	data() {
        // 记住，Exhibition 这个界面只保存八张图片
		return {
			ExhibitionTitle: "有帆自远方来",
			ExhibitionIntro: [
				"2009年，联合国教科文组织将每年的10月8日定为“国际大帆船日”，纪念1565-1815年间往返于墨西哥阿卡普尔科和菲律宾马尼拉之间的大帆船贸易。以大帆船贸易为依托，太平洋地区逐渐形成了一个纵横交错、多地联动、辐射亚洲大陆和美洲大陆的贸易网络，构筑了文化交流的美丽画卷。东方的商品通过中菲贸易和大帆船贸易到达太平洋东岸，进一步通过陆路穿过美洲，接入大西洋贸易网络，到达欧洲地区。来自美洲的白银、作物也“返空”进入东方世界，丰富了此岸的商业活动、农业生产和社会发展。中菲贸易和大帆船贸易共同形成了独具特色的太平洋丝绸之路，频繁的往回带来了丰富的物质史，催生了新的思想、制度和秩序，改变了个人与世界的关系，充实了太平洋两岸的精神空间，深刻地影响了世界。",
				"经过数百年的探索和积累，以太平洋丝绸之路为通道，人员交流、知识传播、制度互鉴愈发深入，形成经济、文化、政治等领域互相交流的地理场域和历史空间，铸就了东西方文化传播的繁荣景象。大量珍贵的、可视化的、直观的历史图像，涵盖海上航线、海外贸易、文化交流、海外移民、民间信仰、地理描述等领域，印证着这条互惠之路、沟通之路。",
				"大帆船贸易承载了中国、菲律宾与墨西哥源远流长的文化交往，拉开了早期全球化的序幕，对这一重要时期的回溯不仅能为新时代中、菲、墨和平交流提供重要的历史参照，还将为三国的进一步信任合作带来新机遇和新启示。为更好地展现这段风起云涌的太平洋之旅，北京大学外国语学院拟于2022年10月8日举行主题为“有帆自远方来”的线上历史文化展。展览由国家社会科学基金重大项目“‘太平洋丝绸之路’档案文献整理与研究”项目组承办，精选16世纪大帆船贸易至今有代表性的百余幅地图、海图、档案、肖像、书信、音乐等材料，既展现大帆船贸易关联起的大世界，也发掘在时代大潮中起伏的“小”人物，从史料史实中捕捉和呈现太平洋交流的全貌。本次主题展览期望能够引起国内学界对于中墨、中菲、中拉关系史以及全球史视角下太平洋贸易的更多关注，为“一带一路”倡议拓展更大的国际空间，为推动构建人类命运共同体的美好愿景作出积极的贡献。",
			],
			ExhibitionID: "0",
			Images: [
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-h47ROx438L.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "1564-1565年完成阿卡普尔科-马尼拉-阿卡普尔科首次航行的“圣佩德罗”号（剖面模型），其催生了1565-1815年间持续运行的马尼拉-阿卡普尔科跨太平洋贸易航线。推测比例1:12",
						EN: "",
						ES: "Medio casco  de la nao San Pedro que completó el primer viaje. Acapulco-Manila-Acapulco, 1564-1565, dando origen a la ruta transpacífica Manila-Acapulco-Manila que duró desde 1565 a 1815. Réplica hipotética a escala 1:12",
					},
					PictureID: "0",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-ROkyqUBXxf.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "关于从1527年到16世纪70年代初新西班牙建造的船只，我们所知很少，主要是缺乏图片、草图、设计图，因为造船业直到16世纪末还主要掌握在不识字的造船师傅手中，他们都是经验型，通过实践代代相传，直接决定船只的尺寸和比例。",
						EN: "",
						ES: "Pocas son las noticias que tenemos acerca de cómo fueron los barcos que se construyeron en Nueva España desde 1527 hasta el principio del último tercio del siglo XVI. Nos referimos a la falta dibujos, bocetos o planos que hubieran sido utilizados para la construcción de estos navíos, debida a que hasta casi finales de siglo XVI, la construcción naval estuvo en manos de los carpinteros de ribera analfabetas en su gran mayoría. Estos fueron constructores empíricos cuya larga y rica experiencia, transmitida de generación en generación mediante la práctica directa de construir navíos, era la herramienta primordial para tomar las decisiones acerca de las dimensiones y proporciones del futuro navío.",
					},
					PictureID: "1",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-oyJpMu8ENy.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "用于“南海”的船只是什么特点和比例，最好的资料无疑是船谱《关于墨西哥地区船只设计、管理和规范运行的说明》，由国王理事会成员、墨西哥检审庭听证员迭戈·加西亚·德帕拉西奥博士编写，1587年在墨城佩德罗·奥查尔特印刷所出版。这部专论，特别是第四册，对于我们了解“圣佩德罗”号的情况特别重要，这艘旗舰是为黎牙实比指挥舰队跨太平洋航行而在巴拉-德-纳维达专门建造的。",
						EN: "",
						ES: "Sin duda,  el tratado de construcción naval que mejor idea nos puede dar acerca de cuáles eran las características y las proporciones de las naos destinadas al servicio en la Mar del Sur, es la Instrucción Náutica para el buen uso y regimiento de las naos, su traza y gobierno, conforme a la altura de México. Compuesta por el doctor Diego García de Palacio, del Consejo de su Majestad y su Oidor en la Real Audiencia de la dicha ciudad, impresa por Pedro Ocharte, en la ciudad de México en 1587. Este tratado, especialmente el Libro IV, es particularmente importante para aproximarnos al conocimiento de cuáles eran las características y medidas de la nao San Pedro, nave capitana de la flota que se construyó en Barra de Navidad para el viaje transpacífico de la expedición comandada por Miguel López de Legazpi.",
					},
					PictureID: "2",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-SWV6LfK90B.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "根据书中信息，“圣佩德罗”号约为此形制，当时使用了“王肘”为单位，换算后约为：龙骨净长19.54 m. 最大宽度9.20 m. 弦高5.74 m. 船底2.87 m. 总长29.50 m. 最大宽度与总长比 1/3.2. 最大宽度与龙骨比 1/2. 载重约 400吨。",
						EN: "",
						ES: "as dimensiones de la nao San Pedro expresadas en codos de ribera y sus equivalents en el sistema métrico decimal, serían las siguientes: Quilla limpia: 34 codos de ribera* = 19.54 m. Manga: 16 codos de ribera = 9.20 m. Puntal: 10 codos de ribera =   5.74 m. Plan: 5 codos de ribera = 2.87 m. Eslora total (desde el beque al coronamiento): 51 1/3 codos de ribera = 29.50 m. Relación manga-eslora: 1/3.2. Relación manga-quilla: ½.1. Arqueo aproximado: 400 toneladas.",
					},
					PictureID: "3",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-Qkl1jWnunq.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "乌尔达内塔指挥的“圣佩德罗”号应有三层甲板。据加西亚·德帕拉西奥的说法，“第一层从龙骨往上”2.59米，第二层，所谓第一甲板，有1.72米，第三层“舰桥”也有1.72米。第一层被用作仓库，第二层为乘客或海军准备，第三层舰桥是操帆和掌舵的地方。",
						EN: "",
						ES: "El casco de una nao como la que utilizó Urdaneta tenía tres cubiertas. De acuerdo con García de Palacio,”…  la primera contando desde la quilla hasta lo alto…”tenía un altura de cuatro codos y medio (2.59 m); la segunda, denominada primera cubierta, medía tres codos de alto  (1.72 m); la altura de la tercera cubierta que recibía el nombre de puente, era también de tres codos (1.72 m). Los dos espacios ubicados entre la quilla y la segunda cubierta –llamada primera cubierta- se usaban como bodega; la primera cubierta se destinaba a “… los pasajeros, o gente de guerra,”mientras que la tercera cubierta o puente  “… es sobre la cual se marcarán las velas y gobiernan los mareantes.”",
					},
					PictureID: "4",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-F2dMe3XD0r.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "“我们的圣母雷梅迪奥斯”号，又称“被眷顾的”",
						EN: "",
						ES: "Fragata S. M. C. Nuestra Señora de los Remedios alias Favorita.”",
					},
					PictureID: "5",
				},
				// {
				// 	PictureUrl:
				// 		"https://dev.pacificsilkroad.cn/img-service/1/1-wyn4R29Jhl.jpg",
				// 	Title: {
				// 		ZH: "中文标题",
				// 		EN: "",
				// 		ES: "Título en español",
				// 	},
				// 	Intro: {
				// 		ZH: "原船1779年建于秘鲁卡亚俄、墨西哥圣布拉斯",
				// 		EN: "",
				// 		ES: "Lugar y fecha de construcción del barco original: El Callao, Perú - San Blas, Nayarit, México. 1779.",
				// 	},
				// 	PictureID: "6",
				// },
				// {
				// 	PictureUrl:
				// 		"https://dev.pacificsilkroad.cn/img-service/1/1-Hej62F1xrF.jpg",
				// 	Title: {
				// 		ZH: "中文标题",
				// 		EN: "",
				// 		ES: "Título en español",
				// 	},
				// 	Intro: {
				// 		ZH: "水线和肋骨结构图，藏于墨西哥国家档案总馆",
				// 		EN: "",
				// 		ES: "Planos de líneas de agua y caja de cuadernas: Archivo General de la Nación, México. ",
				// 	},
				// 	PictureID: "7",
				// },
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