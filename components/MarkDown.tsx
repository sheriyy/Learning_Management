import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";
type Props = {
  text: string;
};

const md = markdownit({});

const MarkDown = ({ text }: Props) => {
  const htmlContent = md.render(text);
  const sanitized = DOMPurify.sanitize(htmlContent);
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitized }} className=""></div>
  );
};

export default MarkDown;
