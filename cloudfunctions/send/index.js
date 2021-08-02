const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    let now = new Date();
    const messages = await db.collection('messages').where({
        done: false,
        date: _.lt(now)
      }).get();

    const sendPromises = messages.data.map(async message => {
      try {
        await cloud.openapi.subscribeMessage.send({
          touser: message.touser,
          page: message.page,
          data: message.data,
          templateId: message.templateId,
        });
        return db.collection('messages').doc(message._id).update({
            data: {
              done: true,
            },
          });
      } catch (e) {
        return e;
      }
    });
    return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
};
