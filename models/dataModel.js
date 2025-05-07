const db = require('../config/firebase');

exports.create = async (collection, data) => {
  const ref = db.ref(collection).push();
  await ref.set({ ...data, id: ref.key, createdAt: Date.now() });
  return { id: ref.key, ...data };
};

exports.readAll = async (collection) => {
  const snapshot = await db.ref(collection).once('value');
  return snapshot.val() || {};
};

exports.readOne = async (collection, id) => {
  const snapshot = await db.ref(`${collection}/${id}`).once('value');
  return snapshot.val();
};

exports.update = async (collection, id, data) => {
  await db.ref(`${collection}/${id}`).update(data);
  return { id, ...data };
};

exports.remove = async (collection, id) => {
  await db.ref(`${collection}/${id}`).remove();
  return { id, deleted: true };
};
