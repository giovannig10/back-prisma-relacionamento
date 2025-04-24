import cardModel from "../models/cardModel.js";
import CardModel from "../models/cardModel.js";


class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    try {
      const cartas = await CardModel.findAll();
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // POST /cartas
  async createCard (req, res) {
    try {
      // Validação básica
      const {
       name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      } = req.body;

      // Verifica se todos os campos do personagem foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !collectionId

        
      ) {
        return res
          .status(400)
          .json({ error: "Os campos nome, raridade, ponto de ataque, ponto de defesa e o id da coleção são obrigatorios" });
      }

      // Criar uma nova carta
      const newCard = await cardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId

      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar card" });
      }

      res.status(201).json({message:"teste de massage", newCard});
    } catch (error) {
      console.error("Erro ao criar card:", error);
      res.status(500).json({ error: "Erro ao criar card" });
    }
  }

  // PUT /card/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      } = req.body;

      // Atualizar a coleção
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar card:", error);
      res.status(500).json({ error: "Erro ao atualizar card" });
    }
  }

  // DELETE /cartas/:id  '
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await cardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
