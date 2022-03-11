import http from "../http-common";
class UsuariosDataService {
  getAll() {
    return http.get("/mostrarD");
  }
  get(id) {
    return http.get(`/mostrarD/${id}`);
  }
  create(data) {
    return http.post("/mostrarD", data);
  }
  update(id, data) {
    return http.put(`/mostrarD/${id}`, data);
  }
  delete(id) {
    return http.delete(`/mostrarD/${id}`);
  }
  deleteAll() {
    return http.delete(`/mostrarD`);
  }
  findByTitle(nombre) {
    return http.get(`/mostrarD?nombre=${nombre}`);
  }
}
export default new UsuariosDataService();