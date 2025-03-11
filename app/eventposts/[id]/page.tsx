"use client";
import Navbar from '@/components/navbar';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  
  interface EventData {
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

    

    const [eventData, setEventData] = React.useState<EventData>({
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
            setLoading(true); // Ensure loading state is active until data fetch completes
        });
    }, [params]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/getevent?q=${id}`);

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
        <div className='bg-gradient-to-bl min-h-screen from-[#a8e6cf] to-[#fafafa]'>
            <Navbar />
            <div className='flex justify-center items-center md:p-10 backdrop-blur p-2'>
                {loading ? (
                    <div className='text-center mt-56'>
                        <div className='loader border-t-2 border-b-2 border-gray-500 w-12 h-12 rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <div className="w-full md:w-3/5 mt-20 mx-3 p-4 md:p-10 bg-white rounded-lg shadow-md overflow-auto border h-auto">
                        <div className="p-4">
                            {getFormattedText(eventData.title)}
                            {eventData.coverImage && (
                                <div className="relative mb-4">
                                    <img
                                        src={eventData.coverImage}
                                        alt="Cover"
                                        className="w-full h-auto rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            {getFormattedText(eventData.venue)}
                            {getFormattedText(eventData.date)}
                            {getFormattedText(eventData.description)}
                        </div>
                        <div className="p-4">
                        {link?( <Link href={link}><button className='bg-green-800 text-4xl text-white p-5 rounded-lg hover:bg-green-700 hover:shadow-lg'>Register Today</button></Link>):(<div></div>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;