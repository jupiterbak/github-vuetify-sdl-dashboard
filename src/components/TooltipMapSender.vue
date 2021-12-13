<template>
  <div class="container mx-auto" style="width: 200px">
    <div class="row text-wrap pa-0 mx-auto">
        <div class="col-sm-12 text-wrap text-subtitle-2 text-center pa-2">Supplier</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-12 text-wrap text-subtitle-2 pa-2 text-center">{{inbound.sender.name}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">City:</div>
        <div class="col-sm-6 text-wrap pa-0">{{inbound.sender.city}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Country:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.sender.country}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Total transactions:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.transaction_count}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Total quantity:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.transaction_quantity}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Total Weight:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.transaction_weight}} Kg</div>
    </div>
</div>
</template>
<script>
  export default {
      props: ['inbound']
  }
</script>