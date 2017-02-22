import {expect} from 'chai';
import sanitize from "../src/sanitize";

describe('img management', () => {

    it('should wrap img in figure', () => {
        expect(sanitize('<p><img></p>')).to.equal('<p><figure><img></figure></p>');
    });

    describe('non-lazy-load', () => {
        it('should add default alt description', () => {
            expect(sanitize('<img src="./?a=1000">')).to.equal('<figure><img alt="%globals_asset_attribute_alt:1000%" src="./?a=1000"></figure>');
            expect(sanitize('<p><img src="./?a=1000"></p>')).to.equal('<p><figure><img alt="%globals_asset_attribute_alt:1000%" src="./?a=1000"></figure></p>');
        });
    });

    describe('lazy-load', () => {
        it('should create structure from scratch', () => {
            expect(sanitize('<p><img src="./?a=1000" class="lazy-load"></p>')).to.equal('' +
                '<p>' +
                '<figure>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1000%" ' +
                'class="lazy-load" ' +
                'data-src="./?a=1000" ' +
                'src="/__data/assets/git_bridge/0015/344112/main/img/blank.png" ' +
                'style="padding-bottom:%globals_asset_attribute_height:1000^replace_keywords:divide:{globals_asset_attribute_width:1000}^multiply:100%%">' +
                '<noscript>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1000%" ' +
                'src="./?a=1000">' +
                '</noscript>' +
                '</figure>' +
                '</p>');
        });

        it('should update a lazy-load image where img id has changed', () => {
            let input = '' +
                '<p>' +
                '<figure>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1000%" ' +
                'class="lazy-load" ' +
                'data-src="./?a=1000" ' +
                'src="./?a=1001" ' +
                'style="padding-bottom:%globals_asset_attribute_height:1000^replace_keywords:divide:{globals_asset_attribute_width:1000}^multiply:100%%">' +
                '<noscript>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1000%" ' +
                'src="./?a=1000">' +
                '</noscript>' +
                '</figure>' +
                '</p>';

            expect(sanitize(input)).to.equal('' +
                '<p>' +
                '<figure>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1001%" ' +
                'class="lazy-load" ' +
                'data-src="./?a=1001" ' +
                'src="/__data/assets/git_bridge/0015/344112/main/img/blank.png" ' +
                'style="padding-bottom:%globals_asset_attribute_height:1001^replace_keywords:divide:{globals_asset_attribute_width:1001}^multiply:100%%">' +
                '<noscript>' +
                '<img ' +
                'alt="%globals_asset_attribute_alt:1001%" ' +
                'src="./?a=1001">' +
                '</noscript>' +
                '</figure>' +
                '</p>');
        });
    });

});
