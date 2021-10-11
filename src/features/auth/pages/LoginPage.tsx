import * as React from 'react';
import { Button, Paper, Typography, makeStyles, Box, CircularProgress } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((them) => ({
  root : {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box : {
    padding: them.spacing(3)
  }
}));


export default function LoginPage () {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(state =>state.auth.logging);
  const handleLogin = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }))
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">Student Management</Typography>

        <Box mt='4'>
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
              {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp;
              Login
            </Button>
        </Box>
      </Paper>
    </div>
  );
}
 