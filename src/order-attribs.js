export default function orderAttribs(node) {
    if (node.attribs) {
        node.attribs = Object.keys(node.attribs).sort().reduce((acc, key) => {
            acc[key] = node.attribs[key];
            return acc;
        }, {});
    }

    if (node.children) {
        node.children.forEach(orderAttribs);
    }
}
