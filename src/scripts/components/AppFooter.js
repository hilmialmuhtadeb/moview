class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        footer {
          text-align: center;
          padding: 20px;
          color: rgb(150, 150, 150);
          background-color: black;
        }
        .text-red {
          color: #FF0000;
        }
      </style>
    
      <footer>
        All Right Reserved &copy; 2021. Made by <span class="text-red">Hilmi Almuhtade</span> (Dicoding Students).
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);