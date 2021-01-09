import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);



export default new Vuetify({
    theme: {
        themes: {
            light: {
                yellow: '#f6e18e',
                blue: '#3487ae',
                'active-chip': '#f6e18e',
                'unactive-chip': '#fcfcfc',
                'main-color': '#4d89a5'
            },
        },
    },
});
