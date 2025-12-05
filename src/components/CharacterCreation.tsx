import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { Role, Character } from '../pages/Index';

interface CharacterCreationProps {
  onComplete: (character: Character) => void;
}

const roles: Array<{
  id: Role;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
}> = [
  {
    id: 'climatologist',
    name: 'Климатолог',
    description: 'Изучение температурных данных, CO₂, метана и климатических прогнозов',
    icon: 'Thermometer',
    color: 'text-orange-500',
    bgGradient: 'from-orange-400/20 to-red-500/20'
  },
  {
    id: 'biologist',
    name: 'Биолог',
    description: 'Исследование популяций животных, миграций и экосистем Арктики',
    icon: 'Trees',
    color: 'text-green-500',
    bgGradient: 'from-green-400/20 to-emerald-500/20'
  },
  {
    id: 'engineer',
    name: 'Инженер',
    description: 'Разработка технологий, энергетики и устойчивых решений',
    icon: 'Cog',
    color: 'text-blue-500',
    bgGradient: 'from-blue-400/20 to-indigo-500/20'
  },
  {
    id: 'journalist',
    name: 'Журналист',
    description: 'Документирование историй, влияния на общество и анализ данных',
    icon: 'BookOpen',
    color: 'text-purple-500',
    bgGradient: 'from-purple-400/20 to-pink-500/20'
  }
];

const avatars = ['🧑‍🔬', '👨‍🔬', '👩‍🔬', '🧑‍💼', '👨‍💼', '👩‍💼'];

const CharacterCreation = ({ onComplete }: CharacterCreationProps) => {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleSubmit = () => {
    if (name && selectedRole) {
      onComplete({
        name,
        role: selectedRole,
        avatar: selectedAvatar
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center grid-pattern px-6 py-12 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-nasa-cyan/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-5xl w-full animate-slide-up">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-primary/20 p-10 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-scale">
            <div className="inline-flex items-center gap-3 mb-4">
              <Icon name="User" size={40} className="text-primary animate-bounce-subtle" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-nasa-cyan bg-clip-text text-transparent">
                Создание персонажа
              </h2>
            </div>
            <p className="text-lg text-muted-foreground font-mono">Кем вы отправитесь в экспедицию?</p>
          </div>

          {/* Name input with animation */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="name" className="text-xl mb-3 block flex items-center gap-2">
              <Icon name="Type" size={20} className="text-primary" />
              Ваше имя
            </Label>
            <div className="relative group">
              <Input
                id="name"
                type="text"
                placeholder="Введите имя исследователя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-mono h-14 border-2 focus:border-primary transition-all duration-300 pl-12"
              />
              <Icon name="Sparkles" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Avatar selection with hover effects */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Label className="text-xl mb-4 block flex items-center gap-2">
              <Icon name="Smile" size={20} className="text-primary" />
              Выберите аватар
            </Label>
            <div className="flex gap-4 justify-center flex-wrap">
              {avatars.map((avatar, index) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-6xl p-5 rounded-2xl border-3 transition-all duration-300 hover:scale-125 shine-effect animate-fade-in-scale ${
                    selectedAvatar === avatar
                      ? 'border-primary bg-gradient-to-br from-primary/20 to-nasa-cyan/20 shadow-xl scale-110'
                      : 'border-border hover:border-primary/50 bg-white hover:shadow-lg'
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <span className={selectedAvatar === avatar ? 'animate-bounce-subtle' : ''}>{avatar}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Role selection with gradients */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Label className="text-xl mb-4 block flex items-center gap-2">
              <Icon name="Briefcase" size={20} className="text-primary" />
              Выберите роль
            </Label>
            <div className="grid md:grid-cols-2 gap-5">
              {roles.map((role, index) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group relative text-left p-6 rounded-2xl border-3 transition-all duration-300 hover:scale-105 card-hover shine-effect animate-fade-in-scale ${
                    selectedRole === role.id
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-nasa-cyan/10 shadow-xl'
                      : 'border-border hover:border-primary/40 bg-white hover:shadow-lg'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.bgGradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br from-primary/10 to-nasa-cyan/10 group-hover:scale-110 transition-transform ${
                      selectedRole === role.id ? 'animate-bounce-subtle' : ''
                    }`}>
                      <Icon name={role.icon as any} size={36} className={role.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{role.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                    </div>
                    {selectedRole === role.id && (
                      <Icon name="CheckCircle2" size={28} className="text-primary animate-fade-in-scale" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit button with glow */}
          <div className="flex justify-center animate-fade-in-scale" style={{ animationDelay: '1s' }}>
            <div className="relative">
              <Button
                onClick={handleSubmit}
                disabled={!name || !selectedRole}
                size="lg"
                className="text-xl px-12 py-7 bg-gradient-to-r from-primary to-nasa-cyan hover:from-primary/90 hover:to-nasa-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl shine-effect group"
              >
                <Icon name="Rocket" size={24} className="mr-3 group-hover:animate-bounce-subtle" />
                Отправиться в Арктику
                <Icon name="ArrowRight" size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              {name && selectedRole && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-nasa-cyan blur-xl opacity-50 animate-pulse -z-10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
