const express = require('express');
const path = require('path');
const hbs = require("hbs");
const bodyParser = require('body-parser');
const webDetailController = require('./controllers/webDetailController');
const loginController = require('./controllers/loginController');

const app = express();
require("./db/conn");
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
      const webDetail = await webDetailController.getWebDetailsWithoutExpress();
      return webDetail; // Return the fetched data

    } catch (error) {
      console.error(error);
    }
  };
  
  app.get("", async (req, res) => {
    try {
      let webDetail = await fetchData(); 
      res.render("FrontEnd/index", { title: "Home", webDetail});
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
 app.get("/about", async (req,res) =>{
    try {
    let webDetail = await fetchData();
    res.render("FrontEnd/about", { title: "About", webDetail});
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
 });
app.get("/contact", async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/contact", { title: "Contact", webDetail});
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
});

app.get("/service",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/service", { title: "Service", webDetail});
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
});

app.get("/blog",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/blog", { title: "Blog", webDetail});
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
});

app.get("/blog-details", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/blog-details", { title: "Blog Detail", webDetail});
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
});

app.get("/broadcast", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/broadcast", { title: "Broadcast", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/faq", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/faq", { title: "Faq", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/volunteers", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/volunteers", { title: "Valunteers", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/volunteer-detail",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/volunteer-detail", { title: "Valunteer Details", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/events", async(req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/events", { title: "Event", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/puja",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/puja", { title: "Puja", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});
app.get("/puja-details",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/puja-details", { title: "Puja Details", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
    res.render("FrontEnd/puja-details");
});
app.get("/holi",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/holi", { title: "Holi", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
    res.render("FrontEnd/holi");

});app.get("/volunteer-detail",async (req,res) =>{
try {
    let webDetail = await fetchData(); 
    res.render("FrontEnd/volunteer-detail", { title: "Volunteer Detail", webDetail});
    } catch (error) {
    res.status(500).send('Internal Server Error');
    }
});
app.get("/holi-details",async (req,res) =>{
    try {
        let webDetail = await fetchData(); 
        res.render("FrontEnd/holi-details", { title: "Holi Detail", webDetail});
        } catch (error) {
        res.status(500).send('Internal Server Error');
        }
});

app.get("/admin-login", (req,res) =>{
    res.render("BackEnd/login");
});

app.get("/blank", (req,res) =>{
    res.render("BackEnd/blank");
});

app.get("/forgot-password", (req,res) =>{
    res.render("BackEnd/forgot-password");
});

app.get("/dashboard", (req,res) =>{
    res.render("BackEnd/dashboard");
});

app.get("/add-volunteers", (req,res) =>{
    res.render("BackEnd/add-volunteers");
});

app.get("/web-details", (req,res) =>{
    res.render("BackEnd/web-detail");
});


app.post('/web-details', webDetailController.createWebDetail);
app.get("/web-details-data", webDetailController.getWebDetails);

app.post("/admin-login", loginController.login);

app.get("*", (req,res) =>{
    res.render("FrontEnd/404",{
        errormsg : "Opps! Page Not Found",
      });
});

app.listen(port ,() =>{
    console.log(`Listening to the port at ${port}`);
})