<?php  // On traite les donn�es d'envoi du formulaire d'isncription pour ajouter un nouvel utilisateur dans la table users

require_once('common.php');


$errors = []; // On initialise un tableau d'erreurs vide qu ise remplira si l'utilisateur commet des erreurs lors de l'inscription

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

if(!empty($_POST)){  // On v�rifie si le formulaire d'inscription est envoy�

/**** VERIFICATION DU CHAMPS USERNAME ****/

$username = $_POST['username']; 
$password = $_POST['password'];
$email = $_POST['email'];

// On v�rifie si le pseudo fait plus de 5 caract�res.
if(strlen($username) < 5) $errors[] = "Le pseudo est trop court";

// On v�rifie si le pseudo n'est pas d�j� pris par un autre membre.
$query = $pdo->prepare('SELECT username FROM users WHERE username = ?');
$query->execute([$username]);
$result = $query->fetch(PDO::FETCH_ASSOC);

if($result != null) $errors[] = "Le nom d'utilisateur est d�j� pris.";

// On v�rifie si le pseudo contient uniquement des caract�res alphanum�rics:
if(!ctype_alpha($username)) $errors[] = "Le nom d'utilisateur ne doit contenir que des caract�res alphanum�riques.";

/**** VERIFICATION DU CHAMPS EMAIL ****/
// On v�rifie si la syntaxe est correcte :
if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "L'�mail est incorrecte.";

// On v�rifie si un membre ne c'est pas d�j� isncrit avec cet email :
$query = $pdo->prepare('SELECT email FROM users WHERE email = ?');
$query->execute([$email]);
$result = $query->fetch(PDO::FETCH_ASSOC);

if($result != null) $errors[] = "L'�mail est d�j� pris.";


/**** VERIFICATION DU CHAMPS PASSWORD ****/

if(strlen($password) < 8) $errors[] = "Le mot de passe est trop court";


/* 2) S'il n'y a pas d'erreur on cr�er le SALT pour crypter le mot de passe
  Nota: le mot de passe sera crypt� � l'aide la de la fonction crypt en blowfish(http://php.net/manual/en/function.crypt.php)

  G�n�rer un grain de sel (salt) ayant cette structure: $2y$14$[22 caract�res al�atoires]
  Exemple de salt valide: $2y$14$wHhBmAgOMZEld9iJtV./aq

*/
	if(empty($errors)){

		$salt = '$2y$14$'.generateRandomString(22);
		$password = crypt($password, $salt);


		/* 3) Enregistrer les informations (username, email, password, salt) dans la base donn�es.

		   4) Rediriger l'utilisateur sur la page connexion.php


		*/

		$query =
			'
				INSERT INTO
					users
					(username,email, password,salt)
				VALUES
					(:username, :email, :password, :salt)
			';
		$resultSet = $pdo->prepare($query);
		$resultSet->execute([
			'username' => $username,
			'email' => $email,
			'password' => $password,
			'salt' => $salt]);

		header('Location: login.php');  // On redirige ensuite sur la page de connexion
	}
}

$template = 'register.phtml';
include('layout.phtml');