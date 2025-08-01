import { useEffect, useState, useRef } from "react";
import { Heart, Code, Rocket, Star, Play, Pause, X, ArrowDown, Cpu, Laptop, Gift, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TimelineItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  colors: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    emoji: "👶",
    title: "Childhood Dreams",
    description: "Little hands already reaching for big dreams and endless possibilities",
    colors: "from-love-red to-love-accent"
  },
  {
    id: 2,
    emoji: "🎓",
    title: "Learning & Growing",
    description: "Every challenge met with determination, every lesson absorbed with passion",
    colors: "from-tech-teal to-love-accent"
  },
  {
    id: 3,
    emoji: "💻",
    title: "Engineering Excellence",
    description: "Building the future with code, one brilliant solution at a time",
    colors: "from-love-accent to-tech-teal"
  }
];

const FloatingElement = ({ icon: Icon, className, style }: { icon: any, className: string, style: React.CSSProperties }) => (
  <Icon className={`floating-element ${className}`} style={style} />
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [animatedTimeline, setAnimatedTimeline] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timelineObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-element-id');
            if (elementId) {
              setVisibleElements(prev => new Set(Array.from(prev).concat(elementId)));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Timeline animation observer
    timelineObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '0');
            setTimeout(() => {
              setAnimatedTimeline(prev => new Set(Array.from(prev).concat(step)));
            }, step * 200);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements
    document.querySelectorAll('[data-element-id]').forEach(el => {
      observerRef.current?.observe(el);
    });

    document.querySelectorAll('[data-step]').forEach(el => {
      timelineObserverRef.current?.observe(el);
    });

    // Initial hero animation
    setTimeout(() => {
      setVisibleElements(prev => new Set(Array.from(prev).concat('hero')));
    }, 500);

    return () => {
      observerRef.current?.disconnect();
      timelineObserverRef.current?.disconnect();
    };
  }, []);

  const scrollToTimeline = () => {
    const timelineElement = document.getElementById('timeline');
    timelineElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      // Open the YouTube video in a new tab
      window.open('https://youtu.be/BDjWVXUbwNE?si=miyfyGCTK1C1d1X5', '_blank');
    }
    setIsPlaying(!isPlaying);
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="font-modern bg-soft-white text-gray-800 overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingElement icon={Heart} className="text-love-red text-4xl" style={{ top: '10%', left: '10%' }} />
        <FloatingElement icon={Code} className="text-tech-teal text-3xl" style={{ top: '20%', right: '15%' }} />
        <FloatingElement icon={Cake} className="text-love-accent text-4xl" style={{ top: '15%', left: '85%' }} />
        <FloatingElement icon={Heart} className="text-love-pink text-5xl" style={{ top: '60%', left: '5%' }} />
        <FloatingElement icon={Cpu} className="tech-icon text-love-accent text-4xl" style={{ top: '70%', right: '10%' }} />
        <FloatingElement icon={Gift} className="text-love-red text-3xl" style={{ top: '25%', left: '75%' }} />
        <FloatingElement icon={Laptop} className="text-tech-teal text-3xl" style={{ top: '40%', left: '85%' }} />
        <FloatingElement icon={Heart} className="text-love-red text-3xl" style={{ top: '80%', left: '80%' }} />
        <FloatingElement icon={Cake} className="text-love-pink text-3xl" style={{ top: '45%', left: '3%' }} />
        <FloatingElement icon={Cpu} className="text-love-accent text-2xl" style={{ top: '30%', left: '70%' }} />
        <FloatingElement icon={Heart} className="text-love-pink text-4xl" style={{ top: '90%', left: '30%' }} />
        <FloatingElement icon={Gift} className="text-tech-teal text-2xl" style={{ top: '85%', right: '5%' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto z-10">
          <div 
            className={`fade-in ${visibleElements.has('hero') ? 'visible' : ''}`}
            data-element-id="hero"
          >
            <h1 className="font-romantic text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Happy Birthday to the <span className="gradient-text">Full-Stack Engineer</span><br />
              of My Heart <span className="pulse-heart inline-block">💻🎂❤️</span>
            </h1>
            
            <div className="love-card rounded-3xl p-8 md:p-12 mb-12 mx-auto max-w-3xl">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                Celebrating another year of my brilliant engineer who builds dreams with code and captures hearts with his caring spirit...
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-tech-teal w-5 h-5" />
                    <span className="text-gray-700">A passionate and skilled engineer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Rocket className="text-love-red w-5 h-5" />
                    <span className="text-gray-700">Someone who builds dreams with code</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="text-love-pink w-5 h-5" />
                    <span className="text-gray-700">Strict but caring, with rules that show love</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="text-love-accent w-5 h-5" />
                    <span className="text-gray-700">Behind every firm word is endless affection</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={scrollToTimeline}
              className="bg-gradient-to-r from-love-red to-love-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0"
            >
              Your Journey <Gift className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-love-pink/5 to-soft-white">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 fade-in ${visibleElements.has('gallery-header') ? 'visible' : ''}`}
            data-element-id="gallery-header"
          >
            <h2 className="font-romantic text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              From Little Dreams to <span className="gradient-text">Big Code</span>
            </h2>
            <p className="text-xl text-gray-600">A visual journey through the years</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Childhood Photo Placeholder */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo1') ? 'visible' : ''}`}
              data-element-id="photo1"
            >
              <div className="w-full h-64 bg-gradient-to-br from-love-pink/20 to-tech-teal/20 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Cake className="w-16 h-16 text-love-accent mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Childhood Photo</p>
                  <p className="text-sm text-gray-500">Add your favorite childhood memory</p>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">Little Dreamer</h3>
              <p className="text-gray-600 text-sm mt-2">Where it all began</p>
            </div>

            {/* Teenage/School Photo Placeholder */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo2') ? 'visible' : ''}`}
              data-element-id="photo2"
            >
              <div className="w-full h-64 bg-gradient-to-br from-tech-teal/20 to-love-red/20 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Star className="w-16 h-16 text-tech-teal mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Growing Up Photo</p>
                  <p className="text-sm text-gray-500">School days or teenage years</p>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">Future Builder</h3>
              <p className="text-gray-600 text-sm mt-2">Dreams taking shape</p>
            </div>

            {/* Recent/Current Photo Placeholder */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo3') ? 'visible' : ''}`}
              data-element-id="photo3"
            >
              <div className="w-full h-64 bg-gradient-to-br from-love-red/20 to-love-accent/20 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Code className="w-16 h-16 text-love-red mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Recent Photo</p>
                  <p className="text-sm text-gray-500">The brilliant engineer today</p>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">Code Master</h3>
              <p className="text-gray-600 text-sm mt-2">Living the dream</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 italic">
              "Every photo tells a story, every story builds a legacy, every legacy shapes the future"
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 bg-gradient-to-b from-soft-white to-love-pink/10">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-16 fade-in ${visibleElements.has('timeline-header') ? 'visible' : ''}`}
            data-element-id="timeline-header"
          >
            <h2 className="font-romantic text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Your Life <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600">Growing from childhood dreams to brilliant engineer</p>
          </div>
          
          <div className="space-y-12">
            {timelineItems.map((item) => (
              <div 
                key={item.id}
                className={`timeline-item flex items-center space-x-6 md:space-x-12 ${animatedTimeline.has(item.id) ? 'animate' : ''}`}
                data-step={item.id}
              >
                <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${item.colors} rounded-full flex items-center justify-center text-2xl text-white`}>
                  {item.emoji}
                </div>
                <div className="love-card rounded-2xl p-6 flex-1">
                  <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surprise Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div 
            className={`fade-in ${visibleElements.has('surprise') ? 'visible' : ''}`}
            data-element-id="surprise"
          >
            <h2 className="font-romantic text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              A Birthday Message
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              I wrote something special for your birthday...
            </p>
            
            <Button 
              onClick={openModal}
              className="surprise-btn bg-gradient-to-r from-love-red via-love-pink to-tech-teal text-white px-12 py-6 rounded-full text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 pulse-heart border-0"
            >
              Click Me 💌
            </Button>
          </div>
        </div>
      </section>

      {/* Birthday Message Modal */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto love-card border-love-pink/30">
          <DialogHeader className="text-center">
            <DialogTitle className="font-romantic text-3xl font-bold gradient-text mb-4">Happy Birthday My Love 🎂💕</DialogTitle>
            <DialogDescription className="sr-only">A special birthday message</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Another year of your brilliant mind, your caring heart, and your incredible journey. Every line of code you write is like poetry to my soul, and every day with you is a gift.
            </p>
            
            <p>
              I know you can be strict with your rules - some might call them tough or demanding. But I see what others miss: behind every firm boundary is a heart that cares deeply. Your rules aren't harsh; they're your way of protecting and guiding those you love.
            </p>
            
            <p>
              When you set high standards, it's because you believe in excellence. When you're tough on the outside, it's because you're nurturing something precious on the inside. Your strictness is just love wearing work clothes.
            </p>
            
            <p>
              I've seen how your "stern" face melts into the softest smile when you think no one is watching. How your "rigid" rules bend the moment someone needs comfort. You're like the best kind of code - structured and reliable on the surface, but elegant and beautiful in its complexity.
            </p>
            
            <p className="font-medium text-love-red">
              So on your birthday, I celebrate not just the brilliant engineer you are, but the tender soul beneath that strong exterior. Your rules may seem tough, but your heart is pure gold. Here's to another year of your beautiful contradictions - strict but loving, tough but tender, my favorite debug partner in life.
            </p>
            
            <div className="text-center pt-6">
              <p className="font-romantic text-xl text-love-red">With all my love on your special day,</p>
              <p className="font-romantic text-2xl font-semibold gradient-text mt-2">Your Forever Admirer</p>
              <div className="flex justify-center mt-4">
                <Cake className="text-love-accent w-8 h-8 pulse-heart" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-love-red/10 to-tech-teal/10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Button 
              onClick={toggleMusic}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-love-pink/30 text-gray-700 px-6 py-3 rounded-full hover:bg-love-pink/10 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              {isPlaying ? (
                <Pause className="text-love-red w-4 h-4" />
              ) : (
                <Play className="text-love-red w-4 h-4" />
              )}
              <span>{isPlaying ? 'Pause Music' : 'Play Our Song'}</span>
            </Button>
          </div>
          
          <h3 className="font-romantic text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            A Birthday Tribute <span className="gradient-text">Coded</span> Just for You
          </h3>
          
          <p className="text-gray-600 mb-6">
            Built with love, React, TypeScript, and endless birthday wishes 🎂💕
          </p>
          
          <div className="flex justify-center space-x-6 text-2xl">
            <Heart className="text-love-red pulse-heart w-6 h-6" />
            <Code className="text-tech-teal w-6 h-6" />
            <Heart className="text-love-pink pulse-heart w-6 h-6" />
          </div>
        </div>
      </footer>
    </div>
  );
}
