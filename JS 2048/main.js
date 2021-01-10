let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


// width of squares = 100 // 4 by 4
// gap is 30
// total width = 550, and total height = 550

let grid = [];
for(let i = 0; i < 4; i++) {
    grid.push([]);
    for(let j = 0; j < 4; j++) {
        grid[i].push(0);
    }
};


// randomly generating 2 starting numbers - can only be 2 and 4 - and placing them on the grid
function generateStart() {
    // creating the 2 starting numbers
    let num1 = generateNum();
    let num2 = generateNum();
    function generateNum() {
        let randomNum = Math.floor(Math.random() * 2)
        if(randomNum == 0) {
            return 2;
        } else if(randomNum == 1) {
            return 4;
        }
    };

    let point1 = Math.floor(Math.random() * 4); // x-value
    let point2 = Math.floor(Math.random() * 4); // y-value
    let point3 = Math.floor(Math.random() * 4); // x- value
    let point4 = generatePoint4(); // y-value // this is because point1 and point2 are for the first point on the grid matrix, and then the 2nd point on the grid matrix needs to be different from the point obtained from combining point1 and point2(essentially the x and y)

    function generatePoint4() {
        if(point3 !== point1 && point3 !== point2) {
            return Math.floor(Math.random() * 4);
        } else {
            let finalGeneratedNum;
            function generateNum() {
                let randomNumber = Math.floor(Math.random() * 4);
                if(point3 == point1) {
                    if(randomNumber !== point2) {
                        finalGeneratedNum = randomNumber;
                        return;
                    } else {
                        generateNum();
                    }
                } else if(point3 == point2) {
                    if(randomNumber !== point1) {
                        finalGeneratedNum = randomNumber;
                        return;
                    } else {
                        generateNum();
                    }
                }
            }
            generateNum();
            return finalGeneratedNum;
        }
    }

    grid[point1][point2] = num1;
    grid[point3][point4] = num2;
};
generateStart();

function drawBackground() {
    context.fillStyle = 'grey';
    context.fillRect(0, 0, 550, 550);
};

function draw() {
    drawBackground();
    drawSquares();
    // checkIfLoss();
};

// the restart function if the board is filled and the player lost
function restart() {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            grid[y][x] = 0;
        }
    }
    generateStart();
};


// checking if the board is filled (if the player lost)
function checkIfLoss() {
    let numOf0s = 0;
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            if(grid[y][x] == 0) {
                numOf0s++;
            }
        }
    };
    let numOfMoves = 0;
    if(numOf0s == 0) { // if there are no 0's left in the grid then check every spot and all the spots around it to see if there is a number match
        for(let y = 0; y < grid.length; y++) {
            for(let x = 0; x < grid[y].length; x++) { // check if the current value has another value surrounding it that is the same - first I have to check all middle points, and then I have to check all end points, and then check the remaining so that x and y exist when doing grid[y][x];
                if(x > 0 && x < 3 && y > 0 && y < 3) { // making sure it is not an edge (checking all non edges)
                    if(grid[y][x] == grid[y][x - 1] || grid[y][x] == grid[y][x + 1] || grid[y][x] == grid[y - 1][x] || grid[y][x] == grid[y + 1][x]) {
                        numOfMoves++;
                        // console.log(numOfMoves);
                    }
                } else if(x == 0 && y == 0) { // checking top-left
                    if(grid[y][x] == grid[y][x + 1] || grid[y][x] == grid[y + 1][x]) {
                        numOfMoves++;
                    }
                } else if(x == 3 && y == 0) { // checking top-right corner
                    if(grid[y][x] == grid[y][x - 1] || grid[y][x] == grid[y + 1][x]) {
                        numOfMoves++;
                    }
                } else if(x == 0 && y == 3) { // checking bottom-left corner
                    if(grid[y][x] == grid[y][x + 1] || grid[y][x] == grid[y - 1][x]) {
                        numOfMoves++;
                    }
                } else if(x == 3 && y == 3) { // checking top bottom-right corner
                    if(grid[y][x] == grid[y][x - 1] || grid[y][x] == grid[y - 1][x]) {
                        numOfMoves++;
                    }
                } else if(y == 0) {
                    if(grid[y][x] == grid[y][x - 1] || grid[y][x] == grid[y][x + 1] || grid[y][x] == grid[y + 1][x]) {
                        numOfMoves++;
                    }
                } else if(x == 0) {
                    if(grid[y][x] == grid[y - 1][x] || grid[y][x] == grid[y + 1][x] || grid[y][x] == grid[y][x + 1]) {
                        numOfMoves++;
                    }
                } else if(x == 3) {
                    if(grid[y][x] == grid[y - 1][x] || grid[y][x] == grid[y + 1][x] || grid[y][x] == grid[y][x - 1]) {
                        numOfMoves++;
                    }
                } else if(y == 3) {
                    if(grid[y][x] == grid[y][x - 1] || grid[y][x] == grid[y][x + 1] || grid[y][x] == grid[y - 1][x]) {
                        numOfMoves++;
                    }
                }
            }
        }
    };


    if(numOf0s == 0 && numOfMoves == 0) {
        restart();
    };
};

