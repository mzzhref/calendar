import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import ConnectionLine from '@/components/ConnectionLine'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: Calendar,
      meta: {
        title: '日历'
      }
    },
    {
      path: '/ConnectionLine',
      name: 'ConnectionLine',
      component: ConnectionLine,
      meta: {
        title: '连线'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

export default router;
