import React from 'react';

interface BMIProfileProps {
  bmi: number;
  weight: number;
}

const BMIProfile: React.FC<BMIProfileProps> = ({ bmi, weight }) => {
  // Calculate position for BMI marker (18.5 to 30 range)
  const getBMIPosition = () => {
    const minBMI = 18.5;
    const maxBMI = 30;
    const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  // Calculate healthy weight range based on height
  const calculateHealthyWeightRange = (bmi: number, weight: number) => {
    const height = Math.sqrt(weight / bmi);
    const minWeight = Math.round(18.5 * height * height);
    const maxWeight = Math.round(24.9 * height * height);
    const overWeight = Math.round(30 * height * height);
    return { minWeight, maxWeight, overWeight };
  };

  const { minWeight, maxWeight, overWeight } = calculateHealthyWeightRange(bmi, weight);

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-1">{bmi.toFixed(1)}</div>
          <div className="text-gray-600 text-sm">IMC<br/>Índice de Massa Corporal</div>
        </div>

        {/* BMI Scale */}
        <div className="relative mb-4">
          {/* BMI bar */}
          <div className="h-2 flex rounded-sm overflow-hidden">
            <div className="w-[30%] bg-[#64B5F6]"></div>
            <div className="w-[35%] bg-[#81C784]"></div>
            <div className="w-[20%] bg-[#FFB74D]"></div>
            <div className="w-[15%] bg-[#E57373]"></div>
          </div>
          
          {/* BMI Marker */}
          <div 
            className="absolute top-[-6px] transform -translate-x-1/2"
            style={{ left: `${getBMIPosition()}%` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></div>
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-600">18.5</span>
            <span className="text-xs text-gray-600">25</span>
            <span className="text-xs text-gray-600">30</span>
          </div>
          
          {/* Weight Labels */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{minWeight} kg</span>
            <span>{maxWeight} kg</span>
            <span>{overWeight} kg</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mt-6 text-center">
          Manter um IMC saudável (18.5 – 24.9) reduz o risco de várias doenças crônicas como doenças cardíacas, 
          pressão alta, diabetes tipo 2, problemas respiratórios e certos tipos de câncer.
        </p>
      </div>
    </div>
  );
};

export default BMIProfile;