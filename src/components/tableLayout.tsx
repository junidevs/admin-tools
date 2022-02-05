
import { useNavigate } from 'react-router-dom';
import { Spinner } from './Spinner'
const TableLayout = ({data}:any) => {
    const navigate = useNavigate();

    const renderTableData = () => data.map((value:any) => {
            return(
                <div className="row" key={value.userId}>
                    <div onClick={() => navigate(`/dashboard/${value.userId}`)}
                         className="cell"
                         data-title="UserID - Kliknij po więcej szczegółów"
                    >
                        {value.userId}
                    </div>
                    <div className="cell" data-title="Data założenia konta " >{value.accountCreation ?? 'Not found'}</div>
                    <div className="cell" data-title="Data ostatniego logowania">{value.lastLogin}</div>
                    <div className="cell" data-title="Liczba posiadanych lokalizacji">{value.locationsCount}</div>
                    <div className="cell" data-title="Liczba posiadanych sfer">{value.panosCount}</div>
                    <div className="cell" data-title="Liczba posiadanych spacerów">{value.toursCount}</div>
                </div>
            );
        })
    return(
        <>
            {data !== undefined ? renderTableData() : <Spinner />}
        </>
    );
}
export default TableLayout;