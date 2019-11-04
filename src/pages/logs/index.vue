<template>
  <div>
      <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1" >
      <block v-for="(item, index) in imgUrls" :key="index" >
        <swiper-item>
          <image :src="item" mode="scaleToFill" style="width:100%"></image>
        </swiper-item>
      </block>
    </swiper>
    <div id="personList">
      <div v-for="(item,index) of logs" :key="index">
          <div class="interval">这是间隔</div>
          <view class="section section_gap">
      <view class="section__title">是否开启隐藏吐槽:</view>
      <switch  :checked='item.switch'/>
    </view>
    <view class="section">
      <view class="section__title">姓名:</view>
      <input class="personInput"  placeholder="please input here" :value='item.name' maxlength=12 />
    </view>
    <view class="section section_gap">
      <view class="section__title">性别</view>
      <radio-group  @change="radioChange">
        <label><radio value="1" :checked="item.gender==='1'"/>男</label>
        <label><radio value="2" :checked="item.gender==='2'"/>女</label>
      </radio-group>
    </view>
      <view class="section">
      <view class="section__title">手机号:</view>
      <input class="personInput"  placeholder="please input here" :value='item.phone' maxlength=12 />
    </view>
        </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      logs: [],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
    }
  },

  onShow () {
    wx.cloud.callFunction({ name: 'getPerson' }).then(res => {
      this.logs = res.result.data
    })
  }
}
</script>

<style scoped>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
#personList{
  position: relative;
}
.section{
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
  padding: 13px 10px;
  margin-top: 30px;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-bottom: 30px;
}
.section>view{
  margin-right: 20px;
}
.btn-area{
  margin-top: 40px;
}
.interval{
  width: 100%;
  height: 40px;
  background-color: #FF7B8D;
  text-align: center;
  line-height: 40px;
}
</style>
