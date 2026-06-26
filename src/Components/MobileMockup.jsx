import { useState } from 'react'

const courses = [
  { id: 1, title: "Complete Cake Baking Masterclass", instructor: "Chef Maria", rating: 4.8, reviews: 12453, price: 84.99, originalPrice: 199.99, image: "🎂", level: "All Levels", duration: "24.5h", lectures: 186, bestseller: true, category: "baking", colors: "from-rose-400 to-pink-500", bg: "from-rose-900/30 via-pink-900/20 to-zinc-900" },
  { id: 2, title: "Fondant Art & 3D Cake Sculpting", instructor: "James Chen", rating: 4.7, reviews: 8921, price: 74.99, originalPrice: 179.99, image: "🍰", level: "Intermediate", duration: "18h", lectures: 142, bestseller: true, category: "decorating", colors: "from-purple-400 to-violet-500", bg: "from-purple-900/30 via-violet-900/20 to-zinc-900" },
  { id: 3, title: "French Patisserie Masterclass", instructor: "Sophie Laurent", rating: 4.9, reviews: 15672, price: 94.99, originalPrice: 224.99, image: "🥐", level: "Advanced", duration: "32h", lectures: 248, bestseller: true, category: "pastry", colors: "from-amber-400 to-orange-500", bg: "from-amber-900/30 via-orange-900/20 to-zinc-900" },
  { id: 4, title: "Buttercream Flower Piping", instructor: "Priya Sharma", rating: 4.6, reviews: 6789, price: 49.99, originalPrice: 129.99, image: "🌸", level: "Beginner", duration: "8h", lectures: 64, bestseller: false, category: "decorating", colors: "from-pink-400 to-rose-500", bg: "from-pink-900/30 via-rose-900/20 to-zinc-900" },
  { id: 5, title: "Vegan & Gluten-Free Baking", instructor: "Dr. Aisha Patel", rating: 4.8, reviews: 9845, price: 69.99, originalPrice: 159.99, image: "🌱", level: "All Levels", duration: "16h", lectures: 128, bestseller: false, category: "baking", colors: "from-emerald-400 to-green-500", bg: "from-emerald-900/30 via-green-900/20 to-zinc-900" },
  { id: 6, title: "Korean Lunchbox Cakes", instructor: "Yuna Kim", rating: 4.5, reviews: 4532, price: 54.99, originalPrice: 139.99, image: "🎁", level: "Beginner", duration: "6.5h", lectures: 52, bestseller: false, category: "decorating", colors: "from-sky-400 to-blue-500", bg: "from-sky-900/30 via-blue-900/20 to-zinc-900" },
]

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'browse', label: 'Browse', icon: '🔍' },
  { id: 'detail', label: 'Detail', icon: '📋' },
  { id: 'learning', label: 'Learning', icon: '📖' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
]

function PhoneFrame({ children, label }) {
  return (
    <div className="screen-wrapper flex flex-col items-center gap-3">
      <div className="w-[375px] h-[812px] bg-white rounded-[48px] border-[6px] border-zinc-800 shadow-2xl shadow-black/40 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-2xl z-50" />
        <div className="h-full overflow-y-auto scrollbar-none">
          <div className="h-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
      <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{label}</span>
    </div>
  )
}

function Star({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      <span className="text-[10px] text-amber-400">{'★'.repeat(Math.floor(rating))}</span>
      <span className="text-[10px] text-amber-400/30">{'★'.repeat(5 - Math.floor(rating))}</span>
      <span className="text-[10px] text-zinc-400 font-semibold ml-0.5">{rating}</span>
    </span>
  )
}

