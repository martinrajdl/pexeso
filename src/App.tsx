import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react'; // Add this import
import { useLocalStorage } from '@uidotdev/usehooks';

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

const GameContainer = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  width: 100vw;
  background-color: ${props => props.darkMode ? '#1f2937' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#1f2937'};
`;

const Header = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1<{ darkMode: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.darkMode ? 'white' : '#1f2937'}; // Update this line
  margin-bottom: 0.5rem;
  display: flex; 
  align-items: center ;
`;

const GameStats = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const MovesCount = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
`;

const HighScore = styled.p`
  font-size: 1.125rem;
  color: #10b981;
`;

const Button = styled.button<{ darkMode?: boolean }>`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.darkMode ? '#2563eb' : '#3b82f6'};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.darkMode ? '#1d4ed8' : '#2563eb'};
  }
`;

const IconButton = styled.button<{ darkMode: boolean }>` // Update this styled component
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.darkMode ? 'white' : '#1f2937'};
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: ${props => props.$isFlipped ? 'white' : '#3b82f6'};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
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

const AvailableImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
  max-width: 520px;
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CARDS: string[] = [
    '🐶', '🐱', '🐘', '🐰', '🦊', '🦦',
    '🐻', '🐼', '🦁', '🐸', '🐒', '🦉',
    '🦄', '🐝', '🐢', '🦋', '🐬', '🐠'
];

const PexesoGame: React.FC = () => {
    const [cards, setCards] = useState<Cards>([]);
    const [flipped, setFlipped] = useState<FlippedCards>([]);
    const [solved, setSolved] = useState<SolvedCards>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [moves, setMoves] = useState<number>(0);
    const [highScore, setHighScore] = useLocalStorage<number | null>("highScore", null);

    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const shuffledCards: Cards = [...CARDS, ...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, content: card }));
        setCards(shuffledCards);

    }, []);

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            if (highScore === null || moves < highScore) {
                setHighScore(moves);
            }
        }
    }, [solved, cards, moves, highScore, setHighScore]);

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
        } else if (newFlipped.length > 2) {
            setFlipped([id]);
        }
    };

    const resetGame = (): void => {
        const shuffledCards: Cards = [...CARDS, ...CARDS]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, content: card }));
        setCards(shuffledCards);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setDisabled(false);
    };

    const toggleDarkMode = (): void => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <GameContainer darkMode={darkMode}>
            <Header>
                <Title darkMode={darkMode}>
                    Pexeso Game
                    <IconButton onClick={toggleDarkMode} darkMode={darkMode}>
                        {darkMode ? <Sun /> : <Moon />}
                    </IconButton>
                </Title> {/* Pass darkMode prop */}

                <AvailableImages>
                    {CARDS.map((image, index) => (
                        <ImageContainer key={index}>
                            {image}
                        </ImageContainer>
                    ))}
                </AvailableImages>
                <GameStats>
                    <MovesCount>Moves: {moves}</MovesCount>
                    {highScore !== null && <HighScore>High Score: {highScore}</HighScore>}
                    <Button onClick={resetGame} darkMode={darkMode}>
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