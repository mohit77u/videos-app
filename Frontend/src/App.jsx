import './assets/app.scss'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import UploadVideo from './pages/UploadVideo';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import SecondaryLayout from './layouts/SecondaryLayout';
import NoAuthLayout from './layouts/NoAuthLayout';
import Profile from './pages/Profile';
import MyVideos from './pages/MyVideos';

function App() {

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* home page route */}
                    <Route path="/" element={<NoAuthLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    {/* main layout routes */}
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/upload-video" element={<UploadVideo />} />
                        <Route path="/my-videos" element={<MyVideos />} />
                    </Route>

                    {/* secondary layout routes */}
                    <Route path="/" element={<SecondaryLayout />}>
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />

                        {/* other router */}
                        <Route path="/*" element={ <NotFound  /> } />
                    </Route>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
