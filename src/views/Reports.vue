<template>
  <div class="inventory">
    <v-container fluid class="d-flex justify-center flex-column">
      <v-card flat class="pa-3 mb-4">
        <v-row wrap>
          <v-col xs="12" md="6">
            <h3 class="grey--text text--darken-1 font-weight-medium">Laporan</h3>
          </v-col>
          <v-col xs="12" md="6">
            <v-select
              v-model="yearData"
              :items="yearItems"
              label="Tahun Laporan"
              required></v-select>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
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
                      v-on="on">Cetak laporan</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Cetak laporan</span>
                    </v-card-title>

                    <v-card-text>
                      <div class="d-flex justify-center flex-column">
                        <v-btn
                          dark
                          color="accent"
                          class="mt-2">
                          Cetak PDF
                        </v-btn>
                        <v-btn
                          dark
                          color="success darken-2"
                          class="mt-4">
                          Cetak EXCEL
                        </v-btn>
                      </div>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent darken-2" text @click="close">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
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
      yearData: null,
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
      ],
      goods: [],
      yearItems: [
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023'
      ]
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.goods =[
        {
          no: 1,
          nama: 'Frozen Banana',
          jumlah: 100,
          jenis: 'Keluar',
          tanggal: '01-01-2020',
          keterangan: 'Dikirim ke distributor'
        },
      ]
    },
    totalGoods() {
      let goodsTotal = this.goods.map(value => value.jumlah);
      return goodsTotal.reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0);
    },
    close() {
      this.dialog = false;
    }
  },
}
</script>
