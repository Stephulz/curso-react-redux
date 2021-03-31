/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@material-ui/core';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from 'src/components/Page';
import {
  listar,
  salvar, deletar,
  alterarStatus
} from '../../../store/tarefasReducer';
import { esconderMensagem } from '../../../store/dialogReducer';
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
      <Dialog open={props.openDialog} onClose={props.esconderMensagem}>
        <DialogTitle>{props.titulo}</DialogTitle>
        <DialogContent>
          <Typography>{props.mensagem}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  tarefas: state.tarefaReducer.tarefas,
  titulo: state.dialogReducer.titulo,
  mensagem: state.dialogReducer.mensagem,
  openDialog: state.dialogReducer.mostrarMensagem
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  listar,
  salvar,
  deletar,
  alterarStatus,
  esconderMensagem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TarefasListView);
