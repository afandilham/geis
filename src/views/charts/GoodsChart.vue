<template>
  <div class="ma-1">
    <apexchart
      height="415"  
      width="100%" 
      :options="options" 
      :series="series">

    </apexchart> 
  </div>
</template>

<script>
export default {
  name: 'ChartBarang',
  data: () => ({
    options: {
      chart: {
        id: 'vuechart-barang',
        foreColor: '#fff'
      },
      grid: {
        position: 'front',
        borderColor: '#fff',
        strokeDashArray: 9
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      stroke: {
        width: [0, 6]
      },
      plotOptions: {
        bar: {
          endingShape: 'rounded',
          columnWidth: '60%'
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      yaxis: {
        title: {
          text: 'Jual Masuk Barang',
          style: {
            fontSize: '15px'
          }
        }
      }
    },
    series: [
      {
        name: 'Terjual',
        data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
        type: 'bar'
      },
      {
        name: 'Barang Masuk',
        data: [55, 20, 49, 66, 92, 72, 101, 75, 94, 120, 117, 139],
        type: 'line'
      },
    ],
  })
}
</script>
