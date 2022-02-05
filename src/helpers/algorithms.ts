
export const alphaData = (data:any) => data?.data.sort((a : { userId:string | number }, b : { userId:string | number }  ) =>{
    if(a.userId > b.userId) return 1

    else if(a.userId < b.userId) return -1

    else return 0;
})