<!-- ContactPage.svelte -->
<script lang="ts">
    import { fade } from "svelte/transition";
  </script>
  
  <div class="page-content" transition:fade>
    <h2>Contact Here</h2>
    <div class="content">
      <!-- Your about content here -->
    </div>
  </div>
  
  <style>
    .page-content {
      padding: 40px;
      height: 100%;
    }
  
    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  
    .content {
      height: calc(100% - 100px);
      overflow-y: auto;
    }
  </style>
  