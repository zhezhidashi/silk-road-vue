<template>
	<div class="background" style="background: #efefef">
		<!--    标题-->
		<p class="academic_activity_title">学术活动</p>

		<!--一排一排陈列图片-->
		<div class="list_images" id="academic_activity_images">
			<div v-for="item in academic_activity_images_src" :key='item.academic_activity_id'>
				<!--把每一块img、时间、简介都包装成一个container-->
				<div
					@mousedown="
						academic_activity_images_btn(
							$event,
							item.academic_activity_id
						)
					"
					@mouseover="
						academic_activity_mouseover(
							$event,
							item.academic_activity_id
						)
					"
					@mouseleave="
						academic_activity_mouseleave(
							$event,
							item.academic_activity_id
						)
					"
					class="academic_activity_images_container"
					:id="
						'academic_activity_images_container_' +
						item.academic_activity_id
					"
				>
					<!--图片-->
					<div class="academic_activity_images_img_container">
						<img
							:src="item.src"
							class="academic_activity_images_img"
							:id="
								'academic_activity_images_img_' +
								item.academic_activity_id
							"
						/>
					</div>

					<!--日期-->
					<div
						class="academic_activity_images_date"
						:id="
							'academic_activity_images_date_' +
							item.academic_activity_id
						"
					>
						{{ item.date }}
					</div>

					<!--图片描述-->
					<div
						class="academic_activity_images_text"
						:id="
							'academic_activity_images_text_' +
							item.academic_activity_id
						"
					>
						{{ item.description }}
					</div>
				</div>
			</div>
		</div>
        <!-- 这里留一块空的高度，因为后面的flex布局有点影响 Footer 的相对高度 -->
        <div style="position: relative; height: 300px"></div>
	</div>
</template>

