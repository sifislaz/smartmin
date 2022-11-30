<template>
  <NavPanel/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import NavPanel from '../components/NavPanel';

export default defineComponent({
  name: 'HomeView',

  components: {
    NavPanel,
  },
});
</script>
