/********************************
  * API.js for Match-e-Mo
  * 
  * Build http requests from react with axios
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/

import axios from "axios";

export default {
  register: function (registerData) {
    return axios.post("/api/users/register", registerData);
  },

  login: function (loginData) {
    return axios.post("/api/users/login", loginData);
  },

  getMaterials: function() {
    return axios.get("/api/materials");
  },

  addMaterial: function(materialsData) {
    return axios.post("/api/materials", materialsData);
  },

  updateMaterial: function(id, materialsData) {
    return axios.put("/api/materials/" + id, materialsData);
  },

  getMaterialsByMaterialId: function(id) {
    return axios.get("/api/materials/" + id);
  },

  getMaterialsByUserId: function(id) {
    return axios.get("/api/materials/user/" + id);
  },

  deleteMaterials: function(id) {
    return axios.delete("/api/materials/" + id);
  }
};
