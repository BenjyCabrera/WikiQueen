const { Router } = require("express");
const News = require("./../models/news.js");
const isAuth = require("../middlewares/isAuth.js");
const isAdmin = require("../middlewares/isAdmin.js");
const router = Router();

//////// GET NEWS ////////

router.get("/", async (req, res) => {
  const Newss = await News.find({}).limit(30).exec();
  console.log(Newss);
  res.json(Newss);
});

//////// GET NEWS ID ////////

router.get("/:newsId", async (req, res) => {
  const { newsId } = req.params;
  const news = await News.findById(newsId).exec();
  res.json(news);
});

//////// POST ADDNEWS ////////

router.post("/addnews",async (req, res) => {
  try {
    const addnews = await News.create(req.body);
    res.json(addnews);
    console.log("éxito");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al agregar la noticia" });
  }
});

//////// DELETE NEWS ////////

router.delete("/delete/:newsId",async (req, res) => {
  const { newsId } = req.params;

  try {
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    await News.findByIdAndDelete(newsId);

    res.sendStatus(204); // Noticia eliminada
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la noticia" });
  }
});

//////// PUT NEWS ////////

router.put("/update/:newsId",isAuth,isAdmin, async (req, res) => {
  const { newsId } = req.params;
  const { titular, texto, fecha } = req.body;

  try {
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    news.titular = titular;
    news.texto = texto;
    news.fecha = fecha;

    await news.save();

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la noticia" });
  }
});

module.exports = router;
