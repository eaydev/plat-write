import { HiMoon, HiSun , HiSwitchHorizontal, HiHeart, HiMinusCircle, HiOutlineArrowDown} from "react-icons/hi";
import {React, useEffect, useState} from 'react';
import {Button} from "./Units/Button.js";
import {PageContainer} from "./Units/Container.js";
import {BasicCard} from "./Units/QuoteCard.js";
import { getQuotes } from "./Utility/Quote.js";
import styled from 'styled-components';

import "./main.css";


// Note: I cheated the styles in this App. The styles are coming from the base tldrip and I also took the opportunity to try
// stylec components. Probably won't fix. At this moment of time I am still learning to use the rest of the hooks.

function App() {
  //State for the app.
  const [darkMode, setDarkMode] = useState(true);
  const [quoteList, setquoteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [csv, setCsv] = useState("");

  //On Mount Trigger quoteList change.
  useEffect(async ()=>{
    //Get quotes, and set mode.
    if(quoteList.length === 0 && !init && !loading){
      setDarkMode(JSON.parse(window.localStorage.getItem("mode")));

      await newQuotes();

      setInit(true);
    }

    //Get light mode preference.


  });

  //State update calls here.
  const newQuotes = async () =>{
    setLoading(true);
    let quotes = await getQuotes();
    let quoteSet = await randomTen(quotes);

    setquoteList(quoteSet);
    createDownload(quoteSet);
    setLoading(false);
  }

  // Get random ten quotes.
  const randomTen = (quotes) =>{
    let randomNum = [];

    while (randomNum.length !== 12){
      // Get a list of 10.
      let randomVal = Math.floor(Math.random() * 150);
      if(!randomNum.includes(randomVal)){
        randomNum.push(randomVal);
      }
    }

    let randomTenQuotes = quotes.filter((quote,index)=>{
      if(randomNum.includes(index)){
        return quote;
      }
    });

    return randomTenQuotes;
  }

  //Toggle light or dark.
  const lightModeToggle = (e) =>{
    window.localStorage.setItem(
      "mode", JSON.stringify(!darkMode)
    );

    setDarkMode(!darkMode);
  }

  //Create CSV for download.
  const createDownload = (quoteSet) =>{
    console.log(quoteSet);
    let rows = quoteSet.map((quote)=>{return quote.content}).map(text=>{return text.replaceAll("\n", "")}).map(text=>{return text.replaceAll(",", "")});
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.join("\n");

    csvContent = encodeURI(csvContent);
    setCsv(csvContent);
  }

  //Trigger download of CSV.
  const triggerDownload = () =>{
    document.querySelector(".csv-download").click();
  }

  return (
    <div className={darkMode ? "fullspan bg-lightgrey page-container pad-2 box" : "fullspan page-container pad-2 box"}>

        <a className="fullspan csv-download" style={{height: "100%", color: "black", overflow: "hidden", height: "1px", width: "1px"}} href={csv} download="platitudes.csv" disabled></a>
        
        <Button darkMode={darkMode ? true : false} clickhandler={lightModeToggle}>
          {darkMode ? <HiMoon /> : <HiSun />}
        </Button>

        <Button darkMode={darkMode ? true : false} clickhandler={newQuotes} disabled={loading ? true : false}>
          {loading ? <HiMinusCircle /> : <HiSwitchHorizontal />}
        </Button>

        <Button darkMode={darkMode ? true : false} disabled={loading ? true : false} clickhandler={triggerDownload}>
          {loading ? <HiMinusCircle /> : <HiOutlineArrowDown />}
        </Button>

        <PageContainer className="quote-container" list={quoteList.length === 0 ? false : true} darkMode={darkMode ? true : false}>
            {quoteList.map((quote, idx)=>{
              return (<BasicCard key={idx} darkMode={darkMode ? true : false} text={quote.content}/>)
            })}
        </PageContainer>

        <PageContainer list="true">
          <p className={darkMode ? "fullspan text-right text-white" : "fullspan text-right text-black"}><i>Platitude Exporter.</i> Made with <HiHeart color="red"></HiHeart> <a href="https://twitter.com/VolkCulture" className={darkMode ? "text-white" : "text-black"} style={ {textDecoration: "underline"} }>Volk</a></p>
          <p className={darkMode ? "fullspan text-right text-white" : "fullspan text-right text-black"}><a href="https://tld.rip" className={darkMode ? "text-white" : "text-black"} style={ {textDecoration: "underline"} }>Check out TLDrip</a></p>
        </PageContainer>
    </div>
  );

}

export default App;
