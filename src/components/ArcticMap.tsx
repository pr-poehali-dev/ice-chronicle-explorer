import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Character, Mission, Role } from '../pages/Index';
import MissionView from './MissionView';

interface ArcticMapProps {
  character: Character;
  onOpenAI: () => void;
}

const timelineYears = [1925, 1950, 1975, 2000, 2025, 2050];

const dataLayers = [
  { id: 'ice', name: 'Морской лёд', icon: 'Snowflake', color: 'text-blue-400' },
  { id: 'temperature', name: 'Температура', icon: 'Thermometer', color: 'text-orange-500' },
  { id: 'animals', name: 'Животные', icon: 'PawPrint', color: 'text-green-500' },
  { id: 'co2', name: 'CO₂ и метан', icon: 'CloudRain', color: 'text-purple-500' },
];

const missionsByRole: Record<Role, Mission[]> = {
  climatologist: [
    {
      id: 'ice-melt',
      title: '❄️ Таяние льдов',
      description: 'Анализ скорости таяния морского льда с 2000 по 2025 год',
      role: 'climatologist',
      completed: false
    },
    {
      id: 'co2-analysis',
      title: '🌐 Сигнал из прошлого',
      description: 'Расшифровка данных CO₂ из ледяных кернов',
      role: 'climatologist',
      completed: false
    }
  ],
  biologist: [
    {
      id: 'bear-migration',
      title: '🐻 Медвежий след',
      description: 'Исследование путей миграции белых медведей',
      role: 'biologist',
      completed: false
    },
    {
      id: 'ecosystem',
      title: '🦭 Экосистема в опасности',
      description: 'Анализ пищевых цепей и популяций моржей',
      role: 'biologist',
      completed: false
    }
  ],
  engineer: [
    {
      id: 'eco-station',
      title: '⚡ Станция будущего',
      description: 'Проектирование экологичной арктической станции',
      role: 'engineer',
      completed: false
    },
    {
      id: 'renewable',
      title: '🔋 Зелёная энергия',
      description: 'Выбор оптимальных источников возобновляемой энергии',
      role: 'engineer',
      completed: false
    }
  ],
  journalist: [
    {
      id: 'stories',
      title: '📰 Голоса Севера',
      description: 'Сбор историй коренных народов Арктики',
      role: 'journalist',
      completed: false
    },
    {
      id: 'data-story',
      title: '📊 История в данных',
      description: 'Визуализация влияния климата на общество',
      role: 'journalist',
      completed: false
    }
  ]
};

// Data by year for dynamic charts
const dataByYear: Record<number, { ice: number; temp: number; bears: number; co2: number }> = {
  1925: { ice: 16.5, temp: -2.0, bears: 35000, co2: 305 },
  1950: { ice: 16.2, temp: -1.5, bears: 32000, co2: 310 },
  1975: { ice: 15.8, temp: -1.2, bears: 28000, co2: 330 },
  2000: { ice: 15.2, temp: -0.5, bears: 26000, co2: 369 },
  2025: { ice: 8.2, temp: 1.5, bears: 17800, co2: 420 },
  2050: { ice: 3.1, temp: 3.5, bears: 8000, co2: 520 }
};

