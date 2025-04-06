"use client";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TextData {
    text: string;
    styles: {
      bold: boolean;
      italics: boolean;
      underline: boolean;
      color: string;
      font: string;
      fontSize: string;
      alignment: string;
    };
  }
  
  interface ServiceData {
    title: TextData;
    venue: TextData;
    date: TextData;
    description: TextData;
    coverImage: string;
  }

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = React.useState<string | null>(null);
    const router = useRouter()
    const [loading, setLoading] = React.useState<boolean>(true);
    const [link, setLink] = React.useState("")

    const [eventData, setEventData] = React.useState<ServiceData>({
        title: {
          text: '',
          styles: {
            bold: false,
            italics: false,
            underline: false,
            color: '#000000',
            font: 'sans-serif',
            fontSize: 'text-2xl',
            alignment: 'text-left',
          },
        },
        venue: {
          text: '',
          styles: {
            bold: false,
            italics: false,
            underline: false,
            color: '#555555',
            font: 'sans-serif',
            fontSize: 'text-xl',
            alignment: 'text-left',
          },
        },
        date: {
          text: '',
          styles: {
            bold: false,
            italics: false,
            underline: false,
            color: '#888888',
            font: 'sans-serif',
            fontSize: 'text-base',
            alignment: 'text-left',
          },
        },
        description: {
          text: '',
          styles: {
            bold: false,
            italics: false,
            underline: false,
            color: '#000000',
            font: 'sans-serif',
            fontSize: 'text-base',
            alignment: 'text-left',
          },
        },
        coverImage: '',
      });

    React.useEffect(() => {
        params.then(({ id }) => {
            setId(id);
            setLoading(true);
        });
    }, [params]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/getservice?q=${id}`);

                if(!response.ok){
                  setEventData(
                    {
                      title: {
                        text: '',
                        styles: {
                          bold: false,
                          italics: false,
                          underline: false,
                          color: '#000000',
                          font: 'sans-serif',
                          fontSize: 'text-2xl',
                          alignment: 'text-left',
                        },
                      },
                      venue: {
                        text: '',
                        styles: {
                          bold: false,
                          italics: false,
                          underline: false,
                          color: '#555555',
                          font: 'sans-serif',
                          fontSize: 'text-xl',
                          alignment: 'text-left',
                        },
                      },
                      date: {
                        text: '',
                        styles: {
                          bold: false,
                          italics: false,
                          underline: false,
                          color: '#888888',
                          font: 'sans-serif',
                          fontSize: 'text-base',
                          alignment: 'text-left',
                        },
                      },
                      description: {
                        text: '',
                        styles: {
                          bold: false,
                          italics: false,
                          underline: false,
                          color: '#000000',
                          font: 'sans-serif',
                          fontSize: 'text-base',
                          alignment: 'text-left',
                        },
                      },
                      coverImage: '',
                    }
                  )
                  return
                }
                const data = await response.json();
                const datas = JSON.parse(data.message);
                const link = data.link
                setLink(link)
                setEventData(datas)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const getFormattedText = (textData: TextData) => {
        let styleClasses = `${textData.styles.fontSize} ${textData.styles.alignment} break-words`;
        if (textData.styles.bold) styleClasses += ' font-bold';
        if (textData.styles.italics) styleClasses += ' italic';
        if (textData.styles.underline) styleClasses += ' underline';
    
        return (
          <div
            className={`${styleClasses} mb-2`}
            style={{
              color: textData.styles.color,
              fontFamily: textData.styles.font,
            }}
          >
            {textData.text}
          </div>
        );
      };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="relative h-16 w-16">
                            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-green-200"></div>
                            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {eventData.coverImage && (
                            <div className="w-full">
                                <img
                                    src={eventData.coverImage || "/api/placeholder/1200/400"}
                                    alt="Cover"
                                    className="w-full h-auto rounded-t-xl object-contain"
                                />
                            </div>
                        )}

                        <div className="p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {getFormattedText(eventData.title)}
                                {getFormattedText(eventData.venue)}
                                {getFormattedText(eventData.date)}
                                
                                <motion.div
                                    className="prose max-w-none mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {getFormattedText(eventData.description)}
                                </motion.div>
                                
                                {link && (
                                    <motion.div 
                                        className="mt-8"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    >
                                        <Link href={link}>
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                                Register Today
                                            </button>
                                        </Link>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -z-10 opacity-10 overflow-hidden">
                <svg width="400" height="400" viewBox="0 0 200 200">
                    <path fill="#3B82F6" d="M37.5,-52.1C48.4,-44.4,56.8,-32.5,62.8,-18.4C68.7,-4.3,72.2,12,67.1,24.8C62,37.7,48.4,47.2,34.7,52.6C21,58,7.1,59.2,-8.8,60.1C-24.7,60.9,-42.6,61.5,-51.6,52.7C-60.7,43.9,-60.9,25.8,-62.1,8.4C-63.2,-9,-65.3,-25.6,-58.9,-38C-52.4,-50.4,-37.5,-58.6,-23.3,-64.4C-9,-70.3,4.4,-73.9,16.2,-69.5C28,-65.1,38.2,-52.8,42.8,-45.8L45,-36.5L46.5,-23L50.4,-2.4L45.4,8.7Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 -z-10 opacity-10 overflow-hidden">
                <svg width="300" height="300" viewBox="0 0 200 200">
                    <path fill="#3B82F6" d="M40.8,-65.8C54.8,-58.8,69.2,-51.1,75.5,-39C81.8,-26.8,80,-10.2,76.2,4.8C72.3,19.7,66.5,33,57.6,44.3C48.7,55.7,36.8,65.2,23.2,70.9C9.5,76.6,-5.9,78.7,-20.9,75.6C-35.9,72.5,-50.6,64.4,-60.9,52.3C-71.2,40.2,-77.1,24.2,-79.2,7.8C-81.3,-8.7,-79.7,-25.5,-72.1,-38.7C-64.5,-51.9,-51,-61.5,-37.5,-68.6C-24,-75.6,-10.5,-80.2,1.5,-82.6C13.5,-85,27,-81.2,40.8,-72.1L40.7,-65.9L40.8,-65.8Z" transform="translate(100 100)" />
                </svg>
            </div>
            <Footer/>
        </div>
    );
}

export default Page;