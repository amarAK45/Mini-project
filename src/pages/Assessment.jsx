import React, { useState, useEffect } from 'react';
import {
    ClipboardCheck, BarChart, FileText, ChevronRight,
    Info, RefreshCw, Search, ChevronDown, Upload, Home, CloudRain, Settings
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SystemSpecifications from './SystemSpecifications';
import './Assessment.css';

const Assessment = () => {
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1 State
    const [stateOpen, setStateOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchStateTerm, setSearchStateTerm] = useState('');
    const [searchCityTerm, setSearchCityTerm] = useState('');
    const [projectName, setProjectName] = useState('');
    const [buildingType, setBuildingType] = useState('');
    const [siteArea, setSiteArea] = useState('');
    const [numFloors, setNumFloors] = useState('');
    const [elevation, setElevation] = useState('');
    const [slope, setSlope] = useState('');

    // Step 2 State (Roof Characteristics)
    const [roofMaterial, setRoofMaterial] = useState('');
    const [roofShape, setRoofShape] = useState('');
    const [roofLength, setRoofLength] = useState('');
    const [roofWidth, setRoofWidth] = useState('');
    const [roofSlope, setRoofSlope] = useState('');
    const [drainageCondition, setDrainageCondition] = useState('');
    const [gutterLength, setGutterLength] = useState('');
    const [downspoutCount, setDownspoutCount] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Step 3 State (Rainfall Data)
    const [annualRainfall, setAnnualRainfall] = useState('');
    const [rainyDays, setRainyDays] = useState('');
    const [rainfallPattern, setRainfallPattern] = useState('');
    const [peakIntensity, setPeakIntensity] = useState('');
    const [monthlyRainfall, setMonthlyRainfall] = useState({
        january: '', february: '', march: '', april: '',
        may: '', june: '', july: '', august: '',
        september: '', october: '', november: '', december: ''
    });
    const [isLoadingRainfall, setIsLoadingRainfall] = useState(false);

    // Step 4 State (System Specifications)
    const [storageType, setStorageType] = useState('');
    const [storageCapacity, setStorageCapacity] = useState('');
    const [filtrationSystem, setFiltrationSystem] = useState('');
    const [pumpType, setPumpType] = useState('');
    const [pumpCapacity, setPumpCapacity] = useState('');
    const [distributionPressure, setDistributionPressure] = useState('');
    const [additionalFeatures, setAdditionalFeatures] = useState({
        firstFlushDiverter: false,
        waterQualityMonitoring: false,
        backupWaterSupply: false,
        overflowManagement: false,
        automatedControls: false,
        distributionNetwork: false
    });

    // Calculation State
    const [metrics, setMetrics] = useState({
        annualCollection: 0,
        efficiency: 0,
        savings: 0,
        feasibility: 0,
        roofArea: 0,
        effectiveArea: 0,
        runoffCoefficient: 0.85
    });

    // City coordinates for API calls
    const cityCoordinates = {
        "Mumbai": { lat: 19.0760, lon: 72.8777 },
        "Pune": { lat: 18.5204, lon: 73.8567 },
        "Nagpur": { lat: 21.1458, lon: 79.0882 },
        "Nashik": { lat: 19.9975, lon: 73.7898 },
        "New Delhi": { lat: 28.6139, lon: 77.2090 },
        "North Delhi": { lat: 28.7041, lon: 77.1025 },
        "South Delhi": { lat: 28.5355, lon: 77.3910 },
        "Bangalore": { lat: 12.9716, lon: 77.5946 },
        "Mysore": { lat: 12.2958, lon: 76.6394 },
        "Hubli": { lat: 15.3647, lon: 75.1240 },
        "Chennai": { lat: 13.0827, lon: 80.2707 },
        "Coimbatore": { lat: 11.0168, lon: 76.9558 },
        "Madurai": { lat: 9.9252, lon: 78.1198 },
        "Hyderabad": { lat: 17.3850, lon: 78.4867 },
        "Warangal": { lat: 17.9689, lon: 79.5941 },
        "Kolkata": { lat: 22.5726, lon: 88.3639 },
        "Howrah": { lat: 22.5958, lon: 88.2636 }
    };

    const stateCityData = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
        "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "Haryana": ["Gurugram", "Faridabad", "Panipat", "Karnal"],
        "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Solan"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        "Manipur": ["Imphal", "Churachandpur"],
        "Meghalaya": ["Shillong", "Tura"],
        "Mizoram": ["Aizawl", "Lunglei"],
        "Nagaland": ["Kohima", "Dimapur"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
        "Sikkim": ["Gangtok", "Namchi"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
        "Tripura": ["Agartala", "Udaipur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
        "Andaman and Nicobar Islands": ["Port Blair"],
        "Chandigarh": ["Chandigarh"],
        "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    };

    const buildingTypes = [
        "Residential Building",
        "Commercial Complex",
        "Industrial Facility",
        "Institutional Building",
        "Mixed Use Development"
    ];

    const roofMaterials = [
        { name: "RCC Concrete", coeff: "0.85-0.95", value: 0.90 },
        { name: "Clay Tiles", coeff: "0.75-0.85", value: 0.80 },
        { name: "Metal Sheets", coeff: "0.90-0.95", value: 0.92 },
        { name: "Asphalt Shingles", coeff: "0.80-0.90", value: 0.85 },
        { name: "Membrane Roofing", coeff: "0.85-0.95", value: 0.90 },
        { name: "Green Roof", coeff: "0.30-0.50", value: 0.40 }
    ];

    const roofShapes = [
        "Flat Roof", "Gabled Roof", "Hipped Roof", "Shed Roof", "Complex Shape"
    ];

    const drainageConditions = [
        { name: "Excellent", desc: "No ponding, quick drainage" },
        { name: "Good", desc: "Minimal ponding, adequate drainage" },
        { name: "Fair", desc: "Some ponding, slow drainage" },
        { name: "Poor", desc: "Significant ponding issues" }
    ];

    const rainfallPatterns = [
        "Monsoon Dominated",
        "Uniform Distribution",
        "Seasonal Variation",
        "Erratic Pattern"
    ];

    const peakIntensities = [
        "Very High (>100mm/hr)",
        "High (50-100mm/hr)",
        "Moderate (25-50mm/hr)",
        "Low (<25mm/hr)"
    ];

    const filteredStates = Object.keys(stateCityData).filter(state =>
        state.toLowerCase().includes(searchStateTerm.toLowerCase())
    );

    const filteredCities = selectedState ? stateCityData[selectedState].filter(city =>
        city.toLowerCase().includes(searchCityTerm.toLowerCase())
    ) : [];

    // Fetch rainfall data from Open-Meteo API
    const fetchRainfallData = async (city) => {
        if (!cityCoordinates[city]) return;

        setIsLoadingRainfall(true);
        const coords = cityCoordinates[city];

        try {
            // Get last year's data
            const endDate = new Date();
            const startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);

            const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${coords.lat}&longitude=${coords.lon}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&daily=precipitation_sum&timezone=auto`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.daily && data.daily.precipitation_sum) {
                // Calculate monthly totals
                const monthlyData = {};
                const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                    'july', 'august', 'september', 'october', 'november', 'december'];

                // Initialize monthly totals
                monthNames.forEach(month => monthlyData[month] = 0);

                // Sum up daily precipitation by month
                data.daily.precipitation_sum.forEach((precip, index) => {
                    const date = new Date(data.daily.time[index]);
                    const monthIndex = date.getMonth();
                    monthlyData[monthNames[monthIndex]] += precip || 0;
                });

                // Update state with monthly data
                const updatedMonthly = {};
                monthNames.forEach(month => {
                    updatedMonthly[month] = Math.round(monthlyData[month]);
                });
                setMonthlyRainfall(updatedMonthly);

                // Calculate annual total
                const annualTotal = Object.values(monthlyData).reduce((sum, val) => sum + val, 0);
                setAnnualRainfall(Math.round(annualTotal).toString());

                // Calculate rainy days (days with >1mm precipitation)
                const rainyDaysCount = data.daily.precipitation_sum.filter(p => p > 1).length;
                setRainyDays(rainyDaysCount.toString());

                // Determine rainfall pattern based on distribution
                const maxMonth = Math.max(...Object.values(monthlyData));
                const avgMonth = annualTotal / 12;
                if (maxMonth > avgMonth * 3) {
                    setRainfallPattern("Monsoon Dominated");
                } else if (maxMonth < avgMonth * 1.5) {
                    setRainfallPattern("Uniform Distribution");
                } else {
                    setRainfallPattern("Seasonal Variation");
                }

                // Determine peak intensity (simplified)
                if (annualTotal > 2000) {
                    setPeakIntensity("Very High (>100mm/hr)");
                } else if (annualTotal > 1000) {
                    setPeakIntensity("High (50-100mm/hr)");
                } else {
                    setPeakIntensity("Moderate (25-50mm/hr)");
                }
            }
        } catch (error) {
            console.error('Error fetching rainfall data:', error);
        } finally {
            setIsLoadingRainfall(false);
        }
    };

    // Real-time Calculation Effect
    useEffect(() => {
        calculateMetrics();
    }, [siteArea, selectedCity, buildingType, roofLength, roofWidth, roofMaterial, annualRainfall]);

    const calculateMetrics = () => {
        // Use fetched rainfall or fallback
        const rainfall = parseFloat(annualRainfall) || 1000;

        // Area Calculations
        let calculatedRoofArea = 0;

        if (roofLength && roofWidth) {
            calculatedRoofArea = parseFloat(roofLength) * parseFloat(roofWidth);
        } else if (siteArea) {
            calculatedRoofArea = parseFloat(siteArea) * 0.6;
        }

        const areaSqM = calculatedRoofArea * 0.092903;

        // Runoff Coefficient
        const selectedMaterial = roofMaterials.find(m => m.name === roofMaterial);
        const runoffCoeff = selectedMaterial ? selectedMaterial.value : 0.85;

        const effectiveArea = calculatedRoofArea * runoffCoeff;

        // Collection & Savings
        const annualCollectionLiters = areaSqM * rainfall * runoffCoeff;
        const efficiency = Math.min((annualCollectionLiters / (areaSqM * rainfall || 1)) * 100, 95);
        const waterCostPerLiter = 0.15;
        const annualSavings = annualCollectionLiters * waterCostPerLiter;

        // Feasibility
        let feasibility = 0;
        if (annualCollectionLiters > 10000) feasibility += 40; else feasibility += 20;
        if (rainfall > 1000) feasibility += 30; else feasibility += 15;
        if (buildingType) feasibility += 30;

        setMetrics({
            annualCollection: Math.round(annualCollectionLiters),
            efficiency: efficiency.toFixed(1),
            savings: Math.round(annualSavings),
            feasibility: Math.min(feasibility, 100),
            roofArea: Math.round(calculatedRoofArea),
            effectiveArea: Math.round(effectiveArea),
            runoffCoefficient: runoffCoeff
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            setIsAnalyzing(true);

            // Simulate AI Analysis
            setTimeout(() => {
                setRoofLength('50');
                setRoofWidth('30');
                setRoofSlope('15');
                setGutterLength('160');
                setDownspoutCount('4');
                setIsAnalyzing(false);
            }, 2000);
        }
    };

    const nextStep = () => {
        if (currentStep === 2) {
            // Fetch rainfall data when moving to step 3
            if (selectedCity) {
                fetchRainfallData(selectedCity);
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleGenerateReport = async () => {
        try {
            // Prepare assessment data
            const assessmentData = {
                id: Date.now(),
                projectName,
                date: new Date().toISOString(),
                step1: { selectedState, selectedCity, buildingType, siteArea, numFloors, elevation, slope },
                step2: { roofMaterial, roofShape, roofLength, roofWidth, roofSlope, drainageCondition, gutterLength, downspoutCount },
                step3: { annualRainfall, rainyDays, rainfallPattern, peakIntensity, monthlyRainfall },
                step4: { storageType, storageCapacity, filtrationSystem, pumpType, pumpCapacity, distributionPressure, additionalFeatures },
                metrics
            };

            // Save to backend
            const response = await fetch('http://localhost:5000/api/assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assessmentData),
            });

            if (!response.ok) {
                throw new Error('Failed to save assessment to server');
            }

            // Also save current assessment to localStorage for Report page to access immediately
            localStorage.setItem('currentAssessment', JSON.stringify(assessmentData));

            // Navigate to reports page
            window.location.href = '/reports';
        } catch (error) {
            console.error("Error generating report:", error);
            // Silent fallback to local storage

            const assessmentData = {
                id: Date.now(),
                projectName,
                date: new Date().toISOString(),
                step1: { selectedState, selectedCity, buildingType, siteArea, numFloors, elevation, slope },
                step2: { roofMaterial, roofShape, roofLength, roofWidth, roofSlope, drainageCondition, gutterLength, downspoutCount },
                step3: { annualRainfall, rainyDays, rainfallPattern, peakIntensity, monthlyRainfall },
                step4: { storageType, storageCapacity, filtrationSystem, pumpType, pumpCapacity, distributionPressure, additionalFeatures },
                metrics
            };
            const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
            savedAssessments.push(assessmentData);
            localStorage.setItem('assessments', JSON.stringify(savedAssessments));
            localStorage.setItem('currentAssessment', JSON.stringify(assessmentData));
            window.location.href = '/reports';
        }
    };

    const getStepIcon = () => {
        if (currentStep === 1) return <ClipboardCheck size={24} color="#2E7D32" />;
        if (currentStep === 2) return <Home size={24} color="#2E7D32" />;
        if (currentStep === 3) return <CloudRain size={24} color="#2E7D32" />;
        return <Settings size={24} color="#2E7D32" />;
    };

    const getStepTitle = () => {
        if (currentStep === 1) return "Assessment Tool";
        if (currentStep === 2) return "Roof Characteristics";
        if (currentStep === 3) return "Rainfall Data";
        return "System Specifications";
    };

    const getStepDescription = () => {
        if (currentStep === 1) return "Comprehensive rooftop rainwater harvesting evaluation system";
        if (currentStep === 2) return "Roof specifications and catchment details";
        if (currentStep === 3) return "Historical and projected rainfall information";
        return "Storage, filtration, and system components";
    };

    return (
        <div className="assessment-page">
            <Navbar />

            {/* Workflow Header */}
            <div className="workflow-header">
                <div className="container">
                    <div className="workflow-top">
                        <h2>Assessment Workflow</h2>
                        <span className="step-indicator">Step {currentStep} of 4</span>
                    </div>

                    <div className="workflow-steps">
                        <div className={`step-item ${currentStep >= 1 ? 'active' : ''}`}>
                            <div className="step-icon"><ClipboardCheck size={20} /></div>
                            <div className="step-text">
                                <strong>Assessment</strong>
                                <span>Conduct environmental assessment</span>
                            </div>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                            <div className="step-icon"><CloudRain size={20} /></div>
                            <div className="step-text">
                                <strong>Rainfall Data</strong>
                                <span>Historical rainfall information</span>
                            </div>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step-item ${currentStep >= 4 ? 'active' : ''}`}>
                            <div className="step-icon"><Settings size={20} /></div>
                            <div className="step-text">
                                <strong>System Specifications</strong>
                                <span>Storage and filtration details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="assessment-content container">
                {/* Header Section */}
                <div className="assessment-tool-header">
                    <div className="tool-icon">
                        {getStepIcon()}
                    </div>
                    <div>
                        <h1>{getStepTitle()}</h1>
                        <p>{getStepDescription()}</p>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="progress-section">
                    <div className="progress-header">
                        <h3>Assessment Progress</h3>
                        <span>{currentStep === 1 ? "0" : currentStep === 2 ? "8" : "17"} of 17 fields completed</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-label">Overall Progress</div>
                        <div className="progress-percentage">{currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%"}</div>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>
                    </div>


                    <div className="progress-steps-indicator">
                        <div className={`indicator-item ${currentStep >= 1 ? 'active' : ''}`}>
                            <div className="indicator-dot"></div>
                            <span>Site Parameters</span>
                        </div>
                        <div className="indicator-line"></div>
                        <div className={`indicator-item ${currentStep >= 2 ? 'active' : ''}`}>
                            <div className="indicator-dot"></div>
                            <span>Roof Characteristics</span>
                        </div>
                        <div className="indicator-line"></div>
                        <div className={`indicator-item ${currentStep >= 3 ? 'active' : ''}`}>
                            <div className="indicator-dot"></div>
                            <span>Rainfall Data</span>
                        </div>
                        <div className="indicator-line"></div>
                        <div className={`indicator-item ${currentStep >= 4 ? 'active' : ''}`}>
                            <div className="indicator-dot"></div>
                            <span>System Specifications</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="assessment-grid">
                    {/* Left Panel - Form */}
                    <div className="form-panel">
                        <div className="panel-header">
                            <div className="panel-icon">{getStepIcon()}</div>
                            <div>
                                <h3>{currentStep === 1 ? "Site Parameters" : currentStep === 2 ? "Roof Characteristics" : currentStep === 3 ? "Rainfall Data" : "System Specifications"}</h3>
                                <p>{currentStep === 1 ? "Basic site information and location details" : currentStep === 2 ? "Roof specifications and catchment details" : currentStep === 3 ? "Historical and projected rainfall information" : "Storage, filtration, and system components"}</p>
                            </div>
                        </div>

                        {currentStep === 1 ? (
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Project Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State <span className="required">*</span></label>
                                    <div className="custom-select">
                                        <div
                                            className="select-trigger"
                                            onClick={() => setStateOpen(!stateOpen)}
                                        >
                                            {selectedState || "Select State"}
                                            <ChevronDown size={16} />
                                        </div>

                                        {stateOpen && (
                                            <div className="select-dropdown">
                                                <div className="search-box">
                                                    <Search size={14} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search state..."
                                                        value={searchStateTerm}
                                                        onChange={(e) => setSearchStateTerm(e.target.value)}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="options-list">
                                                    {filteredStates.map((state, index) => (
                                                        <div
                                                            key={index}
                                                            className="option-item"
                                                            onClick={() => {
                                                                setSelectedState(state);
                                                                setSelectedCity('');
                                                                setStateOpen(false);
                                                            }}
                                                        >
                                                            {state}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>City <span className="required">*</span></label>
                                    <div className={`custom-select ${!selectedState ? 'disabled' : ''}`}>
                                        <div
                                            className="select-trigger"
                                            onClick={() => selectedState && setCityOpen(!cityOpen)}
                                        >
                                            {selectedCity || "Select City"}
                                            <ChevronDown size={16} />
                                        </div>

                                        {cityOpen && selectedState && (
                                            <div className="select-dropdown">
                                                <div className="search-box">
                                                    <Search size={14} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search city..."
                                                        value={searchCityTerm}
                                                        onChange={(e) => setSearchCityTerm(e.target.value)}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="options-list">
                                                    {filteredCities.map((city, index) => (
                                                        <div
                                                            key={index}
                                                            className="option-item"
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setCityOpen(false);
                                                            }}
                                                        >
                                                            {city}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Building Type <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={buildingType}
                                            onChange={(e) => setBuildingType(e.target.value)}
                                        >
                                            <option value="" disabled>Select building type</option>
                                            {buildingTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Site Area (sq ft) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter total site area"
                                        value={siteArea}
                                        onChange={(e) => setSiteArea(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Number of Floors <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter number of floors"
                                        value={numFloors}
                                        onChange={(e) => setNumFloors(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Elevation (meters)</label>
                                    <input
                                        type="number"
                                        placeholder="Enter site elevation"
                                        value={elevation}
                                        onChange={(e) => setElevation(e.target.value)}
                                    />
                                    <span className="help-text">Height above sea level</span>
                                </div>

                                <div className="form-group full-width">
                                    <label>Slope Percentage</label>
                                    <input
                                        type="number"
                                        placeholder="Enter site slope"
                                        value={slope}
                                        onChange={(e) => setSlope(e.target.value)}
                                    />
                                    <span className="help-text">Site gradient percentage</span>
                                </div>
                            </div>
                        ) : currentStep === 2 ? (
                            <div className="form-grid">
                                <div className="form-group full-width upload-group">
                                    <label>Upload Roof Image (Auto-fill)</label>
                                    <div className="image-upload-area">
                                        <input
                                            type="file"
                                            id="roof-image"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="roof-image" className="upload-label">
                                            {isAnalyzing ? (
                                                <div className="analyzing">
                                                    <RefreshCw className="spin" size={24} />
                                                    <span>Analyzing Roof Structure...</span>
                                                </div>
                                            ) : uploadedImage ? (
                                                <div className="uploaded-preview">
                                                    <img src={uploadedImage} alt="Roof" />
                                                    <div className="upload-success">
                                                        <ClipboardCheck size={16} /> Analysis Complete
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload size={24} />
                                                    <span>Click to upload roof image for auto-analysis</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Roof Material <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={roofMaterial}
                                            onChange={(e) => setRoofMaterial(e.target.value)}
                                        >
                                            <option value="" disabled>Select roof material</option>
                                            {roofMaterials.map((mat, index) => (
                                                <option key={index} value={mat.name}>
                                                    {mat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Roof Shape <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={roofShape}
                                            onChange={(e) => setRoofShape(e.target.value)}
                                        >
                                            <option value="" disabled>Select roof shape</option>
                                            {roofShapes.map((shape, index) => (
                                                <option key={index} value={shape}>{shape}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Roof Length (ft) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter roof length"
                                        value={roofLength}
                                        onChange={(e) => setRoofLength(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Roof Width (ft) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter roof width"
                                        value={roofWidth}
                                        onChange={(e) => setRoofWidth(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Roof Slope (degrees)</label>
                                    <input
                                        type="number"
                                        placeholder="Enter roof slope"
                                        value={roofSlope}
                                        onChange={(e) => setRoofSlope(e.target.value)}
                                    />
                                    <span className="help-text">Angle of roof inclination</span>
                                </div>

                                <div className="form-group">
                                    <label>Drainage Condition <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={drainageCondition}
                                            onChange={(e) => setDrainageCondition(e.target.value)}
                                        >
                                            <option value="" disabled>Select drainage condition</option>
                                            {drainageConditions.map((cond, index) => (
                                                <option key={index} value={cond.name}>
                                                    {cond.name} - {cond.desc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gutter Length (ft)</label>
                                    <input
                                        type="number"
                                        placeholder="Enter total gutter length"
                                        value={gutterLength}
                                        onChange={(e) => setGutterLength(e.target.value)}
                                    />
                                    <span className="help-text">Total perimeter with gutters</span>
                                </div>

                                <div className="form-group">
                                    <label>Downspout Count</label>
                                    <input
                                        type="number"
                                        placeholder="Number of downspouts"
                                        value={downspoutCount}
                                        onChange={(e) => setDownspoutCount(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : currentStep === 3 ? (
                            <div className="form-grid">
                                {isLoadingRainfall && (
                                    <div className="form-group full-width">
                                        <div className="loading-rainfall">
                                            <RefreshCw className="spin" size={20} />
                                            <span>Fetching rainfall data for {selectedCity}...</span>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Annual Rainfall (mm) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter annual rainfall"
                                        value={annualRainfall}
                                        onChange={(e) => setAnnualRainfall(e.target.value)}
                                        disabled={isLoadingRainfall}
                                    />
                                    <span className="help-text">Auto-fetched from weather data</span>
                                </div>

                                <div className="form-group">
                                    <label>Number of Rainy Days</label>
                                    <input
                                        type="number"
                                        placeholder="Enter number of rainy days"
                                        value={rainyDays}
                                        onChange={(e) => setRainyDays(e.target.value)}
                                        disabled={isLoadingRainfall}
                                    />
                                    <span className="help-text">Days with measurable rainfall</span>
                                </div>

                                <div className="form-group">
                                    <label>Rainfall Pattern <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={rainfallPattern}
                                            onChange={(e) => setRainfallPattern(e.target.value)}
                                            disabled={isLoadingRainfall}
                                        >
                                            <option value="" disabled>Select rainfall pattern</option>
                                            {rainfallPatterns.map((pattern, index) => (
                                                <option key={index} value={pattern}>{pattern}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Peak Intensity <span className="required">*</span></label>
                                    <div className="select-wrapper">
                                        <select
                                            value={peakIntensity}
                                            onChange={(e) => setPeakIntensity(e.target.value)}
                                            disabled={isLoadingRainfall}
                                        >
                                            <option value="" disabled>Select peak intensity</option>
                                            {peakIntensities.map((intensity, index) => (
                                                <option key={index} value={intensity}>{intensity}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label className="section-label">
                                        <CloudRain size={16} /> Monthly Rainfall Distribution (mm)
                                    </label>
                                    <div className="monthly-rainfall-grid">
                                        {Object.keys(monthlyRainfall).map((month) => (
                                            <div key={month} className="month-input">
                                                <label>{month.charAt(0).toUpperCase() + month.slice(1)}</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={monthlyRainfall[month]}
                                                    onChange={(e) => setMonthlyRainfall({
                                                        ...monthlyRainfall,
                                                        [month]: e.target.value
                                                    })}
                                                    disabled={isLoadingRainfall}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <div className="rainfall-metrics">
                                        <div className="rainfall-metric-item">
                                            <span className="metric-icon">📊</span>
                                            <div>
                                                <span className="metric-label">Total Annual</span>
                                                <span className="metric-value">{annualRainfall || 0} mm</span>
                                            </div>
                                        </div>
                                        <div className="rainfall-metric-item">
                                            <span className="metric-icon">📅</span>
                                            <div>
                                                <span className="metric-label">Daily Average</span>
                                                <span className="metric-value">
                                                    {annualRainfall ? (parseFloat(annualRainfall) / 365).toFixed(2) : 0} mm/day
                                                </span>
                                            </div>
                                        </div>
                                        <div className="rainfall-metric-item">
                                            <span className="metric-icon">✓</span>
                                            <div>
                                                <span className="metric-label">Reliability Index</span>
                                                <span className="metric-value">
                                                    {rainyDays ? Math.min(Math.round((parseFloat(rainyDays) / 365) * 100), 100) : 0}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <SystemSpecifications
                                storageType={storageType}
                                setStorageType={setStorageType}
                                storageCapacity={storageCapacity}
                                setStorageCapacity={setStorageCapacity}
                                filtrationSystem={filtrationSystem}
                                setFiltrationSystem={setFiltrationSystem}
                                pumpType={pumpType}
                                setPumpType={setPumpType}
                                pumpCapacity={pumpCapacity}
                                setPumpCapacity={setPumpCapacity}
                                distributionPressure={distributionPressure}
                                setDistributionPressure={setDistributionPressure}
                                additionalFeatures={additionalFeatures}
                                setAdditionalFeatures={setAdditionalFeatures}
                            />
                        )}

                        <div className="guidelines-box">
                            <div className="guidelines-title">
                                <Info size={16} /> {currentStep === 1 ? "Site Parameter Guidelines" : currentStep === 2 ? "Roof Assessment Tips" : currentStep === 3 ? "Rainfall Data Guidelines" : "System Design Considerations"}
                            </div>
                            <ul>
                                {currentStep === 1 ? (
                                    <>
                                        <li>Accurate location selection ensures proper rainfall data</li>
                                        <li>Building type affects water demand calculations</li>
                                        <li>Site area includes all available space for system installation</li>
                                        <li>Elevation and slope impact system design and efficiency</li>
                                    </>
                                ) : currentStep === 2 ? (
                                    <>
                                        <li>Measure roof dimensions accurately for precise calculations</li>
                                        <li>Consider roof material impact on water quality and runoff</li>
                                        <li>Ensure adequate drainage to prevent structural issues</li>
                                        <li>Account for obstacles like HVAC units and chimneys</li>
                                    </>
                                ) : currentStep === 3 ? (
                                    <>
                                        <li>Use local meteorological data for accurate assessments</li>
                                        <li>Consider climate change impacts on future rainfall patterns</li>
                                        <li>Account for seasonal variations in system design</li>
                                        <li>Validate data with multiple sources when possible</li>
                                    </>
                                ) : (
                                    <>
                                        <li>Size storage based on roof area and rainfall patterns</li>
                                        <li>Include first flush diverter for better water quality</li>
                                        <li>Consider overflow management for heavy rainfall events</li>
                                        <li>Plan for regular maintenance and system monitoring</li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="form-actions">
                            <button className="btn-prev" onClick={prevStep} disabled={currentStep === 1}>
                                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Previous
                            </button>
                            <button
                                className="btn-next"
                                onClick={currentStep === 4 ? handleGenerateReport : nextStep}
                            >
                                {currentStep === 4 ? "Generate Report" : "Next"} <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Calculations */}
                    <div className="calculations-panel">
                        <div className="calc-header">
                            <div className="calc-title">
                                <div className="calc-icon"><ClipboardCheck size={16} /></div>
                                <div>
                                    <h3>Real-time Calculations</h3>
                                    <p>Dynamic assessment results</p>
                                </div>
                            </div>
                            <button className="recalc-btn" onClick={calculateMetrics}><RefreshCw size={14} /> Recalculate</button>
                        </div>

                        <div className="metrics-grid">
                            <div className="metric-item">
                                <span className="metric-label">Annual Collection</span>
                                <span className="metric-value">{metrics.annualCollection.toLocaleString()} L</span>
                                <span className="metric-sub">{(metrics.annualCollection * 0.264172).toFixed(0)} gallons</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">System Efficiency</span>
                                <span className="metric-value">{metrics.efficiency}%</span>
                                <span className="metric-sub">Collection efficiency</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Annual Savings</span>
                                <span className="metric-value">₹{metrics.savings.toLocaleString()}</span>
                                <span className="metric-sub">Estimated INR savings</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Feasibility</span>
                                <span className={`metric-value ${metrics.feasibility > 50 ? 'success' : 'error'}`}>{metrics.feasibility}/100</span>
                                <span className={`metric-sub ${metrics.feasibility > 50 ? 'success' : 'error'}`}>{metrics.feasibility > 50 ? 'Recommended' : 'Not Recommended'}</span>
                            </div>
                        </div>

                        {currentStep >= 2 && (
                            <div className="roof-metrics-grid">
                                <div className="roof-metric">
                                    <span className="rm-label"><Home size={14} /> Roof Area</span>
                                    <span className="rm-value">{metrics.roofArea} sq ft</span>
                                </div>
                                <div className="roof-metric">
                                    <span className="rm-label"><CloudRain size={14} /> Runoff Coeff</span>
                                    <span className="rm-value">{metrics.runoffCoefficient}</span>
                                </div>
                                <div className="roof-metric">
                                    <span className="rm-label"><Settings size={14} /> Effective Area</span>
                                    <span className="rm-value">{metrics.effectiveArea.toFixed(0)} sq ft</span>
                                </div>
                            </div>
                        )}

                        <div className="recommendations-box">
                            <div className="rec-title">
                                <div className="bulb-icon">💡</div> System Recommendations
                            </div>
                            <ul>
                                <li>Consider increasing storage capacity for better efficiency</li>
                                <li>Regular maintenance required for optimal performance</li>
                                <li>Consider first flush diverter for better water quality</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Assessment;
