<template>
	<div class="ExhibitionLogoContainer">
        <Exhibition01 v-if="ExhibitionID === '9' || ExhibitionID === '10' || ExhibitionID === '11' || ExhibitionID === '12' || ExhibitionID === '13'" />
    </div>
</template>

<script>
import Exhibition01 from "./Exhibition01";
export default {
	name: "ExhibitionLogo",
    components: {
        Exhibition01,
    },
	data() {
		return {
            ExhibitionID: "",
        };
	},
    mounted() {
        this.ExhibitionID = this.$route.query.ExhibitionID;
    },
};
</script>

<style scoped>
.ExhibitionLogoContainer {
    position: relative;
    width: 100vw;
    height: 210vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>