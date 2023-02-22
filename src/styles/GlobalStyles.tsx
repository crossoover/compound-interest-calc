import styled, { createGlobalStyle, DefaultTheme } from 'styled-components';

export const darkTheme = {
	defaultColor: '#111',
	textColor: '#EEE',
};

export const lightTheme = {
	defaultColor: '#EEE',
	textColor: '#111',
};

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Helvetica', sans-serif;
    }

    body {
        background-color: ${(props) =>
					props.theme.mode === 'dark'
						? darkTheme.defaultColor
						: lightTheme.defaultColor};
        color: ${(props) =>
					props.theme.mode === 'dark'
						? darkTheme.textColor
						: lightTheme.textColor};
    }
`;

export const AppContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const AppWrapper = styled.div`
	padding: 20px;

	@media screen and (min-width: 900px) {
		width: 500px;
	}
`;

export const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Button = styled.button`
	padding: 5px 10px;
	text-transform: uppercase;
	font-weight: bold;
	border-radius: 0;
	border: 3px solid black;
	cursor: pointer;
	color: black;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

export const Input = styled.input`
	padding: 5px 10px;
	border-radius: 0;
	border: 3px solid black;
	width: 200px;
`;

export const StyledSubtitle = styled.h2`
	margin: 10px 0;
`;

export const Divider = styled.hr`
	margin: 5px 0;
`;

export const Result = styled.span`
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;
