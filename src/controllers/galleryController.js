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

const getimagegallery = async (req, res) => {
  try {
    const imageGalleryData = await gallery.getImageGalleryAll();
    return imageGalleryData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPujaCategory = async (req, res) => {
  try {
    const categoryPujaData = await gallery.getPujaCategoryAll();
    return categoryPujaData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPujaGallery = async (req, res) => {
  try {
    const pujaGalleryData = await gallery.getPujaGalleryAll();
    return pujaGalleryData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  Addcategory,
  getcategory,
  getcategoryId,
  getimagegallery,
  getPujaCategory,
  getPujaGallery
};
