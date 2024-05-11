class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Block {
    constructor(row, column) {
        this.row = row;
        this.column = column;

    }

    append(html) {
        let fragment = document.createRange().createContextualFragment(html);

        this.element.appendChild(fragment);

    }

    init() {

        document.getElementById("board").appendChild(this.element);
    }

    hide() {

        if (this.row >= 0 && this.column >= 0) {
            document.getElementById(`tile-${this.row}-${this.column}`).style.display = "none";
        }

    }

    render() {

        if (this.row >= 0 && this.column >= 0) {
            document.getElementById(`tile-${this.row}-${this.column}`).style.display = "inline-block";
        }

    }

    fall() {
        this.row += 1;
    }

    moveRight() {
        this.column += 1;
    }

    moveLeft() {
        this.column -= 1;
    }

    rightPosition() {
        return new Position(this.row, this.column + 1);
    }

    leftPosition() {
        return new Position(this.row, this.column - 1);
    }

    getPosition() {
        return new Position(this.row, this.column);
    }

    flash() {
        return window.animatelo.flash(document.getElementById(`tile-${this.row}-${this.column}`), {
            duration: 500
        });
    }

}

class Shape {
    constructor(blocks) {
        this.blocks = blocks;
    }

    getBlocks() {
        return Array.from(this.blocks);
    }

    hide() {
        for (let block of this.blocks) {
            block.hide();
        }
    }

    render() {
        for (let block of this.blocks) {
            block.render();
        }
    }

    fallingPositions() {
        return this.blocks
            .map(b => b.getPosition())
            .map(p => new Position(p.x + 1, p.y));
    }

    fall() {
        for (let block of this.blocks) {
            block.hide();
        }

        for (let block of this.blocks) {
            block.fall();
        }

    }

    rightPositions() {
        return this.blocks.map(b => b.rightPosition());
    }

    leftPositions() {
        return this.blocks.map(b => b.leftPosition());
    }

    moveRight() {
        for (let block of this.blocks) {
            block.moveRight();
        }
    }

    moveLeft() {
        for (let block of this.blocks) {
            block.moveLeft();
        }
    }

    clear() {
        for (let block of this.blocks) {
            block.hide();
        }
        this.blocks = [];
    }

    addBlocks(blocks) {
        for (let block of blocks) {
            this.blocks.push(block);
        }
    }

    rotate() {
        //do nothing
    }

    rotatePositions() {
        //do nothing
    }

}

class Square extends Shape {
    constructor(x, y) {
        let blocks = [];
        blocks.push(new Block(x, y));
        blocks.push(new Block(x, y + 1));
        blocks.push(new Block(x + 1, y));
        blocks.push(new Block(x + 1, y + 1));
        super(blocks);
    }
}

class LShape extends Shape {
    constructor(x, y) {
        let blocks = [];
        blocks.push(new Block(x, y));
        blocks.push(new Block(x - 1, y));
        blocks.push(new Block(x + 1, y));
        blocks.push(new Block(x + 1, y + 1));
        super(blocks);
        this.position = 0;
    }

    rotate() {
        let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
        this.clear();
        this.addBlocks(blocks);
        this.position = this.getNextPosition();
    }

    rotatePositions() {
        let pos = this.getBlocks()
            .shift()
            .getPosition();
        let x = pos.x;
        let y = pos.y;
        let positions = [];
        switch (this.getNextPosition()) {
            case 0:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x + 1, y));
                    positions.push(new Position(x + 1, y + 1));
                }
                break;
            case 1:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x, y + 1));
                    positions.push(new Position(x + 1, y - 1));
                }
                break;
            case 2:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y - 1));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x + 1, y));
                }
                break;
            case 3:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x, y + 1));
                    positions.push(new Position(x - 1, y + 1));
                }
                break;
        }
        return positions;
    }

    getNextPosition() {
        return (this.position + 1) % 4;
    }
}

class TShape extends Shape {
    constructor(x, y) {
        let blocks = [];
        blocks.push(new Block(x, y));
        blocks.push(new Block(x, y - 1));
        blocks.push(new Block(x + 1, y));
        blocks.push(new Block(x, y + 1));
        super(blocks);
        this.position = 0;
    }

    rotate() {
        let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
        this.clear();
        this.addBlocks(blocks);
        this.position = this.getNextPosition();
    }

    rotatePositions() {
        let pos = this.getBlocks()
            .shift()
            .getPosition();
        let x = pos.x;
        let y = pos.y;
        let positions = [];
        switch (this.getNextPosition()) {
            case 0:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x + 1, y));
                    positions.push(new Position(x, y + 1));
                }
                break;
            case 1:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x + 1, y));
                }
                break;
            case 2:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x, y + 1));
                }
                break;
            case 3:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x, y + 1));
                    positions.push(new Position(x + 1, y));
                }
                break;
        }
        return positions;
    }

    getNextPosition() {
        return (this.position + 1) % 4;
    }
}

