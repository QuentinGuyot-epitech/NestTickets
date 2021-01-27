<template>
  <div class="admin">
    <ConcertList></ConcertList>
  </div>
</template>

<script>
import ConcertList from "@/components/AdminComponents/ConcertList.vue";


export default {
  name: "adminconcerts",
  components: {
    ConcertList,
   
  },
};
</script>

<style scoped>

.admin{
  margin-top:80px;
  
}
</style>