<template>
  <div class="wrapper">
    <div
      class="image"
      :style="{ 'background-color': pokeColors[pokemonColor] }"
    >
      <img :src="pokemonImage" :alt="pokemon.name" />
    </div>

    <div class="info">
      <div class="header-wrapper">
        <h1>{{ pokemon.name.replace("-", " ") }}</h1>
        <h2>#{{ pokemon.id }}</h2>
      </div>

      <div class="types">
        <pokeType
          v-for="(t, index) in pokemon.types"
          :key="index"
          :color="typeColors[t.type.name]"
        >
          {{ t.type.name }}
        </pokeType>
      </div>

      <div class="stats">
        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="stat-item"
        >
          <span class="stat-name">{{ stat.stat.name.replace("-", " ") }}</span>
          <span class="stat-value">{{ stat.base_stat }}</span>
          <div class="stat-bar">
            <div
              class="stat-fill"
              :style="{
                '--stat-width':
                  (stat.base_stat / maxPossibleStats[stat.stat.name]) * 100 +
                  '%',
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import pokeType from "../shared/ui/pokeType.vue"
  import { pokeColors, typeColors } from "../shared/constants/colors"
  import { maxPossibleStats } from "../shared/constants/maxStats"

  const props = defineProps(["pokemonData"])
  const pokemon = props.pokemonData
  const pokemonColor = pokemon.species.color.name
  const pokemonImage =
    pokemon.sprites.other["official-artwork"]["front_default"]
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    background: white;
    border-radius: 1rem;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .image {
      padding: 20px;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .info {
      padding: 16px;

      .header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 0.2rem solid rgba(0, 0, 0, 0.1);
        border-bottom: 0.2rem solid rgba(0, 0, 0, 0.1);

        h1 {
          font-family: "Archive";
          text-transform: capitalize;
          font-size: 1.5rem;
        }

        h2 {
          font-family: "Archive";
          font-weight: 400;
          color: gray;
        }
      }

      .types {
        display: flex;
        gap: 0.5rem;
        margin-top: 12px;

        h3 {
          font-size: 1.1rem;
          margin-bottom: 6px;
        }
      }

      .stats {
        margin-top: 16px;

        h3 {
          font-size: 1.1rem;
          margin-bottom: 6px;
        }

        .stat-item {
          margin-bottom: 8px;

          .stat-name {
            font-size: 0.9rem;
            text-transform: capitalize;
          }

          .stat-value {
            font-weight: bold;
            float: right;
          }

          .stat-bar {
            background: #eee;
            height: 6px;
            border-radius: 4px;
            overflow: hidden;

            .stat-fill {
              width: 0%;
              height: 100%;
              background: #81c784;
              animation: fillBar 1s ease forwards;
            }
          }
        }
      }
    }
  }

  @keyframes fillBar {
    from {
      width: 0%;
    }
    to {
      width: var(--stat-width);
    }
  }
</style>
