<script lang="ts">
  import { BookCard } from "$components";
  import BookCategory from "$components/BookCategory.svelte";
  import { getUserState } from "$components/state/user-state.svelte";
  import Icon from "@iconify/svelte";

  let userContext = getUserState();
  let { userName, allBooks } = $derived(userContext);
</script>

<div class="dashboard">
  <div class="dashboard-header mb-m">
    <a href="/private/scan-shelf" class="add-book">
      <Icon icon="icons8:plus" width={"72"} height={"72"} />
      <p>Add a book</p>
    </a>
    <div class="headline">
      <h3 class="bold mb-xs">Welcome back, {userName}</h3>
      <p>
        There's nothing quite like the journey a good book can take you on. Have
        you discovered any new favorites recentrly?
      </p>
    </div>
  </div>
 {#if allBooks.length}
 {#if userContext.getHighestRatedBooks().length}
 <BookCategory 
 bookToDisplay={userContext.getHighestRatedBooks()} 
 categoryName={"Your favorite books"}
 />
 {/if}

 <BookCategory 
 bookToDisplay={userContext.getUnreadBooks()} 
 categoryName={"Recently added, unread books"}
 />
 {#if userContext.getFavoriteGenre()}
       <BookCategory
       bookToDisplay={userContext.getBooksFromFavoriteGenre()}
         categoryName={`Highest rated books from your favorite genre: ${userContext.getFavoriteGenre()}`}
       />
     {/if}
 {:else}
 <div class="upload-hint">
  <a href="/private/scan-shelf" class="upload-hint mt-l">
    <h3>You have no book in your library. Click here to add</h3>
    <div class="mt-m">
      <Icon icon="icons8:plus" width={"72"} height={"72"} />
      <p>Add books</p>
    </div>
  </a>
 </div>
 {/if}
 
 
</div>

<style>
  .dashboard-header{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .add-book{
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .add-book p{
    margin-left: 8px;
  }
  .headline{
    text-align: right;
    max-width: 30%;
    min-width: 300px;
  }
  .upload-hint{
    display: flex;
    text-decoration: none;
    width:100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .upload-hint div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>