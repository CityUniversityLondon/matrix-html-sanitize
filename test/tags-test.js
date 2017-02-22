import {expect} from 'chai';
import sanitize from "../src/sanitize";

describe('all tags management', () => {
    it('should not do much', () => {
        expect(sanitize('<p>hi</p>')).to.equal('<p>hi</p>');
    });
});
