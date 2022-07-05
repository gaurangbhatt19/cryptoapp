export type tradelistprops={
    searchedCrypto:string|null,
    isClicked:boolean,
}

export type selectcryptoprops={
    setSearchText:React.Dispatch<React.SetStateAction<string | null>>,
    handleIsClicked:React.Dispatch<React.SetStateAction<boolean>>
}