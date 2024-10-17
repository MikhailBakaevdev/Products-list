import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "../types";
import { useCallback } from "react";

export const FormInputText = ({ name, disabled, label }: FormInputProps) => {

  const {
    field: {
      onChange, onBlur, value, ref
    },
    fieldState: {
      error
    }
  } = useController({
    name,
    defaultValue: null
  });

  const onChangeMemo = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value || null; // null при очистке поля
    onChange(newValue, event);

  }, [onChange]);


  return (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          ref={ref}
          error={!!error}
          disabled={disabled}
          onChange={onChangeMemo}
          value={value ?? ''}
          onBlur={onBlur}
          fullWidth
          label={label}
          variant="outlined"
        />
  );
};