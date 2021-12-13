<template>
  <v-card>
    <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="grey accent-4"
            height="2"
            ></v-progress-linear>
    <v-card-title class="text-h6">
      All Shipments
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table dense
      :headers="shipment_headers"
      :items="shipments"
      :search="search"
      :loading="loading"
      @current-items="onItemFiltered"
      class="text-caption"
    >
      <template v-slot:item.ax4_id="{ item }">
        <a :href="getShipmentDetailLink(item.ax4_id)">{{item.ax4_id}}</a>
      </template>

      <template v-slot:item.pickup_date="{ item }">
        {{new Date(item.pickup_date).toDateString()}}
      </template>
      <template v-slot:item.delivery_date="{ item }">
        {{new Date(item.delivery_date).toDateString()}}
      </template>
      <template v-slot:item.predicted_delivery_date="{ item }">
        {{new Date(item.predicted_delivery_date).toDateString()}}
      </template>   
    
    </v-data-table>
  </v-card>
</template>
<script>
    
    export default {
        props:["loading", "trackings", "shipments"],
        data () {
            return {
                search: '',
                shipment_headers: [
                    {
                        text: 'Ship-ID',
                        align: 'start',
                        sortable: true,
                        value: 'ax4_id',
                    },
                    { text: 'Sender', value: 'sender.name' },
                    { text: 'Receiver', value: 'receiver.name' },
                    { text: 'PickUp', value: 'pickup_date' },
                    { text: 'Planned', value: 'delivery_date' },
                    { text: 'Predicted', value: 'predicted_delivery_date' },
                    { text: 'Provider', value: 'logistic_provider.name' }
                ],
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                ],
            }
        },
        methods: {
            onItemFiltered(items) {
               this.$emit('itemSelected', items);
            },
            getShipmentDetailLink (shipment_id) {
              return `/shipments/${shipment_id}`
            },
        }
    }
</script>