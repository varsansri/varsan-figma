import { useState, createContext, useContext, useCallback } from 'react'

const courses = [
  { id: 1, title: "Complete Cake Baking Masterclass: Beginners to Pro", instructor: "Chef Maria Rodriguez", rating: 4.8, reviews: 12453, price: 84.99, originalPrice: 199.99, image: "🎂", level: "All Levels", duration: "24.5h", lectures: 186, bestseller: true, category: "baking", desc: "Learn everything from basic sponge cakes to multi-tiered wedding cakes. Master buttercream, fondant, and decorating techniques used by professionals worldwide.", curriculum: ["Introduction & Kitchen Setup (45min)", "Basic Sponge Cakes & Fillings (3h)", "Buttercream Mastery (2.5h)", "Fondant Fundamentals (3h)", "Advanced Decorating (4h)", "Wedding Cake Construction (2.5h)", "Business & Pricing (1.5h)", "Final Project: Tiered Cake (6h)"] },
  { id: 2, title: "Fondant Art & 3D Cake Sculpting", instructor: "James Chen", rating: 4.7, reviews: 8921, price: 74.99, originalPrice: 179.99, image: "🍰", level: "Intermediate", duration: "18h", lectures: 142, bestseller: true, category: "decorating", desc: "Create stunning 3D cake sculptures and master fondant techniques. From figurines to gravity-defying structures.", curriculum: ["Tools & Materials (40min)", "Fondant Basics (1.5h)", "Figurine Sculpting (2.5h)", "Gravity Structures (2h)", "Airbrush & Paint (1.5h)", "Final Projects (8h)"] },
  { id: 3, title: "French Patisserie: Macarons, Croissants & More", instructor: "Sophie Laurent", rating: 4.9, reviews: 15672, price: 94.99, originalPrice: 224.99, image: "🥐", level: "Advanced", duration: "32h", lectures: 248, bestseller: true, category: "pastry", desc: "Master the art of French patisserie. Create perfect macarons, flaky croissants, eclairs, and opera cakes from a Le Cordon Bleu graduate.", curriculum: ["French Baking Fundamentals (1h)", "Macarons Mastery (3h)", "Croissants & Viennoiserie (4h)", "Éclairs & Choux Pastry (2h)", "Opera Cake & Entremets (2.5h)"] },
  { id: 4, title: "Buttercream Flower Piping Techniques", instructor: "Priya Sharma", rating: 4.6, reviews: 6789, price: 49.99, originalPrice: 129.99, image: "🌸", level: "Beginner", duration: "8h", lectures: 64, bestseller: false, category: "decorating", desc: "Pipe beautiful buttercream flowers: roses, peonies, succulents and more. No prior experience needed.", curriculum: ["Tools & Setup (30min)", "Basic Roses (1.5h)", "Peonies & Ranunculus (1h)", "Succulents (1h)", "Advanced Bouquets (2h)"] },
  { id: 5, title: "Vegan & Gluten-Free Cake Baking", instructor: "Dr. Aisha Patel", rating: 4.8, reviews: 9845, price: 69.99, originalPrice: 159.99, image: "🌱", level: "All Levels", duration: "16h", lectures: 128, bestseller: false, category: "baking", desc: "Delicious cakes without dairy, eggs, or gluten. Science-based approach to allergen-free baking that tastes amazing.", curriculum: ["Allergen Science (45min)", "Egg Substitutes (1.5h)", "Dairy-Free Creams & Frostings (1h)", "Gluten-Free Flour Blends (2h)", "Full Recipe Development (3h)"] },
  { id: 6, title: "Korean Lunchbox Cakes & Minimalist Design", instructor: "Yuna Kim", rating: 4.5, reviews: 4532, price: 54.99, originalPrice: 139.99, image: "🎁", level: "Beginner", duration: "6.5h", lectures: 52, bestseller: false, category: "decorating", desc: "The trendy Korean-style mini cakes taking social media by storm. Learn minimalist aesthetics and perfect gifting techniques.", curriculum: ["Korean Cake Culture (30min)", "Mini Cake Bases (1h)", "Minimalist Design Principles (1.5h)", "Gift Packaging (45min)", "Social Media Photography (1h)"] },
  { id: 7, title: "Business of Cake: Turn Passion Into Profit", instructor: "Michael Torres", rating: 4.7, reviews: 7654, price: 59.99, originalPrice: 149.99, image: "💼", level: "All Levels", duration: "10h", lectures: 80, bestseller: false, category: "business", desc: "Pricing strategies, marketing, social media, and legal essentials for starting your own cake business from home.", curriculum: ["Business Setup (1h)", "Pricing Strategies (1.5h)", "Social Media Marketing (2h)", "Client Management (1h)", "Legal & Licensing (45min)"] },
  { id: 8, title: "Tiered Wedding Cake Design & Construction", instructor: "Chef Maria Rodriguez", rating: 4.9, reviews: 11234, price: 99.99, originalPrice: 249.99, image: "💒", level: "Advanced", duration: "28h", lectures: 210, bestseller: true, category: "baking", desc: "Build stunning 3-5 tier wedding cakes. Learn structural engineering, transportation logistics, and professional assembly.", curriculum: ["Structural Engineering (1h)", "Tier Stacking (2h)", "Fondant Covering (3h)", "Decorative Elements (3h)", "Transport & Assembly (1.5h)"] },
]

