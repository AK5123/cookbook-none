// REQUIRE EXPRESS APP
const app = require("./express")();

// CATCH UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => console.log("Error: ", err));

// APP LISTEN
app.get("server").listen(process.env.PORT || 3030, () => {
  console.log(`Server started on port: ${process.env.PORT || 3030}`);
});
