<template>
  <div class="user">
    <v-container fluid class="d-flex justify-center flex-column">
      <v-card>
        <v-card-title>
          Data Pengguna
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <template>
          <v-data-table
            :headers="headers"
            :items="users"
            :search="search">
            
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="secondary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on">Tambah Pengguna</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tambah Pengguna</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.id_pegawai" label="ID Pegawai"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nama" label="Nama"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.divisi"
                              :items="divisionItems"
                              :rules="[v => !!v || 'Item is required']"
                              label="Tipe"
                              required></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent lighten-2" text @click="close">Cancel</v-btn>
                      <v-btn color="secondary darken-3" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.opsi`]="{ item }">
              <v-icon
                color="accent"
                @click="deleteItem(item)">
                delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'ID pegawai',
          align: 'start',
          sortable: false,
          value: 'id_pegawai',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Divisi', value: 'divisi' },
        { text: 'Opsi', value: 'opsi', sortable: false}
      ],
      users: [],
      editedIndex: -1,
      divisionItems: [
        'Pemasaran',
        'Sales',
        'Direktur',
      ],
      editedItem: {
        id_pegawai: '',
        nama: '',
        divisi: '',
        password: ''
      },
      resetInputItem: {
        id_pegawai: '',
        nama: '',
        divisi: '',
        password: ''
      },
    }
  },
  mounted() {
    this.initialize();
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    initialize() {
      this.users =[
        {
          id_pegawai: 'P001',
          nama: 'Moch. Ilham Afandi',
          email: 'nano_nuggets@gmail.com',
          divisi: 'Direktur',
        },
      ]
    },
    deleteItem (item) {
      const index = this.users.indexOf(item)
      confirm('Apakah anda ingin menghapus data ini?') && this.users.splice(index, 1)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.resetInputItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
