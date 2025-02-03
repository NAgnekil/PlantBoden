<script setup>
  import { ref } from 'vue'
</script>

<template>
  <header>
    <h1>Fröboden</h1>
    <div class="image">
      <div class="image-overlay"></div>
    </div>
    <nav>
      <ul>
        <li><a href="#">Start</a></li>
        <li>
          <a href="#">Kategorier</a>
          <ul class="dropdown">
            <li><a href="#">Utvalda</a></li>
          </ul>
        </li>
        <li><a href="#">Utvalda</a></li>
        <li><a href="">Trädgårdsöversikt</a></li>
        <li><a href="#">Kalender</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    padding: 0 3rem;
    background-color: #fdfcfb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    box-shadow: 0px 3px 5px -1px #ccc;
    border-top: 4px solid var(--color-green);
    h1 {
      font-family: Aboreto, sans-serif;
      font-size: 2.2rem;
      letter-spacing: 0.2rem;
      margin: 1.5rem 3rem;
    }
    /* .image {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-image: url(../assets/header-background.jpg);
      .image-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(249, 245, 242, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    } */
    nav {
      margin: 0 auto;
      display: block;
      text-align: center;
      font-size: 0.8rem;
      ul li {
        list-style: none;
        margin: 0 auto;
        border-left: 2px solid var(--color-green);
        display: inline-block;
        padding: 0 15px;
        position: relative;
        text-decoration: none;
        text-align: center;
        font-family: arvo;
        a {
          color: var(--color-dark-grey);
          text-decoration: none;
          font-family: 'Aboreto', sans-serif;
          font-weight: 600;

          &:hover {
            color: var(--color-green);
          }
        }
        &:hover {
          cursor: pointer;
        }
        &:hover > ul,
        ul li ul:hover {
          visibility: visible;
          opacity: 1;
          display: block;
          min-width: 200px;
          text-align: left;
          padding-top: 20px;
          box-shadow: 0px 3px 5px -1px #ccc;
        }
        ul {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          padding-left: 0;
          margin-top: 10px;
          left: 0;
          display: none;
          background: #fff;
          border-radius: 4px;
          li {
            clear: both;
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
            border-style: none;
            a {
              transition: all 0.5s ease;
              &:hover {
                padding-left: 10px;
                border-left: 2px solid var(--color-green);
                transition: all 0.3s ease;
              }
            }
          }
        }
      }
    }
  }
</style>
