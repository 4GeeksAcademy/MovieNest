useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserStr = localStorage.getItem("user");
    
    try {
      if (token && savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        setIsAuthenticated(true);
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear invalid data
    }
  }, []);