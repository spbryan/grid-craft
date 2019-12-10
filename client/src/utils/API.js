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

  getMaterialsByMaterialNumber: function(id) {
    return axios.get("/api/materials/number/" + id);
  },

  getMaterialsByUserId: function(id) {
    return axios.get("/api/materials/user/" + id);
  },

  deleteMaterial: function(id) {
    return axios.delete("/api/materials/" + id);
  },

  getProducts: function() {
    return axios.get("/api/products");
  },

  addProduct: function(productData) {
    return axios.post("/api/products", productData);
  },

  updateProduct: function(id, productData) {
    return axios.put("/api/products/" + id, productData);
  },

  getProductByProductId: function(id) {
    return axios.get("/api/products/" + id);
  },

  getProductsByUserId: function(id) {
    return axios.get("/api/products/user/" + id);
  },

  deleteProduct: function(id) {
    return axios.delete("/api/products/" + id);
  },

  addMaterialUsed: function(materialUsedData) {
    return axios.post("/api/materials/used/", materialUsedData);
  },

  getMaterialsUsedByProductId: function(id) {
    return axios.get("/api/materials/used/product/" + id);
  },

  deleteMaterialsUsedByProductId: function(id) {
    return axios.delete("/api/materials/used/" + id);
  }
};
