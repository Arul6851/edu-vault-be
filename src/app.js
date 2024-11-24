import express from "express";
import cors from "cors";
import bodyparser from "body-parser";

class App {
  express;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  setMiddlewares() {
    this.express.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    this.express.options("*", cors());
    this.express.use(express.json());
    this.express.use(bodyparser.urlencoded({ extended: false }));
    this.express.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    this.express.all("/*", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    this.express.use((req, res, next) => {
      req.time = new Date(Date.now()).toString();
      console.log(req.method, req.hostname, req.ip, req.path, req.time);
      next();
    });

    this.express.use("/api", home);
  }
}

export default new App().express;
