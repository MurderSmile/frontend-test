import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/utils/styles/css/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';

import Compte from './pages/Compte/index';
import Accueil from './pages/Accueil';

import { IdProvider } from './utils/context';

////  Redirection en fonction de la validité des paramètres de connexion  //
function Identification() {
  const profil = JSON.parse(sessionStorage.getItem('profil'))
  const posts = JSON.parse(localStorage.getItem('posts'))

  ////  Redirection des utilisateurs non-connecté vers page Compte  //
  if (!profil) {

    sessionStorage.clear()
    localStorage.clear();

    return (
      <Routes>
        <Route path="*" element={<Compte />} />
      </Routes>
    );
  } 

  ////  Redirection vers la page compte lorsque le token expire  //
  else if (posts && posts.error && posts.error.name === 'TokenExpiredError'){
    
    alert("Vôtre token vient d'expirer, veuillez vous reconnecter") 
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload();

    return (
      <Routes>
        <Route path="*" element={<Compte />} />
      </Routes>
    );
  }
  
  ////  Accès à toutes les routes si l'utilisateur est connecté et son token à jour  //
  else {
    return (
      <Routes>
        <Route path="/" element={<Compte />} />
        <Route path="Accueil" element={<Accueil />} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }
}

////  Génération de la page du site  //
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IdProvider>
      
        <Header />

        <Identification />

        <Footer />
          
      </IdProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();