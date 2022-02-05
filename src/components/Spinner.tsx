import { FC } from 'react'

export const Spinner:FC = () => {
    return(
        <>
            <h2 className='spinner_h2'>Please wait a moment</h2>
            <div className="spinner_Wrapper">
                <div className="spinner_Square"></div>
                <div className="spinner_Square_2"></div>
            </div>

        </>
    );
}