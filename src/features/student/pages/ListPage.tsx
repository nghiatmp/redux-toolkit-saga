import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Pagination } from '@material-ui/lab';
import { selectCityMap, selectListCity } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams } from 'models';

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
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectListCity);

  useEffect(() => {
    dispatch(studentActions.fetchData(filters));

  }, [filters, dispatch]);

  const onChangePage=(page: number) => {
    dispatch(studentActions.setFilter({
      ...filters,
      _page: page
    }))
  }

  const handleFilterChange =(newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  }
  
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
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

          <Box mb={3}>
            <StudentFilters
              filter={filters}
              cityList={cityList}
              onSearchChange={handleSearchChange}
              onChange={handleFilterChange}
            />
          </Box>
          <StudentTable
            studentList={studentList}
            cityMap={cityMap}
          />

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
