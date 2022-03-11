<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Buscar por nombre"
          v-model="nombre"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="BuscarXNombre"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Usuarios</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in Usuarios"
          :key="index"
          @click="setActiveTutorial(user, index)"
        >
          {{ user.nombre }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="BorrarUsers()">
        Borrar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="UserActual">
        <h4>Usuario</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ UserActual.nombre }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ UserActual.email }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ UserActual.Activo ? "Activo" : "Pendiente" }}
        </div>
        <a class="badge badge-warning"
          :href="'/editarD/' + UserActual.id"
        >
          Editar
        </a>
      </div>
      <div v-else>
        <br />
        <p>Selecciona un Usuario.</p>
      </div>
    </div>
  </div>
</template>


<script>
import UsuariosDataService from "../services/UsuariosDataService";
export default {
  name: "Users-list",
  data() {
    return {
      Usuarios: [],
      UserActual: null,
      currentIndex: -1,
      nombre: ""
    };
  },
  methods: {
    MostrarUsers() {
      UsuariosDataService.getAll()
        .then(response => {
          this.Usuarios = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Actualizar() {
      this.MostrarUsers();
      this.UserActual = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(user, index) {
      this.UserActual = user;
      this.currentIndex = index;
    },
    BorrarUsers() {
      UsuariosDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.Actualizar();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    BuscarXNombre() {
      UsuariosDataService.findByTitle(this.nombre)
        .then(response => {
          this.Usuarios = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.MostrarUsers();
  }
};
</script>


<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>