import "../main.css";

export const BasicCard = ({text, darkMode, clickhandler})=>{
    return (
        <pre onClick={clickhandler} className={!darkMode ? 'tweet-grid-box border-lightgrey pad-2 box rounded' : 'tweet-grid-box border-grey border-width-1 text-white pad-2 box rounded'}>{text}</pre>
    )
}
