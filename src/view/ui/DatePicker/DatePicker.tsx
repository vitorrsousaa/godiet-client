import { Calendar } from '@godiet-ui/Calendar';
import { Input } from '@godiet-ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@godiet-ui/Popover';

import { CrossCircledIcon } from '@radix-ui/react-icons';

import { useDatePickerHook } from './DatePicker.hook';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  placeholder?: string;
  disabledAfterDays?: boolean;
  minVersion?: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const { error, placeholder, disabledAfterDays, minVersion } = props;

  const {
    popoverIsVisible,
    inputValue,
    date,
    errorMessage,
    handleInputChange,
    handleSelectDate,
    togglePopoverIsVisible,
  } = useDatePickerHook(props);

  return (
    <div className="w-full">
      <Popover open={popoverIsVisible} onOpenChange={togglePopoverIsVisible}>
        <PopoverTrigger asChild>
          <Input
            name="date"
            placeholder={placeholder ? placeholder : 'Selecione a data'}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            minVersion={minVersion}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            onSelect={handleSelectDate}
            value={date}
            initialFocus
            disabled={(date) => (disabledAfterDays ? date > new Date() : false)}
          />
        </PopoverContent>
      </Popover>

      {(error || errorMessage) && (
        <div className="mt-2 flex items-center gap-2 text-red-700">
          <CrossCircledIcon />
          {error && <span className="text-input-helper">{error}</span>}
          {errorMessage && (
            <span className="text-input-helper">{errorMessage}</span>
          )}
        </div>
      )}
    </div>
  );
}
