import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import { OAuth2Client } from 'google-auth-library';
import { UsuarioInterface, UsuarioTokenInterface } from '../interfaces/interfaces';
import { createToken, verifyGoogle } from '../services/jwt.services';
import { encriptarPassword, verificarPassword } from '../services/crypto.services';
import { Op } from 'sequelize';

const client = new OAuth2Client('1096762710491-c7d53lpa1n5uju66qi8md97gln49rv1d.apps.googleusercontent.com');


export default class UsuarioController {
    constructor() { }
    //Create an Usuario
    new = async (req: Request, res: Response) => {
        const { nombreUsuario, legajo, password, email } = req.body;
        try {
            const usuario = await Usuario.findOne({
                where: {
                    email,
                    legajo
                }
            });
            if (!usuario) {
                encriptarPassword(password).then(async cifrado => {
                    const salt = cifrado.salt
                    const hash = cifrado.hash
                    await Usuario.create({
                        nombreUsuario,
                        legajo,
                        email,
                        salt,
                        hash
                    }).then(usuario => {
                        const token = createToken(usuario);
                        if (token) {
                            res.set('token', [token]);
                            res.json({
                                usuario,
                                err: false
                            });
                        };
                    });
                }).catch(err => {
                    console.error(err)
                    res.json({
                        error: err,
                        err: true
                    });
                });
            } else {
                res.json({
                    message: "El usuario ya existe",
                    err: true
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Query an Usuario
    getAll = async (req: Request, res: Response) => {
        try {
            const Usuarios = await Usuario.findAll({ attributes: ['idUsuario', 'nombreUsuario', 'legajo', 'email'] });
            return res.json({
                data: Usuarios
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Edit an Usuario
    change = async (req: Request, res: Response) => {
        const { idUsuario } = req.params;
        const { nombreUsuario, legajo, email } = req.body;
        try {
            await Usuario.update({
                nombreUsuario,
                legajo,
                email
            },
                {
                    where: {
                        idUsuario
                    },
                });
            const usuario = await Usuario.findOne({
                where: {
                    idUsuario
                }
            });
            return res.json({
                message: 'The Usuario has been changed',
                data: usuario
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an Usuario
    delete = async (req: Request, res: Response) => {
        try {
            const { idUsuario } = req.params;
            const deleteRowCount = await Usuario.destroy({
                where: {
                    idUsuario
                }
            });
            return res.json({
                message: 'The Usuario has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Usuario
    getById = async (req: Request, res: Response) => {
        const { idUsuario } = req.params;
        try {
            const usuario = await Usuario.findOne({
                where: {
                    idUsuario
                }, attributes: ['idUsuario', 'nombreUsuario', 'legajo', 'email']
            });
            return res.json({
                data: usuario
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    login = async (req: Request, res: Response) => {
        const cuenta = req.body.cuenta;
        const password = req.body.password;
        let respuestaLogin = {
            id: 0,
            ok: false,
            token: "",
            usuario: {}
        }
        try {
            //if (cuenta.includes('@')) {
            console.log(cuenta);
            //const legajo=-1;
            const newUsuario = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email: cuenta },
                        { legajo: cuenta }
                    ]
                }
            });
            if (!newUsuario) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: '(Usuario) o contraseña incorrectos'
                    }
                });
            }
            else {
                verificarPassword(password, newUsuario.salt).then(hashCreado => {
                    if (hashCreado == newUsuario.hash) {
                        const token = createToken(newUsuario);
                        if (token) {
                            res.set("token", [token]);
                            let usuarioSimple = {
                                idUsuario: 0,
                                nombreUsuario: "",
                                legajo: 0,
                                email: ""

                            }
                            usuarioSimple.idUsuario = newUsuario.idUsuario
                            usuarioSimple.nombreUsuario = newUsuario.nombreUsuario
                            usuarioSimple.legajo = newUsuario.legajo
                            usuarioSimple.email = newUsuario.email
                            respuestaLogin.id = newUsuario.idUsuario;
                            respuestaLogin.ok = true;
                            respuestaLogin.token = token;
                            respuestaLogin.usuario = usuarioSimple;
                            return res.json({
                                respuestaLogin
                            });
                        }
                    } else {
                        return res.send({
                            message: 'Usuario o (contraseña) incorrectos',
                            err: true
                        });
                    }
                }).catch(err => {
                    console.error(err);
                    res.json({
                        error: err,
                        err: true
                    });
                })
            }

            /*}  else {
                const legajo = cuenta;
                console.log(legajo);
                const newUsuario = await Usuario.findOne({
                    where: {
                        legajo
                    }
                });
                if (!newUsuario) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: '(Usuario) o contraseña incorrectos'
                        }
                    });
                }
                else {
                    verificarPassword(password, newUsuario.salt).then(hashCreado => {
                        if (hashCreado == newUsuario.hash) {
                            const token = createToken(newUsuario);
                            if (token) {
                                let usuarioSimple = {
                                    idUsuario: 0,
                                    nombreUsuario: "",
                                    legajo: 0,
                                    email: ""

                                }
                                usuarioSimple.idUsuario= newUsuario.idUsuario
                                usuarioSimple.nombreUsuario= newUsuario.nombreUsuario
                                usuarioSimple.legajo= newUsuario.legajo
                                usuarioSimple.email= newUsuario.email
                                respuestaLogin.id = newUsuario.idUsuario;
                                respuestaLogin.token = token;
                                respuestaLogin.usuario = usuarioSimple;
                                res.set("token", [token]);
                                return res.json({
                                    respuestaLogin
                                });
                            }
                        } else {
                            return res.send({
                                message: 'Usuario o (contraseña) incorrectos',
                                err: true
                            });
                        }
                    }).catch(err => {
                        console.error(err);
                        res.json({
                            error: err,
                            err: true
                        });
                    })
                }

            } */


        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }


    google = async (req: Request, res: Response) => {
        console.log('INICIANDO CONSULTA');
        const token = req.get('googleToken');
        console.log(token);
        if (token) {
            console.log('INICIANDO VALIDACION')
            const googleUser: UsuarioTokenInterface | void = await verifyGoogle(token).catch(err => {
                //en caso de que el token no sea valido
                res.status(403).json({
                    message: err,
                    err: true
                })
            });
            //verificamos que el googleUser sea un json con algun contenido
            if (googleUser) {
                const usuario = await Usuario.findOne({
                    where: {
                        email: googleUser.email
                    }
                });
                //verificamos que no sea null
                if (usuario) {
                    //verificamos la existencia del mail
                    if (usuario.email) {
                        //le damos un toquen a un usuario existente que entro por google
                        const nuevoToken: string | undefined = createToken(usuario);
                        if (nuevoToken) {
                            res.set('token', [nuevoToken]);
                            return res.json({
                                message: "usuario logeado",
                                ok: true
                            });
                        }
                    }
                } else {
                    //si el usuario no existe en la BD
                    if (googleUser) {
                        if (googleUser.email && googleUser.nombreUsuario) {
                            const nuevoUsuario = await Usuario.create({
                                nombreUsuario: googleUser.nombreUsuario,
                                email: googleUser.email,
                                legajo: -1,
                                salt: "-1",
                                hash: "-1",
                            });
                            const nuevoToken: string | undefined = createToken(nuevoUsuario);
                            if (nuevoToken) {
                                res.set('token', [nuevoToken]);
                                return res.json({
                                    message: "usuario registrado",
                                    ok: true
                                });
                            }

                        }
                    }

                }

            }
        }


    }
}


