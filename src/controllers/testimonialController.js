const testimonials = require('../models/testimonials');

const Addtestimonial = async (req, res) => {
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

const gettestimonial = async (req, res) => {
  try {
    const testimonialsdata = await testimonials.getAll();
    return testimonialsdata;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const gettestimonialId = async (testimonialId) => {
  try {
    const testimonial = await testimonials.findById(testimonialId);
    return testimonial;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  Addtestimonial,
  gettestimonial,
  gettestimonialId
};
