<template>
    <div id="accredit">
        <button open-type='getUserInfo' plain=true type="primary" @getuserinfo='open'>授权登录</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    open (res) {
      console.log(res)
      wx.cloud.callFunction({
        name: 'getCloudNew',
        data: {
          weRunData: wx.cloud.CloudID(res.target.cloudID), // 这个 CloudID 值到云函数端会被替换
          obj: {
            shareInfo: wx.cloud.CloudID(res.target.cloudID) // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
          }
        }
      }).then(res => {
        console.log(res)
        wx.reLaunch({
          url: `/pages/step/main?images=${res.result.weRunData.data.avatarUrl}&name=${res.result.weRunData.data.nickName}`
        })
      })
    }
  },
  mouted () {
    wx.login()
  }
}
</script>

<style lang="less">
 page {
  height: 100%;
  background-color: #fff;
}
#accredit{
    width: 40%;
    margin :auto;
    height: 100%;
    display: flex;
    align-items: center;
    button{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
}
</style>