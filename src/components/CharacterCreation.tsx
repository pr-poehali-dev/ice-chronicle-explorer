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
}> = [
  {
    id: 'climatologist',
    name: 'Климатолог',
    description: 'Изучение температурных данных, CO₂, метана и климатических прогнозов',
    icon: 'Thermometer',
    color: 'text-orange-500'
  },
  {
    id: 'biologist',
    name: 'Биолог',
    description: 'Исследование популяций животных, миграций и экосистем Арктики',
    icon: 'Trees',
    color: 'text-green-500'
  },
  {
    id: 'engineer',
    name: 'Инженер',
    description: 'Разработка технологий, энергетики и устойчивых решений',
    icon: 'Cog',
    color: 'text-blue-500'
  },
  {
    id: 'journalist',
    name: 'Журналист',
    description: 'Документирование историй, влияния на общество и анализ данных',
    icon: 'BookOpen',
    color: 'text-purple-500'
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
    <div className="min-h-screen flex items-center justify-center grid-pattern px-6 py-12 animate-fade-in">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur rounded-lg border-2 border-primary/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-2">Создание персонажа</h2>
          <p className="text-muted-foreground font-mono">Кем вы отправитесь в экспедицию?</p>
        </div>

        {/* Name input */}
        <div className="mb-8">
          <Label htmlFor="name" className="text-lg mb-2 block">Ваше имя</Label>
          <Input
            id="name"
            type="text"
            placeholder="Введите имя исследователя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg font-mono"
          />
        </div>

        {/* Avatar selection */}
        <div className="mb-8">
          <Label className="text-lg mb-3 block">Выберите аватар</Label>
          <div className="flex gap-3 justify-center flex-wrap">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`text-5xl p-4 rounded-lg border-2 transition-all hover:scale-110 ${
                  selectedAvatar === avatar
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Role selection */}
        <div className="mb-8">
          <Label className="text-lg mb-3 block">Выберите роль</Label>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`text-left p-5 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 bg-white'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <Icon name={role.icon as any} size={28} className={role.color} />
                  <div>
                    <h3 className="font-bold text-lg">{role.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!name || !selectedRole}
            size="lg"
            className="text-lg px-10 hover:scale-105 transition-all"
          >
            <Icon name="ArrowRight" size={20} className="mr-2" />
            Отправиться в Арктику
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
