(function() {


	// Paramètres de jeu initiaux
	var simon =
	{
		simonX: 440,
		simonY: 230,
		pvMax: 500,
		force:500,
		gameOver:0,
		score:0,
		highScore:0,
		level:1,
		slapCount:0,
		tactile:0
	};


	// Initialisation du jeu au chargement
	$(document).ready(function() {		
		simon.canvas = $('#Canvas').get(0);
		init();
		// Raccourcis sur le Canvas html
	});


	// Initialisation du jeu
	this.init = function()
	{
		prepareStage();
		addBitmaps();
		addText();
		addJauge();
		addCombo();
		addSimon();
		// [DEFINIR LES FPS]
		if (simon.tactile == 0) {
			startTicker(30);
		}			
	};


	// Préparer le stage et instancie EaselJsUtils
	this.prepareStage = function()
	{

		// Clear de la stage
		if (this.stage)	{
			this.stage.clear();
		}

		// Creation de la stage
		this.stage = new createjs.Stage(simon.canvas);

		// Click enfoncé
		this.stage.on("stagemousedown", function(evt) {
			// Récupérer la position du curseur DOWN
			this.stage.downX = evt.stageX;
			this.stage.downY = evt.stageY;


			simon.simonX -=((this.stage.downX - 600) / 100);
			simon.simonY -=((this.stage.downY - 450) / 100);
			if (simon.force < 200) {
				addSimonCasseD();
			} else {
				addSimon();
			}

		});

		// Click relaché
		this.stage.on("stagemouseup", function(evt) {

			// Récupérer la position du curseur UP
			this.stage.upX = evt.stageX;
			this.stage.upY = evt.stageY;

			// Enregistrement de la valeur de la slap
			var slap = easelJsUtils.calcDeplacement(this.stage.upX, this.stage.upY, this.stage.downX, this.stage.downY);

			// Gestion de la difficulté par niveau
			simon.force -= Math.round((slap / 20) / (simon.level * 1.5));

			// Repasser la barre colorée au dessus de son cache noir.
			// Celui-ci reprendra le dessus au prochain tick
			addCombo();

			// Score actuel
			simon.score += Math.round((slap * simon.level*2)/500);

			if (simon.score > simon.highScore) {
				// Enregistrement du HighScore si atteint
				simon.highScore = simon.score;
				console.log(":::: NEW HIGHSCORE ::::");
			}

			// Incrément du nombre de slap
			simon.slapCount = simon.slapCount +0.5

			// Mise à jour des texts
			addText();

			simon.simonX +=((this.stage.downX - 600) / 100);
			simon.simonY +=((this.stage.downY - 450) / 100);
			addSimon();
			
		});

		// Activer la gestion des évenements souris
		this.stage.enableMouseOver(30);
		// Instance des outils de EaselJsUtils
		easelJsUtils = new EaselJsUtils(this.stage);

	};


	// Ajout des texts
	this.addText = function()
	{

		// Background des texts de stats
		this.stage.removeChild(simon.bgScore);
		simon.bgScore = easelJsUtils.bgScore(70, 0, {
			scale: [0.6, 0.8]
		});

		// Affichage du niveau
		this.stage.removeChild(simon.displayLevel);
		simon.displayLevel = easelJsUtils.createText("#" + simon.level, "100px Impact", 1100, 20, {
			color: '#000000',
			textAlign: 'center'
		});

		// Affichage du Score
		this.stage.removeChild(simon.displayScore);
		simon.displayScore = easelJsUtils.createText("SCORE : " + simon.score, "25px Impact", 100, 20, {
			color: '#e3ef6f',
			textAlign: 'left'
		});

		// Affichage du High Score
		this.stage.removeChild(simon.displayHighScore);
		simon.displayHighScore = easelJsUtils.createText("HighScore : " + simon.highScore, "18px Impact", 100, 50, {
			color: '#00ff00',
			textAlign: 'left'
		});

		// Affichage du nombre de slaps
		this.stage.removeChild(simon.slapNb);
		simon.slapNb = easelJsUtils.createText("Slap count : " + Math.round(simon.slapCount), "18px Impact", 100, 70, {
			color: '#00ff00',
			textAlign: 'left'
		});

	};


	// Ajout des images	     
	this.addBitmaps = function()
	{
		
		// Unicorn World
		if (simon.level % 4 == 1) {
			var unicornWorld = easelJsUtils.unicornWorld(0, 0, {
				scale: [0.8, 0.9]
			});
		}
		if (simon.level % 4 == 1) {
			var uniBody = easelJsUtils.unicornBody(450, 50, {
				scale: [2, 2]
			});
		}

		// Matrix World
		if (simon.level % 4 == 2) {
		var matrixWorld = easelJsUtils.matrixWorld(0, 0, {
			scale: [1.5, 2]
			});
		}
		if (simon.level % 4 == 2) {
			var neoBody = easelJsUtils.neoBody(270, 350, {
				scale: [1.2, 1.2]
			});
		}

		// Hell World
		if (simon.level % 4 == 3) {
			var hellWorld = easelJsUtils.hellWorld(0, 0, {
				scale: [3.1, 3.6]
			});
		}
		if (simon.level % 4 == 3) {
			var demonBody = easelJsUtils.demonBody(20, 220, {
				scale: [1.1, 1.2]
			});
		}

		// Bob World
		if (simon.level % 4 == 0) {
			var aquaWorld = easelJsUtils.aquaWorld(-380, -50, {
				scale: [1.5, 1.5]
			});
		}
		if (simon.level % 4 == 0) {
			var bobBody = easelJsUtils.bobBody(260, 200, {
				scale: [1.8, 1.8]
			});
		}

		// Game Over World
		if (simon.level == 0) {
			var gameOver = easelJsUtils.gameOver(0, 0, {
				scale: [0.9, 1.2]
			});
		}
	
	};


	// Créé la tête de Simon
	this.addSimon = function() {
		this.stage.removeChild(simon.head);
		simon.head = easelJsUtils.createSimon(simon.simonX, simon.simonY, {
			scale: [0.5, 0.5]
		});
	};

	// Créé la tête de Simon cassée
	this.addSimonCasseD = function() {
		this.stage.removeChild(simon.head);
		simon.head = easelJsUtils.createSimonD(simon.simonX, simon.simonY, {
			scale: [0.5, 0.5]
		});
	};

	// Màj de l'état visuel de la barre de pv
	this.addJauge = function() {
		// Background barre de vie
		this.stage.removeChild(simon.jauge);
		simon.jauge = easelJsUtils.createJauge(800-simon.force,850,simon.force,50);
	};

	// Barre de vie
	this.addCombo = function() {
		this.stage.removeChild(simon.combo);
		simon.combo = easelJsUtils.afficherCombo(298, 850, {scale: [2.4,2.2]});
	};


	// Permet de rafraichir le rendu en fonction du fps défini
	this.startTicker = function(fps) {
		createjs.Ticker.setFPS(fps);
		createjs.Ticker.addEventListener("tick", handleTick);
		simon.tactile = 1;
	};

	// Mise à jour du jeu à chaque ticks
	this.handleTick = function(event)
	{

		// Gestion des niveaux
		// LEVEL UP
		if (simon.force < 0) {
			simon.level ++;
			console.log("Level" + simon.level);
			simon.force = simon.pvMax;
			simon.gameOver = 0;
			init();
		} else if (simon.force > simon.pvMax) {
				
			// [NOMBRE DE PV DE SIMON]
			simon.force = simon.pvMax;
			// Incrément de la jauge de Game Over
			simon.gameOver += 4;
		} else {
			// Incrément de simon.force
			// [VITESSE DE REGEN DE SIMON]
			simon.force +=1;
		}
		// Gestion du Game Over
		// [VITESSE DU GAMEOVER]
		if (simon.gameOver > 140) {
			if (simon.score !== 0) {
				console.log("Le score obtenu est de : " + simon.score);
			}

			// Reset des données de partie courante
			simon.score = 0;
			simon.level = 0;
			simon.gameOver = 0;
			addBitmaps();
			addText();
		}

		addJauge();
		this.stage.update(event);

	};


}());