import { Button } from '@godiet-components/Button';
import { Calendar } from '@godiet-components/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@godiet-components/Popover';
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
}

export function DatePicker(props: DatePickerProps) {
  const { error, placeholder } = props;

  const {
    selectedDate,
    popoverIsVisible,
    togglePopoverIsVisible,
    handleChangeDate,
  } = useDatePickerHook(props);

  return (
    <div className="w-full">
      <Popover open={popoverIsVisible} onOpenChange={togglePopoverIsVisible}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'h-8 w-full justify-between text-left text-sm font-normal  sm:h-[3.25rem] sm:text-base',
              !selectedDate && 'text-muted-foreground'
            )}
          >
            {selectedDate ? (
              format(selectedDate, 'PPP', { locale: ptBR })
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
            value={selectedDate}
            initialFocus
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
