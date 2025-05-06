import express from "express";

//Importar as rotas
import authRouter from "./authRoutes.js";
import animesRouter from "./animeRoutes.js";
import collectionRouter from "./collectionRoutes.js";
import cardRouter from "./cardRoutes.js"; // Importa as rotas de cartas
import personagensRouter from "./personagensRoutes.js"; // Importa as rotas de personagens

import authMiddleware from "../middlewares/authMiddleware.js"; // Importa o middleware de autenticação

const router = express.Router(); // Cria um novo roteador

//Rotas públicas
router.use("/auth", authRouter); // Usar as rotas de autenticação
router.use("/collections", collectionRouter);
router.use("/cards", cardRouter); // Usar as rotas de cartas

//Rotas privadas
router.use(authMiddleware); // Aplica o middleware de autenticação para as rotas abaixo

router.use("/animes", animesRouter); // Usar as rotas de animes
router.use("/personagens", personagensRouter); // Usar as rotas de personagens

export default router; // Exporta o roteador para ser usado em outros arquivos