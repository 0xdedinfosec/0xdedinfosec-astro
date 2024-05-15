import Callout from '../../components/mdxComponents/Callout.astro';
import ConsCard from '../../components/mdxComponents/ConsCard.astro';
import ProsCard from '../../components/mdxComponents/ProsCard.astro';
import Step from '../../components/mdxComponents/Step.astro';
import StaticTweet from './StaticTweet.astro';

export const components = {
    Callout,
    ConsCard,
    ProsCard,
    Step,
    Tweet: StaticTweet,
};
