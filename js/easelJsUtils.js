(function() {

	var Graphics = createjs.Graphics;
	var Shape = createjs.Shape;

	// Constructeur EaselJsUtils
	EaselJsUtils = function(stage) {
		this.stage = stage;
	};


	// Classe EaselJsUtils
	EaselJsUtils.prototype =
	{

		// Fonction de gestion d'images
		createBitmap: function(src, x, y, options) {

			// Définir la source et la position du média
			var bitmap = new createjs.Bitmap(src);
			bitmap.x = x;
			bitmap.y = y;
			// Appliquer les options
			if (options) {
				// Mise à l'échelle
				if (options.scale) {
					bitmap.scaleX = options.scale[0];
					bitmap.scaleY = options.scale[1];
				}
			}
			// Ajouter le Bitmap au Stage et le retourner
			this.stage.addChild(bitmap);

			return bitmap;
		},


		// Création d'une tête de Simon
		createSimon: function(x, y, options) {

			return this.createBitmap("./img/simon.png", x, y, options);
		},
				// Création d'une tête de Simon Casse 1
		createSimonU: function(x, y, options) {

			return this.createBitmap("./img/simonCasseU.png", x, y, options);
		},

				// Création d'une tête de Simon Casse 2
		createSimonD: function(x, y, options) {

			return this.createBitmap("./img/simonCasseD.png", x, y, options);
		},

				// Création d'une tête de Simon Casse 3
		createSimonT: function(x, y, options) {

			return this.createBitmap("./img/simonCasseT.png", x, y, options);
		},

				// Création d'une tête de Simon Casse 4
		createSimonQ: function(x, y, options) {

			return this.createBitmap("./img/simonCasseQ.png", x, y, options);
		},

		// Création d'un décor de licornes
		unicornWorld: function(x, y, options)
		{

			return this.createBitmap("./img/unicorn.png", x, y, options);
		},

		// Création d'un corps de licorne
		unicornBody: function(x, y, options) {

			return this.createBitmap("./img/une_licorne.png", x, y, options);
		},

		// Corps de Néo
		neoBody: function(x, y, options) {

			return this.createBitmap("./img/neo.png", x, y, options);
		},

		// Background de Matrix
		matrixWorld: function(x, y, options) {

			return this.createBitmap("./img/matrix.png", x, y, options);
		},

		// Corps de demon
		demonBody: function(x, y, options) {

			return this.createBitmap("./img/demon.png", x, y, options);
		},

		// Background de l'enfer
		hellWorld: function(x, y, options) {

			return this.createBitmap("./img/hell.png", x, y, options);
		},

		// Corps de bob
		bobBody: function(x, y, options) {

			return this.createBitmap("./img/bob.png", x, y, options);
		},

		// Background aquatique
		aquaWorld: function(x, y, options) {

			return this.createBitmap("./img/aquaWorld.png", x, y, options);
		},

		// Ecran de Game Over
		gameOver: function(x, y, options) {

			return this.createBitmap("./img/GameOver.png", x, y, options);
		},

		bgScore: function(x, y, options) {

			return this.createBitmap("./img/bg-score.png", x, y, options);
		},

		// Calcul de la distance entre les positions de click enfoncé et click relaché
		calcDeplacement: function(lastX, lastY, mouseX, mouseY)	{
			var x = lastX - mouseX;
			var y = lastY - mouseY;

			return Math.sqrt((x * x) + (y * y));
		},

		// Création d'un text
		createText: function(text, font, x, y, options) {

			// Options du texte
			var txt = new createjs.Text();
			txt.font = font;
			txt.text = text;
			txt.x = x;
			txt.y = y;
			// Appliquer les options
			if (options) {
				if (options.color) {
					txt.color = options.color;
				}
				if (options.textAlign) {
					txt.textAlign = options.textAlign;
				}
				if (options.cursor) {
					txt.cursor = options.cursor;
				}
			}
			// Ajouter le Tesxt au Stage et le retourner
			this.stage.addChild(txt);

			return txt;
		},

		// Création du rectangle servant à masquer la barre de combo
		createJauge: function(x, y, w, h)
		{
			var graphic = new Graphics();
			graphic.beginFill("#000");
			graphic.drawRect(x, y, w, h);
			var shape = new Shape(graphic);
			this.stage.addChild(shape);

			return shape;
		},

		// Création du visuel de la barre de combo
		afficherCombo: function(x, y, options)
		{

			return this.createBitmap("./img/combo.png", x, y, options);
		}


	};
}());