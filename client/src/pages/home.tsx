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
    title: "Tiny Human, Big Dreams",
    description: "When you were just a little coding prodigy in the making (probably debugging your toys already!)",
    colors: "from-love-red to-love-accent"
  },
  {
    id: 2,
    emoji: "🎓",
    title: "The Learning Machine",
    description: "Absorbing knowledge like a human sponge, probably the only kid excited about math class!",
    colors: "from-tech-teal to-love-accent"
  },
  {
    id: 3,
    emoji: "💻",
    title: "Code Wizard Status: ACHIEVED",
    description: "Now you make computers do magic tricks while I'm still figuring out why my phone freezes 😅",
    colors: "from-love-accent to-tech-teal"
  },
  {
    id: 4,
    emoji: "💍",
    title: "Future Mr. & Mrs. Debug",
    description: "Soon we'll be merging our lives like the perfect Git commit - no conflicts, just pure happiness!",
    colors: "from-love-pink to-love-red"
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
              Happy Birthday to My <span className="gradient-text">Coding Genius</span><br />
              & Future Husband <span className="pulse-heart inline-block">💻🎂💍</span>
            </h1>
            
            <div className="love-card rounded-3xl p-8 md:p-12 mb-12 mx-auto max-w-3xl">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                🎉 Another year of debugging life with my favorite human compiler! 🎉<br/>
                <span className="text-base italic">Who knew I'd fall for someone who speaks in semicolons and thinks in algorithms?</span>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-tech-teal w-5 h-5" />
                    <span className="text-gray-700">Turns coffee into code like magic ☕➡️💻</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Rocket className="text-love-red w-5 h-5" />
                    <span className="text-gray-700">Builds apps by day, steals hearts by night 🌙</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="text-love-pink w-5 h-5" />
                    <span className="text-gray-700">Your bugs are cute, your hugs are perfect 🐛➡️🤗</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="text-love-accent w-5 h-5" />
                    <span className="text-gray-700">Strict coding standards, soft marshmallow heart</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Cpu className="text-tech-teal w-5 h-5" />
                    <span className="text-gray-700">You're the only exception I never want to handle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gift className="text-love-red w-5 h-5" />
                    <span className="text-gray-700">Soon-to-be Mr. & Mrs. <span className="font-mono">{"{ us: \"forever\" }"}</span></span>
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
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo1') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo1"
            >
              <div className="w-full h-64 bg-gradient-to-br from-love-pink/20 to-tech-teal/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-6xl mb-4">👶✨</div>
                  <p className="text-gray-600 font-medium">Mini Genius Era</p>
                  <p className="text-sm text-gray-500 italic">"Probably already asking 'but why?' about everything!"</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/10 to-pink-200/10 animate-pulse"></div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Cutest Troubleshooter</h3>
              <p className="text-gray-600 text-sm mt-2">Back when your biggest bug was a missing toy 🧸</p>
            </div>

            {/* Teenage/School Photo Placeholder */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo2') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo2"
            >
              <div className="w-full h-64 bg-gradient-to-br from-tech-teal/20 to-love-red/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-6xl mb-4">🎓🤓</div>
                  <p className="text-gray-600 font-medium">Study Mode Activated</p>
                  <p className="text-sm text-gray-500 italic">"When you actually enjoyed homework (weirdo! 😉)"</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 to-green-200/10 animate-pulse"></div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Knowledge Collector</h3>
              <p className="text-gray-600 text-sm mt-2">Building the foundation for world domination 🌍</p>
            </div>

            {/* Recent/Current Photo Placeholder */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo3') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo3"
            >
              <div className="w-full h-64 bg-gradient-to-br from-love-red/20 to-love-accent/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-6xl mb-4">💻👨‍💻</div>
                  <p className="text-gray-600 font-medium">Final Form: Engineer God</p>
                  <p className="text-sm text-gray-500 italic">"Now you make computers cry tears of joy!"</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/10 to-red-200/10 animate-pulse"></div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">My Coding Hero</h3>
              <p className="text-gray-600 text-sm mt-2">And soon-to-be husband! 💍✨</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 italic text-lg mb-4">
              "Every photo tells a story, every story builds a legacy, every legacy shapes the future"
            </p>
            <p className="text-sm text-gray-500">
              📸 <em>Upload your actual photos here to make this even more special!</em> 📸
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
              The <span className="gradient-text">Evolution</span> of My Favorite Human
            </h2>
            <p className="text-xl text-gray-600">From cute kid to coding genius (and future hubby! 💕)</p>
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
              🎁 Secret Birthday Surprise Inside! 🎁
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              I've written something that might make you smile... or roll your eyes at my cheesiness 😅
            </p>
            
            <div className="relative inline-block">
              <Button 
                onClick={openModal}
                className="surprise-btn sparkle-button bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-16 py-8 rounded-full text-2xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-125 pulse-heart border-0 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Gift className="w-6 h-6 animate-bounce" />
                  <span className="font-extrabold drop-shadow-lg" style={{ color: '#ffffff' }}>
                    Open Your Surprise!
                  </span>
                  <Cake className="w-6 h-6 animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 animate-pulse"></div>
              </Button>
              
              {/* Floating sparkles around button */}
              <div className="absolute -top-4 -left-4 text-yellow-400 animate-ping">✨</div>
              <div className="absolute -top-2 -right-6 text-pink-400 animate-ping delay-75">💖</div>
              <div className="absolute -bottom-4 -left-6 text-purple-400 animate-ping delay-150">🌟</div>
              <div className="absolute -bottom-2 -right-4 text-red-400 animate-ping delay-300">🎉</div>
            </div>
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
            <p className="text-lg font-semibold text-center gradient-text">
              🎂 Happy Birthday to My Favorite Compiler! 🎂
            </p>
            
            <p>
              Another year of you being absolutely amazing, and another year of me wondering how I got so lucky! Every line of code you write is like magic to me (seriously, how do you make computers obey you like that?!).
            </p>
            
            <p className="bg-gradient-to-r from-love-pink/10 to-tech-teal/10 p-4 rounded-lg border-l-4 border-love-red">
              <strong>Fun Fact:</strong> You might be the only person I know who gets genuinely excited about clean code architecture. And honestly? It's adorable. 😍
            </p>
            
            <p>
              I love your "strict engineer mode" - you know, when you get all serious about following best practices and maintaining coding standards. Some people call it demanding, but I call it <em>incredibly attractive</em>. There's something so sexy about a man who knows his semicolons from his brackets! 😏
            </p>
            
            <p>
              But what I love most is watching your "tough engineer" facade crumble the moment someone needs help or comfort. You're like a software update that seems intimidating at first, but then you realize it just makes everything better and more secure. 💕
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-center text-lg font-medium text-gray-800 mb-4">
                <Code className="inline w-5 h-5 mr-2" />
                Birthday Wishes in Code:
              </p>
              <div className="font-mono text-sm bg-gray-800 text-green-400 p-4 rounded-lg">
                <div>{"if (today == yourBirthday) {"}</div>
                <div className="ml-4">{"happiness.level = Infinity;"}</div>
                <div className="ml-4">{"love.increment();"}</div>
                <div className="ml-4">{"celebrationMode = true;"}</div>
                <div className="ml-4">{"return \"Best day ever!\";"}</div>
                <div>{"}"}</div>
              </div>
            </div>
            
            <p className="font-medium text-love-red text-center text-lg">
              Here's to another year of your beautiful contradictions - debugging problems by day, stealing hearts by night! 
              You're my favorite exception, and I never want to catch you! 💘
            </p>
            
            <div className="text-center pt-6">
              <p className="font-romantic text-xl text-love-red">Forever your biggest fan & future wife,</p>
              <p className="font-romantic text-2xl font-semibold gradient-text mt-2">Your Loving Fiancée 💍</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Cake className="text-love-accent w-8 h-8 pulse-heart" />
                <Heart className="text-love-red w-8 h-8 pulse-heart" />
                <Code className="text-tech-teal w-8 h-8 pulse-heart" />
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
          
          <div className="mb-8">
            <h3 className="font-romantic text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              A Birthday Tribute <span className="gradient-text">Coded</span> with Love
            </h3>
            
            <p className="text-gray-600 mb-6">
              Built with React, TypeScript, lots of coffee, and infinite love for my favorite human 🎂💕
            </p>
            
            <div className="love-card rounded-xl p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Development Stats:</strong>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>💻 Lines of love: ∞</div>
                <div>☕ Coffee consumed: 47 cups</div>
                <div>🐛 Bugs found: 0</div>
                <div>💕 Happiness level: MAX</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 text-2xl">
              <Heart className="text-love-red pulse-heart w-8 h-8" />
              <Code className="text-tech-teal w-8 h-8 tech-icon" />
              <Cake className="text-love-accent pulse-heart w-8 h-8" />
              <Gift className="text-love-pink w-8 h-8" />
              <Heart className="text-love-red pulse-heart w-8 h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
