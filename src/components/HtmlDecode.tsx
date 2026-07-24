import React from 'react';
import he from 'he';
import DOMPurify from 'dompurify'

const REACT_PUBLIC_API_HOST = "https://system.tisini.co.ke";

interface HtmlDecoderProps {
  html: string;
  exerpt?:boolean
}

const HtmlDecoder = ({ html,exerpt }:HtmlDecoderProps) => {
  const hostUrl = REACT_PUBLIC_API_HOST;

  const UpdateImageUrls = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const imgs = doc.querySelectorAll('img');
    imgs.forEach(img => {
      const src = img.getAttribute('src');
      if (src && (!src.startsWith('http') && !src.startsWith('https'))) {
        img.setAttribute('src', `${hostUrl}${src}`);
      }
    });
    return doc.body.innerHTML;
  };

  const decodedHtml = he.decode(html);
  const sanitizedHtml =  DOMPurify.sanitize(decodedHtml);
  const updatedHtml = UpdateImageUrls(sanitizedHtml);

  return (
    <span
      className='html-content'
      dangerouslySetInnerHTML={{ __html: exerpt?updatedHtml.slice(0,200): updatedHtml }}
    />
  );
};

export default HtmlDecoder;