// Import the `defineStore` function from the `pinia` library
import { defineStore } from 'pinia'

// Define a new store using the `defineStore` function
export const useThemeStore = defineStore('theme', {

  // Define the initial state of the store
  state: () => {
    return {
      isDark: false, // A boolean value indicating whether the dark theme is currently active
      color: 'black', // The color used for text and icons in the theme toggle button
      navBar: false // A boolean value indicating whether the navigation bar is currently open or closed
    }
  },

  // Define actions that can be used to update the state of the store
  actions: {
    // An action that toggles between the light and dark themes
    changeTheme() {
      this.isDark = !this.isDark // Toggle the `isDark` value between `true` and `false`
      this.color = !this.isDark ? 'black' : "#fff" // Set the `color` value based on the `isDark` value
    },
    // An action that toggles the navigation bar between open and closed
    changeNavBar(){
      this.navBar = !this.navBar // Toggle the `navBar` value between `true` and `false`
      console.log(this.navBar) // Log the current value of `navBar` to the console
    }
  }
})
