import { FC,useEffect,lazy,Suspense } from 'react';
import { useAppSelector} from "./store/store";
import { userReader} from "./slices/userSlice";
import { useNavigate } from 'react-router-dom';
const Login = lazy(() => import('./components/Login'));

const App:FC = () => {
    const user =  useAppSelector(userReader);
    const navigate = useNavigate();

    useEffect(() => {
        user
            ? navigate("dashboard", { replace: true })
            : navigate("login", { replace: true })
    }, [user]);

    return(
        <Suspense fallback={<div>Loading</div>}>
            <Login />
        </Suspense>
    );
}
export default App;