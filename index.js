//IMPORTACIONES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("./conexion.js");

//CONFIGURACIONES
const env = process.env;
const port = env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//ARRANQUE
app.listen(port, ()=>{
    console.log("API iniciado en el puerto "+port);
})

//RUTAS
app.get("/", (req, res)=>{
    res.send("API iniciado");
});
app.use("/especialidades", require("./rutas/EspecialidadRutas"));
