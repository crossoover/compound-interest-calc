import React, { FC } from "react";

import { Description, Table, TableHead, TableHeadUnit, TableRow, TableRowUnit } from "./Summary.styles";
import { IChartPayload } from "./CompoundInterestChart";
import { StyledSubtitle } from "../styles/GlobalStyles";

interface SummaryProps {
    period: number;
    data: IChartPayload[]
}

const toNumber = (value: number) => {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Summary: FC<SummaryProps> = ({ period, data }) => {
  return (
    <>
      <StyledSubtitle>Summary</StyledSubtitle>
      <Description>
        In {period} periods, you will have {toNumber(data[data.length - 1].value)}
      </Description>
      <h3>Breakdown</h3>
      <Table>
        <TableHead>
          <tr>
            <TableHeadUnit scope="col">End of Year</TableHeadUnit>
            <TableHeadUnit scope="col">Value</TableHeadUnit>
          </tr>
        </TableHead>
        <tbody>
          {data.map(({ label, value }) => (
            <TableRow key={label}>
              <TableRowUnit>{label}</TableRowUnit>
              <TableRowUnit>{value.toFixed(2)}</TableRowUnit>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
