import { Mic, MessageSquare, Activity } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: '高精度音声制御',
    description: 'CNNベースの音声認識により、自然な話し言葉でロボットを直感的に制御できます。',
    gradient: 'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
    hoverGradient: 'from-blue-500/10 to-indigo-500/10',
    iconGradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: MessageSquare,
    title: 'AIチャット制御',
    description: 'Gemini APIを活用した自然言語処理により、会話形式でロボットに指示を出せます。',
    gradient: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
    hoverGradient: 'from-green-500/10 to-emerald-500/10',
    iconGradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Activity,
    title: 'リアルタイム監視',
    description: '高度なテレメトリーシステムでロボットの状態をリアルタイムで監視・制御できます。',
    gradient: 'from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
    hoverGradient: 'from-purple-500/10 to-violet-500/10',
    iconGradient: 'from-purple-500 to-violet-600',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            革新的な機能
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            最新のAI技術と音声認識を活用した、直感的で高精度なロボット制御システム
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}