
import React from 'react';
import Image from 'next/image';

const RichText = ({ content }: { content: any }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      {content.root.children.map((child: any, i: number) => {
        if (child.type === 'paragraph') {
          return (
            <p key={i}>
              {child.children.map((textChild: any, j: number) => {
                if (textChild.type === 'text') {
                  let text = <span key={j}>{textChild.text}</span>;
                  if (textChild.bold) {
                    text = <strong key={j}>{text}</strong>;
                  }
                  if (textChild.italic) {
                    text = <em key={j}>{text}</em>;
                  }
                  if (textChild.underline) {
                    text = <u key={j}>{text}</u>;
                  }
                  if (textChild.strikethrough) {
                    text = <s key={j}>{text}</s>;
                  }
                  return text;
                }
                return null;
              })}
            </p>
          );
        }

        if (child.type === 'upload') {
          return (
            <div key={i} style={{ width: '100%', height: 'auto' }}>
              <Image
                src={child.value.url}
                alt={child.value.alt}
                width={child.value.width}
                height={child.value.height}
                style={{ objectFit: 'contain' }}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export { RichText };
