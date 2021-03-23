import React from 'react';
import './App.css';

function App(props) {

  const modificarNome = (event) => {
    console.log(event.target.value)
  }

  const criaComboBox = () => {
    const opcoes = ["Fulano", "Cicrano"];
    const comboBoxOpcoes = opcoes.map(opcao => <option>{opcao}</option>)
    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }
  console.log("Executou o render")
  const MeuComboBox = () => criaComboBox()
  return (
    <>
      <input type="text" className="text-centralizado" value={props.nome} onChange={modificarNome} />
      <h1>Hello {props.nome} sua idade é {props.idade}</h1>
      <MeuComboBox />
    </>
  );
}

export default App;
