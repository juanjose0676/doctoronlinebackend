const EspecialidadModelo = require("../modelos/EspecialidadModelo");
const EspecialidadOperaciones = {};

EspecialidadOperaciones.crearEspecialidad = async(req, res) => {
    try {
        console.log("validad crear especialidad");
        const objeto = req.body;
        console.log(req);
        console.log(objeto);
        const especialidad = new EspecialidadModelo(objeto);
        const especialidadGuardada = await especialidad.save();
        console.log("guardando");
        res.status(201).send(especialidadGuardada);
    } catch (error) {
        if(error.code === 11000) res.status(400).json({tipoError: "dato duplicado", dato: error.keyValue});
        
    }
}

EspecialidadOperaciones.consultarEspecialidades = async(req, res) => {
    try {
        const query = req.query;
        let listaEspecialidades;
        if (query.q != null) {
            listaEspecialidades = await EspecialidadModelo.find({
                "$or" : [ 
                    { "nombre": { $regex:query.q, $options:"i" }},
                    { "descripcion": { $regex:query.q, $options:"i" }}
                ]
            });
        }
        else {
            listaEspecialidades = await EspecialidadModelo.find(query);
        }
        if (listaEspecialidades.length > 0) {
            res.status(200).send(listaEspecialidades);
        }
        else {
            res.status(404).send("No hay datos");
        }

    } catch (error) {
        res.status(400).send("Mala petición");
    }
}


EspecialidadOperaciones.consultarEspecialidad = async(req, res) => {
    try {
        const id = req.params.id;
        const especialidad = await EspecialidadModelo.findById(id);
        if (especialidad != null) {
            res.status(200).send(especialidad);
        }
        else {
            res.status(404).send("No hay datos");
        }

    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

EspecialidadOperaciones.modificarEspecialidad = async(req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const datosModificados = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            atiende_solo_mujeres: body.atiende_solo_mujeres
        }
        const especialidad = await EspecialidadModelo.findByIdAndUpdate(id, datosModificados, { new: true });
        if (especialidad != null) {
            res.status(200).send(especialidad);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

EspecialidadOperaciones.borrarEspecialidad = async(req, res) => {
    try {
        const id = req.params.id;
        const especialidad = await EspecialidadModelo.findByIdAndDelete(id);
        if (especialidad != null) {
            res.status(200).send(especialidad);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}


module.exports = EspecialidadOperaciones;