// controllers/webDetailController.js
const WebDetail = require('../models/webDetail');

const createWebDetail = async (req, res) => {
  try {
    const { email, mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address } = req.body;
    const webDetail = { email, mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address };
    const result = await WebDetail.create(webDetail);
    //res.json({ id: result, ...webDetail });
    res.redirect('/web-details');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWebDetails = async (req, res) => {
  try {
    const webDetails = await WebDetail.getAll();
    res.json(webDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWebDetailsWithoutExpress = async () => {
  try {
    const webDetails = await WebDetail.getAll();
    return webDetails;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  createWebDetail,
  getWebDetails,
  getWebDetailsWithoutExpress
};
