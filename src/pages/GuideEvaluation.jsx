import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  Star,
  Calendar,
  User,
  MapPin,
  MessageSquare,
  ImageIcon,
  Video,
  ArrowLeft,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  Trophy,
  Heart,
  ThumbsUp,
  MoreHorizontal
} from 'lucide-react';

// Mock 데이터
const mockReviews = [
  {
    id: 1,
    author: '김영희',
    authorType: '회원',
    overallRating: 4.8,
    guideName: '김지현',
    createdAt: '2024-06-28',
    travelProduct: '도쿄 5박 6일 패키지',
    travelSchedule: '2024-06-15 ~ 2024-06-20',
    content: '정말 친절하고 전문적인 가이드였습니다. 도쿄의 숨겨진 명소들을 많이 알려주셔서 너무 만족스러웠어요. 특히 현지 맛집과 일본 문화 설명이 최고였습니다!',
    npsScore: 9,
    status: '승인',
    hasImage: true,
    hasVideo: false,
    hasProfanity: false,
    hasProfanity: false,
    images: ['../../src/assets/tokyo1.jpg'],
    fullContent: '정말 친절하고 전문적인 가이드였습니다. 도쿄의 숨겨진 명소들을 많이 알려주셔서 너무 만족스러웠어요. 특히 현지 맛집과 일본 문화 설명이 최고였습니다!         김지현님이 아사쿠사, 시부야, 하라주쿠 등 각 지역의 역사와 문화에 대해 상세히 설명해주셔서 단순한 관광이 아닌 진정한 일본 문화 체험을 할 수 있었습니다. 비가 왔던 날에도 실내 박물관과 쇼핑몰 코스를 준비해주셔서 일정이 전혀 지장받지 않았어요. 츠키지 시장에서의 스시 체험과 긴자에서의 쇼핑 가이드도 완벽했습니다!',
    ratings: {
      professionalism: 5,
      kindness: 5,
      knowledge: 4,
      communication: 5,
      punctuality: 5
    }
  },
  {
    id: 2,
    author: '이민수',
    authorType: '비회원',
    overallRating: 4.2,
    guideName: '박민수',
    createdAt: '2024-06-27',
    travelProduct: '라스베가스 4박 5일 투어',
    travelSchedule: '2024-06-20 ~ 2024-06-24',
    content: '라스베가스의 화려한 밤 문화와 쇼를 경험하며 멋진 시간을 보냈습니다. 가이드님의 설명이 재미있고 유익했어요.',
    npsScore: 8,
    status: '승인',
    hasImage: true,
    hasVideo: true,
    hasProfanity: false,
    images: ['../../src/assets/vegas1.jpg','../../src/assets/vegas2.jpg','../../src/assets/vegas3.jpg'],
    fullContent: '라스베가스의 화려한 밤 문화와 쇼를 경험하며 멋진 시간을 보냈습니다. 가이드님의 설명이 재미있고 유익했어요. 벨라지오 분수쇼부터 프리몬트 스트리트까지 다양한 명소를 구경할 수 있었고, 특히 시르크 드 솔레이 쇼 예약을 도와주셔서 감사했습니다. 박민수님이 카지노 에티켓과 팁들도 알려주셔서 안전하고 즐겁게 게임을 즐길 수 있었어요. 그랜드 캐니언 당일치기 투어도 환상적이었습니다!',
    ratings: {
      professionalism: 4,
      kindness: 4,
      knowledge: 4,
      communication: 5,
      punctuality: 4
    }
  },
  {
    id: 3,
    author: '박철민',
    authorType: '회원',
    overallRating: 3.8,
    guideName: '이정호',
    createdAt: '2024-06-26',
    travelProduct: '도쿄 문화 역사 투어',
    travelSchedule: '2024-06-22 ~ 2024-06-25',
    content: '일본 문화와 역사에 대한 설명은 좋았지만 시간 관리가 아쉬웠습니다. 일부 일정이 지연되어 마지막 코스를 못 본 게 아쉬워요.',
    npsScore: 6,
    status: '승인대기',
    hasImage: false,
    hasVideo: false,
    hasProfanity: false,
    images: [],
    fullContent: '일본 문화와 역사에 대한 설명은 좋았지만 시간 관리가 아쉬웠습니다. 일부 일정이 지연되어 마지막 코스를 못 본 게 아쉬워요. 센소지 절과 메이지 신궁에서의 설명은 정말 감동적이었는데, 각 장소에서 시간이 길어져서 계획했던 도쿄 스카이트리 전망대는 못 가봤습니다. 그래도 우에노 공원과 국립박물관에서의 일본 전통 문화 체험은 만족스러웠어요.',
    ratings: {
      professionalism: 4,
      kindness: 4,
      knowledge: 5,
      communication: 3,
      punctuality: 2
    }
  },
  {
    id: 4,
    author: '정유진',
    authorType: '비회원',
    overallRating: 4.5,
    guideName: '최수연',
    createdAt: '2024-06-25',
    travelProduct: '라스베가스 럭셔리 투어',
    travelSchedule: '2024-06-18 ~ 2024-06-21',
    content: '라스베가스의 럭셔리한 면모를 경험할 수 있었고, 가이드님이 현지 문화와 엔터테인먼트를 잘 알려주셨어요. 다음에도 또 이용하고 싶습니다!',
    npsScore: 9,
    status: '승인',
    hasImage: true,
    hasVideo: false,
    images: ['../../src/assets/vegas2.jpg'],
    fullContent: '라스베가스의 럭셔리한 면모를 경험할 수 있었고, 가이드님이 현지 문화와 엔터테인먼트를 잘 알려주셨어요. 다음에도 또 이용하고 싶습니다! 벨라지오와 웨인 호텔의 고급 레스토랑 예약부터 VIP 쇼 티켓까지 모든 것을 완벽하게 준비해주셨어요. 최수연님이 추천해주신 하이엔드 쇼핑몰과 스파 체험도 최고였고, 안전에도 신경 많이 써주셔서 안심하고 여행할 수 있었습니다. 후버댐과 레드록 캐니언 투어도 잊을 수 없는 추억이에요!',
    ratings: {
      professionalism: 5,
      kindness: 5,
      knowledge: 4,
      communication: 4,
      punctuality: 5
    }
  },
  {
    id: 5,
    author: '송민아',
    authorType: '회원',
    overallRating: 2.5,
    guideName: '조영우',
    createdAt: '2024-06-24',
    travelProduct: '도쿄 야경 투어',
    travelSchedule: '2024-06-21 ~ 2024-06-22',
    content: '기대했던 만큼 좋지 않았습니다. 설명도 부족하고 친절도가 떨어졌어요.',
    npsScore: 4,
    status: '승인',
    hasImage: false,
    hasVideo: false,
    hasProfanity: false,
    images: [],
    fullContent: '기대했던 만큼 좋지 않았습니다. 설명도 부족하고 친절도가 떨어졌어요. 도쿄 타워와 스카이트리에서의 야경은 아름다웠지만, 가이드님이 관심이 없어 보이셔서 아쉬웠습니다. 질문에 대한 답변도 성의없어 보였고, 특히 일본어 의사소통에서 도움을 요청했을 때도 별로 협조적이지 않으셨어요. 전반적으로 서비스 개선이 필요해 보입니다.',
    ratings: {
      professionalism: 2,
      kindness: 2,
      knowledge: 3,
      communication: 2,
      punctuality: 4
    }
  },
  {
    id: 6,
    author: '한동석',
    authorType: '비회원',
    overallRating: 1.5,
    guideName: '이정호',
    createdAt: '2024-06-23',
    travelProduct: '도쿄 문화 역사 투어',
    travelSchedule: '2024-06-19 ~ 2024-06-20',
    content: '최악의 가이드였습니다. 돈만 받고 제대로 안내도 안해주고 바보같은 설명만 늘어놓네요.',
    npsScore: 2,
    status: '거절',
    hasImage: false,
    hasVideo: false,
    hasProfanity: true,
    images: [],
    fullContent: '최악의 가이드였습니다. 돈만 받고 제대로 안내도 안해주고 바보같은 설명만 늘어놓네요. 시간도 지키지 않고 멍청하게 길까지 헤매면서 일정을 다 망쳤어요. 이런 바보 가이드는 처음 봤습니다. 완전 돈 아까웠고 최악의 여행이었어요.',
    ratings: {
      professionalism: 1,
      kindness: 1,
      knowledge: 2,
      communication: 1,
      punctuality: 1
    }
  }
];

