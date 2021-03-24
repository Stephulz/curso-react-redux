import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const submit = (event) => {
    event.preventDefault();
    console.log(`Valores: descrição - ${descricao}, categoria - ${categoria}`);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  placeholder="Descrição da tarefa"
                  label="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <InputLabel>Categoria </InputLabel>
                  <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <MenuItem value="">Selecione...</MenuItem>
                    <MenuItem value="TRABALHO">Trabalho</MenuItem>
                    <MenuItem value="ESTUDOS">Estudos</MenuItem>
                    <MenuItem value="OUTROS">Outros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <Button onClick={submit} variant="contained" color="secondary">Adicionar</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
