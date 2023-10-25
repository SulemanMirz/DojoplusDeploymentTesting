import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';
import {
  COLOR_BACKGROUND_DARK,
  COLOR_BACKGROUND_DARK_LIGHT,
  COLOR_BACKGROUND_LIGHT,
  // COLOR_BUTTON_RED_LIGHT,
  COLOR_INPUT_DARK,
  COLOR_INPUT_LIGHT,
  COLOR_LETTERS_DARK,
  COLOR_LETTERS_WHITE,
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_LIGHT_GREEN,
  COLOR_BUTTON_DARK,
  COLOR_YELLOW,
  COLOR_BUTTON_RED,
  CHECKIN_YELLOW,
} from './colors';

//  Theme configuration variables
declare module '@mui/material/styles' {
  interface Palette {
    backgroundDarkGray: Palette['primary'];
    backgroundGray: Palette['primary'];
    backgroundLightGray: Palette['primary'];
    letterColorWhite: Palette['primary'];
    letterColorDark: Palette['primary'];
    inputColorLight: Palette['primary'];
    inputColorDark: Palette['primary'];
    green: Palette['primary'];
    lightGreen: Palette['primary'];
    blue: Palette['primary'];
    checkInYellow: Palette['primary'];
  }
  interface PaletteOptions {
    backgroundDarkGray: PaletteOptions['primary'];
    backgroundGray: PaletteOptions['primary'];
    backgroundLightGray: PaletteOptions['primary'];
    letterColorWhite: PaletteOptions['primary'];
    letterColorDark: PaletteOptions['primary'];
    inputColorLight: PaletteOptions['primary'];
    inputColorDark: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    lightGreen: PaletteOptions['primary'];
    blue: PaletteOptions['primary'];
    checkInYellow: PaletteOptions['primary'];
  }
}

// Create a theme instance
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: COLOR_BUTTON_RED,
      light: '#ff595f',
      dark: '#B23E42',
    },
    secondary: {
      main: COLOR_BUTTON_DARK,
    },
    warning: {
      main: COLOR_YELLOW,
    },
    text: {
      primary: COLOR_LETTERS_WHITE,
      secondary: COLOR_LETTERS_DARK,
    },
    backgroundDarkGray: {
      main: COLOR_BACKGROUND_DARK,
    },
    backgroundGray: {
      main: COLOR_BACKGROUND_DARK_LIGHT,
    },
    backgroundLightGray: {
      main: COLOR_BACKGROUND_LIGHT,
    },
    letterColorWhite: {
      main: COLOR_LETTERS_WHITE,
    },
    letterColorDark: {
      main: COLOR_LETTERS_DARK,
    },
    inputColorLight: {
      main: COLOR_INPUT_LIGHT,
    },
    inputColorDark: {
      main: COLOR_INPUT_DARK,
    },
    green: {
      main: COLOR_GREEN,
    },
    lightGreen: {
      main: COLOR_LIGHT_GREEN,
    },
    blue: {
      main: COLOR_BLUE,
    },
    checkInYellow: {
      main: CHECKIN_YELLOW,
    },
  },
  typography: {
    fontFamily: 'Saira',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          fontWeight: 'bolder',
        },
        containedSecondary: {
          background: '#111111',
          color: '#FCFCFC',
          '&:hover': {
            borderColor: COLOR_BACKGROUND_LIGHT,
          },
        },
        outlinedSecondary: {
          border: '1px solid #4F4F4F',
          color: '#FCFCFC',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    // MuiPickersDay: {
    //   styleOverrides: {
    //     root: {
    //       color: '#111',
    //       '&:hover': {
    //         background: '#f00',
    //         color: '#fff',
    //       },
    //     },
    //   },
    // },
  },
});
