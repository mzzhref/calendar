import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import ConnectionLine from '@/components/ConnectionLine'

Vue.use(Router)

export default new Router({
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
