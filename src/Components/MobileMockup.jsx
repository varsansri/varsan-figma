import { useState, createContext, useContext, useCallback } from 'react'

const courses = [
  { id: 1, title: "Complete Cake Baking Masterclass", instructor: "Chef Maria", rating: 4.8, reviews: 12453, price: 84.99, originalPrice: 199.99, image: "🎂", level: "All Levels", duration: "24.5h", lectures: 186, bestseller: true, category: "baking", bg: "from-rose-900/30 via-pink-900/20 to-zinc-900", desc: "Learn everything from basic sponge cakes to multi-tiered wedding cakes. Master buttercream, fondant, and decorating techniques used by professionals worldwide.", curriculum: ["Introduction & Kitchen Setup (45min)", "Basic Sponge Cakes (3h)", "Buttercream Mastery (2.5h)", "Fondant Fundamentals (3h)", "Wedding Cake Construction (4h)", "Business & Pricing Guide (1.5h)"] },
  { id: 2, title: "Fondant Art & 3D Cake Sculpting", instructor: "James Chen", rating: 4.7, reviews: 8921, price: 74.99, originalPrice: 179.99, image: "🍰", level: "Intermediate", duration: "18h", lectures: 142, bestseller: true, category: "decorating", bg: "from-purple-900/30 via-violet-900/20 to-zinc-900", desc: "Create stunning 3D cake sculptures and master fondant techniques. From figurines to gravity-defying structures.", curriculum: ["Tools & Materials (40min)", "Fondant Basics (1.5h)", "Figurine Sculpting (2.5h)", "Gravity Structures (2h)", "Airbrush Techniques (1.5h)"] },
  { id: 3, title: "French Patisserie Masterclass", instructor: "Sophie Laurent", rating: 4.9, reviews: 15672, price: 94.99, originalPrice: 224.99, image: "🥐", level: "Advanced", duration: "32h", lectures: 248, bestseller: true, category: "pastry", bg: "from-amber-900/30 via-orange-900/20 to-zinc-900", desc: "Master the art of French patisserie. Create perfect macarons, flaky croissants, eclairs, and opera cakes.", curriculum: ["French Basics (1h)", "Macarons Mastery (3h)", "Croissants & Viennoiserie (4h)", "Éclairs & Choux (2h)", "Opera Cake (2.5h)"] },
  { id: 4, title: "Buttercream Flower Piping", instructor: "Priya Sharma", rating: 4.6, reviews: 6789, price: 49.99, originalPrice: 129.99, image: "🌸", level: "Beginner", duration: "8h", lectures: 64, bestseller: false, category: "decorating", bg: "from-pink-900/30 via-rose-900/20 to-zinc-900", desc: "Pipe beautiful buttercream flowers: roses, peonies, succulents and more. No prior experience needed.", curriculum: ["Tools Setup (30min)", "Basic Roses (1.5h)", "Peonies (1h)", "Succulents (1h)", "Advanced Bouquets (2h)"] },
  { id: 5, title: "Vegan & Gluten-Free Baking", instructor: "Dr. Aisha Patel", rating: 4.8, reviews: 9845, price: 69.99, originalPrice: 159.99, image: "🌱", level: "All Levels", duration: "16h", lectures: 128, bestseller: false, category: "baking", bg: "from-emerald-900/30 via-green-900/20 to-zinc-900", desc: "Delicious cakes without dairy, eggs, or gluten. Science-based approach to allergen-free baking.", curriculum: ["Allergen Science (45min)", "Egg Substitutes (1.5h)", "Dairy-Free Creams (1h)", "Gluten-Free Flours (2h)", "Full Recipe Development (3h)"] },
  { id: 6, title: "Korean Lunchbox Cakes", instructor: "Yuna Kim", rating: 4.5, reviews: 4532, price: 54.99, originalPrice: 139.99, image: "🎁", level: "Beginner", duration: "6.5h", lectures: 52, bestseller: false, category: "decorating", bg: "from-sky-900/30 via-blue-900/20 to-zinc-900", desc: "The trendy Korean-style mini cakes. Learn minimalist aesthetics and perfect gifting techniques.", curriculum: ["Korean Cake Culture (30min)", "Mini Cake Bases (1h)", "Minimalist Design (1.5h)", "Gift Packaging (45min)", "Social Media Photography (1h)"] },
]

