// Mock data for demonstration
const mockPatients = [
    {
        id: 1,
        name: "John Doe",
        age: 45,
        riskLevel: "high",
        lastReading: 180,
        phone: "+1234567890",
        glucoseReadings: [140, 160, 180, 150, 170, 165],
        foodIntake: [
            { time: "08:00 AM", meal: "Breakfast", description: "Oatmeal with berries" },
            { time: "12:30 PM", meal: "Lunch", description: "Grilled chicken salad" },
            { time: "06:00 PM", meal: "Dinner", description: "Salmon with vegetables" }
        ],
        activities: [
            { time: "07:00 AM", activity: "Morning walk", duration: "30 mins" },
            { time: "04:00 PM", activity: "Swimming", duration: "45 mins" }
        ]
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 52,
        riskLevel: "moderate",
        lastReading: 145,
        phone: "+1987654321",
        glucoseReadings: [130, 140, 135, 142, 138, 145],
        foodIntake: [
            { time: "07:30 AM", meal: "Breakfast", description: "Whole grain toast with eggs" },
            { time: "01:00 PM", meal: "Lunch", description: "Quinoa bowl" },
            { time: "07:00 PM", meal: "Dinner", description: "Vegetable stir-fry" }
        ],
        activities: [
            { time: "06:30 AM", activity: "Yoga", duration: "45 mins" },
            { time: "05:30 PM", activity: "Light jogging", duration: "20 mins" }
        ]
    },
    {
        id: 3,
        name: "Robert Johnson",
        age: 38,
        riskLevel: "low",
        lastReading: 120,
        phone: "+1122334455",
        glucoseReadings: [118, 122, 120, 115, 121, 120],
        foodIntake: [
            { time: "08:30 AM", meal: "Breakfast", description: "Smoothie bowl" },
            { time: "12:00 PM", meal: "Lunch", description: "Turkey sandwich" },
            { time: "06:30 PM", meal: "Dinner", description: "Grilled fish" }
        ],
        activities: [
            { time: "08:00 AM", activity: "Gym workout", duration: "1 hour" },
            { time: "06:00 PM", activity: "Evening walk", duration: "30 mins" }
        ]
    }
];

// Current screen tracking
let currentScreen = 'login';

// DOM Elements
const screens = {
    login: document.getElementById('loginScreen'),
    forgotPassword: document.getElementById('forgotPasswordScreen'),
    patientsList: document.getElementById('patientsListScreen'),
    patientDetails: document.getElementById('patientDetailsScreen')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Forgot Password
    document.getElementById('forgotPasswordLink').addEventListener('click', showForgotPasswordScreen);
    document.getElementById('backToLoginLink').addEventListener('click', showLoginScreen);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    
    // Navigation
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('backToListBtn').addEventListener('click', showPatientsListScreen);

    // Initialize patients list
    initializePatientsListScreen();
});

// Screen Navigation Functions
function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenId].classList.remove('hidden');
    currentScreen = screenId;
}

function showLoginScreen(e) {
    e?.preventDefault();
    showScreen('login');
}

function showForgotPasswordScreen(e) {
    e?.preventDefault();
    showScreen('forgotPassword');
}

function showPatientsListScreen(e) {
    e?.preventDefault();
    showScreen('patientsList');
    renderPatientsList();
}

function showPatientDetailsScreen(patientId) {
    showScreen('patientDetails');
    renderPatientDetails(patientId);
}

// Authentication Handlers
function handleLogin(e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Real authentication (mocked for now)
    if (phone === "+1234567890" && password === "password") {
        showPatientsListScreen();
    } else {
        alert('Invalid phone number or password.');
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    const phone = document.getElementById('resetPhone').value;
    const otpSection = document.getElementById('otpSection'); 
    const sendOtpBtn = document.getElementById('sendOtpBtn');

    // Mock OTP sending
    alert('OTP sent to your phone!');

    if (!otpSection.classList.contains('hidden')) {
        // Verify OTP
        const otp = document.getElementById('otp').value;
        if (otp === '123456') { // Mock OTP verification
            alert('Password reset successful! Please check your phone for the new password.');
            showLoginScreen(e);
        }
    } else {
        // Send OTP
        otpSection.classList.remove('hidden');
        sendOtpBtn.textContent = 'Verify OTP';
        alert('OTP sent to your phone!');
    }
}

function handleLogout(e) {
    e.preventDefault();
    showLoginScreen(e);
}

// Patients List Functions
function initializePatientsListScreen() {
    const patientsList = document.getElementById('patientsList');
    
    // Add event listener for risk level filter
    document.querySelector('select').addEventListener('change', (e) => {
        const riskLevel = e.target.value;
        renderPatientsList(riskLevel);
    });

    // Add event listener for search
    document.querySelector('input[type="text"]').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderPatientsList(null, searchTerm);
    });
}

