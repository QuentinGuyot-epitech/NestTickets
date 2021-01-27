<template>
  <div class="filters ml-4">
    <p class="text-left mb-2"><strong>Filters</strong></p>
    <v-select
      :items="genres"
      @change="$emit('filterChange', filter_genre)"
      v-model="filter_genre"
      label="Genre"
      solo
    ></v-select>
    <v-select
      :items="bands"
      @change="$emit('filterChange', filter_band)"
      v-model="filter_band"
      label="Band"
      solo
    ></v-select>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Filter by month"
          prepend-icon="mdi-calendar"
          dark
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" type="month" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="filterDate">
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConcertFilter",
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
    };
  },
  props: ["genres", "bands", "filter_genre", "filter_band"],
  methods: {
    filterDate() {
      this.$refs.dialog.save(this.date)
      this.$emit('filterDate', this.date)
    }
  },
};
</script>

<style scoped>
.filters {
  width: 650px;
}
</style>>
