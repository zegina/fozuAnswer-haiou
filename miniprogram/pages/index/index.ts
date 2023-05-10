// index.ts
Page({
  data: {
    answer: "",
    prompt: "求问佛祖，如何获得心灵上的宁静",
    thinking: false,
  },

  ask() {
    console.log("ask: ", this.data.prompt);
    this.setData({
      thinking: true,
    });
    wx.request({
      url: "https://buddha.vihv.workers.dev",
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      data: {
        ask: this.data.prompt,
      },
      success: (res) => {
        console.log("success", res);
        //保存到本地
        wx.setStorage({
          key: "answer",
          data: res.data,
        });
        this.setData({
          thinking: false,
        });
        wx.navigateTo({
          url: "/pages/answer/answer?prompt=" + this.data.prompt,
        });
      },
      fail: (err) => {
        console.error(err);
        // 提示网络出现错误
        wx.showToast({
          title: "网络出现错误，稍后再试",
          icon: "none",
        });
        this.setData({
          thinking: false,
        });
      },
    });
  },

  changePrompt(e: any) {
    this.setData({
      prompt: e.detail.value,
    });
  },
});
