import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
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
          <>
            {children}
            <Analytics />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
