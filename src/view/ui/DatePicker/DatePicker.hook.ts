import * as React from 'react';

import { DatePickerProps } from './DatePicker';

export function useDatePickerHook(props: DatePickerProps) {
  const { onChange } = props;

  const [popoverIsVisible, setPopoverIsVisible] = React.useState(false);

  const togglePopoverIsVisible = React.useCallback(() => {
    setPopoverIsVisible((prevState) => !prevState);
  }, []);

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      onChange?.(date);
      togglePopoverIsVisible();
    },
    [onChange, togglePopoverIsVisible]
  );

  return {
    popoverIsVisible,
    togglePopoverIsVisible,
    handleChangeDate,
  };
}
