<template>
	<div class="background" style="height: 906px; background: #efefef">
		<div class="Heading">联系我们</div>
		<div class="FeedbackContainer">
			<div class="FeedbackInput" style="margin-top: 20px">
				<el-input
					type="textarea"
					autosize
					placeholder="请输入姓名"
					style="width: 28vw; margin-right: 1vw"
					v-model="NameText"
				>
				</el-input>
				<el-input
					type="textarea"
					autosize
					prefix-icon="el-icon-user"
					placeholder="请输入联系方式"
					v-model="ContactText"
					style="width: 28vw; margin-left: 1vw"
				>
				</el-input>
			</div>

			<el-input
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 4 }"
				placeholder="请输入反馈内容"
				v-model="ContentText"
				style="width: 58vw; margin-bottom: 2vh"
				class="FeedbackInput"
			>
			</el-input>

			<div
				class="blue_rectangle_container"
				style="width: 15vw; height: 6vh; margin-bottom: 2vh;"
				@click="SubmitFeedback()"
			>
				提交
			</div>
		</div>
        <img src="底部浪花.svg" class="BottomWave" />
	</div>
</template>

<script>
import { postForm } from "../../api/data";
export default {
	name: "ContactUs",
	data() {
		return {
			NameText: "",
			ContactText: "",
			ContentText: "",
		};
	},
	methods: {
		// 路由回退
		router_go_back() {
			this.$router.push({
				path: "/Home",
			});
		},
		// 提交反馈
		SubmitFeedback() {
			let params = {
				name: this.NameText,
				contact: this.ContactText,
				feedback_content: this.ContentText,
			};
            let _this = this;
            postForm('/feedback/submit', params, (res) => {
                if (res.code == 0) {
                    _this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    _this.NameText = "";
                    _this.ContactText = "";
                    _this.ContentText = "";
                } else {
                    _this.$message({
                        message: '提交失败',
                        type: 'error'
                    });
                }
            });
		},
	},
	mounted() {
		this.$store.dispatch("GetHeaderIndex", 6);
        this.$store.dispatch("GetLineIndex", 1);
	},
};
</script>

<style scoped>
.FeedbackContainer {
	position: relative;
	top: 200px;
	width: 60vw;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border: 1px solid #588cc8;
	border-radius: 7px;
}

.FeedbackInput {
	position: relative;
	margin: 1vh 1vw 1vh 1vw;
	display: flex;
	flex-direction: row;
}
</style>