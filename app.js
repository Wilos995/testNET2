const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/productModel");
const  generateQRCode  = require('./qrCodeGenerator')
const passengerCodeGenerator = require('./passengerCodeGenerator')

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/product", (req, res) => {
  res.send("List of all products");
});

app.get("/products", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body)
      if (!user) {
        return res.status(404).json({message:`We cant find user wiht if ${id}`})
      }
      const updatedUser = await User.findById(id)
      res.status(200).json(`User with the id: ${id} has been updated`);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

app.post("/product", async (req, res) => {
  try {
    
    const user = await User.create(req.body);
    await generateQRCode(user);
    res.status(200).json(user);
    
    //const passengerCode = passengerCodeGenerator(req.body.destination, req.body.flightTime, req.body.gender);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        return res.status(404).json({message:`We cant find user wiht if ${id}`})
      }
      const deletedUser = await User.findById(id)
      res.status(200).json(`User with the id: ${id} has been deleted`);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

mongoose
  .connect(
    "mongodb+srv://milos:nemasifre23@taskmanager.06izfjo.mongodb.net/TestNET2"
  )
  .then(() => {
    console.log("connected to the DB");
    app.listen(5000, () => {
      console.log("App is listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
