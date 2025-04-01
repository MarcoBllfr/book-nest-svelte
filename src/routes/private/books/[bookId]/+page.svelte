<script lang="ts">
  import StarRating from "$components/StarRating.svelte";
  import type { Book } from "$components/state/user-state.svelte";
  interface BookPageProps {
    data: {
      book: Book;
    };
  }
  let { data }: BookPageProps = $props();

  let book = $derived(data.book);
</script>

<h2 class="book-title mt-m">{book.title}</h2>
<p class="book-author">by {book.author}</p>
<h4 class="mt-m mb-xs semi-bold">
  Your Rating <StarRating value={book.rating || 0} />
</h4>
<p class="small-font">
  click to {book.rating ? "change" : "give"}
</p>
{#if book.description}
  <h4 class="mt-m mb-xs semi-bold">Description</h4>
  <p class="mb-m">{book.description}</p>
{:else}
  <h4 class="mt-m mb-xs semi-bold">No description yet.</h4>
  <button
    class="block mb-m"
    onclick={() => console.log("toggle on the edit mode(!not improved!)")}>
    <p>Click to add one</p>
  </button>
{/if}

