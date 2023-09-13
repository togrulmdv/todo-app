import axios from "axios";
import React from "react";

export class HTTPClient {
  baseUrl;
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async get(endpoint) {
    return await axios.get(`${this.baseUrl}/${endpoint}`);
  }
  async post(endpoint, bodyRequest) {
    return await axios.post(`${this.baseUrl}/${endpoint}`, bodyRequest);
  }
  async put(endpoint, id, bodyRequest) {
    return await axios.put(`${this.baseUrl}/${endpoint}/${id}`, bodyRequest);
  }
  async patch(endpoint, id, bodyRequest) {
    return await axios.patch(`${this.baseUrl}/${endpoint}/${id}`, bodyRequest);
  }
  async delete(endpoint, id) {
    return await axios.delete(`${this.baseUrl}/${endpoint}?id=${id}`);
  }
}
