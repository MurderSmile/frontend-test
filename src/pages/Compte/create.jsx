import { useState } from 'react';
import { apiBackend } from '../../utils/api';

////  Formulaire d'inscription  //
function Create() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  ////  Envoi de la demande de création de compte  //
  const create = (e) => {
    e.preventDefault();

    return fetch(`${apiBackend}/api/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())

      .then((resJson) => {
        if (resJson.message === 'Utilisateur créé !') {
          sessionStorage.setItem('profil', JSON.stringify(resJson));
          window.location.href = './accueil';
        } else {
          alert("Erreur: Vérifier que l'utilisateur n'existe pas déja");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  ////  Génération du formulaire d'inscription  //
  return (
    <form id="createForm" onSubmit={create}>
      <h2>Créer un compte</h2>
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

export default Create;
