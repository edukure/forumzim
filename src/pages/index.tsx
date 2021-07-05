import Head from 'next/head';
import { useState } from 'react';

import { Topic } from '../utils/topics';
import { dateDistanceToToday } from '../utils/dates';

import IconSolved from '../components/IconSolved';
import Tag from '../components/Tag';

const Home = () => {
    const [topic, setTopic] = useState<Topic | null>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const randomTopic = await fetchTopic();
        setTopic(randomTopic);
    };

    const fetchTopic = async () => {
        const response = await fetch('/api/randomTopic');
        if (response.ok) {
            const randomTopic = await response.json();
            return randomTopic;
        } 
        else if(response.status === 404){
            return await fetchTopic();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <Head>
                <title>Forumzim</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">Forumzim</h1>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <button
                        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}>
                        Tópico Aleatório
                    </button>
                </div>

                {topic && (
                    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 py-4 px-2 my-6 relative">
                        {/* Left side */}
                        <div className="w-16 flex flex-shrink-0 justify-center items-center">
                            <IconSolved isSolved={topic.isSolved} />
                        </div>

                        {/* Center */}
                        <div className="flex flex-col flex-grow justify-center ml-2 text-left">
                            {/* Date */}
                            <span className="font-light text-gray-600 text-center absolute top-2 left-0 right-0">
                                {dateDistanceToToday(topic.date)}
                            </span>

                            {/* Title */}
                            <div className="mt-4 px-1">
                                <a
                                    href={topic.href}
                                    target="_blank"
                                    className="sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline">
                                    {topic.title}
                                </a>
                            </div>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap">
                                {topic.tags.map((tag) => (
                                    <Tag href={tag.href} key={tag.href} className="mr-2">
                                        {tag.name}
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="w-44 flex flex-shrink-0 justify-start items-center">
                            <a href="#" className="flex items-center">
                                <img
                                    src="https://avatarfiles.alphacoders.com/165/thumb-1920-165285.png"
                                    alt="avatar"
                                    className="mr-2 w-8 h-8 rounded-full"
                                />
                            </a>
                            <div className="text-gray-600 font-bold hover:underline">{topic.scuba}</div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
