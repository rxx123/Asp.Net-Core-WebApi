import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Form from '@/components/Form'
import Home from '@/components/Home'
import DrawingShow from '@/components/drawing/DrawingShow'
import DrawingSearch from '@/components/drawing/DrawingSearch'
import EquipmentLedger from '@/components/equipment/EquipmentLedger'
import EquipmentOverhaul from '@/components/equipment/EquipmentOverhaul'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      hidden:true,
      component: Login
    },
    {
      path: '/Form',
      name: 'Form',
      hidden:true,
      component: Form
    },
    {
      path: '/Home',
      name: 'Home',
      hidden:true,
      component: Home
    },
    {
      path: '/',
      component: Home,
      name: '图纸管理',
      iconCls: 'el-icon-s-platform', // 图标样式class
      children: [
        { 
          path: '/DrawingShow', 
          component: DrawingShow, 
          name: '图纸显示'
        },
        { path: '/DrawingSearch', component: DrawingSearch, name: '图纸检索' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设备管理',
      iconCls: 'el-icon-s-shop',
      children: [
        { path: '/EquipmentLedger', component: EquipmentLedger, name: '设备台账管理' },
        { path: '/EquipmentOverhaul', component: EquipmentOverhaul, name: '设备检修管理' },
        { path: '/page6', component: Home, name: '设备养护管理' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '检修作业',
      iconCls: 'el-icon-s-cooperation',
      children: [
        { path: '/page7', component: Home, name: '作业指导与部署' },
        { path: '/page8', component: Home, name: '检修作业计划' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '故障处置',
      iconCls: 'el-icon-s-open',
      children: [
        { path: '/page9', component: Home, name: '故障处置管理' },
        { path: '/page10', component: Home, name: '故障处置查询' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      iconCls: 'el-icon-s-tools',
      children: [
        { path: '/page11', component: Home, iconCls: 'el-icon-user-solid',name: '用户管理' },
        { path: '/page12', component: Home, name: '权限管理' },
        { path: '/page13', component: Home, name: '基础信息管理' }
      ]
    }
  ]
})
