import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import type { Character } from '../pages/Index';

interface AIAssistantProps {
  character: Character;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const knowledgeBase: Record<string, string> = {
  'лёд': 'Морской лёд Арктики сокращается со скоростью около 13% за десятилетие. С 1979 года площадь сентябрьского минимума льда уменьшилась примерно на 40%.',
  'льды': 'Морской лёд Арктики сокращается со скоростью около 13% за десятилетие. С 1979 года площадь сентябрьского минимума льда уменьшилась примерно на 40%.',
  'температура': 'Арктика нагревается в 2-3 раза быстрее, чем остальная планета. Средняя температура в регионе выросла на 3-4°C с 1980-х годов.',
  'медведи': 'Популяция белых медведей оценивается в 22,000-31,000 особей. Таяние льда сокращает их охотничьи угодья и угрожает выживанию вида.',
  'медвед': 'Популяция белых медведей оценивается в 22,000-31,000 особей. Таяние льда сокращает их охотничьи угодья и угрожает выживанию вида.',
  'co2': 'Уровень CO₂ в атмосфере достиг 420 ppm в 2023 году, что на 50% выше доиндустриальных значений (280 ppm). Это главный фактор глобального потепления.',
  'углекислый газ': 'Уровень CO₂ в атмосфере достиг 420 ppm в 2023 году, что на 50% выше доиндустриальных значений (280 ppm).',
  'метан': 'Концентрация метана в атмосфере составляет около 1900 ppb. Таяние вечной мерзлоты в Арктике высвобождает большие объёмы метана.',
  'моржи': 'Популяция моржей сокращается из-за потери ледяных платформ, которые они используют для отдыха между погружениями за пищей.',
  'морж': 'Популяция моржей сокращается из-за потери ледяных платформ, которые они используют для отдыха между погружениями за пищей.',
  'тюлени': 'Кольчатые тюлени — основная добыча белых медведей. Они используют морской лёд для размножения и отдыха.',
  'энергия': 'Для устойчивого развития Арктики используются ветровая, солнечная энергия и водородные технологии. Они снижают углеродный след на 70-90%.',
  'станция': 'Современные арктические станции используют возобновляемые источники энергии, модульную конструкцию и системы очистки воды для минимизации воздействия на экосистему.',
  'коренные народы': 'Коренные народы Арктики (инуиты, саамы, ненцы и др.) веками живут в гармонии с природой. Изменение климата угрожает их традиционному образу жизни.',
  'инуиты': 'Инуиты населяют арктические регионы Канады, Гренландии и Аляски. Их традиционная охота и рыболовство зависят от морского льда.',
  'прогноз': 'По прогнозам IPCC, к 2050 году Арктика может остаться без летнего морского льда, что окажет катастрофическое влияние на экосистему.',
  'будущее': 'Будущее Арктики зависит от наших действий сегодня. Сокращение выбросов CO₂ и переход на зелёную энергию критически важны.',
  'помощь': 'Я Арктина, ваш ИИ-помощник! Могу ответить на вопросы о климате, животных, энергетике и коренных народах Арктики. Спрашивайте!',
};

const AIAssistant = ({ character, onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: `Приветствую, ${character.name}! Я Арктина 🤖 — ваш виртуальный наставник по Арктике. Могу ответить на вопросы о климате, экосистемах, технологиях и жизни в Арктике. Чем могу помочь?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [keyword, answer] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }
    
    return 'Интересный вопрос! Я специализируюсь на данных об Арктике: климате, животных, энергии и коренных народах. Попробуйте спросить о льдах, температуре, медведях, CO₂, метане, моржах, тюленях, энергии или коренных народах Арктики.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    'Почему тают льды?',
    'Как живут белые медведи?',
    'Что такое CO₂?',
    'Какая энергия лучше для Арктики?'
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tl from-cyan-300/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <Button onClick={onClose} className="mb-4 bg-white/90 hover:bg-white text-primary border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к карте
          </Button>
          <Card className="p-7 bg-gradient-to-r from-primary via-purple-600 to-nasa-cyan text-white shadow-2xl border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 shimmer" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-xl animate-bounce-subtle">
                  <Icon name="Bot" size={40} className="animate-pulse-glow" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">Арктина</h1>
                  <p className="text-white/90 font-mono text-lg">ИИ-наставник по Арктике</p>
                </div>
              </div>
              <div className="text-6xl animate-float">{character.avatar}</div>
            </div>
          </Card>
        </div>

        {/* Chat area */}
        <Card className="bg-white/95 backdrop-blur-xl flex flex-col border-2 border-primary/20 shadow-2xl animate-fade-in" style={{ height: 'calc(100vh - 280px)', animationDelay: '0.1s' }}>
          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'ai' 
                      ? 'bg-primary text-white' 
                      : 'bg-nasa-cyan text-white'
                  }`}>
                    {message.type === 'ai' ? (
                      <Icon name="Bot" size={20} />
                    ) : (
                      <span className="text-xl">{character.avatar}</span>
                    )}
                  </div>
                  <div className={`flex-1 max-w-2xl ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-4 rounded-lg ${
                      message.type === 'ai'
                        ? 'bg-accent text-foreground'
                        : 'bg-primary text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    <Icon name="Bot" size={20} />
                  </div>
                  <div className="bg-accent p-4 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground mb-2 font-mono">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => handleSend(), 100);
                    }}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Задайте вопрос о Арктике..."
                className="flex-1 px-4 py-3 border border-input rounded-md font-mono"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="lg"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-mono text-center">
              Арктина знает о климате, животных, энергии и народах Арктики
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;