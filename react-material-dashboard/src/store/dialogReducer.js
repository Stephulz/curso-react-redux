const ACTIONS = {
  MOSTRAR_MENSAGEM: 'MENSAGENS_MOSTRAR',
  ESCONDER_MENSAGEM: 'MENSAGENS_ESCONDER'
};

const ESTADO_INICIAL = {
  titulo: '',
  mensagem: '',
  mostrarMensagem: false
};

export default function dialogReducer(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case ACTIONS.MOSTRAR_MENSAGEM:
      return {
        ...state,
        titulo: action.titulo,
        mensagem: action.mensagem,
        mostrarMensagem: true,
      };
    case ACTIONS.ESCONDER_MENSAGEM:
      return {
        ...state,
        mostrarMensagem: false,
      };
    default:
      return state;
  }
}

export function mostrarMensagem(titulo, mensagem) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.MOSTRAR_MENSAGEM,
      titulo,
      mensagem
    });
  };
}

export function esconderMensagem() {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.ESCONDER_MENSAGEM,
    });
  };
}
