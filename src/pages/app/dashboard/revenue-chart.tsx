import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";

const RevenueChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  // Formata as datas
  const formattedFrom = dateRange?.from
    ? format(dateRange.from, "dd/MM/yyyy")
    : "Data não definida";
  const formattedTo = dateRange?.to
    ? format(dateRange.to, "dd/MM/yyyy")
    : "Data não definida";

  console.log(formattedFrom, formattedTo);

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map(
      (chartItem): { date: string; receipt: number } => {
        return {
          date: chartItem.date,
          receipt: chartItem.receipt / 100,
        };
      },
    );
  }, [dailyRevenueInPeriod]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no periodo
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange onDateChange={setDateRange} date={dateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData?.length ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet["500"]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <span className="text-gray-500">
              Não há dados para as datas {formattedFrom} - {formattedTo}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
