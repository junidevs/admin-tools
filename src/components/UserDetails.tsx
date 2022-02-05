import {FC, useEffect, useRef, useState} from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import {useFetch} from "../hooks/useFetch";
import { useWindowDimensions } from "../hooks/useWindow";
import { useDebounce } from "../hooks/useDebounce";
import { Spinner } from './Spinner'

const UserDetails:FC = () => {
    const navigate = useNavigate();

    const { width } = useWindowDimensions();
    const tableRef = useRef<null | HTMLDivElement | Element | any>(null);
    const { userId } = useParams()
    const { inProgress, isError, data  } = useFetch(`/admin/${userId}/locations`,null,"GET");
    const [spheres, setSpheres] = useState(0);
    const [walks, setWalks] = useState(0);

    const panosCount = (data:any) => data?.data.length > 1
            ? data?.data.reduce((a:any,b:any) => a.panosCount !== undefined ? a.panosCount + b.panosCount : a + b.panosCount)
            : data?.data[0]?.panosCount ?? ''

    const toursCount = (data:any) => data?.data.length > 1
        ? data?.data.reduce((a:any,b:any) => a.toursCount !== undefined ? a.toursCount + b.toursCount : a + b.toursCount)
        : data?.data[0].toursCount ?? ''

    useEffect(() => {
        width >= 950 ? tableRef.current.className = 'table--Visible' : tableRef.current.className = 'table--customDisplay';
    },[useDebounce(width,50)]);

    useEffect(() => {
         setSpheres(panosCount(data))
         setWalks(toursCount(data))
    },[data]);




  const renderTableData =  (data:any) => data?.data.map((value:any) => {
      const convertedData = (date:string) =>  new Date(date).toLocaleString();
          return(

              <div className="row" key={value.locationId}>
                  <div onClick={() => navigate(`/dashboard/${userId}/${value.locationId}`)} data-title="Nazwa lokalizacji" className="cell">{value.locationDetails.name}</div>
                  <div data-title="Liczba sfer" className="cell">{value.panosCount ?? 'Not found'}</div>
                  <div data-title="Liczba spacerów" className="cell">{value.toursCount}</div>
                  <div data-title="GPS - link do mapy" className="cell">
                      <a className="link" href={`https://www.google.com/maps/search/${value.locationDetails.name}`}>
                        Link do mapy
                      </a>
                  </div>
                  <div data-title="Data utworzenia" className="cell">{convertedData(value.locationDetails.creationData)}</div>
                  <div data-title="Data modyfikacji" className="cell">{convertedData(value.locationDetails.modificationDate)}</div>
              </div>
          );
      })

    return(
        <>
            <div ref={tableRef}>
                <div className="title_Table">
                    <h2>Nazwa usera : {userId }</h2>
                    <h2>Liczba sfer {spheres}</h2>
                    <h2>Liczba spacerów: {walks}</h2>
                </div>
                <div className="row header">
                    <div className="cell">Nazwa lokalizacji</div>
                    <div className="cell">Liczba sfer</div>
                    <div className="cell">Liczba spacerów</div>
                    <div className="cell">GPS link do mapy</div>
                    <div className="cell">Data utworzenia</div>
                    <div className="cell">Data modyfikacji</div>
                </div>
                {data !== undefined ? renderTableData(data) : <Spinner />}
            </div>
        </>
    );
}
export default UserDetails;
