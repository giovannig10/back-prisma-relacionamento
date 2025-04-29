import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class AuthController {
  //Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  //Registrar novo usuario
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      //Validação básica
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos nome, email e senha são obrigátorios" });
      }

      //Verificar se o usuário ja existe
      const userExists = await userModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      //Hash da senha
       const hashedPassword = await bcrypt.hash(password, 10);

       //Criar objeto do usuário
       const data = {
         name,
         email,
         password: hashedPassword,
       };

        //Criar usuário
        const user = await userModel.create(data);

        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            user,
        });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }
}

export default new AuthController();
