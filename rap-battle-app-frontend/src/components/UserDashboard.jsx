

const UserDashboard = () => {
    

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
                <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Rap Battle App</h1>
                <div className="space-x-4">
                    <a href="/" className="text-white hover:text-pink-500 transition duration-300">Home</a>
                    <a href="/dashboard" className="text-white hover:text-pink-500 transition duration-300">Dashboard</a>
                    <a href="/" className="text-white hover:text-pink-500 transition duration-300">Logout</a>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
                <h2 className="text-5xl font-bold text-white mb-4">Welcome to Your Dashboard!</h2>
                <p className="text-lg text-white mb-8">Here you can manage your account and view your details.</p>
            </div>

           
        </div>
    );
};

export default UserDashboard;
