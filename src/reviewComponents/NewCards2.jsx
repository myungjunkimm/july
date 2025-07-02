import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, Users, Award, Sparkles, ChevronLeft, ChevronRight, Heart, Share2, Bookmark, Camera } from 'lucide-react';

const NewCards2 = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState({});

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
      images: ["../../src/assets/vegas1.jpg", "../../src/assets/vegas2.jpg", "../../src/assets/vegas3.jpg", "../../src/assets/vegas4.jpg"],
      tags: ["럭셔리", "카지노", "쇼"],
      description: "네온사인이 빛나는 라스베가스에서 특별한 경험을",
      highlights: ["프리미엄 호텔", "VIP 쇼 관람", "카지노 체험", "그랜드캐년 투어"]
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
      images: ["../../src/assets/tokyo1.jpg", "../../src/assets/tokyo2.jpg", "../../src/assets/tokyo3.jpg", "../../src/assets/tokyo4.jpg"],
      tags: ["벚꽃", "문화", "맛집"],
      description: "벚꽃이 만개한 도쿄에서 로맨틱한 순간들을",
      highlights: ["벚꽃 명소", "전통 료칸", "미슐랭 맛집", "문화 체험"]
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
      images: ["../../src/assets/vegas2.jpg", "../../src/assets/vegas1.jpg", "../../src/assets/vegas4.jpg", "../../src/assets/vegas3.jpg"],
      tags: ["VIP", "나이트라이프", "럭셔리"],
      description: "베가스의 밤을 전문 가이드와 함께 특별하게",
      highlights: ["VIP 클럽", "개인 가이드", "프라이빗 투어", "럭셔리 숙박"]
    }
  ];

  const filteredProducts = selectedFilter === 'all' 
    ? travelProducts 
    : selectedFilter === 'starGuide'
    ? travelProducts.filter(product => product.hasStarGuide)
    : travelProducts.filter(product => !product.hasStarGuide);

  const nextImage = (productId) => {
    const product = travelProducts.find(p => p.id === productId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % product.images.length
    }));
  };

  const prevImage = (productId) => {
    const product = travelProducts.find(p => p.id === productId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + product.images.length) % product.images.length
    }));
  };

  // Airbnb Style Card
  const AirbnbCard = ({ product }) => {
    const currentIndex = currentImageIndex[product.id] || 0;
    
    return (
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[currentIndex]} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Navigation buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(product.id); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(product.id); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronRight size={16} />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {product.hasStarGuide && (
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                스타가이드
              </div>
            )}
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <Heart size={16} className="text-white" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star size={12} className="text-black fill-current" />
              <span className="font-medium">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-1">{product.location}</p>
          <p className="text-gray-500 text-sm mb-3">{product.duration}</p>
          
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-gray-900">₩{Number(product.price).toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/ 1인</span>
          </div>
        </div>
      </div>
    );
  };

  // Instagram Story Style Card
  const InstagramCard = ({ product }) => {
    const currentIndex = currentImageIndex[product.id] || 0;
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative h-80">
          <img 
            src={product.images[currentIndex]} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
          
          {/* Story-style progress bars */}
          <div className="absolute top-3 left-3 right-3 flex gap-1">
            {product.images.map((_, index) => (
              <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-white transition-all duration-300 ${
                    index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Overlay content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              {product.hasStarGuide && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles size={10} />
                  스타가이드
                </div>
              )}
              <div className="flex items-center gap-1 text-sm">
                <Star size={12} className="text-yellow-400 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{product.title}</h3>
            <p className="text-white/90 text-sm mb-2">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm opacity-90">{product.location}</div>
              <div className="font-bold text-lg">₩{Number(product.price).toLocaleString()}</div>
            </div>
          </div>

          {/* Navigation area */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(product.id); }}
            className="absolute left-0 top-0 w-1/2 h-full"
          />
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(product.id); }}
            className="absolute right-0 top-0 w-1/2 h-full"
          />
        </div>
      </div>
    );
  };

  // Magazine Style Card
  const MagazineCard = ({ product }) => {
    const currentIndex = currentImageIndex[product.id] || 0;
    
    return (
      <div className="bg-white rounded-none shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 max-w-md">
        <div className="relative h-72 overflow-hidden">
          <img 
            src={product.images[currentIndex]} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
          
          {/* Magazine-style overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Large typography overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="text-xs uppercase tracking-widest mb-2 opacity-90">{product.location}</div>
            <h3 className="text-2xl font-bold leading-tight mb-2">{product.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span>{product.duration}</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>
          </div>

          {/* Top corner badge */}
          {product.hasStarGuide && (
            <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 text-xs font-bold">
              ⭐스타가이드
            </div>
          )}
        </div>
        
        {/* Thumbnail strip */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-2 mb-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(prev => ({ ...prev, [product.id]: index }))}
                className={`w-12 h-8 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-black text-white px-2 py-1 text-xs uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">₩{Number(product.price).toLocaleString()}</div>
              <div className="text-xs text-gray-500">1인당</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Glassmorphism Card
  const GlassmorphismCard = ({ product }) => {
    const currentIndex = currentImageIndex[product.id] || 0;
    
    return (
      <div className="relative overflow-hidden rounded-3xl group">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={product.images[currentIndex]} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Glass card overlay */}
        <div className="relative h-96 flex flex-col justify-end p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{product.title}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin size={14} />
                  <span>{product.location}</span>
                </div>
              </div>
              
              {product.hasStarGuide && (
                <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/30">
                  ✨ 스타가이드
                </div>
              )}
            </div>
            
            <p className="text-white/90 text-sm mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 text-white/80 text-sm">
                <span>{product.duration}</span>
                <span>최대{product.maxGuests}명</span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(prev => ({ ...prev, [product.id]: index }))}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              
              <div className="text-white text-right">
                <div className="text-2xl font-bold">₩{Number(product.price).toLocaleString()}</div>
                <div className="text-white/80 text-sm">1인당</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Minimalist Grid Card
  const MinimalistGridCard = ({ product }) => {
    return (
      <div className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden group">
        <div className="grid grid-cols-2 gap-px bg-gray-100 h-48">
          {product.images.slice(0, 4).map((img, index) => (
            <div key={index} className="relative overflow-hidden bg-white">
              <img 
                src={img} 
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {index === 3 && product.images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                  +{product.images.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={12} />
                <span>{product.location}</span>
              </div>
            </div>
            
            {product.hasStarGuide && (
              <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                스타가이드
              </div>
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            {product.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{product.duration}</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-gray-400" />
                <span>{product.rating}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-gray-900">₩{Number(product.price).toLocaleString()}</div>
              <div className="text-gray-500 text-xs">1인당</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Premium Luxury Card
  const LuxuryCard = ({ product }) => {
    const currentIndex = currentImageIndex[product.id] || 0;
    
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 text-white max-w-md">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[currentIndex]} 
            alt={product.title}
            className="w-full h-full object-cover opacity-80 hover:opacity-90 transition-opacity duration-300"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          {/* Luxury badge */}
          {product.hasStarGuide && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Award size={12} />
               스타가이드
            </div>
          )}
          
          {/* Navigation */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(prev => ({ ...prev, [product.id]: index }))}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-amber-400' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <Share2 size={14} />
              </button>
              <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <Bookmark size={14} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin size={14} />
              <span>{product.location}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{product.description}</p>
          
          <div className="space-y-3 mb-6">
            {product.highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{product.duration}</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400 fill-current" />
                <span>{product.rating}</span>
                <span className="text-gray-400">({product.reviews})</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">₩{Number(product.price).toLocaleString()}</div>
              <div className="text-gray-400 text-xs">1인당</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                <h1 className="text-2xl font-bold text-gray-900">멀티 이미지 카드</h1>
                <p className="text-gray-600 text-sm">여러 이미지가 포함된 프리미엄 여행 카드 컴포넌트</p>
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
        {/* Airbnb Style Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-rose-500 rounded-full" />
             클린 & 직관적
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <AirbnbCard key={`airbnb-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Instagram Story Style Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            소셜 & 인터랙티브
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <InstagramCard key={`instagram-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Magazine Style Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-black rounded-full" />
            에디토리얼 & 아티스틱
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredProducts.map(product => (
              <MagazineCard key={`magazine-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Glassmorphism Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
            모던 & 미래적
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <GlassmorphismCard key={`glass-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Minimalist Grid Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-gray-400 rounded-full" />
           그리드 & 심플
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <MinimalistGridCard key={`minimal-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Premium Luxury Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full" />
           럭셔리 & 프리미엄
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredProducts.map(product => (
              <LuxuryCard key={`luxury-${product.id}`} product={product} />
            ))}
          </div>
        </section>

    
      </div>
    </div>
  );
};

export default NewCards2;