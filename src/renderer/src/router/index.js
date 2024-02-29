import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 打开应用跳转到登录页
    {
      path: '/',
      name: 'login',
      component: () => import('/src/views/LoginView/LoginView.vue')
    },
    // 登录成功跳转首页
    {
      path: '/startVideo',
      name: 'startVideo',
      component: () => import('../views/StartVideoView/StartVideoView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView/HomeView.vue'),
      children: [
        // 大屏
        {
          path: 'screen',
          name: 'screen',
          component: () => import('../views/HomeView/ScreenView/ScreenView.vue')
        },
        // 数字孪生
        // {
        //   path: 'digital_twin',
        //   name: 'digital_twin',
        //   component: () => import('../views/secondViews/DigitalTwinView.vue'),
        //   children: [
        //     {
        //       path: 'digital_twin__beam_1',
        //       name: 'digital_twin__beam_1',
        //       component: () => import('../views/thirdViews/DigitalTwinBeamView.vue')
        //     },
        //     {
        //       path: 'locked',
        //       name: 'locked',
        //       component: () => import('../views/LockedView.vue')
        //     }
        //   ]
        // },
        // 设备管理
        {
          path: 'equip',
          name: 'equip',
          component: () => import('../views/HomeView/EquipView/EquipView.vue'),
          children: [
            // 模板
            {
              path: 'equip__template',
              name: 'equip__template',
              component: () => import('../views/HomeView/EquipView/EquipTemplateView/EquipTemplateView.vue')
            },
            // 蒸养棚
            {
              path: 'equip__steam',
              name: 'equip__steam',
              component: () => import('../views/HomeView/EquipView/EquipSteamView/EquipSteamView.vue')
            },
            // // 监控
            // {
            //   path: 'equip__monitor',
            //   name: 'equip__monitor',
            //   component: () => import('../views/thirdViews/EquipMonitorView.vue')
            // },
            // 拌合站
            {
              path: 'equip__mix_station',
              name: 'equip__mix_station',
              component: () => import('../views/HomeView/EquipView/EquipMixView/EquipMixView.vue')
            },
            {
              path:'equip__gas',
              name:'equip__gas',
              component: () => import('../views/HomeView/EquipView/EquipGasView/EquipGasView.vue')
            },
            {
              path: 'locked',
              name: 'locked',
              component: () => import('../views/LockedView/LockedView.vue')
            }
          ]
        },
        // 生产数据
        {
          path: 'production',
          name: '生产数据',
          component: () => import('../views/HomeView/ProductionView/ProductionView.vue'),
          children: [
            {
              path: 'production__beam',
              name: '梁片数据',
              component: () => import('../views/HomeView/ProductionView/ProductionBeamView/ProductionBeamView.vue')
            },
            {
              path: 'production__beam_plan',
              name: '梁片计划排程',
              component: () => import('../views/HomeView/ProductionView/ProductionPlanView/ProductionPlanView.vue')
            },
            {
              path: 'locked',
              name: 'locked',
              component: () => import('../views/LockedView/LockedView.vue')
            }
          ]
        },
        // 安全
        {
          path: 'security',
          name: 'security',
          component: () => import('../views/HomeView/SecurityView/SecurityView.vue'),
          children: [
            {
              path: 'security__ai_camera',
              name: 'security__ai_camera',
              component: () => import('../views/HomeView/SecurityView/SecurityCameraView/SecurityCameraView.vue')
            },
            {
              path: 'locked',
              name: 'locked',
              component: () => import('../views/LockedView/LockedView.vue')
            }
          ]
        },
        // AI问答
        {
          path: 'ai',
          name: 'ai',
          component: () => import('../views/HomeView/AIQAView/AIQAView.vue'),
          children: [
            {
              path: 'ai__production',
              name: 'ai__production',
              component: () => import('../views/HomeView/AIQAView/AIProductionView/AIProductionView.vue')
            },
            {
              path: 'ai__knowledge',
              name: 'ai__knowledge',
              component: () => import('../views/HomeView/AIQAView/AIEngineerView/AIEngineerView.vue')
            },
            {
              path: 'locked',
              name: 'locked',
              component: () => import('../views/LockedView/LockedView.vue')
            }
          ]
        },
        // 设置页面
        {
          path: 'setting_menu',
          name: 'setting_menu',
          component: () => import('../views/HomeView/SettingMenuView/SettingMenuView.vue'),
          children: [
            {
              path: 'set_base__screen',
              name: 'set_base__screen',
              component: () => import('../views/HomeView/SettingMenuView/SetBaseScreenView/SetBaseScreenView.vue')
            },
            {
              path: 'set_equip__template',
              name: 'set_equip__template',
              component: () => import('../views/HomeView/SettingMenuView/SetEquipTemplateView/SetEquipTemplateView.vue')
            },
            {
              path:'set_equip__steam',
              name:'set_equip__steam',
              component: () => import('../views/HomeView/SettingMenuView/SetEquipSteamView/SetEquipSteamView.vue')
            }
          ]
        }
      ]
    },
    // 通配符路由，用于捕获所有未匹配的路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home/equip/equip__template'
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   const path = to.path.split('/')
//   // console.log(userStore.userData.locked_menu_list, '锁定路由列表')
//   console.log('即将进入的path', path)
//   // 检查即将进入的路由是否是受限的
//   if (userStore.userData.locked_menu_list.includes(path[3])) {
//     const lockedPath = '/' + path[1] + '/' + path[2] + '/locked'
//     console.log('受限路由', lockedPath)
//     // 如果是，重定向到新页面
//     next(lockedPath)
//   } else {
//     // 如果不是，正常导航
//     // console.log('正常导航')
//     next()
//   }
// })

export default router
