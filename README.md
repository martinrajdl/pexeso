# Pexeso Game

Pexeso is a memory game where the objective is to find all matching pairs of cards. This project is a web-based implementation of the Pexeso game using React and styled-components.

## Features

- **8x8 Grid**: The game board consists of a grid with 64 cards (32 pairs).
- **Card Flipping**: Click on a card to flip it and reveal its content.
- **Matching Pairs**: Find and match pairs of cards with the same content.
- **Move Counter**: Track the number of moves made during the game.
- **High Score**: The game stores the best score (minimum moves) in the browser's local storage.
- **New Game**: Reset the game to start a new round with shuffled cards.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Styled-components**: A library for styling React components using tagged template literals.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pexeso.git
   cd pexeso
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Game

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to play the game.

## How to Play

1. Click on a card to flip it and reveal its content.
2. Click on another card to try to find a matching pair.
3. If the cards match, they will remain flipped. If not, they will flip back after a short delay.
4. Continue flipping cards to find all matching pairs.
5. The game ends when all pairs are found. Your score (number of moves) will be displayed.
6. Click the "New Game" button to start a new round with shuffled cards.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to improve the game.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Emoji icons used in the game are provided by [Twemoji](https://twemoji.twitter.com/).

Enjoy playing Pexeso!
