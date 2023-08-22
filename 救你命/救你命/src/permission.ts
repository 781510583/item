import router from './router'
import Nprogress from 'nprogress';
import "nprogress/nprogress.css"
import pinia from '@/store'
import useUserstore from './store/modules/user';
import { log } from 'console';
import { ElMessage } from 'element-plus';
let whiteList = ["/home", '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];
Nprogress.configure({ showSpinner: false });
let userstore = useUserstore(pinia)
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    Nprogress.start();
    document.title = `救你狗命 - ${to.meta.title}`
    // let token = userstore.userinfo.value.token  
    // console.log(userstore.userinfo.value.token);
    if (userstore.userinfo.value) {
        next()
    } else {
        if (whiteList.includes(to.path)) {            
            next()
        } else {
            console.log(1);
            ElMessage({
                type:'error',
                message:'请先登录'
            })
            userstore.visiable = true;
            router.push('/home')
        }
        
    }
})
router.afterEach((to, from) => {
    // to and from are both route objects.
    Nprogress.done();
})