function renderPatientsList(riskLevel = null, searchTerm = '') {
    const patientsList = document.getElementById('patientsList');
    let filteredPatients = [...mockPatients];

    // Apply risk level filter
    if (riskLevel && riskLevel !== 'all') {
        filteredPatients = filteredPatients.filter(patient => patient.riskLevel === riskLevel);
    }

    // Apply search filter
    if (searchTerm) {
        filteredPatients = filteredPatients.filter(patient => 
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.phone.includes(searchTerm)
        );
    }

    // Sort by risk level
    filteredPatients.sort((a, b) => {
        const riskOrder = { high: 1, moderate: 2, low: 3 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    });

    // Render patients
    patientsList.innerHTML = filteredPatients.map(patient => `
        <div class="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition duration-200 border-l-4 ${getRiskColorClass(patient.riskLevel)}"
             onclick="showPatientDetailsScreen(${patient.id})">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-semibold">${patient.name}</h3>
                <span class="px-2 py-1 rounded text-sm ${getRiskBadgeClass(patient.riskLevel)}">${patient.riskLevel}</span>
            </div>
            <div class="space-y-2 text-gray-600">
                <p>Age: ${patient.age}</p>
                <p>Last Reading: ${patient.lastReading} mg/dL</p>
                <p>Phone: ${patient.phone}</p>
            </div>
        </div>
    `).join('');
}

function getRiskColorClass(riskLevel) {
    const colors = {
        high: 'border-red-500',
        moderate: 'border-yellow-500',
        low: 'border-green-500'
    };
    return colors[riskLevel] || 'border-gray-500';
}

function getRiskBadgeClass(riskLevel) {
    const badges = {
        high: 'bg-red-100 text-red-800',
        moderate: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800'
    };
    return badges[riskLevel] || 'bg-gray-100 text-gray-800';
}

// Patient Details Functions
function renderPatientDetails(patientId) {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return;

    // Render patient info
    document.getElementById('patientInfo').innerHTML = `
        <div class="space-y-2">
            <p class="text-gray-600"><strong>Name:</strong> ${patient.name}</p>
            <p class="text-gray-600"><strong>Age:</strong> ${patient.age}</p>
            <p class="text-gray-600"><strong>Phone:</strong> ${patient.phone}</p>
            <p class="text-gray-600"><strong>Risk Level:</strong> 
                <span class="px-2 py-1 rounded text-sm ${getRiskBadgeClass(patient.riskLevel)}">${patient.riskLevel}</span>
            </p>
        </div>
    `;

    // Render glucose chart
    renderGlucoseChart(patient.glucoseReadings);

    // Render food intake
    document.getElementById('foodIntakeList').innerHTML = patient.foodIntake.map(meal => `
        <div class="border-b pb-3">
            <div class="flex justify-between items-center mb-1">
                <strong class="text-gray-700">${meal.meal}</strong>
                <span class="text-sm text-gray-500">${meal.time}</span>
            </div>
            <p class="text-gray-600">${meal.description}</p>
        </div>
    `).join('');

    // Render activities
    document.getElementById('activitiesList').innerHTML = patient.activities.map(activity => `
        <div class="border-b pb-3">
            <div class="flex justify-between items-center mb-1">
                <strong class="text-gray-700">${activity.activity}</strong>
                <span class="text-sm text-gray-500">${activity.time}</span>
            </div>
            <p class="text-gray-600">Duration: ${activity.duration}</p>
        </div>
    `).join('');
}

function renderGlucoseChart(readings) {
    const ctx = document.getElementById('glucoseChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.glucoseChart instanceof Chart) {
        window.glucoseChart.destroy();
    }

    window.glucoseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
            datasets: [{
                label: 'Glucose Level (mg/dL)',
                data: readings,
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 200,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
