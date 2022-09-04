import React, { FC } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { DefaultTheme } from 'styled-components';

interface ToggleThemeButtonProps {
    onClick: () => void;
    theme: DefaultTheme;
}

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = ({onClick, theme}) => {
  return (
    <Tooltip title="Toggle Theme">
        <IconButton onClick={onClick}>
            {theme.mode === 'dark' ? <NightlightIcon color="info" /> : <LightModeIcon color="info" />}
        </IconButton>
    </Tooltip>
  )
}
