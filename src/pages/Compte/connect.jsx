import { useState } from 'react';
import { apiBackend } from '../../utils/api';

////  Formulaire de connection  //
function Connect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  ////  Envoi de la demande de connection de compte  //
  const login = (e) => {
    e.preventDefault();

    return fetch(`${apiBackend}/api/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())

      .then((resJson) => {
        if (resJson.message !== 'Paire login/mot de passe incorrecte') {
          sessionStorage.setItem('profil', JSON.stringify(resJson));
          window.location.href = './accueil';
        } else {
          alert(resJson.message);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  ////  Génération du formulaire de connection  //
  return (
    <form id="connectForm" onSubmit={login}>
      <h2>Connection</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <input id="send" type="submit" value="Envoyer" />
    </form>
  );
}

export default Connect;
