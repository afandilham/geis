<template>
  <nav>
    <v-app-bar 
      dark 
      flat 
      app 
      class="primary">

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="title text-uppercase font-weight-medium">
        <!-- Goods Easy Inventory System -->
        <v-icon left size="35">addchart</v-icon>
        <span>GEIS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item) in links"
            :key="item.icon"
            router
            :to="item.route"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn color="primary">
        <v-icon>exit_to_app</v-icon>
        <span>Keluar</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      dark
      bottom
      xsOnly
      height="100%"
      v-model="drawer"
      class="secondary">
      
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">Gordon Jersey</v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list rounded>
        <v-list-item 
          v-for="(item) in links" 
          :key="item.icon" 
          link 
          router
          :to="item.route">
          
          <v-list-item-icon left>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="(item, index) in masterLinks"
          :key="index"
          v-model="item.active"
          color="white--text"
          :prepend-icon="item.action"
          no-action>

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item 
            v-for="(subItem) in item.items" 
            :key="subItem.icon"
            link router
            :to="subItem.route">
            
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { icon: 'dashboard', title: 'Beranda', route: '/'},
        { icon: 'assignment_returned', title: 'Barang In/Out', route: '/in-out-item' },
        { icon: 'assignment', title: 'Laporan', route: '/reports' },
      ],
      masterLinks: [{
        action: 'source',
        title: 'Master Data',
        items: [
          { icon: 'table_view', title: 'Data Barang', route: '/inventory' },
          { icon: 'supervised_user_circle', title: 'Data User', route: '/user' },
        ]
      }],
      drawer: false
    }
  },
}
</script>
