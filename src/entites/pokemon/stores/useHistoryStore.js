import { defineStore } from "pinia"

const MAX_ITEMS = 15

export const useHistoryStore = defineStore("history", {
  id: "history",

  state: () => ({
    pokemonIds: [],
  }),

  actions: {
    add(pokemonId) {
      if (!pokemonId || typeof pokemonId === "object") return

      this.pokemonIds = this.pokemonIds.filter((id) => id !== pokemonId)

      this.pokemonIds.push(pokemonId)

      if (this.pokemonIds.length > MAX_ITEMS) {
        this.pokemonIds = this.pokemonIds.slice(-MAX_ITEMS)
      }
    },

    getIds() {
      return this.pokemonIds
    },

    clear() {
      this.pokemonIds = []
    },
  },

  persist: true,
})
