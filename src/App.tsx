import React from 'react';
import logo from './logo.svg';
import './App.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
  const errors = null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form action="" className="form">
        <TextField
          fullWidth
          name="lastName"
          label="Votre nom"
        />
        <TextField fullWidth name="FirstName" label="Votre Prénom" />
        <TextField fullWidth name="email" label="Votre Email" />
        <TextField fullWidth name="confirmEmail" label="Confirmer l'email" />
        <TextField fullWidth name="password" label="Mot de passe" />
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirmer le mot de passe"
        />
        <TextField fullWidth name="adress" label="Adresse" />
        <TextField fullWidth name="zipCode" label="Code Postal" />
        <TextField fullWidth name="city" label="Ville" />

        <Button size="large" color="primary" variant="contained">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default App;
