import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Instrctions from '@/views/Instructions'
import Training from '@/views/Training'
import Questionnaire from '@/views/Questionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/instructions',
      name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/instructions',
      name: 'Ins',
      component: Instrctions
    },
    {
      path: '/training',
      name: 'Training',
      component: Training
    },
    {
      path: '/survey',
      name: 'Survey',
      component: Questionnaire
    }
  ]
})
