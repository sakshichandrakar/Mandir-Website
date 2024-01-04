const blog = require('../models/blog');

const addCBlogategory = async (req, res) => {
  try {
    const {category_name ,editId} = req.body;
    const Test = {category_name,editId };
    const result = await blog.addCategory(Test);    
    res.redirect('/blog-category');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogategory = async (req, res) => {
  try {
    const categorydata = await blog.getCategoryAll();
    return categorydata;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogCategoryId = async (blogCategoryId) => {
  try {
    const blogCategory= await blog.findByCategoryId(blogCategoryId);
    return blogCategory;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

const getblogList = async (req, res) => {
  try {
    const imageGalleryData = await blog.getImageGalleryAll();
    return imageGalleryData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBlog = async (req, res) => {
  try {
    const {title,description,image,category_id ,editId} = req.body;
    const Test = {title,description,image,category_id ,editId };
    const result = await blog.addImageGallery(Test);
    console.log(result);
    
    res.redirect('/image-gallery');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogId = async (imageGalleryId) => {
  try {
    const imageGallery= await blog.findByImageGalleryId(imageGalleryId);
    return imageGallery;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  addCBlogategory,
  getBlogategory,
  getBlogCategoryId,
  getblogList,
  addBlog,
  getBlogId
};
