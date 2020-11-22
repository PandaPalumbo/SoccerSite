<template>
 <div>
  <b-card
    :title="label"
    :img-src="image"
    img-top
    tag="article"
    class="my-2"

  >
    <b-card-text>
      {{desc}}
    </b-card-text>
    <router-link :to="route" class="btn btn-primary"> {{ label }}</router-link>
  </b-card>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    label:{
      type:String,
      required: true,
      default: 'hello',
    },
    image:{
      type:String,
      required: true,
      default: 'hello',
    },
    desc:{
      type:String,
      required: true,
      default: 'hello',
    },
    route:{
      type:String,
      required: true,
      default: 'hello',
    },
  }
}
</script>

<style scoped>

</style>
