(function() {

	var simon = {
		simonX: 440,
		simonY: 230
	};


	// Initialisation du jeu
	$(document).ready(function() {
		init();
	});


	this.init = function() {
		// Initialisation du niveau
		prepareStage();
		addTitre();
		addBitmaps(); // ajoute les images
		startTicker(30); // défini les fps
	};



	// Préparer le stage et instancie EaselJsUtils
	this.prepareStage = function() {
		this.canvas = $('#Canvas').get(0);
		this.stage = new createjs.Stage(this.canvas);

		this.stage.on("stagemousedown", function(evt) {
			this.stage.downX = evt.stageX;
			// Récupérer la position du curseur
			this.stage.downY = evt.stageY;
		});

		this.stage.on("stagemouseup", function(evt) {

			// Récupérer la position du curseur
			this.stage.upX = evt.stageX;
			this.stage.upY = evt.stageY;

			console.log("CLICK DOWN en X : " + this.stage.downX + ", " + " , CLICK DOWN en Y : " + this.stage.downY);
			console.log("CLICK UP en X : " + this.stage.upX + " , CLICK UP en Y : " + this.stage.upY);
			var slap = easelJsUtils.calcDeplacement(this.stage.upX, this.stage.upY, this.stage.downX, this.stage.downY);
			// Enregistrement de la slap
			// Gestion de la force de la slap
			simon.force += (slap / 20);
			console.log("Voilà la foooooorce : " + simon.force);
		});


		this.stage.enableMouseOver(30); // Activer la gestion des évenements souris
		easelJsUtils = new EaselJsUtils(this.stage);
	};


	this.addTitre = function() {
		var titre = easelJsUtils.createTitre("Slap Simon !!", "100px Impact", 600, 20, {
			color: '#FF2020',
			textAlign: 'center'
		});
	};


	// Ajout des images	     
	this.addBitmaps = function() {
		// Créer le monde des licornes
		var unicornWorld = easelJsUtils.unicornWorld(0, 0, {
			scale: [0.8, 0.9]
		});

		var uniBody = easelJsUtils.unicornBody(450, 50, {
			scale: [2, 2]
		});

		// Créé la tête de Simon
		var simonHead = easelJsUtils.createSimon(simon.simonX, simon.simonY, {
			scale: [0.5, 0.5]
		});

	};

	// Ajout du background de la barre de combo
	this.addBground = function() {
		var background = easelJsUtils.showBackground(280,830,640,70);
	}


	// Ajout de la barre de combo
	this.addForce = function() {
		var barre = easelJsUtils.showForce(300,850,600,30,simon.force);
	}

	// Permet de rafraichir le rendu en fonction du fps défini
	this.startTicker = function(fps) {
		createjs.Ticker.setFPS(fps);
		createjs.Ticker.addEventListener("tick", function() {
			this.stage.update();
			if (simon.force > 0 ) {
				simon.force -=1;
			} else {
				simon.force = 0;
			}
			addBground();
			addForce();
			console.log(simon.force);
		});
	};

}());