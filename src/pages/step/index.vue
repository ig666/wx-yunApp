<template>
    <div id="step">
        <div class="person-detail">
            <img :src="personData.personImage" alt="" class="person-image">
            <div>步数排行</div>
            <div>{{personData.personName}}</div>
        </div>
        <ul class="day-stpes">
            <li v-for="(item,index) of stepArr" :key="index" class="day-stpe">
                <p><span>步数:</span>{{item.step}}</p>
                <p><span>日期:</span>{{item.timestamp}}</p>
            </li>
        </ul>
        <button @click="sureNews">订阅</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      personData: {
        personImage: '',
        personName: ''
      },
      stepArr: []
    }
  },
  methods: {
    sureNews () {
      console.log('xx')
      wx.requestSubscribeMessage({
        tmplIds: ['r-BVxuVYipriAobuo8uxtpP-K8VUAX0Sjubwvm8ONUs'],
        success (res) {
          console.log(res, '模板信息')
        }
      })
    }
  },
  mounted () {
    wx.getWeRunData({
      success: (res) => {
        const cloudID = res.cloudID
        wx.cloud.callFunction({
          name: 'getCloudNew',
          data: {
            weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
            obj: {
              shareInfo: wx.cloud.CloudID(cloudID) // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
            }
          }
        }).then(res => {
          let arr = res.result.weRunData.data.stepInfoList.map(item => {
            var dateTime = new Date(parseInt(item.timestamp) * 1000)
            var month = dateTime.getMonth() + 1
            var day = dateTime.getDate()
            item.timestamp = month + '-' + day
            return item
          })
          arr.sort((a, b) => b.step - a.step)
          this.stepArr = arr
        })
      }
    })
  },
  onLoad (option) {
    this.personData.personImage = option.images
    this.personData.personName = option.name
  },
  beforeMount () {
    // wx.startSoterAuthentication({
    //   requestAuthModes: ['fingerPrint'],
    //   challenge: '123456',
    //   authContent: '请用指纹解锁',
    //   success (res) {
    //     console.log(res, '指纹解锁')
    //   }
    // })
  },
  onPullDownRefresh () {
    wx.getWeRunData({
      success: (res) => {
        const cloudID = res.cloudID
        wx.cloud.callFunction({
          name: 'getCloudNew',
          data: {
            weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
            obj: {
              shareInfo: wx.cloud.CloudID(cloudID) // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
            }
          }
        }).then(res => {
          let arr = res.result.weRunData.data.stepInfoList.map(item => {
            var dateTime = new Date(parseInt(item.timestamp) * 1000)
            var month = dateTime.getMonth() + 1
            var day = dateTime.getDate()
            item.timestamp = month + '-' + day
            return item
          })
          arr.sort((a, b) => b.step - a.step)
          this.stepArr = arr
          wx.stopPullDownRefresh()
        })
      }
    })
  }
}
</script>

<style lang="less">
    #step{
        .person-detail{
            margin:10px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #FFB73A;
            border-radius: 30px;
            .person-image{
                width: 50px;
                height: 50px;
            }
        }
        .day-stpes{
            padding: 20px 40px;
            .day-stpe{
                &:first-child{
                    color: #FFB73A;
                }
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding: 20px;
                height:17px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                line-height:17px;
                border-bottom: 1px solid #E6E6E6;
                p{
                    min-width: 70px;
                    text-align: left;
                }
            }
        }
    }
</style>