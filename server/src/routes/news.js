const { Router } = require("express");
const News = require("./../models/news.js");
const router = Router();

//////// POST ADDNEWS ////////

router.post("/addnews", async (req, res) => {
  const { titular, texto, fecha } = req.body;

  try {
    const addnews = await News.create({ titular, texto, fecha });
    res.setHeader("x-auth-token", titular).json(addnews);
    console.log("éxito");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al agregar la noticia" });
  }
});

//////// DELETE NEWS ////////

router.delete("/delete/:newsId", async (req, res) => {
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

router.put("/update/:newsId", async (req, res) => {
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
