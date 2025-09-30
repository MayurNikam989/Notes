const express = require("express");
const connectToMongo = require("./db");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//middleware for using the request body
app.use(express.json());

// app.use(cors()); // Allow all origins (dev mode)

app.use(
  cors({
    origin: "https://notes-frontend-fi3u.onrender.com", // Allow only React app
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "authToken"],
    credentials: true,
  })
);
app.options("*", cors());

connectToMongo();
//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// //swagger
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: { title: "RBAC API", version: "1.0.0" },
//     // servers: [{ url: "http://localhost:5000/" }],
//   },
//   apis: ["./routes/*.js"],
// };
// const swaggerSpec = swaggerJsdoc(options); // create swagger.js that exports spec
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
