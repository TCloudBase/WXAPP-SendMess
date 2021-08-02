const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const result = await db.collection('messages').add({
      data: {
        touser: event.userInfo.openId,
        page: 'index',
        data: event.data,
        templateId: event.templateId,
        date: new Date(event.date),
        done: false,
      },
    });
    /* 有两种方式发送，一种是以下，在约定时间发起云函数调用去发送
       第二种是定时触发器，将send云函数每隔一段时间执行一次，看看有发送任务不 */
    // await cloud.openapi.cloudbase.addDelayedFunctionTask({
    //   env: context.namespace,
    //   data: JSON.stringify({}), // 可以取消数据库中转，通过直接传参来发送
    //   functionName: 'send',
    //   delayTime: 6
    // })
    return result
  } catch (err) {
    console.log(err);
    return err;
  }
};
