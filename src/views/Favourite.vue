<template>
  <div>
    <v-card
      class="mx-auto"
      flat="flat"
      
      outlined
      
      raised="raised"
     
    >
      <v-card-title>Favourite Contacts</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-sheild-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items=" favourites"
          :single-select="singleSelect"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.del="{ item }">
            <!-- <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip> -->

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn fab small v-on="on" @click="removeFavourite(item.id)" >
                  <v-icon>{{ del }}</v-icon>
                </v-btn>
              </template>
              <span>Remove</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions ></v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {

  data()
  {
    return{

        favourites:[],
        del  : 'mdi-delete-outline',  
        search: '',
        selected: [],
        singleSelect: true,
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'fname',
          },
          { text: 'Email', value: 'email' },
          { text: 'Phone No', value: 'phoneno' },
          { text: '',  value:'del'}
        ],
          del  : 'mdi-delete-outline',  
    }

  },
 
    created()
   {

     let uri="http://localhost:3000/api/Contacts/favourites"
     this.axios.get(uri)
     .then(response =>
     { 
     console.log(response.data.favourites)
     this.favourites = response.data.favourites
     console.log("fav",this.favourites)
        
     })
     .catch(err => console.log(err));

    

  },
  methods: {
    removeFavourite(id)
    {

    console.log("this is the id to be removed",id)
       let uri =`http://localhost:3000/api/contacts/favourite/update/${id}`
          console.log(id)
         this.axios.put(uri)
         .then(response => {

              console.log(response)
              this.favourites = this.response.filter(res =>{
                return res.id !=id
              
               });
          })
           .catch(err => console.log(err));  
    }
  },

};
</script>