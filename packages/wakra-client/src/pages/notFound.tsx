import { Box, Container, Link, Typography } from '@mui/material';

export const NotFound = (): JSX.Element => {
  return (
    <Container>
      <Box
        component="form"
        sx={{
          bgcolor: '#fff',
          minHeight: '90vh',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography variant="h2" align="center">
          404 Page not found
        </Typography>
        <Link href="/" variant="body2">
          Go back
        </Link>
      </Box>
    </Container>
  );
};
