import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
// const MD5 = require('./utils/MD5')
const app = new Vue(App)
// const stringSignTemp = '12312323423'
// let sign = MD5.b64Md5(stringSignTemp)
app.$mount()
wx.cloud.init({
  traceUser: true
})
