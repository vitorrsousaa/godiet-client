import { Button } from '@godiet-ui/Button';
import { Calendar } from '@godiet-ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@godiet-ui/Popover';
import { cn } from '@godiet-utils/cn';

import { CalendarIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useDatePickerHook } from './DatePicker.hook';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  error?: string;
  placeholder?: string;
  disabledAfterDays?: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const { error, placeholder, value, disabledAfterDays } = props;

  const { popoverIsVisible, togglePopoverIsVisible, handleChangeDate } =
    useDatePickerHook(props);

  return (
    <div className="w-full">
      <Popover open={popoverIsVisible} onOpenChange={togglePopoverIsVisible}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'h-8 w-full justify-between text-left text-sm font-normal  sm:h-[3.25rem] sm:text-base',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? (
              format(value, 'PPP', { locale: ptBR })
            ) : (
              <span className="text-muted-foreground">
                {placeholder ? placeholder : 'Selecione a data'}
              </span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            onChange={handleChangeDate}
            value={value}
            initialFocus
            disabled={(date) => (disabledAfterDays ? date > new Date() : false)}
          />
        </PopoverContent>
      </Popover>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-700">
          <CrossCircledIcon />
          <span className="text-input-helper">{error}</span>
        </div>
      )}
    </div>
  );
}
