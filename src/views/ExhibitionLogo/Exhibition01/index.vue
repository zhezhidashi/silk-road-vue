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
					<div class="ImageContainer">
						<img class="ImageStyle" :src="item" alt="" />
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
					<div class="ImageContainer">
						<img class="ImageStyle" :src="item" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="HorizontalLine"></div>
		<div class="Part3">
			<div class="Text2">作者与顾问</div>
			<div class="Text2">Autores y Asesores</div>
			<div class="PeopleBlock" style="width: 70vw;">
				<div v-for="(item, index) in People1" :key="index">
					<div class="PeopleContainer">
						<img class="PeopleImage" :src="item.Image" alt="" />
						<div class="PeopleText">{{ item.Name }}</div>
					</div>
				</div>
			</div>
			<div class="PeopleBlock">
				<div class="PeopleBlock">
					<div v-for="(item, index) in People2" :key="index">
						<div class="PeopleContainer">
							<img class="PeopleImage" :src="item.Image" alt="" />
							<div class="PeopleText">{{ item.Name }}</div>
						</div>
					</div>
				</div>
			</div>
            <div class="Text2">技术支持</div>
			<div class="Text2">Soporte Técnico</div>
			<div class="PeopleBlock" style="width: 53vw;">
				<div class="PeopleBlock">
					<div v-for="(item, index) in People3" :key="index">
						<div class="PeopleContainer">
							<img class="PeopleImage" :src="item.Image" alt="" />
							<div class="PeopleText">{{ item.Name }}</div>
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
				"ExhibitionImage11.jpg",
				"ExhibitionImage12.jpg",
				"ExhibitionImage13.jpg",
				"ExhibitionImage14.jpg",
				"ExhibitionImage15.jpg",
				"ExhibitionImage16.jpg",
			],
			Images2: [
				"ExhibitionImage21.jpg",
				"ExhibitionImage22.jpg",
				"ExhibitionImage23.jpg",
				"ExhibitionImage24.jpg",
				"ExhibitionImage25.jpg",
				"ExhibitionImage26.jpg",
			],
			People1: [
				{
					Image: "Portrait.jpg",
					Name: "于施洋",
				},
				{
					Image: "Portrait.jpg",
					Name: "黄佳楠",
				},
				{
					Image: "Portrait.jpg",
					Name: "刘雨婷",
				},
				{
					Image: "Portrait.jpg",
					Name: "方子添",
				},
				{
					Image: "Portrait.jpg",
					Name: "孙佳琦",
				},
			],
			People2: [
				{
					Image: "Portrait.jpg",
					Name: "马塞洛·阿达诺·贝尔纳斯科尼",
				},
				{
					Image: "Portrait.jpg",
					Name: "马塞利诺·冈萨雷斯",
				},
				{
					Image: "Portrait.jpg",
					Name: "洪舒珊",
				},
				{
					Image: "Portrait.jpg",
					Name: "司徒国才",
				},
				{
					Image: "Portrait.jpg",
					Name: "吴杰伟",
				},
				{
					Image: "Portrait.jpg",
					Name: "李毓中",
				},
			],
			People3: [
				{
					Image: "Portrait.jpg",
					Name: "马郓",
				},
				{
					Image: "Portrait.jpg",
					Name: "杨起",
				},
				{
					Image: "Portrait.jpg",
					Name: "白雪",
				},
				{
					Image: "Portrait.jpg",
					Name: "赵子豪",
				},
			],
		};
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
	height: 44vw;
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
	width: 25vw;
	height: 17vw;
	/* background-color: lightcoral; */
}
.ImageStyle {
	position: relative;
	width: 100%;
	height: 100%;
}
.Part3 {
	position: relative;
	width: 80vw;
	height: 60vw;
	/* background-color: lightgreen; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.PeopleBlock {
	position: relative;
	width: 80vw;
	height: 14vw;
	/* background-color: lightyellow; */
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}

.PeopleContainer {
	position: relative;
	width: 10vw;
	height: 14vw;
	/* background-color: lightcoral; */
}
.PeopleImage {
	position: relative;
	width: 10vw;
	height: 10vw;
    border-radius: 50%;
}
.PeopleText {
	position: relative;
	width: 10vw;
	height: 4vw;
	font-size: 1vw;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>