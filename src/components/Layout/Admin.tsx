import { Box, makeStyles } from '@material-ui/core';
import { Header, SideBar } from 'components/Common';
import DashBoard from 'features/dashboard';
import StudentFeature from 'features/student';
import * as React from 'react';
import { Route, Switch } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root : {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh'
  },

  header: {
    gridArea: 'header',
  },
  sideBar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3)
  },

}));

export function AdminLayout() {
  const classes = useStyles();
  return (
      <Box className={classes.root}>
        <Box className={classes.header}>
            <Header />
        </Box>
        <Box className={classes.sideBar}>
            <SideBar />
        </Box>

        <Box className={classes.main}>
            <Switch>
                <Route path="/admin/dashboard">
                    <DashBoard />
                </Route>

                <Route path="/admin/students">
                    <StudentFeature />
                </Route>
            </Switch>
        </Box>

      </Box>
  );
}
