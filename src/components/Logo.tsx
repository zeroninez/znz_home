import classNames from 'classnames'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  return (
    <div
      className={classNames(
        ' h-fit w-fit font-bold',
        className ? className : '',
        size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl',
      )}
    >
      ZERONINEZ
    </div>
  )
}
