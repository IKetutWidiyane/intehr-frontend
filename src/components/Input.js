const Input = ({
  label,
  name,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder = '',
  rows = 1,
  children,
  ...props
}) => {
  const inputClass = `block w-full px-3 py-2 border ${
    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  } rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`;

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          className={inputClass}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          {...props}
        />
      ) : as === 'select' ? (
        <select
          id={name}
          name={name}
          className={inputClass}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={inputClass}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

  
  export default Input;