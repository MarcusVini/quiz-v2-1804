import React from 'react';
import { PartyPopper } from 'lucide-react';

interface CongratulationsProps {
  onContinue: () => void;
}

const Congratulations: React.FC<CongratulationsProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <PartyPopper className="w-16 h-16 text-yellow-300 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Ótimo!
        </h1>
        <p className="text-xl text-white mb-12">
          Você acabou de definir sua primeira meta! Você pode sempre alterar essa meta depois
        </p>
        <button
          onClick={onContinue}
          className="bg-white text-purple-700 px-8 py-3 rounded-xl hover:bg-purple-50 
                   transition-colors duration-200 font-semibold"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Congratulations;