<template>
  <div class="home">
    <h3><span class="fa fa-tachometer-alt"></span> Your Dashboard</h3>
    <hr>

    <div class="row ims-part">
      <ImsCompVue />
    </div>

    <hr>

    <div class="row">
      <ComCompVue />
    </div>
  
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ImsCompVue from '../components/ImsComp.vue';
import ComCompVue from '../components/ComComp.vue';

@Options({

  components: {
    ImsCompVue,
    ComCompVue
  },
  })

export default class HomeView extends Vue { }
</script>
