import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, Users, Award, Sparkles } from 'lucide-react';
import vegas1 from '../assets/vegas1.jpg';
import vegas2 from '../assets/vegas2.jpg';
import vegas3 from '../assets/vegas3.jpg';
import vegas4 from '../assets/vegas4.jpg';
import tokyo1 from '../assets/tokyo1.jpg';
import tokyo2 from '../assets/tokyo2.jpg';
import tokyo3 from '../assets/tokyo3.jpg';
import tokyo4 from '../assets/tokyo4.jpg';


const NewCards = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const travelProducts = [
    {
      id: 1,
      title: "라스베가스 프리미엄 투어",
      location: "네바다, 미국",
      price: "1290000",
      duration: "4박 5일",
      maxGuests: 8,
      rating: 4.9,
      reviews: 127,
      hasStarGuide: true,
      image: vegas1,
      tags: ["럭셔리", "카지노", "쇼"],
      description: "네온사인이 빛나는 라스베가스에서 특별한 경험을"
    },
    {
      id: 2,
      title: "도쿄 벚꽃 로맨틱 여행",
      location: "도쿄, 일본",
      price: "890000",
      duration: "3박 4일",
      maxGuests: 6,
      rating: 4.8,
      reviews: 203,
      hasStarGuide: false,
      image: tokyo1,
      tags: ["벚꽃", "문화", "맛집"],
      description: "벚꽃이 만개한 도쿄에서 로맨틱한 순간들을"
    },
    {
      id: 3,
      title: "베가스 VIP 나이트 투어",
      location: "네바다, 미국",
      price: "2100000",
      duration: "3박 4일",
      maxGuests: 4,
      rating: 5.0,
      reviews: 89,
      hasStarGuide: true,
      image: tokyo2,
      tags: ["VIP", "나이트라이프", "럭셔리"],
      description: "베가스의 밤을 전문 가이드와 함께 특별하게"
    },
    {
      id: 4,
      title: "도쿄 현대문화 탐방",
      location: "도쿄, 일본",
      price: "750000",
      duration: "4박 5일",
      maxGuests: 10,
      rating: 4.7,
      reviews: 156,
      hasStarGuide: false,
      image: tokyo2,
      tags: ["현대문화", "쇼핑", "애니메이션"],
      description: "최신 트렌드와 전통이 공존하는 도쿄 탐험"
    },
    {
      id: 5,
      title: "라스베가스 그랜드캐년 투어",
      location: "네바다, 미국",
      price: "1450000",
      duration: "5박 6일",
      maxGuests: 12,
      rating: 4.9,
      reviews: 98,
      hasStarGuide: true,
      image: vegas3,
      tags: ["자연", "어드벤처", "사진"],
      description: "라스베가스와 그랜드캐년을 함께 즐기는 완벽한 조합"
    },
    {
      id: 6,
      title: "도쿄 미식 & 온센 힐링",
      location: "도쿄, 일본",
      price: "1200000",
      duration: "4박 5일",
      maxGuests: 8,
      rating: 4.8,
      reviews: 134,
      hasStarGuide: false,
      image: tokyo3,
      tags: ["미식", "온센", "힐링"],
      description: "도쿄 최고의 맛집과 온천에서 진정한 휴식을"
    }
  ];

  const filteredProducts = selectedFilter === 'all' 
    ? travelProducts 
    : selectedFilter === 'starGuide'
    ? travelProducts.filter(product => product.hasStarGuide)
    : travelProducts.filter(product => !product.hasStarGuide);

  const CardStyle1 = ({ product }) => (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          {product.hasStarGuide && (
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
              <Sparkles size={14} />
              스타가이드
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-blue-500" />
          <span className="text-gray-600 text-sm">{product.location}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {product.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              최대 {product.maxGuests}명
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({product.reviews})</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ₩{Number(product.price).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">1인당</div>
          </div>
        </div>
      </div>
    </div>
  );

  const CardStyle2 = ({ product }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="text-gray-500 text-sm font-medium">{product.location}</span>
          </div>
          {product.hasStarGuide && (
            <div className="bg-black text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <Award size={12} />
              STAR
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{product.title}</h3>
        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{product.duration}</span>
            <span>•</span>
            <span>최대 {product.maxGuests}명</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">₩{Number(product.price).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CardStyle3 = ({ product }) => (
    <div className="bg-white rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
      <div className="relative">
        <div className="h-52 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        {product.hasStarGuide && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <Sparkles size={12} />
            스타가이드
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{product.title}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin size={14} />
            {product.location}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">기간</span>
            <span className="font-medium">{product.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">인원</span>
            <span className="font-medium">최대 {product.maxGuests}명</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">평점</span>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-medium">{product.rating} ({product.reviews})</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">₩{Number(product.price).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">여행 상품 카드</h1>
                <p className="text-gray-600 text-sm">다양한 스타일의 여행 상품 카드 컴포넌트</p>
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedFilter('starGuide')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === 'starGuide' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles size={14} />
                스타가이드
              </button>
              <button
                onClick={() => setSelectedFilter('regular')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === 'regular' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                일반
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">미니멀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 3).map(product => (
              <CardStyle2 key={`apple-${product.id}`} product={product} />
            ))}
          </div>
        </section>

   
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">모던</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 3).map(product => (
              <CardStyle1 key={`sv-${product.id}`} product={product} />
            ))}
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">직관적</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <CardStyle3 key={`clean-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default NewCards;