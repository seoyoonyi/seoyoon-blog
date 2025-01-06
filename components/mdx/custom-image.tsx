import Image from 'next/image'

const CustomImage = ({ src, alt, ...props }) => {
  return (
    <div className='relative h-auto w-full'>
      <Image
        src={src}
        alt={alt}
        fill
        className='rounded-md object-contain hover:cursor-zoom-in'
        {...props}
      />
    </div>
  )
}

export default CustomImage
