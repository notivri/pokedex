import { defineStore } from "pinia"

const MAX_ITEMS = 15

export const useHistoryStore = defineStore("history", {
  state: () => ({
    pokemonIds: JSON.parse(localStorage.getItem("pokemon-history-ids") || "[]"),
  }),

  actions: {
    add(pokemonId) {
      if (!pokemonId || typeof pokemonId === "object") return

      this.pokemonIds = this.pokemonIds.filter((id) => id !== pokemonId)
      this.pokemonIds.unshift(pokemonId)

      if (this.pokemonIds.length > MAX_ITEMS) {
        this.pokemonIds.pop()
      }

      localStorage.setItem(
        "pokemon-history-ids",
        JSON.stringify(this.pokemonIds)
      )
    },

    getIds() {
      return this.pokemonIds
    },

    clear() {
      this.pokemonIds = []
      localStorage.removeItem("pokemon-history-ids")
    },
  },
})
