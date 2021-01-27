<template>
  <div class="admin">
    <StatisticsList></StatisticsList>
  </div>
</template>

<script>

import StatisticsList from "@/components/AdminComponents/StatisticsList.vue";


export default {
  name: "adminstatistics",
  components: {
    
    StatisticsList,
   
  },
};
</script>

<style scoped>

.admin{
  margin-top:80px;
  
}
</style>