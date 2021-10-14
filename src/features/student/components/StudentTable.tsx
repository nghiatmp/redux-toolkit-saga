import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Student} from 'models';
import { Box, Button } from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(2),
  }
}));

export interface StudentTableProps {
  studentList: Student[];
  onEdit?: (student: Student) =>void;
  onRemove?: (student: Student) =>void;
}

export default function StudentTable({ studentList, onEdit, onRemove } : StudentTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student) => (
            <TableRow key={ student.id }>
              <TableCell width={160}>{ student.id }</TableCell>
              <TableCell>{ student.name }</TableCell>
              <TableCell>{ capitalizeString(student.gender) }</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)} fontWeight="bold">
                  { student.mark }
                </Box>
              </TableCell>
              <TableCell>{ student.city }</TableCell>
              <TableCell align="right">
                <Button
                  className={classes.edit}
                  size="small"
                  color="primary"
                  onClick={ () => onEdit?.(student)}
                >Edit</Button>
                <Button
                  color="secondary"
                  size="small"
                  onClick={ () => onRemove?.(student)}
                  >
                    Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}