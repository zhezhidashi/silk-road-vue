<template>
	<div class="background" style="height: auto">
		<!--网页路径-->
		<div class="WebPath">
			<div @click="GoExhibitionList" style="cursor: pointer">
				线上展览
			</div>
			&ensp;&gt;&ensp;
			<div @click="GoExhibition" style="cursor: pointer">
				{{ ExhibitionTitle[ExhibitionID] }}
			</div>
			&ensp;&gt;&ensp;
		</div>

		<!-- 图片题目 -->
		<div class="Heading" style="top: 150px">
			{{ PictureList[ExhibitionID][PictureID].Title.ZH }}
		</div>

		<div class="ListAndMainImageContainer Card">
			<!--左侧图片列表-->
			<div class="ImageListContainer">
				<vue-scroll class="ImageListContainer" :ops="ops">
					<div v-for="item in PictureList[ExhibitionID]" :key="item.PictureID">
						<div
							@click="ImageListBtn(item)"
							:class="
								item.PictureID === PictureID
									? 'ClickImage'
									: 'ImageListImgContainer'
							"
						>
							<div
								class="ImageListImg Card"
								:style="`background-image:url(${item.PictureUrl})`"
							></div>
						</div>
					</div>
				</vue-scroll>
			</div>

			<!--右侧大图片-->
			<div style="position: relative; width: 65vw; height: 40vw">
				<img
					@click="ImageShift(-1)"
					class="PageShift"
					id="PageShiftLeft"
					:src="ShiftLeftSrc"
				/>
				<img
					@click="ImageShift(1)"
					class="PageShift"
					id="PageShiftRight"
					:src="ShiftRightSrc"
				/>
				<viewer class="MainImageContainer" :images="PictureList[ExhibitionID]">
					<img
						class="MainImage"
						v-for="item in PictureList[ExhibitionID]"
						:src="item.PictureUrl"
						:key="item.PictureID"
						v-show="item.PictureID === PictureID"
					/>
				</viewer>
			</div>
		</div>

		<!--大图片的描述-->
		<div class="InfoContainer">
			<div class="LanguageContainer">
				<div
					@click="ShiftLanguage(0)"
					:class="LanguageIndex === 0 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[0]] }}
				</div>
				<div class="LineVertical"></div>
				<div
					@click="ShiftLanguage(1)"
					:class="LanguageIndex === 1 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[1]] }}
				</div>
				<div class="LineVertical"></div>
				<div
					@click="ShiftLanguage(2)"
					:class="LanguageIndex === 2 ? 'SelectLanguage' : 'Language'"
				>
					{{ LanguageMap[LanguageType[2]] }}
				</div>
			</div>
			<div class="LineHorizontal"></div>
			<div class="TitleIntroContainer">
				<div class="ImageTitle">
					{{
						PictureList[ExhibitionID][PictureID].Title[
							LanguageType[LanguageIndex]
						]
					}}
				</div>
				<div class="ImageIntro">
					{{
						PictureList[ExhibitionID][PictureID].Intro[
							LanguageType[LanguageIndex]
						]
					}}
				</div>
			</div>
		</div>

		<!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div class="BottomBlank"></div>
		<img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
