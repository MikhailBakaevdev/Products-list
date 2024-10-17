import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, ProductsSelect } from '../components';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, Link } from '@mui/material';
import { PRODUCT_HEADER } from './constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputText } from '../components/textInput/textInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { carDealershipSchema } from './schema';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CarDealership, edit, write } from '../store/mainDataSlice';
import { useEffect } from 'react';
import { FormInput } from './types';
// TODO: Fix styles and Box 
export const CreateEditForm = () =>  {
    const  { id } = useParams();
    const dispath = useAppDispatch();
    const data = useAppSelector((state) => state.data);

    const item = data.find(item => item.id === id);

    const values = id  ? carDealershipSchema.cast({
        ...item
    }) : carDealershipSchema.getDefault();

    const form = useForm<FormInput>({
        defaultValues: values,
        mode: 'all',
        reValidateMode: "onSubmit",
        resolver: yupResolver(carDealershipSchema),
      });

    const productTypes = form.watch("productTypes")

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`);
    }

    const onSubmit = () => {
        if (!id) {
            dispath(write(form.getValues() as CarDealership));
        } else {
            dispath(edit(form.getValues() as CarDealership))
        }
        navigate("/");
    }

    const { TITLE, EDIT, CREATE } = PRODUCT_HEADER;
    const isEditMode = Boolean(id);


    useEffect(() => {
        if(!isEditMode) {
            form.setValue("productsCounter", "")
        }
      }, [form, isEditMode, productTypes]);

  return (
    <FormProvider {...form}>
        <Grid2 container spacing={2}>
        <Grid2 display="flex" width="350px" flexDirection="column" justifyContent="center" size="grow">
        <Box sx={{ display: 'flex', alignItems: "center", width: 350, maxWidth: '100%', margin: "20px" }} onClick={handleClick}>
            <ArrowBackIcon color="primary"/>
            <Link href="#" underline="hover" onClick={handleClick}>
                Список продуктов
            </Link>
        </Box>

        <Header title= {`${!isEditMode ? CREATE : EDIT} ${TITLE}`}/>

        <Box sx={{ width: 350, maxWidth: '100%', margin: "20px" }}>
            <FormInputText disabled={isEditMode}  name="name" label="Имя продукта" />
        </Box>
        <Box sx={{ width: 350, maxWidth: '100%', margin: "20px" }}>
            <FormInputText name="productsCounter" label="Количество продуктов" />
        </Box>
        <Box sx={{ width: 350, maxWidth: '100%', margin: "20px" }}>
            <ProductsSelect disabled={isEditMode} label="Тип продукта" name="productTypes"/>
        </Box>
        <Box sx={{ width: 350, maxWidth: '100%', margin: "20px" }}>
            <Button onClick={onSubmit} disabled={form.formState.isDirty && !form.formState.isValid} variant="contained">Сохранить</Button>
        </Box>
        </Grid2>
        </Grid2>
    </FormProvider>
  );
}