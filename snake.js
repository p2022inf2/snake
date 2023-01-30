/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {

	/**
	 * Inicialitza els paràmetres del joc i crea el canvas
	 * @constructor
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 * @param {number} amount -  nombre de quadrats per fila de la quadrícula
	 */
	constructor(width,height,amount) {
		this.width = width;
		this.height = height;
		this.amount = amount; 
		this.initCanvas(width, height);
		this.start();
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	
	initCanvas(width, height) {
		let canvas = document.createElement('canvas');
		
		canvas.width = width;
		canvas.height = height;
		canvas.style.border   = "1px solid";
		this.ctx = canvas.getContext('2d');
		document.getElementsByTagName('body')[0].appendChild(canvas);
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.puntuacio = 0;
		this.direccio = [0,1];
		this.pos =[[parseInt(this.amount/2), parseInt(this.amount/2)]];
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x,y,color) {
		let a = this.width/this.amount; 
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.rect(a*x, a*y, a, a);
		this.ctx.stroke();
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() { 
		this.ctx.beginPath();
		this.ctx.fillStyle = 'grey';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.stroke();

	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		for (let i=0; i<this.pos.length; i++){
			this.drawSquare(this.pos[i][0],this.pos[i][1],'black');
		}
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x,y) {
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		let newpos=[];
		for (let i = 0; i<this.pos.length; i++){
			newpos[0] = this.pos[0][0]+this.direccio[0];
			newpos[1] = this.pos[0][1]+this.direccio[1];
		}
		return newpos;
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear();
		this.pos[0] = this.newTile();
		this.drawSnake();
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		if (e.keyCode == '38') {
			this.direccio = [0,-1];
			// up arrow
		}
		else if (e.keyCode == '40') {
			this.direccio = [0,1];
			// down arrow
		}
		else if (e.keyCode == '37') {
			this.direccio = [-1,0];
		   // left arrow
		}
		else if (e.keyCode == '39') {
			this.direccio = [1,0];
		   // right arrow
		}
	}
}

let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
