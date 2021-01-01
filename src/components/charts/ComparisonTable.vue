<template>

  <b-col class="mx-auto my-1 overflow-auto" cols="11" >
    <b-table striped table-variant="dark" :items="data" :fields="fields" thead-class="m-4">
    </b-table>
  </b-col>
</template>

<script>
export default {
  name: "ComparisonTable",
  components: {},
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    fields(){
      let fields = Object.keys(this.data[0]);
      return fields.map(field => ({
        key:field,
        label: this.prettyCasing(field),
        sortable:true,
        thClass:['header-class'],
        tdClass:['body-class']
      }));
    }
  },
  methods: {
    prettyCasing(string) {
      let splitString = string.split('_');
      let res = "";
      splitString.map(string => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },
    fixName(name) {
      let split = name.split(' ')
      let retName = split[1] ? split[1] + ' ' + split[0] : split[0];
      return retName;
    },
  },
  mounted() {
    //console.log(this.data)
  }
}
</script>

<style>
.header-class{
  min-width: 150px;
}
.body-class{
  margin:auto;
}
</style>