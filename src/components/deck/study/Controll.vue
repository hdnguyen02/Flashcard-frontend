<template>
    <div v-if="this.nCards != 0" class="flex justify-center items-center flex-col">
      <Intro v-if="!isStudy" @startStudy="startStudy"
        :nNew="nTypeCard.fresh" 
        :nReview="nTypeCard.review" 
        :nLearning="nTypeCard.learning">
      </Intro>    
      <div v-else>
        <Card :card="card" @nextCard="handleNextCard"></Card>
      <div class="flex gap-x-4 mt-2 justify-center">
        <span class="text-green-600">{{nTypeCard.fresh}}</span>
        <span class="text-red-500">{{nTypeCard.learning}}</span>
        <span class="text-blue-500">{{nTypeCard.review}}</span>
      </div>
      </div>    
    </div>
    <div v-else>
      <Complete/>
    </div>
</template>

<script>

import Intro from '../study/Intro.vue'
import Card from './Card.vue'
import Complete from '../study/Complete.vue'

export default {
  components: {Intro, Card,Complete}, 
  data() {
    return {
      idDeck: this.$route.params.idDeck,
      cards: [],
      isStudy: false, 
      card: null,
      nTypeCard: {
        learning:0,
        review: 0, 
        fresh: 0
      },
      nCards: 0
    } 
  },
  created() {
    this.getCardsToStudy() // check xem số lượng từng cái. 
  }, 
  methods: {
    getCardsToStudy() {

      let urlApi = `api/v1/decks/${this.idDeck}/cards/study` 

      console.log(urlApi)

      this.$axios.get(urlApi)
        .then(apiResponse => {;
          const response = apiResponse.data
          this.cards = response.data
          this.nCards = this.cards.length
          if (this.cards.length == 0) return
          this.calcNTypeCard()
        })
        .catch(error=>{
          console.log(error)
          console.log("có chạy vào đây")
        
        })
    }, 
    calcNTypeCard() {
      this.nTypeCard.fresh = this.nTypeCard.learning = this.nTypeCard.review = 0 
        this.cards.forEach(card => {
          if (card.type === 'FRESH') {
            this.nTypeCard.fresh++
          }
          
          else if (card.type === 'LEARNING'){
            this.nTypeCard.learning++ 
          }
          else {
            this.nTypeCard.review++ 
          }
      })
      // tính toán lại loại card.
      if (this.card != null) {
        if (this.card.type === 'FRESH') {
            this.nTypeCard.fresh++
          }
          
          else if (this.card.type === 'LEARNING'){
            this.nTypeCard.learning++ 
          }
          else {
            this.nTypeCard.review++ 
          }
      }
     
    },
    startStudy() {
        this.isStudy = true
        this.card = this.cards.shift()
    },
    handleNextCard(q) {

      let cardStudy = {
        id: this.card.id, 
        q
      }       

      this.$axios.put(`api/v1/decks/${this.idDeck}/cards/study`,cardStudy) 
        .then(apiResponse => {
          this.nCards-- 
          const response = apiResponse.data
          const cardResponse = response.data 
          if (cardResponse.type == "LEARNING") { 
            this.cards.push(cardResponse)
            this.nCards++
          }
          if (this.cards.length == 0) return
          this.card = this.cards.shift()
          this.calcNTypeCard()
         
      }) 
    }
  }, 
} 


</script>

