import { useEffect, useState, useRef } from "react";
import { Heart, Code, Rocket, Star, Play, Pause, X, ArrowDown, Cpu, Laptop, Gift, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import ConfettiExplosion, { useConfetti } from "@/components/ConfettiExplosion";



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
    emoji: "🌟",
    title: "Early Beginnings",
    description: "✨ The journey of a thousand miles begins with a single step ✨",
    colors: "from-love-red to-love-accent"
  },
  {
    id: 2,
    emoji: "🚀",
    title: "Dreams Take Flight",
    description: "🚀 Reaching for the stars and beyond! 🚀",
    colors: "from-tech-teal to-love-accent"
  },
  {
    id: 3,
    emoji: "⚡",
    title: "Passion Ignites",
    description: "⚡ Finding what makes your heart sing! ⚡",
    colors: "from-love-accent to-tech-teal"
  },
  {
    id: 4,
    emoji: "💍",
    title: "Love & Growth",
    description: "Building beautiful relationships and creating lasting memories together",
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
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

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
      // Open a generic music link
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
    setIsPlaying(!isPlaying);
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    triggerConfetti();
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
    <div className="font-modern bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-gray-800 overflow-x-hidden">
      {/* Simple Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Minimal floating elements */}
        <FloatingElement icon={Heart} className="text-love-red text-4xl heart-float" style={{ top: '10%', left: '10%' }} />
        <FloatingElement icon={Heart} className="text-love-pink text-3xl heart-float" style={{ top: '15%', right: '15%' }} />
        <FloatingElement icon={Cake} className="text-love-accent text-4xl" style={{ top: '20%', left: '20%' }} />
        <FloatingElement icon={Gift} className="text-love-red text-3xl" style={{ top: '25%', right: '25%' }} />
        <FloatingElement icon={Star} className="text-yellow-400 text-3xl" style={{ top: '30%', left: '30%' }} />
      </div>
      
      {/* Confetti Explosion */}
      <ConfettiExplosion isActive={confettiActive} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto z-20">
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1 
              className="font-romantic text-5xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Happy Birthday to the{" "}
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Amazing Person
              </motion.span>
              <br />
              in My Life{" "}
              <motion.span 
                className="pulse-heart inline-block"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💻🎂💍
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="love-card rounded-3xl p-8 md:p-12 mb-12 mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                🎉 Welcome to Another year of amazing adventures! 🎉<br/>
                <span className="text-base italic">Celebrating the wonderful person you are and all the joy you bring to the world!</span>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-tech-teal w-5 h-5" />
                    <span className="text-gray-700">Turns ideas into reality like magic ✨➡️💻</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Rocket className="text-love-red w-5 h-5" />
                    <span className="text-gray-700">Builds dreams by day, spreads joy by night 🌙</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="text-love-pink w-5 h-5" />
                    <span className="text-gray-700">Your spirit is brilliant, your heart is pure 💻➡️💕</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="text-love-accent w-5 h-5" />
                    <span className="text-gray-700">High standards, beautiful soul</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Cpu className="text-tech-teal w-5 h-5" />
                    <span className="text-gray-700">You're the exception that makes everything better</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gift className="text-love-red w-5 h-5" />
                    <span className="text-gray-700">A gift to everyone who knows you <span className="font-mono">{"{ love: \"forever\" }"}</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
            >
              <Button 
                onClick={scrollToTimeline}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-0 shadow-lg"
              >
                Your Journey <Gift className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
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
              From Little Dreams to <span className="gradient-text">Big Achievements</span>
            </h2>
            <p className="text-xl text-gray-600">A visual journey through the years</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
            {/* Childhood Photo */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo1') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo1"
            >
              <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 absolute inset-0 bg-gradient-to-br from-love-pink/20 to-tech-teal/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👶✨</div>
                    <p className="text-gray-600 font-medium">Early Years</p>
                    <p className="text-sm text-gray-500 italic">"The beginning of an amazing journey!"</p>
                  </div>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Early Years</h3>
              <p className="text-gray-600 text-sm mt-2">When dreams were just beginning to take shape 🧸</p>
            </div>

            {/* Teenage/School Photo */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo2') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo2"
            >
              <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 absolute inset-0 bg-gradient-to-br from-tech-teal/20 to-love-red/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎓🤓</div>
                    <p className="text-gray-600 font-medium">Learning & Growing</p>
                    <p className="text-sm text-gray-500 italic">"Building the foundation for greatness!"</p>
                  </div>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Learning Years</h3>
              <p className="text-gray-600 text-sm mt-2">Building the foundation for future success 🌍</p>
            </div>

            {/* Thinking About Future Photo */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo3') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo3"
            >
              <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 absolute inset-0 bg-gradient-to-br from-love-red/20 to-love-accent/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤔💭</div>
                    <p className="text-gray-600 font-medium">Dreaming Big</p>
                    <p className="text-sm text-gray-500 italic">"Planning the future with passion!"</p>
                  </div>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Dreamer</h3>
              <p className="text-gray-600 text-sm mt-2">Thinking about how to make the world better 🏠</p>
            </div>

            {/* Born as Engineer Photo */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo4') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo4"
            >
              <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 absolute inset-0 bg-gradient-to-br from-tech-teal/20 to-love-red/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚙️🔧</div>
                    <p className="text-gray-600 font-medium">Finding Purpose</p>
                    <p className="text-sm text-gray-500 italic">"Discovering your true calling!"</p>
                  </div>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Creator</h3>
              <p className="text-gray-600 text-sm mt-2">After deep thought, finding your true calling! 🎯</p>
            </div>

            {/* Recent/Current Photo */}
            <div 
              className={`love-card rounded-2xl p-6 text-center fade-in ${visibleElements.has('photo5') ? 'visible' : ''} hover:transform hover:scale-105 transition-all duration-300`}
              data-element-id="photo5"
            >
              <div className="w-full h-64 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 absolute inset-0 bg-gradient-to-br from-love-red/20 to-love-accent/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💻👨‍💻</div>
                    <p className="text-gray-600 font-medium">Living the Dream</p>
                    <p className="text-sm text-gray-500 italic">"Making dreams come true!"</p>
                  </div>
                </div>
              </div>
              <h3 className="font-romantic text-xl font-semibold text-gray-800">The Achiever</h3>
              <p className="text-gray-600 text-sm mt-2">Living your dreams and inspiring others! 💍✨</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 italic text-lg mb-4">
              "Every photo tells a story, every story builds a legacy, every legacy shapes the future"
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 bg-gradient-to-b from-soft-white to-love-pink/10 relative overflow-hidden">
        {/* Floating sparkles for timeline */}
        <div className="absolute top-10 left-10 text-yellow-400 animate-ping">✨</div>
        <div className="absolute top-20 right-20 text-pink-400 animate-ping delay-75">💖</div>
        <div className="absolute top-40 left-20 text-purple-400 animate-ping delay-150">🌟</div>
        <div className="absolute top-60 right-10 text-red-400 animate-ping delay-300">🎉</div>
        <div className="absolute top-80 left-40 text-blue-400 animate-ping delay-500">💫</div>
        <div className="absolute top-100 right-40 text-green-400 animate-ping delay-700">🎊</div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-16 fade-in ${visibleElements.has('timeline-header') ? 'visible' : ''}`}
            data-element-id="timeline-header"
          >
            <h2 className="font-romantic text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              The <span className="gradient-text">Journey</span> of an Amazing Person
            </h2>
            <p className="text-xl text-gray-600">From dreams to reality, creating a beautiful life story 💕</p>
          </div>
          
          <div className="space-y-12">
            {timelineItems.map((item) => (
              <div 
                key={item.id}
                className={`timeline-item flex items-center space-x-6 md:space-x-12 ${animatedTimeline.has(item.id) ? 'animate' : ''}`}
                data-step={item.id}
              >
                <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${item.colors} rounded-full flex items-center justify-center text-2xl text-white pulse-heart shadow-lg transform hover:scale-110 transition-all duration-300`}>
                  <span className="timeline-emoji">{item.emoji}</span>
                </div>
                <div className="love-card rounded-2xl p-6 flex-1 hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-2 gradient-text">{item.title}</h3>
                  <p className="text-gray-600 text-lg font-medium">{item.description}</p>
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
              🎁 Special Birthday Surprise Inside! 🎁
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
            <DialogTitle className="font-romantic text-3xl font-bold gradient-text mb-4">Happy Birthday! 🎂💕</DialogTitle>
            <DialogDescription className="sr-only">A special birthday message</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-pink-600 leading-relaxed">
            <p className="text-lg font-semibold text-center gradient-text">
              🎂 Happy Birthday to an Amazing Person! 🎂
            </p>
            
            <p>
              Another year of you being absolutely incredible, and another year of the world being blessed by your presence! Every day you make the world a better place just by being you.
            </p>
            
            <p className="bg-gradient-to-r from-love-pink/10 to-tech-teal/10 p-4 rounded-lg border-l-4 border-love-red">
              <strong>Fun Fact:</strong> You might be the only person I know who gets genuinely excited about making a difference. And honestly? It's absolutely beautiful. 😍
            </p>
            
            <p>
              I love your dedication to being a responsible and caring person - you know, when you get all serious about taking care of others and fulfilling your duties as a good human being. Some people call it demanding, but I call it <em>incredibly admirable</em>. There's something so beautiful about a person who knows how to balance personal growth with helping others! 😏
            </p>
            
            <p>
              But what I love most is watching your "tough" facade crumble the moment someone needs help or comfort. You're like a software update that seems intimidating at first, but then you realize it just makes everything better and more secure. 💕
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-center text-lg font-medium text-gray-800 mb-4">
                <Code className="inline w-5 h-5 mr-2" />
                Birthday wish in code style:
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
              Here's to another year of your beautiful contradictions - solving problems by day, spreading joy by night! 
              You're my favorite exception, and I never want to catch you! 💘
            </p>
            
            <div className="text-center pt-6">
              <p className="font-romantic text-xl text-love-red">Forever your biggest fan,</p>
              <p className="font-romantic text-2xl font-semibold gradient-text mt-2">Your Forever Friend 💕</p>
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
            <div className="text-center mb-4">
              <h3 className="font-romantic text-xl font-semibold text-gray-800 mb-2">
                🎵 A Song For You 🎵
              </h3>
              <p className="text-gray-600 text-sm italic">
                A special melody for a special person... 💕
              </p>
            </div>
            <Button 
              onClick={toggleMusic}
              variant="outline"
              className="bg-gradient-to-r from-love-pink/20 to-love-red/20 backdrop-blur-sm border-love-pink/50 text-gray-700 px-8 py-4 rounded-full hover:bg-love-pink/30 hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-love-pink/25"
            >
              {isPlaying ? (
                <Pause className="text-love-red w-5 h-5" />
              ) : (
                <Play className="text-love-red w-5 h-5" />
              )}
              <span className="font-medium">{isPlaying ? 'Pause Song' : 'Play Special Song'}</span>
              <Heart className="text-love-pink w-4 h-4 pulse-heart" />
            </Button>
          </div>
          
          <div className="mb-8">
            <h3 className="font-romantic text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              A Small Birthday Wish <span className="gradient-text">From My Heart</span> Hope You Like It
            </h3>
            
            <p className="text-gray-600 mb-6">
              Built with React, TypeScript, lots of coffee, and infinite love for an amazing person 🎂💕
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
