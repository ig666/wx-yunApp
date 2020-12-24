<template>
  <div>
    <div style="margin-top: 300rpx;"></div>
    <view class="map_container">
      <!--定义页面结构，可以使用地图组件也能使用其他组件 -->
    </view>
    <!-- <txv-video vid="e0354z3cqjp" playerid="txv1"></txv-video> -->
    <div id="Addpage">
      <form @submit="formSubmit">
        <view class="section section_gap">
          <view class="section__title">是否开启隐藏吐槽:</view>
          <switch
            name="switch"
            :checked="form.switchChecked"
          />
        </view>
        <view class="section">
          <view class="section__title">姓名:</view>
          <input
            class="personInput"
            name="name"
            placeholder="please input here"
            :value="form.name"
            maxlength="12"
          />
        </view>
        <view class="section section_gap">
          <view class="section__title">性别</view>
          <radio-group
            name="gender"
            @change="radioChange"
          >
            <label>
              <radio
                value="1"
                :checked="!isSure"
              />男 </label>
            <label>
              <radio
                value="2"
                :checked="isSure"
              />女 </label>
          </radio-group>
        </view>
        <view class="section">
          <view class="section__title">手机号:</view>
          <input
            class="personInput"
            name="phone"
            placeholder="please input here"
            :value="form.phone"
            maxlength="12"
          />
        </view>
        <view class="btn-area">
          <button
            style="margin-bottom: 20px;"
            formType="submit"
          >确认</button>
        </view>
      </form>
    </div>
  </div>
</template>

<script>
var amapFile = require('../../libs/amap-wx')
export default {
  data () {
    return {
      id: '',
      isSure: false,
      form: {
        switchChecked: false,
        name: '',
        phone: '',
        gender: '1'
      }
    }
  },

  methods: {
    radioChange (e) {
      if (e.target.value === '1') {
        this.form.gender = '1'
      } else if (e.target.value === '2') {
        this.form.gender = '2'
      }
    },
    formSubmit (e) {
      wx.cloud
        .callFunction({
          name: 'addPerson',
          data: e.target.value
        })
        .then((res) => {
          console.log(res, 'yun')
          if (res.result.errCode !== -1) {
            wx.showToast({
              title: '新增成功',
              duration: 7000,
              mask: true,
              icon: 'success',
              success (res) {
                wx.hideToast()
                wx.switchTab({
                  url: '/pages/logs/main'
                })
              }
            })
          }
        })
    }
  },
  mounted () {
    console.log('xxxxx')
    // var that = this
    var myAmapFun = new amapFile.AMapWX({ key: '高德Key' })
    myAmapFun.getPoiAround({
      success: function (data) {
        console.log('高德数据', data)
        // 成功回调
      },
      fail: function (info) {
        // 失败回调
        console.log(info)
      }
    })
    // // 1. 获取数据库引用
    // const db = wx.cloud.database()
    // // 2. 构造查询语句
    // // collection 方法获取一个集合的引用
    // // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // // get 方法会触发网络请求，往数据库取数据
    // db.collection('user').get({
    //   success: function (res) {
    //     // res.data 包含该记录的数据
    //     console.log(res)
    //   }
    // })
  }
}
</script>

<style scoped>
#Addpage {
  position: relative;
}

.map_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.section {
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
  padding: 13px 10px;
  margin-top: 30px;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-bottom: 30px;
}

.section > view {
  margin-right: 20px;
}

.btn-area {
  margin-top: 40px;
}
</style>
