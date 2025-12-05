import { useState, useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import CharacterCreation from '../components/CharacterCreation';
import ArcticMap from '../components/ArcticMap';
import AIAssistant from '../components/AIAssistant';

export type Role = 'climatologist' | 'biologist' | 'engineer' | 'journalist';

export interface Character {
  name: string;
  role: Role;
  avatar: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  role: Role;
  completed: boolean;
}

const Index = () => {
  const [screen, setScreen] = useState<'menu' | 'character' | 'map' | 'ai'>('menu');
  const [character, setCharacter] = useState<Character | null>(null);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    document.title = 'Ледяной Хроникер: Путешествие сквозь время Арктики';
  }, []);

  const handleStartExpedition = () => {
    setScreen('character');
  };

  const handleCharacterCreated = (char: Character) => {
    setCharacter(char);
    setScreen('map');
  };

  const handleOpenAI = () => {
    setShowAI(true);
    setScreen('ai');
  };

  const handleCloseAI = () => {
    setShowAI(false);
    setScreen('map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nasa-ice to-white">
      {screen === 'menu' && (
        <MainMenu onStart={handleStartExpedition} />
      )}
      
      {screen === 'character' && (
        <CharacterCreation onComplete={handleCharacterCreated} />
      )}
      
      {screen === 'map' && character && (
        <ArcticMap 
          character={character} 
          onOpenAI={handleOpenAI}
        />
      )}
      
      {screen === 'ai' && character && (
        <AIAssistant 
          character={character}
          onClose={handleCloseAI}
        />
      )}
    </div>
  );
};

export default Index;
