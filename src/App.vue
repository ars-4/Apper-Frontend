<template>
  <div class="navbar">
    <div>
      <h1 class="text-light"><span class="fa fa-bars" @click="show_side_nav"></span> {{ app_name }}</h1>
    </div>
    <div>
      <input type="text" class="form-control" v-model="backend_url" @change="change_backend_url">
    </div>
  </div>
  <br>
  <div class="row">
    <div :class="{'col-md-2':true, 'border-right':true, 'sided':SideNav}">
      <nav>
        <div class="sidenav">
          <ul>
            <li>
              <router-link to="/"><span class="fa fa-tachometer-alt"></span>&nbsp;&nbsp;Dashboard</router-link>
            </li>
            <li>
              <router-link to="/about"><span class="fa fa-home"></span>&nbsp;&nbsp;Home</router-link>
            </li>
            <li>
              <a @click="show_dropdown"><span class="fa fa-shapes"></span> Apps &nbsp;&nbsp;<span class="fa fa-play"></span></a>
              <div :class="{ dropdown:true, DropDownIsVisible:IsVisible }">
                <router-link to="/ims"><span class="fa fa-dolly-flatbed"></span>&nbsp;&nbsp;IMS</router-link>
                <router-link to="/cm"><span class="fa fa-ticket-alt"></span>&nbsp;&nbsp;Complaints</router-link>
              </div>
            </li>
            <li>
              <router-link to="/apps"><span class="fa fa-store"></span>&nbsp;&nbsp;Store</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="col-md-10">
      <br><br><br>
      <router-view />
    </div>
  </div>
  <br>
</template>

<script>

export default {

  data() {
    return {
      IsVisible: false,
      SideNav: false,
      backend_url: this.main_url
    }
  },

  methods: {
    show_dropdown: function() {
      if(this.IsVisible) {
        this.IsVisible = false
      }
      else {
        this.IsVisible = true
      }
    },
    show_side_nav: async function() {
      if(this.SideNav) {
        this.SideNav = false
      }
      else {
        this.SideNav = true
      }
    },
    change_backend_url: function() {
      let x = localStorage.setItem('backend', this.backend_url)
      this.main_url = x 
    }
  }

}

</script>

