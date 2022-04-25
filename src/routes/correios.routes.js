import { getAxios, getSoap } from "../controllers/correios.controller.js";

export default (router) => {
  router.get("/correios/axios/:cep", getAxios);
  router.get("/correios/soap/:cep", getSoap);
};
