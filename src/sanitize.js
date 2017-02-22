import sanitizeHtml from 'sanitize-html';
import {DomHandler, Parser} from 'htmlparser2';
import parser2html from 'htmlparser-to-html';

function handleDom(dom) {
    return dom;
}

export default function sanitize(htmlCode) {
    let sanitized = sanitizeHtml(htmlCode, {
        allowedTags: ['p', 'span', 'h2', 'h3', 'h4', 'i', 'div', 'figure', 'img']
    });

    let output = '';

    let handler = new DomHandler((error, dom) => {
        if (error) {
            console.log(error);
        } else {
            let updatedDom = handleDom(dom);
            output = parser2html(updatedDom);
        }
    });

    let parser = new Parser(handler);
    parser.write(sanitized);
    parser.done();

    return output;
}


