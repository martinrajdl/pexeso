import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Card {
    id: number;
    content: string;
}

type Cards = Card[];
type FlippedCards = number[];
type SolvedCards = number[];

interface CardProps {
    $isFlipped: boolean;
    $isDisabled: boolean;
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  width: 100vw;
`;

const Header = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const GameStats = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const MovesCount = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
`;

const CardContainer = styled.div<CardProps>`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$isDisabled ? 'default' : 'pointer'};
  transform: ${props => props.$isFlipped ? 'rotateY(0)' : 'rotateY(180deg)'};
  transition: transform 0.3s;
  background-color: ${props => props.$isFlipped ? 'white' : '#3b82f6'};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: ${props => props.$isDisabled ? 'none' : props.$isFlipped ? 'rotateY(0) scale(1.05)' : 'rotateY(180deg) scale(1.05)'};
  }
`;

const CardContent = styled.span`
  font-size: 2rem;
`;

const WinMessage = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const WinText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #059669;
`;

const CARDS: string[] = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🦁', '🐸', '🐒', '🦉', '🦄', '🐝', '🐢', '🦋',
    '🐬', '🐠', '🦈', '🐙', '🦜', '🦩', '🦒', '🦘',
    '🦡', '🦦', '🦥', '🦨', '🦌', '🦃', '🦚', '🦢',
    '🦫', '🦏', '🐘', '🦛', '🦭', '🐪', '🐫', '🦒',
    '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏',
    '🐑', '🦙', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
    '🐻', '🐼', '🦁', '🐸', '🐒', '🦉', '🦄', '🐝'
];

const PexesoGame: React.FC = () => {
    const [cards, setCards] = useState<Cards>([]);
    const [flipped, setFlipped] = useState<FlippedCards>([]);
    const [solved, setSolved] = useState<SolvedCards>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [moves, setMoves] = useState<number>(0);

    useEffect(() => {
        const shuffledCards: Cards = [...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, content: card }));
        setCards(shuffledCards);
    }, []);

    const handleClick = (id: number): void => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        const newFlipped: FlippedCards = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisabled(true);
            setMoves(m => m + 1);

            const [first, second] = newFlipped;
            if (cards[first].content === cards[second].content) {
                setSolved([...solved, first, second]);
                setFlipped([]);
                setDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    const resetGame = (): void => {
        const shuffledCards: Cards = [...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, content: card }));
        setCards(shuffledCards);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setDisabled(false);
    };

    return (
        <GameContainer>
            <Header>
                <Title>Pexeso Game</Title>
                <GameStats>
                    <MovesCount>Moves: {moves}</MovesCount>
                    <Button onClick={resetGame}>
                        New Game
                    </Button>
                </GameStats>
            </Header>

            <Grid>
                {cards.map((card: Card) => (
                    <CardContainer
                        key={card.id}
                        onClick={() => handleClick(card.id)}
                        $isFlipped={flipped.includes(card.id) || solved.includes(card.id)}
                        $isDisabled={disabled}
                    >
                        <CardContent>
                            {(flipped.includes(card.id) || solved.includes(card.id)) ? card.content : ''}
                        </CardContent>
                    </CardContainer>
                ))}
            </Grid>

            {solved.length === cards.length && (
                <WinMessage>
                    <WinText>
                        Congratulations! You won in {moves} moves!
                    </WinText>
                </WinMessage>
            )}
        </GameContainer>
    );
};

export default PexesoGame;