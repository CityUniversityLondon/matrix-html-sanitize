import orderAttribs from "./order-attribs";

const BLANK_IMG = "/__data/assets/git_bridge/0015/344112/main/img/blank.png";

export default function sanitizeFigure(figure) {
    let img = null;
    let caption = null;
    let noscript = null;

    figure.children.forEach((child, i) => {
        if (child.name === 'img' && img === null) {
            img = child;
        } else if (child.name === 'figcaption' && caption === null) {
            caption = child;
        } else if (child.name === 'noscript' && noscript === null) {
            noscript = child;
        }
    });

    if (img != null) {
        let isLazyLoad = !!(img.attribs['class'] && img.attribs['class'].match(/(^|\s)lazy-load(\s|$)/));
        let src = isLazyLoad ?
            (img.attribs['src'] && img.attribs['src'].trim() !== BLANK_IMG ? img.attribs['src'] : img.attribs['data-src']) :
            img.attribs['src'];

        let idMatch = src && src.match(/^\.\/\?a=([0-9]+)$/);
        let id = idMatch && idMatch[1];

        if (id) {
            img.attribs['alt'] = `%globals_asset_attribute_alt:${id}%`;
        }

        if (isLazyLoad) {
            img.attribs['src'] = BLANK_IMG;
            img.attribs['data-src'] = src;
            if (id) {
                img.attribs['style'] = `padding-bottom:%globals_asset_attribute_height:${id}^replace_keywords:divide:{globals_asset_attribute_width:${id}}^multiply:100%%`
            }

            if (!noscript) {
                noscript = {
                    type: 'tag',
                    name: 'noscript'
                };
            }

            noscript.attribs = {};
            noscript.children = [{
                type: 'tag',
                name: 'img',
                attribs: {src, alt: img.attribs['alt']}
            }];
        } else {
            noscript = null;
        }

        figure.children = [img, noscript, caption].filter(v => !!v);
    }

    /** ordering attributes to make testing easier */
    orderAttribs(figure)
}
