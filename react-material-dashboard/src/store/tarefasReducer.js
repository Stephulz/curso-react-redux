import axios from 'axios';

const http = axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com'
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVER',
  ALTERAR_STATUS: 'TAREFAS_ALTERAR'
};

const ESTADO_INICIAL = {
  tarefas: []
};

const tarefaReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return { ...state, tarefas: action.tarefas };
    case ACTIONS.ADD:
      return { ...state, tarefas: [...state.tarefas, action.tarefa] };
    case ACTIONS.REMOVER:
      return { ...state, tarefas: state.tarefas.filter((tarefa) => tarefa.id !== action.id) };
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
      dispatch({
        type: ACTIONS.ADD,
        tarefa: res.data
      });
    });
  };
}

export function deletar(id) {
  return (dispatch) => {
    http.delete(`/tarefas/${id}`, {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      console.log(res);
      dispatch({
        type: ACTIONS.REMOVER,
        id
      });
    });
  };
}

export function alterarStatus(id) {
  return (dispatch) => {
    http.patch(`/tarefas/${id}`, null, {
      headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
    }).then((res) => {
      console.log(res);
      dispatch({
        type: ACTIONS.ALTERAR_STATUS,
        id
      });
    });
  };
}