function drawSquares() {
    y = 0;
    for(let i = 0; i < grid.length; i++) {
        let WandH = 100; // width and height of squares
        let x = 0;
        if(i == 0) {y += 30;} else {y += 130;}

        for(let j = 0; j < grid[i].length; j++) {
            if(j == 0) {x += 30;} else {x += 130;}
                context.fillStyle = 'darkgrey';
                context.fillRect(x, y, WandH, WandH);
                if(grid[i][j] !== 0) {
                    context.fillStyle = 'blue';
                    context.font = '40px arial';
                    context.fillText(grid[i][j], x + 25, y + 60);
                }
        }
    }
};


function gridMoveLeft() {
    let tempArray = [];
    for(let i = 0; i < 4; i++) {
        tempArray.push([]);
        for(let j = 0; j < 4; j++) {
            tempArray[i][j] = 0;
        }
    }
    

    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            if(x !== 0 && grid[y][x] !== 0) {
                if(grid[y][x - 1] == 0) { // if the value to the left is 0 then loop as far left as possible
                    let passedOnNum;
                    let xVal; // the new x-val that the number comibined or not will go to
                    loop1:
                    for(let i = x; i > 0; i--) { // setting i to the x as I backtrack
                        if(i == 1 && grid[y][i - 1] == 0) {
                            passedOnNum = grid[y][x]
                            xVal = 0;
                            break loop1;
                        }
                        if(grid[y][i - 1] !== 0) { // if the spot to the left of the current is not 0
                            if(grid[y][i - 1] == grid[y][x]) { // if the spot before the current spot is the same as the current one
                                if(tempArray[y][i - 1] !== 1) {
                                    xVal = i - 1;
                                    passedOnNum = grid[y][x] * 2;
                                    tempArray[y][i - 1] = 1;
                                } else {
                                    xVal = i;
                                    passedOnNum = grid[y][x];
                                }
                                break loop1;
                            } else { // if it is not equal
                                passedOnNum = grid[y][x];
                                xVal = i;
                                break loop1;
                            }
                        };
                    };
                        grid[y][x] = 0;
                        grid[y][xVal] = passedOnNum;
                }
                // could also put else but I am just seperating it
                if(grid[y][x - 1] !== 0) { // if the value to the left is not 0, and instead either different or the same. you dont need to loop, but instead just directly change the current values
                    if(grid[y][x - 1] == grid[y][x]) {
                        let currNum = grid[y][x];
                        grid[y][x - 1] = currNum * 2;
                        grid[y][x] = 0;
                        tempArray[y][x - 1] = 1;
                    } else if(grid[y][x - 1] !== grid[y][x]) { // dont want to do anything if the value to the left is different (just showing it here as part of the logic)
                    }
                }
            } 
        }
    }
};

function gridMoveRight() {
    let tempArray = [];
    for(let i = 0; i < 4; i++) {
        tempArray.push([]);
        for(let j = 0; j < 4; j++) {
            tempArray[i][j] = 0;
        }
    }

    for(let y = 0; y < grid.length; y++) {
        for(let x = grid[y].length - 2; x >= 0; x--) { // starting one before the last one (looping left to check each)

            if(grid[y][x + 1] !== 0) {
                if(grid[y][x] == grid[y][x + 1] && tempArray[y][x + 1] !== 1) {
                    grid[y][x + 1] = grid[y][x] * 2;
                    grid[y][x] = 0;
                    tempArray[y][x + 1] = 1;
                } else if(grid[y][x] == grid[y][x + 1] && tempArray[y][x + 1] == 1) { // do nothing here, but just showing as part of the logic
                } else if(grid[y][x] !== grid[y][x + 1]) { // do nothing here also, just showing as part of the logic
                }
            } else if(grid[y][x + 1] == 0) {
                let newNum;
                let newX;
                loop1:
                for(let i = x; i < grid[y].length - 1; i++) {
                    if(i == 2 && grid[y][i + 1] == 0) {
                        newNum = grid[y][x];
                        newX = i + 1;
                        break loop1;
                    } else if(grid[y][x] == grid[y][i + 1]) {
                        if(tempArray[y][i + 1] !== 1) {
                            newNum = grid[y][x] * 2;
                            newX = i + 1;
                            tempArray[y][i + 1] = 1;
                        } else if(tempArray[y][i + 1] == 1) {
                            newNum = grid[y][x];
                            newX = i;
                        }
                        break loop1;
                    } else if(grid[y][x] !== grid[y][i + 1] && grid[y][i + 1] !== 0) { // if the number to the right of the current is not equal the number I am checking, and is also not 0
                        newNum = grid[y][x];
                        newX = i;
                        break loop1;
                    }
                }
                // console.log(y, newX)
                grid[y][x] = 0; // setting the current to 0, because the line below will determine whether or not it gets changed
                grid[y][newX] = newNum;
            }

        }
    }
}

