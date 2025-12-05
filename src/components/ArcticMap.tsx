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

const ArcticMap = ({ character, onOpenAI }: ArcticMapProps) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeLayers, setActiveLayers] = useState<string[]>(['ice']);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

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

          {/* Map visualization */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <div className="aspect-video bg-gradient-to-b from-primary/5 to-nasa-cyan/5 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="relative z-10 text-center">
                <Icon name="Globe" size={80} className="text-primary/30 mx-auto mb-4 animate-float" />
                <p className="font-mono text-muted-foreground">
                  Карта Арктики • Год: {selectedYear}
                </p>
                <div className="mt-4 flex gap-2 justify-center flex-wrap">
                  {activeLayers.map(layerId => {
                    const layer = dataLayers.find(l => l.id === layerId);
                    return layer ? (
                      <Badge key={layerId} variant="secondary" className={layer.color}>
                        {layer.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
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
