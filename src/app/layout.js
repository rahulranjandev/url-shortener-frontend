import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export const metadata = {
  title: 'URL Shortener',
  description: 'A PWA for shortening URLs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      </body>
    </html>
  );
}
