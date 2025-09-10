import { ArrowRight } from 'lucide-react';

const architectureComponents = [
  {
    title: 'Raspberry Pi Pico W',
    subtitle: 'エッジデバイス',
    icon: '🎙️',
    gradient: 'from-orange-400 to-red-500',
    features: ['音声録音', 'モーター制御', 'センサーデータ取得'],
  },
  {
    title: 'Google Colab',
    subtitle: 'AI処理基盤',
    icon: '🧠',
    gradient: 'from-blue-400 to-purple-500',
    features: ['CNN音声認識', '機械学習推論', 'データ分析'],
  },
  {
    title: 'Next.js Web App',
    subtitle: 'ユーザーインターフェース',
    icon: '💻',
    gradient: 'from-green-400 to-cyan-500',
    features: ['AIチャット', 'リアルタイム監視', 'データ可視化'],
  },
];

export default function ArchitectureSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            システム構成
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            エッジデバイスからクラウドまで、堅牢で拡張性の高いアーキテクチャ
          </p>
        </div>
        
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
            {architectureComponents.map((component, index) => (
              <>
                <div key={component.title} className="flex-1 max-w-sm">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-20 h-20 bg-gradient-to-br ${component.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <span className="text-3xl">{component.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                      {component.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                      {component.subtitle}
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {component.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Arrow - Only show between components, not after the last one */}
                {index < architectureComponents.length - 1 && (
                  <>
                    <div className="hidden lg:block">
                      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </div>
                    <div className="lg:hidden">
                      <div className="w-8 h-8 text-gray-400 dark:text-gray-600 rotate-90">
                        <ArrowRight className="w-full h-full" />
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}