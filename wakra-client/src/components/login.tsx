import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Token } from 'types/interface';
import { saveToken } from 'utilities/storage';

// ADD SHOW PASSWORD TO TEXT
export const Login = (): JSX.Element => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const [helpText, setHelperText] = useState('');
  const { data, fetch, loading, success, message } = useAxios<Token>(
    'http://10.9.46.144:6060/login'
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && success && data) {
      saveToken(data.token);
      navigate('/');
    }
  }, [data, loading, success, navigate]);

  const handlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFields((currentFields) => ({
      ...currentFields,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHelperText('');

    if (!fields.username || !fields.password) {
      setHelperText('All fields are required.');
      return;
    }

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
        component="form"
        sx={{
          bgcolor: '#fff',
          minHeight: '90vh',
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
              size="large"
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={36} /> : 'Login'}
            </Button>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Typography
              variant="caption"
              color={success ? 'blue' : 'red'}
              align="center"
              fontSize={12}
            >
              {message}
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Typography variant="caption" color="red" align="center" fontSize={12}>
              {helpText}
            </Typography>
          </Grid>

          {data && (
            <Grid item container alignItems="center" justifyContent="center" xs={12}>
              <Typography variant="subtitle2" color="gray" align="center">
                Token: {data.token}
              </Typography>
              <Typography variant="subtitle2" color="gray" align="center">
                Expires In: {data.expiresIn}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};
