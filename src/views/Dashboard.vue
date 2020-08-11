<template>
  <div class="dashboard mt-10">
    <v-container fluid ma-0 pa-0>
      <v-row class="d-flex justify-center mx-4" xs="mx-auto">
        <v-col 
          cols="12" 
          lg="6"
          md="6"
          sm="12"
          xs="12"
          v-for="(item, index) in cardItems"
          :key="index">
          
          <v-card
            class="d-flex flex-column"
            relative
            dark
            color="secondary"
            outlined
            height="100%"
            width="100%">

            <v-card 
              width="60" 
              height="60" 
              class="icon-card d-flex justify-center"
              color="info">
              
              <v-icon size="40" absolute v-text="item.icon"></v-icon>
            </v-card>
            <div>
              <v-list-item-title class="subtitle-1 font-weight-medium ma-4">
                {{ item.title }}
              </v-list-item-title>
            </div>

            <v-sheet
              class="v-sheet--offset mx-auto rounded-sm"
              color="warning"
              elevation="12"
              width="95%"
              >

              <v-sparkline
                :labels="item.value"
                :value="item.value"
                color="primary"
                line-width="2"
                padding="16">
              
                <template v-slot:label="item">
                  {{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
            <v-card-actions class="justify-center">
              <v-btn block text>
                Selengkapnya
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="12"
          xs="12">
          
          <v-card
            color="secondary"
            rounded-sm
            width="100%">
            <goods-chart></goods-chart>
          </v-card>
        </v-col>
        <v-col 
          cols="12" 
          lg="4"
          md="6"
          sm="12"
          xs="12">
          
          <v-card
            class="d-flex flex-column"
            dark
            color="secondary"
            outlined
            height="100%"
            width="100%">
            <div>
              <v-list-item-title class="subtitle-1 font-weight-medium d-flex justify-center flex-column text-center ma-4">
                <v-icon size="40" left>analytics</v-icon>
                <span class="text-h6">Total barang</span>
              </v-list-item-title>
            </div>
            <v-row class="d-flex justify-center text-center">
              <v-col
                v-for="(good, index) in goodsTotal"
                :key="index"
                cols="12"
                md="6">
                <v-chip
                  class="ma-2"
                  color="accent"
                  label>
                  <v-icon left>local_dining</v-icon>
                  {{ good.title }}
                </v-chip>
                <p class="text-h4">{{ good.value }}</p>
              </v-col>
            </v-row>
            <v-card-actions class="mt-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary">
                <v-icon left>keyboard_arrow_right</v-icon>
                <span>Selengkapnya</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GoodsChart from './charts/GoodsChart.vue'

export default {
  data() {
    return {
      cardItems: [
        { 
          title: 'Barang terjual / minggu', 
          icon: 'assignment_turned_in', 
          color: 'success',
          labels: [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu'
          ],
          value: [
            95,
            89,
            123,
            44,
            56,
            90,
            102
          ]
        },
        { 
          title: 'Barang diterima / minggu', 
          icon: 'assignment_returned', 
          color: 'accent',
          labels: [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu'
          ],
          value: [
            95,
            89,
            123,
            44,
            56,
            90,
            102
          ]
        },
      ],
      goodsTotal: [
        { title: 'Masakan', value: 230 },
        { title: 'Minuman', value: 230 },
        { title: 'Alat Mandi', value: 110 },
        { title: 'Bahan Makanan', value: 200 }
      ]
    }
  },
  components: {
    goodsChart: GoodsChart
  }
}
</script>

<style>
.v-sheet--offset {
  top: -2px;
  position: relative;
}

.icon-card {
  top: -20px;
  left: 20px;
}
</style>'
