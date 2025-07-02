import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft
} from 'lucide-react';

const GuideReviewTemplate4 = ({ onBack }) => {
  // Pretendard 폰트 로드
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.body.style.fontFamily = '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState({
    expertise: '',
    communication: '',
    reason: ''
  });

  const steps = [
    {
      id: 'intro',
      title: '이번 여행 어떠셨나요?',
      subtitle: '가이드에 대한 솔직한 후기를 남겨주세요!',
      type: 'intro'
    },
    {
      id: 'expertise',
      title: '가이드의 전문성은 어떠했나요?',
      type: 'select',
      options: [
        { value: 'very_satisfied', label: '매우 만족' },
        { value: 'satisfied', label: '만족' },
        { value: 'normal', label: '보통' },
        { value: 'dissatisfied', label: '불만족' },
        { value: 'very_dissatisfied', label: '매우 불만족' }
      ]
    },
    {
      id: 'communication',
      title: '가이드는 친절하고 소통이 원활했나요?',
      type: 'select',
      options: [
        { value: 'very_satisfied', label: '매우 만족' },
        { value: 'satisfied', label: '만족' },
        { value: 'normal', label: '보통' },
        { value: 'dissatisfied', label: '불만족' },
        { value: 'very_dissatisfied', label: '매우 불만족' }
      ]
    },
    {
      id: 'reason',
      title: '그렇게 생각한 이유가 무엇인가요?',
      subtitle: '주신 의견은 한글자도 빼놓지 않고 꼼꼼히 읽어볼게요.',
      type: 'textarea'
    },
    {
      id: 'complete',
      title: '답변 제출 완료!',
      subtitle: '경경경님, 소중한 의견 감사해요',
      type: 'complete'
    }
  ];

  const handleNext = () => {
    if (currentStep === 0) {
      transition();
    } else if (currentStep < steps.length - 1) {
      const currentStepData = steps[currentStep];
      
      // 유효성 검사
      if (currentStepData.type === 'select') {
        if (!answers[currentStepData.id]) {
          return; // 선택하지 않으면 진행하지 않음
        }
      } else if (currentStepData.type === 'textarea') {
        if (!answers.reason.trim()) {
          return; // 텍스트가 없으면 진행하지 않음
        }
      }
      
      transition();
    }
  };

  const transition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      onBack();
    }
  };

  const handleOptionSelect = (stepId, value) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: value
    }));
    
    // 선택 후 자동으로 다음 단계로
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleTextChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      reason: value
    }));
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div 
      className="min-h-screen bg-white"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
    >
      <style jsx>{`
        /* Remove custom animations for Apple-style simplicity */
      `}</style>
      
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-white"></div>
        <div className="relative max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center">
            <button 
              onClick={handleBack} 
              className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`max-w-lg mx-auto px-6 transition-all duration-300 ${
        isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
      }`}>
        
        {/* Intro Step */}
        {currentStep === 0 && (
          <div className="pt-20 pb-12 space-y-20">
            <div className="space-y-16 text-center">
              {/* Simple, elegant icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-28 h-28 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-white text-4xl">📝</div>
                  </div>
                  {/* Subtle glow */}
                  <div className="absolute inset-0 w-28 h-28 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
                </div>
              </div>
              
              <div className="space-y-6 max-w-sm mx-auto">
                <h1 className="text-4xl font-light text-gray-900 leading-tight" style={{ fontWeight: 300 }}>
                  {currentStepData.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
                  {currentStepData.subtitle}
                </p>
              </div>
            </div>
            
            <div className="fixed bottom-8 left-6 right-6 max-w-lg mx-auto">
              <button
                onClick={handleNext}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium text-lg shadow-sm hover:bg-blue-600 transition-all duration-200"
                style={{ fontWeight: 500 }}
              >
                시작하기
              </button>
            </div>
          </div>
        )}

        {/* Question Steps */}
        {currentStep > 0 && !isLastStep && (
          <div className="pt-8 pb-32">
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight" style={{ fontWeight: 700 }}>
                {currentStepData.title}
              </h1>
              {currentStepData.subtitle && (
                <p className="text-lg text-gray-600 mt-4 leading-relaxed" style={{ fontWeight: 400 }}>
                  {currentStepData.subtitle}
                </p>
              )}
            </div>

            {/* Select Options */}
            {currentStepData.type === 'select' && (
              <div className="space-y-0 divide-y divide-gray-100">
                {currentStepData.options.map((option) => {
                  const isSelected = answers[currentStepData.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(currentStepData.id, option.value)}
                      className="w-full py-5 px-0 text-left transition-all duration-150 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-lg transition-colors duration-150 ${isSelected ? 'text-blue-500' : 'text-gray-900'}`} style={{ fontWeight: isSelected ? 500 : 400 }}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 6.5L6.5 11.5L16.5 1.5" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Textarea */}
            {currentStepData.type === 'textarea' && (
              <div className="space-y-8">
                <div>
                  <textarea
                    value={answers.reason}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={8}
                    className="w-full border-0 focus:outline-none focus:ring-0 resize-none text-xl leading-relaxed placeholder-gray-400"
                    placeholder="가이드에 대한 솔직한 의견을 자유롭게 작성해주세요..."
                    style={{ 
                      fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
                      fontWeight: 400
                    }}
                  />
                </div>
                
                {answers.reason.trim() && (
                  <div className="fixed bottom-8 left-6 right-6 max-w-lg mx-auto">
                    <button
                      onClick={handleNext}
                      className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium text-lg shadow-sm hover:bg-blue-600 transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      계속
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Complete Step */}
        {isLastStep && (
          <div className="pt-8 pb-12 space-y-12">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight" style={{ fontWeight: 700 }}>
                {currentStepData.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
                {currentStepData.subtitle}
              </p>
            </div>

            {/* 3D Heart Icon */}
            <div className="flex justify-center py-16">
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-xl transform -rotate-3 animate-pulse">
                  <div className="w-20 h-20 relative">
                    {/* Heart Shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full transform rotate-45 shadow-lg"></div>
                    <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                  </div>
                </div>
                {/* Floating effect */}
                <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl opacity-20 blur-xl transform rotate-6"></div>
              </div>
            </div>
            
            <div className="fixed bottom-8 left-6 right-6 max-w-lg mx-auto">
              <button
                onClick={() => {
                  console.log('최종 평가 결과:', answers);
                  alert('평가가 완료되었습니다!');
                }}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium text-lg shadow-sm hover:bg-blue-600 transition-colors"
                style={{ fontWeight: 500 }}
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideReviewTemplate4;