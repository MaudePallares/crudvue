<template>
  <div v-if="UserActual" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Nombre</label>
        <input type="text" class="form-control" id="nombre"
          v-model="UserActual.nombre"
        />
      </div>
      <div class="form-group">
        <label for="description">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="UserActual.email"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ UserActual.Activo ? "Activo" : "Pendiente" }}
      </div>
    </form>
    <button class="badge badge-primary mr-2"
      v-if="UserActual.Activo"
      @click="updateActivo(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateActivo(true)"
    >
      Activo
    </button>
    <button class="badge badge-danger mr-2"
      @click="borraruser"
    >
      Eliminar
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateUsuario"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Seleciona un Usuario</p>
  </div>
</template>
<script>
import UsuariosDataService from "../services/UsuariosDataService";
export default {
  name: "user-data",
  data() {
    return {
      Useractual: null,
      message: ''
    };
  },
  methods: {
    getUsuario(id) {
      UsuariosDataService.get(id)
        .then(response => {
          this.Useractual = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateActivo(status) {
      var data = {
        id: this.Useractual.id,
        title: this.Useractual.nombre,
        description: this.Useractual.email,
        Activo: status
      };
      UsuariosDataService.update(this.Useractual.id, data)
        .then(response => {
          this.Useractual.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateUsuario() {
      UsuariosDataService.update(this.Useractual.id, this.Useractual)
        .then(response => {
          console.log(response.data);
          this.message = 'Se actualizo el usuario de forma exitosa!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    borraruser() {
      UsuariosDataService.delete(this.Useractual.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Usuarios" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUsuario(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>