const categories = [
  { id: 'all', name: 'All Courses', icon: '📚' },
  { id: 'baking', name: 'Baking', icon: '🔥' },
  { id: 'decorating', name: 'Decorating', icon: '🎨' },
  { id: 'pastry', name: 'Pastry', icon: '🥐' },
  { id: 'business', name: 'Business', icon: '💼' },
]

const testimonials = [
  { name: "Sarah M.", text: "I went from burning box cakes to running my own bakery. This platform changed my life.", avatar: "👩‍🍳", rating: 5 },
  { name: "David K.", text: "The instructors break down complex techniques so well. Worth every penny.", avatar: "👨‍🍳", rating: 5 },
  { name: "Lisa R.", text: "I've taken 6 courses here. My kids' birthday cakes are now legendary.", avatar: "👩‍🍳", rating: 5 },
]

const AppCtx = createContext()
function useApp() { return useContext(AppCtx) }

function Star({ rating, reviews }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-amber-400 text-sm">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
      <span className="text-amber-400 font-semibold text-sm">{rating}</span>
      {reviews != null && <span className="text-zinc-500 text-xs">({reviews.toLocaleString()})</span>}
    </span>
  )
}

function Badge({ children, color = 'amber' }) {
  const c = { amber: 'bg-amber-500/15 text-amber-400 border-amber-500/20', green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20' }
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c[color]}`}>{children}</span>
}

function CourseCard({ course }) {
  const { navigate } = useApp()
  const discount = Math.round((1 - course.price / course.originalPrice) * 100)
  return (
    <div onClick={() => navigate('detail', course)} className="group cursor-pointer bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
      <div className="h-44 bg-gradient-to-br from-rose-900/30 via-purple-900/20 to-zinc-900 flex items-center justify-center text-6xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        <span className="relative z-10">{course.image}</span>
        {course.bestseller && <span className="absolute top-3 left-3 z-20"><Badge color="amber">★ Bestseller</Badge></span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-tight mb-1.5 line-clamp-2 group-hover:text-purple-400 transition-colors">{course.title}</h3>
        <p className="text-xs text-zinc-500 mb-2">{course.instructor}</p>
        <Star rating={course.rating} reviews={course.reviews} />
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="text-lg font-bold">${course.price}</span>
          <span className="text-sm text-zinc-500 line-through">${course.originalPrice}</span>
          <span className="text-xs text-emerald-400 ml-auto font-semibold">{discount}% off</span>
        </div>
        <div className="flex items-center gap-2 mt-2.5 text-xs text-zinc-500">
          <span className="px-1.5 py-0.5 bg-zinc-800 rounded">{course.level}</span>
          <span>{course.duration}</span>
          <span>{course.lectures} lectures</span>
        </div>
      </div>
    </div>
  )
}

function CourseDetailModal() {
  const { selectedCourse, navigate, cart, addToCart, addToEnrolled } = useApp()
  const [tab, setTab] = useState('overview')
  if (!selectedCourse) return null
  const c = selectedCourse
  const inCart = cart.includes(c.id)

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto" onClick={() => navigate('browse')}>
      <div className="min-h-screen flex items-start justify-center p-4 md:p-8">
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full my-8" onClick={e => e.stopPropagation()}>
          <div className="h-56 bg-gradient-to-br from-rose-900/40 via-purple-900/30 to-zinc-950 flex items-center justify-center text-9xl relative">
            <button onClick={() => navigate('browse')} className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-lg cursor-pointer">×</button>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge color="amber">{c.category.toUpperCase()}</Badge>
              <h1 className="text-2xl font-bold mt-3 mb-2">{c.title}</h1>
              <Star rating={c.rating} reviews={c.reviews} />
              <p className="text-zinc-400 mt-4 leading-relaxed text-sm">{c.desc}</p>
              <div className="flex gap-3 mt-6 border-b border-zinc-800 pb-3">
                {['overview', 'curriculum', 'instructor'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold pb-2 border-b-2 transition-colors cursor-pointer ${tab === t ? 'border-purple-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {tab === 'overview' && (
                <div className="mt-5 space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[{ label: 'Duration', val: c.duration }, { label: 'Lectures', val: c.lectures }, { label: 'Level', val: c.level }, { label: 'Language', val: 'English' }].map(i => (
                      <div key={i.label} className="bg-zinc-900 rounded-lg p-3"><p className="text-xs text-zinc-500">{i.label}</p><p className="font-semibold text-sm mt-0.5">{i.val}</p></div>
                    ))}
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">What You'll Learn</h4>
                    <ul className="space-y-1.5 text-zinc-400 text-xs">
                      <li>✓ Professional cake baking from fundamentals to advanced</li>
                      <li>✓ Buttercream, fondant, and gum paste techniques</li>
                      <li>✓ Business strategies for selling cakes</li>
                      <li>✓ Recipe development and flavor pairing</li>
                      <li>✓ Certificate of completion</li>
                    </ul>
                  </div>
                </div>
              )}
              {tab === 'curriculum' && (
                <div className="mt-5 space-y-1 text-sm">
                  {c.curriculum.map((item, i) => (
                    <div key={i} className="bg-zinc-900 rounded-lg p-3 flex items-center gap-3">
                      <span className="text-zinc-600 text-xs w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-zinc-300 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'instructor' && (
                <div className="mt-5 flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl shrink-0">{c.image}</div>
                  <div>
                    <h4 className="font-semibold">{c.instructor}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Professional Pastry Chef • 67k students</p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Award-winning pastry chef with 15+ years of experience teaching thousands of students worldwide. Graduate of Le Cordon Bleu Paris.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 sticky top-8">
                <p className="text-3xl font-bold">${c.price}</p>
                <p className="text-sm text-zinc-500 line-through">${c.originalPrice}</p>
                <p className="text-xs text-emerald-400 mt-1 font-semibold">{Math.round((1 - c.price / c.originalPrice) * 100)}% off</p>
                <button onClick={() => { addToEnrolled(c.id); alert('Enrolled successfully! 🎉') }} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg mt-4 transition-colors text-sm cursor-pointer">Enroll Now</button>
                <button onClick={() => addToCart(c.id)} className={`w-full border font-semibold py-3 rounded-lg mt-2 transition-all text-sm cursor-pointer ${inCart ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-zinc-700 hover:border-zinc-500 text-white'}`}>
                  {inCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <p className="text-center text-xs text-zinc-600 mt-3">30-Day Money-Back Guarantee</p>
                <div className="border-t border-zinc-800 mt-4 pt-4 space-y-2.5 text-xs">
                  {[{ k: 'Duration', v: c.duration }, { k: 'Lectures', v: c.lectures }, { k: 'Level', v: c.level }, { k: 'Certificate', v: 'Yes' }].map(r => (
                    <div key={r.k} className="flex justify-between"><span className="text-zinc-500">{r.k}</span><span>{r.v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientHeader({ page, setPage }) {
  const { cart } = useApp()
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse' },
    { id: 'learning', label: 'My Learning' },
    { id: 'cart', label: `Cart (${cart.length})` },
  ]
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
        <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => setPage('home')}>
          <span className="text-xl">🧁</span>
          <span className="font-bold text-base hidden sm:inline bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CakeMaster</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)} className={`px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${page === t.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="flex-1" />
        <button className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-zinc-200 transition-colors cursor-pointer">Get Started</button>
      </div>
    </header>
  )
}

function PageHome({ setPage }) {
  const { navigate, filterCat, setFilterCat } = useApp()
  const filtered = courses.filter(c => !filterCat || c.category === filterCat)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-rose-950/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-6">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-medium text-amber-400">New classes added weekly</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Turn Flour Into <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">Masterpieces</span>
              </h1>
              <p className="text-zinc-400 mt-5 text-lg leading-relaxed">
                Learn cake artistry from the world's best pastry chefs. Beginner to pro — every course comes with lifetime access and a certificate.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <button onClick={() => setPage('browse')} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm cursor-pointer shadow-lg shadow-purple-600/25">Explore Courses</button>
                <button className="border border-zinc-600 hover:border-zinc-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm cursor-pointer">▶ Watch Intro (2 min)</button>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
                {['⭐ 4.8 avg rating', '👨‍🍳 50+ expert chefs', '👥 400K+ students', '🎓 Certificate'].map(s => (
                  <span key={s} className="text-zinc-400">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 to-rose-500/20 rounded-3xl blur-2xl absolute inset-0" />
                <div className="relative bg-zinc-900/70 backdrop-blur border border-zinc-700/50 rounded-3xl p-8 text-center shadow-2xl">
                  <div className="text-8xl mb-4">🎂</div>
                  <p className="font-bold text-xl">Start Baking Today</p>
                  <p className="text-zinc-400 text-sm mt-1">Courses from $49.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Top Cake Classes</h2>
            <p className="text-zinc-500 mt-1">Handpicked courses to start your journey</p>
          </div>
          <button onClick={() => setPage('browse')} className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer">View All →</button>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setFilterCat(cat.id === 'all' ? '' : cat.id)} className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${(filterCat || 'all') === (cat.id === 'all' ? '' : cat.id) ? 'bg-white text-black' : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge color="green">TESTIMONIALS</Badge>
          <h2 className="text-2xl font-bold mt-3 mb-8">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-left">
                <div className="text-amber-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-zinc-300 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
                  <span className="text-2xl">{t.avatar}</span>
                  <span className="font-semibold text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-rose-900/30 border border-zinc-700/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to Master Cake Art?</h2>
            <p className="text-zinc-400 mt-3 max-w-md mx-auto">Join 400,000+ students and start creating stunning cakes today.</p>
            <button onClick={() => setPage('browse')} className="mt-6 bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer">Get Started Free</button>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: 'CakeMaster', links: ['About Us', 'Careers', 'Blog', 'Press'] },
              { title: 'Courses', links: ['Baking Basics', 'Decorating', 'Pastry Arts', 'Business'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'FAQs', 'Community'] },
              { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Accessibility'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5 text-xs text-zinc-500">
                  {col.links.map(l => <li key={l} className="hover:text-zinc-300 transition-colors cursor-pointer">{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-xs text-zinc-600">
            <span>🧁</span> © 2026 CakeMaster Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function PageBrowse() {
  const { navigate, filterCat, setFilterCat, sortBy, setSortBy, search, setSearch } = useApp()
  const [level, setLevel] = useState('all')
  const [localCat, setLocalCat] = useState(filterCat || 'all')

  const filtered = courses
    .filter(c => (localCat === 'all' || c.category === localCat))
    .filter(c => (level === 'all' || c.level === level))
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8"><h1 className="text-2xl font-bold">Browse All Courses</h1><p className="text-zinc-500 mt-1 text-sm">{filtered.length} courses available</p></div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-6 sticky top-20">
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500" />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Category</h4>
              <div className="space-y-1">
                {categories.map(c => (
                  <button key={c.id} onClick={() => setLocalCat(c.id)} className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors cursor-pointer ${localCat === c.id ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Level</h4>
              <div className="space-y-1">
                {['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => (
                  <button key={l} onClick={() => setLevel(l === 'all' ? 'all' : l)} className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors cursor-pointer ${level === l ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => { setLocalCat('all'); setLevel('all'); setSearch(''); }} className="w-full text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer">Clear Filters</button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-zinc-500">{filtered.length} results</p>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white cursor-pointer">
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
          {filtered.length === 0 && <div className="text-center py-20"><span className="text-4xl block mb-3">🔍</span><p className="text-zinc-500">No courses match your filters</p></div>}
        </main>
      </div>
    </div>
  )
}

function PageLearning() {
  const { enrolled, navigate } = useApp()
  const myCourses = courses.filter(c => enrolled.includes(c.id))
  const progress = { 1: 64, 2: 28, 4: 50, 5: 12, 6: 8 }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Learning</h1>
          <p className="text-zinc-500 text-sm mt-1">{myCourses.length > 0 ? `You have ${myCourses.length} active course${myCourses.length > 1 ? 's' : ''}` : 'Start your learning journey today!'}</p>
        </div>
        <button onClick={() => navigate('browse')} className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer">Browse More Courses →</button>
      </div>
      {myCourses.length === 0 ? (
        <div className="text-center py-20"><span className="text-6xl block mb-4">📚</span><p className="text-zinc-400 mb-4">No enrolled courses yet</p><button onClick={() => navigate('browse')} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm cursor-pointer">Browse Courses</button></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
            {myCourses.map(c => (
              <div key={c.id} className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-rose-900/30 via-purple-900/20 to-zinc-900 flex items-center justify-center text-5xl relative">
                  {c.image}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800"><div className="h-full bg-gradient-to-r from-purple-500 to-rose-500" style={{ width: `${progress[c.id] || 0}%` }} /></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{c.title}</h3>
                  <p className="text-xs text-zinc-500 mb-3">{c.instructor}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-purple-400 font-semibold">{progress[c.id] || 0}% complete</span>
                    <button onClick={() => navigate('detail', c)} className="text-purple-400 hover:text-purple-300 cursor-pointer">Continue →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="border-t border-zinc-800 pt-8">
        <h2 className="text-lg font-bold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {courses.filter(c => !enrolled.includes(c.id)).slice(0, 4).map(c => (
            <div key={c.id} onClick={() => navigate('detail', c)} className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 flex items-center gap-3 hover:border-zinc-600 transition-colors cursor-pointer">
              <span className="text-3xl shrink-0">{c.image}</span>
              <div className="min-w-0"><p className="text-xs font-medium line-clamp-2">{c.title}</p><p className="text-xs text-zinc-500 mt-0.5">${c.price}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PageCart() {
  const { cart, addToCart, navigate } = useApp()
  const cartCourses = courses.filter(c => cart.includes(c.id))
  const subtotal = cartCourses.reduce((s, c) => s + c.price, 0)
  const total = subtotal + 5.99

  if (cartCourses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <p className="text-zinc-400 mb-4">Your cart is empty</p>
        <button onClick={() => navigate('browse')} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm cursor-pointer">Browse Courses</button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-sm text-white font-semibold">Cart ({cartCourses.length})</span>
        <span className="text-zinc-700">→</span>
        <span className="text-sm text-zinc-500">Checkout</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            {cartCourses.map(c => (
              <div key={c.id} className="flex gap-4 py-3 border-b border-zinc-800 last:border-0">
                <div className="w-20 h-14 bg-gradient-to-br from-rose-900/30 to-purple-900/20 rounded-lg flex items-center justify-center text-2xl shrink-0">{c.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-1">{c.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{c.instructor} · {c.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${c.price}</p>
                  <p className="text-xs text-zinc-500 line-through">${c.originalPrice}</p>
                  <p onClick={() => addToCart(c.id)} className="text-xs text-red-400 mt-1 cursor-pointer hover:text-red-300">Remove</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 sticky top-20">
            <h3 className="font-bold mb-4">Receipt</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-xs"><span className="text-zinc-400">Subtotal ({cartCourses.length} items)</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-xs"><span className="text-zinc-400">Service fee</span><span>$5.99</span></div>
              <div className="flex justify-between text-xs"><span className="text-zinc-400">Coupon BAKE10</span><span className="text-emerald-400">Applied</span></div>
              <div className="border-t border-zinc-800 pt-2.5 flex justify-between font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button onClick={() => alert(`Order placed! $${total.toFixed(2)}\n\nConfirmation sent to your email.\n\nCourses:\n${cartCourses.map(c => `• ${c.title}`).join('\n')}`)} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg mt-5 transition-colors text-sm cursor-pointer">Complete Purchase</button>
            <p className="text-xs text-zinc-600 text-center mt-3">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CakeryPlatform() {
  const [page, setPage] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [cart, setCart] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const addToCart = useCallback((id) => {
    setCart(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])
  const addToEnrolled = useCallback((id) => {
    setEnrolled(prev => prev.includes(id) ? prev : [...prev, id])
  }, [])
  const navigate = useCallback((screen, course) => {
    setPage(screen)
    if (course) setSelectedCourse(course)
    if (screen === 'browse' && !course) setSelectedCourse(null)
  }, [])

  return (
    <AppCtx.Provider value={{ selectedCourse, cart, enrolled, search, setSearch, filterCat, setFilterCat, sortBy, setSortBy, navigate, addToCart, addToEnrolled }}>
      <div className="min-h-screen bg-zinc-950 text-white">
        <ClientHeader page={page} setPage={setPage} />
        {page === 'home' && <PageHome setPage={setPage} />}
        {page === 'browse' && <PageBrowse />}
        {page === 'learning' && <PageLearning />}
        {page === 'cart' && <PageCart />}
        {selectedCourse && <CourseDetailModal />}
      </div>
    </AppCtx.Provider>
  )
}
