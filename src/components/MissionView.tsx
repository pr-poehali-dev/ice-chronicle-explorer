import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import type { Character, Mission } from '../pages/Index';

interface MissionViewProps {
  mission: Mission;
  character: Character;
  onComplete: () => void;
  onBack: () => void;
}

interface DataPoint {
  year: number;
  value: number;
  label: string;
}

const missionData: Record<string, { 
  data: DataPoint[];
  question: string;
  answer: number;
  unit: string;
  chartType: 'line' | 'bar';
}> = {
  'ice-melt': {
    data: [
      { year: 2000, value: 15.2, label: '2000' },
      { year: 2005, value: 14.1, label: '2005' },
      { year: 2010, value: 12.8, label: '2010' },
      { year: 2015, value: 11.3, label: '2015' },
      { year: 2020, value: 9.8, label: '2020' },
      { year: 2025, value: 8.2, label: '2025' }
    ],
    question: 'На сколько млн км² сократилась площадь морского льда с 2000 по 2025?',
    answer: 7.0,
    unit: 'млн км²',
    chartType: 'line'
  },
  'co2-analysis': {
    data: [
      { year: 1800, value: 280, label: '1800' },
      { year: 1900, value: 295, label: '1900' },
      { year: 1950, value: 310, label: '1950' },
      { year: 1980, value: 338, label: '1980' },
      { year: 2000, value: 369, label: '2000' },
      { year: 2025, value: 420, label: '2025' }
    ],
    question: 'На сколько ppm увеличился уровень CO₂ с 1800 по 2025?',
    answer: 140,
    unit: 'ppm',
    chartType: 'line'
  },
  'bear-migration': {
    data: [
      { year: 2000, value: 26000, label: '2000' },
      { year: 2005, value: 24500, label: '2005' },
      { year: 2010, value: 22800, label: '2010' },
      { year: 2015, value: 21200, label: '2015' },
      { year: 2020, value: 19500, label: '2020' },
      { year: 2025, value: 17800, label: '2025' }
    ],
    question: 'На сколько тысяч особей сократилась популяция белых медведей с 2000 по 2025?',
    answer: 8.2,
    unit: 'тыс. особей',
    chartType: 'bar'
  },
  'ecosystem': {
    data: [
      { year: 2000, value: 225, label: '2000' },
      { year: 2005, value: 218, label: '2005' },
      { year: 2010, value: 205, label: '2010' },
      { year: 2015, value: 192, label: '2015' },
      { year: 2020, value: 178, label: '2020' },
      { year: 2025, value: 165, label: '2025' }
    ],
    question: 'На сколько тысяч особей сократилась популяция моржей с 2000 по 2025?',
    answer: 60,
    unit: 'тыс. особей',
    chartType: 'bar'
  },
  'eco-station': {
    data: [
      { year: 2025, value: 85, label: 'Ветер' },
      { year: 2025, value: 45, label: 'Солнце' },
      { year: 2025, value: 92, label: 'Водород' },
      { year: 2025, value: 30, label: 'Дизель' }
    ],
    question: 'Какой источник энергии имеет наивысший рейтинг устойчивости?',
    answer: 92,
    unit: '%',
    chartType: 'bar'
  },
  'renewable': {
    data: [
      { year: 2025, value: 150, label: 'Ветер' },
      { year: 2025, value: 80, label: 'Солнце' },
      { year: 2025, value: 50, label: 'Водород' },
      { year: 2025, value: 5, label: 'Дизель' }
    ],
    question: 'Какая технология производит больше всего энергии (кВт/ч)?',
    answer: 150,
    unit: 'кВт/ч',
    chartType: 'bar'
  },
  'stories': {
    data: [
      { year: 1950, value: 95, label: '1950' },
      { year: 1975, value: 88, label: '1975' },
      { year: 2000, value: 76, label: '2000' },
      { year: 2025, value: 62, label: '2025' }
    ],
    question: 'На сколько процентов сократилось традиционное промысловое хозяйство с 1950 по 2025?',
    answer: 33,
    unit: '%',
    chartType: 'line'
  },
  'data-story': {
    data: [
      { year: 2000, value: 12, label: '2000' },
      { year: 2005, value: 15, label: '2005' },
      { year: 2010, value: 22, label: '2010' },
      { year: 2015, value: 31, label: '2015' },
      { year: 2020, value: 45, label: '2020' },
      { year: 2025, value: 58, label: '2025' }
    ],
    question: 'Во сколько раз увеличилось число климатических беженцев с 2000 по 2025?',
    answer: 4.8,
    unit: 'раз',
    chartType: 'bar'
  }
};

