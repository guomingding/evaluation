import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Instrctions from '@/views/Instructions'
import Training from '@/views/Training'
import Questionnaire from '@/views/Questionnaire'
import Baseline1 from '@/views/Baseline1'
import VisualizationTraining from '@/views/VisualizationTraining'
import Baseline2 from '@/views/Baseline2'
import Visualization from '@/views/Visualization'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/instructions1',
      name: 'Ins1',
      component: Instrctions
    },
    {
      path: '/instructions2',
      name: 'Ins2',
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
    },
    {
      path: '/baseline1',
      name: 'Baseline1',
      component: Baseline1
    },
    {
      path: '/baseline2',
      name: 'Baseline2',
      component: Baseline2
    },
    {
      path: '/vis_training',
      name: 'VisualizationTraining',
      component: VisualizationTraining
    },
    {
      path: '/visualization',
      name: 'Visualization',
      component: Visualization
    }
  ]
})
