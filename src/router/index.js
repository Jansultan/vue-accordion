import VueRouter from 'vue-router'

import Main from '../components/main/Main'
import Layout from '../components/main/Layout'
import NotFound from '../pages/404'

export default new VueRouter({
    mode: 'history',
    routes:[{
        path:'/',
        name:'',
        component:Layout,
        children:[{
            path:'/',
            name:'main',
            component:Main
        }]
    },
    {
        path: '*',
        name:'not-found',
        component:NotFound
    }]
})