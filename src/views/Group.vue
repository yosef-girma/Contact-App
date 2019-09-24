<template>
  <div class="ma-4">
   
  
    <v-card
      class="mx-auto"
      flat="flat"
      outlined 
      raised="raised"

    >
      <v-card-title></v-card-title>

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
          :items="members"
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

import AddGroupDlg from '@/components/AddGroupDlg'
export default {
   

  components:{

      AddGroupDlg

  },

  data() {
  return{

        members:[],
        del  : 'mdi-delete-outline',  
        search: '',
        selected: [],
        singleSelect: true,
        groupId :this.$route.params.id,
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
watch:{
    $route (to, from){
       console.log("i am watching u",this.$route.params.id);
       this.groupId = this.$route.params.id
       this.getGroupContacts(this.groupId)



    }
} ,
  created()
  {

    // console.log(" created id of the gorup",this.$route.params.id)
     this.groupId = this.$route.params.id
     this.getGroupContacts(this.groupId)

     //console.log("host name ",this.$hostname)
        
  },
mounted() {
   console.log(" mounted id ofthegorup")
    console.log("group created")
    //this.$emit('get-grpname')
    console.log("Get group name emitted")  
},
methods: {
  getGroupContacts(id)
  {
    let uri=this.$hostname+`groups/${id}`
    let that= this
    this.axios.get(uri).then(res =>{ 
     
    // console.log("response",res.data)
    // console.log("response members  ",res.data.members)
     if(res.data.members && res.data.members.length >0)
     {
       
       res.data.members.forEach(function(el)
       {
        console.log("this is members contact id",el.id)
        let uri=that.$hostname+ `contacts/${el.id}?filter[fields][id]=true&filter[fields][fname]=true&filter[fields][lname]=true&filter[fields][email]=true&filter[fields][phoneno]=true`

        that.axios.get(uri).then(response =>{
        console.log("Response member detail data ",response.data)
        that.members.push(response.data)
        })
        .catch(err =>  console.log(err))

       });

      console.log("member",this.members)
     }
     else
     {
       console.log("no member")
     }

     
     })
     .catch(err => console.log(err));

  }
 
},
};
</script>