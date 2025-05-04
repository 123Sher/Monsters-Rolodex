import './search-box.styles.css'; //this file is present across the website.

const SearchBox = ({className,placeholder,onChangeHandler }) =>(
    <input 
        className={`search-box ${className}`} 
        type='search' 
        placeholder={placeholder} 
        onChange={onChangeHandler}
    />
);

    

export default SearchBox;