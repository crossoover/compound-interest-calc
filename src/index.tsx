import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import storage from 'local-storage-fallback';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { defaultState } from './state/defaultState';
import { VariablesForm } from './components/VariablesForm';
import {
	GlobalStyle,
	AppWrapper,
	HeaderWrapper,
	AppContainer,
	Divider,
	Button,
} from './styles/GlobalStyles';
import { CompoundInterestChart } from './components/CompoundInterestChart';
import { ToggleThemeButton } from './components/ToggleThemeButton';
import { PositionSizeForm } from './components/PositionSizeForm';

export const getInitialTheme = () => {
	const savedTheme = storage.getItem('theme');
	return savedTheme ? JSON.parse(savedTheme) : { mode: 'light' };
};

const getIsCompoundShown = () => {
	const res = storage.getItem('isCompoundShown');
	return res ? JSON.parse(res) : true;
};

const App: FC = () => {
	const [state, setState] = useState(defaultState);
	const [theme, setTheme] = useState(getInitialTheme());
	const [isCompoundShown, setIsCompoundShown] = useState(getIsCompoundShown());

	useEffect(() => {
		storage.setItem('theme', JSON.stringify(theme));
	}, [theme]);

	useEffect(() => {
		storage.setItem('isCompoundShown', JSON.stringify(isCompoundShown));
	}, [isCompoundShown]);

	const toggledTheme = () =>
		setTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' });

	return (
		<ThemeProvider theme={theme}>
			<AppContainer>
				<GlobalStyle />
				<ToastContainer limit={1} autoClose={3000} />
				<AppWrapper>
					<HeaderWrapper>
						<h1>Position Size Calculator</h1>
						<ToggleThemeButton onClick={toggledTheme} theme={theme} />
					</HeaderWrapper>
					<PositionSizeForm />
					<Divider />
					<br />
					<Button onClick={() => setIsCompoundShown(!isCompoundShown)}>
						{isCompoundShown ? 'Hide' : 'Show'} compound interest calc
					</Button>
					<br />
					<br />
					{isCompoundShown && (
						<>
							<HeaderWrapper>
								<h1>Compound Interest Calculator</h1>
							</HeaderWrapper>
							<Divider />
							<VariablesForm onUpdate={(variables) => setState(variables)} />
							<Divider />
							<CompoundInterestChart {...state} />
						</>
					)}
				</AppWrapper>
			</AppContainer>
		</ThemeProvider>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
