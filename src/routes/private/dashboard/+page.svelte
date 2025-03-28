<script lang="ts">
  import { getUserState } from "$components/state/user-state.svelte";

    let userContext= getUserState();
    let {allBooks} = $derived(userContext);
   
</script>

{#each allBooks  as books }
    <li>{books.title}</li>
{/each}