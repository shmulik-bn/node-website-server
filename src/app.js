const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "joshua kimmich",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "moode",
    name: "joshua kimmich",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "joshua kimmich",
  });
});

// app.get('/help',(req, res) =>{
//     res.send([{
//         name: 'andrew',
//         age:27
//     },{name: 'sarah',
//     age:27}])
//     // res.send(cazzo)
// })

// app.get('/about',(req, res) =>{
//     res.send('<h1>about<h1>')
//     // res.send(cazzo1)
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("please send a valid address");
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) return console.log("error:", error);

    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return console.log(error);
      }
      console.log("location:",location);
      console.log("forecastdata", forecastdata);
      res.send({
        location: location,
        forecast: forecastdata,
      });
    });
  });
  
});

app.get("/products", (req, res) => {
  if (!req.query.fanculo) {
    return res.send({
      error: "you must provide a fanculo term",
    });
  }
  console.log("query:", req.query.fanculo);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "404", errorMessage: "article", name: "jesus" });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page",
    name: "jesus",
  });
});

app.listen(3000, () => {
  console.log("the server is up on port 3000");
});