export default {
	data() {
		return {
			// 展览主键
			ExhibitionID: 0,

			// 大图在展览中的序号
			PictureID: "0",
			PictureTotal: [8, 2, 2, 2],
			// 线上展览标题
			ExhibitionTitle: [
				"马尼拉：亚洲中转站",
				"大帆船：海上堡垒",
				"船上生活：太平洋针路",
				"阿卡普尔科：辐射美洲",
			],

			// 存储图片列表及其相关属性
			PictureList: [
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
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-2v73NQqb1K.jpg",
						Title: {
							ZH: "西班牙人绘中国艾尔摩沙岛和南方部分地区",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "附于1626年菲岛都督上书，称已占领艾尔摩沙岛北部一港口。",
							EN: "",
							ES: "",
						},
						PictureID: "2",
					},
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-5VAzeM910w.jpg",
						Title: {
							ZH: "对艾尔摩沙岛上西班牙人所占港口的描绘",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "1626年5月5日，西班牙人自马尼拉向台湾出发，因南部已被荷兰人占领，遂沿东海岸北上，11日到三貂角（Santiago），次日入鸡笼港，登陆湾内小岛并举行占领典礼。本地图附于菲律宾代理都督当年上书，介绍海湾情况及周边可取木材、修建堡垒处。",
							EN: "",
							ES: "",
						},
						PictureID: "3",
					},
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-vd1S8YpJNV.jpg",
						Title: {
							ZH: "帕劳群岛分布图",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "西太平洋群岛，领航员José Somera绘，图例解释了当年11-12月传教士发现的几个岛屿，及当地人赤身裸体、“体面着装”、接待来宾的地方及所用船只等。",
							EN: "",
							ES: "",
						},
						PictureID: "4",
					},
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-sHm0izGZD4.jpg",
						Title: {
							ZH: "马尼拉湾、苏比克湾及周边海岸",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "图右为北，右上标苏比克，1698年由Don Joseph Cortés Monrroy中士发现，是马尼拉及甲米地西北方向重要的木材产地，适宜建造船厂。",
							EN: "",
							ES: "",
						},
						PictureID: "5",
					},
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-F1im1cdxMn.jpg",
						Title: {
							ZH: "卡加延河岸教堂分布图（局部）",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "船长、领航员Juan Luis de Acosta绘，以字母标注了吕宋岛最北端卡加延河流域地势、道路、村庄、教堂等。",
							EN: "",
							ES: "",
						},
						PictureID: "6",
					},
                    {
						PictureUrl:
							"https://dev.pacificsilkroad.cn/img-service/1/1-F1im1cdxMn.jpg",
						Title: {
							ZH: "卡加延河岸教堂分布图（局部）",
							EN: "",
							ES: "",
						},
						Intro: {
							ZH: "船长、领航员Juan Luis de Acosta绘，以字母标注了吕宋岛最北端卡加延河流域地势、道路、村庄、教堂等。",
							EN: "",
							ES: "",
						},
						PictureID: "7",
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

			// 为了方便 v-viewer 显示下方的列表，需要单独存储所有 Img 的 Src
			// ImgList: ["Loading.gif"],
			ImgList: [
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
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-wyn4R29Jhl.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "原船1779年建于秘鲁卡亚俄、墨西哥圣布拉斯",
						EN: "",
						ES: "Lugar y fecha de construcción del barco original: El Callao, Perú - San Blas, Nayarit, México. 1779.",
					},
					PictureID: "6",
				},
				{
					PictureUrl:
						"https://dev.pacificsilkroad.cn/img-service/1/1-Hej62F1xrF.jpg",
					Title: {
						ZH: "中文标题",
						EN: "",
						ES: "Título en español",
					},
					Intro: {
						ZH: "水线和肋骨结构图，藏于墨西哥国家档案总馆",
						EN: "",
						ES: "Planos de líneas de agua y caja de cuadernas: Archivo General de la Nación, México. ",
					},
					PictureID: "7",
				},
			],

			// 记录三种语言
			LanguageType: ["ZH", "EN", "ES"],
			// 记录现在选择的是哪种语言
			LanguageIndex: 0,

			// 语种简称对应表
			LanguageMap: {
				AR: "阿拉伯文",
				BE: "白俄罗斯文",
				BG: "保加利亚文",
				CA: "加泰罗尼亚文",
				CS: "捷克文",
				DA: "丹麦文",
				DE: "德文",
				EL: "希腊文",
				EN: "English",
				ES: "Español",
				ET: "爱沙尼亚文",
				FI: "芬兰文",
				FR: "法文",
				HR: "克罗地亚文",
				HU: "匈牙利文",
				IT: "意大利文",
				IW: "希伯来文",
				JA: "日文",
				KO: "朝鲜文",
				LT: "立陶宛文",
				MK: "马其顿文",
				NL: "荷兰文",
				NO: "挪威文",
				PL: "波兰文",
				PT: "葡萄牙文",
				RO: "罗马尼亚文",
				RU: "俄文",
				SK: "斯洛伐克文",
				SL: "斯洛文尼亚文",
				SQ: "阿尔巴尼亚文",
				SR: "塞尔维亚文",
				SV: "瑞典文",
				TH: "泰文",
				TR: "土耳其文",
				UK: "乌克兰文",
				ZH: "中文",
			},

			// scroll 的配置项
			ops: {
				vuescroll: {},
				scrollPanel: {},
				rail: {
					keepShow: true,
				},
				bar: {
					hoverStyle: true,
					onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
					opacity: 0, //滚动条透明度
					"overflow-x": "hidden",
				},
			},

			// 切换按钮的图片
			ShiftLeftSrc: "ShiftLeft.png",
			ShiftRightSrc: "ShiftRight.png",
		};
	},
	mounted() {
		//从本页面的url中获取 ExhibitionID 和 AlbumID 的值
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.PictureID = this.$route.query.PictureID;

		this.$store.dispatch("GetHeaderIndex", 3);
		this.$store.dispatch("GetLineIndex", 1);
	},
	methods: {
		// 面包屑退回线上展览
		GoExhibitionList() {
			this.$router.push({
				path: "/ExhibitionList",
			});
		},
		GoExhibition() {
			this.$router.push({
				path: "/Exhibition",
				query: {
					ExhibitionID: this.ExhibitionID,
				},
			});
		},

		// 切换语言
		ShiftLanguage(index) {
			this.LanguageIndex = index;
		},

		// 点击下方列表的图片，修改大图的url
		ImageListBtn(item) {
			this.PictureID = item.PictureID;
		},

		ListContain(list, x) {
			for (let item of list) {
				if (x === item) return true;
			}
			return false;
		},

		// 左右按钮切换图片
		ImageShift(d) {
			this.PictureID = (
				(parseInt(this.PictureID) + d + this.PictureTotal[this.ExhibitionID]) %
				this.PictureTotal[this.ExhibitionID]
			).toString();
			console.log(this.PictureID);
		},
	},
};
</script>

