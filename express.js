"use strict";

// REQUIRE PACKAGES
const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const helmet = require("helmet");
const http = require("http");
const { sendMail } = require("./sendGrid");
const { json } = require("express");

module.exports = () => {
  // INITIALIZE EXPRESS APP
  const app = express();

  // CORS
  app.use(
    cors({
      origin: "*",
    })
  );

  // BODY PARSING
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));

  // METHOD OVERRIDE - FOR CLIENTS THAT DOESN'T SUPPORT PUT AND DELETE
  app.use(methodOverride());

  // SECURE EXPRESS HEADERS USING HELMET
  // app.use(helmet.frameguard());
  app.use(helmet({ frameguard: false }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  // SET HTTP HEADERS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  //ALL SERVER ROUTES
  app.get("/", (req, res) => {
    res.status(200).json({
      name: `Server API Base URL`,
      version: "1",
    });
  });

  app.post("/send", (req, res) => {
    const { to, from, subject, text, html } = req.body;
    sendMail(
      { to, from, subject, text, html },
      () => {
        res.status(200).json({ msg: "Mail Sent!" });
      },
      () => {
        res.status(400).json({ msg: "Mail Failed" });
      }
    );
  });

  // ERROR HANDLING
  app.use((err, req, res) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("Invalid Token");
    }
  });

  // INITIALIZE SERVER
  let server = http.createServer(app);
  app.set("server", server);

  return app;
};
