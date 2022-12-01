<template>
  <NavPanel/>
  <div></div>
  <FooterBar/>
</template>

<script>
import { defineComponent } from 'vue';
import NavPanel from '../components/NavPanel'
import FooterBar from '../components/FooterBar'
// Components


export default defineComponent({
  name: 'HomeView',

  components: {
    NavPanel,
    FooterBar
  },
});
</script>
