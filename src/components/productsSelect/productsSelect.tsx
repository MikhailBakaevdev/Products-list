import { useController } from "react-hook-form"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { PRODUCT_TYPES } from "./constants"
import { FormSelectProps } from "./types"

export const ProductsSelect = ({ name, label, disabled}: FormSelectProps) => {

    const {
            field: {
              onChange, onBlur, value, ref
            },
            fieldState: {
              invalid, error
            }
          } = useController({
            name,
            defaultValue: null
          });

    return (
        <FormControl fullWidth error={!!error && invalid}>
            <InputLabel id="product">{label}</InputLabel>
            <Select
            error={!!error && invalid}
            ref={ref}
            type=""
            value={value ?? ''}
            onBlur={onBlur}
            disabled={disabled}
            onChange={onChange}
            labelId="product"
            label={label}
            multiple
            >
            {PRODUCT_TYPES.map((item) => (
                <MenuItem value={item.key} key={item.key}>
                {item.value}
                </MenuItem>
            ))}
            </Select>
            {/* Отображение ошибки для селекта */}
            {(!!error || invalid) && <FormHelperText>Должно быть заполнено</FormHelperText>} 
        </FormControl>
        )}