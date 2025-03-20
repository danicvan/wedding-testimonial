// Este arquivo é apenas para referência e não precisa ser incluído no projeto final
// Ele mostra como as imagens sólidas foram geradas

import { createCanvas } from "canvas"
import fs from "fs"
import path from "path"

// Função para gerar imagens sólidas com texto
function generateSolidImage(width: number, height: number, color: string, text: string, outputPath: string) {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")

  // Preencher com cor sólida
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  // Adicionar texto
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 24px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, width / 2, height / 2)

  // Salvar a imagem
  const buffer = canvas.toBuffer("image/jpeg")
  fs.writeFileSync(outputPath, buffer)
}

// Cores para diferentes categorias
const colors = {
  wedding: "#f43f5e", // Rosa para imagens de casamento
  shop: "#3b82f6", // Azul para produtos da loja
  user: "#8b5cf6", // Roxo para avatares de usuários
  misc: "#22c55e", // Verde para outras imagens
}

// Gerar imagens de casamento
;[
  "beach-wedding",
  "barn-wedding",
  "garden-wedding",
  "wedding-hero",
  "wedding-video-thumbnail",
  "first-dance",
  "vineyard-wedding",
  "diy-centerpieces",
  "city-wedding",
  "new-testimonial",
].forEach((name) => {
  generateSolidImage(600, 400, colors.wedding, name.replace(/-/g, " "), path.join(__dirname, `${name}.jpg`))
})

// Gerar imagens de produtos
;[
  "planner-book",
  "photo-album",
  "vow-journals",
  "digital-templates",
  "memory-box",
  "marriage-journal",
  "budget-calculator",
  "website-template",
].forEach((name) => {
  generateSolidImage(300, 300, colors.shop, name.replace(/-/g, " "), path.join(__dirname, `shop/${name}.jpg`))
})

// Gerar avatares de usuários
for (let i = 1; i <= 13; i++) {
  generateSolidImage(200, 200, colors.user, `Couple ${i}`, path.join(__dirname, `couple-${i}.jpg`))
}
// Gerar outras imagens
;["new-upload", "video-upload", "music-upload", "ai-assistant", "user-avatar", "user-1", "user-2"].forEach((name) => {
  generateSolidImage(200, 200, colors.misc, name.replace(/-/g, " "), path.join(__dirname, `${name}.jpg`))
})

