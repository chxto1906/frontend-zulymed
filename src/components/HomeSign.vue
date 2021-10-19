<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <!--
        <Sidebar />
      -->
      <div class="w-full pl-0 min-h-screen">
        <!--
          <Navbar />
        -->
        <div class="p-6  mb-20">
          <router-view />
        </div>
      <!--
        <Footer />
      -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeSign',
  computed: {
    ...mapGetters(['system'])
  },
  components: {
    
  }
}
</script>
