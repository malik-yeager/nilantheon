import { useState } from 'react';
import { ChevronDown, Users, Target, Award, Globe, Heart, Lightbulb, Shield, Zap, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '150+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      position: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in tech innovation',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      position: 'CTO',
      bio: 'Full-stack architect passionate about scalable solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Emily Johnson',
      position: 'Lead Designer',
      bio: 'Creative mastermind crafting beautiful user experiences',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'David Park',
      position: 'Head of Operations',
      bio: 'Operations expert ensuring seamless project delivery',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver groundbreaking solutions.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Transparency and honesty guide every decision we make and every relationship we build.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion',
      description: 'We pour our hearts into every project, driven by genuine enthusiasm for digital excellence.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Great things happen when brilliant minds work together toward a common vision.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We never settle for good enough. Every detail matters in our pursuit of perfection.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Impact',
      description: 'We create solutions that make a meaningful difference in businesses and communities.'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Nilantheon was founded with a vision to bridge the gap between innovative technology and elegant design.'
    },
    {
      year: '2020',
      title: 'First Milestone',
      description: 'Delivered our first major enterprise solution, establishing our reputation for excellence.'
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Grew our team to 15+ specialists across development, design, and strategy.'
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Expanded operations internationally, serving clients across 3 continents.'
    },
    {
      year: '2023',
      title: 'Innovation Labs',
      description: 'Launched our R&D division focusing on AI and emerging technologies.'
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Awarded "Best Digital Agency" and featured in major tech publications.'
    },
    {
      year: '2025',
      title: 'Future Forward',
      description: 'Continuing to pioneer new frontiers in digital transformation and user experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white px-6 lg:px-16 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            About Nilantheon
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Transforming Ideas Into Seamless Digital Experiences Through Innovation, Design, and Technology Excellence
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="py-20 px-6 lg:px-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {['mission', 'vision', 'story'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            {activeTab === 'mission' && (
              <div className="text-center">
                <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  To empower businesses and individuals by transforming their boldest ideas into seamless, 
                  impactful digital experiences that drive growth, inspire innovation, and create lasting value 
                  in an ever-evolving digital landscape.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  To be the world's most trusted partner in digital transformation, setting new standards 
                  for innovation, design excellence, and technological advancement while fostering a future 
                  where technology seamlessly enhances human potential and business success.
                </p>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="text-center">
                <Award className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  Born from a passion for bridging the gap between cutting-edge technology and human-centered 
                  design, Nilantheon started as a small team of dreamers who believed that every digital 
                  experience should be as beautiful as it is functional. Today, we continue that mission 
                  with an expanded team of experts, serving clients worldwide while never losing sight 
                  of our founding principles.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These fundamental beliefs guide every decision we make and shape the culture that drives our success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/60 rounded-xl p-8 backdrop-blur-sm hover:bg-slate-700/60 transition-all duration-300 group hover:scale-105 border border-slate-700/50"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 lg:px-16 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to industry leadership - the milestones that define our growth.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-600"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-slate-800/80 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-900"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The brilliant minds behind Nilantheon's success, each bringing unique expertise and passion to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's transform your ideas into extraordinary digital experiences. Get in touch with our team today.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-blue-400 mb-3" />
              <span className="text-white font-semibold">Email Us</span>
              <span className="text-gray-300">hello@nilantheon.com</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-blue-400 mb-3" />
              <span className="text-white font-semibold">Call Us</span>
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-blue-400 mb-3" />
              <span className="text-white font-semibold">Visit Us</span>
              <span className="text-gray-300">San Francisco, CA</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-blue-600/30">
              Start Your Project
            </button>
            <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-16 bg-slate-900/80 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center space-x-8 mb-6 text-sm">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Our Products</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Us</a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nilantheon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}