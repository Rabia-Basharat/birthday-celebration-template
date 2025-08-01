import { useEffect, useState, useRef } from "react";
import { Heart, Code, Rocket, Star, Play, Pause, X, ArrowDown, Cpu, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

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
    emoji: "👋",
    title: "First Hello",
    description: "The moment our paths crossed and changed everything forever",
    colors: "from-love-red to-love-accent"
  },
  {
    id: 2,
    emoji: "💑",
    title: "First Date",
    description: "When debugging code turned into debugging our hearts",
    colors: "from-love-pink to-tech-teal"
  },
  {
    id: 3,
    emoji: "☕",
    title: "Late-night Talks",
    description: "Coffee-fueled conversations about code, dreams, and us",
    colors: "from-tech-teal to-love-accent"
  },
  {
    id: 4,
    emoji: "💍",
    title: "Engagement",
    description: "When you committed to our forever repository",
    colors: "from-love-red to-love-pink"
  },
  {
    id: 5,
    emoji: "💒🌍",
    title: "Future Plans",
    description: "Building our life together, one commit at a time",
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
              setVisibleElements(prev => new Set([...prev, elementId]));
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
              setAnimatedTimeline(prev => new Set([...prev, step]));
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
      setVisibleElements(prev => new Set([...prev, 'hero']));
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
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control actual audio playback here
    console.log(isPlaying ? 'Music paused...' : 'Playing romantic background music...');
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
        <FloatingElement icon={Heart} className="text-love-pink text-5xl" style={{ top: '60%', left: '5%' }} />
        <FloatingElement icon={Cpu} className="tech-icon text-love-accent text-4xl" style={{ top: '70%', right: '10%' }} />
        <FloatingElement icon={Laptop} className="text-tech-teal text-3xl" style={{ top: '40%', left: '85%' }} />
        <FloatingElement icon={Heart} className="text-love-red text-3xl" style={{ top: '80%', left: '80%' }} />
        <FloatingElement icon={Cpu} className="text-love-accent text-2xl" style={{ top: '30%', left: '70%' }} />
        <FloatingElement icon={Heart} className="text-love-pink text-4xl" style={{ top: '90%', left: '30%' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto z-10">
          <div 
            className={`fade-in ${visibleElements.has('hero') ? 'visible' : ''}`}
            data-element-id="hero"
          >
            <h1 className="font-romantic text-5xl md:text-7xl font-bold mb-8 leading-tight">
              To the <span className="gradient-text">Full-Stack Engineer</span><br />
              of My Heart <span className="pulse-heart inline-block">💻❤️</span>
            </h1>
            
            <div className="love-card rounded-3xl p-8 md:p-12 mb-12 mx-auto max-w-3xl">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                To my brilliant, passionate engineer who builds dreams with code and captures hearts with kindness...
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
                    <span className="text-gray-700">My forever teammate in life and love</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="text-love-accent w-5 h-5" />
                    <span className="text-gray-700">Hardworking, consistent, and inspiring</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={scrollToTimeline}
              className="bg-gradient-to-r from-love-red to-love-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0"
            >
              Our Love Story <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
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
              Our <span className="gradient-text">Love Algorithm</span>
            </h2>
            <p className="text-xl text-gray-600">A timeline of our beautiful journey together</p>
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
              A Special Message
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              I wrote something just for you...
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

      {/* Love Message Modal */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto love-card border-love-pink/30">
          <DialogHeader className="text-center">
            <h3 className="font-romantic text-3xl font-bold gradient-text mb-4">My Dearest Love 💕</h3>
          </DialogHeader>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Every line of code you write is like poetry to my heart. Your dedication, your passion, your brilliant mind - they all inspire me every single day.
            </p>
            
            <p>
              When I watch you debug a complex problem or architect a beautiful solution, I see the same care and precision you bring to our relationship. You don't just build applications; you build dreams, futures, and a better world.
            </p>
            
            <p>
              Your consistency amazes me - the way you commit to your craft is the same way you commit to us. Through late nights and early mornings, through challenging sprints and successful deployments, you remain my constant, my anchor, my home.
            </p>
            
            <p>
              I love how your eyes light up when you solve a particularly tricky algorithm, the same way they light up when you see me walk into the room. You've taught me that love, like good code, is built on strong foundations, clear communication, and endless patience.
            </p>
            
            <p className="font-medium text-love-red">
              You are my favorite feature, my most treasured variable, and the perfect merge to my heart's repository. Here's to a lifetime of building beautiful things together - in code and in love.
            </p>
            
            <div className="text-center pt-6">
              <p className="font-romantic text-xl text-love-red">Forever yours,</p>
              <p className="font-romantic text-2xl font-semibold gradient-text mt-2">Your Loving Partner</p>
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
            A Love <span className="gradient-text">Coded</span> Just for You
          </h3>
          
          <p className="text-gray-600 mb-6">
            Built with love, HTML, CSS, JavaScript, and endless affection 💕
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
