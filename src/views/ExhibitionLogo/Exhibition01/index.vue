<template>
	<div class="Exhibition01Container">
		<div class="TitleIntroduction">
			<div class="Title">有帆自远方来</div>
			<div class="Title">Allá viene el Galeón</div>
			<div class="Text1">
				庆祝中秘建交五十一周年&emsp;|&emsp;中墨建交五十周年&emsp;|&emsp;中菲建交四十七周年线上展
			</div>
			<div class="Text1">
				51 Aniversario del Establecimiento de Relaciones Diplomáticas
				entre China y el Per
			</div>
			<div class="Text1">
				50 Aniversario del Establecimiento de Relaciones Diplomáticas
				entre China y México
			</div>
			<div class="Text1">
				47 Aniversario del Establecimiento de Relaciones Diplomáticas
				entre China y Filipinas
			</div>
			<div class="Text2">2022年国际大帆船日</div>
			<div class="Text2">
				Exposición Virtual: Día Internacional del Galeón 2022
			</div>
		</div>
		<div class="HorizontalLine"></div>
		<div class="Part1">
			<div class="Text2">主办单位</div>
			<div class="Text2">Organizadores</div>
			<div class="ImageBlock">
				<div v-for="(item, index) in Images1" :key="index">
					<div
						class="HoverShadow ImageContainer"
						@click="OpenNewPage(item.Url, index)"
					>
						<img
							class="ImageStyle1"
							:src="item.Image"
							alt="加载失败"
						/>
						<div class="ImageTextContainer1">
							<div
								v-for="(line, index) in item.Text"
								:key="index"
							>
								<div class="ImageText">{{ line }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="HorizontalLine"></div>
		<div class="Part2">
			<div class="Text2">协办单位</div>
			<div class="Text2">Colaboradores</div>
			<div class="ImageBlock">
				<div v-for="(item, index) in Images2" :key="index">
					<div
						class="HoverShadow ImageContainer"
						@click="OpenNewPage(item.Url, index)"
					>
						<img
							class="ImageStyle2"
							:src="item.Image"
							alt="加载失败"
						/>
						<div class="ImageTextContainer2">
							<div
								v-for="(line, index) in item.Text"
								:key="index"
							>
								<div class="ImageText">{{ line }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="HorizontalLine"></div>
		<div class="Part3">
			<div class="Text2">作者与顾问</div>
			<div class="Text2">Autores y Asesores</div>
			<div class="PeopleBlock">
				<div v-for="(item, index) in People1" :key="index">
					<div class="PeopleContainer">
						<img class="PeopleImage" :src="item.Image" alt="" />
						<div class="PeopleText">
							<div
								v-for="(line, index) in item.Name"
								:key="index"
								class="PeopleTextline"
							>
								{{ line }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="PeopleBlock">
				<div v-for="(item, index) in People2" :key="index">
					<div class="PeopleContainer">
						<img class="PeopleImage" :src="item.Image" alt="" />
						<div class="PeopleText">
							<div
								v-for="(line, index) in item.Name"
								:key="index"
								class="PeopleTextline"
							>
								{{ line }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="PeopleBlock" style="width: 57vw">
				<div v-for="(item, index) in People3" :key="index">
					<div class="PeopleContainer">
						<img class="PeopleImage" :src="item.Image" alt="" />
						<div class="PeopleText">
							<div
								v-for="(line, index) in item.Name"
								:key="index"
								class="PeopleTextline"
							>
								{{ line }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="Text2">技术支持</div>
			<div class="Text2">Soporte Técnico</div>
			<div class="PeopleBlock" style="width: 57vw">
				<div class="PeopleBlock">
					<div v-for="(item, index) in People4" :key="index">
						<div class="PeopleContainer">
							<img class="PeopleImage" :src="item.Image" alt="" />
							<div class="PeopleText">
								<div
									v-for="(line, index) in item.Name"
									:key="index"
									class="PeopleTextline"
								>
									{{ line }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			Images1: [
				{
					Image: "ExhibitionImage-1-1-1.jpg",
					Url: "https://dev.pacificsilkroad.cn/",
					Text: [
						"国家社会科学基金重大项目",
						"‘太平洋丝绸之路’档案文献整理与研究”项目组",
						"Organización e Investigación de los Documentos y Archivos Relacionados con la Ruta de la Seda del Pacífico, 2021, Proyecto apoyado por el Fondo Nacional para las Ciencias Sociales de China",
					],
				},
				{
					Image: "ExhibitionImage-1-1-2.jpg",
					Url: "https://sfl.pku.edu.cn/index.htm",
					Text: [
						"北京大学外国语学院",
						"Universidad de Pekín (PKU)",
						"Escuela de Lenguas Extranjeras (SFL)",
					],
				},
				{
					Image: "ExhibitionImage-1-1-3.jpg",
					Url: "https://www.eastlit.pku.edu.cn/",
					Text: [
						"北京大学东方文学研究中心",
						"Universidad de Pekín (PKU)",
						"Centro de Estudios Literarios Orientales",
					],
				},
				{
					Image: "ExhibitionImage-1-1-4.jpg",
					Url: "",
					Text: [
						"北京大学西班牙语研究中心",
						"Universidad de Pekín (PKU)",
						"Centro de Estudios Hispánicos",
					],
				},
				{
					Image: "ExhibitionImage-1-1-5.jpg",
					Url: "https://china.unam.mx/inicio/contacto/",
					Text: [
						"墨西哥国立自治大学",
						"墨西哥国立自治大学驻华代表处",
						"（北京外国语大学墨西哥研究中心）",
						"Universidad Nacional Autónoma de México (UNAM) Sede de la UNAM en China",
						"(Centro de Estudios Mexicanos UNAM/BFSU)",
					],
				},
				{
					Image: "ExhibitionImage-1-1-6.jpg",
					Url: "https://facultad.pucp.edu.pe/letras-ciencias-humanas/",
					Text: [
						"秘鲁天主教宗座大学",
						"文学与人文科学系",
						"Pontificia Universidad Católica del Perú (PUCP)",
						"Facultad de Letras y Ciencias Humanas",
					],
				},
			],
			Images2: [
				{
					Image: "ExhibitionImage-1-2-1.jpg",
					Url: "https://embamex.sre.gob.mx/china/index.php/es/",
					Text: ["墨西哥驻华使馆", "Embajada de México en China"],
				},
				{
					Image: "ExhibitionImage-1-2-2.jpg",
					Url: "",
					Text: ["秘鲁驻华使馆", "Embajada del Perú en China"],
				},
				{
					Image: "ExhibitionImage-1-2-3.jpg",
					Url: "",
					Text: ["菲律宾驻华使馆", "Embajada de Filipinas en China"],
				},
				{
					Image: "ExhibitionImage-1-2-4.jpg",
					Url: "http://sic.gob.mx/ficha.php?table=museo&table_id=115",
					Text: [
						"墨西哥阿卡普尔科海军历史博物馆",
						"Museo Histórico Naval de Acapulco",
					],
				},
				{
					Image: "ExhibitionImage-1-2-5.jpg",
					Url: "https://www.esteticas.unam.mx/",
					Text: [
						"墨西哥国立自治大学美学研究院",
						"Instituto de Investigaciones Estéticas- UNAM",
					],
				},
				{
					Image: "ExhibitionImage-1-2-6.jpg",
					Url: "https://es-la.facebook.com/pg/KaisaParaSaKaunlaran/events/?ref=page_internal",
					Text: [
						"菲律宾华裔青年联合会",
						"Kaisa Para Sa Kaunlaran, Filipinas",
					],
				},
			],
			People1: [
				{
					Image: "于施洋.jpg",
					Name: ["于施洋", "Yu Shiyang"],
				},
				{
					Image: "黄佳楠.jpg",
					Name: [
						"黄佳楠",
						"北大西语19本",
						"Grado español año 2019 Aurora",
					],
				},
				{
					Image: "刘雨婷.jpg",
					Name: ["刘雨婷", "Fernanda"],
				},
				{
					Image: "方子添.jpg",
					Name: ["方子添", "Mia"],
				},
				{
					Image: "孙佳琦.jpg",
					Name: ["孙佳琦", "Elena"],
				},
			],
			People2: [
				{
					Image: "程露.jpg",
					Name: ["程露", "Cheng Lu"],
				},
				{
					Image: "马宇晨.jpg",
					Name: ["马宇晨", "Ma Yuchen"],
				},
				{
					Image: "王以琳.jpg",
					Name: ["王以琳", "Wang Yilin"],
				},
				{
					Image: "马塞洛·阿达诺·贝尔纳斯科尼.jpg",
					Name: [
						"马塞洛·阿达诺·贝尔纳斯科尼",
						"Marcelo Adano Bernasconi",
					],
				},
				{
					Image: "马塞利诺·冈萨雷斯.jpg",
					Name: ["马塞利诺·冈萨雷斯", "Marcelino González"],
				},
			],
			People3: [
				{
					Image: "洪舒珊.jpg",
					Name: ["洪舒珊", "Susana Mejía"],
				},
				{
					Image: "司徒国才.jpg",
					Name: ["司徒国才", "Miguel Situ"],
				},
				{
					Image: "吴杰伟.jpg",
					Name: ["吴杰伟", "Wu Jiewei"],
				},
				{
					Image: "李毓中.jpg",
					Name: ["李毓中", "Fabio Yu-chung Lee"],
				},
			],
			People4: [
				{
					Image: "马郓.jpg",
					Name: ["马郓", "Ma Yun"],
				},
				{
					Image: "Portrait.jpg",
					Name: ["杨起", "Yang Qi"],
				},
				{
					Image: "白雪.jpg",
					Name: ["白雪", "Bai Xue"],
				},
				{
					Image: "赵子豪.jpg",
					Name: ["赵子豪", "Zhao Zihao"],
				},
			],
		};
	},
	methods: {
		OpenNewPage(url, index) {
			window.open(url, "__blank", index.toString());
		},
	},
};
</script>

<style scoped>
.Exhibition01Container {
	position: relative;
	width: 80vw;
	height: 100%;
	/* background-color: lightblue; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.HorizontalLine {
	position: relative;
	height: 1px;
	width: 80vw;
	background: #023871;
}
.TitleIntroduction {
	position: relative;
	width: 80vw;
	height: 23vw;
	/* background-color: lightgreen; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.Title {
	position: relative;
	color: #023871;
	font-size: 1.8vw;
	font-weight: bold;
}
.Text1 {
	position: relative;
	font-size: 1.2vw;
}
.Text2 {
	position: relative;
	font-size: 1.2vw;
	font-weight: bold;
}
.Part1,
.Part2 {
	position: relative;
	width: 80vw;
	height: 45vw;
	/* background-color: lightgreen; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.ImageBlock {
	position: relative;
	width: 80vw;
	height: 38vw;
	/* background-color: lightyellow; */
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.ImageContainer {
	position: relative;
	width: 26vw;
	height: 17vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: space-evenly; */
	cursor: pointer;
	/* background-color: lightcoral; */
}
.ImageStyle1 {
	position: relative;
	top: 2vw;
	width: auto;
	height: 4vw;
}
.ImageStyle2 {
	position: relative;
	top: 2vw;
	width: auto;
	height: 6vw;
}
.ImageTextContainer1 {
	position: relative;
	top: 4vw;
	width: 100%;
	height: 8vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background-color: lightblue; */
}
.ImageTextContainer2 {
	position: relative;
	top: 4vw;
	width: 100%;
	height: 5vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background-color: lightblue; */
}
.ImageText {
	position: relative;
	width: 100%;
	font-size: 1vw;
	text-align: center;
}
.Part3 {
	position: relative;
	width: 80vw;
	height: 95vw;
	/* background-color: lightgreen; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.PeopleBlock {
	position: relative;
	width: 72vw;
	height: 18vw;
	/* background-color: lightyellow; */
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}

.PeopleContainer {
	position: relative;
	width: 14vw;
	height: 18vw;
	/* background-color: lightcoral; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.PeopleImage {
	position: relative;
	width: 10vw;
	height: 10vw;
	border-radius: 50%;
}
.PeopleText {
	position: relative;
	width: 14vw;
	height: 8vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.PeopleTextline {
	font-size: 1vw;
	text-align: center;
}
</style>