const game = document.getElementById("gameOfLife")

const UnitSize = 8
const sleepMs = 200

let initialState = Array(250).fill().map(() => Array(250).fill(0));

initialState[11][11] = 1
initialState[12][11] = 1
initialState[13][11] = 1
initialState[13][10] = 1
initialState[12][9] = 1

initialState[11][16] = 1
initialState[12][16] = 1
initialState[13][16] = 1
initialState[13][15] = 1
initialState[12][14] = 1


initialState[16][11] = 1
initialState[17][11] = 1
initialState[18][11] = 1
initialState[18][10] = 1
initialState[17][9] = 1

function getNeighbours(state, i, j) {
    const neighbours = []

    if (i > 0) {
        neighbours.push(state[i - 1][j - 1])
        neighbours.push(state[i - 1][j])
        neighbours.push(state[i - 1][j + 1])
    }


    neighbours.push(state[i][j - 1])
    neighbours.push(state[i][j + 1])

    if (i < state.length - 1) {
        neighbours.push(state[i + 1][j - 1])
        neighbours.push(state[i + 1][j])
        neighbours.push(state[i + 1][j + 1])
    }

    return neighbours.filter(n => n === 1 || n === 0)

}

function update(state) {
    let newState = Array(250).fill().map(() => Array(250).fill(0));

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; state[i] && j < state[i].length; j++) {
            const totalActiveNeighbours = getNeighbours(state, i, j).filter(n => n === 1).length
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

            // Dead cell
            if (state[i][j] === 0) {
                if (totalActiveNeighbours === 3) {
                    newState[i][j] = 1
                }
            } else {
                // live cell
                if (totalActiveNeighbours >= 2 && totalActiveNeighbours <= 3) {
                    newState[i][j] = 1
                }
            }
        }
    }
    return newState
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function play(state) {
    var ctx = game.getContext("2d");
    ctx.fillStyle = "#000000";

    while (true) {
        ctx.clearRect(0, 0, game.width, game.height)

        for (let i = 0; i < state.length; i++) {
            for (let j = 0; state[i] && j < state[i].length; j++) {
                if (state[i][j] === 1) {
                    ctx.fillRect(i * UnitSize, j * UnitSize, UnitSize, UnitSize);
                }
            }
        }
        state = update(state)
        await sleep(sleepMs)
    }



}

play(initialState)

