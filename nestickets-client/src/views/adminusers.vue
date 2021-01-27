<template>
  <div class="admin">
    <UserList></UserList>
  </div>
</template>

<script>
import UserList from "@/components/AdminComponents/UserList.vue";


export default {
  name: "adminusers",
  components: {
    UserList,
   
  },
};
</script>

<style scoped>

.admin{
  margin-top:80px;
  
}
</style>