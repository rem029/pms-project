import { useState } from 'react';
import { Buffer } from 'buffer';
import {
  Container,
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useAxios } from '../hooks/useAxios';
import {UserInfo} from 'utils/interface'

export const Login = (): JSX.Element => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const { data, fetch, loading } = useAxios<UserInfo>('http://localhost:6060/login');

  const handlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFields((currentFields) => ({
      ...currentFields,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('handleSubmit', fields);
    fetch({
      headers: {
        Authorization: `Basic ${Buffer.from(
          fields.username + ':' + fields.password
        ).toString('base64')}`,
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          bgcolor: '#fff',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Typography variant="h6">Login Page</Typography>
          </Grid>

          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={fields.username}
              onChange={handlChange}
            />
          </Grid>

          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={fields.password}
              onChange={handlChange}
            />
          </Grid>

          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={36} /> : 'Login'}
            </Button>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Typography
              variant="subtitle1"
              color={data.success ? 'blue' : 'red'}
              align="center"
            >
              {data.message}
            </Typography>
          </Grid>

          {data.data && <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Typography
              variant="subtitle1"
              color="gray"
              align="center"
            >
              UserId: {data.Usr_Id}
            </Typography>
          </Grid>}
        </Grid>
      </Box>
    </Container>
  );
};
