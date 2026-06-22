import { ChevronRight, ArrowRight, ShieldCheck, Truck, CreditCard, Leaf } from 'lucide-react';
import { ScreenType } from '../types';

interface HeroSectionProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedCategory: (category: string) => void;
}

export default function HeroSection({ setScreen, setSelectedCategory }: HeroSectionProps) {
  const horizontalCategories = [
    {
      id: 'Grocery',
      name: 'Greens',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgVIXS9LuPZLOXmKruPpE-8VKps1dRJSE77nIzNePw0VezXB37xCHbSXHpkXX5W00C-qTo5-RiftUzihQlGzUMmYHXoGGslkt6Cj8R7pzUtow9-tAaVeGwcVhadAUdSJ1VWqUTWMj8uuL51_A0fGggQ2M6PMi9aab7ddFc2IzAeV7Zp6-ekND3ztrIIhv3005AtgPKGlXFLUT70qr3d09qLgtylao58xNAxE2bMheo5z7QwaNS9Z5QVsVhHD36tio7NH6YkziW8hw'
    },
    {
      id: 'Grocery',
      name: 'Fruits',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9TFl9DpHmabxhmqtS25CKxjVXCVszLv3u7xghySpacSFh8YfTLGgA5eOuyp3fU1DzW1gXlpv45S_zA4ylk16mqDCPtY064OFRYD8C85RErwbiUR4a2DKJFyLhRPn5hOFn9Z_U3TzUsVfK7SYh3EsDnCOV4zczdzKFeLipTr-eRXTUSHnWrWK5UVRIKEIDgzGcQNJeSr91EEOICzURJ9OGVT-kZmsFABBD9cDk4TYZfcYBdLZBvYzNeBVMcVzbDyXLIYibeGQwIFs'
    },
    {
      id: 'Grocery',
      name: 'Bakery',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4H-sWlhABqACOr7eeWXMV-4gQD9MCdKqTxViwydaiEiRwz55A7Fm6QAbSlDIkpuhQ6KNsb8lr7jiX8HGqIZ2BI2iXsIBOnXdmP5sXDWquaNjp5g-Uq3ecXyt4xP4I_Ilp7_5uBDZPCk2GzmTRVhJoK4LZ25DPQcLrZqeqK4iv26qS8o936MYulQVydYjhWssrkKFeKAW7eGogTrdou23T9aLSV2C5kqnI1fR23US_xnX7TqRC0zZH3K4W-XCDekVgO4vHgTrVv7Q'
    },
    {
      id: 'Grocery',
      name: 'Dairy',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZL7OjG2_Sr-ZuGkkPg_h-KwFE8ko7BrzC_z1Pmbx8i1AspEjHDouJV_rMFGj8vtLpUzpXl48CRH_UrgrliJirKryzj9KVQLrKwJdKdRxGGqtgggKsArwa-5aiOvZxqxNIFUselounMTkBu_KcTSZh4Ud4W0KhHZnxvRKUzS06DDsGBTQWjgQJ5XFaIEoWenwuG52Y4K56Fku8yOwisDMffYRg0uZQxcPP_eCRePC7QVn8ZiWxsL-Ot2vy4Ny1_Qy0IRby3v1fwcE'
    },
    {
      id: 'Grocery', // can map to Grocery or others
      name: 'Pantry',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePrbI82be7SnddZIuBQZlw12QKXVnpEOJoy2AFKgYayGayzAXSkvW23jvNwGYFLoi0LL8esTgeIz6i44Jfr4l_lBQwMVScNwfaE2ULir5JZLjczgF5RK82WzhW7yQiG1ErTfganclO7O9YdHWZGMv8KN_pDlU3IFZA8_1YMgBx4YR_tJjAaYJbfhdG9HVPavbmSNQLhjFPMNLcBp_RPEHwmdS3U6Dod00ATPYdO9dyAwmJEx5UC_Pu9B5IvzRjoKck7nNNYBk9AI'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setScreen('shop');
  };

  return (
    <div className="relative overflow-hidden w-full pb-16">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-container/10 blur-3xl pointer-events-none -z-10 animate-pulse"></div>

      {/* Main Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-10 md:pt-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-container/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full shadow-sm animate-fade-in-down">
            <Leaf className="w-4 h-4 text-primary fill-primary/20 animate-spin-slow" />
            <span className="font-semibold text-xs tracking-wider uppercase font-sans">
              100% Certified Organic Grocer
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-on-surface">
            Freshness delivered to your <span className="text-primary italic">doorstep.</span>
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-on-surface-variant font-sans max-w-lg mx-auto lg:mx-0">
            Experience organic farm produce and premium artisanal goods curated carefully from independent vendors, managed beautifully with precision.
          </p>

          {/* Checkout & CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('Grocery');
                setScreen('shop');
              }}
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-2xl font-bold font-sans flex items-center justify-center gap-2 shadow-lg shadow-secondary/15 hover:shadow-xl hover:brightness-105 active:scale-98 transition-all duration-200"
              id="hero-shop-cta"
            >
              Shop Fresh Produce
              <ArrowRight className="w-5 h-5 text-on-secondary-container" />
            </button>

            {/* Mobile App Download Badges */}
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => alert("Google Play app download coming soon!")}
                className="flex items-center gap-2 border border-outline-variant/40 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm hover:bg-white transition-all active:scale-95"
                title="Download from Google Play"
              >
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">Get it on</p>
                  <p className="font-bold text-sm text-on-surface font-display">Google Play</p>
                </div>
              </button>
              <button 
                onClick={() => alert("App Store app download coming soon!")}
                className="flex items-center gap-2 border border-outline-variant/40 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm hover:bg-white transition-all active:scale-95"
                title="Download from App Store"
              >
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">Download on</p>
                  <p className="font-bold text-sm text-on-surface font-display">App Store</p>
                </div>
              </button>
            </div>
          </div>

          {/* Bento Grid Feature Lists */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 group">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold font-display text-on-surface">100% Organic</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Farm certified organic harvests directly in-store.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 group">
              <div className="bg-secondary-container/20 p-2.5 rounded-xl text-secondary-container group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 text-secondary" />
              </div>
              <h4 className="font-bold font-display text-on-surface">Quick Delivery</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Arrives at your home in under 45 minutes.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 group">
              <div className="bg-tertiary-container/10 p-2.5 rounded-xl text-tertiary group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5 text-tertiary" />
              </div>
              <h4 className="font-bold font-display text-on-surface">Easy Payments</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Safe checkout supporting direct GPay or COD.</p>
            </div>
          </div>
        </div>

        {/* Hero Banner Large Cover Display */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none"></div>
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl border-4 border-white/60 aspect-video lg:aspect-[4/5] max-h-[500px]">
            <img
              alt="Beautiful and colorful fresh organic grocery display inside market"
              className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmx87FvRfJcCgHbB8DFD2WN51wBPIgNHq2QhCg1TbUp6lRF5kPeEODH_CAskJAmeJRNkcEl53PGB65oK78VrtWc-5o2HL5-9U5wpha1kGQsG_JZThKiVFwMC2dQqsQb5Pz2UosXVzmqPMNSeXUQ9oT-RHP9LfylLmFM9TBEmMR_bbKG1AXDCKQvXdTNzaI0XYGJBEz6Oo__KClYWteZhWb2RDJUW5QLQ6l8cEJFc7KChENgKYdPDyFZBGzqTr1P6TX1WuzsQ3egjY"
            />
            {/* Status indicator glass layer */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white/30 shadow-lg flex items-center justify-between">
              <div>
                <h5 className="font-bold font-display text-on-surface text-base">Daily Fresh Harvest</h5>
                <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Restocked 2 hours ago</p>
              </div>
              <span className="bg-primary text-white text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm">
                Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Horizontal scroll section */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 mt-16">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold font-display text-on-surface">Browse by category</h3>
            <p className="text-sm text-on-surface-variant mt-1">Directly select premium organic ingredients</p>
          </div>
          <button
            onClick={() => handleCategoryClick('Grocery')}
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline active:scale-95 transition-transform"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel container */}
        <div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {horizontalCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex-none w-48 aspect-square rounded-[24px] relative overflow-hidden group cursor-pointer snap-start shadow-sm border border-neutral-100"
              id={`cat-card-${cat.name.toLowerCase()}`}
            >
              <div className="absolute inset-0 bg-neutral-100 group-hover:scale-105 transition-transform duration-500">
                <img
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-90"
                  src={cat.image}
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-5">
                <span className="text-white font-extrabold font-display text-base tracking-wide uppercase">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
