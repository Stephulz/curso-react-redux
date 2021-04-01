import axios from 'axios';
import { mostrarMensagem } from './dialogReducer';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVER',
  ALTERAR_STATUS: 'TAREFAS_ALTERAR'
};

const ESTADO_INICIAL = {
  tarefas: [],
  quantidade: 0
};

const tarefaReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return {
        ...state,
        tarefas: action.tarefas,
        quantidade: action.tarefas.length
      };
    case ACTIONS.ADD: {
      const lista = [...state.tarefas, action.tarefa];
      return {
        ...state,
        tarefas: lista,
        quantidade: lista.length
      };
    }
    case ACTIONS.REMOVER: {
      const lista = state.tarefas.filter((tarefa) => tarefa.id !== action.id);
      return {
        ...state,
        tarefas: lista,
        quantidade: lista.length
      };
    }

    case ACTIONS.ALTERAR_STATUS: {
      const lista = [...state.tarefas];
      lista.forEach((tarefa) => {
        if (tarefa.id === action.id) {
          tarefa.done = true;
        }
      });
      return { ...state, tarefas: lista };
    }
    default:
      return state;
  }
};

export default tarefaReducer;

export function listar() {
  return (dispatch) => {
    http.get('/tarefas', {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      dispatch({
        type: ACTIONS.LISTAR,
        tarefas: res.data
      });
    });
  };
}

export function salvar(tarefa) {
  return (dispatch) => {
    http.post('/tarefas', tarefa, {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      dispatch(
        [
          {
            type: ACTIONS.ADD,
            tarefa: res.data
          },
          mostrarMensagem('Atenção', 'Tarefa salva com sucesso!')
        ]
      );
    });
  };
}

export function deletar(id) {
  return (dispatch) => {
    http.delete(`/tarefas/${id}`, {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      console.log(res);
      dispatch(
        [
          {
            type: ACTIONS.REMOVER,
            id
          },
          mostrarMensagem('Atenção', 'Tarefa removida com sucesso!')
        ]
      );
    });
  };
}

export function alterarStatus(id) {
  return (dispatch) => {
    http.patch(`/tarefas/${id}`, null, {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      console.log(res);
      dispatch(
        [
          {
            type: ACTIONS.ALTERAR_STATUS,
            id
          },
          mostrarMensagem('Atenção', 'Tarefa alterada com sucesso!')
        ]
      );
    });
  };
}
