import React from 'react';

const ShowCountries = (newSearch, countries, onClickMethod) => {

    const notSearching = (newSearch) === ''

    const FilteredList = countries.filter(e => e.name.toLowerCase().includes(newSearch.toLowerCase()))

    const FilteredByNumberList = countries.filter(e => e.numericCode === newSearch)

    const PrintContact = (Country) => 
    <div key={Country.numericCode}>
    <h2>{Country.name}</h2>
    <p>capital: {Country.capital}</p>
    <p>population: {Country.population}</p>
    <p><img src={Country.flag} alt='flag'/></p>
    </div>

    const PrintMany = (country, onClickMethod) => 
    <div key={country.numericCode}> 
    <button onClick={onClickMethod(country.numericCode)}> 
        {country.name}
    </button>
    </div>

    const TooManyResultsText = <div>too many matches, specify another filter</div>

    const ShowOneOrMore = 
    FilteredList.length === 1 ? FilteredList.map(e => PrintContact(e)) : FilteredList.map(e => PrintMany(e, onClickMethod))

    const DefaultSearchReturn =  
    notSearching || FilteredList.length > 10 ? TooManyResultsText : ShowOneOrMore

    const SearchWithNumber = FilteredByNumberList.map(e => PrintContact(e))

    const ReturnThis = FilteredByNumberList.length === 1 ?
    SearchWithNumber :
    DefaultSearchReturn
    
    return (


        ReturnThis

    )
}

export default ShowCountries;