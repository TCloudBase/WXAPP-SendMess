# 【待办事项提醒小程序】小程序云开发项目实战

## 项目介绍
功能非常简单的上手小程序项目，填写事项提醒并订阅，在5秒钟后发送消息提醒。

能力包括：使用云调用发送订阅消息，定时触发器的使用，延时调用云函数

## 部署步骤
此处为项目完整代码，可以直接部署使用；

- 初始化云开发环境，如果有多个云开发环境造成wx.cloud.init错误，则在app.js处进行环境定义。
- 在云开发环境中创建一个数据库，名称为messages
- 前往微信小程序平台，选择类别【工具-效率】，然后申请订阅消息模板，模板名称为【待办事项提醒】，编号4630，选择「提醒」「截止日期」
- 将申请到的模板ID复制到miniprogram/pages/index/index.js文件的第2行，lessonTmplId后面
- 将cloudfunctions文件夹内的2个云函数创建并部署，并将send云函数上传触发器
- 如果你想体验延时触发，请前往cloudfunction/subscribe/index.js，解除第21行-16行注释，并删除send函数的定时触发器。

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
