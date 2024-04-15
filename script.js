class Authentication {
    constructor() {
   
    }
  
  }
  
  class SignOut {
    static signOut() {
  
      window.location.href = "SignIn.html";
    }
  }
  
  class SelectColumn {
    constructor() {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeSelectElement();
      });
    }
  
    initializeSelectElement() {
      this.selectElement = document.getElementById("selectColumn");
      this.selectedOptions = [];
  
      this.selectElement.addEventListener("change", () => {
        this.handleSelectChange();
      });
    }
  
    handleSelectChange() {
      const selectedOption =
        this.selectElement.options[this.selectElement.selectedIndex];
      const value = selectedOption.value;
  
      if (!this.selectedOptions.includes(value)) {
        this.selectedOptions.push(value);
      }
  
      this.updateSelectedOptionsColor();
    }
  
    updateSelectedOptionsColor() {
      const options = this.selectElement.options;
      for (let i = 0; i < options.length; i++) {
        const value = options[i].value;
        if (this.selectedOptions.includes(value)) {
          options[i].classList.add("selected");
        } else {
          options[i].classList.remove("selected");
        }
      }
    }
  }
  
  // Usage
  const authentication = new Authentication();
  const selectColumn = new SelectColumn();
  