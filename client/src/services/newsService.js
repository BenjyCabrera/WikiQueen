import http from "./httpService";

import config from "../config.json";

const endpoint = config.apiURL + "/news";

function getEndpoint(id) {
  return !id ? endpoint : endpoint + "/" + id;
}

function getAllNews() {
  return http.get(getEndpoint());
}
function getNewById(id) {
  console.log(getEndpoint(id))
  return http.get(getEndpoint(id));
}

function addNews(payload) {
  return http.post (config.apiURL +"/news/addnews", payload)
}

function updateNews(id,payload) {
	return http.put(config.apiURL +"/news/update/" + id, payload)
}

function deleteNews(id) {
	return http.delete(getEndpoint(id))
}

const newsService = {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  getNewById
};

export default newsService;