<style>
/* 图片列表和大图片的 Container */
.ListAndMainImageContainer {
	position: relative;
	top: 250px;
	height: 40vw;
	width: 80vw;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/*左侧的图片列表*/
.ImageListContainer {
	position: relative;
	width: 15vw;
	height: 40vw;
	background: white;
	border-radius: 7px 0 0 7px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.ImageListImgContainer {
	position: relative;
	width: 8vw;
	height: 8vw;
	padding: 2vw;
	/* background: blue; */
}

.ClickImage {
	position: relative;
	animation: MyMove 0.3s forwards;
}

@keyframes MyMove {
	from {
		width: 8vw;
		height: 8vw;
		padding: 2vw;
	}
	to {
		width: 10vw;
		height: 10vw;
		padding: 1vw;
	}
}

.ImageListImg {
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px;
	cursor: pointer;
	z-index: 10;
}

/* 网页主图 */
.MainImageContainer {
	position: relative;
	width: 65vw;
	height: 40vw;
	background: lightgrey;
	border-radius: 0 7px 7px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
#PageShiftLeft {
	position: absolute;
	top: 20vw;
	left: 1vw;
	z-index: 120;
}
#PageShiftRight {
	position: absolute;
	right: 1vw;
	top: 20vw;
	z-index: 120;
}
.MainImage {
	position: relative;
	max-width: 65vw;
	max-height: 40vw;
	cursor: pointer;
}

/* 大图片的信息 */
.InfoContainer {
	position: relative;
	top: 340px;
	width: 80vw;
	height: auto;
	/* min-height: 300px; */
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
/* 三种语言 */
.LanguageContainer {
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.Language {
	position: relative;
	font-size: 18px;
	line-height: 200%;
	cursor: pointer;
}
.SelectLanguage {
	color: #023871;
	font-weight: bold;
	position: relative;
	font-size: 18px;
	line-height: 200%;
	cursor: pointer;
}
/* 竖线 */
.LineVertical {
	position: relative;
	background: #588cc8;
	width: 2px;
	height: 20px;
	margin-left: 5px;
	margin-right: 5px;
}
/* 横线 */
.LineHorizontal {
	position: relative;
	background: #588cc8;
	height: 2px;
	width: 80vw;
	margin-bottom: 10px;
}
.TitleIntroContainer {
	position: relative;
}
.ImageTitle {
	position: relative;
	font-size: 20px;
	font-weight: bold;
	color: #023871;
	line-height: 200%;
}
.ImageIntro {
	position: relative;
	font-size: 18px;
	line-height: 200%;
}
</style>