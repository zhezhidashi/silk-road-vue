import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let OriginPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        OriginPush.call(this, location, resolve, reject);
    }
    else{
        OriginPush.call(this, location, ()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        OriginReplace.call(this, location, resolve, reject);
    }
    else{
        OriginReplace.call(this, location, ()=>{}, ()=>{});
    }
}

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        redirect: '/Home',
        children: [
            {
                path: '/Home',
                name: 'Home',
                meta: {
                    title: '主页'
                },
                component: () => import('../views/Home/index.vue')
            },
            {
                path: '/WebIntro',
                name: 'WebIntro',
                meta: {
                    title: '网站简介'
                },
                component: () => import('../views/WebIntro/index.vue')
            },
            {
                path: '/LatestBoard',
                name: 'LatestBoard',
                meta: {
                    title: '最新内容'
                },
                component: () => import('../views/LatestBoard')
            },
            {
                path: '/ExhibitionList',
                name: 'ExhibitionList',
                meta: {
                    title: '线上展览列表'
                },
                component: () => import('../views/Exhibition/ExhibitionList.vue')
            },
            {
                path: '/ExhibitionGalleryList',
                name: 'ExhibitionGalleryList',
                meta: {
                    title: '线上展览-相册列表'
                },
                component: () => import('../views/Exhibition/ExhibitionGalleryList.vue')
            },
            {
                path: '/ExhibitionGallery',
                name: 'ExhibitionGallery',
                meta: {
                    title: '线上展览-相册内容'
                },
                component: () => import('../views/Exhibition/ExhibitionGallery')
            },
            {
                path: '/AcademicActivityList',
                name: 'AcademicActivityList',
                meta: {
                    title: '学术活动列表'
                },
                component: () => import('../views/AcademicActivity/AcademicActivityList.vue')
            },
            {
                path: '/AcademicActivityDetails',
                name: 'AcademicActivityDetails',
                meta: {
                    title: '学术活动详情'
                },
                component: () => import('../views/AcademicActivity/AcademicActivityDetails.vue')
            },
            {
                path: '/MajorEvent',
                name: 'MajorEvent',
                meta: {
                    title: '大事记'
                },
                component: () => import('../views/MajorEvent/index.vue')
            },
            {
                path: '/ContactUs',
                name: 'ContactUs',
                meta: {
                    title: '联系我们'
                },
                component: () => import('../views/ContactUs/index.vue')
            },
            {
                path: '/ArchiveList',
                name: 'ArchiveList',
                meta: {
                    title: '档案列表'
                },
                component: () => import('../views/Archive/ArchiveList.vue')
            },
            {
                path: '/ArchiveDetails',
                name: 'ArchiveDetails',
                meta: {
                    title: '档案详情'
                },
                component: () => import('../views/Archive/ArchiveDetails.vue')
            },
        ]
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('../view/Login/index.vue')
    // }


]


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router