import React from 'react';
import { Activity, Brain, Heart, Scale, Target } from 'lucide-react';

interface DiagnosisReportProps {
  answers: Record<string, string>;
}

function DiagnosisReport({ answers }: DiagnosisReportProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Seu Diagnóstico Personalizado
          </h1>
          
          <div className="grid gap-8">
            {/* Metabolic Profile */}
            <section className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Perfil Metabólico
                </h2>
              </div>
              <p className="text-gray-600">
                Com base nas suas respostas, seu metabolismo é {answers.metabolism?.toLowerCase()}. 
                Isso significa que seu corpo {
                  answers.metabolism === 'Metabolismo lento' 
                    ? 'precisa de estratégias específicas para acelerar o metabolismo'
                    : 'tem uma boa base para alcançar seus objetivos'
                }.
              </p>
            </section>

            {/* Fitness Level */}
            <section className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Nível de Condicionamento
                </h2>
              </div>
              <p className="text-gray-600">
                Seu nível atual de atividade física é {answers.activity?.toLowerCase()}.
                Recomendamos um programa progressivo que respeite seu tempo disponível de {answers.time?.toLowerCase()} por dia.
              </p>
            </section>

            {/* Goals Analysis */}
            <section className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Análise de Objetivos
                </h2>
              </div>
              <p className="text-gray-600">
                Seu objetivo principal é {answers.goal?.toLowerCase()}. 
                Considerando seu histórico de tentativas anteriores,
                desenvolvemos um plano personalizado para maximizar seus resultados.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Ver Plano Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisReport;