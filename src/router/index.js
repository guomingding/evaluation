import Vue from 'vue'
import Router from 'vue-router'

import BaseSub1_training from '@/views/BaseSub1_training'
import BaseSub2_training from '@/views/BaseSub2_training'
import BaseSub1_task from '@/views/BaseSub1_task'
import BaseSub2_task from '@/views/BaseSub2_task'

import VisSub1_training from '@/views/VisSub1_training'
import VisSub2_training from '@/views/VisSub2_training'
import VisSub1_task from '@/views/VisSub1_task'
import VisSub2_task from '@/views/VisSub2_task'

import BaselineIntro from '@/views/BaselineIntro'
import VisualizationIntro from '@/views/VisualizationIntro'

import Questionnaire from '@/views/Questionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'BaseSub1_training',
      component:BaseSub1_training
    },
    {
      path:'/baseline',
      name:'BaselineIntro',
      component:BaselineIntro
    },
    {
      path:'/visualization',
      name:'VisualizationIntro',
      component:VisualizationIntro
    },
    {
      path:'/base_sub1_training',
      name:'BaseSub1_training',
      component:BaseSub1_training
    },
    {
      path:'/base_sub2_training',
      name:'BaseSub2_training',
      component:BaseSub2_training
    },
    {
      path:'/base_sub1_task',
      name:'BaseSub1_task',
      component:BaseSub1_task
    },
    {
      path:'/base_sub2_task',
      name:'BaseSub2_task',
      component:BaseSub2_task
    },

    
    {
      path:'/vis_sub1_training',
      name:'VisSub1_training',
      component:VisSub1_training
    },
    {
      path:'/vis_sub2_training',
      name:'VisSub2_training',
      component:VisSub2_training
    },
    {
      path:'/Vis_sub1_task',
      name:'VisSub1_task',
      component:VisSub1_task
    },
    {
      path:'/vis_sub2_task',
      name:'VisSub2_task',
      component:VisSub2_task
    },
    {
      path:'/survey',
      name:'Questionnaire',
      component:Questionnaire
    }
  ]
})
