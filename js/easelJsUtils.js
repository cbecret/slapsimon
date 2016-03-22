(function() {

	var Graphics = createjs.Graphics;
	var Shape = createjs.Shape;

	// Constructeur EaselJsUtils
	EaselJsUtils = function(stage) {
		this.stage = stage;
	};


	// Classe EaselJsUtils
	EaselJsUtils.prototype = {

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

		// Création d'un décor de licornes
		unicornWorld: function(x, y, options) {
			return this.createBitmap("./img/unicorn.png", x, y, options);
		},

		// Création d'un corps de licorne
		unicornBody: function(x, y, options) {
			return this.createBitmap("./img/une_licorne.png", x, y, options);
		},

		// Création de la barre de combo
		showForce: function(x, y, w, h, force) {
			this.stage.removeChild(shape);
			var graphic = new Graphics();
			var opacity = 1;
			graphic.beginFill("#ff00ff");
			// Ajout de la force sur la barre
			wForced = w * (force / 500);
			graphic.drawRect(x, y, wForced, h);
			var shape = new Shape(graphic);
			this.stage.addChild(shape);
			return shape;
		},

		// Création du background de la barre de combo
		showBackground: function(x, y, w, h) {
			this.stage.removeChild(shape);
			var graphic = new Graphics();
			var opacity = 1;
			graphic.beginFill("#000000");
			graphic.drawRect(x, y, w, h);
			var shape = new Shape(graphic);
			this.stage.addChild(shape);
			return shape;
		},


		pythagore: function(x, y) {
			return Math.sqrt((x * x) + (y * y));
		},

		calcDeplacement: function(lastX, lastY, mouseX, mouseY) {
			var slapX = lastX - mouseX;
			var slapY = lastY - mouseY;
			var deplacement = this.pythagore(slapX, slapY);
			return deplacement;
		},

		// Création d'un titre (ou texte si besoin)
		createTitre: function(text, font, x, y, options) {
			// Options du texte
			var titre = new createjs.Text();
			titre.font = font;
			titre.text = text;
			titre.x = x;
			titre.y = y;
			// Appliquer les options
			if (options) {
				if (options.color) {
					titre.color = options.color;
				}
				if (options.textAlign) {
					titre.textAlign = options.textAlign;
				}
				if (options.cursor) {
					titre.cursor = options.cursor;
				}
			}
			// Ajouter le Tesxt au Stage et le retourner
			this.stage.addChild(titre);
			return titre;
		}



	};
}());