const app = getApp();
const lessonTmplId = '';

Page({
  onSubscribe: function(e) {
    let date = new Date(Date.parse(new Date())+5000);
    const item = {
      thing1: {
        value: this.text
      },
      date2: {
        value: this.formdate(date)
      }
    }
    wx.requestSubscribeMessage({
      tmplIds: [lessonTmplId],
      success(res) {
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          wx.showLoading({
            title: '订阅中',
            mask:true
          })
          wx.cloud.callFunction({
            name: 'subscribe',
            data: {
              data: item,
              date: date,
              templateId: lessonTmplId,
            },
          }).then(() => {
            wx.hideLoading();
            wx.showToast({
              title: '订阅成功'
            });
          }).catch(() => {
            wx.showToast({
              title: '订阅失败',
              icon: 'none'
            });
          });
        }
      },
      fail(e){
        console.log(e)
      }
    });
  },
  textin(e){
    this.text = e.detail.value;
  },
  formdate(date){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date1 = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return year + "年" + month + "月" + date1 + "日 " + hour + ":" + minutes;
  }
});
