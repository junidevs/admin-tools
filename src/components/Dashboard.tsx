import {FC, createRef, useEffect} from 'react';
import { useFetch } from '../hooks/useFetch'
import { useResize } from '../hooks/useResize'
import { useNavigate } from 'react-router-dom';
import { Spinner } from './Spinner'
import {useDebounce} from "../hooks/useDebounce";
import {useWindowDimensions} from "../hooks/useWindow";
import TableHeader from './tableHeader';
import { TableProvider } from '../contexts/TableContext';
const Dashboard:FC = () =>{

    const { width } = useWindowDimensions();
    const tableRef = createRef<null | HTMLDivElement | Element | undefined | any>();

    useEffect(() => {
        width >= 1050 ? tableRef.current.className = 'table--Visible' : tableRef.current.className = 'table--customDisplay';
    },[useDebounce(width,50)]);

    return(
        <TableProvider>
            <TableHeader ref={tableRef}/>
        </TableProvider>
    );
}
export default Dashboard;