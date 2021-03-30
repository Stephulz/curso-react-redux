/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from 'src/components/Page';
import {
  listar,
  salvar, deletar,
  alterarStatus
} from '../../../store/tarefasReducer';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TarefasListView = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar salvar={props.salvar} />
        <Box mt={3}>
          <Results
            tarefas={props.tarefas}
            alterarStatus={props.alterarStatus}
            deletar={props.deletar}
          />
        </Box>
      </Container>
      <Dialog open={props.openDialog} onClose={props.setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <Typography>{props.mensagem}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  tarefas: state.tarefaReducer.tarefas
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  listar,
  salvar,
  deletar,
  alterarStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TarefasListView);
