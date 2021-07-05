import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { connectToDatabase } from '../../config/mongodb';
import { filterTopicsByInterval, scrapeTopics } from '../../utils/topics';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();

    const response = await db.collection('scubas').aggregate([
        {
            // selecionar um scuba aletório
            $sample: {
                size: 1,
            },
        },
        {
            // retornar apenas name e user
            $project: {
                _id: 0,
                name: 1,
                user: 1,
            },
        },
    ]);

    // .aggregate() retorna um AggregationCursor
    // para pegar os dados do scuba é necessário usar .next()
    const scuba = await response.next();

    const { user, name } = scuba;

    // buscar os tópicos
    const url = `https://cursos.alura.com.br/forum/usuario/${user}/acompanhando/todos/1`;
    const { data } = await axios.get(url);

    // parsear
    let topics = scrapeTopics(data);

    // filtrar tópicos por data
    topics = filterTopicsByInterval(topics);

    if(topics.length < 1)  {
        return res.status(404).json(null);
    }

    // selecionar um tópico aleatório
    let selectedTopic = topics[Math.floor(Math.random() * topics.length)];
    selectedTopic = { scuba: name, ...selectedTopic };

    try {
        await res.status(200).json(selectedTopic);
    } catch (err) {
        await res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default handler;