<script>
import {getForm} from '../../api/data.js'
export default {
	name: "AcademicActivityList",
	data() {
		return {
			academic_activity_images_src: [
				{
					academic_activity_id: "1",
					src: "../static/images/academic_activity_img_1.png",
					date: "2022-04-01",
					description: "田野调查中的质性研究工具及其应用",
				},
				{
					academic_activity_id: "2",
					src: "../static/images/academic_activity_img_2.png",
					date: "2022-04-13",
					description:
						"祖先作为社会道德资本：新加坡华人与祖乡之间的纽带，祖先作为社会道德资本：新加坡华人与祖乡之间的纽带",
				},
				{
					academic_activity_id: "3",
					src: "../static/images/academic_activity_img_3.png",
					date: "2022-04-20",
					description: "中国剧团在东南亚：跨界、旅行与华人性",
				},
				{
					academic_activity_id: "4",
					src: "../static/images/academic_activity_img_4.png",
					date: "2022-05-13",
					description:
						"选举的反乌托邦：殖民主义中的民主与菲律宾现代性",
				},
				{
					academic_activity_id: "5",
					src: "../static/images/academic_activity_img_5.png",
					date: "2022-05-13",
					description: "海上丝绸之路物种交换研究的历史与现状",
				},
				{
					academic_activity_id: "6",
					src: "../static/images/academic_activity_img_6.png",
					date: "2022-05-18",
					description: "离散法缘：横跨南海之佛教及其现代主义",
				},
			],
		};
	},

    // 生命周期函数，有很多种，created是常用的一种
    // 在页面对应的生命周期自动执行
    created() {

        //http请求
        let url = "/activity/list";

        console.log(url);

        this.academic_activity_images_src = [];

        let inner_this = this; // 别改

        getForm(url, function (res, msg) {
            let data = res.data
            console.log("http-get data is here");
            console.log('data list', data.list);
            for (let item of data.list) {
                console.log('academic item', item)
                let new_map = {
                    'academic_activity_id': item['main_id'].toString(),
                    'src': item['cover_pic'],
                    'date': item['date'],
                    'description': item['title']
                }
                console.log('academic new_map', new_map)
                inner_this.academic_activity_images_src.push(new_map);
            }
        });

        console.log('academic_list', this.academic_activity_images_src)
    },

    // 这里定义方法
    methods: {
        academic_activity_images_btn(event, academic_activity_id) {
            this.$router.push({
                path: '/AcademicActivityDetails',
                query: {
                    academic_activity_id
                }
            })
        },
        //鼠标悬停效果。背景色改为蓝色，文字改为白色
        academic_activity_mouseover(event, academic_activity_id) {
            //修改整个边框和鼠标指针样式
            let now_container = document.querySelector('#academic_activity_images_container_' + academic_activity_id)
            now_container.style.cursor = 'pointer';
            // now_container.style.width = '216px';
            // now_container.style.height = '327px';
            // now_container.style.margin = '5px';
            now_container.style.background = '#023871';


            //修改图片大小
            let now_img = document.querySelector('#academic_activity_images_img_' + academic_activity_id);
            now_img.left = '-15px';
            now_img.top = '-15px';
            now_img.style.width = '216px';
            now_img.style.height = '255px';

            //修改日期文字大小
            // let now_date = document.querySelector('#academic_activity_images_date_' + academic_activity_id);
            // now_date.style.fontSize = '15px';

            //修改图片文字颜色
            let now_text = document.querySelector('#academic_activity_images_text_' + academic_activity_id);
            now_text.style.color = '#FFFFFF';
            // now_text.style.fontSize = '15px';
        },

        academic_activity_mouseleave(event, academic_activity_id) {
            //还原整个边框和鼠标指针样式
            let now_container = document.querySelector('#academic_activity_images_container_' + academic_activity_id)
            now_container.style.cursor = 'default';
            // now_container.style.width = '186px';
            // now_container.style.height = '297px';
            // now_container.style.margin = '20px';
            now_container.style.background = '#FFFFFF';

            //还原图片大小
            let now_img = document.querySelector('#academic_activity_images_img_' + academic_activity_id);
            now_img.left = '0';
            now_img.top = '0';
            now_img.style.width = '186px';
            now_img.style.height = '225px';

            //还原日期文字大小
            // let now_date = document.querySelector('#academic_activity_images_date_' + academic_activity_id);
            // now_date.style.fontSize = '8px';

            //还原图片文字颜色
            let now_text = document.querySelector('#academic_activity_images_text_' + academic_activity_id);
            now_text.style.color = '#000000';
            // now_text.style.fontSize = '8px';
        },
    },
};
</script>

<style>
.nav_bar_underline {
	visibility: visible;
	left: 577px;
	top: 45px;
}

/*标题*/
.academic_activity_title {
	position: absolute;
	left: 441px;
	top: 135px;
	font-size: 22px;
	line-height: 0;
	color: #023871;
}
/*存放整个页面的数据*/
#academic_activity_images {
	position: relative;
	width: 910px;
	left: 53px;
	top: 212px;
}

/*把每一块img、时间、简介都包装成一个container*/
.academic_activity_images_container {
	position: relative;
	width: 186px;
	height: 297px;
	background: #ffffff;
	margin: 20px;
	box-shadow: 0 3px 3px rgba(159, 158, 158, 0.42);
	border-radius: 0 0 3px 3px;
	overflow: hidden;
}

/* 图片的 container */
.academic_activity_images_img_container {
	position: relative;
	width: 186px;
	height: 225px;
	border-radius: 3px 3px 0 0;
	overflow: hidden;
}

/*图片*/
.academic_activity_images_img {
	position: relative;
	width: 186px;
	height: 225px;
	filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
	border-radius: 3px 3px 0 0;
}

/*图片日期*/
.academic_activity_images_date {
	position: relative;
	margin: 10px;
	font-size: 8px;
	line-height: 30%;
	color: #919191;
}

/*图片简介*/
.academic_activity_images_text {
	position: relative;
	margin: 10px;
	font-size: 8px;
	line-height: 120%;
	color: #000000;

	/*最多显示两行文字，否则就是省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>