import axios from 'axios';

export const getQuotes = async () =>{
    const url = 'https://api.quotable.io/quotes?tags=businesses|education|famous-quotes|inspirational|life|proverb|wisdom&maxLength=280&limit=150&values=content';

    const response = await axios({
        method: 'get',
        url: url,
    });

    return response.data.results;
}