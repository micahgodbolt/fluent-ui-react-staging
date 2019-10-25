import { createContext, useContext } from 'react';

import { ITheme } from './theme.types';

export const ThemeContext = createContext<ITheme | undefined>({} as any);

export const useTheme = () => useContext(ThemeContext);
