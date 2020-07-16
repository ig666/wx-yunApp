const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: 'oz4UN5Jqrl_EajaNdFpXQ7TXHcoU',
      page: 'pages/accredit/main',
      data: {
        time1:{
          value: "2019年10月1日 15:01"
        },
        thing2:{
          value: "测试测试车is哈哈磁轭"
        }
      },
      templateId: 'r-BVxuVYipriAobuo8uxtpP-K8VUAX0Sjubwvm8ONUs'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}