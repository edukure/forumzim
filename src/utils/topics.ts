import cheerio from 'cheerio';

export interface Topic {
    title: string;
    date: Date;
    link: string;
    scuba?: string;
    isSolved: boolean;
    tags: Tag[];
}

interface Tag {
    name: string;
    href: string;
}

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

const getLink = (topic: cheerio.Cheerio) => {
    const div = getTitleDiv(topic);
    const link = div.attr().href;

    return link;
};

const getDate = (topic: cheerio.Cheerio) => {
    const date = new Date(topic.find('time').attr().datetime);

    return date;
};

const getIsSolved = (topic: cheerio.Cheerio) => {
    const isSolved = topic.find('.forumList-icon-solved').first().length;

    return isSolved ? true : false;
};

let $; // cheerio variable needed at getTags

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

export const scrapeTopic = (topic) => {
    const title = getTitle(topic);
    const link = getLink(topic);
    const date = getDate(topic);
    const isSolved = getIsSolved(topic);

    const tags = getTags(topic);

    return { title, link, date, isSolved, tags };
};

export const scrapeTopics = (data) => {
    $ = cheerio.load(data);

    let topics: Topic[] = [];

    $('.forumList-item').each((index, element) => {
        const rawTopic = $(element);
        const topic = scrapeTopic(rawTopic);

        topics.push(topic);
    });

    return topics;
};
