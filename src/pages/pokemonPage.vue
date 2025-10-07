<template>
  <main>
    <div class="wrapper">
      <div class="info">
        <div class="header">
          <div>
            <h1>Поригон</h1>
            <div class="types">
              <pokeType>Обични</pokeType>
              <pokeType>Необични</pokeType>
            </div>
          </div>
          <h3>#138</h3>
        </div>

        <div class="stats">
          <div class="stat"></div>
          <div class="stat">7.5 kg</div>
          <div class="stat">0.4 m</div>
          <div class="stat">
            <div>Shell Armour</div>
            <div>Swift Swim</div>
          </div>
        </div>
      </div>

      <div class="image">
        <img
          class="pokeball"
          src="@/app/assets/icons/pokeball.svg"
          alt="pokeball"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
  import pokeType from "../shared/ui/pokeType.vue"
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }

  .info {
    width: 100%;

    & .header {
      display: flex;
      justify-content: space-between;
      padding: 2rem;

      & .types {
        display: flex;
        gap: 0.275rem;
      }
    }

    & .stats {
      display: flex;
      justify-content: space-around;
      background-color: lightblue;
      flex: 0 0 1;

      & .stat {
        display: flex;
        align-items: start;
        border-bottom: 1px solid black;
      }
    }
  }

  .image {
    width: 30%;
    height: 100vh;
    background-color: aquamarine;
    border-radius: 0 3rem 3rem 0;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-family: "Archive";
  }
</style>
