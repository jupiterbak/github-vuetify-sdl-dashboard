<template>
  <div class="container mx-auto" style="width: 200px">
    <div class="row text-wrap pa-0">
        <div class="col-sm-12 text-wrap text-subtitle-2 pa-2 text-center"><a :href="`inbound/${encodeURIComponent(receiver.receiver_id)}`" >{{receiver.name}}</a></div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">City:</div>
        <div class="col-sm-6 text-wrap pa-0">{{receiver.city}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Country:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{receiver.country}}</div>
    </div>
    <!-- <div class="row text-wrap pa-0">
        <div class="col-sm-12 text-wrap pa-0"><a :href="`inbound/${encodeURIComponent(receiver.receiver_id)}`" >Inbound</a></div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-12 text-wrap pa-0">Outbound</div>
    </div> -->
</div>
</template>
<script>
  export default {
      props: ['receiver']
  }
</script>