import Vue from 'vue'
import Vuex from 'vuex'
import decode from "jwt-decode"
import modules from './modules'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  state:{
    token:'',
    usuarioDB:'',
    cliente:'',
    counter:'',
    doctexto:[],
    load:false,
    archivo:''
},
mutations:{
    obtenerUsuario(state,payload){
        state.token= payload;
        if(payload===''){
            state.usuarioDB=''
        }else{
            state.usuarioDB=decode(payload);
            var current_time = Date.now() / 1000;
            if ( state.usuarioDB.exp < current_time) {
                localStorage.removeItem('token');
                state.usuarioDB=''
            }
            
            axios.defaults.headers.common['authorization'] = `Bearer ${payload}`;
        }
    },
    cerrsarSession(state){
        state.usuarioDB=''
    },
    setearCliente(state,payload){
        state.cliente=payload;
        localStorage.setItem("cliente", JSON.stringify(payload));
    },
    cargars(state){
        state.load=!state.load;
    },
    cargarDocs(state,payload){
        state.doctexto.push(payload)
        console.log(state.doctexto)
    },
    docs(state, value){
        state.archivo = value;
        console.log(state.archivo)
    }
},
actions:{
    guardarUsuario({commit},payload){
        localStorage.setItem('token', payload);
        commit('obtenerUsuario', payload)
    },
    cerrarSession({commit}){
        commit('cerrsarSession')
    },
    SetCliente({commit},payload){
        commit('setearCliente', payload)
    },
    cargar({commit}){
        commit('cargars')
    },
    cargarDocumento({commit},payload){
        commit('cargarDocs', payload)
    }
}
})

export default store

