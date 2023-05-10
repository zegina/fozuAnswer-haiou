// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    // answer: '',
    prompt: '求问佛祖，如何获得心灵上的宁静',
  },

  ask() {
    console.log('ask: ', this.data.prompt)
    this.setData({
      answer: '佛祖正在思考...'
    })
    wx.request({
      url: 'https://buddha.vihv.workers.dev',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        ask: this.data.prompt
      },
      success: (res) => {
        console.log('success',res)
        // this.setData({
        //   answer: res.data as string
        // })
        wx.navigateTo({
          url: '/pages/answer/answer?prompt=' + this.data.prompt,
        })
        //保存到本地
        wx.setStorage({
          key: 'answer',
          data: res.data,
        })
      },
      fail: (err) => {
        console.error(err)
        // 提示网络出现错误
        wx.showToast({
          title: '网络出现错误，稍后再试',
          icon: 'none'
        })
      }
    })
   

  },

  changePrompt(e: any) {
    this.setData({
      prompt: e.detail.value
    })
  },
  
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
