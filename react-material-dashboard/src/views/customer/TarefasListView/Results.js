import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core';

import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = (
  {
    className, tarefas, alterarStatus, deletar, ...rest
  }
) => {
  const classes = useStyles();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((tarefa) => (
                  <TableRow key={tarefa.id}>
                    <TableCell>
                      <Typography>{tarefa.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{tarefa.descricao}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{tarefa.categoria}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{tarefa.done ? 'Feito' : 'Pendente'}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => alterarStatus(tarefa.id)} color="secondary">
                        {tarefa.done ? (<DoneAllIcon />) : (<TimerIcon />)}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deletar(tarefa.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  tarefas: PropTypes.array.isRequired,
  alterarStatus: PropTypes.func,
  deletar: PropTypes.func
};

export default Results;
