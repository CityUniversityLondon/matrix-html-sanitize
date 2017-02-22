import sanitizeHtml from 'sanitize-html';
import {DomHandler, Parser} from 'htmlparser2';
import parser2html from 'htmlparser-to-html';

import wrapImage from './wrap-img';
import sanitizeFigure from "./sanitize-figure";

parser2html.configure({disableAttribEscape: true});

function handleNode(node, container, index) {
    if (node.name === 'img') {
        wrapImage(node, container, index);
        return;
    } else if (node.name === 'figure') {
        sanitizeFigure(node);
        return;
    }

    if (node.children) {
        node.children.forEach((child, i) => handleNode(child, node.children, i));
    }
}

function handleDom(dom) {
    dom.forEach((node, i) => handleNode(node, dom, i, null));
    return dom;
}

export default function sanitize(htmlCode) {
    let sanitized = sanitizeHtml(htmlCode, {
        allowedTags: ['p', 'span', 'h2', 'h3', 'h4', 'i', 'div', 'figure', 'img'],
        allowedAttributes: {
            '*': ['class'],
            a: ['href', 'title'],
            img: ['src', 'alt', 'style']
        },
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


