require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const { authenticated } = require("./middleware");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const LoginController = require("./controllers/auth");
const CategoriesController = require("./controllers/categories");
const Events = require("./controllers/events");
const UserController = require("./controllers/users");
const OrderController = require("./controllers/orders");
const FavoriteController = require("./controllers/favorites");

app.group("/api/v1", router => {
  //event
  router.get("/events", Events.index);
  // router.get("/events/today", Events.eventtoday);
  router.get("/events/:id", Events.show);
  router.get("/events/:id/detailevent", Events.detailevents);
  // router.get("/events/:id/related", Events.related);
  router.post("/events", authenticated, Events.store);
  router.put("/events/:id", authenticated, Events.update);
  router.delete("/events/:id", authenticated, Events.delete);

  //categories
  router.get("/categories", CategoriesController.index);
  router.get("/categories/:id/showevent", CategoriesController.showEvent);
  router.get("/categories/:id", CategoriesController.show);
  router.post("/categories", authenticated, CategoriesController.store);
  router.put("/categories/:id", authenticated, CategoriesController.update);
  router.delete("/categories/:id", authenticated, CategoriesController.delete);

  //order
  router.get("/order", OrderController.index);
  router.get("/order/:id", OrderController.show);
  router.get("/order/:id/orderbyperson", OrderController.ordersbyperson);
  router.get(
    "/order/:id/orderbyperson/pending",
    OrderController.ordersbypersonpending
  );
  router.get(
    "/order/:id/orderbyperson/confirmed",
    OrderController.ordersbypersonconfirmed
  );
  router.get(
    "/order/:id/orderbyperson/approved",
    OrderController.ordersbypersonapproved
  );
  router.post("/order", authenticated, OrderController.store);
  router.put("/order/:id", authenticated, OrderController.update);
  router.delete("/order:id", authenticated, OrderController.delete);

  //Favorite
  router.get("/favorite/:id", FavoriteController.favoritebyperson);
  router.post("/favorite", authenticated, FavoriteController.makefavorite);
  router.post("/favorite/show", FavoriteController.show);
  router.post("/favorite/delete", authenticated, FavoriteController.delete);

  //user
  router.get("/user", authenticated, UserController.index);
  router.get("/user/:id", authenticated, UserController.show);
  router.post("/login", LoginController.login);
  router.post("/register", LoginController.register);
  router.put("/user/:id", authenticated, UserController.update);
  router.delete("/user/:id", authenticated, UserController.delete);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
