import { HTTPClient } from "../HTTPClient";

export class AuthorService extends HTTPClient {
  constructor() {
    super("someapi");
  }

  async getAllAuthors() {
    return await this.get("Authors");
  }
  async deleteAuthor(id) {
    return await this.delete("Authors", id);
  }
  async addAuthor(bodyRequest) {
    return await this.post("Authors", bodyRequest);
  }
}