class ZShape extends Shape {
    constructor(x, y) {
        let blocks = [];
        blocks.push(new Block(x, y));
        blocks.push(new Block(x, y - 1));
        blocks.push(new Block(x + 1, y));
        blocks.push(new Block(x + 1, y + 1));
        super(blocks);
        this.position = 0;
    }

    rotate() {
        let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
        this.clear();
        this.addBlocks(blocks);
        this.position = this.getNextPosition();
    }

    rotatePositions() {
        let pos = this.getBlocks()
            .shift()
            .getPosition();
        let x = pos.x;
        let y = pos.y;
        let positions = [];
        switch (this.getNextPosition()) {
            case 0:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x + 1, y));
                    positions.push(new Position(x + 1, y + 1));
                }
                break;
            case 1:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x + 1, y - 1));
                }
                break;
        }
        return positions;
    }

    getNextPosition() {
        return (this.position + 1) % 2;
    }
}

class Line extends Shape {
    constructor(x, y) {
        let blocks = [];
        blocks.push(new Block(x, y));
        blocks.push(new Block(x - 1, y));
        blocks.push(new Block(x + 1, y));
        blocks.push(new Block(x + 2, y));
        super(blocks);
        this.position = 0;
    }

    rotate() {
        let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
        this.clear();
        this.addBlocks(blocks);
        this.position = this.getNextPosition();
    }

    rotatePositions() {
        let pos = this.getBlocks()
            .shift()
            .getPosition();
        let x = pos.x;
        let y = pos.y;
        let positions = [];
        switch (this.getNextPosition()) {
            case 0:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x - 1, y));
                    positions.push(new Position(x + 1, y));
                    positions.push(new Position(x + 2, y));
                }
                break;
            case 1:
                {
                    positions.push(new Position(x, y));
                    positions.push(new Position(x, y - 1));
                    positions.push(new Position(x, y + 1));
                    positions.push(new Position(x, y + 2));
                }
                break;
        }
        return positions;
    }

    getNextPosition() {
        return (this.position + 1) % 2;
    }
}

class Board {
    constructor() {
        this.blocks = [];
        this.shapes = [];
        this.interval = undefined;
        this.loopInterval = 1000;
        this.gameOver = true;
        this.loopIntervalFast = parseInt(1000 / 27);
        this.init();
        this.score = 0;
    }

    setScore(value) {
        this.score = value;
        document.getElementById("score").innerHTML = this.score;
    }

    getScore() {
        return this.score;
    }

    init() {

        /**
         * Parameter Substitution for templates
         * 
         * @param {String} template the template 
         * @param {*} values the values as a dictionary
         * @returns a string with substituted values that conform to the template
         */
        function substitute(template, values) {
            let value = template;

            let keys = Object.keys(values);

            for (let key in keys) {
                value = value.split("${" + keys[key] + "}").join(values[keys[key]]);
            }

            return value;

        }

        let template = document.querySelector('script[data-template="tile"]').text;
        let board = document.getElementById("board");

        let element = board;

        for (var row = 0; row < 16; row++) {

            for (var column = 0; column < 10; column++) {

                var tile = substitute(template, {
                    id: `${row}-${column}`
                });

                let fragment = document.createRange().createContextualFragment(tile);

                board.append(fragment);

            }

        }

        document.getElementById("message").text = "Tetris";

        window.animatelo.flash("#new-game", {
            duration: 2500,
            iterations: Infinity
        });
    }

    newGame() {
        for (let shape of this.shapes) {
            this.removeShape(shape);
            this.addBlocks(shape.getBlocks());
        }
        for (let block of this.blocks) {
            block.hide();
        }
        this.blocks = [];
        this.gameOver = false;
        this.initGameLoop(this.loopInterval);
        this.setScore(0);
        document.getElementById("banner").style.display = "none";
        window.audio.play();
    
    }

