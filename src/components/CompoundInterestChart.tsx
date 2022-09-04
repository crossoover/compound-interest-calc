import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Summary } from "./Summary";
import { Divider, StyledSubtitle } from "../styles/GlobalStyles";

export interface IChartPayload {
  value: number;
  label: string;
}

interface CompoundInterestChartProps {
  initialAmount: number;
  period: number;
  growthRate: number;
  periodContribution: number; 
}

const renderTooltip = ({ payload }: { payload: IChartPayload[] }) => {
  if (!payload[0]) return;

  return <span>{payload[0].value.toFixed(2)}</span>;
}

export const CompoundInterestChart: FC<CompoundInterestChartProps> = ({ initialAmount, period, growthRate, periodContribution }) => {
  const data = React.useMemo(
    () => {
      const result = [];

      for (let i = 1; i <= period; i++) {
        let lastFutureValue = initialAmount + periodContribution * 12;
        if (result.length > 0) {
          lastFutureValue = result[result.length - 1].value + periodContribution * 12;
        }
        result.push({
          label: `${i}`,
          value: lastFutureValue * Math.pow(1 + growthRate / 100, 1)
        });
      }

      return result;
    },
    [initialAmount, period, growthRate, periodContribution]
  );

  return (
    <>
      <StyledSubtitle>Projected Growth</StyledSubtitle>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            {/* @ts-expect-error */}
            <Tooltip content={renderTooltip} />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Divider />
      <Summary period={period} data={data} />
    </>
  );
}
