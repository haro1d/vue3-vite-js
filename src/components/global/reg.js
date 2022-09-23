//注册全局组件
/*  单个注册：
import has from '@/components/global/has'
Vue.component('has',has)
*/
export default {
    install(Vue){
        /*webpack写法
        let allCom = require.context('./', false, /\.vue$/) 
        */
        let allCom =import.meta.globEager('./*.vue')
        console.log("allCom",allCom);
        Object.keys(allCom).forEach((item,index) => {
            console.log("item",item,"allCom[index]",allCom[item]);
            Vue.component(item.replace(/\.\//,'').replace(/\.vue$/,''),allCom[item].default)
        });
    }
}