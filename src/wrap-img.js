import sanitizeFigure from "./sanitize-figure";

export default function wrapImage(img, container, index) {
    let figure = {
        name: 'figure',
        type: 'tag',
        next: img.next,
        prev: img.prev,
        parent: img.parent,
        children: [img]
    };

    img.next = img.prev = null;
    img.parent = figure;

    container[index] = figure;

    sanitizeFigure(figure);
}
