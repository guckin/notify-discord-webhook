import got from 'got';

export interface PostMessageHandlerDependencies {
    got: Pick<typeof got, 'post'>,
    url: string;
}

export type PostMessageHandler = (message: Message) => Promise<PostHandlerResult>

export interface Message {
    text: string;
}

export const PostHandlerResult = {
    Success: 'Success',
    UnknownFailure: 'UnknownFailure'
} as const;

export type PostHandlerResult = typeof PostHandlerResult[keyof typeof PostHandlerResult];

export function postMessageHandlerFactory({got, url}: PostMessageHandlerDependencies): PostMessageHandler {
    return async ({text}) => {
        const {statusCode} = await got.post({
            url,
            json: {
                content: text
            },
            throwHttpErrors: false
        });
        return statusCode === 204 ? PostHandlerResult.Success : PostHandlerResult.UnknownFailure;
    };
}
