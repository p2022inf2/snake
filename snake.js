class Game {
    constructor(width, height, amount) {
        this.width = width;
        this.height = height;
        this.amount = amount;
        this.serp = [{ x: width / 2, y: height / 2 }];
        this.food = {};
        this.direccion = "right";
        this.puntuacion = 0;
        this.canvasElem = document.createElement('canvas');
        this.ctx = this.canvasElem.getContext('2d');
        this.initCanvas();
        this.addFood();
        this.draw();
    }

    initCanvas() {
        this.canvasElem.id = "canvas";
        this.canvasElem.width = this.width;
        this.canvasElem.height = this.height;
        this.canvasElem.style.border = "2px solid black";
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
        document.body.appendChild(this.canvasElem);
    }

    start() {
        this.serp = [{ x: this.width / 2, y: this.height / 2 }];
        this.direccion = "right";
        this.puntuacion = 0;
        this.addFood();
        this.draw();
    }

    draw() {
        this.clear();
        this.drawSnake();
        this.drawFood();
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawSquare(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.amount, this.amount);
    }

    drawSnake() {
        for (let i = 0; i < this.serp.length; i++) {
            this.drawSquare(this.serp[i].x, this.serp[i].y, "black");
        }
    }

    drawFood() {
        this.drawSquare(this.food.x, this.food.y, "red");
    }

    collides(x, y) {
        for (let i = 0; i < this.serp.length; i++) {
            if (this.serp[i].x === x && this.serp[i].y === y) {
                return true;
            }
        }
        return false;
    }

    addFood() {
        do {
            this.food.x = Math.floor(Math.random() * this.width / this.amount) * this.amount;
            this.food.y = Math.floor(Math.random() * this.height / this.amount) * this.amount;
        } while (this.collides(this.food.x, this.food.y));
    }

    newTile() {
        switch (this.direccion) {
            case "right":
                return { x: this.serp[this.serp.length - 1].x + this.amount, y: this.serp[this.serp.length - 1].y };
            case "left":
                return { x: this.serp[this.serp.length - 1].x - this.amount, y: this.serp[this.serp.length - 1].y };
            case "up":
                return { x: this.serp[this.serp.length - 1].x, y: this.serp[this.serp.length - 1].y - this.amount };
            case "down":
                return { x: this.serp[this.serp.length - 1].x, y: this.serp[this.serp.length - 1].y + this.amount };
        }

        
        
    }

    

        /**
     * Mou la serp una casella en la direcció actual, actualitza la puntuació i comprova si s'ha acabat el joc
     */
    
        move() {
            // Crea una nova posició per la serp
            let newPos = this.newTile();
    
            // Comprova si la nova posició està dins del canvas
            if (newPos.x < 0 || newPos.x >= this.width || newPos.y < 0 || newPos.y >= this.height) {
                this.gameOver();
                return;
            }
    
            // Comprova si la nova posició xoca amb la serp
            if (this.collides(newPos.x, newPos.y)) {
                this.gameOver();
                return;
            }
    
            // Afegeix la nova posició a la serp
            this.serp.push(newPos);
    
            // Comprova si la nova posició té la poma
            if (newPos.x === this.food.x && newPos.y === this.food.y) {
                this.puntuacion += 1;
                this.addFood();
            } else {
                // Elimina la cua de la serp
                this.serp.shift();
            }
    
            // Neteja el canvas i dibuixa la serp i la poma
            this.clear();
            this.drawSnake();
            this.drawFood();
    
            // Actualitza la puntuació a la pantalla
            document.getElementById("score").innerHTML = "Puntuació: " + this.puntuacion;
        }
    
        /** 
         * Acaba el joc i mostra la puntuació
         */
        gameOver() {
            alert("Has perdut! Puntuació: " + this.puntuacion);
            
            
            location.reload();
        }

        

        
    }
    
    // Crea el joc i inicia el bucle principal
    let joc = new Game(400, 400, 20);
    joc.addFood();
    setInterval(() => joc.move(), 100);
    