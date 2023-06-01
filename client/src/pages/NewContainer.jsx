import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import News from "./News";
import newsService from "../services/newsService";

function NewContainer() {
  const { id } = useParams();
  console.log(id);
  const [news1, setNews1] = useState();
  useEffect(() => {
    newsService.getNewById(id).then((res) => setNews1(res.data));
  }, [id]);

  return (
    <div>
        {news1 ? <h1>{news1.titular} </h1> : "" }
        {news1 ? <p>{news1.texto} </p> : "" }
        {news1 ? <time>{news1.fecha} </time> : "" }
           
    </div>
  );
}
export default NewContainer;
