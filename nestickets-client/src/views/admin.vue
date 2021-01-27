<template>
<div class="container d-flex flex-wrap mt-12">
  
    <CardUserAdmin></CardUserAdmin>
    
    <CardConcertAdmin></CardConcertAdmin>
    
    <CardBandAdmin></CardBandAdmin>

    <CardStatistic></CardStatistic>
  </div>
</template>

<script>
// import UserList from "@/components/AdminComponents/UserList.vue";
import CardUserAdmin from "@/components/AdminComponents/CardUserAdmin.vue";
import CardConcertAdmin from "@/components/AdminComponents/CardConcertAdmin.vue";
import CardBandAdmin from "@/components/AdminComponents/CardBandAdmin.vue";
import CardStatistic from "@/components/AdminComponents/CardStatistic.vue";

export default {
  name: "admin",
  components: {
    // UserList,
    CardUserAdmin,
    CardConcertAdmin,
    CardBandAdmin,
    CardStatistic
  },
};
</script>

<style scoped>

.admin{
  margin-top:80px;
  display: flex;
}
@media (min-width: 1264px) {
  .container {
    max-width: 1385px;
  }
}
</style>