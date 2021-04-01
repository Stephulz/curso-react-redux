/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { connect } from 'react-redux';
import { compose } from 'redux';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('email_usuario_logado');
    navigate('/login');
  };

  return (
    <AppBar
      className={clsx(classes.root, props.className)}
      elevation={0}
      {...props.rest}
    >
      <Toolbar>
        <Link to="/">
          <Logo />
        </Link>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={props.notificacoes}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={props.onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  notificacoes: state.tarefaReducer.quantidade
});

export default compose(connect(mapStateToProps))(TopBar);
