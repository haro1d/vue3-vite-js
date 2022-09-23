import { createRouter,createWebHistory} from 'vue-router';
 
const router = createRouter({
    routes: [
        {
            path: '/',             
            component:()=>import('@/views/page1.vue'), 
            name: 'index',
        },
 
    ],
    history: createWebHistory()
})

export default router;