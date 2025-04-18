import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { QuizQuestion } from './types';
import { questions } from './questions';
import LoadingScreen from './components/LoadingScreen';
import DiagnosisReport from './components/DiagnosisReport';
import BMIProfile from './components/BMIProfile';
import Congratulations from './components/Congratulations';
import PersonalProfile from './components/PersonalProfile';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [showBMIProfile, setShowBMIProfile] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showPersonalProfile, setShowPersonalProfile] = useState(false);

  const calculateWeightLossPercentage = () => {
    const currentWeight = parseFloat(answers.weight || '0');
    const targetWeight = parseFloat(textInput);
    if (currentWeight && targetWeight) {
      const weightLoss = currentWeight - targetWeight;
      const percentage = (weightLoss / currentWeight) * 100;
      return {
        percentage: Math.abs(percentage),
        isReasonable: percentage > 0 && percentage <= 20 // Consider weight loss up to 20% as reasonable
      };
    }
    return null;
  };

  const calculateBMI = () => {
    const weight = parseFloat(answers.weight || '0');
    const height = parseFloat(answers.height || '0') / 100; // Convert cm to meters
    if (weight && height) {
      const bmi = weight / (height * height);
      let category = '';
      let message = '';

      if (bmi < 18.5) {
        category = 'abaixo do peso';
        message = 'Você precisa de um plano personalizado para ganhar peso de forma saudável.';
      } else if (bmi < 25) {
        category = 'normal';
        message = 'Você está em ótima forma! Continue assim!';
      } else if (bmi < 30) {
        category = 'sobrepeso';
        message = 'Com nosso programa, você pode alcançar seu peso ideal!';
      } else {
        category = 'obesidade';
        message = 'Vamos trabalhar juntos para alcançar um peso mais saudável!';
      }

      return {
        value: bmi,
        category,
        message
      };
    }
    return null;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: answer };
    setAnswers(newAnswers);
    
    if (questions[currentStep].id === 'weight') {
      setShowBMIProfile(true);
      return;
    }

    if (questions[currentStep].id === 'targetWeight') {
      setShowCongratulations(true);
      return;
    }

    if (questions[currentStep].id === 'time') {
      setShowPersonalProfile(true);
      return;
    }

    if (currentStep === questions.length - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowDiagnosis(true);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
      setTextInput('');
      setError('');
    }
  };

  const handleContinueFromBMI = () => {
    setShowBMIProfile(false);
    setCurrentStep(prev => prev + 1);
    setTextInput('');
    setError('');
  };

  const handleContinueFromCongratulations = () => {
    setShowCongratulations(false);
    setCurrentStep(prev => prev + 1);
    setTextInput('');
    setError('');
  };

  const handleContinueFromPersonalProfile = () => {
    setShowPersonalProfile(false);
    setCurrentStep(prev => prev + 1);
    setTextInput('');
    setError('');
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      setError('Este campo é obrigatório');
      return;
    }

    if (questions[currentStep].id === 'age') {
      const age = parseInt(textInput);
      if (isNaN(age) || age < 1 || age > 120) {
        setError('Por favor, digite uma idade válida');
        return;
      }
    }

    if (questions[currentStep].id === 'height') {
      const height = parseInt(textInput);
      if (isNaN(height) || height < 100 || height > 250) {
        setError('Por favor, digite uma altura válida em cm (entre 100 e 250)');
        return;
      }
    }

    if (questions[currentStep].id === 'weight' || questions[currentStep].id === 'targetWeight') {
      const weight = parseFloat(textInput);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        setError('Por favor, digite um peso válido em kg (entre 30 e 300)');
        return;
      }
    }

    handleAnswer(textInput);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const bmiData = calculateBMI();
  const weightLossData = questions[currentStep].id === 'targetWeight' ? calculateWeightLossPercentage() : null;

  if (isAnalyzing) {
    return <LoadingScreen />;
  }

  if (showDiagnosis) {
    return <DiagnosisReport answers={answers} />;
  }

  if (showCongratulations) {
    return <Congratulations onContinue={handleContinueFromCongratulations} />;
  }

  if (showPersonalProfile) {
    return <PersonalProfile answers={answers} onContinue={handleContinueFromPersonalProfile} />;
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://clickaris.com/wp-content/uploads/2025/04/logo-min.png" 
            alt="Clickaris Logo" 
            className="h-12 object-contain"
          />
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Questão {currentStep + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {showBMIProfile && bmiData ? (
          <>
            <BMIProfile 
              bmi={bmiData.value} 
              weight={parseFloat(answers.weight || '0')} 
            />
            <div className="mt-8">
              <button
                onClick={handleContinueFromBMI}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 
                         transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Continuar</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {currentQuestion.icon}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentQuestion.question}
                </h2>
              </div>
              {currentQuestion.description && (
                <p className="text-gray-600 mt-2">{currentQuestion.description}</p>
              )}
            </div>

            {/* Input area */}
            <div className="mb-24 sm:mb-0">
              {currentQuestion.type === 'text' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                             focus:ring focus:ring-blue-200 transition-all duration-200"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {weightLossData && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <p className="text-lg font-medium text-gray-800">
                        {weightLossData.isReasonable ? 'Meta razoável! 👌🏼' : 'Atenção! ⚠️'}
                      </p>
                      <p className="text-gray-600">
                        Perder {weightLossData.percentage.toFixed(1)}% do seu peso
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 
                               hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="text-gray-700 group-hover:text-blue-700">{option}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fixed button for mobile */}
            {currentQuestion.type === 'text' && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:relative sm:border-0 sm:p-0 sm:bg-transparent">
                <button
                  onClick={handleTextSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 
                           transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>Continuar</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;