function MobileHome() {
  return (
    <>
      <div className="bg-white px-4 pt-3 pb-2 flex items-center justify-between border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🧁</span>
          <span className="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">CakeMaster</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm">🔔</span>
          <span className="text-zinc-400 text-sm">🛒</span>
        </div>
      </div>

      <div className="bg-white px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2.5">
          <span className="text-xs">🔍</span>
          <input placeholder="Search cake classes..." className="bg-transparent text-xs text-zinc-900 placeholder-zinc-400 outline-none flex-1" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 pt-4 pb-3">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl opacity-10">🎂</div>
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Flash Sale</p>
            <p className="font-bold text-lg mt-0.5">50% Off All Baking Courses</p>
            <p className="text-xs opacity-80 mt-1">Ends in 12h 34m</p>
            <button className="mt-3 bg-white text-purple-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">Shop Now</button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-bold text-zinc-900">Categories</p>
            <p className="text-[10px] text-purple-500 font-medium">See All</p>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {[
              { icon: '🔥', label: 'Baking' },
              { icon: '🎨', label: 'Decorating' },
              { icon: '🥐', label: 'Pastry' },
              { icon: '💼', label: 'Business' },
              { icon: '🌱', label: 'Vegan' },
              { icon: '💒', label: 'Wedding' },
            ].map(c => (
              <div key={c.label} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-xl">{c.icon}</div>
                <span className="text-[9px] text-zinc-600 font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-bold text-zinc-900">Trending Now</p>
            <p className="text-[10px] text-purple-500 font-medium">View All</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-none">
            {courses.slice(0, 4).map(c => (
              <div key={c.id} className="shrink-0 w-40">
                <div className={`h-24 bg-gradient-to-br ${c.bg} rounded-2xl flex items-center justify-center text-4xl relative`}>
                  {c.bestseller && <span className="absolute top-1.5 left-1.5 bg-amber-400 text-[8px] font-bold text-black px-1.5 py-0.5 rounded-md">BEST</span>}
                </div>
                <p className="text-[10px] font-semibold text-zinc-900 mt-1.5 line-clamp-2 leading-tight">{c.title}</p>
                <Star rating={c.rating} />
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-zinc-900">${c.price}</span>
                  <span className="text-[9px] text-zinc-400 line-through">${c.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-bold text-zinc-900">Recommended</p>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 3).map(c => (
              <div key={c.id} className="flex gap-3">
                <div className={`w-20 h-16 bg-gradient-to-br ${c.bg} rounded-xl flex items-center justify-center text-3xl shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-zinc-900 line-clamp-2 leading-tight">{c.title}</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">{c.instructor}</p>
                  <Star rating={c.rating} />
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">${c.price}</span>
                    <span className="text-[9px] text-zinc-400 line-through">${c.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </>
  )
}

function MobileBrowse() {
  return (
    <>
      <div className="bg-white px-4 pt-3 pb-2 flex items-center justify-between border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">←</span>
          <span className="font-bold text-sm text-zinc-900">Browse Courses</span>
        </div>
        <span className="text-zinc-400 text-sm">🔍</span>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none border-b border-zinc-100">
          {['All', 'Baking', 'Decorating', 'Pastry', 'Business', 'Vegan'].map((f, i) => (
            <span key={f} className={`shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-full ${i === 0 ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>{f}</span>
          ))}
        </div>

        <div className="px-4 pt-3 pb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] text-zinc-400">8 courses</p>
            <div className="flex items-center gap-1 text-[9px] text-zinc-500">
              <span>Sort by</span>
              <span className="font-semibold text-zinc-900">Popular ▼</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {courses.map(c => (
              <div key={c.id} className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
                <div className={`h-24 bg-gradient-to-br ${c.bg} flex items-center justify-center text-4xl relative`}>
                  {c.bestseller && <span className="absolute top-1.5 left-1.5 bg-amber-400 text-[7px] font-bold text-black px-1 py-0.5 rounded">BEST</span>}
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
    </>
  )
}

function MobileDetail() {
  const c = courses[0]
  return (
    <>
      <div className="relative shrink-0">
        <div className={`h-56 bg-gradient-to-br ${c.bg} flex items-center justify-center text-8xl`} />
        <div className="absolute top-3 left-3 bg-black/30 backdrop-blur w-7 h-7 rounded-full flex items-center justify-center text-white text-xs">←</div>
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur w-7 h-7 rounded-full flex items-center justify-center text-white text-xs">♡</div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 pt-8 pb-4 px-4">
          <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">BAKING</span>
          <h1 className="text-base font-bold text-zinc-900 mt-1.5 leading-tight">{c.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Star rating={c.rating} />
            <span className="text-[9px] text-zinc-400">({(c.reviews/1000).toFixed(1)}k reviews)</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">by {c.instructor}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-zinc-900">${c.price}</span>
              <span className="text-xs text-zinc-400 line-through ml-2">${c.originalPrice}</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">58% OFF</span>
          </div>

          <button className="w-full bg-purple-600 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-purple-200">Enroll Now - ${c.price}</button>
          <button className="w-full border border-zinc-200 text-zinc-900 font-semibold text-xs py-3 rounded-xl">Add to Cart</button>

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
            <h3 className="text-sm font-bold text-zinc-900 mb-2">What You'll Learn</h3>
            {['Professional cake baking fundamentals', 'Buttercream & fondant techniques', 'Business strategies for selling cakes', 'Recipe development & flavor pairing', 'Certificate of completion'].map((item, i) => (
              <div key={i} className="flex gap-2 py-1.5">
                <span className="text-emerald-500 text-[10px] shrink-0 mt-0.5">✓</span>
                <span className="text-[10px] text-zinc-600">{item}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-2">Curriculum</h3>
            <div className="space-y-1">
              {["Introduction & Kitchen Setup (45min)", "Basic Sponge Cakes (3h)", "Buttercream Mastery (2.5h)", "Fondant Fundamentals (3h)", "Wedding Cake Construction (4h)"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-50 rounded-lg px-3 py-2">
                  <span className="text-[9px] text-zinc-400 w-4">{String(i+1).padStart(2,'0')}</span>
                  <span className="text-[10px] text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-2">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${c.bg} rounded-full flex items-center justify-center text-2xl`} />
              <div>
                <p className="text-xs font-semibold text-zinc-900">{c.instructor}</p>
                <p className="text-[9px] text-zinc-500">Professional Pastry Chef • 67k students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>
    </>
  )
}

function MobileLearning() {
  return (
    <>
      <div className="bg-white px-4 pt-3 pb-2 border-b border-zinc-100 shrink-0">
        <p className="font-bold text-base text-zinc-900">My Learning</p>
        <p className="text-[10px] text-zinc-500 mt-0.5">3 active courses</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 pt-4 pb-6 space-y-3">
          {[
            { ...courses[0], progress: 64, last: '2 days ago' },
            { ...courses[1], progress: 28, last: '1 week ago' },
            { ...courses[4], progress: 12, last: '3 days ago' },
          ].map((c, i) => (
            <div key={i} className="bg-zinc-50 rounded-2xl overflow-hidden">
              <div className={`h-24 bg-gradient-to-br ${c.bg} flex items-center justify-center text-5xl relative`}>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${c.progress}%` }} />
                </div>
                <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur text-white text-[8px] font-semibold px-2 py-0.5 rounded-full">{c.progress}%</span>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-semibold text-zinc-900 line-clamp-1">{c.title}</p>
                <p className="text-[9px] text-zinc-500 mt-0.5">{c.instructor} • Last accessed {c.last}</p>
                <button className="mt-2 w-full bg-purple-600 text-white text-[9px] font-semibold py-2 rounded-lg">Continue Learning</button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <h3 className="text-sm font-bold text-zinc-900 mb-3">Recommended For You</h3>
            <div className="space-y-2.5">
              {courses.slice(2, 5).map(c => (
                <div key={c.id} className="flex items-center gap-3">
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
    </>
  )
}

function MobileCart() {
  const cart = [courses[0], courses[3]]
  const total = cart.reduce((s, c) => s + c.price, 0)
  return (
    <>
      <div className="bg-white px-4 pt-3 pb-2 border-b border-zinc-100 shrink-0">
        <p className="font-bold text-base text-zinc-900">My Cart</p>
        <p className="text-[10px] text-zinc-500 mt-0.5">{cart.length} items</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 pt-3 pb-6 space-y-3">
          {cart.map((c, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-zinc-100">
              <div className={`w-20 h-16 bg-gradient-to-br ${c.bg} rounded-xl flex items-center justify-center text-3xl shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-zinc-900 line-clamp-2 leading-tight">{c.title}</p>
                <p className="text-[9px] text-zinc-500 mt-0.5">{c.instructor}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-zinc-900">${c.price}</span>
                  <span className="text-[9px] text-red-400">Remove</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-6">
          <div className="bg-purple-50 rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎁</span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-purple-900">Apply Coupon</p>
                <p className="text-[8px] text-purple-600">Save extra 10% with code BAKE10</p>
              </div>
              <span className="text-[10px] text-purple-500 font-semibold">Apply</span>
            </div>
          </div>

          <div className="space-y-2 text-[10px]">
            <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Service Fee</span><span>$3.99</span></div>
            <div className="flex justify-between font-bold text-sm pt-2 border-t border-zinc-100"><span>Total</span><span>${(total + 3.99).toFixed(2)}</span></div>
          </div>

          <button className="w-full bg-purple-600 text-white font-semibold text-xs py-3.5 rounded-xl mt-4 shadow-lg shadow-purple-200">Checkout (${(total + 3.99).toFixed(2)})</button>
          <p className="text-center text-[9px] text-zinc-400 mt-2">30-day money-back guarantee</p>
        </div>
      </div>
    </>
  )
}

function MobileTabBar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white border-t border-zinc-100 px-4 pb-5 pt-1.5 flex justify-around shrink-0">
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <span className={`text-lg ${activeTab === t.id ? '' : 'opacity-30'}`}>{t.icon}</span>
          <span className={`text-[8px] font-semibold ${activeTab === t.id ? 'text-purple-600' : 'text-zinc-400'}`}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function MobileMockupView() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-zinc-100 py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-zinc-900">CakeMaster — Mobile App Mockup</h1>
        <p className="text-zinc-500 text-sm mt-1">iOS App Design • Cake Baking Online Classes</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { id: 'home', label: 'Home', color: '#fff' },
          { id: 'browse', label: 'Browse', color: '#fff' },
          { id: 'detail', label: 'Course Detail', color: '#fff' },
          { id: 'learning', label: 'My Learning', color: '#fff' },
          { id: 'cart', label: 'Cart / Checkout', color: '#fff' },
        ].map(screen => (
          <PhoneFrame key={screen.id} label={screen.label}>
            <div style={{ backgroundColor: screen.color }} className="flex flex-col h-full">
              {screen.id === 'home' && <MobileHome />}
              {screen.id === 'browse' && <MobileBrowse />}
              {screen.id === 'detail' && <MobileDetail />}
              {screen.id === 'learning' && <MobileLearning />}
              {screen.id === 'cart' && <MobileCart />}
              <MobileTabBar activeTab={screen.id} setActiveTab={() => {}} />
            </div>
          </PhoneFrame>
        ))}
      </div>
      <div className="text-center mt-10 text-xs text-zinc-400">
        CakeMaster — UI/UX Mockup for Client Review
      </div>
    </div>
  )
}