const GuideEvaluation = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail'
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [memberFilter, setMemberFilter] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');

  // 욕설 감지 함수 (간단한 필터링)
  const checkProfanity = (text) => {
    const profanityWords = ['바보', '멍청', '최악', '돈만받고', '쓰레기', '개같은', '병신', '미친'];
    return profanityWords.some(word => text.includes(word));
  };

  // 필터링된 후기 목록
  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = 
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.guideName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.travelProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '전체' || review.status === statusFilter;
    const matchesMember = memberFilter === '전체' || review.authorType === memberFilter;
    
    return matchesSearch && matchesStatus && matchesMember;
  }).sort((a, b) => {
    switch (sortBy) {
      case '최신순':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case '평점높은순':
        return b.overallRating - a.overallRating;
      case '평점낮은순':
        return a.overallRating - b.overallRating;
      default:
        return 0;
    }
  });

  // 상세보기
  const handleViewDetail = (review) => {
    setSelectedReview(review);
    setCurrentView('detail');
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedReview(null);
  };

  // 상태별 색상
  const getStatusColor = (status) => {
    switch (status) {
      case '승인': return 'text-emerald-600 bg-emerald-50';
      case '승인대기': return 'text-yellow-600 bg-yellow-50';
      case '거절': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // NPS 스코어 색상
  const getNpsColor = (score) => {
    if (score >= 9) return 'text-emerald-600 bg-emerald-50';
    if (score >= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // 통계 데이터
  const totalReviews = mockReviews.length;
  const approvedReviews = mockReviews.filter(r => r.status === '승인').length;
  const pendingReviews = mockReviews.filter(r => r.status === '승인대기').length;
  const avgRating = (mockReviews.reduce((sum, r) => sum + r.overallRating, 0) / totalReviews).toFixed(1);

  // 별점 컴포넌트
  const StarRating = ({ rating, size = 16 }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );

  // 목록 보기
  if (currentView === 'list') {
    return (
      <div className="p-6 space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">가이드 후기 관리</h1>
          <p className="text-gray-500 mt-1">고객이 작성한 가이드 후기를 관리합니다</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">욕설 포함 여부</label>
                <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedReview?.hasProfanity ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
                }`}>
                  {selectedReview?.hasProfanity ? '욕설 포함' : '욕설 없음'}
                </span>
                {selectedReview?.hasProfanity && (
                  <p className="text-sm text-red-600 mt-1">비방/욕설이 포함된 후기입니다.</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">전체 후기</p>
                <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">승인된 후기</p>
                <p className="text-2xl font-bold text-gray-900">{approvedReviews}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">승인 대기</p>
                <p className="text-2xl font-bold text-gray-900">{pendingReviews}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">평균 평점</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Star size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* 검색 */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="작성자, 가이드명, 여행상품으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 필터 */}
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 상태</option>
                <option value="승인">승인</option>
                <option value="승인대기">승인대기</option>
                <option value="거절">거절</option>
              </select>

              <select
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 회원</option>
                <option value="회원">회원</option>
                <option value="비회원">비회원</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="최신순">최신순</option>
                <option value="평점높은순">평점 높은순</option>
                <option value="평점낮은순">평점 낮은순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 후기 목록 */}
        <div className="bg-white rounded-xl border border-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">작성자</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">평점</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">가이드명</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">작성일</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">여행상품</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">여행일정</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">NPS</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">회원유형</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">상태</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">욕설여부</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">미디어</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{review.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StarRating rating={review.overallRating} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{review.guideName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{review.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{review.travelProduct}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{review.travelSchedule}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNpsColor(review.npsScore)}`}>
                        {review.npsScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.authorType === '회원' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 bg-gray-50'
                      }`}>
                        {review.authorType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.hasProfanity ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
                      }`}>
                        {review.hasProfanity ? '포함' : '없음'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {review.hasImage && (
                          <ImageIcon size={16} className="text-green-600" />
                        )}
                        {review.hasVideo && (
                          <Video size={16} className="text-purple-600" />
                        )}
                        {!review.hasImage && !review.hasVideo && (
                          <span className="text-gray-400 text-xs">없음</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetail(review)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={14} />
                        <span className="text-sm">상세보기</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200/50 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색어나 필터 조건을 시도해보세요.</p>
          </div>
        )}
      </div>
    );
  }

  // 상세보기
  if (currentView === 'detail' && selectedReview) {
    return (
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToList}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">후기 상세보기</h1>
            <p className="text-gray-500 mt-1">{selectedReview.author}님의 후기</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200/50 space-y-8">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedReview.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedReview.author}</p>
                    <p className="text-sm text-gray-500">{selectedReview.authorType}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">가이드명</label>
                <p className="text-gray-900 font-medium">{selectedReview.guideName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">여행 상품</label>
                <p className="text-gray-900">{selectedReview.travelProduct}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">여행 일정</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Calendar size={16} />
                  <span>{selectedReview.travelSchedule}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">전체 평점</label>
                <div className="flex items-center space-x-3">
                  <StarRating rating={selectedReview.overallRating} size={20} />
                  <span className="text-2xl font-bold text-gray-900">{selectedReview.overallRating}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NPS 스코어</label>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getNpsColor(selectedReview.npsScore)}`}>
                    {selectedReview.npsScore}/10
                  </span>
                  <span className="text-gray-500 text-sm">
                    {selectedReview.npsScore >= 9 ? '추천고객' : selectedReview.npsScore >= 7 ? '중립고객' : '비추천고객'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedReview.status)}`}>
                  {selectedReview.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">작성일</label>
                <p className="text-gray-900">{selectedReview.createdAt}</p>
              </div>
            </div>
          </div>

          {/* 세부 평점 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">세부 평가</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(selectedReview.ratings).map(([key, rating]) => {
                const labels = {
                  professionalism: '전문성',
                  kindness: '친절도',
                  knowledge: '지식',
                  communication: '소통능력',
                  punctuality: '시간관리'
                };
                
                return (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{labels[key]}</span>
                      <span className="text-sm font-bold text-gray-900">{rating}/5</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 후기 내용 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">후기 내용</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedReview.fullContent}</p>
            </div>
          </div>

          {/* 첨부 이미지 */}
          {selectedReview.hasImage && selectedReview.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">첨부 이미지</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedReview.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`후기 이미지 ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0Q1RDdEOSIvPgo8cGF0aCBkPSJNODAgMTAwSDEyMFYxMjBIODBWMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 관리 버튼 */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            {selectedReview?.status === '승인대기' && (
              <>
                <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  승인
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  거절
                </button>
              </>
            )}
            <button
              onClick={handleBackToList}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GuideEvaluation;