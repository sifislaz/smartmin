// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme:{
    themes:{
      light:{
        dark: false,
        colors:{
          primary: '#014171',
          secondary: '#017dc5',
          bgLight: '#d9d9d9',
          bgDark: '#bbbbbb',
          alertRed: '#d61f1f',
          alertOrange: '#d6771f',
          alertGreen: '1f8847',
          switchGreen: '1fd647'
        }
      }
    }
  }
})
