import connectionFrotas from "../dataBase/data";
import User from "../entity/User";
import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/jwt";
import IAuthParametros from "../interfaces/IAuthParametros";
import ISenha from "../interfaces/IAtuaSenha";

const user = connectionFrotas.getRepository(User);

const getUsuarios = async (): Promise<IUser[]> => {
  const data = await user.find();
  return data;
};

const getUsuarioById = async (id_usuario: number): Promise<any> => {
  const usuario = await user.findOneBy({ id_usuario });
  if (!usuario) {
    return { status: 404, message: "id não existe" };
  }
  return usuario;
};

const postUsuario = async (novoUser: IUser): Promise<any> => {
  const exist = await user.findOne({
    where: { numero_user_ERP: novoUser.numero_user_ERP },
  });
  if (exist !== null) {
    return {
      status: 409,
      message: `${novoUser.nome} já existe no banco de dados`,
    };
  }

  const newUser = await user.create({
    nome: novoUser.nome,
    numero_user_ERP: novoUser.numero_user_ERP,
    admin: novoUser.admin,
    celular: novoUser.celular,
    status: novoUser.status,
    senha: novoUser.senha,
  });
  await user.save(newUser);
  return newUser;
};

const updateUser = async (id_usuario: number, userAtualizar: IUser) => {
  try {
    const usuario = await user.findOneBy({ id_usuario });
    if (!usuario) {
      return { status: 404, message: "id não existe" };
    }
    const alteraUsuario = await user.update(id_usuario, {
      nome: userAtualizar.nome,
      numero_user_ERP: userAtualizar.numero_user_ERP,
      admin: userAtualizar.admin,
      celular: userAtualizar.celular,
      status: userAtualizar.status,
    });
    return { status: 202, message: "Usuario atualizado com sucesso" };
  } catch (error) {
    throw error;
  }
};

const authentication = async ({ numero_user_ERP, senha }: IAuthParametros) => {
  try {
    if (!numero_user_ERP || !senha) {
      throw { status: 401, message: "Campos faltantes." };
    }

    const usuario = await user.findOne({
      where: { numero_user_ERP: numero_user_ERP },
    });
    if (usuario && usuario.status === true) {
      const comparePassword = bcrypt.compareSync(senha, usuario.senha);
      if (!comparePassword) {
        throw { status: 401, message: "Usuário ou senha inválidos" };
      }

      const { admin } = usuario;
      const id = usuario.id_usuario;

      const token = await generateJWTToken({
        id,
        admin,
      });
      return { token };
    } else {
      throw { status: 401, message: "Usuario não cadastrado" };
    }
  } catch (error: any) {
    if (error.status && error.message) {
      throw error;
    } else {
      throw { status: 500, message: "Ocorreu um erro interno no servidor" };
    }
  }
};

const atualizarSenha = async (id: number, senha: ISenha) => {
  try {
    const usuario = await user.findOne({
      where: {
        id_usuario: id,
      },
    });
    if (usuario) {
      const comparePassword = bcrypt.compareSync(senha.senha, usuario.senha);

      if (!comparePassword) {
        throw { status: 401, message: "Senha principal inválida" };
      } else {
        const atualiza = await user.update(id, {
          senha: senha.senhacrypto,
        });
        return `Senha do usuario ${usuario.nome} atualizada com sucesso`;
      }
    } else {
      throw { status: 401, message: "Usuario não existe no banco de dados" };
    }
  } catch (error: any) {
    if (error.status && error.message) {
      throw error;
    } else {
      throw { status: 500, message: "Ocorreu um erro interno no servidor" };
    }
  }
};

const desativaUsuario = async (id: number, status: boolean) => {
  try {
    const usuario = await user.findOne({
      where: {
        id_usuario: id,
      },
    });
    if (usuario) {
      const desativarUsuario = await user.update(id, { status: status });
      return "Usuario atualizado com sucesso";
    } else {
      throw { status: 401, message: "Usuario não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

const adminStatus = async (id: number, admin: boolean) => {
  try {
    const usuario = await user.findOne({
      where: {
        id_usuario: id,
      },
    });
    if (usuario) {
      const statusAdmin = await user.update(id, { admin: admin });
      return "Admin atualizado com sucesso";
    } else {
      throw { status: 401, message: "Usuario não existe no banco de dados" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  getUsuarios,
  postUsuario,
  getUsuarioById,
  updateUser,
  authentication,
  atualizarSenha,
  desativaUsuario,
  adminStatus,
};
