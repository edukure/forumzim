import cheerio from 'cheerio';
import sub from 'date-fns/sub';
import isWithinInterval from 'date-fns/isWithinInterval';

export interface Topic {
    title: string;
    date: Date;
    href: string;
    scuba?: string;
    isSolved: boolean;
    tags: Tag[];
}

interface Tag {
    name: string;
    href: string;
}

let $: cheerio.Root; // cheerio variable needed at getTags

const getTitleDiv = (topic: cheerio.Cheerio) => {
    const titleDiv = topic.find('.forumList-item-subject-info-title-link');
    return titleDiv;
};

const getTitle = (topic: cheerio.Cheerio) => {
    const div = getTitleDiv(topic);
    let title = div.contents().first().text();
    title = title.replace(/^\s+|\s+$/g, ''); // remove \n and white spaces

    return title;
};

const getHref = (topic: cheerio.Cheerio) => {
    const div = getTitleDiv(topic);
    const href = div.attr().href;

    return `https://cursos.alura.com.br${href}`;
};

const getDate = (topic: cheerio.Cheerio) => {
    const date = new Date(topic.find('time').attr().datetime);

    return date;
};

const getIsSolved = (topic: cheerio.Cheerio) => {
    const isSolved = topic.find('.forumList-icon-solved').first().length;

    return isSolved ? true : false;
};

const getTags = (topic: cheerio.Cheerio) => {
    const tags = topic
        .find('.topic-breadCrumb-item-link')
        .map((i, element) => {
            return {
                name: $(element).text(),
                href: $(element).attr().href,
            };
        })
        .get();

    return tags;
};

export const filterTopicsByInterval = (topics: Topic[], interval?: Interval) => {
    topics = topics.filter((topic) => {
        if (isTopicWithinInterval(topic, interval)) {
            return true;
        }
    });

    return topics;
};

/*
 * Adiciona um intervalo padrão de 2 semanas atrás até agora
 * à função isWithinInterval do date-fns
 */
const isTopicWithinInterval = (topic: Topic, interval: Interval = { start: null, end: null }) => {
    interval.end = interval.end ? interval.end : new Date();
    interval.start = interval.start ? interval.start : sub(interval.end, { weeks: 2 });

    /*
     * isWithinInterval recebe 2 parâmetros:
     * - date: que é a data a ser avaliada
     * - interval: um objeto com 2 Dates: {start, end}
     * OBS: é necessário que end seja uma data posterior ao start
     * Caso contrário um erro será disparado
     * Ex: start: 2021-06-20T21:36:20.023Z
     *       end: 2021-07-04T21:36:20.023Z
     * Ou seja, apenas tópicos entre 20/6 e 4/07 serão aceitos
     *
     * O valor padrão para end é a data atual, pois não podemos buscar tópicos
     * com datas futuras (ainda rs) e também porque acredito que na maioria dos casos
     * vamos querer filtrar tópicos de uma data x até o agora.
     *
     * O valor padrão de start é o end subtraído 2 semanas só porque inicialmente
     * o filtro foi criado para tópicos do foruzim.
     */

    return isWithinInterval(topic.date, interval);
};

export const parseTopic = (rawTopic: cheerio.Cheerio): Topic => {
    const title = getTitle(rawTopic);
    const href = getHref(rawTopic);
    const date = getDate(rawTopic);
    const isSolved = getIsSolved(rawTopic);

    const tags = getTags(rawTopic);

    return { title, href, date, isSolved, tags };
};

export const scrapeTopics = (data) => {
    $ = cheerio.load(data);

    let topics: Topic[] = [];

    $('.forumList-item').each((index, element) => {
        const rawTopic = $(element);
        const topic = parseTopic(rawTopic);

        topics.push(topic);
    });

    return topics;
};
