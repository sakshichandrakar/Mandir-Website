const express = require('express');
const path = require('path');
const hbs = require("hbs");
const bodyParser = require('body-parser');
const webDetailController = require('./controllers/webDetailController');
const loginController = require('./controllers/loginController');
const testimonialController = require('./controllers/testimonialController');
const galleryController = require('./controllers/galleryController');
const blogController = require('./controllers/blogController');



const app = express();
require("./db/conn");
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));



//Public static Path
const templatepath = path.join(__dirname,"../templates/views");
const partialsepath = path.join(__dirname,"../templates/partials");

//to set the view engine
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialsepath);
app.use(express.static('public'));

const fetchData = async () => {
    try {
      const webDetail = await webDetailController.getWebDetailsAll();
      return webDetail;
    } catch (error) {
      console.error(error);
    }
  };
  
app.get("", async (req, res) => {
  try {
    let webDetail = await fetchData(); 
    const testimonial_data = await testimonialController.getTestimonial();
    const categoryAll = await galleryController.getPujaCategory();
    const galleryPujadata = await galleryController.getPujaGallery('6');

    res.render("FrontEnd/index", { title: "Home", webDetail,testimonial_data,categoryAll,galleryPujadata});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});    }
});

app.get("/about", async (req,res) =>{
    try {
    let webDetail = await fetchData();
    res.render("FrontEnd/about", { title: "About", webDetail});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  
  }
});

app.get("/contact", async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/contact", { title: "Contact", webDetail});
      } catch (error) {
  res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});      }
});

app.get("/service",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/service", { title: "Service", webDetail});
      } catch (error) {
      res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});      }
});

app.get("/blog",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/blog", { title: "Blog", webDetail});
      } catch (error) {
      res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});      }
});

app.get("/blog-details", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/blog-details", { title: "Blog Detail", webDetail});
      } catch (error) {
      res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});      }
});

app.get("/broadcast", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/broadcast", { title: "Broadcast", webDetail});
        } catch (error) {
          res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  
        }
});

app.get("/faq", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/faq", { title: "Faq", webDetail});
        } catch (error) {
          res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});        
        }
});

app.get("/volunteers", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/volunteers", { title: "Valunteers", webDetail});
        } catch (error) {
          res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"}); 
        }
});

app.get("/volunteer-detail",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/volunteer-detail", { title: "Valunteer Details", webDetail});
        } catch (error) {
          res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});   
       }
});

app.get("/pandit-details",async (req,res) =>{
  try {
      let webDetail = await fetchData(); 
      res.render("FrontEnd/pandit-details", { title: "Valunteer Details", webDetail});
      } catch (error) {
        res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});   
     }
});

app.get("/events", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/events", { title: "Event", webDetail});
        } catch (error) {
        res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  
        }
});

app.get("/puja",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        const categoryPujaData = await galleryController.getPujaCategory();
        const galleryPujadata = await galleryController.getPujaGallery();
        res.render("FrontEnd/puja", { title: "Puja", webDetail,categoryPujaData,galleryPujadata});
        } catch (error) {
        res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"}); 
       }
});

app.get("/puja-details",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/puja-details", { title: "Puja Details", webDetail});
        } catch (error) {
         res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});    
        }
    res.render("FrontEnd/puja-details");
});

app.get("/holi",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/holi", { title: "Holi", webDetail});
        } catch (error) {
        res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  
       }

});

app.get("/volunteer-detail",async (req,res) =>{
try {
    let webDetail = await fetchData(); 
    res.render("FrontEnd/volunteer-detail", { title: "Volunteer Detail", webDetail});
    } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});   
   }
});

app.get("/holi-details",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/holi-details", { title: "Holi Detail", webDetail});
        } catch (error) {
        res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"}); 
       }
});

app.get("/admin-login", (req,res) =>{
    res.render("BackEnd/login",{ title: "Admin Login"});
});

app.get("/blank", (req,res) =>{
    res.render("BackEnd/blank",{ title: "Blank"});
});

app.get("/forgot-password", (req,res) =>{
    res.render("BackEnd/forgot-password",{ title: "Forgot Password"});
});

app.get("/dashboard", (req,res) =>{
    res.render("BackEnd/dashboard",{ title: "Dashboard"});
});

app.get("/add-volunteers", (req,res) =>{
    res.render("BackEnd/add_volunteers",{ title: "Add Volunteers"});
});

