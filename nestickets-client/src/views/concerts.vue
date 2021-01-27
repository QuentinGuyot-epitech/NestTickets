<template>
  <div class="concerts">
    <ConcertList />
  </div>
</template>

<script>
// @ is an alias to /src
import ConcertList from "@/components/ConcertComponents/ConcertList.vue";

export default {
  name: "concerts",
  components: {
    ConcertList,
  },
};
</script>

<style scoped>
.concerts {
  margin-top: 80px;
}
</style>
