import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  MessageCircle,
  Building,
  Upload,
  ArrowLeft,
  Check,
  X,
  Clock,
  Instagram,
  Youtube,
  Globe,
  FileText,
  Star,
  Eye,
  MessageSquare
} from 'lucide-react';
import vegas1 from '../assets/vegas1.jpg';
import vegas2 from '../assets/vegas2.jpg';
import vegas3 from '../assets/vegas3.jpg';
import vegas4 from '../assets/vegas4.jpg';
import tokyo1 from '../assets/tokyo1.jpg';
import tokyo2 from '../assets/tokyo2.jpg';
import tokyo3 from '../assets/tokyo3.jpg';
import tokyo4 from '../assets/tokyo4.jpg';


// Mock 랜드사 데이터
const mockLandCompanies = [
  {
    id: 1,
    uuid: 'LAND-2024-001',
    organizationName: 'A랜드사',
    organizationType: '랜드사',
    businessType: '법인사업자'
  },
  {
    id: 2,
    uuid: 'LAND-2024-002',
    organizationName: '인솔자연합',
    organizationType: '연합',
    businessType: '개인사업자'
  }
];

// Mock 평가 데이터 (GuideEvaluation.jsx에서 가져온 데이터)
const mockReviews = [
  {
    id: 1,
    author: '김영희',
    authorType: '회원',
    overallRating: 4.8,
    guideName: '김가이드',
    createdAt: '2024-06-15',
    travelProduct: '제주도 2박 3일 힐링 투어',
    travelSchedule: '2024-06-10 ~ 2024-06-12',
    content: '제주도의 아름다운 자연을 만끽할 수 있는 환상적인 여행이었습니다.',
    npsScore: 9,
    status: '승인',
    hasImage: true,
    hasVideo: false,
    hasProfanity: false,
    images: [tokyo1,tokyo2],
    fullContent: '제주도의 아름다운 자연을 만끽할 수 있는 환상적인 여행이었습니다. 김가이드님의 전문적인 설명과 친절한 서비스 덕분에 제주도의 숨겨진 명소들을 발견할 수 있었어요. 특히 성산일출봉에서의 일출과 한라산 트레킹은 잊을 수 없는 추억이 되었습니다. 맛집 추천도 정말 좋았고, 현지 문화에 대한 깊이 있는 설명이 인상적이었습니다.',
    ratings: {
      professionalism: 5,
      kindness: 5,
      knowledge: 5,
      communication: 4,
      punctuality: 5
    }
  },
  {
    id: 2,
    author: '이민수',
    authorType: '비회원',
    overallRating: 4.2,
    guideName: '김가이드',
    createdAt: '2024-06-27',
    travelProduct: '라스베가스 4박 5일 투어',
    travelSchedule: '2024-06-20 ~ 2024-06-24',
    content: '라스베가스의 화려한 밤 문화와 쇼를 경험하며 멋진 시간을 보냈습니다.',
    npsScore: 8,
    status: '승인',
    hasImage: true,
    hasVideo: true,
    hasProfanity: false,
    images: [vegas1,vegas2,vegas3],
    fullContent: '라스베가스의 화려한 밤 문화와 쇼를 경험하며 멋진 시간을 보냈습니다. 가이드님의 설명이 재미있고 유익했어요. 벨라지오 분수쇼부터 프리몬트 스트리트까지 다양한 명소를 구경할 수 있었고, 특히 시르크 드 솔레이 쇼 예약을 도와주셔서 감사했습니다. 김가이드님이 카지노 에티켓과 팁들도 알려주셔서 안전하고 즐겁게 게임을 즐길 수 있었어요.',
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
    author: '박서준',
    authorType: '회원',
    overallRating: 3.8,
    guideName: '이인솔',
    createdAt: '2024-07-01',
    travelProduct: '유럽 7박 8일 문화 투어',
    travelSchedule: '2024-06-25 ~ 2024-07-02',
    content: '유럽의 역사와 문화를 체험할 수 있는 의미있는 여행이었습니다.',
    npsScore: 7,
    status: '승인',
    hasImage: false,
    hasVideo: false,
    hasProfanity: false,
    images: [],
    fullContent: '유럽의 역사와 문화를 체험할 수 있는 의미있는 여행이었습니다. 이인솔님의 깊이 있는 역사 지식과 현지 경험이 여행을 더욱 풍성하게 만들어주었어요. 다만 일정이 조금 빡빡했던 점은 아쉬웠습니다.',
    ratings: {
      professionalism: 4,
      kindness: 4,
      knowledge: 5,
      communication: 3,
      punctuality: 3
    }
  }
];

