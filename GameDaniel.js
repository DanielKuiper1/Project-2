// var myGamePiece;

// function startGame() {
//     myGameArea.start();
//     myGamePiece = new component(30, 30, "orange", 10, 120);
// }

// var myGameArea = {
//     canvas : document.getElementById("mijnCanvas"),
//     start : function() {
//         this.context = this.canvas.getContext("2d");
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// function component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;    
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;        
//     }    
// }

// function updateGameArea() {
//     myGameArea.clear();
//     myGamePiece.newPos();    
//     myGamePiece.update();
// }

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById("mijnCanvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "white", x, 0));
        myObstacles.push(new component(10, x - height - gap, "white", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 65: //left arrow key
            moveLeft();
            break;
        case 87: //Up arrow key
            moveUp();
            break;
        case 68: //right arrow key
            moveRight();
            break;
        case 83: //down arrow key
            moveDown();
            break;
    }
}

function moveUp() {
    myGamePiece.speedY -= 1; 
}
function moveDown() {
    myGamePiece.speedY += 1;
}
function moveLeft() {
    myGamePiece.speedX -= 1;
}
function moveRight() {
    myGamePiece.speedX += 1; 
}
