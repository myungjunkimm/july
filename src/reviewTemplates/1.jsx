import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  User, 
  MapPin,
  MessageSquare,
  DollarSign,
  ChevronRight,
  Heart
} from 'lucide-react';

const GuideReviewTemplate = ({ onBack }) => {
  // Pretendard 폰트 로드
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 폰트 스타일을 body에 적용
    document.body.style.fontFamily = '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [showTipModal, setShowTipModal] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    npsScore: 0
  });

  const [tipAmount, setTipAmount] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNpsClick = (score) => {
    setFormData(prev => ({
      ...prev,
      npsScore: score
    }));
  };

  const handleFeedbackClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(2);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = () => {
    console.log('리뷰 데이터:', formData);
    alert('리뷰가 성공적으로 저장되었습니다!');
  };

  const TipModal = () => (
    showTipModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">가이드에게 팁 주기</h3>
            <p className="text-gray-600">김가이드에게 감사의 마음을 전해보세요</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['5,000', '10,000', '20,000', '50,000'].map((amount) => (
              <button
                key={amount}
                onClick={() => setTipAmount(amount)}
                className={`py-4 px-4 rounded-2xl border-2 transition-all ${
                  tipAmount === amount 
                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">{amount}원</div>
              </button>
            ))}
          </div>
          
          <div className="mb-8">
            <input
              type="text"
              placeholder="직접 입력"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowTipModal(false)}
              className="flex-1 py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors font-medium"
            >
              취소
            </button>
            <button
              onClick={() => {
                alert(`${tipAmount}원 팁이 전송되었습니다!`);
                setShowTipModal(false);
              }}
              className="flex-1 py-4 px-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium"
            >
              팁 보내기
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Step 1: 초기 평가 화면
  if (currentStep === 1) {
    return (
      <div 
        className={`min-h-screen bg-gray-50 transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100'}`}
        style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif' }}
      >
        <TipModal />
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-lg mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">가이드 평가</h1>
              <div className="w-8"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="text-center">
            {/* Profile Image */}
            <div className="w-24 h-24 bg-gray-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <User size={32} className="text-gray-500" />
            </div>
            
            {/* Guide Name */}
            <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontWeight: 600 }}>김가이드</h2>
            <p className="text-gray-500 text-sm mb-12" style={{ fontWeight: 400 }}>전문 가이드</p>
            
            {/* Main Question */}
            <h3 className="text-2xl font-medium text-gray-900 mb-4 leading-relaxed" style={{ fontWeight: 500 }}>
              김가이드와 함께한 여행<br />
              어떠셨나요?
            </h3>
            <p className="text-gray-600 mb-12" style={{ fontWeight: 400 }}>
              여러분의 의견이 궁금해요.
            </p>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowTipModal(true)}
                className="w-full py-4 px-6 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-medium"
              >
                커피값 선물하기
              </button>
              <button
                onClick={handleFeedbackClick}
                className="w-full py-4 px-6 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors font-medium"
              >
                의견 남기기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: 상세 평가 화면
  return (
    <div 
      className={`min-h-screen bg-gray-50 transition-all duration-300 ${isTransitioning ? 'opacity-0 transform -translate-x-4' : 'opacity-100'}`}
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentStep(1)} 
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">가이드 평가</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Product Info */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <div className="flex items-start space-x-4 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight" style={{ fontWeight: 700 }}>
                [VIP리무진/노옵션]미서부10일
              </h2>
              <p className="text-gray-500 text-sm" style={{ fontWeight: 400 }}>가이드명: 김가이드</p>
            </div>
          </div>

          {/* NPS Question */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center" style={{ fontWeight: 500 }}>
              이 가이드를 주변 사람들에게<br />
              추천하시겠습니까?
            </h3>
            <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
              <span>전혀 추천하지 않음</span>
              <span>매우 추천함</span>
            </div>
            <div className="grid grid-cols-11 gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => handleNpsClick(score)}
                  className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                    formData.npsScore === score
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Review Input */}
          <div className="mb-8">
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-0 py-0 border-0 focus:ring-0 text-lg resize-none bg-transparent"
              placeholder="홍길동 가이드와 함께한 여행을 자유롭게 남겨주세요"
              style={{ 
                color: formData.review ? '#000' : '#9CA3AF',
                fontSize: '18px',
                lineHeight: '1.6',
                fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: formData.review ? 400 : 400
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!formData.review.trim()}
            className="w-full py-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors font-medium text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            style={{ fontWeight: 500 }}
          >
            의견 남기기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideReviewTemplate;