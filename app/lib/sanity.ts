import ImageUrlBuilder  from '@sanity/image-url';
import {createClient} from 'next-sanity';

export const client = createClient({
    apiVersion:'v2022-03-07',
    dataset: 'production',
    projectId:'4hfzjbz1',
    useCdn: false
})  

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => {
    if(!source) return null
    return builder.image(source);
}