const ArcticMap = ({ character, onOpenAI }: ArcticMapProps) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeLayers, setActiveLayers] = useState<string[]>(['ice']);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const currentData = dataByYear[selectedYear];

  const missions = missionsByRole[character.role];

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const handleMissionComplete = (missionId: string) => {
    setCompletedMissions(prev => [...prev, missionId]);
    setSelectedMission(null);
  };

  if (selectedMission) {
    return (
      <MissionView
        mission={selectedMission}
        character={character}
        onComplete={() => handleMissionComplete(selectedMission.id)}
        onBack={() => setSelectedMission(null)}
      />
    );
  }

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white/90 backdrop-blur rounded-lg border border-primary/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{character.avatar}</div>
            <div>
              <h2 className="text-xl font-bold">{character.name}</h2>
              <p className="text-sm text-muted-foreground font-mono">
                {character.role === 'climatologist' && 'Климатолог'}
                {character.role === 'biologist' && 'Биолог'}
                {character.role === 'engineer' && 'Инженер'}
                {character.role === 'journalist' && 'Журналист'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              <Icon name="Award" size={16} className="mr-1" />
              {completedMissions.length} / {missions.length} миссий
            </Badge>
            <Button onClick={onOpenAI} variant="outline">
              <Icon name="Bot" size={20} className="mr-2" />
              ИИ-Помощник Арктина
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Map and controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="Calendar" size={20} />
              Временная шкала
            </h3>
            <div className="flex gap-2">
              {timelineYears.map(year => (
                <Button
                  key={year}
                  variant={selectedYear === year ? 'default' : 'outline'}
                  onClick={() => setSelectedYear(year)}
                  className="flex-1 font-mono"
                >
                  {year}
                </Button>
              ))}
            </div>
          </Card>

          {/* Map visualization with dynamic chart */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Данные за {selectedYear} год
            </h3>
            <div className="bg-gradient-to-b from-accent to-white p-6 rounded-lg border border-primary/20">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Icon name="Snowflake" size={24} className="text-blue-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold font-mono text-blue-500">{currentData.ice}</div>
                  <div className="text-xs text-muted-foreground">млн км² льда</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Icon name="Thermometer" size={24} className="text-orange-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold font-mono text-orange-500">{currentData.temp > 0 ? '+' : ''}{currentData.temp}°C</div>
                  <div className="text-xs text-muted-foreground">температура</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Icon name="PawPrint" size={24} className="text-green-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold font-mono text-green-500">{(currentData.bears / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-muted-foreground">медведей</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <Icon name="CloudRain" size={24} className="text-purple-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold font-mono text-purple-500">{currentData.co2}</div>
                  <div className="text-xs text-muted-foreground">ppm CO₂</div>
                </div>
              </div>
              <div className="flex items-end justify-around h-48 gap-3">
                {activeLayers.includes('ice') && (
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-mono font-bold text-blue-500">{currentData.ice}</div>
                    <div 
                      className="w-full rounded-t bg-blue-500 transition-all duration-500"
                      style={{ height: `${(currentData.ice / 16.5) * 100}%` }}
                    />
                    <div className="text-xs font-mono text-muted-foreground">Лёд</div>
                  </div>
                )}
                {activeLayers.includes('temperature') && (
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-mono font-bold text-orange-500">{currentData.temp}°C</div>
                    <div 
                      className="w-full rounded-t bg-orange-500 transition-all duration-500"
                      style={{ height: `${Math.abs(currentData.temp / 3.5) * 100}%` }}
                    />
                    <div className="text-xs font-mono text-muted-foreground">Темп.</div>
                  </div>
                )}
                {activeLayers.includes('animals') && (
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-mono font-bold text-green-500">{(currentData.bears / 1000).toFixed(0)}k</div>
                    <div 
                      className="w-full rounded-t bg-green-500 transition-all duration-500"
                      style={{ height: `${(currentData.bears / 35000) * 100}%` }}
                    />
                    <div className="text-xs font-mono text-muted-foreground">Медведи</div>
                  </div>
                )}
                {activeLayers.includes('co2') && (
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-mono font-bold text-purple-500">{currentData.co2}</div>
                    <div 
                      className="w-full rounded-t bg-purple-500 transition-all duration-500"
                      style={{ height: `${((currentData.co2 - 300) / 220) * 100}%` }}
                    />
                    <div className="text-xs font-mono text-muted-foreground">CO₂</div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Data layers */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="Layers" size={20} />
              Слои данных
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {dataLayers.map(layer => (
                <Button
                  key={layer.id}
                  variant={activeLayers.includes(layer.id) ? 'default' : 'outline'}
                  onClick={() => toggleLayer(layer.id)}
                  className="justify-start"
                >
                  <Icon name={layer.icon as any} size={18} className="mr-2" />
                  {layer.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Missions panel */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="Target" size={20} />
              Ваши миссии
            </h3>
            <div className="space-y-3">
              {missions.map(mission => {
                const isCompleted = completedMissions.includes(mission.id);
                return (
                  <button
                    key={mission.id}
                    onClick={() => !isCompleted && setSelectedMission(mission)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:scale-102 ${
                      isCompleted
                        ? 'border-green-500 bg-green-50'
                        : 'border-primary/30 hover:border-primary bg-white hover:shadow-md'
                    }`}
                    disabled={isCompleted}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold mb-1">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      {isCompleted ? (
                        <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <Icon name="ArrowRight" size={20} className="text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Info panel */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="Info" size={20} />
              О проекте
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Интерактивный симулятор исследования Арктики с анализом климатических изменений за 100 лет.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Подробнее о проекте
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArcticMap;