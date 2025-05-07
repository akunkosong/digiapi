const dataModel = require('../models/dataModel');

exports.create = async (req, res) => {
  const { collection, data } = req.body;
  try {
    const result = await dataModel.create(collection, data);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.readAll = async (req, res) => {
  const { collection } = req.params;
  try {
    const result = await dataModel.readAll(collection);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.readOne = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const result = await dataModel.readOne(collection, id);
    res.status(200).json(result || {});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const result = await dataModel.update(collection, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const result = await dataModel.remove(collection, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
