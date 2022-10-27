import axios from "axios";

export const createFetch = async (inputValue, pageNr, perPage) => {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=30847702-8293b4fe83f47e9e8f27fc251&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=${perPage}&page=${pageNr}`
        )
        return response.data
    } catch (eror) {
        console.log(eror);
    }
}