(function() {

	var simon = {
		simonX: 440,
		simonY: 230,
		force:420,
		gameOver:0,
		highScore:0,
		level:1
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
		addJauge();
		addCombo();
		startTicker(20); // défini les fps
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

			// console.log("CLICK DOWN en X : " + this.stage.downX + ", " + " , CLICK DOWN en Y : " + this.stage.downY);
			// console.log("CLICK UP en X : " + this.stage.upX + " , CLICK UP en Y : " + this.stage.upY);
			var slap = easelJsUtils.calcDeplacement(this.stage.upX, this.stage.upY, this.stage.downX, this.stage.downY);
			// Enregistrement de la slap
			// Gestion de la force de la slap
			simon.force -= Math.round((slap / 20) / (simon.level * 2));

			// Repasser la barre colorée au dessus de son cache noir.
			// Celui-ci reprendra le dessus au prochain tick
			addCombo();
			simon.highScore += ((slap * simon.level)/100);
			// console.log("Nouveau Highscore : " + Math.round(simon.highScore));
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
		if (simon.level % 2 == 1) {
			var unicornWorld = easelJsUtils.unicornWorld(0, 0, {
				scale: [0.8, 0.9]
			});
		}
		
		if (simon.level % 2 == 0) {
		var matrixWorld = easelJsUtils.matrixWorld(0, 0, {
			scale: [1.5, 2]
			});
		}
		if (simon.level % 2 == 1) {
			var uniBody = easelJsUtils.unicornBody(450, 50, {
				scale: [2, 2]
			});
		}
		if (simon.level % 2 == 0) {
			var neoBody = easelJsUtils.neoBody(270, 350, {
				scale: [1.2, 1.2]
			});
		}

		// Créé la tête de Simon
		var simonHead = easelJsUtils.createSimon(simon.simonX, simon.simonY, {
			scale: [0.5, 0.5]
		});

	};

	// Ajout de la barre de combo
	this.addJauge = function() {
		var jauge = easelJsUtils.createJauge(820-simon.force,850,simon.force,50);
	};

	this.addCombo = function() {
		var combo = easelJsUtils.afficherCombo(400, 850, {scale: [2,2]});
	}


	// Permet de rafraichir le rendu en fonction du fps défini
	this.startTicker = function(fps) {
		createjs.Ticker.setFPS(fps);
		createjs.Ticker.addEventListener("tick", handleTick);
	};

		// Mise à jour du jeu à chaque ticks
	this.handleTick = function(event) {
			if (simon.force < 0) {
				simon.level ++;
				console.log("LEVEL UP :::::: " + simon.level);
				simon.force = 420;
				return init();
			} else if (simon.force > 420) {
				simon.force = 420;
				simon.gameOver += 4;
				if (simon.gameOver % 40 === 0) {
					console.log("Attention ...");
				}
			} else {
				simon.force +=2;
			}

			if (simon.gameOver > 140) {
				console.log("Le score obtenu est de : " + simon.highScore);
				console.log("Dernier level atteint : " + simon.level);
				simon.highScore = 0;
				simon.level = 0;
				simon.gameOver = 0;
			}

			addJauge();
			this.stage.update(event);
	};



	


}());