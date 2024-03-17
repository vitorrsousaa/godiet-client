import { useCallback, useMemo } from 'react';

import { useControllableState } from '@godiet-hooks/controllable-state';
import { cn } from '@godiet-utils/cn';

import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Select, { components, SingleValue } from 'react-select';

export type SelectOptionsType = { label: string; value: string };

interface SelectAutoCompleteProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  noOptionsMessage?: string;
  options: SelectOptionsType[];
  placeholder?: string;
  value?: SelectOptionsType['value'];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectAutoComplete(props: SelectAutoCompleteProps) {
  const {
    isLoading,
    isDisabled,
    noOptionsMessage,
    options,
    placeholder,
    value,
    onChange,
  } = props;

  const [optionValue, setOptionValue] = useControllableState({
    defaultValue: null,
    value: options.find((option) => option.value === value) || value,
  });

  const filteredOptions = useMemo(
    () => options.filter((option) => option.value !== ''),
    [options]
  );

  const handleInputChange = useCallback(
    (newValue: SingleValue<SelectOptionsType>) => {
      const newEvent = {
        target: {
          value: newValue ? newValue.value : null,
        },
      };

      setOptionValue(newValue || null);

      onChange && onChange(newEvent as React.ChangeEvent<HTMLSelectElement>);
    },
    [onChange, setOptionValue]
  );

  const controlStyles = {
    base: 'border bg-transparent border-input rounded-md pl-3 h-8',
    focus: 'ring-ring ring-1 outline-none',
    nonFocus: 'border-gray-300 hover:border-gray-400',
  };
  const placeholderStyles = 'text-muted-foreground';
  const selectInputStyles = ' shadow-sm transition-colors';
  const valueContainerStyles = 'p-1 gap-1';
  const singleValueStyles = 'leading-7 text-icon';
  const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg';
  const optionStyles = {
    base: 'hover:cursor-pointer px-3 py-2 rounded',
    focus: 'bg-gray-100 active:bg-gray-200',
    selected:
      'after:content-[✔] after:ml-2 after:text-green-500 text-gray-500',
  };
  const noOptionsMessageStyles =
    'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

  return (
    <Select
      value={optionValue}
      className="h-8 hover:cursor-pointer "
      onChange={(event) =>
        handleInputChange(event as SingleValue<SelectOptionsType>)
      }
      options={filteredOptions}
      maxMenuHeight={400}
      noOptionsMessage={() => noOptionsMessage || 'Nenhuma opção encontrada'}
      placeholder={placeholder}
      isLoading={isLoading}
      isDisabled={isDisabled || isLoading}
      isClearable
      isSearchable
      unstyled
      classNames={{
        placeholder: () => placeholderStyles,
        control: ({ isFocused }) =>
          cn(controlStyles.base, isFocused && controlStyles.focus),
        input: () => selectInputStyles,
        menu: () => menuStyles,
        noOptionsMessage: () => noOptionsMessageStyles,
        singleValue: () => singleValueStyles,
        valueContainer: () => valueContainerStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
      }}
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible',
        }),
        control: (base) => ({
          ...base,
          transition: 'colors',
        }),
      }}
      components={{
        LoadingIndicator: () => (
          <div className="mr-1 h-5 w-5 animate-spin rounded-full border-2 border-r-green-900" />
        ),
        DropdownIndicator: () =>
          !isLoading && <ChevronDownIcon className="mr-1" />,
        IndicatorSeparator: () => (
          <div className="mx-2 h-[22px] w-[1px] bg-gray-300" />
        ),
        ClearIndicator: (props) => (
          <components.ClearIndicator {...props}>
            <Cross2Icon className="rounded-md p-[0.7px] text-gray-500 hover:cursor-pointer hover:bg-red-100 hover:text-red-800" />
          </components.ClearIndicator>
        ),
      }}
    />
  );
}
