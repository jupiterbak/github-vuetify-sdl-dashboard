<template>
  <div class="container mx-auto" style="width: 200px">
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">Supplier:</div>
        <div class="col-sm-6 text-wrap pa-0">{{inbound.sender.city}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">From:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.sender.city}}</div>
    </div>
    <div class="row text-wrap pa-0">
        <div class="col-sm-6 text-wrap pa-0">To:</div>
        <div class="col-sm-6 text-wrap pa-0 text-truncate">{{inbound.receiver.city}}</div>
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