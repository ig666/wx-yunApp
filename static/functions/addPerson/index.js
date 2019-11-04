const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: event
    })
  } catch(e) {
   return e
  }
}