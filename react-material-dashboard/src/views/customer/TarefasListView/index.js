import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography
} from '@material-ui/core';

import axios from 'axios';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
let headers;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TarefasListView = () => {
  const classes = useStyles();
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const listarTarefas = () => {
    axios.get(API_URL, {
      headers
    }).then((res) => {
      const listaDeTarefas = res.data;
      setTarefas(listaDeTarefas);
      console.log(listaDeTarefas);
    }).catch((err) => {
      setMensagem('Ocorreu um erro', err);
      setOpenDialog(true);
      console.log(err);
    });
  };

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers
    }).then((res) => {
      const novaTarefa = res.data;
      setTarefas([...tarefas, novaTarefa]);
      setMensagem('Item adicionado com sucesso');
      setOpenDialog(true);
      console.log(res.data);
    }).catch((err) => {
      setMensagem('Ocorreu um erro', err);
      setOpenDialog(true);
      console.log(err);
    });
  };

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers
    }).then((response) => {
      const lista = [...tarefas];
      lista.forEach((tarefa) => {
        if (tarefa.id === id) {
          tarefa.done = true;
        }
      });
      setTarefas(lista);
      setMensagem('Item atualizado com sucesso');
      setOpenDialog(true);
      console.log(response);
    }).catch((err) => {
      setMensagem('Ocorreu um erro', err);
      setOpenDialog(true);
      console.log(err);
    });
  };

  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers
    }).then((response) => {
      const lista = tarefas.filter((tarefa) => tarefa.id !== id);
      setTarefas(lista);
      setMensagem('Item removido com sucesso');
      setOpenDialog(true);
      console.log(response);
    }).catch((err) => {
      setMensagem('Ocorreu um erro', err);
      setOpenDialog(true);
      console.log(err);
    });
  };

  useEffect(() => {
    headers = { 'x-tenant-id': localStorage.getItem('email_usuario_logado') };
    listarTarefas();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar salvar={salvar} />
        <Box mt={3}>
          <Results tarefas={tarefas} alterarStatus={alterarStatus} deletar={deletar} />
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <Typography>{mensagem}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default TarefasListView;