    initGameLoop(value) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        let ref = this;
        this.interval = setInterval(function () {
            ref.gameLoop();
        }, value);
    }

    gameLoop() {

        this.renderShapes();
        this.renderBlocks();
        this.spawnShapes();
        this.gameUpdate();

    }

    gameUpdate() {
        if (this.isGameOver()) {
            this.gameOver = true;
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = undefined;
            }

            document.getElementById("banner").style.display = "inline-block";
            document.getElementById("message").text = "Game Over!";
            document.getElementById("new-game").text = "Tap here to start again!";

            window.audio.pause();

        }

    }

    isGameOver() {
        for (let block of this.blocks) {
            let pos = block.getPosition();
            if (pos.x === 0 && pos.y === 4) {
                return true;
            }
        }
        return false;
    }

    renderShapes() {

        for (let shape of this.getShapes()) {
            if (
                this.arePositonsWithinBoard(shape.fallingPositions()) &&
                this.areBlocksEmpty(shape.fallingPositions())
            ) {
                shape.fall();
                shape.render();
            } else {
                this.removeShape(shape);
                this.addBlocks(shape.getBlocks());
                if (this.moveFast) {
                    this.initGameLoop(this.loopInterval);
                    this.moveFast = false;
                }
            }
        }
    }

    dropShape() {
        if (!this.gameOver) {
            this.initGameLoop(this.loopIntervalFast);
            this.moveFast = true;
        }
    }

    renderBlocks() {

        for (let row = 0; row < 16; row++) {
            let blocks = [];
            
            for (let column = 0; column < 10; column++) {
                let block = this.getBlock(row, column);
                if (!block) {
                    break;
                }
                blocks.push(block);
            }

            if (blocks.length == 10) {
                let ref = this;
                
                this.removeBlocks(blocks);

                this.flashBlocks(blocks, function () {
                    ref.destroyBlocks(blocks);
                    ref.fallBlocks(row);
                    ref.setScore(ref.getScore() + 10);
                });
            }
        }
    }

    flashBlocks(blocks, callback) {
        let anim = null;

        for (let block of blocks) {
            anim = block.flash();
        }

        anim[0].onfinish = callback;

    }

    fallBlocks(pos) {  
  
        for (let row = 0; row < pos; row++) {
            for (let column = 0; column < 10; column++) {
                let block = this.getBlock(row, column);
                
                if (block) {
                    block.hide();
                }

            }

        }

        for (let row = 0; row < pos; row++) {
            for (let column = 0; column < 10; column++) {
                let block = this.getBlock(row, column);
                
                if (block) {
                    block.fall();
                    block.render();
                }

            }

        }

    }

    removeBlocks(blocks) {
 
        for (let block of blocks) {

            this.blocks.splice(this.blocks.indexOf(block), 1);
    
        }

    }

    destroyBlocks(blocks) {
        for (let block of blocks) {
            block.hide();
        }
    }

    getBlock(row, column) {
        for (let block of this.blocks) {
            if (block.row == row && block.column == column) {
                return block;
            }
        }
        return null;
    }

    spawnShapes() {
        if (this.shapes.length == 0) {
            let shape = null;

            switch (this.getRandomRange(0, 4)) {
                case 0:
                    {
                        shape = new Line(0, 4);
                    }
                    break;
                case 1:
                    {
                        shape = new Square(0, 4);
                    }
                    break;
                case 2:
                    {
                        shape = new LShape(0, 4);
                    }
                    break;
                case 3:
                    {
                        shape = new ZShape(0, 4);
                    }
                    break;
                case 4:
                    {
                        shape = new TShape(0, 4);
                    }
                    break;
            }

            shape.render();
            this.shapes.push(shape);
        }
    }

    getShapes() {
        return Array.from(this.shapes);
    }

    removeShape(shape) {
        this.shapes.splice(this.shapes.indexOf(shape), 1);
    }

    addBlocks(blocks) {
        for (let block of blocks) {
            this.blocks.push(block);
        }
    }

    arePositonsWithinBoard(positions) {

        for (let position of positions) {
            if (position.x >= 16 || position.y < 0 || position.y >= 10) {
                return false;
            }
        }

        return true;
    }

    areBlocksEmpty(positions) {
        for (let position of positions) {
            for (let block of this.blocks) {
                let pos = block.getPosition();
                if (pos.x == position.x && pos.y == position.y) {
                    return false;
                }
            }
        }
        return true;
    }

    leftKeyPress() {
        for (let shape of this.shapes) {
            if (
                this.arePositonsWithinBoard(shape.leftPositions()) &&
                this.areBlocksEmpty(shape.leftPositions())
            ) {
                shape.hide();
                shape.moveLeft();
                shape.render();
            }
        }
    }

    rotate() {
        for (let shape of this.shapes) {
            if (
                this.arePositonsWithinBoard(shape.rotatePositions()) &&
                this.areBlocksEmpty(shape.rotatePositions())
            ) {

                shape.hide();
                shape.rotate();
                shape.render();

            }
        }
    }

    rightKeyPress() {
        for (let shape of this.shapes) {
            if (
                this.arePositonsWithinBoard(shape.rightPositions()) &&
                this.areBlocksEmpty(shape.rightPositions())
            ) {
                shape.hide();
                shape.moveRight();
                shape.render();
            }
        }
    }

    upKeyPress() {
        this.rotate();
    }

    downKeyPress() {
        this.dropShape();
    }

    getRandomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

let board = new Board();

document.addEventListener("keydown", function (e) {
    switch (e.which) {
        case 37: // left
            board.leftKeyPress();
            break;

        case 38: // up
            board.upKeyPress();
            break;

        case 39: // right
            board.rightKeyPress();
            break;

        case 40: // down
            board.downKeyPress();
            break;

        case 78: // n
            board.newGame();
            break;

        default:
            console.log(e.which);
            break; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)

});

window.onload = function () {

    document.getElementById("new-game").addEventListener("click", function () {
        board.newGame();
    });

    document.getElementById("down").addEventListener("click", function () {
        board.downKeyPress();
    });

    document.getElementById("rotate").addEventListener("click", function () {
        board.upKeyPress();
    });

    document.getElementById("left").addEventListener("click", function () {
        board.leftKeyPress();
    });

    document.getElementById("right").addEventListener("click", function () {
        board.rightKeyPress();
    });

    window.audio = new Audio(document.getElementById("music").src);
    window.audio.volume = 0.1;

}