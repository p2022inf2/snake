/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {

	// Define el constructor de la clase SnakeGame
	constructor(width,height,amount) {
		// Inicialitza las propiedades de la clase
		this.width = width; // Ancho del canvas
		this.height = height; // Alto del canvas
		this.amount = amount; // Número de cuadros que habrá en cada file/columna
		this.initCanvas(width, height); // Inicialitza el canvas
		this.start(); // Comienza el juego

	}

	initCanvas(width, height) {
		// Crea el elemento canvas
		let canvas = document.createElement('canvas');

		// Establecer su ancho y altura
		canvas.width = width;
		canvas.height = height;

		// Añadir el canvas al body del documento
		document.body.appendChild(canvas);

		// Obtener el contexto del dibujo 2D del canvas
		this.context = canvas.getContext('2d');
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		// Inicialitza la serpiente vacia
		this.snake = [];
		// Calcula la posición inicial de la serpiente y la añada al array
		// La serpiente estará en la mitad de la pantalla y su longitud será la mitad de la cantidad de bloques
		for(let i = this.amount / 2; i < this.amount / 2 +1; i++){
			this.snake.push({x: i, y: this.amount /2});
		}
		// Establece la dirección inicial a la derecha
		this.direction = 'right';
		// Inicialitza la puntuación a 0
		this.score = 0;
		// Añade la primera comida al juego
		this.addFood();
	}

	// Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas

	drawSquare(x, y, color) {
		// Establece el color de relleno del contexto del canvas
		this.context.fillStyle = color;
		// Calcula el tamaño de cada celda del juego
		let size = this.width/this.amount;
		// Dibuja un rectangulo en el context del canvas en esas coordenadas
		this.context.fillRect(x * size, y * size, size, size )
		
	}
	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		// Se establece el color de relleno como azul
		this.context.fillStyle = "blue";
		// Se dibuja un rentángulo que cubra todo el canvas usando el color de relleno
		this.context.fillRect(0, 0, this.width, this.height)
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		// Itera por cada parte de la serpiente
		for (let i = 0; i < this.snake.length; i++) {
			// Obtiene la posición de la parte de la serpiente actual
			let x = this.snake[i].x;
			let y = this.snake[i].y;
			// Dibuja un cuadrado en la posición actual con el color verde
			this.drawSquare(x, y, "green");
		}
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		// Dibuja un cuadrado rojo en la posición de la comida
		this.drawSquare(this.food.x, this.food.y, "red");
	}

	// La serp xoca amb la posició donada?
	collides(x, y) {
		for (let i = 0; i < this.snake.length; i++) {
			// Si la posición (x, y) coincide con la posición de un segmento de la serpiente, devuelve verdadero
			if (this.snake[i].x === x && this.snake[i].y === y) {
				return true;
			}
		}
		// Si no hay coincidencias, devuelve falso
		return false;
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		// Genera coordenadas aleatorias para la comida
		let foodX, foodY;
		do {
			foodX = Math.floor(Math.random() * this.amount);
			foodY = Math.floor(Math.random() * this.amount);
		} while (this.collides(foodX, foodY)); // Verifica que las coordenadas generadas no colisiones con la serpiente
		
		// Asigna las coordenadas generadas a la propiedad 'food' del objeto juego
		this.food = { x: foodX, y: foodY };
		// Retorna la comida generada
		return this.food;
	}

	// Calcula una nova posició a partir de la ubicació de la serp

	newTile() {
		let lastTile = this.snake[this.snake.length-1]; // Obtener la última ficha de la serpiente
		let newX = lastTile.x; // Obtener la posición x de la última ficha
		let newY = lastTile.y; // Obtener la posición y de la última ficha
	  
		switch (this.direction) { // Determinar la dirección en que se mueve la serpiente
		  case 'left':
			newX -= 1; // Disminuir la posición x
			if (newX < 0) { // Si la serpiente sale del borde izquierdo
			  newX = this.amount - 1; // ajusta la posición a la derecha
			}
			break;
		  case 'right':
			newX += 1; // Aumentar la posición x
			if (newX >= this.amount) { // Si la serpiente sale del borde derecho
			  newX = 0; // ajusta la posición a la izquierda
			}
			break;
		  case 'up':
			newY -= 1; // Disminuir la posición y
			if (newY < 0) { // Si la serpiente sale del borde superior
			  newY = this.amount - 1; // ajusta la posición hacia abajo
			}
			break;
		  case 'down':
			newY += 1; // Aumentar la posición y
			if (newY >= this.amount) { // Si la serpiente sale del borde inferior
			  newY = 0; // ajusta la posición hacia arriba
			}
			break;
		}
	  
		this.snake.push({x: newX, y: newY}); // Agregar una nueva ficha a la serpiente con la nueva posicion
		this.snake.splice(0, 1); // Elimina la ficha más antigua de la serpiente
	  
		return this.snake; // Devolver la serpiente actualizada
	  }

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		// Obtener la nueva posición de la serpiente y la almacenamos en una variable 
		let newTile = this.newTile();
	  
		// Si la cabeza de la serpiente está en la posición de la comida, la serpiente crece y
		// Se agrega una nueva comida aleatoria en otra posición
		if (this.food.x === newTile[0].x && this.food.y === newTile[0].y) {
		  this.snake.push(this.food);
		  this.food = this.addFood();
		} else {
			// Si no alcanzó la comida, se actualizara la posición de la serpiente eliminando
			// La ultima posición (la cola) y agregando una nueva posición en la cabeza
		  this.snake = newTile;
		}
	  
		// Limpiamos el canvas y dibujamos la serpiente y la comida en sus nuevas posiciones
		this.clear();
		this.drawSnake();
		this.drawFood();
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