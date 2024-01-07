<template>
   
    <div v-if="show" class="fixed bottom-2 right-2 max-w-sm items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <div>
          <i class="fa-regular fa-bell mr-2"></i>
          <span class="font-medium">{{message}}</span> 
        </div>
      </div>
  
    
</template>

<script>
     export default { 
        props: ['message'], 
        data() {
            return { 
                show: false
            }
        }, 
        methods: {
            showAlert() {
                this.show = true 
                setTimeout(() => {
                    this.show = false 
                },3000)
            }
        }
     }
</script>