<script lang="ts">
  import Button from "$components/Button.svelte";
  import { getUserState } from "$components/state/user-state.svelte";

    let userContex = getUserState();
    let userName = $state(userContex.userName || "");
    let isEditMode = $state(false);
    let email = $state(userContex.user?.email || "");
    let avgRating = $derived.by(()=>{
        const booksWithRating= userContex.allBooks.filter((books)=>books.rating);
        if(booksWithRating.length === 0){
            return "no rating yet";
        }
        const sumOfAllRatings=booksWithRating.reduce((acc, book)=>acc + book.rating!,0);
        
       const averageRating=Math.round(100* (sumOfAllRatings / booksWithRating.length))/100; 
       return averageRating;
    });
    $effect(()=>{
        if(userContex.userName){
            userName=userContex.userName;
        }
    });
    async function toggleEditMode(){
        if(isEditMode)[
            await userContex.updateAccountData(email, userName)
        ]
        isEditMode = !isEditMode;
    }
    async function deleteAccount() {
        const confirmDelete = window.confirm(
            "Are you sure you want delete your account? this action is irreversible"
        )
        if(confirmDelete){
            await userContex.deleteAccount();
        }
    }
</script>

<div class="settings-page">
    <div class="settings-container">
        <h2>Settings</h2>
        <h5 class="mt-m mb-xs semi-bold">Username</h5>
        {#if isEditMode}
        <input type="text" name="userName" bind:value={userName} />
        {:else}
        <h3>{userName}</h3>
        {/if}
        <h5 class="mt-m mb-xs semi-bold">Email</h5>
        {#if isEditMode}
        <input type="text" name="email" bind:value={email} />
        {:else}
        <h3>{email}</h3>
        {/if}
        <div class="buttons-container mt-l">
            <Button isSecondary={true} onclick={toggleEditMode}>
                {isEditMode? "Save changes" : "Edit"}
            </Button>
            <Button isDanger={true} onclick={deleteAccount}>
                Delete account
            </Button>
        </div>
    </div>
    <div class="stats-container">
        <h5 class="semi-bold">Books in library</h5>
        <h3>{userContex.allBooks.length}</h3>
        <h5 class="semi-bold mt-m">Finished books</h5>
        <h3>{userContex.allBooks.filter((books)=>Boolean(books.finished_reading_on)).length}</h3>
        <h5 class="semi-bold mt-m">Average rating given</h5>
        <h3>{avgRating}</h3>
    </div>
</div>
<style>
    .settings-page{
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
    }
    .settings-container{
        margin-right: 80px;
    }
    .settings-container input{
        width: 100%;
    }
    .stats-container{
        min-width: 25%;
        border-radius: 12px;
        padding: 8px 24px;
        background-color: rgba(255, 255, 255, 0.5);
        margin-bottom: 40px;
    }
</style>