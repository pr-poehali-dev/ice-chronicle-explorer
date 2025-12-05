import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MainMenuProps {
  onStart: () => void;
}

const MainMenu = ({ onStart }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center grid-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-nasa-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in">
        {/* Logo/Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Icon name="Snowflake" size={48} className="text-nasa-cyan animate-pulse-glow" />
            <h1 className="text-6xl font-bold text-primary">
              Ледяной Хроникер
            </h1>
            <Icon name="Snowflake" size={48} className="text-nasa-cyan animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground font-mono">
            Путешествие сквозь время Арктики
          </p>
        </div>

        {/* Mission statement */}
        <div className="mb-12 space-y-4">
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Интерактивный веб-симулятор виртуальной экспедиции по Арктике. 
            Исследуйте, как менялась Арктика за последние 100 лет и какими могут быть последствия наших решений в будущем.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <Icon name="Thermometer" size={32} className="text-nasa-cyan mx-auto mb-2" />
              <p className="text-sm font-mono">Климатология</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <Icon name="Trees" size={32} className="text-nasa-cyan mx-auto mb-2" />
              <p className="text-sm font-mono">Биология</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <Icon name="Cog" size={32} className="text-nasa-cyan mx-auto mb-2" />
              <p className="text-sm font-mono">Инженерия</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <Icon name="BookOpen" size={32} className="text-nasa-cyan mx-auto mb-2" />
              <p className="text-sm font-mono">Журналистика</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={onStart}
          size="lg"
          className="text-xl px-12 py-6 bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        >
          <Icon name="Rocket" size={24} className="mr-2" />
          Начать экспедицию
        </Button>

        {/* Footer info */}
        <div className="mt-12 text-sm text-muted-foreground font-mono">
          <p>Карта Арктики • Временные слои 1925-2050 • Интерактивные миссии • ИИ-наставник</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
