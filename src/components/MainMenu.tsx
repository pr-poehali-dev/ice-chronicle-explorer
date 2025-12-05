import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MainMenuProps {
  onStart: () => void;
}

const MainMenu = ({ onStart }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center grid-pattern relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-nasa-cyan/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/50 to-transparent rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo/Title with enhanced animations */}
        <div className="mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <Icon name="Snowflake" size={56} className="text-nasa-cyan animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-0 animate-ping-slow">
                <Icon name="Snowflake" size={56} className="text-nasa-cyan/30" />
              </div>
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-nasa-cyan to-primary bg-clip-text text-transparent animate-fade-in-scale">
              Ледяной Хроникер
            </h1>
            <div className="relative">
              <Icon name="Snowflake" size={56} className="text-nasa-cyan animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 animate-ping-slow" style={{ animationDelay: '1s' }}>
                <Icon name="Snowflake" size={56} className="text-nasa-cyan/30" />
              </div>
            </div>
          </div>
          <div className="relative inline-block">
            <p className="text-2xl text-muted-foreground font-mono shine-effect px-4 py-2">
              Путешествие сквозь время Арктики
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-nasa-cyan/20 blur-lg -z-10 animate-pulse" />
          </div>
        </div>

        {/* Mission statement */}
        <div className="mb-14 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Интерактивный веб-симулятор виртуальной экспедиции по Арктике. 
            Исследуйте, как менялась Арктика за последние 100 лет и какими могут быть последствия наших решений в будущем.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 max-w-4xl mx-auto">
            {[
              { icon: 'Thermometer', label: 'Климатология', color: 'from-orange-400 to-red-500', delay: '0.3s' },
              { icon: 'Trees', label: 'Биология', color: 'from-green-400 to-emerald-500', delay: '0.4s' },
              { icon: 'Cog', label: 'Инженерия', color: 'from-blue-400 to-indigo-500', delay: '0.5s' },
              { icon: 'BookOpen', label: 'Журналистика', color: 'from-purple-400 to-pink-500', delay: '0.6s' }
            ].map((item, i) => (
              <div 
                key={i}
                className="group relative bg-white/90 backdrop-blur-lg p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover:scale-110 hover:-translate-y-2 card-hover shine-effect animate-fade-in-scale shadow-lg hover:shadow-2xl"
                style={{ animationDelay: item.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative">
                  <div className="mb-3 inline-block p-3 rounded-xl bg-gradient-to-br from-primary/10 to-nasa-cyan/10 group-hover:scale-110 transition-transform">
                    <Icon name={item.icon as any} size={40} className="text-nasa-cyan group-hover:animate-bounce-subtle" />
                  </div>
                  <p className="text-base font-mono font-semibold">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA with glow effect */}
        <div className="animate-fade-in-scale" style={{ animationDelay: '0.7s' }}>
          <div className="relative inline-block">
            <Button 
              onClick={onStart}
              size="lg"
              className="relative text-2xl px-16 py-8 bg-gradient-to-r from-primary to-nasa-cyan hover:from-primary/90 hover:to-nasa-cyan/90 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-nasa-cyan/50 shine-effect group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Icon name="Rocket" size={28} className="group-hover:animate-bounce-subtle" />
                Начать экспедицию
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-nasa-cyan blur-2xl opacity-50 animate-pulse -z-10" />
          </div>
        </div>

        {/* Footer info with icons */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Icon name="Map" size={16} />
              <span>Карта Арктики</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Icon name="Clock" size={16} />
              <span>Временные слои 1925-2050</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Icon name="Target" size={16} />
              <span>Интерактивные миссии</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Icon name="Bot" size={16} />
              <span>ИИ-наставник</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