// Mock 가이드 데이터 (평가 통계 포함)
const mockGuides = [
  {
    id: 1,
    profileImage: null,
    name: '김가이드',
    phone: '010-1234-5678',
    email: 'guide@example.com',
    snsType: '카카오톡',
    snsId: 'guide_kim',
    landCompanyId: 1,
    landCompanyName: 'A랜드사',
    guideType: '가이드',
    employmentType: '정규직',
    status: '활성',
    instagramUrl: 'https://instagram.com/guide_kim',
    youtubeUrl: '',
    blogUrl: '',
    adminMemo: '경험이 풍부한 가이드',
    createdAt: '2024-01-15',
    // 평가 통계
    reviewCount: 2,
    averageRating: 4.5,
    reviews: mockReviews.filter(review => review.guideName === '김가이드')
  },
  {
    id: 2,
    profileImage: null,
    name: '이인솔',
    phone: '010-9876-5432',
    email: 'leader@example.com',
    snsType: 'WeChat',
    snsId: 'leader_lee',
    landCompanyId: 1,
    landCompanyName: '인솔자연합',
    guideType: '인솔자',
    employmentType: '프리랜서',
    status: '활성',
    instagramUrl: '',
    youtubeUrl: 'https://youtube.com/@leader_lee',
    blogUrl: 'https://blog.naver.com/leader_lee',
    adminMemo: '중국어 전문 인솔자',
    createdAt: '2024-02-01',
    // 평가 통계
    reviewCount: 1,
    averageRating: 3.8,
    reviews: mockReviews.filter(review => review.guideName === '이인솔')
  }
];

const GuideManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'register', 'edit', 'reviews'
  const [guides, setGuides] = useState(mockGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [guideTypeFilter, setGuideTypeFilter] = useState('전체');
  const [landCompanyFilter, setLandCompanyFilter] = useState('전체');
  const [editingGuide, setEditingGuide] = useState(null);
  const [selectedGuideReviews, setSelectedGuideReviews] = useState(null);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    phone: '',
    email: '',
    snsType: '카카오톡',
    snsId: '',
    landCompanyId: '',
    guideType: '가이드',
    employmentType: '정규직',
    status: '활성',
    instagramUrl: '',
    youtubeUrl: '',
    blogUrl: '',
    adminMemo: ''
  });

  // 통계 데이터
  const totalGuides = guides.length;
  const activeGuides = guides.filter(guide => guide.status === '활성').length;
  const totalGuidesType = guides.filter(guide => guide.guideType === '가이드').length;
  const totalLeadersType = guides.filter(guide => guide.guideType === '인솔자').length;

  // 필터링된 데이터
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.phone.includes(searchTerm) ||
                         guide.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.landCompanyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '전체' || guide.status === statusFilter;
    const matchesGuideType = guideTypeFilter === '전체' || guide.guideType === guideTypeFilter;
    const matchesLandCompany = landCompanyFilter === '전체' || guide.landCompanyId.toString() === landCompanyFilter;
    
    return matchesSearch && matchesStatus && matchesGuideType && matchesLandCompany;
  });

  // 폼 리셋
  const resetForm = () => {
    setFormData({
      profileImage: null,
      name: '',
      phone: '',
      email: '',
      snsType: '카카오톡',
      snsId: '',
      landCompanyId: '',
      guideType: '가이드',
      employmentType: '정규직',
      status: '활성',
      instagramUrl: '',
      youtubeUrl: '',
      blogUrl: '',
      adminMemo: ''
    });
  };

  // 입력 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = () => {
    if (currentView === 'register') {
      const newGuide = {
        id: Math.max(...guides.map(g => g.id)) + 1,
        ...formData,
        landCompanyName: mockLandCompanies.find(c => c.id.toString() === formData.landCompanyId)?.organizationName || '',
        createdAt: new Date().toISOString().split('T')[0],
        reviewCount: 0,
        averageRating: 0,
        reviews: []
      };
      setGuides(prev => [...prev, newGuide]);
    } else if (currentView === 'edit') {
      setGuides(prev => prev.map(guide => 
        guide.id === editingGuide.id 
          ? { 
              ...guide, 
              ...formData,
              landCompanyName: mockLandCompanies.find(c => c.id.toString() === formData.landCompanyId)?.organizationName || guide.landCompanyName
            }
          : guide
      ));
    }
    setCurrentView('list');
    resetForm();
    setEditingGuide(null);
  };

  // 수정 핸들러
  const handleEdit = (guide) => {
    setEditingGuide(guide);
    setFormData({
      profileImage: guide.profileImage,
      name: guide.name,
      phone: guide.phone,
      email: guide.email,
      snsType: guide.snsType,
      snsId: guide.snsId,
      landCompanyId: guide.landCompanyId.toString(),
      guideType: guide.guideType,
      employmentType: guide.employmentType,
      status: guide.status,
      instagramUrl: guide.instagramUrl,
      youtubeUrl: guide.youtubeUrl,
      blogUrl: guide.blogUrl,
      adminMemo: guide.adminMemo
    });
    setCurrentView('edit');
  };

  // 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setGuides(prev => prev.filter(guide => guide.id !== id));
    }
  };

  // 등록 화면으로 이동
  const handleRegister = () => {
    resetForm();
    setCurrentView('register');
  };

  // 후기 보기 핸들러
  const handleViewReviews = (guide) => {
    setSelectedGuideReviews(guide);
    setCurrentView('reviews');
  };

  // 통계 카드 컴포넌트
  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          color === 'text-blue-600' ? 'bg-blue-50' : 
          color === 'text-emerald-600' ? 'bg-emerald-50' : 
          color === 'text-purple-600' ? 'bg-purple-50' :
          'bg-orange-50'
        }`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  // 가이드 테이블 헤더
  const TableHeader = () => (
    <div className="bg-gray-50 rounded-t-xl border-b border-gray-200 overflow-x-auto">
      <div className="min-w-[1200px] p-4">
        <div className="flex items-center w-full">
          <div className="w-48 text-sm font-medium text-gray-700 px-2">가이드 정보</div>
          <div className="w-44 text-sm font-medium text-gray-700 px-2">연락처</div>
          <div className="w-48 text-sm font-medium text-gray-700 px-2">소속 단체</div>
          <div className="w-24 text-sm font-medium text-gray-700 px-2">유형</div>
          <div className="w-28 text-sm font-medium text-gray-700 px-2">고용형태</div>
          <div className="w-24 text-sm font-medium text-gray-700 px-2">상태</div>
          <div className="w-48 text-sm font-medium text-gray-700 px-2">평가 현황</div>
          <div className="w-32 text-sm font-medium text-gray-700 px-2">SNS</div>
          <div className="w-20 text-sm font-medium text-gray-700 px-2">관리</div>
        </div>
      </div>
    </div>
  );

  // 별점 표시 컴포넌트
  const StarRating = ({ rating, size = 14 }) => (
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

  // 가이드 테이블 행 컴포넌트 (flex 레이아웃으로 수정)
  const GuideRow = ({ guide }) => (
    <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors overflow-x-auto">
      <div className="min-w-[1200px] p-4">
        <div className="flex items-center w-full">
          {/* 가이드 정보 */}
          <div className="w-48 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                {guide.profileImage ? (
                  <img 
                    src={guide.profileImage} 
                    alt={guide.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-medium text-sm">
                    {guide.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{guide.name}</p>
                <p className="text-sm text-gray-500">{guide.createdAt}</p>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="w-44 px-2">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate">{guide.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate">{guide.email}</span>
              </div>
            </div>
          </div>

          {/* 소속 단체 */}
          <div className="w-48 px-2">
            <div className="space-y-1">
              <p className="font-medium text-gray-900 text-sm truncate">{guide.landCompanyName}</p>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate">{guide.snsType}: {guide.snsId}</span>
              </div>
            </div>
          </div>

          {/* 유형 */}
          <div className="w-24 px-2">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              guide.guideType === '가이드' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
            }`}>
              {guide.guideType}
            </span>
          </div>

          {/* 고용형태 */}
          <div className="w-28 px-2">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              guide.employmentType === '정규직' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
            }`}>
              {guide.employmentType}
            </span>
          </div>

          {/* 상태 */}
          <div className="w-24 px-2">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              guide.status === '활성' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
            }`}>
              {guide.status}
            </span>
          </div>

          {/* 평가 현황 */}
          <div className="w-48 px-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">후기 {guide.reviewCount}개</span>

              </div>
              {guide.reviewCount > 0 ? (
                <StarRating rating={guide.averageRating} />
              ) : (
                <span className="text-sm text-gray-400">평가 없음</span>
              )}
            </div>
          </div>

          {/* SNS */}
          <div className="w-32 px-2">
            <div className="flex items-center space-x-2">
              {guide.instagramUrl && (
                <a 
                  href={guide.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {guide.youtubeUrl && (
                <a 
                  href={guide.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700"
                  title="YouTube"
                >
                  <Youtube size={16} />
                </a>
              )}
              {guide.blogUrl && (
                <a 
                  href={guide.blogUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                  title="Blog"
                >
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>

          {/* 관리 */}
          <div className="w-20 px-2">
            <div className="flex items-center space-x-2">
              <button
                    onClick={() => handleViewReviews(guide)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    보기
              </button>
              <button
                onClick={() => handleEdit(guide)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="수정"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleDelete(guide.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="삭제"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 후기 보기 화면
  if (currentView === 'reviews') {
    return (
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('list')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedGuideReviews?.name} 후기 목록
            </h1>
            <p className="text-gray-500 mt-1">
              총 {selectedGuideReviews?.reviewCount}개의 후기 • 평균 평점 {selectedGuideReviews?.averageRating}
            </p>
          </div>
        </div>

        {/* 후기 목록 */}
        <div className="space-y-4">
          {selectedGuideReviews?.reviews && selectedGuideReviews.reviews.length > 0 ? (
            selectedGuideReviews.reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{review.author}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{review.authorType}</span>
                        <span>{review.createdAt}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.status === '승인' ? 'bg-emerald-100 text-emerald-600' :
                          review.status === '승인대기' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.overallRating} size={16} />
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">여행 상품: {review.travelProduct}</p>
                  <p className="text-gray-600 text-sm">여행 일정: {review.travelSchedule}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{review.content}</p>
                </div>

                {/* 세부 평점 */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">전문성</p>
                    <div className="flex justify-center">
                      <StarRating rating={review.ratings.professionalism} size={12} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">친절함</p>
                    <div className="flex justify-center">
                      <StarRating rating={review.ratings.kindness} size={12} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">지식</p>
                    <div className="flex justify-center">
                      <StarRating rating={review.ratings.knowledge} size={12} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">소통</p>
                    <div className="flex justify-center">
                      <StarRating rating={review.ratings.communication} size={12} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">시간 준수</p>
                    <div className="flex justify-center">
                      <StarRating rating={review.ratings.punctuality} size={12} />
                    </div>
                  </div>
                </div>

                {/* 첨부 파일 표시 */}
                {(review.hasImage || review.hasVideo) && (
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                    {review.hasImage && (
                      <div className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        <span>이미지 첨부</span>
                      </div>
                    )}
                    {review.hasVideo && (
                      <div className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        <span>동영상 첨부</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200/50">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">작성된 후기가 없습니다</h3>
              <p className="text-gray-500">아직 이 가이드에 대한 후기가 작성되지 않았습니다.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 목록 화면
  if (currentView === 'list') {
    return (
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">가이드&인솔자 관리</h1>
            <p className="text-gray-500 mt-1">가이드 및 인솔자 등록 및 관리</p>
          </div>
          <button
            onClick={handleRegister}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            <span>가이드/인솔자 등록</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="전체 인원" 
            value={totalGuides} 
            color="text-blue-600" 
            icon={User} 
          />
          <StatCard 
            title="활성 인원" 
            value={activeGuides} 
            color="text-emerald-600" 
            icon={Check} 
          />
          <StatCard 
            title="가이드" 
            value={totalGuidesType} 
            color="text-purple-600" 
            icon={User} 
          />
          <StatCard 
            title="인솔자" 
            value={totalLeadersType} 
            color="text-orange-600" 
            icon={User} 
          />
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 전화번호, 이메일, 소속으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 상태</option>
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
              </select>
            </div>

            <div>
              <select
                value={guideTypeFilter}
                onChange={(e) => setGuideTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 유형</option>
                <option value="가이드">가이드</option>
                <option value="인솔자">인솔자</option>
              </select>
            </div>

            <div>
              <select
                value={landCompanyFilter}
                onChange={(e) => setLandCompanyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체 소속</option>
                {mockLandCompanies.map(company => (
                  <option key={company.id} value={company.id.toString()}>
                    {company.organizationName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 가이드 목록 테이블 */}
        <div className="bg-white rounded-xl border border-gray-200/50 overflow-hidden">
          <TableHeader />
          <div className="divide-y divide-gray-100">
            {filteredGuides.map(guide => (
              <GuideRow key={guide.id} guide={guide} />
            ))}
          </div>
        </div>

        {filteredGuides.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200/50">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">가이드/인솔자가 없습니다</h3>
            <p className="text-gray-500 mb-4">검색 조건을 확인하거나 새로운 가이드/인솔자를 등록해보세요.</p>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              가이드/인솔자 등록
            </button>
          </div>
        )}
      </div>
    );
  }

  // 등록/수정 화면
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentView('list')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentView === 'register' ? '가이드/인솔자 등록' : '가이드/인솔자 정보 수정'}
          </h1>
          <p className="text-gray-500 mt-1">
            {currentView === 'register' ? '새로운 가이드/인솔자 정보를 입력해주세요' : '가이드/인솔자 정보를 수정해주세요'}
          </p>
        </div>
      </div>

      {/* 등록/수정 폼 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200/50 space-y-6">
        {/* 프로필 사진 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">프로필 정보</h3>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="프로필" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <button 
                type="button"
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <Upload size={14} className="inline mr-1" />
                사진 업로드
              </button>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">전화번호 *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">소속 단체 *</label>
              <select
                name="landCompanyId"
                value={formData.landCompanyId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">소속을 선택하세요</option>
                {mockLandCompanies.map(company => (
                  <option key={company.id} value={company.id.toString()}>
                    {company.organizationName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">유형 *</label>
              <select
                name="guideType"
                value={formData.guideType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="가이드">가이드</option>
                <option value="인솔자">인솔자</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">고용 형태</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="정규직">정규직</option>
                <option value="프리랜서">프리랜서</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
              </select>
            </div>
          </div>
        </div>

        {/* SNS 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SNS 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SNS 유형</label>
              <select
                name="snsType"
                value={formData.snsType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="카카오톡">카카오톡</option>
                <option value="WeChat">WeChat</option>
                <option value="라인">라인</option>
                <option value="텔레그램">텔레그램</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SNS ID</label>
              <input
                type="text"
                name="snsId"
                value={formData.snsId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SNS ID를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                placeholder="https://youtube.com/@username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog URL</label>
              <input
                type="url"
                name="blogUrl"
                value={formData.blogUrl}
                onChange={handleInputChange}
                placeholder="https://blog.naver.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 관리자 메모 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">관리자 메모</label>
          <textarea
            name="adminMemo"
            value={formData.adminMemo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="관리자용 메모를 입력하세요..."
          />
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setCurrentView('list')}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {currentView === 'register' ? '등록' : '수정'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideManagement;