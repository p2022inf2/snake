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

		this.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
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
		document.body.appendChild(canvas);
		this.context = canvas.getContext('2d');
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.snake = [];
		for(let i = this.amount / 2; i < this.amount / 2 +1; i++){
			this.snake.push({x: i, y: this.amount /2});
		}
		this.direction = 'right';
		this.score = 0;
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		this.context.fillStyle = color;
		let size = this.width/this.amount;
		this.context.fillRect(x * size, y * size, size, size )
		
	}
	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.context.fillStyle = "blue";
		this.context.fillRect(0, 0, this.width, this.height)
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		for(let i = 0; i < this.snake.length; i++){
			let x = this.snake[i].x;
			let y = this.snake[i].y;
			this.drawSquare(x, y, "green");
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
		let foodX, foodY;
		do {
			foodX = Math.floor(Math.random() * this.width);
			foodY = Math.floor(MaTH.random() * this.height);
		} while(this.snake.some(tile => tile.x === foodX && tile.y === foodY));

		
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		let lastTile = this.snake[this.snake.length-1];

		let newX = lastTile.x;
		let newY = lastTile.y;

		switch (this.direction) {
			case 'left':
			  newX -= 1;
			  break;
			case 'right':
			  newX += 1;
			  break;
			case 'up':
			  newY -= 1;
			  break;
			case 'down':
			  newY += 1;
			  break;
		  }

		this.snake.push({x: newX, y:newY});
		this.snake.splice(0, 1)
		return this.snake;
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear();
		this.snake = this.newTile();
		this.drawSnake();

	}



	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		switch(e.keyCode) {
			case 37:
				this.direction = "left";
				break;
			case 38:
				this.direction = "up";
				break;
			case 39:
				this.direction = "right";
				break;
			case 40:
				this.direction = "down";
				break;
		}
	}
} 

let game = new Game(300,300,20); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms