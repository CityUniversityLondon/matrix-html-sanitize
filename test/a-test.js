import {expect} from 'chai';
import sanitize from "../src/sanitize";

describe('a', () => {
    it('should not do much', () => {
        expect(sanitize('<p>hi</p>')).to.equal('<p>hi</p>');
    })
});
