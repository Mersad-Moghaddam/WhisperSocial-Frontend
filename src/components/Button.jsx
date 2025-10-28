import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  leftIcon = null,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/30 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white shadow-wisper-sm hover:shadow-wisper-md hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-white text-[#0f172a] border-2 border-[#cffafe] shadow-wisper-sm hover:bg-[#e0f2fe] hover:border-[#06b6d4] hover:shadow-wisper-md active:bg-[#bae6fd]',
    ghost:
      'bg-transparent text-[#06b6d4] hover:bg-[#06b6d4]/10 active:bg-[#06b6d4]/20',
    danger:
      'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'bg-transparent text-[#06b6d4] border-2 border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white active:bg-[#0891b2]',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {leftIcon && <span className="-ml-1">{leftIcon}</span>}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'ghost',
    'danger',
    'outline',
  ]),
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
};

Button.defaultProps = {
  className: '',
  variant: 'primary',
  fullWidth: false,
  leftIcon: null,
};
