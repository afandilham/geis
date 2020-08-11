<template>
  <div class="inventory">
    <v-container fluid class="d-flex justify-center flex-column">
      <v-card flat class="pa-3 mb-4">
        <v-row wrap>
          <v-col xs="12" md="6">
            <h3 class="grey--text text--darken-1 font-weight-medium">Barang Masuk / Keluar</h3>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-card-title>
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
            :items="goods"
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
                      v-on="on">Tambah data</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.nama"
                              :items="nameItems"
                              :rules="[v => !!v || 'Item is required']"
                              label="Nama Barang"
                              required></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.jumlah" :rules="[v => !!v || 'Item is required']" label="Jumlah"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.jenis"
                              :items="typeItems"
                              :rules="[v => !!v || 'Item is required']"
                              label="Jenis Barang"
                              required></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-text-field v-model="editedItem.keterangan" :rules="[v => !!v || 'Item is required']" label="Keterangan"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.tanggal"
                                  label="Tanggal"
                                  prepend-icon="event"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                ref="picker"
                                v-model="editedItem.tanggal"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                :rules="[v => !!v || 'Item is required']"
                                @change="saveDate"
                              ></v-date-picker>
                            </v-menu>
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
                color="info"
                class="mr-2"
                @click="editItem(item)">
                edit
              </v-icon>
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
      date: null,
      menu: false,
      search: '',
      headers: [
        {
          text: 'No',
          align: 'start',
          sortable: false,
          value: 'no',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Jumlah', value: 'jumlah' },
        { text: 'Jenis', value: 'jenis' },
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Opsi', value: 'opsi', sortable: false },
      ],
      goods: [],
      editedIndex: -1,
      nameItems: [
        'Frozen Banana',
        'Tango',
        'Frutang',
        'Rexona',
      ],
      typeItems: [
        'Masuk',
        'Keluar',
      ],
      editedItem: {
        nama: '',
        jumlah: new Date().toISOString().substr(0, 10),
        jenis: '',
        tanggal: '',
        keterangan: '',
      },
      resetInputItem: {
        nama: '',
        jumlah: 0,
        jenis: '',
        tanggal: '',
        keterangan: '',
      }
    }
  },
  mounted() {
    this.initialize();
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Data Masuk' : 'Edit Data Masuk'
    },
  },
  methods: {
    initialize() {
      this.goods =[
        {
          no: 1,
          nama: 'Frozen Banana',
          jumlah: 100,
          jenis: 'Keluar',
          tanggal: '',
          keterangan: 'Dikirim ke distributor'
        },
      ]
    },
    editItem (item) {
      this.editedIndex = this.goods.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.goods.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.goods.splice(index, 1)
    },
    totalGoods() {
      let goodsTotal = this.goods.map(value => value.jumlah);
      return goodsTotal.reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0);
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
        Object.assign(this.goods[this.editedIndex], this.editedItem)
      } else {
        this.goods.push(this.editedItem)
      }
      this.close()
    },

    saveDate (date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
