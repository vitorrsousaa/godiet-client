import * as React from 'react';

import { DatePickerProps } from './DatePicker';

export function useDatePickerHook(props: DatePickerProps) {
  const { value, onChange } = props;

  const [selectedDate, setSelectedDate] = React.useState(value);
  const [popoverIsVisible, setPopoverIsVisible] = React.useState(false);

  const togglePopoverIsVisible = React.useCallback(() => {
    setPopoverIsVisible((prevState) => !prevState);
  }, []);

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
      togglePopoverIsVisible();
    },
    [onChange, togglePopoverIsVisible]
  );

  return {
    selectedDate,
    popoverIsVisible,
    togglePopoverIsVisible,
    handleChangeDate,
  };
}
