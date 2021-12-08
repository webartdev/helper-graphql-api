import React, { useReducer, useEffect } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import DisplayTable from './components/DisplayTable';
import { onCreatePost } from '../src/graphql/subscriptions';
import ModalNew from '../src/components/modal/ModalNew';
// import CustomCard from "../src/components/CustomCard";
import postReducer, {initialState} from '../src/reducers/mainReducer';

function App() {
  const [state, dispatch] = useReducer(postReducer, initialState)

  useEffect(() => {
    let subscription = API.graphql(
      graphqlOperation(onCreatePost)).subscribe({
      next: ({provider, value}) => {
      // console.log("provider value", value);
      dispatch({type: 'UPDATE_POSTS', value: [value.data.onCreatePost]});
    },
  });
  return () => subscription.unsubscribe();
  }, [])


  return (
    <div>
      <AmplifySignOut />
      <header className="App-header">
        <h2>Amplify Demo</h2>
      </header>
      <div className="AppBody">
      <button onClick={() => dispatch({type: 'OPEN_MODAL'})}><span>+ </span>Add New Record</button>
      <ModalNew state={state} dispatch={dispatch} />
      <div>
      {/* <CustomCard /> */}
      </div>
      <DisplayTable dispatch={dispatch} />
      <br />
    </div>
  </div>
  );
}

export default withAuthenticator(App);
