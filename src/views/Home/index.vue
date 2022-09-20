<template>
	<div class="background" style="width: 100%; height: auto; background: #023871">
        <!-- 轮播图 -->
        <IndexImage/>
        <IndexBoard/>
		<IndexExhibition/>

		
	</div>
</template>

<script scoped>
import IndexImage from './IndexImage'
import IndexBoard from './IndexBoard'
import IndexExhibition from './IndexExhibition'

export default {
	name: "Home",
    components:{
        IndexImage,
        IndexBoard,
        IndexExhibition
    },
	data() {
		return {
		};
	},
	
	
};
</script>

<style>
.nav_bar_underline {
	visibility: hidden;
}
</style>