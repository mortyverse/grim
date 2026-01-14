import * as React from 'react'

export interface FormFieldProps {
  label: string
  error?: string
  htmlFor: string
  children: React.ReactNode
}

export function FormField({ label, error, htmlFor, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}
    </div>
  )
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className = '', ...props }: FormProps) {
  return <form className={`space-y-6 ${className}`} {...props} />
}
