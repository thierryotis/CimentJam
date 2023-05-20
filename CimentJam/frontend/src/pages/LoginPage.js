
// @mui
import { styled } from '@mui/material/styles';
import {  Container } from '@mui/material';

// hooks
import useResponsive from '../hooks/useResponsive';
// component
import LoginComponent from "../component/Login"

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Container maxWidth="sm">
        <LoginComponent />
    </Container>  
  );
}
