// Environnement
var DEV = true;

// Prototyping
Array.prototype.has = function(v) {
	for (i=0;i<this.length;i++)
		if (this[i]==v)
			return {offset: i};
	return false;
}

// Creation du SVG
var paper = Raphael(twittSVG);

// Object Canvas pour les valeurs absolues
var canvas = (function() {
	var el = $('#canvas');
	return {
		x: el.offset().left,
		y: el.offset().top
	}
})();

// Créer un tweet
var tweetThis = function(text) {
	window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(text), "Twitter", config='height=250, width=450, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no')
}


// Configurer ici les noms
var Hashtags = function() {

	var self = this,
		args = [];
	
	this.conference 	= CONFIG.wording.conference;
	this.intervenant 	= CONFIG.wording.intervenant;
	this.theme 			= CONFIG.wording.theme;
	this.contenu 		= CONFIG.wording.contenu;
	this.bien 			= CONFIG.wording.bien;
	this.nul 			= CONFIG.wording.nul;
	this.neutre 		= CONFIG.wording.neutre;

	this.arguments = arguments;

	this.toString = function() {

		if (typeof self.arguments[0] === 'object')
			self.arguments = self.arguments[0];

		for (i in self.arguments) {
			if (self.arguments[i] in self) {
				args.push(self[self.arguments[i]]);
			}
		}
		return '#'+ args.join(' #');
	}
	return this;
}

/**
 * Il y a différent types d'animations : zoom, halo, radar, bold (text)
 * Chaque path peut avoir une seule animation
 * Chaque hover de path peut déclencher plusieurs animations sur plusieurs autres path
 * On utilise done la structure : interactive.<id>.<animation>.[id,...ids]
 * Sur chaque hover de interactive.<id> on déclenche la suite des événements
 */

// Objet associatif des interactions
var interactives = {
	// INTERVENANT
	87: {
		self: 'bigger',
		bigger: [251,80,85,93,256],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','neutre']
	},
	251: {
		self: 'bigger',
		bigger: [87,80,85,93,256],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','neutre']
	},

	19: {
		self: 'bigger',
		bigger: [253,80,86,93,257],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','nul']
	},
	253: {
		self: 'bigger',
		bigger: [19,80,86,93,257],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','nul']
	},

	18: {
		self: 'bigger',
		bigger: [255,80,84,93,258],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','bien']
	},
	255: {
		self: 'bigger',
		bigger: [18,80,84,93,258],
		halo: [14],
		radar: [27],
		tweet: ['conference','intervenant','bien']
	},

	// THEME
	88: {
		self: 'bigger',
		bigger: [250,83,85,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','neutre']
	},
	250: {
		self: 'bigger',
		bigger: [88,83,85,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','neutre']
	},

	21: {
		self: 'bigger',
		bigger: [252,83,86,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','nul']
	},
	252: {
		self: 'bigger',
		bigger: [21,83,86,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','nul']
	},

	20: {
		self: 'bigger',
		bigger: [254,83,84,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','bien']
	},
	254: {
		self: 'bigger',
		bigger: [20,83,84,93,257],
		halo: [15],
		radar: [28],
		tweet: ['conference','theme','bien']
	},

	// CONTENU
	89: {
		self: 'bigger',
		bigger: [249,82,85,93,256],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','neutre']
	},
	249: {
		self: 'bigger',
		bigger: [89,82,85,93,256],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','neutre']
	},

	23: {
		self: 'bigger',
		bigger: [247,82,86,93,257],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','nul']
	},
	247: {
		self: 'bigger',
		bigger: [23,82,86,93,257],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','nul']
	},

	22: {
		self: 'bigger',
		bigger: [248,82,84,93,258],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','bien']
	},
	248: {
		self: 'bigger',
		bigger: [22,82,84,93,258],
		halo: [17],
		radar: [29],
		tweet: ['conference','contenu','bien']
	},
}

// Parsing des éléments
paper.forEach(function(el){
	// Detection de l'id au clic (DEV)
	if (DEV === true) {
		el.click(function(){
			console.log(el.id);
		})
	}

	if (el.id in interactives) {
		(function(){
			var self = interactives[el.id];
			var radars = {};
			self[self.self].push(el.id) // LOL
			el.hover(function(e){
				e.target.style.cursor = 'pointer';
				// Biggers
				if (typeof self.bigger !== 'undefined') {
					for (i in self.bigger) {
						var hEl = el.paper.getById(self.bigger[i]);
						if (hEl) {
							if ( hEl && ! hEl.data('or'))
								hEl.data('or',hEl.attr('r'));
							hEl.animate({r: hEl.data('or')*1.3},200);
						}
					}
				}

				// Halo
				if (typeof self.halo !== 'undefined') {
					for (i in self.halo) {
						var hEl = el.paper.getById(self.halo[i]);
						if (hEl)
							hEl.animate({'stroke-width': 5, stroke: '#172a36'},200);
					}
				}

				// Radar
				if (typeof self.radar !== 'undefined') {
					for (i in self.radar) {
						var hEl = el.paper.getById(self.radar[i]);
						if (hEl) {
							if (!hEl.data('or'))
								hEl.data('or',hEl.attr('r'));
							// Démarrer l'animation
							(function(){
								var el = hEl;
								radars[self.radar[i]] = setInterval((function(){
									el.animate({
										r: el.data('or')*2,
										'fill-opacity': 0
									},500,function(){
										el.attr('r',0);
										el.attr('fill-opacity',1);
										el.animate({'r':el.data('or')},300);
									})
								}),800)
							})();
						}
					}
				}

			},function(){
				// Biggers
				if (typeof self.bigger !== 'undefined') {
					for (i in self.bigger) {
						var hEl = el.paper.getById(self.bigger[i]);
						if (hEl) {
							hEl.animate({r: hEl.data('or')},200);
						}
							
					}
				}

				// Halo
				if (typeof self.halo !== 'undefined') {
					for (i in self.halo) {
						var hEl = el.paper.getById(self.halo[i]);
						if (hEl)
							hEl.animate({'stroke-width': 0},200);
					}
				}

				// Radar
				if (typeof self.radar !== 'undefined') {
					for (i in self.radar) {
						var hEl = el.paper.getById(self.radar[i]);
						if (hEl) {
							clearInterval(radars[self.radar[i]]);
							hEl.animate({
								r: hEl.data('or'),
								'fill-opacity':1
							},300);
						}
					}
				}
			});
			el.click(function(e){
				var self = interactives[el.id],
					cEl = el.paper.getById(self.bigger[i]);
				h = new Hashtags(self.tweet);
				tweetThis(h.toString());
			})
		})();
	}
});