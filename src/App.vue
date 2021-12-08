<template>
  <v-app>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4"

      :mini-variant.sync="mini"
      
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar elevation="4" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>


    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

//import HelloWorld from './components/HelloWorld';
export default {
  
  name: 'App',
  components: {
    //HelloWorld,
  },
  

  data: () => ({
    //
    drawer: true,
    items: [
      { title: 'Dashboard', icon: 'mdi-home-analytics', path: '/' },
      { title: 'Inbound Logistics', icon: 'mdi-truck-fast', path: '/inbound' },
      { title: 'Production', icon: 'mdi-factory', path: '/production' },
      { title: 'Outbound Logistics', icon: 'mdi-human-dolly', path: '/outbound' },
      { title: 'Operation Cockpit', icon: 'mdi-view-dashboard', path: '/cockpit' },
      { title: 'Notification Center', icon: 'mdi-bell-ring', path: '/notifications' },
      { title: 'Setting', icon: 'mdi-cog', path: '/settings' },
      { title: 'help', icon: 'mdi-help', path: '/help' },
    ],
    mini: true,
  }),
};
</script>
