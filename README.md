# minimax-ai

## Introduction

This project was an exercise in implementing the Minimax algorithm. The Minimax algorithm is a recursive algorithm used in artificial intelligence 
for analysing and ranking possible outcomes based on given initial conditions. Additional optimisation is included using alpha-beta pruning, which decreases
the depth of the search by discarding outcomes that are unfavourable for the computer. Here it is demonstrated using a standard 3x3 grid variant of Tic Tac Toe.

The project is coded in [TypeScript](https://www.typescriptlang.org/) and styled using [Tailwind CSS](https://tailwindcss.com/). These dependencies are managed using
the [npm](https://www.npmjs.com/) package manager.

## How to Run

1. Clone the repository to your local machine

`git clone https://github.com/tailflail/minimax-ai.git`

2. Install the dependencies

`npm install`

3. Compile and run the project

`npm run build`

4. Open http://localhost:8080/ in your browser

## How to Play

1. Enter a name for each player (Optional)

<img src="https://user-images.githubusercontent.com/89919950/215422251-31e42d3e-a45e-4813-8b0a-ddaa1aeabbb8.png" width="650">

2. Select **[Play]** for player control, or **[Play against computer]** to compete against the minimax algorithm

<img src="https://user-images.githubusercontent.com/89919950/215422388-2b796048-1475-4a4b-97f1-557124eeb3b1.png" width="650">

3. Click **[Reset board]** to start a new round or **[Change players]** to return to the start screen

## Technologies Used

- TypeScript
- Tailwind CSS
- npm
- Minimax algorithm
