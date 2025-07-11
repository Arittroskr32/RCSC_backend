const htmlEntities = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®'
};

// Decode named HTML entities
function decodeHTMLEntities(str) {
    return str.replace(/&[a-zA-Z]+;/g, (match) => htmlEntities[match] || match);
}

// Decode numeric HTML entities (hex and decimal)
function decodeNumericEntities(str) {
    return str
        .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
}

// Decode URL, hex, unicode, and octal sequences
function decodeEncodings(str) {
    try {
        str = decodeURIComponent(str);
    } catch (e) { }

    str = decodeHTMLEntities(str);
    str = decodeNumericEntities(str);

    // Replace \xHH, \uHHHH, \OOO
    str = str
        .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));

    return str.normalize('NFC');
}

// Remove tags and event handlers
function stripTagsAndEvents(str) {
    // Remove HTML tags
    str = str.replace(/<\/?[^>]+>/gi, ' ');
    // Remove event handlers like onload="..." or onclick='...'
    str = str.replace(/on\w+\s*=\s*["'][^"']*["']/gi, ' ');
    return str;
}

// Remove dangerous keywords and characters
function removeDangerousContent(str) {
    const dangerousPatterns = [
        'script', 'iframe', 'form', 'img', 'svg', 'object', 'embed',
        'link', 'meta', 'style', 'base', 'body', 'input', 'src',
        'action', 'document', 'window', 'eval', 'alert',
        'settimeout', 'setinterval', 'location', 'cookie',
        'javascript:', 'vbscript:'
    ];

    dangerousPatterns.forEach(pattern => {
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        str = str.replace(regex, ' ');
    });

    // Remove additional suspicious characters
    str = str.replace(/[\x00-\x1F\x7F<>{}[\]()*%$^|#"`]/g, ' ');

    return str.replace(/\s+/g, ' ').trim();
}

// Final function to sanitize user input
export function removeMaliciousContent(input) {
    if (typeof input !== 'string') return '';

    let str = decodeEncodings(input);
    str = stripTagsAndEvents(str);
    str = removeDangerousContent(str);

    return str;
}

