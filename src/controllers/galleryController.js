const gallery = require('../models/gallery');

const Addcategory = async (req, res) => {
  try {
    const {category_name ,editId} = req.body;
    const Test = {category_name,editId };
    const result = await gallery.addCategory(Test);
    console.log(result);
    
    res.redirect('/category');
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

const getcategoryId = async (categoryId) => {
  try {
    const category= await gallery.findByCategoryId(categoryId);
    return category;
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

const AddImageGallery = async (req, res) => {
  try {
    const {title,description,image,category_id ,editId} = req.body;
    const Test = {title,description,image,category_id ,editId };
    const result = await gallery.addImageGallery(Test);
    console.log(result);
    
    res.redirect('/image-gallery');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getimageGalleryId = async (imageGalleryId) => {
  try {
    const imageGallery= await gallery.findByImageGalleryId(imageGalleryId);
    return imageGallery;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  Addcategory,
  getcategory,
  getcategoryId,
  getimagegallery,
  getPujaCategory,
  getPujaGallery,
  AddImageGallery,
  getimageGalleryId
};
