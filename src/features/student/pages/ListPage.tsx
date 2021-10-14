import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer :{
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4)
  },
  pagination : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },

  loading : {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }

}));

export default function ListPage () {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectStudentFilter);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const loading = useAppSelector(selectStudentLoading);

  useEffect(() => {
    dispatch(studentActions.fetchData(filters));
  }, [filters, dispatch]);

  const onChangePage=(page: number) => {
    dispatch(studentActions.setFilter({
      ...filters,
      _page: page
    }))
  }
  return (
    <div>
        <Box className={classes.root}>
          {loading && <LinearProgress className={classes.loading}/>}
          <Box className={classes.titleContainer}>
            <Typography variant="h4">Students</Typography>
            <Button variant="contained" color="primary">
              Add new student
            </Button>
          </Box>
          <StudentTable studentList={studentList} />

          <Box className={classes.pagination}>
            <Pagination
              color="primary"
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              variant="outlined"
              shape="rounded"
              page={pagination._page}
              onChange={(event, page) => onChangePage(page)}
            />
          </Box>
        </Box>
    </div>
  );
}
