import { FC, useEffect, useMemo, useState } from 'react';
import { Input, InputWrapper } from '../styles/GlobalStyles';
import storage from 'local-storage-fallback';

const getInitialValueFromLocalStore = (valueName: string) => {
	const res = storage.getItem(valueName);
	return res ? JSON.parse(res) : 1;
};

export const PositionSizeForm: FC = () => {
	const [isError, setIsError] = useState<boolean>(false);
	const [deposit, setDeposit] = useState(
		getInitialValueFromLocalStore('deposit')
	);
	const [stopLoss, setStopLoss] = useState(
		getInitialValueFromLocalStore('stopLoss')
	);

	const calculatedPositionSize = useMemo(() => {
		const rawResult = (deposit / 100 / stopLoss) * 100;
		const roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
		const checkIfNoError =
			typeof roundedResult === 'number' &&
			!isNaN(roundedResult) &&
			roundedResult !== Infinity;
		setIsError(!checkIfNoError);
		return checkIfNoError ? roundedResult : 'Error';
	}, [deposit, stopLoss]);

	useEffect(() => {
		storage.setItem('deposit', JSON.stringify(deposit));
	}, [deposit]);

	useEffect(() => {
		storage.setItem('stopLoss', JSON.stringify(stopLoss));
	}, [stopLoss]);

	return (
		<div>
			<InputWrapper>
				<label htmlFor="depositSize">Deposit size</label>
				<Input
					type="number"
					id="depositSize"
					name="depositSize"
					value={deposit}
					onChange={({ target }) => setDeposit(target.value)}
					min={1}
				/>
			</InputWrapper>
			<InputWrapper>
				<label htmlFor="stopLoss">Stop Loss in %</label>
				<Input
					type="number"
					id="stopLoss"
					name="stopLoss"
					step="0.01"
					value={stopLoss}
					onChange={({ target }) => setStopLoss(target.value)}
					min={0.01}
				/>
			</InputWrapper>
			{isError ? (
				<h2>Error</h2>
			) : (
				<h2>Position size: ${calculatedPositionSize}</h2>
			)}
		</div>
	);
};