function gridMoveUp() {
    let tempArray = [];
    for(let i = 0; i < 4; i++) {
        tempArray.push([]);
        for(let j = 0; j < 4; j++) {
            tempArray[i][j] = 0;
        }
    }

    for(let x = 0; x < grid[0].length; x++) {
        for(let y = 1; y < grid.length; y++) {
            if(grid[y][x] !== 0) { // checking if the number on this spot is not 0

                if(grid[y - 1][x] !== 0) { // means that I need to put the current number here
                    if(grid[y - 1][x] == grid[y][x]) { // could put an (&&) and add it to the if statment above but this makes it easier to see the logic
                        grid[y - 1][x] = grid[y][x] * 2;
                        grid[y][x] = 0;
                        tempArray[y - 1][x] = 1;
                    }; // if the number in grid[y - 1][x] is differnet than grid[y][x] then just dont do anything, so all I need is this single if statement checking if they are the same
                } else if(grid[y - 1][x] == 0) {
                    let newY;
                    let newNum;
                    loop1:
                    for(let i = y; i > 0; i--) {
                        if(i == 1 && grid[i - 1][x] == 0) {
                            newY =  i - 1; // could just put 0, but i - 1 is more consistent
                            newNum = grid[y][x];
                            break loop1;
                        };
                        if(grid[y][x] == grid[i - 1][x]) {
                            if(tempArray[i - 1][x] !== 1) {
                                newY = i - 1;
                                newNum = grid[y][x] * 2;
                                tempArray[i - 1][x] = 1;
                            } else {
                                newY = i;
                                newNum = grid[y][x];
                            }
                            break loop1;
                        } else if(grid[y][x] !== grid[i - 1][x] && grid[i - 1][x] !== 0) {
                            newY = i;
                            newNum = grid[y][x];
                            break loop1;
                        }
                    }
                    grid[y][x] = 0;
                    grid[newY][x] = newNum;
                }

            }
        }
    }
}

function gridMoveDown() {
    let tempArray = [];
    for(let i = 0; i < 4; i++) {
        tempArray.push([]);
        for(let j = 0; j < 4; j++) {
            tempArray[i][j] = 0;
        }
    }

    for(let x = 0; x < grid[0].length; x++) {
        for(let y = grid.length - 2; y >= 0; y--) {
            if(grid[y][x] !== 0) { // checking if the number on this spot is not 0

                if(grid[y + 1][x] !== 0) { // means that I need to put the current number here
                    if(grid[y + 1][x] == grid[y][x]) { // could put an (&&) and add it to the if statment above but this makes it easier to see the logic
                        grid[y + 1][x] = grid[y][x] * 2;
                        grid[y][x] = 0;
                        tempArray[y + 1][x] = 1;
                    }; // if the number in grid[y - 1][x] is differnet than grid[y][x] then just dont do anything, so all I need is this single if statement checking if they are the same
                } else if(grid[y + 1][x] == 0) {
                    let newY;
                    let newNum;
                    loop1:
                    for(let i = y; i < grid.length - 1; i++) {
                        if(i == grid.length - 2 && grid[i + 1][x] == 0) {
                            newY =  i + 1; // could just put 0, but i - 1 is more consistent
                            newNum = grid[y][x];
                            break loop1;
                        };
                        if(grid[y][x] == grid[i + 1][x]) {
                            if(tempArray[i + 1][x] !== 1) {
                                newY = i + 1;
                                newNum = grid[y][x] * 2;
                                tempArray[i + 1][x] = 1;
                            } else {
                                newY = i;
                                newNum = grid[y][x];
                            }
                            break loop1;
                        } else if(grid[y][x] !== grid[i + 1][x] && grid[i + 1][x] !== 0) {
                            newY = i;
                            newNum = grid[y][x];
                            break loop1;
                        }
                    }
                    grid[y][x] = 0;
                    grid[newY][x] = newNum;
                }

            }
        }
    } 
};

function addNewNum() {
    let newY = Math.round(Math.random() * 3);
    let newX = Math.round(Math.random() * 3);
    
    let numsOfChoice = [2, 4]
    let choiceIndex = Math.round(Math.random() * 1);
    let newNum = numsOfChoice[choiceIndex];

    if(grid[newY][newX] == 0) {
        grid[newY][newX] = newNum;
    } else {
        addNewNum();
    }
}


document.addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 37:
            gridMoveLeft();
            break;
        case 38:
            gridMoveUp();
            break;
        case 39:
            gridMoveRight();
            break;
        case 40:
            gridMoveDown();
            break;
    }
    addNewNum();
    checkIfLoss();
})



function update() {
    setInterval(draw, 100);
}
update()