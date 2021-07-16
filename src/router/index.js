import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//应使用懒加载
const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const search = r => require.ensure([], () => r(require('@/components/search')), 'search');
const logon = r => require.ensure([], () => r(require('@/components/logon')), 'logon');
const rate_table = r => require.ensure([], () => r(require('@/components/rate_table')), 'rate_table');
const get_url = r => require.ensure([], () => r(require('@/components/get_url')), 'get_url');
const comment = r => require.ensure([], () => r(require('@/components/comment')), 'comment');


const routes = [
  {
    path: '/',
    name: 'search',
    component: search,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/logon',
    name: 'logon',
    component: logon,
  },
  {
    path: '/rate_table',
    name: 'rate_table',
    component: rate_table,
  },
  {
    path: '/get_url',
    name: 'get_url',
    component: get_url,
  },
  {
    path: '/comment',
    name: 'comment',
    component: comment,
  }
]

const router = new Router({
  routes,
  mode: 'history'
});



//导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router
