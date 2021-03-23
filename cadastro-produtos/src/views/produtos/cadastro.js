import React, { Component } from 'react'
import ProdutoService from '../../app/produtoService'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',

    sucesso: false,
    errors: []
}

export default class CadastroProduto extends Component {
    state = estadoInicial

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = () => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({ sucesso: true })
        } catch (erro) {
            const errors = erro.errors
            console.log(errors)
            this.setState({ errors: errors })
            console.log(this.state)
        }
    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>
                <div className="card-body">

                    {this.state.sucesso &&
                        (<div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Bem feito!</strong> Cadastro realizado com sucesso.
                        </div>)
                    }

                    {this.state.errors.length > 0 &&
                        this.state.errors.map(msg => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro!</strong> {msg}
                                </div>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text"
                                    name="nome"
                                    onChange={this.onChange}
                                    value={this.state.nome}
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text"
                                    onChange={this.onChange}
                                    name="sku"
                                    value={this.state.sku}
                                    className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: </label>
                                <textarea name="descricao"
                                    onChange={this.onChange}
                                    value={this.state.descricao}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="number"
                                    onChange={this.onChange}
                                    name="preco"
                                    value={this.state.preco}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text"
                                    onChange={this.onChange}
                                    name="fornecedor"
                                    value={this.state.fornecedor}
                                    className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" onClick={() => this.onSubmit()}>Salvar</button>
                        </div>

                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={() => this.limpaCampos()}> Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
