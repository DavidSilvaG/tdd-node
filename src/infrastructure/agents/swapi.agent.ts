import axios from 'axios'

export const SwapiAgent = {

    swapiBaseUrl: 'https://swapi.dev',
    
    getAllPlanetsByPage: async(page:number) =>{
        const planets = []
        try {
            for (let index = 1; index <= page; index++) {
                const { data }  = await axios.get(`${SwapiAgent.swapiBaseUrl}/api/planets?page=${index}`);
                planets.push(...data.results);
                if(!data.next) break;
            }
            return planets;
        } catch (error) {
            throw { message: `Error getting planets by page ${page} from swapi` }
        }
    },

    getAllPeopleByPage: async(page:number) =>{
        const people = []
        try {
            for (let index = 1; index <= page; index++) {
                const { data }  = await axios.get(`${SwapiAgent.swapiBaseUrl}/api/people?page=${index}`);
                people.push(...data.results);
                if(!data.next) break;
            }
            return people;
        } catch (error) {
            throw { message: `Error getting people by page ${page} from swapi` }
        }
    },

    getPlanetById: async(id:number) =>{
        try {
            return (await axios.get(`${SwapiAgent.swapiBaseUrl}/api/planets/${id}`)).data
        } catch (error) {
            throw { message: 'Error getting planet by id from swapi' }
        }
    },

    getPeopleById: async(id:number) =>{
        try {
            return (await axios.get(`${SwapiAgent.swapiBaseUrl}/api/people/${id}`)).data
        } catch (error) {
            throw { message: 'Error getting people by id from swapi' }
        }
    },

};
