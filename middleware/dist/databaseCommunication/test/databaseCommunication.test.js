import { describe, expect, test } from '@jest/globals';
import { constructUrl } from '../databaseCommunication';
describe('databaseCommunication test', () => {
    test('construct url test with get request', () => {
        const url = 'http://localhost:1000';
        const endpoint = 'getData';
        const urlParams = [
            {
                parameter: 'id',
                value: '123'
            },
            {
                parameter: 'name',
                value: 'John'
            }
        ];
        const outputUrl = constructUrl(url, endpoint, urlParams);
        const expectedUrl = 'http://localhost:1000/getData?id=123&name=John';
        expect(outputUrl).toEqual(expectedUrl);
    });
    test('construct url test with post request', () => {
        const url = 'http://localhost:1000';
        const endpoint = 'postData';
        const outputUrl = constructUrl(url, endpoint);
        const expectedUrl = 'http://localhost:1000/postData';
        expect(outputUrl).toEqual(expectedUrl);
    });
});
