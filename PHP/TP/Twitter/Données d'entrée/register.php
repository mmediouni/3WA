<?php  // On traite les donn�es d'envoi du formulaire d'isncription pour ajouter un nouvel utilisateur dans la table users

// Inclure le fichier common.php pour avoir acc�s � la base de donn�es et aux sessions

$errors = []; // On initialise

/* 1) On v�rifie l'int�grit� des donn�es:

username:
  
  - Doit uniquement contenir de caract�res alphanum�riques: http://www.php.net/ctype_alpha
  - Minimum 5 caract�res
  - Ne doit pas �tre pris par un autre utilisateur

email:

  - V�rifier que la structure est celle d'un email (http://php.net/manual/fr/filter.examples.validation.php)
  - Ne doit pas �tre pris par un autre utilisateur

password:

  - Minimum 8 caract�res 

  
S'il y a des erreurs sauter l'�tape 2, 3 et 4 et afficher les erreurs sur le fichier register.phtml
  
*/





/* 2) S'il n'y a pas d'erreur on cr�er le SALT pour crypter le mot de passe
  Nota: le mot de passe sera crypt� � l'aide la de la fonction crypt en blowfish(http://php.net/manual/en/function.crypt.php)

  G�n�rer un grain de sel (salt) ayant cette structure: $2y$14$[22 caract�res al�atoires]
  Exemple de salt valide: $2y$14$wHhBmAgOMZEld9iJtV./aq

*/


/* 3) Enregistrer les informations (username, email, password, salt) dans la base donn�es.

   4) Rediriger l'utilisateur sur la page connexion.php


*/


$template = 'register.phtml';
include('layout.phtml');