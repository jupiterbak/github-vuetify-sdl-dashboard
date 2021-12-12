<template>
  <v-card
    class="mx-auto"
    elevation="6"
  >
    <v-list-item>
      <v-list-item-avatar
        tile
      >
        <v-icon
            large
            dark
          >
            {{icon}}
          </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h7">{{title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>

export default {
  props: ['title', 'icon'],
  data: () => ({
    items: [
        {
          text: 'Inbound',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        }
      ],
  })
};
</script>