'use strict'
//puerto predeterminado
const port = process.env.PORT || 3000;



const resMsg = {
  found: 'Encontrado',
  file: 'Archivo',
  please_login: 'Ingrese aquí',
  publications: 'Publicaciones',
  publication: 'Publicacion',
  summary: 'Resumen',
  chat: '',
  chats: 'Mensajes',
  post: 'Publicar',
  dashboard: 'Dashboard',
  followers: 'Seguidores',
  follower: 'Seguidor',
  follow: 'Seguir',
  data_upt: 'Actualizar Datos',
  image_upt: 'Actualizar Imagen',
  profile_work_zone: 'Areas de trabajo',
  profile_set1: 'Gustos y Pasiones',
  following: 'Siguiendo',
  timeline: 'Timeline',
  profile: 'Perfil',
  login: 'Iniciar sesión',
  sign_in: 'Registrarse',
  sign_out: 'Desconectar',
  register: 'Registrar',
  updates: 'Cambios',
  save: 'Guardar',
  send: 'Enviar',
  uploads: 'Subidas',
  upload: 'Subir',
  recent: 'Reciente',
  recents: 'Recientes',
  news_1: 'Nuevas',
  username: 'Nombre de Usuario',
  link: 'Enlace',
  home: 'Inicio',
  email_address: 'Correo electrónico',
  password: 'Contraseña',
  remember: 'Recordar',
  suggestions: 'Sugerencias',
  moreSuggestions: 'Más sugerencias',
  validField_1: 'Se ve bien!',
  invalidField_1: 'Debes proporcionar este dato',
  edit: 'Editar',
  notfound: 'No Encontrado',
  confirm: 'Confirmado',
  loaded: 'Cargado',
  error: 'Ha ocurrído un error',
  deleted: 'Ha sido eliminado correctamente',
  serverOn: 'Server Running',
  serverOff: 'Server Off',
  serverErr: 'Ha ocurrido un error en el servidor',
  conectionErr: 'La conexion se ha establecido correctamente',
  conectionOk: 'La conexion se ha establecido correctamente',
  loginOK: 'Logueado correctamente',
  loginErr: 'Ha ocurrido algo malo en el ingreso',
  user: 'Usuario',
  users: 'Usuarios',
  userNotFound: 'Usuario no encontrado',
  userFound: 'Usuario encontrado',
  userCreateOK: 'Usuario creado correctamente',
  userFollowedOK: 'Usuario seguido correctamente',
  userFollowedExist: 'Usted ya sigue a este usuario',
  userNotFollowed: 'Usted no está siguiendo a este usuario',
  userNotFollowingFound: 'Usted no está siguiendo a nadie',
  userUnfollowedOK: 'Se ha dejado de seguir al correctamente',
  userFollowedErr: 'Ha ocurrido un error al seguir al usuario',
  userUnfollowedErr: 'Ha ocurrido un error al dejar de seguir al usuario',
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
  limit_unexpectedFiles: 'Se ha superado el limite de archivos para subir',
  requiredFile: 'No se ha enviado el archivo requerido',
  userFollowNotSelf: 'No puedes seguirte a ti mismo',
  publicationErr: 'Ha ocurrido un error al guardar la publicacion',
  publicationsBackErr: 'Ha ocurrido un error al devolver publicaciones',
  publicationSavedOk: 'Publicacion guardad con exito',
  MessageSavedOk: 'Mensaje guardad con exito',
  notMessage: 'No hay mensajes disponibles',
  publicationNotFound: 'No existen o no se han encontrado publicaciones',
  public_fileExist: 'La publicación ya contiene un archivo'
};

//contraseñas para los tokens
const admin_secret = 'givemethetoken';
const secret_name_image = 'packet';
const secret_user_token = 'secret_token_summertime_sadness';

const ip_fetch = {
  temp1: 'http://localhost:3001',
  temp: "http://ec2-107-23-22-49.compute-1.amazonaws.com:3001",
  temp2: 'http://files-mean5-project.herokuapp.com'
}

//funcion que responde los parametros
function resJson(msg, status) {
  const answer = { data: msg, status: status}
  return answer;
}
//funcion de prueba
function resTest(res) {
  res.status(200).send(resJson(resMsg.confirm, 200));
}


module.exports = {
  port,
  resMsg,
  resJson,
  resTest,
  secret_name_image,
  secret_user_token,
  admin_secret,
  ip_fetch
}