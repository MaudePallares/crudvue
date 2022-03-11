<template>

<div class="container">
    <br>
    <h1>Registra un nuevo usuario</h1>
    <div v-if="!NuevoIngreso">
        <br>
      <div class="form-floating mb-3">
          <h4>Nombre</h4>
        <label for="nombre"></label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="user.nombre"
          name="nombre"
        />
      </div>

      <div class="form-floating mb-3">
          <h4>Email</h4>
        <label for="email"></label>
        <input
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>

      <button @click="saveUser()" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Se ha registrado de forma exitosa!</h4>
      <button @click="newUser()" class="btn btn-success">Agregar</button>
    </div>

  
</div>
</template>


<script>
import UsuariosDataService from "../services/UsuariosDataService";
export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        nombre: "",
        email: "",
        Activo: false
      },
      NuevoIngreso: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        nombre: this.user.nombre,
        email: this.user.email
      };
      UsuariosDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.NuevoIngreso = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.NuevoIngreso = false;
      this.user = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>