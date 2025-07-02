import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronRight,
  Edit3,
  Send,
  Plus,
  X,
  Camera
} from 'lucide-react';

const GuideReviewTemplate3 = ({ onBack }) => {
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

  const [ratings, setRatings] = useState({
    expertise: 0,
    kindness: 0,
    management: 0,
    interaction: 0
  });

  const [recommendation, setRecommendation] = useState('');
  const [animatingCard, setAnimatingCard] = useState(null);
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [detailedReviewText, setDetailedReviewText] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const ratingOptions = [
    { value: 5, label: '최고예요', emoji: '😍', color: 'bg-green-500' },
    { value: 4, label: '좋아요', emoji: '😊', color: 'bg-blue-500' },
    { value: 3, label: '보통이에요', emoji: '😐', color: 'bg-yellow-500' },
    { value: 2, label: '아쉬워요', emoji: '😕', color: 'bg-orange-500' },
    { value: 1, label: '별로에요', emoji: '😞', color: 'bg-red-500' }
  ];

  const questions = [
    {
      id: 'expertise',
      title: '가이드의 전문성은 어떠했나요?',
      subtitle: '투어 내용, 역사/문화 지식, 정보 전달력 등'
    },
    {
      id: 'kindness',
      title: '가이드는 친절하고 소통이 원활했나요?',
      subtitle: '태도, 의사소통 방식, 질문 응대 등'
    },
    {
      id: 'management',
      title: '가이드 진행은 시간 관리 및 전반적인 흐름이 만족스러웠나요?',
      subtitle: '집합/해산 시간 준수, 동선 효율성, 위기 대처 능력 등'
    },
    {
      id: 'interaction',
      title: '가이드는 참여자들과의 상호작용 및 분위기 조성에 능숙했나요?',
      subtitle: '참여 유도, 유머 감각, 팀 분위기 형성 등'
    }
  ];

  const recommendationOptions = [
    { value: 'yes', label: '네', emoji: '👍', color: 'bg-green-500' },
    { value: 'no', label: '아니오', emoji: '👎', color: 'bg-red-500' },
    { value: 'unsure', label: '잘 모르겠습니다', emoji: '🤔', color: 'bg-gray-500' }
  ];

  const handleRatingSelect = (questionId, value) => {
    setAnimatingCard(questionId);
    setTimeout(() => {
      setRatings(prev => ({ ...prev, [questionId]: value }));
      setAnimatingCard(null);
    }, 150);
  };

  const handleRecommendationSelect = (value) => {
    setAnimatingCard('recommendation');
    setTimeout(() => {
      setRecommendation(value);
      setAnimatingCard(null);
    }, 150);
  };

  const handleDetailedReview = () => {
    setAnimatingCard('detailed-review');
    setTimeout(() => {
      setShowDetailedReview(true);
      setAnimatingCard(null);
    }, 300);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (uploadedImages.length + files.length > 3) {
      alert('최대 3장까지 업로드 가능합니다.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = () => {
    const allRated = Object.values(ratings).every(rating => rating > 0);
    if (!allRated || !recommendation) {
      alert('모든 항목을 평가해주세요.');
      return;
    }

    console.log('평가 결과:', { 
      ratings, 
      recommendation, 
      detailedReview: detailedReviewText,
      images: uploadedImages 
    });
    alert('가이드 후기가 성공적으로 작성되었습니다!');
  };

  const isCompleted = Object.values(ratings).every(rating => rating > 0) && recommendation;

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900" style={{ fontWeight: 500 }}>가이드 평가</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight" style={{ fontWeight: 700 }}>
            가이드와 함께한 여행<br />
            어떠셨나요?
          </h2>
          <p className="text-gray-600 text-lg" style={{ fontWeight: 400 }}>
            가이드에 대해 이야기해주세요.
          </p>
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <div 
            key={question.id} 
            className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 ${
              animatingCard === question.id ? 'scale-[0.98] opacity-70' : 'scale-100 opacity-100'
            }`}
          >
            <div className="mb-6">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm" style={{ fontWeight: 700 }}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight" style={{ fontWeight: 600 }}>
                    {question.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2" style={{ fontWeight: 400 }}>
                    {question.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {ratings[question.id] === 0 ? (
              <div className="grid grid-cols-5 gap-3">
                {ratingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRatingSelect(question.id, option.value)}
                    className="group"
                  >
                    <div className="w-full aspect-square bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-all duration-200 group-hover:scale-105">
                      <span className="text-2xl">{option.emoji}</span>
                    </div>
                    <p className="text-xs text-gray-600 text-center leading-tight" style={{ fontWeight: 500 }}>
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    ratingOptions.find(opt => opt.value === ratings[question.id])?.color
                  }`}>
                    <span className="text-2xl">
                      {ratingOptions.find(opt => opt.value === ratings[question.id])?.emoji}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900" style={{ fontWeight: 600 }}>
                      {ratingOptions.find(opt => opt.value === ratings[question.id])?.label}
                    </p>
                    <p className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                      선택 완료
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRatingSelect(question.id, 0)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Recommendation Question */}
        <div 
          className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 ${
            animatingCard === 'recommendation' ? 'scale-[0.98] opacity-70' : 'scale-100 opacity-100'
          }`}
        >
          <div className="mb-6">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 font-bold text-sm" style={{ fontWeight: 700 }}>
                  5
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight" style={{ fontWeight: 600 }}>
                  전반적으로 이 가이드와의 경험을 다른 사람에게 추천하시겠어요?
                </h3>
                <p className="text-sm text-gray-500 mt-2" style={{ fontWeight: 400 }}>
                  종합적인 만족도
                </p>
              </div>
            </div>
          </div>

          {!recommendation ? (
            <div className="space-y-3">
              {recommendationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRecommendationSelect(option.value)}
                  className="w-full p-4 bg-gray-50 rounded-2xl flex items-center space-x-3 hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xl">{option.emoji}</span>
                  </div>
                  <span className="text-gray-900 font-medium" style={{ fontWeight: 500 }}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  recommendationOptions.find(opt => opt.value === recommendation)?.color
                }`}>
                  <span className="text-2xl">
                    {recommendationOptions.find(opt => opt.value === recommendation)?.emoji}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontWeight: 600 }}>
                    {recommendationOptions.find(opt => opt.value === recommendation)?.label}
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                    선택 완료
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRecommendationSelect('')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Detailed Review Button */}
        {isCompleted && !showDetailedReview && (
          <div 
            className={`bg-blue-50 rounded-3xl p-6 border border-blue-100 animate-fade-in transition-all duration-300 ${
              animatingCard === 'detailed-review' ? 'scale-[0.98] opacity-70' : 'scale-100 opacity-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 size={20} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                더 자세한 후기를 남겨주세요
              </h3>
              <p className="text-gray-600 text-sm mb-4" style={{ fontWeight: 400 }}>
                다른 여행자들에게 도움이 되는 구체적인 경험을 공유해보세요
              </p>
              <button
                onClick={handleDetailedReview}
                className="w-full py-3 px-4 bg-white border border-blue-200 text-blue-700 rounded-2xl hover:bg-blue-50 transition-all duration-200 font-medium"
                style={{ fontWeight: 500 }}
              >
                자세한 가이드 작성
              </button>
            </div>
          </div>
        )}

        {/* Detailed Review Section */}
        {showDetailedReview && (
          <div className="space-y-6 animate-fade-in">
            {/* Text Review */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontWeight: 700 }}>
                자세한 후기 작성
              </h3>
              <div className="border border-gray-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                <textarea
                  value={detailedReviewText}
                  onChange={(e) => setDetailedReviewText(e.target.value)}
                  rows={8}
                  className="w-full border-0 focus:outline-none focus:ring-0 resize-none placeholder-gray-400"
                  placeholder="가이드와 함께한 구체적인 경험을 자세히 공유해주세요. 예를 들어:
• 가이드가 특별히 인상 깊었던 설명이나 에피소드
• 다른 여행자들에게 도움이 될 만한 팁
• 투어 중 기억에 남는 순간들
• 개선되었으면 하는 점들"
                  style={{ 
                    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontWeight: 700 }}>
                사진 추가 (최대 3장)
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {/* 업로드된 이미지들 */}
                {uploadedImages.map((image, index) => (
                  <div key={image.id} className="relative aspect-square">
                    <div className="w-full h-full border-2 border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                      <img
                        src={image.url}
                        alt={`업로드된 이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* 추가 업로드 버튼들 */}
                {Array.from({ length: 3 - uploadedImages.length }).map((_, index) => (
                  <label key={`upload-${index}`} className="aspect-square cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-gray-300 hover:bg-gray-50 transition-all bg-gray-25">
                      <Plus size={24} className="mb-1" />
                      <span className="text-xs font-medium" style={{ fontWeight: 500 }}>사진 추가</span>
                    </div>
                  </label>
                ))}
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-700 text-center" style={{ fontWeight: 500 }}>
                    📸 {uploadedImages.length}장 업로드 완료 • {3 - uploadedImages.length}장 더 추가 가능
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isCompleted}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            isCompleted
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={{ fontWeight: 600 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Send size={20} />
            <span>가이드 후기 작성</span>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GuideReviewTemplate3;