const AppContext = createContext()

function useApp() {
  return useContext(AppContext)
}

function Star({ rating, reviews }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-[10px] text-amber-400">{'★'.repeat(Math.floor(rating))}</span>
      <span className="text-[10px] text-amber-400/30">{'★'.repeat(5 - Math.floor(rating))}</span>
      <span className="text-[10px] text-zinc-400 font-semibold ml-0.5">{rating}</span>
      {reviews != null && <span className="text-[9px] text-zinc-400 ml-1">({(reviews / 1000).toFixed(1)}k)</span>}
    </div>
  )
}

function Badge({ children, color = 'amber' }) {
  const c = { amber: 'bg-amber-400/15 text-amber-500', green: 'bg-emerald-400/15 text-emerald-500', purple: 'bg-purple-400/15 text-purple-500' }
  return <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${c[color]}`}>{children}</span>
}

function CourseCard({ course, compact }) {
  const { navigate } = useApp()
  return (
    <div onClick={() => navigate('detail', course)} className="active:scale-[0.98] transition-transform cursor-pointer">
      {compact ? (
        <div className="flex gap-3">
          <div className={`w-20 h-16 bg-gradient-to-br ${course.bg} rounded-xl flex items-center justify-center text-3xl shrink-0 relative`}>
            {course.bestseller && <span className="absolute top-1 left-1"><Badge color="amber">BEST</Badge></span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-zinc-900 line-clamp-2 leading-tight">{course.title}</p>
            <p className="text-[9px] text-zinc-500 mt-0.5">{course.instructor}</p>
            <Star rating={course.rating} />
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-purple-600">${course.price}</span>
              <span className="text-[9px] text-zinc-400 line-through">${course.originalPrice}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="shrink-0 w-40">
          <div className={`h-24 bg-gradient-to-br ${course.bg} rounded-2xl flex items-center justify-center text-4xl relative`}>
            {course.bestseller && <span className="absolute top-1.5 left-1.5"><Badge color="amber">BEST</Badge></span>}
          </div>
          <p className="text-[10px] font-semibold text-zinc-900 mt-1.5 line-clamp-2 leading-tight">{course.title}</p>
          <Star rating={course.rating} />
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xs font-bold text-zinc-900">${course.price}</span>
            <span className="text-[9px] text-zinc-400 line-through">${course.originalPrice}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function ScreenHome() {
  const { navigate, cart, addToCart, search, setSearch, filterCat, setFilterCat } = useApp()
  const filtered = courses.filter(c => {
    if (filterCat && c.category !== filterCat) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  const trending = courses.filter(c => c.bestseller)

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2.5">
          <span className="text-xs">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cake classes..." className="bg-transparent text-xs text-zinc-900 placeholder-zinc-400 outline-none flex-1" />
          {search && <span onClick={() => setSearch('')} className="text-xs text-zinc-400 cursor-pointer">✕</span>}
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden cursor-pointer" onClick={() => navigate('browse')}>
          <div className="absolute top-0 right-0 text-8xl opacity-10">🎂</div>
          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Flash Sale</p>
          <p className="font-bold text-lg mt-0.5">50% Off All Baking Courses</p>
          <p className="text-xs opacity-80 mt-1">Ends in 12h 34m</p>
          <div className="mt-3 bg-white text-purple-600 text-[10px] font-bold px-3 py-1.5 rounded-lg inline-block">Shop Now</div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold text-zinc-900">Categories</p>
          <p className="text-[10px] text-purple-500 font-medium cursor-pointer" onClick={() => { setFilterCat(''); navigate('browse') }}>See All</p>
        </div>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {[
            { icon: '🔥', label: 'Baking', cat: 'baking' },
            { icon: '🎨', label: 'Decorating', cat: 'decorating' },
            { icon: '🥐', label: 'Pastry', cat: 'pastry' },
            { icon: '💼', label: 'Business', cat: 'business' },
            { icon: '🌱', label: 'Vegan', cat: 'baking' },
            { icon: '💒', label: 'Wedding', cat: 'baking' },
          ].map(c => (
            <div key={c.label} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer active:scale-95 transition-transform" onClick={() => { setFilterCat(c.cat); navigate('browse') }}>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-xl">{c.icon}</div>
              <span className="text-[9px] text-zinc-600 font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold text-zinc-900">Trending Now</p>
          <p className="text-[10px] text-purple-500 font-medium cursor-pointer" onClick={() => navigate('browse')}>View All</p>
        </div>
        <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {trending.map(c => <CourseCard key={c.id} course={c} compact={false} />)}
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold text-zinc-900">Recommended</p>
        </div>
        <div className="space-y-3">
          {courses.slice(0, 3).map(c => <CourseCard key={c.id} course={c} compact={true} />)}
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}

function ScreenBrowse() {
  const { navigate, search, setSearch, filterCat, setFilterCat, sortBy, setSortBy } = useApp()
  const [localFilter, setLocalFilter] = useState(filterCat || 'all')

  const filtered = courses
    .filter(c => {
      if (localFilter !== 'all' && c.category !== localFilter) return false
      if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2.5 mb-3">
          <span className="text-xs">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="bg-transparent text-xs text-zinc-900 placeholder-zinc-400 outline-none flex-1" />
          {search && <span onClick={() => setSearch('')} className="text-xs text-zinc-400 cursor-pointer">✕</span>}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'baking', label: 'Baking' },
            { id: 'decorating', label: 'Decorating' },
            { id: 'pastry', label: 'Pastry' },
            { id: 'business', label: 'Business' },
          ].map(f => (
            <span key={f.id} onClick={() => setLocalFilter(f.id)} className={`shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition-transform ${localFilter === f.id ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
              {f.label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] text-zinc-400">{filtered.length} courses</p>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-[9px] text-zinc-500 bg-transparent border-none outline-none font-semibold cursor-pointer">
            <option value="popular">Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(c => (
            <div key={c.id} onClick={() => navigate('detail', c)} className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
              <div className={`h-24 bg-gradient-to-br ${c.bg} flex items-center justify-center text-4xl relative`}>
                {c.bestseller && <span className="absolute top-1.5 left-1.5"><Badge color="amber">BEST</Badge></span>}
              </div>
              <div className="p-2.5">
                <p className="text-[9px] font-semibold text-zinc-900 line-clamp-2 leading-tight">{c.title}</p>
                <p className="text-[8px] text-zinc-500 mt-0.5">{c.instructor}</p>
                <Star rating={c.rating} />
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-[11px] font-bold text-zinc-900">${c.price}</span>
                  <span className="text-[8px] text-zinc-400 line-through">${c.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-20" />
    </div>
  )
}

function ScreenDetail() {
  const { selectedCourse, navigate, cart, addToCart, addToEnrolled } = useApp()
  if (!selectedCourse) return null
  const c = selectedCourse
  const inCart = cart.includes(c.id)

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      <div className="relative">
        <div className={`h-56 bg-gradient-to-br ${c.bg} flex items-center justify-center text-8xl`} />
        <div onClick={() => navigate('browse')} className="absolute top-3 left-3 bg-black/30 backdrop-blur w-7 h-7 rounded-full flex items-center justify-center text-white text-xs cursor-pointer active:scale-90 transition-transform">←</div>
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur w-7 h-7 rounded-full flex items-center justify-center text-white text-xs">♡</div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 pt-8 pb-4 px-4">
          <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{c.category.toUpperCase()}</span>
          <h1 className="text-base font-bold text-zinc-900 mt-1.5 leading-tight">{c.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Star rating={c.rating} reviews={c.reviews} />
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">by {c.instructor}</p>
        </div>
      </div>

      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-zinc-900">${c.price}</span>
            <span className="text-xs text-zinc-400 line-through ml-2">${c.originalPrice}</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{Math.round((1 - c.price / c.originalPrice) * 100)}% OFF</span>
        </div>

        <button onClick={() => { addToEnrolled(c.id); alert('Enrolled successfully! 🎉') }} className="w-full bg-purple-600 active:bg-purple-700 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-purple-200 transition-colors cursor-pointer">
          Enroll Now - ${c.price}
        </button>
        <button onClick={() => addToCart(c.id)} className={`w-full border font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer ${inCart ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 'border-zinc-200 text-zinc-900 active:bg-zinc-50'}`}>
          {inCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '⏱️', label: 'Duration', val: c.duration },
            { icon: '📚', label: 'Lectures', val: c.lectures },
            { icon: '📊', label: 'Level', val: c.level },
            { icon: '🌐', label: 'Language', val: 'English' },
          ].map(i => (
            <div key={i.label} className="bg-zinc-50 rounded-xl p-3">
              <p className="text-[9px] text-zinc-500">{i.label}</p>
              <p className="text-[10px] font-semibold text-zinc-900 mt-0.5">{i.val}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-2">About This Course</h3>
          <p className="text-[10px] text-zinc-600 leading-relaxed">{c.desc}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-2">What You'll Learn</h3>
          {['Professional cake baking fundamentals', 'Buttercream & fondant techniques', 'Business strategies for selling cakes', 'Recipe development & flavor pairing', 'Certificate of completion'].map((item, i) => (
            <div key={i} className="flex gap-2 py-1.5">
              <span className="text-emerald-500 text-[10px] shrink-0 mt-0.5">✓</span>
              <span className="text-[10px] text-zinc-600">{item}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-2">Curriculum ({c.curriculum.length} sections)</h3>
          <div className="space-y-1">
            {c.curriculum.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-zinc-50 rounded-lg px-3 py-2">
                <span className="text-[9px] text-zinc-400 w-4 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[10px] text-zinc-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-2">Instructor</h3>
          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${c.bg} rounded-full flex items-center justify-center text-2xl shrink-0`} />
            <div>
              <p className="text-xs font-semibold text-zinc-900">{c.instructor}</p>
              <p className="text-[9px] text-zinc-500">Professional Pastry Chef • 4.8 Instructor Rating</p>
              <p className="text-[9px] text-zinc-500">67,890 students • 8 courses</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20" />
    </div>
  )
}

function ScreenLearning() {
  const { enrolled, navigate } = useApp()
  const myCourses = courses.filter(c => enrolled.includes(c.id))
  const progressData = { 1: 64, 2: 28, 4: 12, 5: 50, 6: 8 }

  if (myCourses.length === 0) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">📚</span>
        <h2 className="text-base font-bold text-zinc-900 mb-1">No courses yet</h2>
        <p className="text-xs text-zinc-500 text-center mb-4">Start learning today! Browse our cake-making courses.</p>
        <button onClick={() => navigate('browse')} className="bg-purple-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl active:bg-purple-700 transition-colors cursor-pointer">Browse Courses</button>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 pt-4 pb-6 space-y-3">
        <p className="text-[10px] text-zinc-500">You have {myCourses.length} active course{myCourses.length > 1 ? 's' : ''}</p>
        {myCourses.map(c => (
          <div key={c.id} className="bg-zinc-50 rounded-2xl overflow-hidden">
            <div className={`h-24 bg-gradient-to-br ${c.bg} flex items-center justify-center text-5xl relative`}>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progressData[c.id] || 0}%` }} />
              </div>
              <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur text-white text-[8px] font-semibold px-2 py-0.5 rounded-full">{progressData[c.id] || 0}%</span>
            </div>
            <div className="p-3">
              <p className="text-[10px] font-semibold text-zinc-900 line-clamp-1">{c.title}</p>
              <p className="text-[9px] text-zinc-500 mt-0.5">{c.instructor}</p>
              <button onClick={() => navigate('detail', c)} className="mt-2 w-full bg-purple-600 text-white text-[9px] font-semibold py-2 rounded-lg active:bg-purple-700 transition-colors cursor-pointer">Continue Learning</button>
            </div>
          </div>
        ))}

        <div className="pt-4">
          <h3 className="text-sm font-bold text-zinc-900 mb-3">Recommended For You</h3>
          <div className="space-y-2.5">
            {courses.filter(c => !enrolled.includes(c.id)).slice(0, 4).map(c => (
              <div key={c.id} onClick={() => navigate('detail', c)} className="flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform">
                <div className={`w-14 h-12 bg-gradient-to-br ${c.bg} rounded-xl flex items-center justify-center text-2xl shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-zinc-900 line-clamp-1">{c.title}</p>
                  <Star rating={c.rating} />
                  <p className="text-[10px] font-bold text-purple-600 mt-0.5">${c.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </div>
  )
}

function ScreenCart() {
  const { cart, addToCart, navigate } = useApp()
  const cartCourses = courses.filter(c => cart.includes(c.id))
  const subtotal = cartCourses.reduce((s, c) => s + c.price, 0)
  const total = subtotal + 3.99

  if (cartCourses.length === 0) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-base font-bold text-zinc-900 mb-1">Cart is empty</h2>
        <p className="text-xs text-zinc-500 text-center mb-4">Add courses to get started!</p>
        <button onClick={() => navigate('browse')} className="bg-purple-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl active:bg-purple-700 transition-colors cursor-pointer">Browse Courses</button>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 pt-3 pb-6 space-y-3">
        {cartCourses.map(c => (
          <div key={c.id} className="flex gap-3 py-3 border-b border-zinc-100">
            <div className={`w-20 h-16 bg-gradient-to-br ${c.bg} rounded-xl flex items-center justify-center text-3xl shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-zinc-900 line-clamp-2 leading-tight">{c.title}</p>
              <p className="text-[9px] text-zinc-500 mt-0.5">{c.instructor}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs font-bold text-zinc-900">${c.price}</span>
                <span onClick={() => addToCart(c.id)} className="text-[9px] text-red-400 font-medium cursor-pointer active:text-red-600">Remove</span>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">🎁</span>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-purple-900">Apply Coupon</p>
              <p className="text-[8px] text-purple-600">Save extra 10% with code BAKE10</p>
            </div>
            <span className="text-[10px] text-purple-500 font-semibold cursor-pointer active:text-purple-700">Apply</span>
          </div>
        </div>

        <div className="space-y-2 text-[10px]">
          <div className="flex justify-between"><span className="text-zinc-500">Subtotal ({cartCourses.length} items)</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Service Fee</span><span>$3.99</span></div>
          <div className="flex justify-between font-bold text-sm pt-2 border-t border-zinc-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <button onClick={() => alert(`Order placed! Total: $${total.toFixed(2)}\n\nConfirmation sent to your email.`)} className="w-full bg-purple-600 text-white font-semibold text-xs py-3.5 rounded-xl active:bg-purple-700 transition-colors cursor-pointer shadow-lg shadow-purple-200">
          Checkout (${total.toFixed(2)})
        </button>
        <p className="text-center text-[9px] text-zinc-400">30-day money-back guarantee</p>
      </div>
      <div className="h-20" />
    </div>
  )
}

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'browse', label: 'Browse', icon: '🔍' },
  { id: 'learning', label: 'Learning', icon: '📖' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
]

function MobileTabBar() {
  const { activeScreen, navigate } = useApp()
  return (
    <div className="bg-white border-t border-zinc-100 px-4 pb-5 pt-1.5 flex justify-around shrink-0">
      {tabs.map(t => (
        <button key={t.id} onClick={() => navigate(t.id)} className="flex flex-col items-center gap-0.5 cursor-pointer active:scale-90 transition-transform">
          <span className={`text-lg ${activeScreen === t.id ? '' : 'opacity-30'}`}>{t.icon}</span>
          <span className={`text-[8px] font-semibold ${activeScreen === t.id ? 'text-purple-600' : 'text-zinc-400'}`}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

function StatusBar() {
  const { cart, activeScreen } = useApp()
  const cartCount = cart.length

  return (
    <div className="bg-white px-4 pt-3 pb-2 flex items-center justify-between border-b border-zinc-100 shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="text-lg">🧁</span>
        <span className="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">CakeMaster</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-sm">🔔</span>
        <div className="relative" onClick={() => useApp().navigate('cart')}>
          <span className="text-zinc-400 text-sm cursor-pointer">🛒</span>
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartCount}</span>}
        </div>
      </div>
    </div>
  )
}

function ScreenTitle() {
  const { activeScreen, selectedCourse } = useApp()
  const titles = { home: 'Home', browse: 'Browse Courses', detail: selectedCourse?.title || 'Course', learning: 'My Learning', cart: 'My Cart' }
  return null
}

function PhoneFrame({ children }) {
  return (
    <div className="w-[375px] h-[812px] bg-white rounded-[48px] border-[6px] border-zinc-800 shadow-2xl shadow-black/40 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-2xl z-50" />
      <div className="h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default function MobileMockupView() {
  const [activeScreen, setActiveScreen] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [cart, setCart] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [showMockup, setShowMockup] = useState(false)

  const addToCart = useCallback((courseId) => {
    setCart(prev => prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId])
  }, [])

  const addToEnrolled = useCallback((courseId) => {
    setEnrolled(prev => prev.includes(courseId) ? prev : [...prev, courseId])
  }, [])

  const navigate = useCallback((screen, course) => {
    setActiveScreen(screen)
    if (course) setSelectedCourse(course)
    if (screen === 'browse' && !course) setSelectedCourse(null)
  }, [])

  const ctx = { activeScreen, selectedCourse, cart, enrolled, search, setSearch, filterCat, setFilterCat, sortBy, setSortBy, navigate, addToCart, addToEnrolled }

  if (showMockup) {
    return (
      <div className="min-h-screen bg-zinc-100 py-8 px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">CakeMaster — All Screens Mockup</h1>
          <p className="text-zinc-500 text-sm">iOS App Design • Cake Baking Online Classes</p>
          <button onClick={() => setShowMockup(false)} className="mt-2 text-xs text-purple-500 underline cursor-pointer">← Switch to Live Demo</button>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <AppContext.Provider value={{ ...ctx, activeScreen: 'home', navigate: (s, c) => ctx.navigate(s, c) }}>
            <div className="flex flex-col items-center gap-3"><PhoneFrame><StatusBar /><ScreenHome /><MobileTabBar /></PhoneFrame><span className="text-xs text-zinc-500 font-medium uppercase">Home</span></div>
          </AppContext.Provider>
          <AppContext.Provider value={{ ...ctx, activeScreen: 'browse', selectedCourse: null }}>
            <div className="flex flex-col items-center gap-3"><PhoneFrame><StatusBar /><ScreenBrowse /><MobileTabBar /></PhoneFrame><span className="text-xs text-zinc-500 font-medium uppercase">Browse</span></div>
          </AppContext.Provider>
          <AppContext.Provider value={{ ...ctx, activeScreen: 'detail', selectedCourse: courses[0] }}>
            <div className="flex flex-col items-center gap-3"><PhoneFrame><ScreenDetail /></PhoneFrame><span className="text-xs text-zinc-500 font-medium uppercase">Course Detail</span></div>
          </AppContext.Provider>
          <AppContext.Provider value={{ ...ctx, activeScreen: 'learning', enrolled: [1, 2, 4] }}>
            <div className="flex flex-col items-center gap-3"><PhoneFrame><StatusBar /><ScreenLearning /><MobileTabBar /></PhoneFrame><span className="text-xs text-zinc-500 font-medium uppercase">My Learning</span></div>
          </AppContext.Provider>
          <AppContext.Provider value={{ ...ctx, activeScreen: 'cart', cart: [1, 4] }}>
            <div className="flex flex-col items-center gap-3"><PhoneFrame><StatusBar /><ScreenCart /><MobileTabBar /></PhoneFrame><span className="text-xs text-zinc-500 font-medium uppercase">Cart / Checkout</span></div>
          </AppContext.Provider>
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center py-8 px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">CakeMaster — Live Demo</h1>
          <p className="text-zinc-500 text-sm">Tap around — everything works!</p>
          <button onClick={() => setShowMockup(true)} className="mt-2 text-xs text-purple-500 underline cursor-pointer">View All Screens (Mockup)</button>
        </div>

        <PhoneFrame>
          <StatusBar />
          {activeScreen === 'home' && <ScreenHome />}
          {activeScreen === 'browse' && <ScreenBrowse />}
          {activeScreen === 'detail' && <ScreenDetail />}
          {activeScreen === 'learning' && <ScreenLearning />}
          {activeScreen === 'cart' && <ScreenCart />}
          <MobileTabBar />
        </PhoneFrame>

        <p className="mt-4 text-xs text-zinc-400">Use the tab bar below to navigate</p>
      </div>
    </AppContext.Provider>
  )
}
