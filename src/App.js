import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './pages/Student/Signup/Signup';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/Student/Home/Home';
import Classes from './pages/Student/Classes/Classes';
import Profile from './pages/Student/Profile/Profile';
import Videointerface from './pages/Student/Videointerface/Videointerface';
import HomeAdmin from './pages/Admin/Home/Home';
import Login from './pages/Student/Login/Login';

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#081220",
      paper: "#081220",
    },
    primary: {
      main: "#1799E1",
    },
    secondary: {
      main: "#1799E1",
    },
    // whitetext: {
    // 	main: "#fafafa",
    // },
    // pureWhite: {
    // 	main: "#FFFFFF",
    // },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/user/signup" component={Signup} />
          <Route path='/user/home' component={Home} />
          <Route path='/user/classes' component={Classes} />
          <Route path='/user/profile' component={Profile} />
          <Route path='/user/video' component={Videointerface} />
          <Route path='/admin/home' component={HomeAdmin} />
          <Route path='/user/login' component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;