import CodeBlock from '@/components/mdx/code-block'
import CustomImage from '@/components/mdx/custom-image'
import CustomLink from '@/components/mdx/custom-link'

export const MdxComponents = {
  pre: (props) => <CodeBlock {...props} />,
  img: CustomImage,
  a: CustomLink,
}