const MissionView = ({ mission, character, onComplete, onBack }: MissionViewProps) => {
  const [step, setStep] = useState<'intro' | 'analyze' | 'quiz' | 'result'>('intro');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const data = missionData[mission.id];
  const maxValue = Math.max(...data.data.map(d => d.value));

  // Play sound effect
  const playSound = (type: 'success' | 'error') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'success') {
      // Success: ascending notes
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    } else {
      // Error: descending notes
      oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
      oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime + 0.15); // E4
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleSubmit = () => {
    const numAnswer = parseFloat(userAnswer);
    // More flexible tolerance for different answer ranges
    let tolerance = 0.15; // 15% default
    
    // Special cases for specific missions
    if (mission.id === 'bear-migration' || mission.id === 'ecosystem') {
      tolerance = 0.2; // 20% for population counts (they have decimals in thousands)
    }
    if (mission.id === 'data-story') {
      tolerance = 0.25; // 25% for ratio calculations
    }
    
    const correct = Math.abs(numAnswer - data.answer) <= data.answer * tolerance;
    setIsCorrect(correct);
    playSound(correct ? 'success' : 'error');
    setStep('result');
  };

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к карте
          </Button>
          <Card className="p-6 bg-white/90 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mission.title}</h1>
                <p className="text-muted-foreground">{mission.description}</p>
              </div>
              <div className="text-4xl">{character.avatar}</div>
            </div>
            <Progress value={(step === 'intro' ? 25 : step === 'analyze' ? 50 : step === 'quiz' ? 75 : 100)} className="mt-4" />
          </Card>
        </div>

        {/* Content */}
        {step === 'intro' && (
          <Card className="p-8 bg-white/90 backdrop-blur animate-fade-in">
            <div className="text-center space-y-6">
              <Icon name="Target" size={64} className="text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Начинаем миссию!</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Вы будете анализировать данные, отвечать на вопросы и делать выводы на основе научных фактов.
              </p>
              <Button size="lg" onClick={() => setStep('analyze')}>
                <Icon name="Play" size={20} className="mr-2" />
                Начать анализ
              </Button>
            </div>
          </Card>
        )}

        {step === 'analyze' && (
          <Card className="p-8 bg-white/90 backdrop-blur animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Анализ данных</h2>
            
            {/* Chart visualization */}
            <div className="mb-8">
              <div className="bg-gradient-to-b from-accent to-white p-6 rounded-lg border border-primary/20">
                <div className="flex items-end justify-around h-64 gap-2">
                  {data.data.map((point, index) => {
                    const heightPercent = (point.value / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs font-mono font-bold text-primary">
                          {point.value.toFixed(1)}
                        </div>
                        <div 
                          className={`w-full rounded-t transition-all duration-500 ${
                            data.chartType === 'line' ? 'bg-nasa-cyan' : 'bg-primary'
                          }`}
                          style={{ 
                            height: `${heightPercent}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                        <div className="text-xs font-mono text-muted-foreground">
                          {point.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                <Icon name="Lightbulb" size={24} className="text-nasa-cyan flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Что показывают данные?</h3>
                  <p className="text-sm text-muted-foreground">
                    Изучите график и обратите внимание на тренд изменений за представленный период.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" onClick={() => setStep('quiz')} className="w-full">
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Перейти к вопросу
            </Button>
          </Card>
        )}

        {step === 'quiz' && (
          <Card className="p-8 bg-white/90 backdrop-blur animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Вопрос</h2>
            <div className="space-y-6">
              <div className="p-6 bg-accent/30 rounded-lg">
                <p className="text-lg font-medium">{data.question}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Ваш ответ:</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="flex-1 px-4 py-3 border border-input rounded-md font-mono text-lg"
                    placeholder="Введите число"
                  />
                  <div className="flex items-center px-4 py-3 bg-muted rounded-md font-mono">
                    {data.unit}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="flex-1"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить ответ
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Подсказка: используйте данные из графика выше
              </p>
            </div>
          </Card>
        )}

        {step === 'result' && (
          <Card className="p-8 bg-white/90 backdrop-blur animate-fade-in">
            <div className="text-center space-y-6">
              {isCorrect ? (
                <>
                  <Icon name="CheckCircle" size={64} className="text-green-500 mx-auto" />
                  <h2 className="text-2xl font-bold text-green-600">Отлично! Правильный ответ!</h2>
                  <p className="text-lg text-muted-foreground">
                    Ваш ответ: <span className="font-mono font-bold">{userAnswer} {data.unit}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Точный ответ: <span className="font-mono font-bold">{data.answer} {data.unit}</span>
                  </p>
                </>
              ) : (
                <>
                  <Icon name="XCircle" size={64} className="text-orange-500 mx-auto" />
                  <h2 className="text-2xl font-bold text-orange-600">Почти правильно!</h2>
                  <p className="text-lg text-muted-foreground">
                    Ваш ответ: <span className="font-mono font-bold">{userAnswer} {data.unit}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Правильный ответ: <span className="font-mono font-bold">{data.answer} {data.unit}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Попробуйте пересчитать, анализируя график более внимательно!
                  </p>
                </>
              )}
              
              <div className="flex gap-3 justify-center">
                {!isCorrect && (
                  <Button variant="outline" onClick={() => setStep('analyze')}>
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Попробовать снова
                  </Button>
                )}
                <Button size="lg" onClick={onComplete}>
                  <Icon name="Trophy" size={20} className="mr-2" />
                  Завершить миссию
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MissionView;