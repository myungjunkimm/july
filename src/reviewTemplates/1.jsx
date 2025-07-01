import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Star, 
  Building, 
  Users, 
  Phone, 
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';

const LandCompanyEvaluationTemplate = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // 기본 정보
    landCompanyName: '',
    evaluationDate: '',
    evaluatorName: '',
    
    // 평가 항목들 (1-5점 척도)
    serviceQuality: 0,
    responseTime: 0,
    professionalism: 0,
    communication: 0,
    reliability: 0,
    priceCompetitiveness: 0,
    guideQuality: 0,
    tourProgramQuality: 0,
    customerService: 0,
    problemSolving: 0,
    
    // 추가 평가
    overallSatisfaction: 0,
    recommendationWillingness: 0,
    
    // 텍스트 피드백
    strengthPoints: '',
    improvementPoints: '',
    additionalComments: '',
    
    // 선택형 질문
    contractConditions: '',
    paymentTerms: '',
    communicationChannel: '',
    
    // 재계약 의향
    renewalIntention: ''
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
    console.log('랜드사 평가 데이터:', formData);
    alert('평가가 저장되었습니다.');
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

  // 평가 항목 그룹
  const evaluationItems = [
    { key: 'serviceQuality', label: '서비스 품질' },
    { key: 'responseTime', label: '응답 속도' },
    { key: 'professionalism', label: '전문성' },
    { key: 'communication', label: '의사소통' },
    { key: 'reliability', label: '신뢰성' },
    { key: 'priceCompetitiveness', label: '가격 경쟁력' },
    { key: 'guideQuality', label: '가이드 품질' },
    { key: 'tourProgramQuality', label: '투어 프로그램 품질' },
    { key: 'customerService', label: '고객 서비스' },
    { key: 'problemSolving', label: '문제 해결 능력' }
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">랜드사 기본 평가</h1>
          <p className="text-gray-500 mt-1">랜드사의 기본적인 서비스 품질을 평가해주세요</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200/50 space-y-8">
        {/* 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building size={20} className="mr-2 text-blue-600" />
            기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                랜드사명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="landCompanyName"
                value={formData.landCompanyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">평가일</label>
              <input
                type="date"
                name="evaluationDate"
                value={formData.evaluationDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
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

        {/* 상세 평가 항목 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star size={20} className="mr-2 text-yellow-500" />
            상세 평가 (1-5점)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluationItems.map(item => (
              <StarRating
                key={item.key}
                value={formData[item.key]}
                onChange={(rating) => handleRatingChange(item.key, rating)}
                label={item.label}
              />
            ))}
          </div>
        </div>

        {/* 종합 평가 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2 text-emerald-600" />
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
        </div>

        {/* 선택형 질문 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users size={20} className="mr-2 text-purple-600" />
            추가 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">계약 조건</label>
              <select
                name="contractConditions"
                value={formData.contractConditions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="매우만족">매우 만족</option>
                <option value="만족">만족</option>
                <option value="보통">보통</option>
                <option value="불만족">불만족</option>
                <option value="매우불만족">매우 불만족</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">결제 조건</label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="적절함">적절함</option>
                <option value="보통">보통</option>
                <option value="개선필요">개선 필요</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">주요 소통 채널</label>
              <select
                name="communicationChannel"
                value={formData.communicationChannel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="전화">전화</option>
                <option value="이메일">이메일</option>
                <option value="카카오톡">카카오톡</option>
                <option value="위챗">위챗</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">재계약 의향</label>
              <select
                name="renewalIntention"
                value={formData.renewalIntention}
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
        </div>

        {/* 텍스트 피드백 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare size={20} className="mr-2 text-orange-600" />
            상세 피드백
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">강점 및 우수한 점</label>
              <textarea
                name="strengthPoints"
                value={formData.strengthPoints}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="랜드사의 강점이나 우수한 서비스에 대해 작성해주세요..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">개선이 필요한 점</label>
              <textarea
                name="improvementPoints"
                value={formData.improvementPoints}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="개선이 필요한 부분이나 건의사항을 작성해주세요..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기타 의견</label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="추가적인 의견이나 특이사항을 작성해주세요..."
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

export default LandCompanyEvaluationTemplate;