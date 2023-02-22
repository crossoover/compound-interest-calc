import { FC, useEffect, useMemo, useState } from 'react';
import storage from 'local-storage-fallback';
import { toast } from 'react-toastify';
import { Input, InputWrapper, Result } from '../styles/GlobalStyles';

const getInitialValueFromLocalStore = (valueName: string) => {
	const res = storage.getItem(valueName);
	return res ? JSON.parse(res) : 1;
};

const copyToClipBoard = (value: Number) => {
	navigator.clipboard.writeText(String(value));
	toast.success('Result copied to clipboard.', {
		toastId: 'success1',
	});
};

export const PositionSizeForm: FC = () => {
	const [isError, setIsError] = useState<boolean>(false);
	const [deposit, setDeposit] = useState(
		getInitialValueFromLocalStore('deposit')
	);
	const [stopLoss, setStopLoss] = useState(
		getInitialValueFromLocalStore('stopLoss')
	);
	const [risk, setRisk] = useState(getInitialValueFromLocalStore('risk'));

	const calculatedPositionSize = useMemo(() => {
		const rawResult = (deposit / 100 / stopLoss) * (100 * risk);
		const roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
		const checkIfNoError =
			typeof roundedResult === 'number' &&
			!isNaN(roundedResult) &&
			roundedResult !== Infinity;
		setIsError(!checkIfNoError);
		return checkIfNoError ? roundedResult : 'Error';
	}, [deposit, stopLoss, risk]);

	useEffect(() => {
		storage.setItem('deposit', JSON.stringify(deposit));
	}, [deposit]);

	useEffect(() => {
		storage.setItem('stopLoss', JSON.stringify(stopLoss));
	}, [stopLoss]);

	useEffect(() => {
		storage.setItem('risk', JSON.stringify(risk));
	}, [risk]);

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
			<InputWrapper>
				<label htmlFor="risk">Risk per Trade in %</label>
				<Input
					type="number"
					id="risk"
					name="risk"
					step="0.1"
					value={risk}
					onChange={({ target }) => setRisk(target.value)}
					min={0.1}
				/>
			</InputWrapper>
			{isError ? (
				<h2>Error</h2>
			) : (
				<h2>
					Position size: $
					<Result
						onClick={() => {
							copyToClipBoard(calculatedPositionSize as number);
						}}
					>
						{calculatedPositionSize}
					</Result>
				</h2>
			)}
		</div>
	);
};
