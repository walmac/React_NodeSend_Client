import React, { useEffect, useContext } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from 'next/router'

const Header = () => {

    //routing
    const router = useRouter();
    //extrar el usuario autenticado del Storage
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

    //context de la apliacion
    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const redireccionar = () =>{
        router.push('/');
        limpiarState();
    }
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            
                <img 
                    className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
                    onClick={() => redireccionar()}
                />
           
            <div>
                {usuario ? (
                    <div className="flex item-center">
                        <p className="mr-2 mt-2">Hola {usuario.nombre}</p>
                        <button
                            type="button"
                            className="px-5 py-3 rounded-lg text-white font-bold uppercase bg-black"
                            onClick={ () => cerrarSesion()}
                        >
                            Cerrar Sesion
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                                Iniciar Sesion
                            </a>
                        </Link>
                        <Link href="/crearcuenta">
                            <a className="px-5 py-3 rounded-lg text-white font-bold uppercase bg-black">
                                Crear cuenta
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
