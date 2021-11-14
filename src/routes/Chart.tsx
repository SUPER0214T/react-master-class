import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["onlcv", coinId], () => 
    fetchCoinHistory(coinId), 
    {
      refetchInterval: 10000,
    }
  )

  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      <ApexChart 
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map(price => price.close),
          }
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            height: '500px', 
            width: '500px',
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 5,
          },
          xaxis: {
            axisBorder: {show:false},
            axisTicks: {show: false},
            labels: {show: false},
            type: "datetime",
            categories: data?.map(price => price.time_close),
          },
          yaxis: {
            show: true,
            labels: {
              formatter: function(val, index) {
                return val.toFixed(2);
              }
            }
          },
          tooltip: {
            y: {
              formatter: value => `$${value.toFixed(2)}`
            }
          },
          fill: {
            type: "gradient",
            gradient: {gradientToColors: ["#0be881"], stops:[0, 100]}
          },
        }}
      />
    </div>
  )
}

export default Chart;