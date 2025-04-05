<script lang="ts">
import heroImage from "$assets/hero.png";
  import { Button } from "$components";

</script>
<section class="default-margin hero">
    <div class="hero-text">
        <h1> Book Nest</h1>
        <h3>Yout personal book library</h3>
        <h4 class="mt-l">
          Crea tour una propria libreria digitale in cui puoi tenere traccia di ogni libro che leggi e ami.
        </h4>
        <h4 class="mb-s mt-m">
          Ho inserito una risposta standard dei libri, dato l'uso limitato di chiamate IA, tutte le altre fuzioni sono attive.
        </h4>
        <a href="https://github.com/MarcoBllfr/book-nest-svelte">
          <h4 class="mb-s mt-m">
            se vuoi clicca qui per la pagina github del progetto
          </h4>
        </a>
        <h4 class="mb-s mt-m">
          oppure registrati e fai un tour del sito
        </h4>
        <Button href="/register">Sing up</Button>
    </div>
    <img class="hero-image" src={heroImage} alt=""/>
</section>
<style>
    .hero {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 100px;
      margin-bottom: 80px;
    }
  
    .hero-image {
      width: 40%;
    }
  
    .hero-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 55%;
      padding-right: 50px;
    }
  </style>