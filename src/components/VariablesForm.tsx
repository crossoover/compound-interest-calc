import React, { FC, useState } from "react";
import { defaultState, IState } from "../state/defaultState";
import {
  Button,
  Input,
  InputWrapper,
  StyledSubtitle,
} from "../styles/GlobalStyles";

interface VariablesFormProps {
  onUpdate: (value: IState) => void;
}

export const VariablesForm: FC<VariablesFormProps> = ({ onUpdate }) => {
  const [state, setState] = useState(defaultState);

  const { initialAmount, period, growthRate, periodContribution } = state;

  return (
    <section>
      <StyledSubtitle>Financials</StyledSubtitle>
      <div>
        <InputWrapper>
          <label htmlFor="initialAmount">Initial Amount</label>
          <Input
            type="number"
            id="initialAmount"
            name="initialAmount"
            value={initialAmount}
            onChange={({ target }) =>
              setState({ ...state, initialAmount: Number(target.value) })
            }
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="period">Investment Period</label>
          <Input
            type="number"
            id="period"
            name="period"
            value={period}
            onChange={({ target }) =>
              setState({ ...state, period: Number(target.value) })
            }
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="growthRate">Annual Growth Rate (%)</label>
          <Input
            type="number"
            id="growthRate"
            name="growthRate"
            value={growthRate}
            onChange={({ target }) =>
              setState({ ...state, growthRate: Number(target.value) })
            }
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="periodContribution">Monthly Contribution</label>
          <Input
            type="number"
            id="periodContribution"
            name="periodContribution"
            value={periodContribution}
            onChange={({ target }) =>
              setState({ ...state, periodContribution: Number(target.value) })
            }
          />
        </InputWrapper>
      </div>
      <Button onClick={() => onUpdate(state)}>Update Chart</Button>
    </section>
  );
};

export default VariablesForm;
