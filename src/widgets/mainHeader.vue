<template>
  <div class="wrapper">
    <router-link to="/">
      <header>
        <div class="logo">
          <div class="circle">
            <img src="@/app/assets/icons/logo.svg" alt="logo" />
          </div>
        </div>
      </header>
    </router-link>
  </div>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    background-color: black;
    margin-bottom: 15rem;
  }

  .circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 25rem;
    background-color: black;
    border-radius: 50%;

    &::before {
      content: "";
      position: absolute;
      background-color: white;
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }

    & img {
      position: relative;
      top: 40px;
    }
  }
</style>
