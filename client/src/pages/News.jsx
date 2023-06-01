import { useEffect, useState } from "react";
import newsService from "../services/newsService";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function News() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    newsService.getAllNews().then((res) => setNews(res.data));
  }, []);
  return (
    <>
      <h2> Índice de noticias </h2>
      <ul>
        {news.map((news) => (
          <li key={news._id}>
            <h3>
              <Button as={NavLink} to={"/news/newcontainer/" + news._id}variant="outline-info">{news.titular}</Button>
              <Button as={Link} to={"/news/updatenews/" + news._id}variant="outline-warning">Editar</Button>
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
}

export default News;
