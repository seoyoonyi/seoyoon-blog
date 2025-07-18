
import React from 'react';
import Image from 'next/image';

// 텍스트 노드를 렌더링하는 헬퍼 함수
const renderText = (node: any) => {
  let text = <>{node.text}</>;
  if (node.bold) text = <strong>{text}</strong>;
  if (node.italic) text = <em>{text}</em>;
  if (node.underline) text = <u>{text}</u>;
  if (node.strikethrough) text = <s>{text}</s>;
  if (node.code) text = <code>{text}</code>;
  return text;
};

// 모든 노드를 재귀적으로 렌더링하는 주 함수
const serialize = (nodes: any[]) => {
  return nodes.map((node, i) => {
    if (node.type === 'text') {
      // 래핑 없이 텍스트 노드를 직접 반환
      return <React.Fragment key={i}>{renderText(node)}</React.Fragment>;
    }

    if (!node) {
      return null;
    }

    // 자식 노드가 있으면 재귀적으로 렌더링
    const children = node.children ? serialize(node.children) : null;

    switch (node.type) {
      case 'heading':
        const HeadingTag = node.tag;
        return <HeadingTag key={i}>{children}</HeadingTag>;
      
      case 'paragraph':
        return <p key={i}>{children}</p>;

      case 'list':
        const ListTag = node.tag;
        // 체크리스트는 listitem에서 처리되므로 특별한 로직이 필요 없음
        return <ListTag key={i}>{children}</ListTag>;

      case 'listitem':
        // 체크리스트 아이템인지 확인
        if (typeof node.checked === 'boolean') {
            return (
                <li key={i}>
                   <input type="checkbox" checked={node.checked} readOnly disabled className="mr-2" />
                   {children}
                </li>
            )
        }
        return <li key={i}>{children}</li>;

      case 'quote':
        return <blockquote key={i}>{children}</blockquote>;

      case 'upload':
        return (
          <div key={i} style={{ width: '100%', height: 'auto' }}>
            <Image
              src={node.value.url}
              alt={node.value.alt}
              width={node.value.width}
              height={node.value.height}
              style={{ objectFit: 'contain' }}
            />
          </div>
        );
      
      case 'horizontalrule':
          return <hr key={i} />;

      default:
        // 알려지지 않은 노드 유형은 자식만 렌더링
        return children;
    }
  });
};

const RichText = ({ content }: { content: any }) => {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  return <div>{serialize(content.root.children)}</div>;
};

export { RichText };
