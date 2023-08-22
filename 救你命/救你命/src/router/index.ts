import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/home/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/hospital',
            name: 'hospital',
            component: () => import('@/pages/hospital/index.vue'),
            meta: {
                title: '医院'
            },
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospital/register/index.vue'),
                    meta: {
                        title: '预约挂号'
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospital/detail/index.vue'),
                    meta: {
                        title: '医院详情'
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospital/notice/index.vue'),
                    meta: {
                        title: '预约通知'
                    }
                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospital/close/index.vue'),
                    meta: {
                        title: '停诊信息'
                    }
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hospital/search/index.vue'),
                    meta: {
                        title: '查询'
                    }
                },
                {
                    path: 'register_step1',
                    component: () => import('@/pages/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约挂号'
                    }
                },
                {
                    path: 'register_step2',
                    component: () => import('@/pages/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约挂号'
                    }
                },
            ]
        },
        {
            path: '/wxlogin',
            component: () => import('@/pages/wxlogin/index.vue'),
            meta:{
                title:'微信登陆'
            }
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/user',
            name: 'user',
            meta:{
                title:'用户信息'
            },
            component: () => import('@/pages/user/index.vue'),
            children: [
                {
                    path: 'certification',
                    component: () => import('@/pages/user/certification/index.vue'),
                    meta: {
                        title: '实名认证'
                    }
                },
                {
                    path: 'order',
                    component: () => import('@/pages/user/order/index.vue'),
                    meta: {
                        title: '挂号订单'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                    meta: {
                        title: '意见反馈'
                    }
                },
                {
                    path: 'patient',
                    component: () => import('@/pages/user/patient/index.vue'),
                    meta: {
                        title: '就诊人管理'
                    }
                },
                {
                    path: 'profile',
                    component: () => import('@/pages/user/profile/index.vue'),
                    meta: {
                        title: '账号信息'
                    }
                },
            ]
        }
    ]

})