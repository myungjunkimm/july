import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  ChevronDown,
  Camera,
  X,
  Gift,
  Upload,
  Check,
  Users,
  Plus
} from 'lucide-react';

const GuideReviewTemplate2 = ({ onBack }) => {
  // Pretendard 폰트 로드
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.body.style.fontFamily = '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const [rating, setRating] = useState(0);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [reviewText, setReviewText] = useState('');

  const ratingLabels = {
    1: '아쉬워요',
    2: '그저 그래요',
    3: '보통이에요',
    4: '좋아요',
    5: '최고예요'
  };

  const evaluationCategories = [
    {
      title: '가이드 전문성',
      options: [
        { text: '깊이 있는 지식을 전달해줬어요', icon: '🎓', count: 100 },
        { text: '현지 문화/역사에 대한 이해가 높아요', icon: '🏛️', count: 68 },
        { text: '질문에 정확하게 답변해줬어요', icon: '💡', count: 49 },
        { text: '최신 정보와 트렌드를 잘 알고 있어요', icon: '📱', count: 5 }
      ]
    },
    {
      title: '친절함',
      options: [
        { text: '항상 밝게 응대했어요', icon: '😊', count: 89 },
        { text: '요청 사항을 잘 들어줬어요', icon: '👂', count: 72 },
        { text: '배려심이 느껴졌어요', icon: '💝', count: 56 },
        { text: '불편함 없이 편안하게 해줬어요', icon: '🤗', count: 43 }
      ]
    },
    {
      title: '투어 구성',
      options: [
        { text: '동선이 효율적이었어요', icon: '🗺️', count: 95 },
        { text: '일정이 알차고 체계적이었어요', icon: '📋', count: 81 },
        { text: '다양한 경험을 할 수 있었어요', icon: '🎭', count: 67 },
        { text: '예상치 못한 즐거움이 있었어요', icon: '🎉', count: 34 }
      ]
    },
    {
      title: '동반인',
      options: [
        { text: '가족과 함께', icon: '👨‍👩‍👧‍👦', count: 156 },
        { text: '연인/배우자와 함께', icon: '💑', count: 98 },
        { text: '친구/지인과 함께', icon: '👫', count: 87 },
        { text: '혼자 참여', icon: '🚶', count: 23 }
      ]
    }
  ];

  const handleOptionToggle = (categoryIndex, optionIndex) => {
    const key = `${categoryIndex}-${optionIndex}`;
    setSelectedOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
    const selectedCount = Object.values(selectedOptions).filter(Boolean).length;
    const hasImages = uploadedImages.length > 0;
    
    console.log('리뷰 데이터:', {
      rating,
      selectedOptions,
      reviewText,
      images: uploadedImages,
      mileage: hasImages ? 1500 : 1000
    });
    
    alert(`리뷰가 등록되었습니다! ${hasImages ? '1,500' : '1,000'} 마일리지가 적립됩니다.`);
  };

  const mileageAmount = uploadedImages.length > 0 ? 1500 : 1000;

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
            <h1 className="text-lg font-medium text-gray-900" style={{ fontWeight: 500 }}>가이드 리뷰</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* 별점 평가 섹션 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center" style={{ fontWeight: 600 }}>
            홍길동 가이드와 함께한 여행은 어떠셨나요?
          </h2>

          {rating === 0 ? (
            <div className="relative">
              <button
                onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                className="w-full py-4 px-4 bg-gray-50 rounded-2xl flex items-center justify-between text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <span style={{ fontWeight: 400 }}>평점을 선택해주세요</span>
                <ChevronDown size={20} className={`transition-transform ${showRatingDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRatingDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setRating(star);
                        setShowRatingDropdown(false);
                      }}
                      className="w-full py-4 px-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < star ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-gray-900" style={{ fontWeight: 400 }}>{ratingLabels[star]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                className="w-full py-4 px-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span style={{ fontWeight: 500 }}>{ratingLabels[rating]}</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${showRatingDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRatingDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setRating(star);
                        setShowRatingDropdown(false);
                      }}
                      className="w-full py-4 px-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < star ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-gray-900" style={{ fontWeight: 400 }}>{ratingLabels[star]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 평가 항목들 */}
        {rating > 0 && (
          <>
            {evaluationCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontWeight: 700 }}>
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.options.map((option, optionIndex) => {
                    const isSelected = selectedOptions[`${categoryIndex}-${optionIndex}`];
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionToggle(categoryIndex, optionIndex)}
                        className={`w-full p-4 rounded-2xl border transition-all text-left ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{option.icon}</span>
                            <span className={`${isSelected ? 'text-blue-700' : 'text-gray-900'}`} style={{ fontWeight: 500 }}>
                              {option.text}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Users size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-500" style={{ fontWeight: 400 }}>{option.count}</span>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check size={12} className="text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 사진 업로드 섹션 */}
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

            {/* 후기 작성 섹션 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontWeight: 700 }}>
                후기 작성
              </h3>
              <div className="border border-gray-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={6}
                  className="w-full border-0 focus:outline-none focus:ring-0 resize-none placeholder-gray-400"
                  placeholder="가이드와 함께한 여행의 소중한 경험을 자유롭게 공유해주세요."
                  style={{ 
                    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}
                />
              </div>
            </div>

            {/* 마일리지 정보 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-2">
                <Gift size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900" style={{ fontWeight: 700 }}>마일리지 적립</h3>
              </div>
              <div className="space-y-1">
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  • 리뷰만 작성 시 <span className="font-semibold text-blue-600">1,000 마일리지</span>
                </p>
                <p className="text-gray-700" style={{ fontWeight: 400 }}>
                  • 리뷰와 사진 함께 작성 시 <span className="font-semibold text-purple-600">1,500 마일리지</span> 적립!
                </p>
              </div>
              <div className="mt-4 px-4 py-2 bg-white rounded-xl border border-blue-200">
                <p className="text-center text-blue-700 font-semibold" style={{ fontWeight: 600 }}>
                  예상 적립: {mileageAmount.toLocaleString()} 마일리지
                </p>
              </div>
            </div>

            {/* 등록 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={!reviewText.trim()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
              style={{ fontWeight: 600 }}
            >
              가이드 리뷰 등록
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GuideReviewTemplate2;