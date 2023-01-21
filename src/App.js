import './App.css';
import { useSelector, connect } from 'react-redux'
import FetchDataButton from './components/FetchDataButton';


function App() {
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  return (
    <div className="App">
    <FetchDataButton />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}



const mapStateToProps = (state, ownProps) => ({ objectId: state.data.objectId })

export default connect(mapStateToProps)(App);