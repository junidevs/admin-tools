import {FC, useEffect, Fragment, useRef} from 'react';
import {  useParams } from 'react-router-dom';
import { useFetch } from "../hooks/useFetch";
import ListingManager from '../hooks/ListingManager';
import { Spinner } from './Spinner'
import {useDebounce} from "../hooks/useDebounce";
import {useWindowDimensions} from "../hooks/useWindow";
const UserDetails:FC = () => {

    const { width } = useWindowDimensions();
    const tableRef = useRef<null | HTMLDivElement | Element | any>(null);
    const { userId, locationId } = useParams()
    const { inProgress, isError, data  } = useFetch(`/admin/${locationId}/details`,null,"GET");

    useEffect(() => {
        const containerMultiPanoRenderer = document.querySelector('.panoWrapper');
        const allSpheres = Array.from(document.querySelectorAll('.imageRenderer'))
        const
            sphereListingManager = new ListingManager(
                containerMultiPanoRenderer,
                16,
                200,
                200,
                800,
                {
                }
            );
        sphereListingManager.init(allSpheres)


    });
    useEffect(() => {
        width >= 950 ? tableRef.current.className = 'table--Visible' : tableRef.current.className = 'table--customDisplay';
    },[useDebounce(width,50)]);

    const locationName = (data:any) => data?.data.data.name;
    const panosCount = (data:any) => data?.data.data.panos.length;
    const toursCount = (data:any) => data?.data.data.tours.length;
    const modifyData = (data:any) =>  new Date(data?.data.data.modificationDate).toLocaleString();
    const creationData = (data:any) =>  new Date(data?.data.data.creationData).toLocaleString();

     const renderTableData =  (data:any) => data.data.data.panos.map((item:any) =>{
         return(
             <div className="row" key={item}>
                 <div className="cell">
                 <img className='imageRenderer' width='200' src={`/${item}.jpg`} alt={"xd"}
                      data-src={`/mini${item}.jpg`}
                      data-yaw="0" data-roll="0" data-pitch="0" data-hfov="1" />
                 </div>
             </div>
         );
     });

    const renderMap = (data:any) =>  {
        let name = data?.data.data.name
        return <iframe width="600"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/search?q=${name}&key=AIzaSyAg3MjHXzPRXgVFSxYWz1zBYuB6qv4GU0Y`}>
            </iframe>;
    }

    return(
        <>
            <div ref={tableRef}>
            <div className="title_Table">
                <h2>Nazwa usera : {userId }</h2>
            </div>
                <div className="row header visible">
                    <div className="cell">Nazwa lokalizacji: {locationName(data)}</div>
                    <div className="cell">Liczba sfer: {panosCount(data)}</div>
                    <div className="cell">Liczba spacerów: {toursCount(data)}</div>
                    <div className="cell">Data utworzenia: {creationData(data)}</div>
                    <div className="cell">Data modyfikacji: {modifyData(data)}</div>
                </div>
            <div className="panoWrapper">

                {data !== undefined ? renderTableData(data) : <Spinner />}
            </div>
                <div className="map_Wrapper">
                    {renderMap(data)}
                </div>
            </div>
        </>
    );
}
export default UserDetails;
