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

const getBlogList = async (req, res) => {
  try {
    const blogListData = await blog.getBlogList();
    return blogListData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBlog = async (req, res) => {
  try {
    const {category_id,title,dateOfBlog,description,editId} = req.body;
    const Test = {category_id,title,dateOfBlog,description,editId };
    const result = await blog.addNewBlog(Test);
    res.redirect('/blog-list');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBlogId = async (blogId) => {
  try {
    const blogId= await blog.findByBlogId(BlogId);
    return blogId;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  addCBlogategory,
  getBlogategory,
  getBlogCategoryId,
  getBlogList,
  addBlog,
  getBlogId
};
