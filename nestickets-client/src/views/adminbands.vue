<template>
  <div class="admin">
    <BandList></BandList>
  </div>
</template>

<script>
import BandList from "@/components/AdminComponents/BandList.vue";


export default {
  name: "adminbands",
  components: {
    BandList,
   
  },
};
</script>

<style scoped>

.admin{
  margin-top:80px;
  
}
</style>