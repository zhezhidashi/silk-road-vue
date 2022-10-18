<template>
	<div class="background">
		<div class="Heading">最新公告</div>
		<div class="BelowHeading BoardContainer">
            <div v-for="(item, index) in BoardList" :key="index">
                <div class="BoardItem Card HoverShadow" @click="GoBoard(index)">
                    <div class="Card BoardItemImageContainer">
                        <div class="Card BoardItemImage BackgroundImage" :style="`background-image:url(${item.Image})`"></div>
                    </div>
                    <div class="BoardItemText">
                        <div class="BoardItemTitle">{{item.Title}}</div>
                        <div class="BoardItemIntro">{{item.Intro}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
		<div class="BottomBlank"></div>
        <img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			BoardList: [
				{
					Title: "项目组获得西班牙海军博物馆前副馆长马塞利诺·冈萨雷斯部分画作资料",
					Intro:
						"2022年9月20日，西班牙海军上校、西班牙海军博物馆前副馆长、西班牙王家海军学院院士马塞利诺·冈萨雷斯（Marcelino González, 1943- ）将其七十余幅画作授权项目组使用，其中二十余幅集中展示16世纪西班牙探索太平洋相关的人物和船只，将结集成“波涛中的面孔”主题线上展览。这些人物中，有著名航海家如麦哲伦、德雷克这些英雄式的“明星”，也包括不甚里程碑式、传奇性的探险家——但回到历史现场，其“征服”世界上最后一片未知大洋的勇气和智慧依然令人钦佩。画作参照这些历史人物最有名的油画、版画，通过再创作，以相对统一的尺寸、材质（水彩或铅笔）、笔触画成，体现出一位退役海军军官对前辈的理解，对西班牙最辉煌的一段海洋史的回顾。",
					Image: "BoardImage1.jpg",
				},
				{
					Title: "文理共建，深度融合，探索数字人文建设模式",
					Intro:
						"项目团队和人工智能研究院智能系统软件研究中心马郓团队开展紧密合作，共同建设“太平洋丝绸之路档案文献数据库”。项目团队主要负责收集、整理太平洋丝绸之路外文档案文献，人工智能研究院团队师生主要负责技术层面的建设和实施工作，探索出“深度融合，适度交叉，有序推进，互相成就”的数字人文建设模式。",
					Image: "BoardImage2.jpg",
				},
				{
					Title: "课题组成员参加第五届“文学与图像”学术论坛",
					Intro:
						"2022年1月8—9日，项目组成员参加北京大学第五届“文学与图像”学术论坛并发表论文：《画像与海图：对“中国船”在太平洋文化交流中影响的几点思考》（吴杰伟）、《〈西印度舶来药物史〉第二部分插图研究》（于施洋）、《图绘太平洋：荷兰东印度公司太平洋航路的开辟与航海图绘制》（谢侃侃）、《蒙昧的帝国：Bik 海参采捕图与荷兰殖民知识焦虑，1814—1824》（徐冠勉）。",
					Image: "BoardImage3.jpg",
				},
			],
		};
	},
    methods: {
        GoBoard(index){
            this.$router.push({
                path: '/LatestBoard',
                query: {
                    BoardIndex: index,
                },
            })
        },
    },
    mounted() {
		this.$store.dispatch("GetHeaderIndex", 2);
        this.$store.dispatch("GetLineIndex", 1);
	},
};
</script>

<style scoped>
.BoardContainer {
	position: relative;
	width: 80vw;
	height: auto;
	/* background: skyblue; */
	left: 0;
	right: 0;
	margin: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.BoardItem{
    position: relative;
    width: 80vw;
    height: 14vw;
    min-height: 100px;
    margin-bottom: 30px;
    /* background: red; */
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}
.BoardItemImageContainer{
    position: relative;
    width: 10vw;
    height: 10vw;
}
.BoardItemImage{
    padding-bottom: 100%;
}
.BoardItemText{
    position: relative;
    width: 63vw;
    height: 10vw;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.BoardItemTitle{
    font-size: 20px;
    line-height: 200%;
    font-weight: bold;
    /*最多显示一行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.BoardItemIntro{
    font-size: 16px;
    line-height: 200%;

    /*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>