app.get("/web-details", async(req,res) =>{
  let webDetail = await fetchData(); 
    res.render("BackEnd/web_detail",{ title: "Web Details",webDetail});
});

app.get("/testimonial", async (req,res) =>{
  const testimonial_data = await testimonialController.getTestimonial();
  res.render("BackEnd/testimonials",{testimonial_data, title: "Testmonials"},);
});


app.get("/add-testimonial", async (req,res) =>{
  const testimonial_data = await testimonialController.getTestimonial();
  res.render("BackEnd/add_testimonials",{testimonial_data, title: "Add Testimonial"});
});

app.get('/testimonialedit', async (req, res) => {
  const testimonialId = req.query.id;
  const testimonial_data = await testimonialController.getTestimonialId(testimonialId);
  try {
     res.render("BackEnd/add_testimonials",{testimonial_data, title: "Add Testimonial"});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  }
});

app.post('/web-details', webDetailController.createWebDetail);
app.post("/admin-login", loginController.login);
app.post('/testimonial', testimonialController.addTestimonial);
app.get("/testimonial-list", testimonialController.getTestimonial);
app.post('/category', galleryController.addCategory);
//app.post('/add-image-gallery', galleryController.addImageGallery);
// Attach middleware to the route
app.post('/add-image-gallery', galleryController.upload.single('image'), galleryController.addImageGallery);

app.get("/category", async (req,res) =>{
  const category_data = await galleryController.getCategory();
  res.render("BackEnd/category",{category_data, title: "Categoty"},);
});

app.get('/categoryedit', async (req, res) => {
  const categoryId = req.query.id;
  const category_edit_data = await galleryController.getCategoryId(categoryId);
  const category_data = await galleryController.getCategory();
  try {
     res.render("BackEnd/category",{category_data,category_edit_data, title: "Add category"});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  }
});

app.get("/add-image-gallery", async (req,res) =>{
  const categoryAll = await galleryController.getCategory();
  const galleryData = await galleryController.getImagegallery();
  res.render("BackEnd/add_image_gallery",{galleryData,categoryAll, title: "Add Image Gallery"});
});

app.get("/image-gallery", async (req,res) =>{
  const galleryData = await galleryController.getImagegallery();
  res.render("BackEnd/image_gallery",{galleryData, title: "Image Gallery"});
});

app.get('/edit-image-gallery', async (req, res) => {
  const imageGalleryId = req.query.id;
  const imageGalleryData = await galleryController.getImageGalleryId(imageGalleryId);
  const categoryAll = await galleryController.getCategory();

  try {
     res.render("BackEnd/add_image_gallery",{imageGalleryData,categoryAll, title: "Edit category"});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  }
});

 app.post('/add-blog-category', blogController.addCBlogategory);

app.get("/blog-category", async (req,res) =>{
  const blogCategoryData = await blogController.getBlogategory();
  res.render("BackEnd/blog_category",{blogCategoryData, title: "Blog Category"},);
});

app.get('/edit-blog-category', async (req, res) => {
  const blogCategoryId = req.query.id;
  const blogCategoryEditData = await blogController.getBlogCategoryId(blogCategoryId);
  const blogCategoryData = await blogController.getBlogategory();
  try {
     res.render("BackEnd/blog_category",{blogCategoryData,blogCategoryEditData, title: "Edit Blog Category"});
  } catch (error) {
    res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  }
});

// app.post('/add-blog', blogController.AddBlog);

app.get("/add-blog", async (req,res) =>{
  const blogCategory = await blogController.getBlogategory();
  res.render("BackEnd/add_blog",{blogCategory, title: "Add Blog"});
});

app.get("/blog-list", async (req,res) =>{
  const blogData = await blogController.getblogList();
  res.render("BackEnd/blog_list",{blogData, title: "Blog List"});
});

// app.get('/edit-blog', async (req, res) => {
//   const blogId = req.query.id;
//   const blogData = await blogController.getBlogId(blogId);
//   const blogCategory = await blogController.getBlogCategory();

//   try {
//      res.render("BackEnd/add_image_gallery",{blogData,blogCategory, title: "Edit Blog"});
//   } catch (error) {
//     res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Internal Server Error"});  }
// });

app.get("*", async(req,res) =>{
  let webDetail = await fetchData(); 
  res.render("FrontEnd/404", { title: "Error Page",webDetail, message: "Opps! Page Not Found"});  
});

app.listen(port ,() =>{
    console.log(`Listening to the port at ${port}`);
})