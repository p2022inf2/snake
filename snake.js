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

	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
		var canvas = document.getElementById('micanvas');
		var ctx = canvas.getContext('2d');
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		let direccion = [0,1];
		let puntuacio = 0;
		let serpPos = [[5,5]]
	}
	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x,y,color) {
		ctx.fillStyle = color;
		ctx.fillRect(x,y, width, height);
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(x,y, width, height);
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		ctx.rect(5,5, 2 ,2)
		ctx.stroke();
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		ctx.fillStyle = "#FF0000";
		ctx.rect(pomaX, pomaY, 1 ,1)
		ctx.stroke();
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x,y) {
		if ((x == width) || (y == height)){
			return true;
		}	
		else
			return false;
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		do{
			let pomaX = Math.floor(Math.random() * (width +1));
			let pomaY = Math.floor(Math.random() * (height +1))
			let pomaPos = [pomaX, pomaY]
		} while (pomaPos == serpPos);
		
		
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		serpPos = [serpPos[0[0]] + direccion[0[0]], serpPos[1[1]] + direccion[1[1]]];
		if (serpPos == pomaPos){
		}
		else if (direccion == [0,1]){

		}
		else if (direccion == [0,-1]){
			
		}
		else if (direccion == [1,0]){
			
		}
		else if (direccion == [-1,0]){
			
		}

	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
	}
}

let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
