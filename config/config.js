'use strict'

const port = process.env.PORT || 3000;

const resMsg = {
  found: 'Encontrado',
  file: 'Archivo',
  notfound : 'No Encontrado',
  confirm: 'Confirmado',
  error: 'Ha ocurrído un error',
  deleted: 'Ha sido eliminado correctamente',
  serverOn: 'Server Running',
  serverOff: 'Server Off',
  serverErr: 'Ha ocurrido un error en el servidor',
  conectionErr: 'La conexion se ha establecido correctamente',
  conectionOk: 'La conexion se ha establecido correctamente',
  loginOK: 'Logueado correctamente',
  loginErr: 'Ha ocurrido algo malo en el ingreso',
  userNotFound: 'Usuario no encontrado',
  userFound: 'Usuario encontrado',
  userCreateOK: 'Usuario creado correctamente',
  userCreateErr: 'Usuario no Creado',
  RegisterOK: 'Se ha registrado correctamente',
  RegisterErr: 'Ha ocurrido un error en el registro',
  CreateOK: 'Creado correctamente',
  CreateErr: 'No pudo ser creado',
  userExist: 'Usuario ya existe en la base de datos',
  notUsers: 'No hay usuarios disponibles',
  fieldRequired: 'Este campo es requerido',
  PasswordErr: 'Contraseña incorrecta',
  SearchErr: 'Ha ocurrido un error en la busqueda',
  requestErr: 'Ha ocurrido un error en la peticion',
  nonAuthHeader: 'La petición no tiene la cabecera de autenticación',
  nonAuth: 'No cumple con los permisos para hacer esta función',
  tokenExp: 'El token ha expirado',
  tokenInvalid: 'El token no es válido',
  extensionInvalid: 'La extencion es inválida',
  limit_fileSize: 'El archivo supero el tamaño aceptado',
  limit_unexpectedFiles: 'Se ha superado el limite de archivos para subir'
};


function resJson(msg, status) {
  const answer = { data: msg, status: status}
  return answer;
}

function resTest(res) {
  res.status(200).send(resJson(resMsg.confirm, 200));
}

module.exports = {
  port,
  resMsg,
  resJson,
  resTest
}