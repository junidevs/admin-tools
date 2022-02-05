import {
    ReactElement,
    createContext,
    ReactNode,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { useQuery } from "../hooks/useQuery";
import { alphaData } from '../helpers/algorithms';
type ProviderProps = { children: ReactNode };

type TableDispatch = {
    setPage: Dispatch<SetStateAction<any>>;
    setData: Dispatch<SetStateAction<any>>;
};

export type TableState = {
    page: any;
    data:any;
};

const TableContext = createContext<TableState | undefined>(undefined);
const TableDispatchContext = createContext<TableDispatch | undefined>(undefined);

const TableProvider = ({ children }: ProviderProps): ReactElement => {
    const [page, setPage] = useState<number | undefined>(0);
    const [data, setData] = useState<any>();
    const { get } = useQuery();


    const getTableData = async () => {
        const data = await get<any>(`/admin/users/${page}`);
        return data ? setData(() => alphaData(data)) : setData([]);
    }

    useEffect(()=>{
        getTableData();
    },[page])

    return (
        <TableContext.Provider value={{ page, data }}>
            <TableDispatchContext.Provider value={{ setPage, setData }}>
                {children}
            </TableDispatchContext.Provider>
        </TableContext.Provider>
    );
};

const useTableContext = (): { tableContext: TableState; dispatchContext: TableDispatch } => {
    const tableContext = useContext(TableContext);
    const dispatchContext = useContext(TableDispatchContext);
    if (tableContext === undefined || dispatchContext === undefined) {
        throw new Error('useTableContext must be used within a ReportProvider');
    }
    return { tableContext, dispatchContext };
};

export { TableProvider, useTableContext };
