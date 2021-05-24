import {PostHandlerResult, postMessageHandlerFactory} from '../../src/discord/post-message';
import got from 'got';

describe('Post Message', () => {

    [
        {
            description: 'Posts a message to the web hook',
            text: 'some message',
            responseStatusCode: 204,
            expectedRequestJson: {
                content: 'some message'
            },
            expectedResult: PostHandlerResult.Success
        },
        {
            description: 'returns a failure if the status code is not 204 [500]',
            text: 'some message',
            responseStatusCode: 500,
            expectedRequestJson: {
                content: 'some message'
            },
            expectedResult: PostHandlerResult.UnknownFailure
        },
        {
            description: 'returns a failure if the status code is not 204 [400]',
            text: 'some message',
            responseStatusCode: 400,
            expectedRequestJson: {
                content: 'some message'
            },
            expectedResult: PostHandlerResult.UnknownFailure
        }
    ].forEach(({description, text, responseStatusCode, expectedRequestJson, expectedResult}) => {
        it(description, async () => {
            const url = 'some URL';
            const got = createGotMock(responseStatusCode)
            const result = await postMessageHandlerFactory({
                url,
                got
            })({text});

            expect(got.post).toBeCalledWith({
                url,
                json: expectedRequestJson,
                throwHttpErrors: false
            });
            expect(result).toEqual(expectedResult);
        });
    });


    function createGotMock(statusCode: number): Pick<typeof got, 'post'> {
        return {
            post: jest.fn(() => Promise.resolve({statusCode})) as jest.Mock
        };
    }
});
