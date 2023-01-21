import { clearData, fetchData, incrementId, decrementId, inputId } from '../features/dataSlice'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function FetchDataButton(props) {
    const data = useSelector((state) => state.data)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData())
    }, [props.objectId, dispatch])


    return (
        <div className="App">
            <div>
                <button onClick={() => dispatch(fetchData())}>Thunk!</button>
                <button onClick={() => dispatch(clearData())}>Clear</button>
                <button onClick={() => dispatch(incrementId())}>Next</button>
                <button onClick={() => dispatch(decrementId())}>Back</button>
            </div>
            <div>
            <input value={ data.objectId } onChange={(e) => {
                dispatch(inputId(Number(e.target.value)))
            }} />
            </div>
        </div>
    );
}

export default FetchDataButton;
