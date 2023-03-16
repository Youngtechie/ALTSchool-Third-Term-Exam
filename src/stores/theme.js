import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      isDark: false,
      color: 'black',
      navBar: false
    }
  },
  actions: {
    changeTheme() {
      this.isDark = !this.isDark
      this.color = !this.isDark ? 'black' : "#fff"
    },
    changeNavBar(){
      this.navBar = !this.navBar
      console.log(this.navBar)
    }
  }
})
