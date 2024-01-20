const blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

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

const getBlogCategory = async (req, res) => {
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

const getBlogList = async (limit="") => {
  try {
    const blogListData = await blog.getBlogList(limit);
    return blogListData;
  } catch (error) {
    console.error(error);
    //res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/blog'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Set the filename with a timestamp
  }
});

const upload = multer({ storage: storage });

const addBlog = async (req, res) => {
  try {
    // const {category_id,title,dateOfBlog,description,editId} = req.body;
    // const Test = {category_id,title,dateOfBlog,description,editId };
    const {category_id,title,dateOfBlog,description,editId} = req.body;
    const uploadedFilePath = req.file ? req.file.filename : "";
    const Test = {category_id,title,dateOfBlog,description,image: uploadedFilePath,editId };
    const result = await blog.addNewBlog(Test);
    res.redirect('/blog-list');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogId = async (blogId) => {
  try {
    const blogData= await blog.findByBlogId(blogId);
    return blogData;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  addCBlogategory,
  getBlogCategory,
  getBlogCategoryId,
  getBlogList,
  addBlog,
  getBlogId,
  upload
};
