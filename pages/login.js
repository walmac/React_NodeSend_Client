import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import authContext from '../context/auth/authContext';
import Alerta from '../components/alerta';
import { useRouter } from 'next/router'

const Login = () => {

    // definir el context
    const AuthContext = useContext(authContext);
    const { mensaje, autenticado, iniciarSesion} = AuthContext;
    //next router
    const router = useRouter();
    
    useEffect(() => {
        if(autenticado){
            router.push('/');
        }
    }, [autenticado])
    //formulario y validacion conFormik
    const formik = useFormik({
        initialValues: {
            nombre: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("El email no es valido")
                .required("El email es obligatorio"),
            password: Yup.string()
                .required("No puede ser vacio")
                .min(6, "El password debe tener 6 caracteres como minimo"),
        }),
        onSubmit: (valores) => {
            iniciarSesion(valores);
        },
    });
    return (
        <Layout>
            <div className="md:w-4/5 xl:w3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                    Iniciar Sesión
                </h2>
                {mensaje && <Alerta/>}
                <div className="flex justify-center mt-5">
                    <div className=" w-full max-w-lg">
                        <form
                            className="bg-white rounder shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-black text-sm font-bold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    placeholder="Email de Usuario"
                                    type="email"
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-black text-sm font-bold mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    placeholder="Password de Usuario"
                                    type="password"
                                    value={formik.values.password}
                                />
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null}
                            </div>
                            <input
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                value="Iniciar Sesión"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
