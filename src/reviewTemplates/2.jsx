import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Star, 
  User, 
  Languages, 
  Clock, 
  MessageSquare,
  CheckCircle,
  Award,
  MapPin
} from 'lucide-react';

const GuideServiceEvaluationTemplate = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // 기본 정보
    guideName: '',
    guideType: '',
    tourDate: '',
    tourLocation: '',
    evaluatorName: '',
    
    // 전문 역량 평가 (1-5점)
    professionalKnowledge: 0,
    languageSkills: 0,
    explanationSkills: 0,
    safetyManagement: 0,
    timeManagement: 0,
    
    // 서비스 태도 평가
    kindness: 0,
    responsiveness: 0,
    patience: 0,
    enthusiasm: 0,
    problemSolving: 0,
    
    // 커뮤니케이션 평가
    clearCommunication: 0,
    activeListening: 0,
    culturalSensitivity: 0,
    groupManagement: 0,
    
    // 종합 평가
    overallSatisfaction: 0,
    recommendationWillingness: 0,
    
    // 구체적 평가
    punctuality: '',
    appearance: '',
    equipmentPreparation: '',
    emergencyResponse: '',
    
    // 언어 능력
    primaryLanguage: '',
    secondaryLanguage: '',
    languageProficiency: '',
    
    // 텍스트 피드백
    impressivePoints: '',
    improvementAreas: '',
    specificIncidents: '',
    additionalComments: '',
    
    // 재이용 의향
    rehireIntention: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (field, rating) => {
    setFormData(prev => ({
      ...prev,
      [field]: rating
    }));
  };

  const handleSubmit = () => {
    console.log('가이드 평가 데이터:', formData);
    alert('가이드 평가가 저장되었습니다.');
  };

  // 별점 컴포넌트
  const StarRating = ({ value, onChange, label }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 rounded ${star <= value ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <Star size={20} fill={star <= value ? 'currentColor' : 'none'} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {value > 0 ? `${value}/5점` : '평가 안함'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">가이드 서비스 평가</h1>
          <p className="text-gray-500 mt-1">가이드의 전문성과 서비스 태도를 평가해주세요</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200/50 space-y-8">
        {/* 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-600" />
            가이드 기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가이드명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guideName"
                value={formData.guideName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">가이드 유형</label>
              <select
                name="guideType"
                value={formData.guideType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="현지가이드">현지 가이드</option>
                <option value="인솔자">인솔자</option>
                <option value="전문가이드">전문 가이드</option>
                <option value="투어리더">투어 리더</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투어 날짜</label>
              <input
                type="date"
                name="tourDate"
                value={formData.tourDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투어 지역</label>
              <input
                type="text"
                name="tourLocation"
                value={formData.tourLocation}
                onChange={handleInputChange}
                placeholder="예: 서울 강남구, 제주도 등"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">평가자명</label>
              <input
                type="text"
                name="evaluatorName"
                value={formData.evaluatorName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 전문 역량 평가 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award size={20} className="mr-2 text-purple-600" />
            전문 역량 평가 (1-5점)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating
              value={formData.professionalKnowledge}
              onChange={(rating) => handleRatingChange('professionalKnowledge', rating)}
              label="전문 지식"
            />
            <StarRating
              value={formData.languageSkills}
              onChange={(rating) => handleRatingChange('languageSkills', rating)}
              label="언어 구사 능력"
            />
            <StarRating
              value={formData.explanationSkills}
              onChange={(rating) => handleRatingChange('explanationSkills', rating)}
              label="설명 능력"
            />
            <StarRating
              value={formData.safetyManagement}
              onChange={(rating) => handleRatingChange('safetyManagement', rating)}
              label="안전 관리"
            />
            <StarRating
              value={formData.timeManagement}
              onChange={(rating) => handleRatingChange('timeManagement', rating)}
              label="시간 관리"
            />
          </div>
        </div>

        {/* 서비스 태도 평가 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2 text-emerald-600" />
            서비스 태도 평가 (1-5점)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating
              value={formData.kindness}
              onChange={(rating) => handleRatingChange('kindness', rating)}
              label="친절도"
            />
            <StarRating
              value={formData.responsiveness}
              onChange={(rating) => handleRatingChange('responsiveness', rating)}
              label="응답성"
            />
            <StarRating
              value={formData.patience}
              onChange={(rating) => handleRatingChange('patience', rating)}
              label="인내심"
            />
            <StarRating
              value={formData.enthusiasm}
              onChange={(rating) => handleRatingChange('enthusiasm', rating)}
              label="열정"
            />
            <StarRating
              value={formData.problemSolving}
              onChange={(rating) => handleRatingChange('problemSolving', rating)}
              label="문제 해결 능력"
            />
          </div>
        </div>

        {/* 커뮤니케이션 평가 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Languages size={20} className="mr-2 text-orange-600" />
            커뮤니케이션 평가 (1-5점)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating
              value={formData.clearCommunication}
              onChange={(rating) => handleRatingChange('clearCommunication', rating)}
              label="명확한 의사소통"
            />
            <StarRating
              value={formData.activeListening}
              onChange={(rating) => handleRatingChange('activeListening', rating)}
              label="적극적 경청"
            />
            <StarRating
              value={formData.culturalSensitivity}
              onChange={(rating) => handleRatingChange('culturalSensitivity', rating)}
              label="문화적 감수성"
            />
            <StarRating
              value={formData.groupManagement}
              onChange={(rating) => handleRatingChange('groupManagement', rating)}
              label="그룹 관리 능력"
            />
          </div>
        </div>

        {/* 구체적 평가 항목 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock size={20} className="mr-2 text-blue-600" />
            구체적 평가 항목
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시간 준수</label>
              <select
                name="punctuality"
                value={formData.punctuality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="항상준시">항상 준시</option>
                <option value="대체로준시">대체로 준시</option>
                <option value="가끔지연">가끔 지연</option>
                <option value="자주지연">자주 지연</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">외모 및 복장</label>
              <select
                name="appearance"
                value={formData.appearance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="매우적절">매우 적절</option>
                <option value="적절">적절</option>
                <option value="보통">보통</option>
                <option value="부적절">부적절</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">장비 및 준비</label>
              <select
                name="equipmentPreparation"
                value={formData.equipmentPreparation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="완벽준비">완벽 준비</option>
                <option value="잘준비됨">잘 준비됨</option>
                <option value="보통준비">보통 준비</option>
                <option value="준비부족">준비 부족</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">응급상황 대응</label>
              <select
                name="emergencyResponse"
                value={formData.emergencyResponse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">해당없음 또는 선택</option>
                <option value="매우우수">매우 우수</option>
                <option value="우수">우수</option>
                <option value="보통">보통</option>
                <option value="미흡">미흡</option>
              </select>
            </div>
          </div>
        </div>

        {/* 언어 능력 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Languages size={20} className="mr-2 text-green-600" />
            언어 능력 평가
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">주 사용 언어</label>
              <select
                name="primaryLanguage"
                value={formData.primaryLanguage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="한국어">한국어</option>
                <option value="영어">영어</option>
                <option value="중국어">중국어</option>
                <option value="일본어">일본어</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">보조 언어</label>
              <select
                name="secondaryLanguage"
                value={formData.secondaryLanguage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="한국어">한국어</option>
                <option value="영어">영어</option>
                <option value="중국어">중국어</option>
                <option value="일본어">일본어</option>
                <option value="없음">없음</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">언어 숙련도</label>
              <select
                name="languageProficiency"
                value={formData.languageProficiency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="원어민수준">원어민 수준</option>
                <option value="유창함">유창함</option>
                <option value="중급">중급</option>
                <option value="기초">기초</option>
              </select>
            </div>
          </div>
        </div>

        {/* 종합 평가 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star size={20} className="mr-2 text-yellow-500" />
            종합 평가
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating
              value={formData.overallSatisfaction}
              onChange={(rating) => handleRatingChange('overallSatisfaction', rating)}
              label="전반적 만족도"
            />
            <StarRating
              value={formData.recommendationWillingness}
              onChange={(rating) => handleRatingChange('recommendationWillingness', rating)}
              label="추천 의향"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">재이용 의향</label>
            <select
              name="rehireIntention"
              value={formData.rehireIntention}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              <option value="적극희망">적극 희망</option>
              <option value="희망">희망</option>
              <option value="보통">보통</option>
              <option value="고려중">고려 중</option>
              <option value="희망하지않음">희망하지 않음</option>
            </select>
          </div>
        </div>

        {/* 상세 피드백 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare size={20} className="mr-2 text-pink-600" />
            상세 피드백
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">인상적이었던 점</label>
              <textarea
                name="impressivePoints"
                value={formData.impressivePoints}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="가이드의 인상적이었던 서비스나 전문성에 대해 작성해주세요..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">개선이 필요한 영역</label>
              <textarea
                name="improvementAreas"
                value={formData.improvementAreas}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="개선이 필요한 부분이나 건의사항을 작성해주세요..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">특별한 사건이나 에피소드</label>
              <textarea
                name="specificIncidents"
                value={formData.specificIncidents}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="투어 중 발생한 특별한 사건이나 기억에 남는 에피소드가 있다면 작성해주세요..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">추가 의견</label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="기타 의견이나 제안사항을 자유롭게 작성해주세요..."
              />
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Save size={16} />
            <span>평가 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideServiceEvaluationTemplate;