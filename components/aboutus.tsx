'use client'
import { useState, useEffect } from 'react';
import { Heart, Sparkles, BookOpen, Palette, Star, Users, Brain, Lightbulb } from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';

export default function AboutSWARAEnhanced() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed top-30 left-10 opacity-10 animate-pulse">
        <Sparkles className="text-orange-400" size={32} />
      </div>
      <div className="fixed top-40 right-10 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
        <BookOpen className="text-green-400" size={32} />
      </div>
      <div className="fixed bottom-20 left-10 opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Heart className="text-orange-400" size={32} />
      </div>
      <div className="fixed bottom-40 right-10 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Palette className="text-green-400" size={32} />
      </div>

      {/* Hero Section with Enhanced Decorative Elements */}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-100 opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-green-100 opacity-30 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-orange-200 opacity-20 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-40 left-40 w-32 h-32 rounded-full bg-green-200 opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Decorative icons */}
        <div className="absolute top-32 left-1/4 transform -translate-x-1/2 opacity-10">
          <Brain className="text-orange-500" size={48} />
        </div>
        <div className="absolute bottom-32 right-1/4 transform translate-x-1/2 opacity-10">
          <Lightbulb className="text-green-500" size={48} />
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 opacity-10">
          <Star className="text-orange-400" size={36} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 opacity-10">
          <Users className="text-green-400" size={36} />
        </div>
        
        {/* Line decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-200 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-green-200 opacity-30"></div>
        
        <div className={`text-center max-w-4xl px-6 pt-28 md:pt-0 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="text-5xl font-light text-orange-600 sm:pt-20 mb-6">About <span className="font-bold">SWARA</span></h1>
          <div className="h-px w-40 bg-gradient-to-r from-orange-300 to-green-300 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            At SWARA, we create a supportive space where students, individuals, and groups can learn, grow, and express themselves through alternative teaching methods and art therapy, building skills that extend beyond the classroom into life.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Founded on the belief that everyone deserves a learning environment that embraces their uniqueness, SWARA combines innovative educational approaches with creative expression to nurture both academic excellence and emotional well-being.
          </p>
          <div className="mt-24 animate-bounce">
            <svg className="w-8 h-8 mx-auto text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${scrollPosition > 100 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-4xl font-light text-green-600 mb-6 text-center">Our <span className="font-bold">Mission</span></h2>
          <div className="h-px w-24 bg-gradient-to-r from-orange-300 to-green-300 mx-auto mb-12"></div>
          
          <div className="bg-gradient-to-r from-orange-50 to-green-50 p-8 rounded-3xl shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              For students, SWARA offers more than just academics. Our alternative teaching methods, grounded in psychological and scientific research, focus on building critical thinking, confidence, and a genuine love for learning—skills that go beyond the classroom and into life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We understand that traditional educational environments don't serve all learning styles equally. That's why we've created a space where divergent thinking is celebrated, curiosity is encouraged, and personal growth is prioritized alongside academic achievement.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              For individuals and groups, we offer art therapy sessions and mental health workshops that encourage creativity, self-exploration, and meaningful expression. At its core, SWARA is about helping people develop the personal and social skills they need to thrive—whether in school, work, or everyday life.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${scrollPosition > 300 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-4xl font-light text-orange-600 mb-6 text-center">Our <span className="font-bold">Vision</span></h2>
          <div className="h-px w-24 bg-gradient-to-r from-orange-300 to-green-300 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Brain className="text-orange-400" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Neurodiversity Affirming</h3>
              <p className="text-gray-600 text-center">
                We celebrate different ways of thinking, learning, and processing information, creating spaces where neurodivergent individuals can thrive on their own terms.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Palette className="text-green-400" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Creative Expression</h3>
              <p className="text-gray-600 text-center">
                We believe in the transformative power of art as a medium for self-discovery, healing, and communication beyond words.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Users className="text-orange-400" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Community Building</h3>
              <p className="text-gray-600 text-center">
                We foster connections that create a sense of belonging and mutual support, where everyone's journey is valued and respected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Section Title */}
      <div className={`text-center py-12 transition-all duration-1000 transform ${scrollPosition > 500 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <h2 className="text-4xl font-light text-green-600 mb-6 p-3">Why are we  <span className="font-bold">the best </span>at what we do</h2>
        <div className="h-px w-24 bg-gradient-to-r from-orange-300 to-green-300 mx-auto"></div>
      </div>

      {/* Founders Cards - Modern Version */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Varun's card */}
          <div className={`transition-all duration-1000 transform ${scrollPosition > 600 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="group h-full rounded-3xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96 overflow-hidden">
                <img src="/Varun.jpg" alt="Varun Placeholder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-1">Sheshadri Varun Swaroop</h3>
                  <p className="text-orange-200 font-medium">Founder</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Varun grew up feeling out of place in traditional education. For years, he struggled silently, not knowing that ADHD played a part in his experiences. His diagnosis brought clarity, but it also fueled a new purpose: to create a learning environment where students aren't made to feel "less than" for learning differently.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At SWARA, Varun brings this understanding into every aspect of the academic programs, offering personalized support that focuses on each student's unique strengths, helping them build confidence and develop a genuine love for learning.
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="h-1 w-16 bg-orange-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Jhunu's card */}
          <div className={`transition-all duration-1000 transform ${scrollPosition > 600 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="group h-full rounded-3xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96 overflow-hidden">
                <img src="/Junu.jpeg" alt="Jhunu Placeholder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-1">Jhunu Debnath</h3>
                  <p className="text-green-200 font-medium">Co-Creator</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For Jhunu, art has always been a way to ground herself, find clarity, and navigate emotions. Having experienced the profound healing power of creative expression firsthand, she now works as an art therapy facilitator and is training to be an expressive arts therapist.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At SWARA, she channels this passion into creative workshops, providing a space where individuals of all ages can use art for self-discovery, mindfulness, and emotional well-being. Her approach goes beyond creativity—it's about fostering a safe, meaningful, and deeply personal connection with oneself through artistic expression.
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="h-1 w-16 bg-green-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="bg-gradient-to-br from-orange-50 to-green-50 py-24">
        <div className={`max-w-3xl mx-auto px-6 transition-all duration-1000 transform ${scrollPosition > 900 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-orange-300 mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl text-gray-700 leading-relaxed italic mb-8">
              Both Varun and Jhunu have faced their own challenges, and together, they've woven those experiences into SWARA's foundation. This isn't just a learning center, it's a community that encourages curiosity, nurtures creativity, and values the individuality of every person who walks through the door.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed italic mb-12">
              We believe that when people are truly seen, heard, and valued for who they are, remarkable growth and transformation become possible. That's the heart of SWARA's philosophy—creating spaces where authentic self-expression and meaningful connection can flourish.
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-orange-300 to-green-300 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}