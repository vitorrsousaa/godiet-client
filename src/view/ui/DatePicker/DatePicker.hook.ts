import * as React from 'react';

import { format, isAfter, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SelectSingleEventHandler } from 'react-day-picker';

import { DatePickerProps } from './DatePicker';

export function useDatePickerHook(props: DatePickerProps) {
  const { value, onChange } = props;

  const [popoverIsVisible, setPopoverIsVisible] = React.useState(false);

  const [inputValue, setInputValue] = React.useState<string>(() => {
    if (!value) return '';

    return format(value, 'dd/LL/yyyy', { locale: ptBR });
  });

  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (!value) return;

    return value;
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const togglePopoverIsVisible = React.useCallback(() => {
    setPopoverIsVisible((prevState) => !prevState);
  }, []);

  const handleInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      setInputValue(event.target.value);
      const date = parse(event.target.value, 'dd/LL/yyyy', new Date(), {
        locale: ptBR,
      });

      if (isValid(date)) {
        if (isAfter(date, new Date(1900, 1, 1))) {
          setDate(date);
          onChange?.(date);
          setErrorMessage('');
        } else {
          setErrorMessage('Data inválida');
          setDate(undefined);
        }
      } else {
        setErrorMessage('Data inválida');
        setDate(undefined);
      }
    },
    [onChange]
  );

  const handleSelectDate: SelectSingleEventHandler = React.useCallback(
    (selected) => {
      setDate(selected);
      if (selected) {
        onChange?.(selected);
        togglePopoverIsVisible();
        setInputValue(format(selected, 'dd/LL/yyyy', { locale: ptBR }));
      } else {
        setInputValue('');
      }
    },
    [onChange, togglePopoverIsVisible]
  );

  React.useEffect(() => {
    if (value) {
      setDate(value);
      setInputValue(format(value, 'dd/LL/yyyy', { locale: ptBR }));
    }
  }, [value]);

  return {
    popoverIsVisible,
    inputValue,
    date,
    errorMessage,
    handleInputChange,
    handleSelectDate,
    togglePopoverIsVisible,
  };
}
