import {postMessageHandlerFactory} from './discord/post-message';
import got from 'got';

const url = process.env.WEB_HOOK_URL ?? '';
export const handler = postMessageHandlerFactory({
    got,
    url
});
