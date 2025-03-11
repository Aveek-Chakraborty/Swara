"use client"
import Navbar from '@/components/navbar';
import * as React from 'react';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    interface ParagraphData {
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

    interface ImageData {
        src: string;
    }

    interface HeadingData {
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

    interface BlogData {
        title: HeadingData;
        subheading: HeadingData;
        author: string;
        date: string;
        coverImage: string;
        content: (ParagraphData | ImageData)[];
    }

    const [blogData, setBlogData] = React.useState<BlogData>({
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
        subheading: {
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
        author: '',
        date: '',
        coverImage: '',
        content: [
            {
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
        ],
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
                const response = await fetch(`/api/getblog?q=${id}`);
                
                if (!response.ok) {
                    setBlogData(
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
                            subheading: {
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
                            author: '',
                            date: '',
                            coverImage: '',
                            content: [
                                {
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
                            ],
                        }
                    )
                    return
                }

                
                const data = await response.json();
                const datas = JSON.parse(data.message);

                setBlogData(datas)

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

    const getFormattedHeading = (headingData: HeadingData) => {
        let styleClasses = `${headingData.styles.fontSize} ${headingData.styles.alignment} break-words`;
        if (headingData.styles.bold) styleClasses += ' font-bold';
        if (headingData.styles.italics) styleClasses += ' italic';
        if (headingData.styles.underline) styleClasses += ' underline';

        return (
            <div
                className={`${styleClasses} mb-2`}
                style={{
                    color: headingData.styles.color,
                    fontFamily: headingData.styles.font,
                }}
            >
                {headingData.text}
            </div>
        );
    };

    const getFormattedContent = () => {
        return blogData.content.map((item, index) => {
            if ('text' in item) {
                let styleClasses = `${item.styles.fontSize} ${item.styles.alignment} break-words`;
                if (item.styles.bold) styleClasses += ' font-bold';
                if (item.styles.italics) styleClasses += ' italic';
                if (item.styles.underline) styleClasses += ' underline';

                return (
                    <div
                        key={index}
                        className={`${styleClasses} mb-4`}
                        style={{
                            color: item.styles.color,
                            fontFamily: item.styles.font,
                        }}
                    >
                        {item.text}
                    </div>
                );
            } else {
                return (
                    <div key={index} className="mb-4">
                        <img
                            src={item.src || undefined}
                            alt="Blog Content Image"
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                );
            }
        });
    };

    return (
        <div className='bg-gradient-to-bl min-h-screen from-[#a8e6cf]  to-[#fafafa]'>
            <Navbar />
            <div className='flex justify-center items-center md:p-10 backdrop-blur p-2'>
                {loading ? (
                    <div className='text-center mt-56'>
                        <div className='loader border-t-2 border-b-2 border-gray-500 w-12 h-12 rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <div className="w-full md:w-3/5 mt-20 mx-3 p-4 md:p-10 bg-white rounded-lg shadow-md overflow-auto border h-auto">


                        <div className="p-4">
                            {getFormattedHeading(blogData.title)}
                            {getFormattedHeading(blogData.subheading)}
                            <div className="flex gap-4">
                                <p className="text-sm mb-2 text-gray-400">{`${blogData.author}`}</p>
                                <p className="text-sm mb-4 text-gray-400">{`${blogData.date}`}</p>
                            </div>
                            {blogData.coverImage && (
                                <div className="relative mb-4">
                                    <img
                                        src={blogData.coverImage}
                                        alt="Cover"
                                        className="w-full h-auto rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            {getFormattedContent()}
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;