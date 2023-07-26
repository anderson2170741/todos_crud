const express = require("express");
const { db } = require("./utils/database"); // no lleva la ex
const To_dos = require("./models/to_dos.model");

To_dos;

db.authenticate()
  .then(() => {
    console.log("Base de datos conectada correctamente");
  })
  .catch((error) => console.log(error));

db.sync() //
  .then(() => console.log("Base de datos sincronizada"));

const app = express();

app.use(express.json()); //

//**************************** CRUD *************************** *//

//! *********************** CREATE  ********************************//

app.post("/to_dos", async (req, res) => {
  // manejo de excepciones

  try {
    // TODO obtener la información del body
    const newTo_do = req.body; //* {title, completed}

    // TODO manda a crear con la informacion obtenida
    const to_do = await To_dos.create(newTo_do); // * {title: 'ldghdu, completed: 'gshgdfigwe'}

    // TODO responde que se ha realizado la acción.
    // por defecto se envía status 200
    res.status(201).send(to_do);
  } catch (error) {
    // atrapar el error
    res.status(400).json(error);
  }
});

//! ****************** READ

app.get("/to_dos", async (req, res) => {
  try {
    // TODO Mandar a buscar a todos los usuarios
    const to_dos = await To_dos.findAll({
      // attributes: ['id', 'name', 'lastname', 'email']
      attributes: {
        exclude: ["password"],
      },
    });
    // TODO Responder al cliente
    res.json(to_dos);
  } catch {
    res.status(400).json(error);
  }
});

app.get("/to_dos/:id", async (req, res) => {
  try {
    // TODO obtener el id dela ruta
    const { id } = req.params;

    // TODO realizar la consulta a la BD
    const to_do = await To_dos.findByPk(id);

    // TODO Responder al cliente
    res.json(to_do);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! ************************ UPDATE

app.put("/to_dos/:id", async (req, res) => {
  try {
    // solo se permitirá modificar el title, description
    // TODO obtener el id del usuario
    // TODO obtener el body con la información
    const { id } = req.params;
    const { title, description } = req.body;

    // todo relizar la consulta para actualizar
    // * responde un numero ( la cantidad de filas modificadas )
    const to_do = await To_dos.update(
      { title, description },
      {
        where: { id }, // --> shothand {id: id}
      }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//! ********************* DELETE ******************* !//
app.delete('/to_dos/:id', async(req, res) => {
    try {
        // todo obtener el id de la ruta
        const {id} = req.params;
        // todo eliminar en la base de datos
        await To_dos.destroy({
            where: {id} // --> {id: id}
        });
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error);
    }
})


app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor");
});

app.listen(3000, () => {
  console.log("Servidor corriendo");
});
