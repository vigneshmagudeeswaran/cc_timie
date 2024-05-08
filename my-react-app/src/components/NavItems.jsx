export const NavItems=({classname1,classname2,classname3,classname4,buttonclass,srcPath,content})=>{
    return(
        <div className={classname1}>
        <div className={classname2}>
            <img className={classname3} src={srcPath}/>
        </div>
        <span className={classname4}>
            <button type="button" className={buttonclass}>
                {content}
            </button>
        </span>
    </div>
    )
}