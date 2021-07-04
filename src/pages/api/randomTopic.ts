import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import scubas from '../../data/scubas.json';
import { scrapeTopics } from '../../utils/topics';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    // select one scuba randomly
    const scuba = scubas[Math.floor(Math.random() * scubas.length)];

    const { user, name } = scuba;

    // fetch their profile
    const url = `https://cursos.alura.com.br/forum/usuario/${user}/acompanhando/todos/1`;
    const { data } = await axios.get(url);
    
    // parse topics
    const topics = scrapeTopics(data);

    // look for topics newer than 2 weeks

    // select one topic randomly
    let selectedTopic = topics[Math.floor(Math.random() * topics.length)];
    selectedTopic = { scuba: name, ...selectedTopic };

    try {
        await res.status(200).json(selectedTopic);
    } catch (err) {
        await res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default handler;
