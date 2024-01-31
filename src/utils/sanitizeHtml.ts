import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from 'jsdom';

const SanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html);
};

export default SanitizeHtml;