(function(){

	var simon = {
		simonX: 300,
		simonY: 150
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
	    	var clickX = Math.round(evt.stageX);
	    	var clickY = Math.round(evt.stageY);
	    	simon.simonX += 10;
	    	if ( simon.simonX && simon.simonY) {
	    		simon.simonX = clickX - 200;
	    		simon.simonY = clickY - 200;
	    	}
	    	addBitmaps();
	    	console.log("SimonXXxxXxxx : " + simon.simonX);
    		console.log("the canvas was clicked at "+clickX+","+clickY);
		});
	    this.stage.enableMouseOver(30); // Activer la gestion des évenements souris
	    easelJsUtils = new EaselJsUtils(this.stage);
	};


	this.addTitre = function() {
		var titre = easelJsUtils.createTitre("Slap Simon !!", "100px Impact", 600, 20, {color: '#FF2020', textAlign: 'center'});
	};


	// Ajout des images	     
	this.addBitmaps = function() {
	    // Créé la tête de Simon
	    var simonHead = easelJsUtils.createSimon(simon.simonX, simon.simonY, {scale:[1, 1]});
	};


	// Permet de rafraichir le rendu en fonction du fps défini
	this.startTicker = function(fps) {
	    createjs.Ticker.setFPS(fps);
	    createjs.Ticker.addEventListener("tick", function(){
	        this.stage.update();
	    });
	};



}());