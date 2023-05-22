import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// component
import { StyledChart } from './component/chart';
import ScrollToTop from './component/scroll-to-top';
import { RoleContextProvider } from './RoleContext'; 

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <RoleContextProvider>
            <Router />
          </RoleContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}