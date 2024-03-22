import * as React from 'react';

import { useControllableState } from '@godiet-hooks/controllable-state';
import { Button } from '@godiet-ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@godiet-ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@godiet-ui/Popover';
import { ScrollArea } from '@godiet-ui/ScrollArea';
import { Spinner } from '@godiet-ui/Spinner';
import { cn } from '@godiet-utils/cn';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';

interface OptionType {
  label: string;
  value: string;
}
interface ComboboxProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}

interface FilterFunction {
  (value: string, search: string): number;
}

export function Combobox(props: ComboboxProps) {
  const { options, value, onChange, isLoading, emptyMessage, placeholder } =
    props;
  const [open, setOpen] = React.useState(false);

  const [internalValue, setInternalValue] = useControllableState({
    defaultValue: '',
    value,
    onChange,
  });

  const handleFilterCommand = React.useCallback<FilterFunction>(
    (value, search) =>
      value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0,
    []
  );

  const handleSelectCommandItem = React.useCallback(
    (currentValue: string, option: OptionType) => {
      setInternalValue(currentValue === option.label ? '' : option.value);

      setOpen(false);
    },
    [setInternalValue]
  );

  const defaultPlaceholder = React.useMemo(
    () => placeholder || 'Selecione uma opção',
    [placeholder]
  );

  const defaultEmptyMessage = React.useMemo(
    () => emptyMessage || 'Nenhuma opção encontrada.',
    [emptyMessage]
  );

  const defaultLabel = React.useMemo(
    () => options.find((option) => option.value === internalValue)?.label,
    [internalValue, options]
  );

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        if (isLoading) return;

        setOpen((prev) => !prev);
      }}
      modal={true}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {internalValue ? defaultLabel : defaultPlaceholder}

          {isLoading ? (
            <Spinner className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : open ? (
            <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0 sm:w-full">
        <Command className="w-full sm:w-[550px]" filter={handleFilterCommand}>
          <CommandInput placeholder={defaultPlaceholder} />

          <ScrollArea className="h-48 sm:w-full">
            <CommandEmpty>{defaultEmptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.label}
                  onSelect={(currentValue) =>
                    handleSelectCommandItem(currentValue, option)
                  }
                  value={option.label}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
