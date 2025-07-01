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
        size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-8xl',
      )}
    >
      zeroninez
    </div>
  )
}
