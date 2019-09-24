<template>
<v-app id="inspire" class="grey lighten-4">
<v-navigation-drawer
v-model="drawer"
:clipped="$vuetify.breakpoint.lgAndUp"
app
>
<v-list dense>
<template v-for="item in items">
  <v-list-group
v-if="item.children"
:key="item.text"
v-model="item.model"
:append-icon="item.model ? item.icon : item['icon-alt']"
:prepend-icon="item.gicon"
>
<template v-slot:activator>
<v-list-item 
@click.prevent="getGroupName"
>
<!-- @click.prevent="swapComponent(item.text)" -->
<v-list-item-content>
<v-list-item-title>
{{ item.text }}
</v-list-item-title>
</v-list-item-content>
</v-list-item>
</template>
<v-list-item justify-center class="ml-12"
v-for="(child, i) in item.children"
:key="i"
@click="child.id==0 ? gdialog = !gdialog : selectGroup(child.id)"
>
<v-list-item-action v-if="child.icon">
<v-icon>{{ child.icon }}</v-icon>
</v-list-item-action>
<v-list-item-content>
<v-list-item-title>
{{ child.text }}
</v-list-item-title>
</v-list-item-content>
</v-list-item>
</v-list-group>

<v-list-item
 v-else
:key="item.text"
@click="" :to="item.route"
>
<v-list-item-action>
<v-icon>{{ item.icon }}</v-icon>
</v-list-item-action>
<v-list-item-content>
<v-list-item-title>
{{ item.text }}

</v-list-item-title>
</v-list-item-content>
</v-list-item>
</template>
</v-list>


</v-navigation-drawer>
<v-app-bar
dark
:clipped-left="$vuetify.breakpoint.lgAndUp"
app
color="blue darken-3"

>
<v-toolbar-title
style="width: 300px"
class="ml-0 pl-4"
dark
>
<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
<span class="hidden-sm-and-down"> Contacts</span>
</v-toolbar-title>

<div class="flex-grow-1"></div>

<Menu />


</v-app-bar>


<!-- <component class="ml-12 mt-6" :is="currentComponent" v-on:get-grpname="getGroupName"></component>
 -->
   <transition name="fade">
      <router-view></router-view>
    </transition>
 <div v-if="gdialog">
<AddGroupDlg  :gdialog="gdialog" @update-dlg="gdialog = false"/>
  </div>  
<Confirm />
</v-app>

</template>

<script>

import AddGroupDlg from '@/components/AddGroupDlg.vue'
import Menu from '@/components/Menu'
import Confirm from '@/components/Confirm'

export default {


  props: {
   source: String,
   
         },
  components:
  {
    AddGroupDlg,
    Menu,
    Confirm,
  
  } ,      

 
  data: () => ({

  dialog: false,
  gdialog:false, 
  drawer: null,
  contactsName:[],

items: [
{ icon: 'mdi-contacts', text: 'Contacts' ,route:'/contact'},
{ icon: 'mdi-star', text: 'Favourite', route:'/contact/favourite'},
{ 
  
  gicon: 'mdi-account-group',
  text: 'Group' ,
  icon: 'mdi-chevron-up',
  'icon-alt': 'mdi-chevron-down',
  model:false,
  children:
  []
  
  },
{ icon: 'mdi-send', text: 'Send-Feedback' ,route:'/contact/feedback'  },
{ icon: 'mdi-help', text: 'Help',route: '/contact/help' }
]
}),

methods:
{

selectGroup(id)
{
 
   this.$router.push({name:'group',params:{id:id}})
 }

,
getGroupName()
{
  
  let uri ="http://localhost:3000/api/groups?filter[fields][id]=true&filter[fields][name]=true"
  var groupList =[]
  this.axios.get(uri)
  .then(response =>{
 
     var that = this

     that.items[2].children.length =0
     that.items[2].children.push({icon:'mdi-plus',text:'Create Group',id:'0'})
     response.data.forEach(function(element)
     { 
       
       var ix = {id:element.id,text:element.name}   
       that.items[2].children.push(ix)
     });   
  }).
  catch(err => console.log(err));

}}};
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>


<!-- <template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
     
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template> -->
<!--
<script>


export default {
  name: 'App',
  components: {
  
  },
  data: () => ({
    //
  }),
};
</script> -->