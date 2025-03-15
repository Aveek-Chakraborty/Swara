import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';

// Instructor type definition
interface Instructor {
  id: number;
  LIlink: string;
  Ilink: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const InstructorsSection = () => {
  const instructors: Instructor[] = [
    {
      id: 1,
      LIlink: "https://www.linkedin.com/in/s-varun-swaroop-07349b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      Ilink: "https://www.instagram.com/svarunswaroop/profilecard/?igsh=Zjc4YnRxdmc5eHlw",
      name: "S Varun Swaroop",
      role: "Building an Inclusive Learning Space - SWARA | Alternative Educator | NIOS | ADHD",
      image: "/Varun.jpg",
      bio: "Varun is an experienced educator with over five years of expertise in supporting children with diverse learning needs, including ADHD, Autism, and Down Syndrome. Passionate about inclusive education, he specializes in tailored tutoring, engaging curriculum design with an NIOS focus, and confidence-building strategies. Beyond teaching, Varun is a skilled graphic designer and content creator, bringing creativity to every learning experience. Dedicated to making education accessible and empowering for all students, he thrives on fostering meaningful connections and innovative learning solutions."
    },
    {
      id: 2,
      LIlink: "https://www.linkedin.com/in/jhunudebnath24?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      Ilink: "https://www.instagram.com/_eternal._.flame_/",
      name: "Jhunu Debnath",
      role: "Artist | Art Therapy Practitioner",
      image: "/Junu.jpeg",
      bio: "Jhunu is an art therapy practitioner with a Bachelor's degree in Psychology, Journalism, and English Literature, and a Diploma in Art Therapy. She has worked with NGOs dedicated to children's education, gender equality, and inclusivity. Jhunu's approach integrates art as a tool for emotional exploration and self-awareness, helping individuals gain clarity and navigate their emotions. She is also advancing her expertise in Expressive and Creative Arts Therapies, with the goal of empowering individuals to face challenges with confidence and creativity."
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm mb-4">
            Team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our <span className="text-green-600">Instructors</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of educators specializes in supporting students with diverse learning needs through personalized approaches and innovative teaching methods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <div className="flex space-x-2">
                    <Link href={instructor.LIlink} target="_blank" rel="noopener noreferrer" className="bg-white/90 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </Link>
                    <Link href={instructor.Ilink} target="_blank" rel="noopener noreferrer" className="bg-white/90 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-colors">
                      <Instagram size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  
                  <div className="mb-4 inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {instructor.role}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default InstructorsSection;