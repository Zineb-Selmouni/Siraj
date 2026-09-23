import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    /**
     * Pas de source map en production.
     *
     * Elle republierait l'intégralité des sources — commentaires de
     * conception compris — et ajouterait un demi-mégaoctet au déploiement,
     * sans qu'aucun outil de suivi d'erreurs ne l'exploite ici. Le jour où
     * l'on en branche un, passer à `'hidden'` : la carte est alors produite
     * sans être référencée depuis le bundle.
     */
    sourcemap: false,
  },
})
