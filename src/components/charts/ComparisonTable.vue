<template>
  <b-col class="mx-auto my-1 text-center" cols="11" v-if="subKeys">
    <b-row v-for="(key, i) in subKeys" :key="i">
      <ComparisonTable :data="subTableData" :data-field="key"/>
    </b-row>
  </b-col>
  <b-col class="mx-auto my-1" cols="11" v-else>
    <b-table striped table-variant="dark" :items="tableItems" :fields="tableFields">
      <template #thead-top>
        <b-tr>
          <h2 v-if="dataField == 'over'">{{dataField}}</h2>
          <b-th style="font-size: 2em;" class="text-center" :colspan="tableFields.length" variant="dark">
            {{ dataField == 'yellowred' ? 'Red Card - Double Yellow' : dataField == 'redcards' ? 'Straight Red' : prettyCasing(dataField)  }}
          </b-th>
        </b-tr>
      </template>
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
    dataField: {
      type: String,
      required: true,
    },
    type: {type:String, required:false}
  },
  computed: {
    subKeys() {
      let stats = this.data[0]
      let data = stats[this.dataField];
      let keys = Object.keys(data);
      if (keys.some(key => typeof data[key] === 'object')) {
        return keys.filter(key => typeof data[key] === 'object')
      } else
        return null;
    },
    tableFields() {
      let stats = this.data[0][this.dataField];
      let fields = Object.keys(stats);

      let finalFields = fields.map(field => ({
            key: field,
            label: field  == 'avg' && this.type != 'leagues' ? 'Percent Chance ' : this.prettyCasing(field),
            sortable: true,
          })
      );
      finalFields.push({
        key: 'name',
        label: 'Name',
        sortable: true,
      })
      if(this.type == 'leagues')
        finalFields = finalFields.filter(field => field.key != 'avg')
      return finalFields.sort((a, b) => {
            if (a.key == 'name' && b.key != a.key)
              return -1
          }
      );

    },
    tableItems() {
      let stats = this.data;
      // console.log(this.data)
      let items = [];
      stats.forEach((stat) => {
        let item = stat[this.dataField];
        if(item.avg)
          item['avg'] = (''+ item['avg']).replace('%', '') + '%'
        item['name'] = this.fixName(stat.name);
        items.push(item)
      })
      return items;

    },
    subTableData() {
      let subData = [];
      this.data.forEach(stat => {
        let tempObj = stat[this.dataField];
        tempObj['name'] = stat.name;
        subData.push(tempObj)
      })
      return subData;
    },
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

<style scoped>

</style>