const gallery = require('../models/gallery');

const Addcategory = async (req, res) => {
  try {
    const { name, message ,editId} = req.body;
    const Test = { name, message,editId };
    const result = await testimonials.add(Test);
    res.redirect('/testimonial');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getcategory = async (req, res) => {
  try {
    const categorydata = await gallery.getcategoryAll();
    return categorydata;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getcategoryId = async (testimonialId) => {
  try {
    const testimonial = await testimonials.findById(testimonialId);
    return testimonial;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  Addcategory,
  getcategory,
  getcategoryId
};