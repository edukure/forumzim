import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ptBR } from 'date-fns/locale';

export const dateDistanceToToday = (date: Date) => {
    const distance = formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });

    return distance;
};
