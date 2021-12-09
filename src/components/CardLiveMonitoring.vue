<template>
  <v-card flat tile class="mx-auto">
    <v-toolbar
      rounded
      flat
      dense
    >
        <v-toolbar-title class="text-md-body-1">Live Monitoring</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                    <v-icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </template>
            <span>Refresh</span>
        </v-tooltip>
        
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                    <v-icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                        mdi-cog
                    </v-icon>
                </v-btn>
            </template>
            <span>Settings</span>
        </v-tooltip>
    </v-toolbar>
    
    <v-container>
        <v-row>
          <template >
            <v-col
              cols="12"
              md="12"
            >
            <v-tabs fixed-tabs dark centered center-active slider-size="1">
                <v-tab href="#shipments">Shipments</v-tab>
                <v-tab-item value="shipments">
                    <v-list>
                        <v-list-group>
                            <template v-slot:activator hide-actions >
                                <v-list-item-avatar>
                                    <v-img
                                        alt="avatar"
                                        src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-title>Header</v-list-item-title>
                                <v-list-item-subtitle>
                                    Lorem ipsum dolor 
                                </v-list-item-subtitle>
                            </template>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-list-item-title>SH0093456</v-list-item-title>
                                            <v-list-item-subtitle>
                                                From: Karlsruhe To: Erlangen
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                Planned: 27-10-2021 - Prediction: 03-11-202
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item-subtitle>
                                        <v-data-table dense single-select hide-default-footer
                                            :headers="headers"
                                            :items="desserts"
                                            item-key="name"
                                            class="elevation-1"
                                        ></v-data-table>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-tab-item>
                <v-tab href="#orders">Orders</v-tab>
                <v-tab-item value="orders">
                </v-tab-item>
            </v-tabs>
            </v-col>
          </template>
        </v-row>  
    </v-container>    
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      desserts: [
        {
          risk: '21.2%',
          material: 305,
        },
        {
          risk: '21.2%',
          material: 305,
        },
        {
          risk: '21.2%',
          material: 305,
        },
        {
          risk: '21.2%',
          material: 305,
        }
      ],
      headers: [
        {
          text: 'Risk',
          align: 'start',
          sortable: false,
          value: 'risk',
        },
        { text: 'MaterialNr.', value: 'material' },
      ],
    }),
  }
</script>