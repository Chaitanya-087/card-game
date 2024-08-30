import {Game, Home} from "./pages";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SocketProvider} from "./utils/socket";

const App = () => {
    return (
        <Router>
            <SocketProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:roomID' element={<Game />} />
                </Routes>
            </SocketProvider>
        </Router>
    );
};

export default App;
