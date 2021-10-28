class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="jumbotron py-5">
        <div class="container">
          <h1>Find Movies Here</h1>
          <p>browse and find the movies you are looking for. <b>most complete</b>. <b>fastest</b>.</p>
          <div class="row">
            <div class="col-md-6 col-10">
              <div class="input-group my-3">
                <input type="text" class="form-control" id="search-input" placeholder="Movie's title" aria-describedby="search-button" name="title">
                <button class="btn btn-secondary" type="button" id="search-button">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);