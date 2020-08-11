<template>
  <div class="inventory">
    <v-container fluid class="d-flex justify-center flex-column">
      <v-card flat class="pa-3 mb-4">
        <v-row wrap>
          <v-col xs="12" md="6">
            <h3 class="grey--text text--darken-1 font-weight-medium">Master barang</h3>
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
                            <v-text-field v-model="editedItem.kode" label="Kode"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nama" label="Nama"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.harga_pokok" label="Harga Pokok"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.harga_jual" label="Harga jual"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.bpom" label="BPOM"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.tipe"
                              :items="typeItems"
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
      search: '',
      headers: [
        {
          text: 'Kode',
          align: 'start',
          sortable: false,
          value: 'kode',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Pokok (harga)', value: 'harga_pokok' },
        { text: 'Jual (harga)', value: 'harga_jual' },
        { text: 'BPOM', value: 'bpom' },
        { text: 'Tipe', value: 'tipe' },
        { text: 'Opsi', value: 'opsi', sortable: false },
      ],
      goods: [],
      editedIndex: -1,
      typeItems: [
        'Makanan',
        'Minuman',
        'Alat mandi',
        'Bahan masakan'
      ],
      editedItem: {
        kode: '',
        nama: '',
        harga_pokok: 0,
        harga_jual: 0,
        bpom: '',
        tipe: '',
      },
      resetInputItem: {
        kode: '',
        nama: '',
        harga_pokok: 0,
        harga_jual: 0,
        bpom: '',
        tipe: '',
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
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Barang' : 'Edit Barang'
    },
  },
  methods: {
    initialize() {
      this.goods =[
        {
          kode: 'B01',
          nama: 'Frozen Banana',
          harga_pokok: 3000,
          harga_jual: 3000,
          jumlah: 200,
          bpom: '23332123 12312 2321',
          tipe: 'Minuman'
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
    // totalGoods() {
    //   let goodsTotal = this.goods.map(value => value.jumlah);
    //   return goodsTotal.reduce((acc, currentValue) => {
    //     return acc + currentValue
    //   }, 0);
    // },
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
  },
}
</script>
