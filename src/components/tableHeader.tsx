import { forwardRef } from 'react';
import TableLayout from './tableLayout';
import { useTableContext } from "../contexts/TableContext";

export type Ref = HTMLDivElement | null;

const TableHeader = forwardRef<Ref>(({}, tableRef) => {
    const { tableContext : { data, page }, dispatchContext: { setPage, setData } } = useTableContext();

    const prevPage = () => {
        setData(undefined);
        return page > 0 ? setPage((page:number) => page - 15) : null
    }

    // this number means how many items we want to get
    // in this case we want to show the new 15 items from db , same case above with minus
    const nextPage = () => {
        // reset data array to trigger <Spinner /> and avoid double request as well
        setData(undefined);
        setPage(page + 15);
    }
    return(
        <>
            <div ref={tableRef}>
                <h1 className="title_Table">Statystyki wszystkich użytkowników</h1>
                <h2>Sortuj po: </h2>
                <div className="row header">
                    <div className="cell">UserID</div>
                    <div className="cell">Data założenia konta</div>
                    <div className="cell">Data ostatniego logowania</div>
                    <div className="cell">Liczba posiadanych lokalizacji</div>
                    <div className="cell">Liczba posiadanych sfer</div>
                    <div className="cell">Liczba posiadanych spacerów</div>
                </div>
                    <TableLayout data={data} />
                <div className={page < 1 ? "btns_group-odd" : "btns_group"}>
                    <div onClick={prevPage} className={page <= 0 ? "invisible" : "btn prev"}>👈 Cofnij</div>
                    <div onClick={nextPage} className="btn next">Dalej 👉</div>
                </div>
            </div>
            </>
    );
});
export default TableHeader;