import { SwapiAgent } from '../../infrastructure/agents/swapi.agent';

export const getIdFromSwapiUrl = (url: string) => {
    return url.split('/').at(-2);
}

export const isValidHomeworld = (homeworld: string) => {
    const formattedUrlForRegex = SwapiAgent.swapiBaseUrl.replace('/','\/');
    const regex = new RegExp(`^${formattedUrlForRegex}\/api\/planets\/[1-9]\\d*\/$`);
    return regex.test(homeworld);
}