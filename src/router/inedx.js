import vue from 'vue'
import vueRouter from 'vue-router'
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Detail = () => import('../views/detail/Detail.vue')
vue.use(vueRouter)
const routes=[
  {
    path: '/',
    redirect:'/home'
  },
  {
  path:'/home',
  component:Home
  },
  {
     path:'/category',
     component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
   path:'/profile',
   component:Profile 
  },
  { 
  path:'/detail/:iid',
  component:Detail
 }
]
const router = new vueRouter({
  routes,
  mode:'history'
})
export default router