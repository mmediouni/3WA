/**** Cr�ation de l'objet Slider ****/

// Lien utile: https://developer.mozilla.org/fr/docs/Web/JavaScript/Introduction_%C3%A0_JavaScript_orient%C3%A9_objet


// Etape 1: Cr�er la focntion constructeur Slider prenant en param�tre un objet jQuery qui sera une div contenant des images (donc notre div "slider1" ou "slider2")

/* Caract�ristiques de l'objet Slider:

	-> 12 propri�t�s :
	
	- slider : contient l'objet jQuery du slider (div "slider1" ou "slider2") transmis par le param�tre de la fonction constructeur Slider
	- slides : contient toutes les images du slider
	- nbSlides : contient le nombre total de slides
	- currentSlide : contient l'image courante (par d�faut il s'agit de la premi�re)
	- isActive : variable t�moin servant � d�finir si le slider est en lecture automatique ou non.
	- timer : contiendra l'interval qui devra d�clencher la m�thode "gotoNextSlide" toutes les 2 secondes

	// IMPORTANT: les propri�t�s ci-dessous seront toutes intialement vides et d�finies ult�rieurement lors de la phase d'initialisation de l'objet Slider
	
	- controls : contiendra un objet jQuery contenant les �l�ments d'interagir avec le slider (boutons pr�c�dent, play, suivant, al�atoire 
	             ainsi que le conteneur de pagination). 
				 NB: Cette propri�t� sera initialement vide et d�finit par la suite.
	
	- pages : contiendra une collection d'objet jQuery relative aux  �l�ments span situ�s dans la div .pagination
	- prevButton : bouton image pr�c�dante
	- nextButton : bouton image suivante
	- playButton : bouton play
	- randomButton : bouton image al�atoire
	
	-> Un prototype contenant XX m�thodes:

			
	- generateControls : Aura pour r�le de d�finir la propri�t� "controls" contenant les �l�ments de contr�le du slider (boutons pr�c�dent, play, suivant, al�atoire 
	ainsi que le conteneur de pagination (vide dans un premier temps) d�finit dans cet objet jQuery: 
	*/

		var controls = $('<div class="control">\
		<div class="pagination"></div>\
			<button class="prev"><i class="fa fa-backward"></i></button>\
			<button class="play"><i class="fa fa-play"></i></button>\
			<button class="next"><i class="fa fa-forward"></i></button>\
			<button class="random" title="S�lectionner une image al�atoire"><i class="fa fa-random"></i></button>\
		</div>\
		');
	
/*	
	Une fois l'objet jQuery ci-dessus stock� dans la propri�t� "controls" de l'objet Slider, faire appara�tre son contenu juste en dessous du slider.
	Astuce: http://api.jquery.com/after
	
	- generatePagination: Aura pour r�le de g�n�rer dynamiquement la pagnation en fonction du nombre de slide.
		1) Le code html � g�n�rer est celui-ci: <span class="active">1</span><span>2</span><span>3</span><span>4</span>
		2) Il devra ensuite �tre ins�rer dans la div ayant la class "pagination".
		3) Une fois affich�s il faudra mettre � jour la propri�t� pages.
	
	- updatePagination : Sert � affecter la classe active sur l'�l�ment de pagination correspondant � la slide visible
	// Si par exemple la slide 2 est visible alors on applique la classe active sur le 2�me �l�ment de pagination
	Astuce: http://api.jquery.com/index/
	
	- gotoSlide : Prend en param�tre l'index de la slide a afficher. (0 = slide num�ro une, 1 = slide num�ro 2 etc.). Il faudra aussi m�moriser cette valeur dans le navigateur grace � la propri�t� localStorage de l'objet window (https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)
	- gotoNextSlide : Servira � afficher la slide pr�c�dente
	- gotoPrevSlide : Servira � afficher la slide suivante
	
	- clickOnPage : Se d�clenche quand on clique sur un �l�ment de pagination. Cette m�thode prend en param�tre l'�venement (event) et nous permettra de r�cup�rer l'index de l'�l�ment de pagination cliqu� et ainsi afficher l'image correspondante
	Astuce: http://api.jquery.com/event.target/

	- autoPlay : Se d�clenche quand on clique sur le bouton PLAY
	- play : Sert � lancer la lecture automatique du slider
	- stop : Sert � mettre sur pause la lecture automatique du slider
	- onMouseOver : Si la lecture automatique du slider est en cours alors on la met sur pause lorsque que le slider est survol�.
	- onMouseLeave : Si l'icone du bouton PLAY en mode "lecture" (symbole stop) alors on relance la lecture automatique du slider.
	
	- randomSlide :  Sert � afficher al�atoirement une slide
	
	- init : Sert � initialiser l'objet slider. Cette m�thode devra �tre appel�e � chaque fois que l'on fera une instance de l'objet Slider.
		1) ex�cuter la m�thode generateControls()
		2) ex�cuter la m�thode generatePagination()
		3) D�finissez � partir de l'objet jQuery contenu dans la propri�t� "controls" les propri�t�s:
			* prevButton : bouton image pr�c�dante
			* nextButton : bouton image suivante
			* playButton : bouton play
			* randomButton : bouton image al�atoire
			
		4) Mettre en place les gestionaire d'�v�nements permettant:
	        * D'afficher la slide suivante quand on clique sur le bouton suivant
	        * D'afficher la slide pr�c�dente quand on clique sur le bouton pr�c�dent		
	        * D'afficher une slide al�atoire quand on clique sur le bouton al�atoire
	        * D'afficher la slide correspondant � l'�l�ment de pagination cliqu�
	        * D'afficher la slide correspondant � l'�l�ment de pagination cliqu�	
			* Mettre sur pause le slider quand on le survole avec la souris
			* Relancer la lecture du slider quand on le d�survole (uniquement si l'�tat du bouton est en mode "play")
			
		5) Afficher par d�faut la derni�re slide consult� depuis la derni�re consultation.
		
	
	Dans la fonction contructeur appel� en toute fin la m�thode "init". Ceci permettra de la d�clencher � chaque instanciation de l'objet Slider
	
	
	Etape 2:
	Faite deux instances de l'objet Slider � partir des div "slider1" et "slider2". stock� ces instances respectivement dans une variable slider1 et slider2
	
	THE END
*/