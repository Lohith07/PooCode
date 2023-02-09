class SearchComponent {
    res_arr;

    SearchComponent(key, target, setAllDrug, allProducts) {
        this.key = key;
        this.target = target;
        this.setAllDrug = setAllDrug;
        this.allProducts = allProducts;
    }

    searchDrug(key) {
        this.res_arr = this.setAllDrug;
    }

    loadSeacher() {
        switch (this.target) {
            case 'drugs': this.searchDrug(this.key);
        }
    }

}
export default SearchComponent;