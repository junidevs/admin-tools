// idea to add parameter zone and depending on zone convert time param
export const useTime = <T extends unknown> ( time:string) => new Date(time).toLocaleString();
