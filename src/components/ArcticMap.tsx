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
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tl from-nasa-cyan/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 relative z-10 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-primary/20 p-5 flex items-center justify-between shadow-xl hover:shadow-2xl transition-all duration-300 card-hover">
          <div className="flex items-center gap-5">
            <div className="text-5xl p-3 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-xl animate-bounce-subtle">{character.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">{character.name}</h2>
              <p className="text-base text-muted-foreground font-mono flex items-center gap-2">
                <Icon name="Star" size={16} className="text-nasa-cyan" />
                {character.role === 'climatologist' && 'Климатолог'}
                {character.role === 'biologist' && 'Биолог'}
                {character.role === 'engineer' && 'Инженер'}
                {character.role === 'journalist' && 'Журналист'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-base px-4 py-2 border-2 border-primary/30 shine-effect">
              <Icon name="Award" size={18} className="mr-2 text-nasa-cyan" />
              {completedMissions.length} / {missions.length} миссий
            </Badge>
            <Button onClick={onOpenAI} className="bg-gradient-to-r from-primary to-nasa-cyan hover:from-primary/90 hover:to-nasa-cyan/90 transition-all hover:scale-105 shine-effect">
              <Icon name="Bot" size={22} className="mr-2" />
              ИИ-Помощник Арктина
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 relative z-10">
        {/* Map and controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="p-7 bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in card-hover">
            <h3 className="font-bold text-xl mb-5 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">Временная шкала</span>
            </h3>
            <div className="flex gap-3">
              {timelineYears.map((year, index) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? 'default' : 'outline'}
                  onClick={() => setSelectedYear(year)}
                  className={`flex-1 font-mono text-base py-6 transition-all duration-300 hover:scale-105 shine-effect animate-fade-in-scale ${
                    selectedYear === year 
                      ? 'bg-gradient-to-r from-primary to-nasa-cyan shadow-lg' 
                      : 'border-2 hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {year}
                </Button>
              ))}
            </div>
          </Card>

          {/* Map visualization with dynamic chart */}
          <Card className="p-7 bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in card-hover" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-xl mb-5 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-lg">
                <Icon name="BarChart3" size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">Данные за {selectedYear} год</span>
            </h3>
            <div className="bg-gradient-to-br from-accent/50 via-white to-accent/30 p-7 rounded-2xl border-2 border-primary/10">
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { icon: 'Snowflake', value: currentData.ice, label: 'млн км² льда', color: 'blue', gradient: 'from-blue-400 to-blue-600' },
                  { icon: 'Thermometer', value: `${currentData.temp > 0 ? '+' : ''}${currentData.temp}°C`, label: 'температура', color: 'orange', gradient: 'from-orange-400 to-red-500' },
                  { icon: 'PawPrint', value: `${(currentData.bears / 1000).toFixed(1)}k`, label: 'медведей', color: 'green', gradient: 'from-green-400 to-emerald-600' },
                  { icon: 'CloudRain', value: currentData.co2, label: 'ppm CO₂', color: 'purple', gradient: 'from-purple-400 to-pink-500' }
                ].map((item, i) => (
                  <div key={i} className="group text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 card-hover animate-fade-in-scale" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} mb-3 inline-block group-hover:animate-bounce-subtle`}>
                      <Icon name={item.icon as any} size={28} className="text-white" />
                    </div>
                    <div className={`text-3xl font-bold font-mono text-${item.color}-500 mb-1`}>{item.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-around h-56 gap-4 bg-white/50 rounded-xl p-4">
                {[
                  { id: 'ice', value: currentData.ice, max: 16.5, label: 'Лёд', gradient: 'from-blue-400 to-blue-600' },
                  { id: 'temperature', value: Math.abs(currentData.temp), max: 3.5, label: 'Темп.', gradient: 'from-orange-400 to-red-500', display: `${currentData.temp}°C` },
                  { id: 'animals', value: currentData.bears, max: 35000, label: 'Медведи', gradient: 'from-green-400 to-emerald-600', display: `${(currentData.bears / 1000).toFixed(0)}k` },
                  { id: 'co2', value: currentData.co2 - 300, max: 220, label: 'CO₂', gradient: 'from-purple-400 to-pink-500', display: currentData.co2 }
                ].filter(item => activeLayers.includes(item.id)).map((item, i) => (
                  <div key={item.id} className="flex-1 flex flex-col items-center gap-3 group animate-slide-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                    <div className="text-sm font-mono font-bold text-primary bg-white px-3 py-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
                      {item.display || item.value}
                    </div>
                    <div className="relative w-full">
                      <div 
                        className={`w-full rounded-t-xl bg-gradient-to-t ${item.gradient} transition-all duration-700 shadow-lg hover:shadow-2xl relative overflow-hidden`}
                        style={{ height: `${(item.value / item.max) * 100}%`, minHeight: '20px' }}
                      >
                        <div className="absolute inset-0 bg-white/20 shimmer" />
                      </div>
                    </div>
                    <div className="text-sm font-mono text-muted-foreground font-semibold">{item.label}</div>
                  </div>
                ))}
                {activeLayers.length === 0 && (
                  <div className="flex-1 text-center text-muted-foreground py-20">
                    <Icon name="Layers" size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-mono">Выберите слои данных ниже</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Data layers */}
          <Card className="p-7 bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in card-hover" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-xl mb-5 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-lg">
                <Icon name="Layers" size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">Слои данных</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {dataLayers.map((layer, index) => (
                <Button
                  key={layer.id}
                  variant={activeLayers.includes(layer.id) ? 'default' : 'outline'}
                  onClick={() => toggleLayer(layer.id)}
                  className={`justify-start h-14 text-base transition-all duration-300 hover:scale-105 shine-effect animate-fade-in-scale ${
                    activeLayers.includes(layer.id)
                      ? 'bg-gradient-to-r from-primary to-nasa-cyan shadow-lg'
                      : 'border-2 hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <Icon name={layer.icon as any} size={22} className="mr-3" />
                  {layer.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Missions panel */}
        <div className="space-y-6">
          <Card className="p-7 bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in card-hover" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-xl mb-5 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-lg animate-bounce-subtle">
                <Icon name="Target" size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">Ваши миссии</span>
            </h3>
            <div className="space-y-4">
              {missions.map((mission, index) => {
                const isCompleted = completedMissions.includes(mission.id);
                return (
                  <button
                    key={mission.id}
                    onClick={() => !isCompleted && setSelectedMission(mission)}
                    className={`group w-full text-left p-5 rounded-xl border-2 transition-all duration-300 card-hover shine-effect animate-fade-in-scale relative overflow-hidden ${
                      isCompleted
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md'
                        : 'border-primary/30 hover:border-primary bg-white hover:shadow-xl hover:scale-105'
                    }`}
                    disabled={isCompleted}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    {!isCompleted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-nasa-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="p-2 bg-green-500 rounded-full animate-fade-in-scale">
                            <Icon name="CheckCircle2" size={28} className="text-white" />
                          </div>
                        ) : (
                          <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all">
                            <Icon name="Play" size={24} className="text-primary group-hover:text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Info panel */}
          <Card className="p-7 bg-gradient-to-br from-white/95 to-accent/30 backdrop-blur-xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in card-hover" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-nasa-cyan/10 rounded-lg">
                <Icon name="Info" size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">О проекте</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Интерактивный симулятор исследования Арктики с анализом климатических изменений за 100 лет.
            </p>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="MapPin" size={16} className="text-nasa-cyan" />
                <span className="text-muted-foreground">Карта Арктики</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="TrendingUp" size={16} className="text-nasa-cyan" />
                <span className="text-muted-foreground">Динамика 1925-2050</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Award" size={16} className="text-nasa-cyan" />
                <span className="text-muted-foreground">{missions.length} уникальных миссий</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-nasa-cyan hover:from-primary/90 hover:to-nasa-cyan/90 transition-all hover:scale-105 shine-effect">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Подробнее о проекте
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArcticMap;