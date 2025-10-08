import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, ...props }) => {
  const base: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 6,
    border: '1px solid transparent',
    cursor: 'pointer',
    fontWeight: 600
  };
  const theme: React.CSSProperties =
    variant === 'primary'
      ? { background: '#0ea5e9', color: 'white' }
      : { background: 'white', color: '#0ea5e9', borderColor: '#0ea5e9' };
  return <button {...props} style={{ ...base, ...theme, ...(style || {}) }} />;
};

export const Card: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
      {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
      <div>{children}</div>
    </div>
  );
};

